import { internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Image map: excelId+color+size -> image path (from existing lib/products.ts assets)
// We map at the product model level since Excel doesn't have images
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

// Light images mapped by product name
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

// Switchgear images - map by brand line + type + color
const SWITCH_IMAGES: Record<string, string> = {
    // Anchor
    "Anchor_Switch_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931087/monuelectricals/switchgear/anchor-6a-switch-white.png",
    "Anchor_Switch_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931085/monuelectricals/switchgear/anchor-6a-switch-black.png",
    "Anchor_Socket_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931084/monuelectricals/switchgear/anchor-6a-socket-white.png",
    "Anchor_Socket_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931083/monuelectricals/switchgear/anchor-6a-socket-black.png",
    "Anchor_Bell Push_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931089/monuelectricals/switchgear/anchor-bellpush-1m-white.png",
    "Anchor_Bell Push_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931088/monuelectricals/switchgear/anchor-bellpush-1m-black.png",
    "Anchor_Fan Indicator_White": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931098/monuelectricals/switchgear/anchor-fanindicator-1m-white.png",
    "Anchor_Fan Indicator_Black": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931096/monuelectricals/switchgear/anchor-fanindicator-1m-black.png",
    // Havells
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
    // Reo
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

export const seedAll = internalMutation({
    args: {},
    handler: async (ctx) => {
        // Check if already seeded
        const existing = await ctx.db.query("categories").first();
        if (existing) {
            throw new Error("Database already seeded! Clear the tables first if you want to re-seed.");
        }

        // === CATEGORIES ===
        const ceilingFansId = await ctx.db.insert("categories", {
            name: "Ceiling Fans",
            slug: "ceiling-fans",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930915/monuelectricals/category-cover/fan-cover.png",
            displayOrder: 0,
        });
        const ventilationId = await ctx.db.insert("categories", {
            name: "Ventilation",
            slug: "ventilation",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930919/monuelectricals/category-cover/haveels-venti.png",
            displayOrder: 1,
        });
        const switchgearId = await ctx.db.insert("categories", {
            name: "Switchgear",
            slug: "switchgear",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930923/monuelectricals/category-cover/switch-cover.png",
            displayOrder: 2,
        });
        const chimneysId = await ctx.db.insert("categories", {
            name: "Chimneys",
            slug: "chimneys",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930922/monuelectricals/category-cover/sakash-automatic-chimney.png",
            displayOrder: 3,
        });
        const wiresId = await ctx.db.insert("categories", {
            name: "Wires",
            slug: "wires",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930920/monuelectricals/category-cover/havells-wire.png",
            displayOrder: 4,
        });
        const lightingId = await ctx.db.insert("categories", {
            name: "Lighting",
            slug: "lighting",
            coverImage: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930914/monuelectricals/category-cover/celing-light.png",
            displayOrder: 5,
        });

        // === FANS ===
        const fans = [
            { excelId: "f1", name: "Atomberg Renessa", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f1", name: "Atomberg Renessa", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W", color: "Black", size: "1200mm", price: "₹5,000" },
            { excelId: "f2", name: "Atomberg Ikona", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f2", name: "Atomberg Ikona", brand: "Atomberg", type: "Decorative", motor: "BLDC", energy: "23W", color: "Black", size: "1200mm", price: "₹5,000" },
            { excelId: "f3", name: "Bajaj Artisan", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "Grey", size: "1200mm", price: "₹5,000" },
            { excelId: "f3", name: "Bajaj Artisan", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "Dark Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f4", name: "Bajaj Style Pro", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f4", name: "Bajaj Style Pro", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f4", name: "Bajaj Style Pro", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "Beige", size: "1200mm", price: "₹5,000" },
            { excelId: "f5", name: "Crompton Superbreeze", brand: "Crompton", type: "Plain", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f5", name: "Crompton Superbreeze", brand: "Crompton", type: "Plain", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f6", name: "Havells Enticer", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f6", name: "Havells Enticer", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f6", name: "Havells Enticer", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "Gold", size: "1200mm", price: "₹5,000" },
            { excelId: "f7", name: "Havells Exter", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f7", name: "Havells Exter", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f7", name: "Havells Exter", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "Beige", size: "1200mm", price: "₹5,000" },
            { excelId: "f8", name: "Havells Quickair", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f8", name: "Havells Quickair", brand: "Havells", type: "Decorative", motor: "Normal", energy: "23W", color: "Blue", size: "1200mm", price: "₹5,000" },
            { excelId: "f9", name: "Havells Crist BLDC", brand: "Havells", type: "Decorative", motor: "BLDC", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f10", name: "Havells Epic BLDC", brand: "Havells", type: "Decorative", motor: "BLDC", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f11", name: "Orient Blanco", brand: "Orient", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f11", name: "Orient Blanco", brand: "Orient", type: "Decorative", motor: "Normal", energy: "23W", color: "Beige", size: "1200mm", price: "₹5,000" },
            { excelId: "f12", name: "Reo Utsav", brand: "Havells", type: "Plain", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
            { excelId: "f12", name: "Reo Utsav", brand: "Havells", type: "Plain", motor: "Normal", energy: "23W", color: "White", size: "600mm", price: "₹2,500" },
            { excelId: "f12", name: "Reo Utsav", brand: "Havells", type: "Plain", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f12", name: "Reo Utsav", brand: "Havells", type: "Plain", motor: "Normal", energy: "23W", color: "Brown", size: "600mm", price: "₹2,500" },
            { excelId: "f13", name: "Surya Astra", brand: "Surya", type: "Decorative", motor: "Normal", energy: "23W", color: "Brown", size: "1200mm", price: "₹5,000" },
            { excelId: "f14", name: "Bajaj Eldico", brand: "Bajaj", type: "Decorative", motor: "Normal", energy: "23W", color: "White", size: "1200mm", price: "₹5,000" },
        ];

        for (const fan of fans) {
            const imageKey = `${fan.name}_${fan.color}`;
            await ctx.db.insert("products", {
                categoryId: ceilingFansId,
                excelId: fan.excelId,
                name: fan.name,
                brand: fan.brand,
                image: FAN_IMAGES[imageKey] || "/assets/fans/havells-enticer-brown.png",
                color: fan.color,
                type: fan.type,
                motor: fan.motor,
                energy: fan.energy,
                size: fan.size,
                price: fan.price,
            });
        }

        // === EXHAUST FANS ===
        const exhaustFans = [
            { excelId: "vf1", name: "Surya Beach Air", brand: "Surya", color: "White", size: "200mm" },
            { excelId: "vf2", name: "Crompton Ventilus", brand: "Crompton", color: "White", size: "150mm", price: "₹500" },
            { excelId: "vf3", name: "Crompton Axial Air", brand: "Crompton", color: "White", size: "200mm", price: "₹100" },
            { excelId: "vf4", name: "Anchor Smart Air", brand: "Anchor", color: "White", size: "250mm", price: "₹100" },
            { excelId: "vf5", name: "Anchor Smart Air High Speed", brand: "Anchor", color: "White", size: "200mm", price: "₹100" },
            { excelId: "vf6", name: "Havells Air Thrill DX", brand: "Havells", color: "White", size: "200mm", price: "₹100" },
            { excelId: "vf6", name: "Havells Air Thrill DX", brand: "Havells", color: "White", size: "250mm", price: "₹200" },
            { excelId: "vf7", name: "Sakash Ventilation Fan", brand: "Sakash", color: "White", size: "150mm", price: "₹100" },
            { excelId: "vf7", name: "Sakash Ventilation Fan", brand: "Sakash", color: "White", size: "200mm", price: "₹100" },
            { excelId: "vf7", name: "Sakash Ventilation Fan", brand: "Sakash", color: "White", size: "250mm", price: "₹200" },
            { excelId: "vf8", name: "RR Signature Ventilation Fan", brand: "RR", color: "White", size: "150mm", price: "₹100" },
        ];

        for (const ef of exhaustFans) {
            const imageKey = ef.size === "250mm" ? `${ef.name}_250mm` : ef.name;
            await ctx.db.insert("products", {
                categoryId: ventilationId,
                excelId: ef.excelId,
                name: ef.name,
                brand: ef.brand,
                image: EXHAUST_IMAGES[imageKey] || EXHAUST_IMAGES[ef.name] || "/assets/ventilation-fans/crompton-venti.png",
                color: ef.color,
                type: "Exhaust Fan",
                size: ef.size,
                price: ef.price,
            });
        }

        // === CHIMNEYS ===
        const chimneys = [
            { excelId: "c1", name: "Glen Auto Clean Chimney", brand: "Glen", type: "Auto Clean", color: "Black" },
            { excelId: "c2", name: "Glen Chimney", brand: "Glen", type: "Manual", color: "Black" },
            { excelId: "c3", name: "Inalsa Chimney", brand: "Inalsa", type: "Manual", color: "Black" },
            { excelId: "c4", name: "Sakash Auto Clean Chimney", brand: "Sakash", type: "Auto Clean", color: "Black" },
        ];

        for (const ch of chimneys) {
            await ctx.db.insert("products", {
                categoryId: chimneysId,
                excelId: ch.excelId,
                name: ch.name,
                brand: ch.brand,
                image: CHIMNEY_IMAGES[ch.name] || "/assets/chimneys/Sakashchimney.png",
                color: ch.color,
                type: ch.type,
            });
        }

        // === WIRES ===
        const wireColors = ["Red", "Blue", "Black", "Green", "Yellow"];
        const wireBrands = [
            { brand: "Havells", name: "Havells Life Line", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", "—", "₹100", "₹100", "₹200", "₹200"] },
            { brand: "Polycab", name: "Polycab Etira Wires", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", "₹852", "₹800", "₹741", "₹123", "₹456"] },
            { brand: "Chiwas", name: "Chiwas ZHFR", sizes: [".75mm", "1mm", "1.5mm", "2.5mm", "4mm", "6mm"], basePrices: ["₹100", "₹100", "₹753", "₹789", "₹4,523", "₹423"] },
        ];

        let wireExcelId = 1;
        for (const wb of wireBrands) {
            for (let si = 0; si < wb.sizes.length; si++) {
                for (const color of wireColors) {
                    const imageKey = `${wb.name}_${color}`;
                    await ctx.db.insert("products", {
                        categoryId: wiresId,
                        excelId: `w${wireExcelId}`,
                        name: wb.name,
                        brand: wb.brand,
                        image: WIRE_IMAGES[imageKey] || WIRE_IMAGES[wb.name] || "/assets/wires/havells-wire.png",
                        color: color,
                        size: wb.sizes[si],
                        price: wb.basePrices[si] !== "—" ? wb.basePrices[si] : undefined,
                    });
                }
                wireExcelId++;
            }
        }

        // === SWITCHES ===
        await seedSwitches(ctx, switchgearId);

        // === LIGHTING ===
        await seedLighting(ctx, lightingId);

        return { success: true, message: "All data seeded successfully!" };
    },
});

async function seedSwitches(ctx: any, categoryId: Id<"categories">) {
    // Reo by Havells
    const reoItems = [
        { excelId: "s1", name: "Reo 6A Switch", type: "Switch" },
        { excelId: "s2", name: "Reo 16A Switch", type: "Switch" },
        { excelId: "s3", name: "Reo 6A Socket", type: "Socket" },
        { excelId: "s4", name: "Reo 16A Socket", type: "Socket" },
        { excelId: "s5", name: "Reo Bell Push 1M", type: "Bell Push" },
        { excelId: "s6", name: "Reo Bell Push 2M", type: "Bell Push" },
        { excelId: "s7", name: "Reo Fan Indicator 1M", type: "Fan Indicator" },
        { excelId: "s8", name: "Reo Fan Indicator 2M", type: "Fan Indicator" },
        { excelId: "s9", name: "Reo 6A 2-Way Switch", type: "Switch" },
        { excelId: "s10", name: "Reo Blank", type: "Blank" },
        { excelId: "s11", name: "Reo 2M Plate", type: "Plate" },
        { excelId: "s12", name: "Reo 1M Plate", type: "Plate" },
        { excelId: "s13", name: "Reo 3M Plate", type: "Plate" },
        { excelId: "s14", name: "Reo 4M Plate", type: "Plate" },
        { excelId: "s15", name: "Reo 6M Plate", type: "Plate" },
        { excelId: "s16", name: "Reo 8M(V) Plate", type: "Plate" },
        { excelId: "s17", name: "Reo 8M(H) Plate", type: "Plate" },
        { excelId: "s18", name: "Reo 12M Plate", type: "Plate" },
        { excelId: "s19", name: "Reo 16M Plate", type: "Plate" },
        { excelId: "s20", name: "Reo 18M Plate", type: "Plate" },
    ];
    for (const item of reoItems) {
        for (const color of ["White", "Black"]) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: item.excelId,
                name: item.name,
                brand: "Reo",
                brandLine: "REO BY HAVELLS",
                image: SWITCH_IMAGES[`Reo_${item.type}_${color}`] || "/assets/switchgear/anchor-6a-switch-white.png",
                color,
                type: item.type,
            });
        }
    }

    // Anchor Penta
    const anchorItems = [
        { excelId: "s21", name: "Anchor Penta 6A Switch", type: "Switch" },
        { excelId: "s22", name: "Anchor Penta 16A Switch", type: "Switch" },
        { excelId: "s23", name: "Anchor Penta 6A Socket", type: "Socket" },
        { excelId: "s24", name: "Anchor Penta 16A Socket", type: "Socket" },
        { excelId: "s25", name: "Anchor Bell Push 1M", type: "Bell Push" },
        { excelId: "s26", name: "Anchor Bell Push 2M", type: "Bell Push" },
        { excelId: "s27", name: "Anchor Fan Indicator 1M", type: "Fan Indicator" },
        { excelId: "s27", name: "Anchor Fan Indicator 2M", type: "Fan Indicator" },
    ];
    for (const item of anchorItems) {
        for (const color of ["White", "Black"]) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: item.excelId,
                name: item.name,
                brand: "Anchor",
                brandLine: "ANCHOR PENTA",
                image: SWITCH_IMAGES[`Anchor_${item.type}_${color}`] || "/assets/switchgear/anchor-6a-switch-white.png",
                color,
                type: item.type,
            });
        }
    }

    // Havells Adiva
    const havellsItems = [
        { excelId: "s28", name: "Havells Adiva 6A Switch", type: "Switch" },
        { excelId: "s29", name: "Havells Adiva 16A Switch", type: "Switch" },
        { excelId: "s30", name: "Havells Adiva 6A Socket", type: "Socket" },
        { excelId: "s31", name: "Havells Adiva 16A Socket", type: "Socket" },
        { excelId: "s32", name: "Havells Adiva Bell Push 1M", type: "Bell Push" },
        { excelId: "s33", name: "Havells Adiva Bell Push 2M", type: "Bell Push" },
        { excelId: "s34", name: "Havells Adiva Fan Indicator 1M", type: "Fan Indicator" },
        { excelId: "s35", name: "Havells Adiva Fan Indicator 2M", type: "Fan Indicator" },
        { excelId: "s36", name: "Havells Adiva 6A 2-Way Switch", type: "Switch" },
        { excelId: "s37", name: "Havells Adiva Blank", type: "Blank" },
        { excelId: "s38", name: "Havells Adiva 2M Plate", type: "Plate" },
        { excelId: "s39", name: "Havells Adiva 1M Plate", type: "Plate" },
        { excelId: "s40", name: "Havells Adiva 3M Plate", type: "Plate" },
        { excelId: "s41", name: "Havells Adiva 4M Plate", type: "Plate" },
        { excelId: "s42", name: "Havells Adiva 6M Plate", type: "Plate" },
        { excelId: "s43", name: "Havells Adiva 8M(V) Plate", type: "Plate" },
        { excelId: "s44", name: "Havells Adiva 8M(H) Plate", type: "Plate" },
        { excelId: "s45", name: "Havells Adiva 12M Plate", type: "Plate" },
        { excelId: "s46", name: "Havells Adiva 16M Plate", type: "Plate" },
        { excelId: "s47", name: "Havells Adiva 18M Plate", type: "Plate" },
    ];
    for (const item of havellsItems) {
        // s46 only has Black
        const colors = item.excelId === "s46" ? ["Black"] : ["White", "Black"];
        for (const color of colors) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: item.excelId,
                name: item.name,
                brand: "Havells",
                brandLine: "HAVELLS ADIVA",
                image: SWITCH_IMAGES[`Havells_${item.type}_${color}`] || "/assets/switchgear/havells-3m-plate-white.png",
                color,
                type: item.type,
            });
        }
    }
}

