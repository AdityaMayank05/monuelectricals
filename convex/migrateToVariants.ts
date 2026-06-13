import { internalMutation } from "./_generated/server";

/**
 * One-time migration: converts flat product rows into parent + variant structure.
 * 
 * Groups existing products by (name + brand + type) to identify parent products.
 * Creates one parent product per group, then creates variants for each unique
 * color/size combination.
 * 
 * Run via Convex dashboard: npx convex run migrateToVariants:migrate
 */
export const migrate = internalMutation({
    args: {},
    handler: async (ctx) => {
        // Check if migration has already been done (productVariants table has data)
        const existingVariants = await ctx.db.query("productVariants").first();
        if (existingVariants) {
            throw new Error("Migration already completed — productVariants table already has data.");
        }

        const oldProducts = await ctx.db.query("products").collect();
        if (oldProducts.length === 0) {
            return { success: true, message: "No products to migrate." };
        }

        // Group products by a composite key. Use excelId if available, otherwise name+brand+type
        const groups = new Map<string, typeof oldProducts>();
        for (const product of oldProducts) {
            // Try to access excelId if it still exists on the document
            const doc = product as any;
            const groupKey = doc.excelId
                ? `${product.categoryId}_${doc.excelId}`
                : `${product.categoryId}_${product.name}_${product.brand}_${(product as any).type || ""}`;

            if (!groups.has(groupKey)) {
                groups.set(groupKey, []);
            }
            groups.get(groupKey)!.push(product);
        }

        let parentCount = 0;
        let variantCount = 0;

        for (const [, groupProducts] of groups) {
            const first = groupProducts[0];
            const doc = first as any;

            // Create parent product with shared fields
            const parentId = await ctx.db.insert("products", {
                categoryId: first.categoryId,
                name: first.name,
                brand: first.brand,
                baseImage: doc.image || "",
                basePrice: doc.price,
                type: doc.type,
                subCategory: doc.subCategory,
                brandLine: doc.brandLine,
                shape: doc.shape,
                motor: doc.motor,
                energy: doc.energy,
            });
            parentCount++;

            // Create variants for each product in the group
            for (const product of groupProducts) {
                const pDoc = product as any;
                await ctx.db.insert("productVariants", {
                    productId: parentId,
                    color: pDoc.color,
                    size: pDoc.size,
                    image: pDoc.image || "",
                    price: pDoc.price,
                    outOfStock: pDoc.outOfStock,
                });
                variantCount++;
            }
        }

        // Delete old product rows (they've been replaced by parent+variants)
        for (const product of oldProducts) {
            await ctx.db.delete(product._id);
        }

        return {
            success: true,
            message: `Migrated ${oldProducts.length} flat products → ${parentCount} parent products + ${variantCount} variants.`,
        };
    },
});
