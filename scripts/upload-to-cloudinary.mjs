/**
 * Upload all product/category photos from public/assets/ to Cloudinary.
 * Generates scripts/cloudinary-url-map.json with { localPath: cloudinaryUrl } mapping.
 *
 * Usage: node scripts/upload-to-cloudinary.mjs
 */
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// Load .env.local
dotenv.config({ path: path.join(ROOT, ".env.local") });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const ASSETS_DIR = path.join(ROOT, "public", "assets");
const OUTPUT_FILE = path.join(ROOT, "scripts", "cloudinary-url-map.json");

// Extensions to upload (photos only, skip SVGs)
const PHOTO_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/**
 * Recursively collect all photo files
 */
function collectPhotos(dir, results = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            collectPhotos(fullPath, results);
        } else if (PHOTO_EXTS.has(path.extname(entry.name).toLowerCase())) {
            results.push(fullPath);
        }
    }
    return results;
}

async function main() {
    console.log("🔍 Scanning for photos in public/assets/...");
    const photos = collectPhotos(ASSETS_DIR);
    console.log(`📸 Found ${photos.length} photos to upload.\n`);

    const urlMap = {};
    let uploaded = 0;
    let skipped = 0;

    for (const filePath of photos) {
        // Build the local URL path (e.g. /assets/fans/atomberg-renesa-white.png)
        const relativePath = path.relative(path.join(ROOT, "public"), filePath).replace(/\\/g, "/");
        const localUrl = "/" + relativePath;

        // Build the Cloudinary public_id (e.g. monuelectricals/fans/atomberg-renesa-white)
        const relToAssets = path.relative(ASSETS_DIR, filePath).replace(/\\/g, "/");
        const publicId = "monuelectricals/" + relToAssets.replace(/\.[^.]+$/, "");

        try {
            // Upload with overwrite=false so we skip duplicates
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
                overwrite: false,
                unique_filename: false,
                resource_type: "image",
            });
            urlMap[localUrl] = result.secure_url;
            uploaded++;
            console.log(`✅ [${uploaded + skipped}/${photos.length}] ${localUrl}`);
        } catch (err) {
            // If the image already exists, fetch its URL
            if (err?.error?.http_code === 409 || err?.http_code === 409) {
                try {
                    const existing = await cloudinary.api.resource(publicId);
                    urlMap[localUrl] = existing.secure_url;
                    skipped++;
                    console.log(`⏭️  [${uploaded + skipped}/${photos.length}] ${localUrl} (already exists)`);
                } catch {
                    console.error(`❌ Failed to get existing resource: ${localUrl}`, err);
                }
            } else {
                console.error(`❌ Failed to upload: ${localUrl}`, err?.message || err);
            }
        }
    }

    // Write the URL map
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(urlMap, null, 2));
    console.log(`\n✨ Done! ${uploaded} uploaded, ${skipped} skipped.`);
    console.log(`📄 URL map saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
