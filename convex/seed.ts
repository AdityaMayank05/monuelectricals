import { internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Image map: product name + color -> image URL
const FAN_IMAGES: Record<string, string> = {
    "Atomberg Renessa_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930937/monuelectricals/fans/atomberg-renesa-white.png",
    "Atomberg Renessa_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930935/monuelectricals/fans/atomberg-renesa-black.png",
    "Atomberg Ikona_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930933/monuelectricals/fans/atomberg-ikona-black.png",
    "Atomberg Ikona_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930933/monuelectricals/fans/atomberg-ikona-black.png",
    "Bajaj Artisan_Grey": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930940/monuelectricals/fans/bajaj-artisan-grey.png",
    "Bajaj Artisan_Dark Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930939/monuelectricals/fans/bajaj-artisan-darkbrown.png",
    "Bajaj Style Pro_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930945/monuelectricals/fans/bajaj-stylepro-white.png",
    "Bajaj Style Pro_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930944/monuelectricals/fans/bajaj-stylepro-brown.png",
    "Bajaj Style Pro_Beige": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930943/monuelectricals/fans/bajaj-stylepro-beige.png",
    "Bajaj Eldico_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930941/monuelectricals/fans/bajaj-eldico.png",
    "Crompton Superbreeze_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930948/monuelectricals/fans/crompton-superbreeze-white.png",
    "Crompton Superbreeze_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930947/monuelectricals/fans/crompton-superbreeze-brown.png",
    "Havells Enticer_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930955/monuelectricals/fans/havells-enticer-white.png",
    "Havells Enticer_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930951/monuelectricals/fans/havells-enticer-brown.png",
    "Havells Enticer_Gold": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930952/monuelectricals/fans/havells-enticer-gold.png",
    "Havells Exter_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930963/monuelectricals/fans/havells-exter-white.png",
    "Havells Exter_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930962/monuelectricals/fans/havells-exter-brown.png",
    "Havells Exter_Beige": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930961/monuelectricals/fans/havells-exter-beige.png",
    "Havells Quickair_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930967/monuelectricals/fans/havells-quickair-white.png",
    "Havells Quickair_Blue": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930966/monuelectricals/fans/havells-quickair-blue.png",
    "Havells Crist BLDC_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930950/monuelectricals/fans/havells-crist-bldc-brown.png",
    "Havells Epic BLDC_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930959/monuelectricals/fans/havells-epicbldc-white.png",
    "Havells Leganza_Grey": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930965/monuelectricals/fans/havells-leganza-grey.png",
    "Orient Blanco_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930970/monuelectricals/fans/orient-blanco-white.png",
    "Orient Blanco_Beige": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930969/monuelectricals/fans/orient-blanco-beige.png",
    "Reo Utsav_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930974/monuelectricals/fans/reo-utsav-white.png",
    "Reo Utsav_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930973/monuelectricals/fans/reo-utsav-brown.png",
    "Surya Astra_Brown": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930975/monuelectricals/fans/surya-astra-brown.png",
};

const EXHAUST_IMAGES: Record<string, string> = {
    "Surya Beach Air": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931259/monuelectricals/ventilation-fans/surya-beach-air-200mm.png",
    "Crompton Ventilus": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931249/monuelectricals/ventilation-fans/crompton-ventlius-150mm.png",
    "Crompton Axial Air": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931245/monuelectricals/ventilation-fans/crompton-axial-air-200mm.png",
    "Anchor Smart Air_250mm": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931242/monuelectricals/ventilation-fans/anchor-smart-air-250mm.png",
    "Anchor Smart Air High Speed": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931244/monuelectricals/ventilation-fans/anchor-smart-air-high-speed-200mm.png",
    "Havells Air Thrill DX": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931253/monuelectricals/ventilation-fans/havells-thrill-air-dx.png",
    "Sakash Ventilation Fan": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931256/monuelectricals/ventilation-fans/sakash-venti.png",
    "RR Signature Ventilation Fan": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931254/monuelectricals/ventilation-fans/rr-signature-venti-150mm.png",
};

const CHIMNEY_IMAGES: Record<string, string> = {
    "Glen Auto Clean Chimney": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930925/monuelectricals/chimneys/Glen-automatic-chimney.png",
    "Glen Chimney": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930926/monuelectricals/chimneys/glen-manual-chimney.png",
    "Inalsa Chimney": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930929/monuelectricals/chimneys/Inalsachimney.jpg",
    "Sakash Auto Clean Chimney": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930930/monuelectricals/chimneys/sakash-automatic-chimney.png",
};

const WIRE_IMAGES: Record<string, string> = {
    "Havells Life Line_Red": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931267/monuelectricals/wires/Havells-wire-red.png",
    "Havells Life Line_Blue": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931265/monuelectricals/wires/Havells-wire-blue.png",
    "Havells Life Line_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931264/monuelectricals/wires/Havells-wire-black.png",
    "Havells Life Line_Green": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931266/monuelectricals/wires/Havells-wire-green.png",
    "Havells Life Line_Yellow": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931269/monuelectricals/wires/havells-wire.png",
    "Polycab Etira Wires": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931270/monuelectricals/wires/polycab-etira-wire.png",
    "Chiwas ZHFR": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931261/monuelectricals/wires/chiwas-wire.png",
};

const LIGHT_IMAGES: Record<string, string> = {
    "Surya Shine NXT_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931009/monuelectricals/lights/down-lights/surya-shine-nxt-round.png",
    "Surya Shine NXT Square_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931011/monuelectricals/lights/down-lights/surya-shine-nxt-square.png",
    "Havells Trim NXT_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931003/monuelectricals/lights/down-lights/havells-trim-nxt-round.png",
    "Havells Trim NXT_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931005/monuelectricals/lights/down-lights/havells-trim-nxt-square.png",
    "Havells Luna_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931002/monuelectricals/lights/down-lights/havells-luna-round.png",
    "Halonix Kornet Max+_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930999/monuelectricals/lights/down-lights/halonix-kornet-max%2B-round.png",
    "Halonix Kornet Max+_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931000/monuelectricals/lights/down-lights/halonix-round.png",
    "Philips Astra Sleek_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931007/monuelectricals/lights/down-lights/philip-astrasleek-round.png",
    "Philips Astra Sleek_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931008/monuelectricals/lights/down-lights/philip-astrasleek-square.png",
    "Havells Trim Cosmo_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931014/monuelectricals/lights/surface-light/havells-trim-cosmo-round.png",
    "Havells Trim Cosmo_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931016/monuelectricals/lights/surface-light/havells-trim-cosmo-square.png",
    "Surya Dazzle Max_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931018/monuelectricals/lights/surface-light/surya-dazzle-max-round.png",
    "Surya Dazzle Max_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931020/monuelectricals/lights/surface-light/surya-dazzle-max-square.png",
    "Halonix Orion_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931012/monuelectricals/lights/surface-light/halonix-orion-round.png",
    "Halonix Orion_Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931013/monuelectricals/lights/surface-light/halonix-orion-surface.png",
    "Surya Moon Pro_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931009/monuelectricals/lights/down-lights/surya-shine-nxt-round.png",
    "Halonix Edge Glow_Round": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930997/monuelectricals/lights/down-lights/halonix-edge-glow-round.png",
    "Halonix Astron Plus": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930993/monuelectricals/lights/bulbs/halonix-astron-plus.png",
    "Surya Neo Max D": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930996/monuelectricals/lights/bulbs/surya-neo-maxx.png",
    "Panasonic Led Bulb": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930995/monuelectricals/lights/bulbs/panasonic-led.png",
    "Halonix Astron Jumbo": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930992/monuelectricals/lights/bulbs/halonix-astron-jumbo.png",
    "Surya Amaze Metalica": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Surya GLine": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Bajaj Beam Max": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Halonix Streak Square": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Halonix Lotus": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Philips Led Batten": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Havells Led Batten": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "Reo Flare": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930987/monuelectricals/lights/assessory/Reo-flare.png",
    "Surya Prime Spot": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930988/monuelectricals/lights/assessory/surya-prime-spot.png",
};

const SWITCH_IMAGES: Record<string, string> = {
    "Anchor_Switch_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931087/monuelectricals/switchgear/anchor-6a-switch-white.png",
    "Anchor_Switch_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931085/monuelectricals/switchgear/anchor-6a-switch-black.png",
    "Anchor_Socket_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931084/monuelectricals/switchgear/anchor-6a-socket-white.png",
    "Anchor_Socket_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931083/monuelectricals/switchgear/anchor-6a-socket-black.png",
    "Anchor_Bell Push_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931089/monuelectricals/switchgear/anchor-bellpush-1m-white.png",
    "Anchor_Bell Push_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931088/monuelectricals/switchgear/anchor-bellpush-1m-black.png",
    "Anchor_Fan Indicator_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931098/monuelectricals/switchgear/anchor-fanindicator-1m-white.png",
    "Anchor_Fan Indicator_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931096/monuelectricals/switchgear/anchor-fanindicator-1m-black.png",
    "Havells_Switch_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931117/monuelectricals/switchgear/havells-2wayswitch-white.png",
    "Havells_Switch_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931114/monuelectricals/switchgear/havells-2wayswitch-black.png",
    "Havells_Socket_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931108/monuelectricals/switchgear/havells-16a-socket-black.png",
    "Havells_Socket_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931108/monuelectricals/switchgear/havells-16a-socket-black.png",
    "Havells_Bell Push_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931117/monuelectricals/switchgear/havells-2wayswitch-white.png",
    "Havells_Bell Push_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931114/monuelectricals/switchgear/havells-2wayswitch-black.png",
    "Havells_Fan Indicator_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931098/monuelectricals/switchgear/anchor-fanindicator-1m-white.png",
    "Havells_Fan Indicator_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931096/monuelectricals/switchgear/anchor-fanindicator-1m-black.png",
    "Havells_Blank_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931080/monuelectricals/switchgear/anchor-6a-blank-white.png",
    "Havells_Blank_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931078/monuelectricals/switchgear/anchor-6a-blank-black.png",
    "Havells_Plate_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931121/monuelectricals/switchgear/havells-3m-plate-white.png",
    "Havells_Plate_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931146/monuelectricals/switchgear/havells-adiva-4m-plate-black.png",
    "Reo_Switch_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931087/monuelectricals/switchgear/anchor-6a-switch-white.png",
    "Reo_Switch_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931085/monuelectricals/switchgear/anchor-6a-switch-black.png",
    "Reo_Socket_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931084/monuelectricals/switchgear/anchor-6a-socket-white.png",
    "Reo_Socket_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931083/monuelectricals/switchgear/anchor-6a-socket-black.png",
    "Reo_Bell Push_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931089/monuelectricals/switchgear/anchor-bellpush-1m-white.png",
    "Reo_Bell Push_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931088/monuelectricals/switchgear/anchor-bellpush-1m-black.png",
    "Reo_Fan Indicator_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931098/monuelectricals/switchgear/anchor-fanindicator-1m-white.png",
    "Reo_Fan Indicator_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931096/monuelectricals/switchgear/anchor-fanindicator-1m-black.png",
    "Reo_Blank_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931080/monuelectricals/switchgear/anchor-6a-blank-white.png",
    "Reo_Blank_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931078/monuelectricals/switchgear/anchor-6a-blank-black.png",
    "Reo_Plate_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931112/monuelectricals/switchgear/havells-1m-plate-white.png",
    "Reo_Plate_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931146/monuelectricals/switchgear/havells-adiva-4m-plate-black.png",
};

// Helper: creates a parent product + its variants
async function createParentWithVariants(
    ctx: any,
    parent: {
        categoryId: Id<"categories">;
        name: string;
        brand: string;
        baseImage: string;
        basePrice?: string;
        type?: string;
        subCategory?: string;
        brandLine?: string;
        shape?: string;
        motor?: string;
        energy?: string;
    },
    variants: Array<{
        color?: string;
        size?: string;
        image: string;
        price?: string;
        outOfStock?: boolean;
    }>
) {
    const productId = await ctx.db.insert("products", parent);
    for (const variant of variants) {
        await ctx.db.insert("productVariants", { productId, ...variant });
    }
    return productId;
}

export const seedAll = internalMutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("categories").first();
        if (existing) {
            throw new Error("Database already seeded! Clear the tables first if you want to re-seed.");
        }

        // === CATEGORIES ===
        const ceilingFansId = await ctx.db.insert("categories", {
            name: "Ceiling Fans", slug: "ceiling-fans",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930915/monuelectricals/category-cover/fan-cover.png",
            displayOrder: 0,
        });
        const ventilationId = await ctx.db.insert("categories", {
            name: "Ventilation", slug: "ventilation",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930919/monuelectricals/category-cover/haveels-venti.png",
            displayOrder: 1,
        });
        const switchgearId = await ctx.db.insert("categories", {
            name: "Switchgear", slug: "switchgear",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930923/monuelectricals/category-cover/switch-cover.png",
            displayOrder: 2,
        });
        const chimneysId = await ctx.db.insert("categories", {
            name: "Chimneys", slug: "chimneys",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930922/monuelectricals/category-cover/sakash-automatic-chimney.png",
            displayOrder: 3,
        });
        const wiresId = await ctx.db.insert("categories", {
            name: "Wires", slug: "wires",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930920/monuelectricals/category-cover/havells-wire.png",
            displayOrder: 4,
        });
        const lightingId = await ctx.db.insert("categories", {
            name: "Lighting", slug: "lighting",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930914/monuelectricals/category-cover/celing-light.png",
            displayOrder: 5,
        });

        // === CEILING FANS ===
        // Each fan definition is now { parent fields, variants[] }
        const fanDefs = [
            { name: "Atomberg Renessa", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Black", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Atomberg Ikona", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Black", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Bajaj Artisan", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "Grey", size: "1200mm", price: "₹5,000" },
                { color: "Dark Brown", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Bajaj Style Pro", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Brown", size: "1200mm", price: "₹5,000" },
                { color: "Beige", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Crompton Superbreeze", brand: "Crompton", type: "Plain", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Brown", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Havells Enticer", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Brown", size: "1200mm", price: "₹5,000" },
                { color: "Gold", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Havells Exter", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Brown", size: "1200mm", price: "₹5,000" },
                { color: "Beige", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Havells Quickair", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Blue", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Havells Crist BLDC", brand: "Havells", type: "Decorative", motor: "BLDC", energy: "23W",
              variants: [
                { color: "Brown", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Havells Epic BLDC", brand: "Havells", type: "Decorative", motor: "BLDC", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Orient Blanco", brand: "Orient", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "Beige", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Reo Utsav", brand: "Havells", type: "Plain", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
                { color: "White", size: "600mm", price: "₹2,500" },
                { color: "Brown", size: "1200mm", price: "₹5,000" },
                { color: "Brown", size: "600mm", price: "₹2,500" },
              ]},
            { name: "Surya Astra", brand: "Surya", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "Brown", size: "1200mm", price: "₹5,000" },
              ]},
            { name: "Bajaj Eldico", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W",
              variants: [
                { color: "White", size: "1200mm", price: "₹5,000" },
              ]},
        ];

        for (const fan of fanDefs) {
            const { variants, ...parentFields } = fan;
            const firstVariant = variants[0];
            const baseImage = FAN_IMAGES[`${fan.name}_${firstVariant.color}`] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930951/monuelectricals/fans/havells-enticer-brown.png";
            await createParentWithVariants(ctx,
                { categoryId: ceilingFansId, ...parentFields, baseImage, basePrice: firstVariant.price },
                variants.map(v => ({
                    ...v,
                    image: FAN_IMAGES[`${fan.name}_${v.color}`] || baseImage,
                }))
            );
        }

        // === EXHAUST/VENTILATION FANS ===
        const exhaustDefs = [
            { name: "Surya Beach Air", brand: "Surya",
              variants: [{ color: "White", size: "200mm" }]},
            { name: "Crompton Ventilus", brand: "Crompton",
              variants: [{ color: "White", size: "150mm", price: "₹500" }]},
            { name: "Crompton Axial Air", brand: "Crompton",
              variants: [{ color: "White", size: "200mm", price: "₹100" }]},
            { name: "Anchor Smart Air", brand: "Anchor",
              variants: [{ color: "White", size: "250mm", price: "₹100" }]},
            { name: "Anchor Smart Air High Speed", brand: "Anchor",
              variants: [{ color: "White", size: "200mm", price: "₹100" }]},
            { name: "Havells Air Thrill DX", brand: "Havells",
              variants: [
                { color: "White", size: "200mm", price: "₹100" },
                { color: "White", size: "250mm", price: "₹200" },
              ]},
            { name: "Sakash Ventilation Fan", brand: "Sakash",
              variants: [
                { color: "White", size: "150mm", price: "₹100" },
                { color: "White", size: "200mm", price: "₹100" },
                { color: "White", size: "250mm", price: "₹200" },
              ]},
            { name: "RR Signature Ventilation Fan", brand: "RR",
              variants: [{ color: "White", size: "150mm", price: "₹100" }]},
        ];

        for (const ef of exhaustDefs) {
            const { variants, ...parentFields } = ef;
            const baseImage = EXHAUST_IMAGES[ef.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931249/monuelectricals/ventilation-fans/crompton-ventlius-150mm.png";
            await createParentWithVariants(ctx,
                { categoryId: ventilationId, ...parentFields, baseImage, basePrice: (variants[0] as any).price || "₹100", type: "Exhaust Fan" },
                variants.map(v => ({
                    ...v,
                    image: (v.size === "250mm" ? EXHAUST_IMAGES[`${ef.name}_250mm`] : null) || EXHAUST_IMAGES[ef.name] || baseImage,
                }))
            );
        }

        // === CHIMNEYS ===
        const chimneyDefs = [
            { name: "Glen Auto Clean Chimney", brand: "Glen", type: "Auto Clean" },
            { name: "Glen Chimney", brand: "Glen", type: "Manual" },
            { name: "Inalsa Chimney", brand: "Inalsa", type: "Manual" },
            { name: "Sakash Auto Clean Chimney", brand: "Sakash", type: "Auto Clean" },
        ];

        for (const ch of chimneyDefs) {
            const baseImage = CHIMNEY_IMAGES[ch.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930930/monuelectricals/chimneys/sakash-automatic-chimney.png";
            await createParentWithVariants(ctx,
                { categoryId: chimneysId, name: ch.name, brand: ch.brand, type: ch.type, baseImage },
                [{ color: "Black", image: baseImage }]
            );
        }

        // === WIRES ===
        const wireBrands = [
            { brand: "Havells", name: "Havells Life Line", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", undefined, "₹100", "₹100", "₹200", "₹200"] },
            { brand: "Polycab", name: "Polycab Etira Wires", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", "₹852", "₹800", "₹741", "₹123", "₹456"] },
            { brand: "Chiwas", name: "Chiwas ZHFR", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", "₹100", "₹753", "₹789", "₹4,523", "₹423"] },
        ];
        const wireColors = ["Red", "Blue", "Black", "Green", "Yellow"];

        for (const wb of wireBrands) {
            // One parent per brand+name, variants for each color+size combo
            const firstColorImage = WIRE_IMAGES[`${wb.name}_Red`] || WIRE_IMAGES[wb.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931269/monuelectricals/wires/havells-wire.png";
            const variants: Array<{ color: string; size: string; image: string; price?: string }> = [];

            for (let si = 0; si < wb.sizes.length; si++) {
                for (const color of wireColors) {
                    const imageKey = `${wb.name}_${color}`;
                    variants.push({
                        color,
                        size: wb.sizes[si],
                        image: WIRE_IMAGES[imageKey] || WIRE_IMAGES[wb.name] || firstColorImage,
                        price: wb.basePrices[si],
                    });
                }
            }

            await createParentWithVariants(ctx,
                { categoryId: wiresId, name: wb.name, brand: wb.brand, baseImage: firstColorImage, basePrice: wb.basePrices[0] },
                variants
            );
        }

        // === SWITCHES ===
        await seedSwitches(ctx, switchgearId);

        // === LIGHTING ===
        await seedLighting(ctx, lightingId);

        return { success: true, message: "All data seeded with parent-child structure!" };
    },
});

async function seedSwitches(ctx: any, categoryId: Id<"categories">) {
    // Helper for switch brands
    async function seedSwitchBrand(
        items: Array<{ name: string; type: string }>,
        brand: string,
        brandLine: string,
        colors: string[],
        brandKey: string
    ) {
        for (const item of items) {
            const firstColor = colors[0];
            const baseImage = SWITCH_IMAGES[`${brandKey}_${item.type}_${firstColor}`] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931087/monuelectricals/switchgear/anchor-6a-switch-white.png";

            await createParentWithVariants(ctx,
                { categoryId, name: item.name, brand, brandLine, type: item.type, baseImage },
                colors.map(color => ({
                    color,
                    image: SWITCH_IMAGES[`${brandKey}_${item.type}_${color}`] || baseImage,
                }))
            );
        }
    }

    // Reo by Havells
    const reoItems = [
        { name: "Reo 6A Switch", type: "Switch" },
        { name: "Reo 16A Switch", type: "Switch" },
        { name: "Reo 6A Socket", type: "Socket" },
        { name: "Reo 16A Socket", type: "Socket" },
        { name: "Reo Bell Push 1M", type: "Bell Push" },
        { name: "Reo Bell Push 2M", type: "Bell Push" },
        { name: "Reo Fan Indicator 1M", type: "Fan Indicator" },
        { name: "Reo Fan Indicator 2M", type: "Fan Indicator" },
        { name: "Reo 6A 2-Way Switch", type: "Switch" },
        { name: "Reo Blank", type: "Blank" },
        { name: "Reo 2M Plate", type: "Plate" },
        { name: "Reo 1M Plate", type: "Plate" },
        { name: "Reo 3M Plate", type: "Plate" },
        { name: "Reo 4M Plate", type: "Plate" },
        { name: "Reo 6M Plate", type: "Plate" },
        { name: "Reo 8M(V) Plate", type: "Plate" },
        { name: "Reo 8M(H) Plate", type: "Plate" },
        { name: "Reo 12M Plate", type: "Plate" },
        { name: "Reo 16M Plate", type: "Plate" },
        { name: "Reo 18M Plate", type: "Plate" },
    ];
    await seedSwitchBrand(reoItems, "Reo", "REO BY HAVELLS", ["White", "Black"], "Reo");

    // Anchor Penta
    const anchorItems = [
        { name: "Anchor Penta 6A Switch", type: "Switch" },
        { name: "Anchor Penta 16A Switch", type: "Switch" },
        { name: "Anchor Penta 6A Socket", type: "Socket" },
        { name: "Anchor Penta 16A Socket", type: "Socket" },
        { name: "Anchor Bell Push 1M", type: "Bell Push" },
        { name: "Anchor Bell Push 2M", type: "Bell Push" },
        { name: "Anchor Fan Indicator 1M", type: "Fan Indicator" },
        { name: "Anchor Fan Indicator 2M", type: "Fan Indicator" },
    ];
    await seedSwitchBrand(anchorItems, "Anchor", "ANCHOR PENTA", ["White", "Black"], "Anchor");

    // Havells Adiva
    const havellsItems = [
        { name: "Havells Adiva 6A Switch", type: "Switch" },
        { name: "Havells Adiva 16A Switch", type: "Switch" },
        { name: "Havells Adiva 6A Socket", type: "Socket" },
        { name: "Havells Adiva 16A Socket", type: "Socket" },
        { name: "Havells Adiva Bell Push 1M", type: "Bell Push" },
        { name: "Havells Adiva Bell Push 2M", type: "Bell Push" },
        { name: "Havells Adiva Fan Indicator 1M", type: "Fan Indicator" },
        { name: "Havells Adiva Fan Indicator 2M", type: "Fan Indicator" },
        { name: "Havells Adiva 6A 2-Way Switch", type: "Switch" },
        { name: "Havells Adiva Blank", type: "Blank" },
        { name: "Havells Adiva 2M Plate", type: "Plate" },
        { name: "Havells Adiva 1M Plate", type: "Plate" },
        { name: "Havells Adiva 3M Plate", type: "Plate" },
        { name: "Havells Adiva 4M Plate", type: "Plate" },
        { name: "Havells Adiva 6M Plate", type: "Plate" },
        { name: "Havells Adiva 8M(V) Plate", type: "Plate" },
        { name: "Havells Adiva 8M(H) Plate", type: "Plate" },
        { name: "Havells Adiva 12M Plate", type: "Plate" },
    ];
    await seedSwitchBrand(havellsItems, "Havells", "HAVELLS ADIVA", ["White", "Black"], "Havells");

    // Havells Adiva 16M Plate - Black only
    const baseImg16m = SWITCH_IMAGES["Havells_Plate_Black"] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931146/monuelectricals/switchgear/havells-adiva-4m-plate-black.png";
    await createParentWithVariants(ctx,
        { categoryId, name: "Havells Adiva 16M Plate", brand: "Havells", brandLine: "HAVELLS ADIVA", type: "Plate", baseImage: baseImg16m },
        [{ color: "Black", image: baseImg16m }]
    );

    // Havells Adiva 18M Plate
    await seedSwitchBrand(
        [{ name: "Havells Adiva 18M Plate", type: "Plate" }],
        "Havells", "HAVELLS ADIVA", ["White", "Black"], "Havells"
    );
}

async function seedLighting(ctx: any, categoryId: Id<"categories">) {
    const colors2 = ["Warm White", "Cool White"];
    const sizes3 = ["6W", "10W", "15W"];
    const defaultLightImg = "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931003/monuelectricals/lights/down-lights/havells-trim-nxt-round.png";

    // LED Panels - Recessed
    const recessedPanels = [
        { name: "Surya Shine NXT", brand: "Surya", shape: "Round" },
        { name: "Surya Shine NXT Square", brand: "Surya", shape: "Square" },
        { name: "Havells Trim NXT", brand: "Havells", shape: "Round" },
        { name: "Havells Trim NXT", brand: "Havells", shape: "Square" },
        { name: "Halonix Kornet Max+", brand: "Halonix", shape: "Round" },
        { name: "Halonix Kornet Max+", brand: "Halonix", shape: "Square" },
        { name: "Philips Astra Sleek", brand: "Philips", shape: "Round" },
        { name: "Philips Astra Sleek", brand: "Philips", shape: "Square" },
    ];

    for (const panel of recessedPanels) {
        const imageKey = `${panel.name}_${panel.shape}`;
        const baseImage = LIGHT_IMAGES[imageKey] || defaultLightImg;
        const variants: Array<{ color: string; size: string; image: string; price: string }> = [];
        for (const color of colors2) {
            for (const size of sizes3) {
                variants.push({
                    color, size, image: baseImage,
                    price: size === "6W" ? "₹40" : size === "10W" ? "₹50" : "₹60",
                });
            }
        }
        await createParentWithVariants(ctx,
            { categoryId, name: panel.name, brand: panel.brand, baseImage, type: "Recessed", subCategory: "LED Panel", shape: panel.shape },
            variants
        );
    }

    // Havells Luna (only 6W)
    const lunaImg = LIGHT_IMAGES["Havells Luna_Round"] || defaultLightImg;
    await createParentWithVariants(ctx,
        { categoryId, name: "Havells Luna", brand: "Havells", baseImage: lunaImg, type: "Recessed", subCategory: "LED Panel", shape: "Round", basePrice: "₹40" },
        colors2.map(color => ({ color, size: "6W", image: lunaImg, price: "₹40" }))
    );

    // Surface panels
    const surfacePanels = [
        { name: "Havells Trim Cosmo", brand: "Havells", shapes: ["Round", "Square"] },
        { name: "Surya Dazzle Max", brand: "Surya", shapes: ["Round"] },
        { name: "Surya Dazzle Max", brand: "Surya", shapes: ["Square"] },
        { name: "Halonix Orion", brand: "Halonix", shapes: ["Round"] },
        { name: "Halonix Orion", brand: "Halonix", shapes: ["Square"] },
    ];

    for (const panel of surfacePanels) {
        for (const shape of panel.shapes) {
            const imageKey = `${panel.name}_${shape}`;
            const baseImage = LIGHT_IMAGES[imageKey] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931014/monuelectricals/lights/surface-light/havells-trim-cosmo-round.png";
            const variants: Array<{ color: string; size: string; image: string; price: string }> = [];
            for (const color of colors2) {
                for (const size of sizes3) {
                    variants.push({
                        color, size, image: baseImage,
                        price: size === "6W" ? "₹40" : size === "10W" ? "₹50" : "₹60",
                    });
                }
            }
            await createParentWithVariants(ctx,
                { categoryId, name: panel.name, brand: panel.brand, baseImage, type: "Surface", subCategory: "LED Panel", shape },
                variants
            );
        }
    }

    // Concealed panels
    const concealedPanels = [
        { name: "Surya Moon Pro", brand: "Surya" },
        { name: "Halonix Edge Glow", brand: "Halonix" },
    ];
    for (const panel of concealedPanels) {
        const baseImage = LIGHT_IMAGES[`${panel.name}_Round`] || LIGHT_IMAGES[panel.name] || defaultLightImg;
        await createParentWithVariants(ctx,
            { categoryId, name: panel.name, brand: panel.brand, baseImage, type: "Concealed", subCategory: "LED Panel", shape: "Round", basePrice: "₹40" },
            colors2.map(color => ({ color, size: "6W", image: baseImage, price: "₹40" }))
        );
    }

    // LED Bulbs
    const bulbs = [
        { name: "Halonix Astron Plus", brand: "Halonix", sizes: ["9W", "12W"], prices: ["₹40", "₹40"] },
        { name: "Surya Neo Max D", brand: "Surya", sizes: ["9W", "10W", "15W"], prices: ["₹40", "₹50", "₹60"] },
        { name: "Panasonic Led Bulb", brand: "Panasonic", sizes: ["9W", "15W"], prices: ["₹40", "₹60"] },
        { name: "Halonix Astron Jumbo", brand: "Halonix", sizes: ["40W", "50W"], prices: [undefined, undefined] },
    ];
    for (const bulb of bulbs) {
        const baseImage = LIGHT_IMAGES[bulb.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930993/monuelectricals/lights/bulbs/halonix-astron-plus.png";
        const variants = bulb.sizes.map((size, i) => ({
            color: "Cool White" as string,
            size,
            image: baseImage,
            price: bulb.prices[i],
        }));
        await createParentWithVariants(ctx,
            { categoryId, name: bulb.name, brand: bulb.brand, baseImage, type: "Bulb", subCategory: "LED Bulb", basePrice: bulb.prices[0] },
            variants
        );
    }

    // LED Battens
    const battens = [
        { name: "Surya Amaze Metalica", brand: "Surya", sizes: ["36W", "40W"], prices: ["₹500", "₹600"] },
        { name: "Surya GLine", brand: "Surya", sizes: ["20W", "22W"], prices: ["₹100", "₹200"] },
        { name: "Bajaj Beam Max", brand: "Bajaj", sizes: ["40W"], prices: ["₹500"] },
        { name: "Halonix Streak Square", brand: "Halonix", sizes: ["20W"], prices: ["₹100"] },
        { name: "Halonix Lotus", brand: "Halonix", sizes: ["40W"], prices: ["₹500"] },
        { name: "Philips Led Batten", brand: "Philips", sizes: ["20W"], prices: ["₹100"] },
        { name: "Havells Led Batten", brand: "Havells", sizes: ["20W", "25W"], prices: ["₹100", "₹200"] },
    ];
    for (const batten of battens) {
        const baseImage = LIGHT_IMAGES[batten.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png";
        const variants = batten.sizes.map((size, i) => ({
            color: "Cool White" as string,
            size,
            image: baseImage,
            price: batten.prices[i],
        }));
        await createParentWithVariants(ctx,
            { categoryId, name: batten.name, brand: batten.brand, baseImage, type: "Batten", subCategory: "LED Batten", basePrice: batten.prices[0] },
            variants
        );
    }

    // Spotlights
    const spotlights = [
        { name: "Reo Flare", brand: "Havells" },
        { name: "Surya Prime Spot", brand: "Surya" },
    ];
    for (const spot of spotlights) {
        const baseImage = LIGHT_IMAGES[spot.name] || "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930988/monuelectricals/lights/assessory/surya-prime-spot.png";
        await createParentWithVariants(ctx,
            { categoryId, name: spot.name, brand: spot.brand, baseImage, type: "Spotlight", subCategory: "Spotlight", basePrice: "₹200" },
            [
                { color: "Warm White", size: "2W", image: baseImage, price: "₹200" },
                { color: "White", size: "2W", image: baseImage, price: "₹200" },
            ]
        );
    }
}
