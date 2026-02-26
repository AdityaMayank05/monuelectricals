import { internalMutation } from "./_generated/server";

// URL mapping from local assets to Cloudinary
const URL_MAP: Record<string, string> = {
    "/assets/category-cover/celing-light.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930914/monuelectricals/category-cover/celing-light.png",
    "/assets/category-cover/fan-cover.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930915/monuelectricals/category-cover/fan-cover.png",
    "/assets/category-cover/haveels-venti.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930919/monuelectricals/category-cover/haveels-venti.png",
    "/assets/category-cover/havells-wire.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930920/monuelectricals/category-cover/havells-wire.png",
    "/assets/category-cover/sakash-automatic-chimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930922/monuelectricals/category-cover/sakash-automatic-chimney.png",
    "/assets/category-cover/switch-cover.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930923/monuelectricals/category-cover/switch-cover.png",
    "/assets/chimneys/Glen-automatic-chimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930925/monuelectricals/chimneys/Glen-automatic-chimney.png",
    "/assets/chimneys/glen-manual-chimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930926/monuelectricals/chimneys/glen-manual-chimney.png",
    "/assets/chimneys/inalsa-manual-chimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930928/monuelectricals/chimneys/inalsa-manual-chimney.png",
    "/assets/chimneys/Inalsachimney.jpg": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930929/monuelectricals/chimneys/Inalsachimney.jpg",
    "/assets/chimneys/sakash-automatic-chimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930930/monuelectricals/chimneys/sakash-automatic-chimney.png",
    "/assets/chimneys/Sakashchimney.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930932/monuelectricals/chimneys/Sakashchimney.png",
    "/assets/fans/atomberg-ikona-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930933/monuelectricals/fans/atomberg-ikona-black.png",
    "/assets/fans/atomberg-renesa-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930935/monuelectricals/fans/atomberg-renesa-black.png",
    "/assets/fans/atomberg-renesa-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930937/monuelectricals/fans/atomberg-renesa-white.png",
    "/assets/fans/bajaj-artisan-darkbrown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930939/monuelectricals/fans/bajaj-artisan-darkbrown.png",
    "/assets/fans/bajaj-artisan-grey.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930940/monuelectricals/fans/bajaj-artisan-grey.png",
    "/assets/fans/bajaj-eldico.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930941/monuelectricals/fans/bajaj-eldico.png",
    "/assets/fans/bajaj-stylepro-beige.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930943/monuelectricals/fans/bajaj-stylepro-beige.png",
    "/assets/fans/bajaj-stylepro-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930944/monuelectricals/fans/bajaj-stylepro-brown.png",
    "/assets/fans/bajaj-stylepro-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930945/monuelectricals/fans/bajaj-stylepro-white.png",
    "/assets/fans/crompton-superbreeze-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930947/monuelectricals/fans/crompton-superbreeze-brown.png",
    "/assets/fans/crompton-superbreeze-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930948/monuelectricals/fans/crompton-superbreeze-white.png",
    "/assets/fans/havells-crist-bldc-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930950/monuelectricals/fans/havells-crist-bldc-brown.png",
    "/assets/fans/havells-enticer-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930951/monuelectricals/fans/havells-enticer-brown.png",
    "/assets/fans/havells-enticer-gold.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930952/monuelectricals/fans/havells-enticer-gold.png",
    "/assets/fans/havells-enticer-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930955/monuelectricals/fans/havells-enticer-white.png",
    "/assets/fans/havells-epicbldc-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930959/monuelectricals/fans/havells-epicbldc-white.png",
    "/assets/fans/havells-exter-beige.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930961/monuelectricals/fans/havells-exter-beige.png",
    "/assets/fans/havells-exter-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930962/monuelectricals/fans/havells-exter-brown.png",
    "/assets/fans/havells-exter-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930963/monuelectricals/fans/havells-exter-white.png",
    "/assets/fans/havells-leganza-grey.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930965/monuelectricals/fans/havells-leganza-grey.png",
    "/assets/fans/havells-quickair-blue.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930966/monuelectricals/fans/havells-quickair-blue.png",
    "/assets/fans/havells-quickair-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930967/monuelectricals/fans/havells-quickair-white.png",
    "/assets/fans/orient-blanco-beige.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930969/monuelectricals/fans/orient-blanco-beige.png",
    "/assets/fans/orient-blanco-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930970/monuelectricals/fans/orient-blanco-white.png",
    "/assets/fans/reo-utsav-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930973/monuelectricals/fans/reo-utsav-brown.png",
    "/assets/fans/reo-utsav-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930974/monuelectricals/fans/reo-utsav-white.png",
    "/assets/fans/surya-astra-brown.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930975/monuelectricals/fans/surya-astra-brown.png",
    "/assets/header-banner-section/page1.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930978/monuelectricals/header-banner-section/page1.png",
    "/assets/header-banner-section/page2.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930982/monuelectricals/header-banner-section/page2.png",
    "/assets/header-banner-section/page3.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930984/monuelectricals/header-banner-section/page3.png",
    "/assets/lights/assessory/Reo-flare.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930987/monuelectricals/lights/assessory/Reo-flare.png",
    "/assets/lights/assessory/surya-prime-spot.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930988/monuelectricals/lights/assessory/surya-prime-spot.png",
    "/assets/lights/bulbs/halonix-astron-jumbo.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930992/monuelectricals/lights/bulbs/halonix-astron-jumbo.png",
    "/assets/lights/bulbs/halonix-astron-plus.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930993/monuelectricals/lights/bulbs/halonix-astron-plus.png",
    "/assets/lights/bulbs/panasonic-led.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930995/monuelectricals/lights/bulbs/panasonic-led.png",
    "/assets/lights/bulbs/surya-neo-maxx.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930996/monuelectricals/lights/bulbs/surya-neo-maxx.png",
    "/assets/lights/down-lights/halonix-edge-glow-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930997/monuelectricals/lights/down-lights/halonix-edge-glow-round.png",
    "/assets/lights/down-lights/halonix-kornet-max+-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930999/monuelectricals/lights/down-lights/halonix-kornet-max%2B-round.png",
    "/assets/lights/down-lights/halonix-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931000/monuelectricals/lights/down-lights/halonix-round.png",
    "/assets/lights/down-lights/havells-luna-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931002/monuelectricals/lights/down-lights/havells-luna-round.png",
    "/assets/lights/down-lights/havells-trim-nxt-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931003/monuelectricals/lights/down-lights/havells-trim-nxt-round.png",
    "/assets/lights/down-lights/havells-trim-nxt-square.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931005/monuelectricals/lights/down-lights/havells-trim-nxt-square.png",
    "/assets/lights/down-lights/philip-astrasleek-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931007/monuelectricals/lights/down-lights/philip-astrasleek-round.png",
    "/assets/lights/down-lights/philip-astrasleek-square.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931008/monuelectricals/lights/down-lights/philip-astrasleek-square.png",
    "/assets/lights/down-lights/surya-shine-nxt-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931009/monuelectricals/lights/down-lights/surya-shine-nxt-round.png",
    "/assets/lights/down-lights/surya-shine-nxt-square.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931011/monuelectricals/lights/down-lights/surya-shine-nxt-square.png",
    "/assets/lights/surface-light/halonix-orion-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931012/monuelectricals/lights/surface-light/halonix-orion-round.png",
    "/assets/lights/surface-light/halonix-orion-surface.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931013/monuelectricals/lights/surface-light/halonix-orion-surface.png",
    "/assets/lights/surface-light/havells-trim-cosmo-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931014/monuelectricals/lights/surface-light/havells-trim-cosmo-round.png",
    "/assets/lights/surface-light/havells-trim-cosmo-square.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931016/monuelectricals/lights/surface-light/havells-trim-cosmo-square.png",
    "/assets/lights/surface-light/surya-dazzle-max-round.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931018/monuelectricals/lights/surface-light/surya-dazzle-max-round.png",
    "/assets/lights/surface-light/surya-dazzle-max-square.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931020/monuelectricals/lights/surface-light/surya-dazzle-max-square.png",
    "/assets/lights/tubelights/ledbatten.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931023/monuelectricals/lights/tubelights/ledbatten.png",
    "/assets/switchgear/anchor-16a-switch-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931026/monuelectricals/switchgear/anchor-16a-switch-black.png",
    "/assets/switchgear/anchor-16a-switch-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931031/monuelectricals/switchgear/anchor-16a-switch-white.png",
    "/assets/switchgear/anchor-6a-blank-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931078/monuelectricals/switchgear/anchor-6a-blank-black.png",
    "/assets/switchgear/anchor-6a-blank-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931080/monuelectricals/switchgear/anchor-6a-blank-white.png",
    "/assets/switchgear/anchor-6a-socket-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931083/monuelectricals/switchgear/anchor-6a-socket-black.png",
    "/assets/switchgear/anchor-6a-socket-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931084/monuelectricals/switchgear/anchor-6a-socket-white.png",
    "/assets/switchgear/anchor-6a-switch-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931085/monuelectricals/switchgear/anchor-6a-switch-black.png",
    "/assets/switchgear/anchor-6a-switch-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931087/monuelectricals/switchgear/anchor-6a-switch-white.png",
    "/assets/switchgear/anchor-bellpush-1m-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931088/monuelectricals/switchgear/anchor-bellpush-1m-black.png",
    "/assets/switchgear/anchor-bellpush-1m-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931089/monuelectricals/switchgear/anchor-bellpush-1m-white.png",
    "/assets/switchgear/anchor-fanindicator-1m-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931096/monuelectricals/switchgear/anchor-fanindicator-1m-black.png",
    "/assets/switchgear/anchor-fanindicator-1m-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931098/monuelectricals/switchgear/anchor-fanindicator-1m-white.png",
    "/assets/switchgear/havells-16a-socket-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931108/monuelectricals/switchgear/havells-16a-socket-black.png",
    "/assets/switchgear/havells-1m-plate-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931112/monuelectricals/switchgear/havells-1m-plate-white.png",
    "/assets/switchgear/havells-2wayswitch-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931114/monuelectricals/switchgear/havells-2wayswitch-black.png",
    "/assets/switchgear/havells-2wayswitch-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931117/monuelectricals/switchgear/havells-2wayswitch-white.png",
    "/assets/switchgear/havells-3m-plate-white.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931121/monuelectricals/switchgear/havells-3m-plate-white.png",
    "/assets/switchgear/havells-adiva-4m-plate-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931146/monuelectricals/switchgear/havells-adiva-4m-plate-black.png",
    "/assets/ventilation-fans/anchor-smart-air-250mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931242/monuelectricals/ventilation-fans/anchor-smart-air-250mm.png",
    "/assets/ventilation-fans/anchor-smart-air-high-speed-200mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931244/monuelectricals/ventilation-fans/anchor-smart-air-high-speed-200mm.png",
    "/assets/ventilation-fans/crompton-axial-air-200mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931245/monuelectricals/ventilation-fans/crompton-axial-air-200mm.png",
    "/assets/ventilation-fans/crompton-venti.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931247/monuelectricals/ventilation-fans/crompton-venti.png",
    "/assets/ventilation-fans/crompton-ventlius-150mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931249/monuelectricals/ventilation-fans/crompton-ventlius-150mm.png",
    "/assets/ventilation-fans/haveels-venti.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931251/monuelectricals/ventilation-fans/haveels-venti.png",
    "/assets/ventilation-fans/havells-thrill-air-dx.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931253/monuelectricals/ventilation-fans/havells-thrill-air-dx.png",
    "/assets/ventilation-fans/rr-signature-venti-150mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931254/monuelectricals/ventilation-fans/rr-signature-venti-150mm.png",
    "/assets/ventilation-fans/sakash-venti.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931256/monuelectricals/ventilation-fans/sakash-venti.png",
    "/assets/ventilation-fans/surya-beach-air-200mm.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931259/monuelectricals/ventilation-fans/surya-beach-air-200mm.png",
    "/assets/wires/chiwas-wire.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931261/monuelectricals/wires/chiwas-wire.png",
    "/assets/wires/Havells-wire-black.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931264/monuelectricals/wires/Havells-wire-black.png",
    "/assets/wires/Havells-wire-blue.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931265/monuelectricals/wires/Havells-wire-blue.png",
    "/assets/wires/Havells-wire-green.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931266/monuelectricals/wires/Havells-wire-green.png",
    "/assets/wires/Havells-wire-red.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931267/monuelectricals/wires/Havells-wire-red.png",
    "/assets/wires/havells-wire.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931269/monuelectricals/wires/havells-wire.png",
    "/assets/wires/polycab-etira-wire.png": "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931270/monuelectricals/wires/polycab-etira-wire.png",
};