async function seedLighting(ctx: any, categoryId: Id<"categories">) {
    // LED Panels - Recessed
    const recessedPanels = [
        { excelId: "l2", name: "Surya Shine NXT", brand: "Surya", shape: "Round" },
        { excelId: "l3", name: "Surya Shine NXT Square", brand: "Surya", shape: "Square" },
        { excelId: "l", name: "Havells Trim NXT", brand: "Havells", shape: "Round" },
        { excelId: "l4", name: "Havells Trim NXT", brand: "Havells", shape: "Square" },
        { excelId: "l6", name: "Halonix Kornet Max+", brand: "Halonix", shape: "Round" },
        { excelId: "l7", name: "Halonix Kornet Max+", brand: "Halonix", shape: "Square" },
        { excelId: "l8", name: "Philips Astra Sleek", brand: "Philips", shape: "Round" },
        { excelId: "l9", name: "Philips Astra Sleek", brand: "Philips", shape: "Square" },
    ];

    const sizes3 = ["6W", "10W", "15W"];
    const colors2 = ["Warm White", "Cool White"];

    for (const panel of recessedPanels) {
        for (const color of colors2) {
            for (const size of sizes3) {
                const imageKey = `${panel.name}_${panel.shape}`;
                await ctx.db.insert("products", {
                    categoryId,
                    excelId: panel.excelId,
                    name: panel.name,
                    brand: panel.brand,
                    image: LIGHT_IMAGES[imageKey] || "/assets/lights/down-lights/havells-trim-nxt-round.png",
                    color,
                    type: "Recessed",
                    subCategory: "LED Panel",
                    shape: panel.shape,
                    size,
                    price: size === "6W" ? "₹40" : size === "10W" ? "₹50" : "₹60",
                });
            }
        }
    }

    // Havells Luna (only 6W)
    for (const color of colors2) {
        await ctx.db.insert("products", {
            categoryId,
            excelId: "l5",
            name: "Havells Luna",
            brand: "Havells",
            image: LIGHT_IMAGES["Havells Luna_Round"] || "/assets/lights/down-lights/havells-luna-round.png",
            color,
            type: "Recessed",
            subCategory: "LED Panel",
            shape: "Round",
            size: "6W",
            price: "₹40",
        });
    }

    // Surface panels
    const surfacePanels = [
        { excelId: "l10", name: "Havells Trim Cosmo", brand: "Havells", shapes: ["Round", "Square"] },
        { excelId: "l11", name: "Surya Dazzle Max", brand: "Surya", shapes: ["Round"] },
        { excelId: "l12", name: "Surya Dazzle Max", brand: "Surya", shapes: ["Square"] },
        { excelId: "l13", name: "Halonix Orion", brand: "Halonix", shapes: ["Round"] },
        { excelId: "l14", name: "Halonix Orion", brand: "Halonix", shapes: ["Square"] },
    ];

    for (const panel of surfacePanels) {
        for (const shape of panel.shapes) {
            for (const color of colors2) {
                for (const size of sizes3) {
                    const imageKey = `${panel.name}_${shape}`;
                    await ctx.db.insert("products", {
                        categoryId,
                        excelId: panel.excelId,
                        name: panel.name,
                        brand: panel.brand,
                        image: LIGHT_IMAGES[imageKey] || "/assets/lights/surface-light/havells-trim-cosmo-round.png",
                        color,
                        type: "Surface",
                        subCategory: "LED Panel",
                        shape,
                        size,
                        price: size === "6W" ? "₹40" : size === "10W" ? "₹50" : "₹60",
                    });
                }
            }
        }
    }

    // Concealed panels
    const concealedPanels = [
        { excelId: "l15", name: "Surya Moon Pro", brand: "Surya" },
        { excelId: "l16", name: "Halonix Edge Glow", brand: "Halonix" },
    ];
    for (const panel of concealedPanels) {
        for (const color of colors2) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: panel.excelId,
                name: panel.name,
                brand: panel.brand,
                image: LIGHT_IMAGES[`${panel.name}_Round`] || LIGHT_IMAGES[panel.name] || "/assets/lights/down-lights/havells-trim-nxt-round.png",
                color,
                type: "Concealed",
                subCategory: "LED Panel",
                shape: "Round",
                size: "6W",
                price: "₹40",
            });
        }
    }

    // LED Bulbs
    const bulbs = [
        { excelId: "lb1", name: "Halonix Astron Plus", brand: "Halonix", sizes: ["9W", "12W"], prices: ["₹40", "₹40"] },
        { excelId: "lb2", name: "Surya Neo Max D", brand: "Surya", sizes: ["9W", "10W", "15W"], prices: ["₹40", "₹50", "₹60"] },
        { excelId: "lb3", name: "Panasonic Led Bulb", brand: "Panasonic", sizes: ["9W", "15W"], prices: ["₹40", "₹60"] },
        { excelId: "lb4", name: "Halonix Astron Jumbo", brand: "Halonix", sizes: ["40W", "50W"], prices: ["—", "—"] },
    ];
    for (const bulb of bulbs) {
        for (let i = 0; i < bulb.sizes.length; i++) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: bulb.excelId,
                name: bulb.name,
                brand: bulb.brand,
                image: LIGHT_IMAGES[bulb.name] || "/assets/lights/bulbs/halonix-astron-plus.png",
                color: "Cool White",
                type: "Bulb",
                subCategory: "LED Bulb",
                size: bulb.sizes[i],
                price: bulb.prices[i] !== "—" ? bulb.prices[i] : undefined,
            });
        }
    }

    // LED Battens
    const battens = [
        { excelId: "lbatten1", name: "Surya Amaze Metalica", brand: "Surya", sizes: ["36W", "40W"], prices: ["₹500", "₹600"] },
        { excelId: "lbatten2", name: "Surya GLine", brand: "Surya", sizes: ["20W", "22W"], prices: ["₹100", "₹200"] },
        { excelId: "lbatten3", name: "Bajaj Beam Max", brand: "Bajaj", sizes: ["40W"], prices: ["₹500"] },
        { excelId: "lbatten4", name: "Halonix Streak Square", brand: "Halonix", sizes: ["20W"], prices: ["₹100"] },
        { excelId: "lbatten5", name: "Halonix Lotus", brand: "Halonix", sizes: ["40W"], prices: ["₹500"] },
        { excelId: "lbatten6", name: "Philips Led Batten", brand: "Philips", sizes: ["20W"], prices: ["₹100"] },
        { excelId: "lbatten7", name: "Havells Led Batten", brand: "Havells", sizes: ["20W", "25W"], prices: ["₹100", "₹200"] },
    ];
    for (const batten of battens) {
        for (let i = 0; i < batten.sizes.length; i++) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: batten.excelId,
                name: batten.name,
                brand: batten.brand,
                image: LIGHT_IMAGES[batten.name] || "/assets/lights/tubelights/ledbatten.png",
                color: "Cool White",
                type: "Batten",
                subCategory: "LED Batten",
                size: batten.sizes[i],
                price: batten.prices[i],
            });
        }
    }

    // Spotlights
    const spotlights = [
        { excelId: "sl1", name: "Reo Flare", brand: "Havells" },
        { excelId: "sl2", name: "Surya Prime Spot", brand: "Surya" },
    ];
    for (const spot of spotlights) {
        for (const color of ["Warm White", "White"]) {
            await ctx.db.insert("products", {
                categoryId,
                excelId: spot.excelId,
                name: spot.name,
                brand: spot.brand,
                image: LIGHT_IMAGES[spot.name] || "/assets/lights/assessory/surya-prime-spot.png",
                color,
                type: "Spotlight",
                subCategory: "Spotlight",
                size: "2W",
                price: "₹200",
            });
        }
    }
}