/**
 * Migration mutation: updates all product `image` and category `coverImage`
 * fields from local /assets/... paths to Cloudinary URLs.
 * Run once via: npx convex run --no-push migrate:migrateToCloudinary
 */
export const migrateToCloudinary = internalMutation({
    args: {},
    handler: async (ctx) => {
        let productsUpdated = 0;
        let categoriesUpdated = 0;
        let unmapped: string[] = [];

        // Migrate products
        const products = await ctx.db.query("products").collect();
        for (const product of products) {
            if (product.image && product.image.startsWith("/assets/")) {
                const newUrl = URL_MAP[product.image];
                if (newUrl) {
                    await ctx.db.patch(product._id, { image: newUrl });
                    productsUpdated++;
                } else {
                    unmapped.push(product.image);
                }
            }
        }

        // Migrate categories
        const categories = await ctx.db.query("categories").collect();
        for (const cat of categories) {
            if (cat.coverImage && cat.coverImage.startsWith("/assets/")) {
                const newUrl = URL_MAP[cat.coverImage];
                if (newUrl) {
                    await ctx.db.patch(cat._id, { coverImage: newUrl });
                    categoriesUpdated++;
                } else {
                    unmapped.push(cat.coverImage);
                }
            }
        }

        return {
            productsUpdated,
            categoriesUpdated,
            unmappedPaths: [...new Set(unmapped)],
        };
    },
});
