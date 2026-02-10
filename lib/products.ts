export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  color?: string;
  type?: string;
};

export type Category = {
  slug: string;
  name: string;
  cover: string;
  count: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    slug: "ceiling-fans",
    name: "Ceiling Fans",
    cover: "/assets/category-cover/fan-cover.png",
    count: "28+",
    products: [
      { id: "f1", name: "Enticer", brand: "Havells", image: "/assets/fans/havells-enticer-brown.png", color: "Brown", type: "Standard" },
      { id: "f2", name: "Enticer", brand: "Havells", image: "/assets/fans/havells-enticer-white.png", color: "White", type: "Standard" },
      { id: "f3", name: "Enticer", brand: "Havells", image: "/assets/fans/havells-enticer-gold.png", color: "Gold", type: "Standard" },
      { id: "f4", name: "Exter", brand: "Havells", image: "/assets/fans/havells-exter-brown.png", color: "Brown", type: "Standard" },
      { id: "f5", name: "Exter", brand: "Havells", image: "/assets/fans/havells-exter-beige.png", color: "Beige", type: "Standard" },
      { id: "f6", name: "Exter", brand: "Havells", image: "/assets/fans/havells-exter-white.png", color: "White", type: "Standard" },
      { id: "f7", name: "Quick Air", brand: "Havells", image: "/assets/fans/havells-quickair-white.png", color: "White", type: "Standard" },
      { id: "f8", name: "Quick Air", brand: "Havells", image: "/assets/fans/havells-quickair-blue.png", color: "Blue", type: "Standard" },
      { id: "f9", name: "Epic BLDC", brand: "Havells", image: "/assets/fans/havells-epicbldc-white.png", color: "White", type: "BLDC" },
      { id: "f10", name: "Crist BLDC", brand: "Havells", image: "/assets/fans/havells-crist-bldc-brown.png", color: "Brown", type: "BLDC" },
      { id: "f11", name: "Leganza", brand: "Havells", image: "/assets/fans/havells-leganza-grey.png", color: "Grey", type: "Designer" },
      { id: "f12", name: "Renesa", brand: "Atomberg", image: "/assets/fans/atomberg-renesa-white.png", color: "White", type: "BLDC" },
      { id: "f13", name: "Renesa", brand: "Atomberg", image: "/assets/fans/atomberg-renesa-black.png", color: "Black", type: "BLDC" },
      { id: "f14", name: "Ikona", brand: "Atomberg", image: "/assets/fans/atomberg-ikona-black.png", color: "Black", type: "BLDC" },
      { id: "f15", name: "Super Breeze", brand: "Crompton", image: "/assets/fans/crompton-superbreeze-white.png", color: "White", type: "Standard" },
      { id: "f16", name: "Super Breeze", brand: "Crompton", image: "/assets/fans/crompton-superbreeze-brown.png", color: "Brown", type: "Standard" },
      { id: "f17", name: "Artisan", brand: "Bajaj", image: "/assets/fans/bajaj-artisan-grey.png", color: "Grey", type: "Designer" },
      { id: "f18", name: "Artisan", brand: "Bajaj", image: "/assets/fans/bajaj-artisan-darkbrown.png", color: "Dark Brown", type: "Designer" },
      { id: "f19", name: "Style Pro", brand: "Bajaj", image: "/assets/fans/bajaj-stylepro-white.png", color: "White", type: "Standard" },
      { id: "f20", name: "Style Pro", brand: "Bajaj", image: "/assets/fans/bajaj-stylepro-beige.png", color: "Beige", type: "Standard" },
      { id: "f21", name: "Style Pro", brand: "Bajaj", image: "/assets/fans/bajaj-stylepro-brown.png", color: "Brown", type: "Standard" },
      { id: "f22", name: "Eldico", brand: "Bajaj", image: "/assets/fans/bajaj-eldico.png", color: "White", type: "Standard" },
      { id: "f23", name: "Blanco", brand: "Orient", image: "/assets/fans/orient-blanco-white.png", color: "White", type: "Standard" },
      { id: "f24", name: "Blanco", brand: "Orient", image: "/assets/fans/orient-blanco-beige.png", color: "Beige", type: "Standard" },
      { id: "f25", name: "Utsav", brand: "Reo", image: "/assets/fans/reo-utsav-white.png", color: "White", type: "Standard" },
      { id: "f26", name: "Utsav", brand: "Reo", image: "/assets/fans/reo-utsav-brown.png", color: "Brown", type: "Standard" },
      { id: "f27", name: "Utsav 900mm", brand: "Reo", image: "/assets/fans/reo-utsav-900mm.png", color: "Brown", type: "Standard" },
      { id: "f28", name: "Astra", brand: "Surya", image: "/assets/fans/surya-astra-brown.png", color: "Brown", type: "Standard" },
    ],
  },
  {
    slug: "ventilation",
    name: "Ventilation",
    cover: "/assets/category-cover/haveels-venti.png",
    count: "12+",
    products: [
      { id: "v1", name: "Venti", brand: "Crompton", image: "/assets/ventilation-fans/crompton-venti.png", type: "Exhaust Fan" },
      { id: "v2", name: "Venti", brand: "Crompton", image: "/assets/ventilation-fans/crompton-venti2.png", type: "Exhaust Fan" },
      { id: "v3", name: "Axial Air 200mm", brand: "Crompton", image: "/assets/ventilation-fans/crompton-axial-air-200mm.png", type: "Exhaust Fan" },
      { id: "v4", name: "Ventlius 150mm", brand: "Crompton", image: "/assets/ventilation-fans/crompton-ventlius-150mm.png", type: "Exhaust Fan" },
      { id: "v5", name: "Venti", brand: "Havells", image: "/assets/ventilation-fans/haveels-venti.png", type: "Exhaust Fan" },
      { id: "v6", name: "Thrill Air DX", brand: "Havells", image: "/assets/ventilation-fans/havells-thrill-air-dx.png", type: "Exhaust Fan" },
      { id: "v7", name: "Venti", brand: "Standard", image: "/assets/ventilation-fans/standard-venti.png", type: "Exhaust Fan" },
      { id: "v8", name: "Venti", brand: "Sakash", image: "/assets/ventilation-fans/sakash-venti.png", type: "Exhaust Fan" },
      { id: "v9", name: "Smart Air 250mm", brand: "Anchor", image: "/assets/ventilation-fans/anchor-smart-air-250mm.png", type: "Exhaust Fan" },
      { id: "v10", name: "Smart Air High Speed 200mm", brand: "Anchor", image: "/assets/ventilation-fans/anchor-smart-air-high-speed-200mm.png", type: "Exhaust Fan" },
      { id: "v11", name: "Signature Venti 150mm", brand: "RR", image: "/assets/ventilation-fans/rr-signature-venti-150mm.png", type: "Exhaust Fan" },
      { id: "v12", name: "Beach Air 200mm", brand: "Surya", image: "/assets/ventilation-fans/surya-beach-air-200mm.png", type: "Exhaust Fan" },
    ],
  },
  {
    slug: "switchgear",
    name: "Switchgear",
    cover: "/assets/category-cover/switch-cover.png",
    count: "50+",
    products: [
      // Anchor
      { id: "s1", name: "6A Switch", brand: "Anchor", image: "/assets/switchgear/anchor-6a-switch-white.png", color: "White", type: "Switch" },
      { id: "s2", name: "6A Switch", brand: "Anchor", image: "/assets/switchgear/anchor-6a-switch-black.png", color: "Black", type: "Switch" },
      { id: "s3", name: "16A Switch", brand: "Anchor", image: "/assets/switchgear/anchor-16a-switch-white.png", color: "White", type: "Switch" },
      { id: "s4", name: "16A Switch", brand: "Anchor", image: "/assets/switchgear/anchor-16a-switch-black.png", color: "Black", type: "Switch" },
      { id: "s5", name: "6A Socket", brand: "Anchor", image: "/assets/switchgear/anchor-6a-socket-white.png", color: "White", type: "Socket" },
      { id: "s6", name: "6A Socket", brand: "Anchor", image: "/assets/switchgear/anchor-6a-socket-black.png", color: "Black", type: "Socket" },
      { id: "s7", name: "16A Socket", brand: "Anchor", image: "/assets/switchgear/anchor-16asocket-white.png", color: "White", type: "Socket" },
      { id: "s8", name: "16A Socket", brand: "Anchor", image: "/assets/switchgear/anchor-16asocket-black.png", color: "Black", type: "Socket" },
      { id: "s9", name: "6A Blank", brand: "Anchor", image: "/assets/switchgear/anchor-6a-blank-white.png", color: "White", type: "Blank" },
      { id: "s10", name: "6A Blank", brand: "Anchor", image: "/assets/switchgear/anchor-6a-blank-black.png", color: "Black", type: "Blank" },
      { id: "s11", name: "Fan Indicator 1M", brand: "Anchor", image: "/assets/switchgear/anchor-fanindicator-1m-white.png", color: "White", type: "Regulator" },
      { id: "s12", name: "Fan Indicator 1M", brand: "Anchor", image: "/assets/switchgear/anchor-fanindicator-1m-black.png", color: "Black", type: "Regulator" },
      { id: "s13", name: "Fan Indicator 2M", brand: "Anchor", image: "/assets/switchgear/anchor-fanindicator-2m-white.png", color: "White", type: "Regulator" },
      { id: "s14", name: "Fan Indicator 2M", brand: "Anchor", image: "/assets/switchgear/anchor-fanindicator-2m-black.png", color: "Black", type: "Regulator" },
      { id: "s15", name: "Bell Push 1M", brand: "Anchor", image: "/assets/switchgear/anchor-bellpush-1m-white.png", color: "White", type: "Bell Push" },
      { id: "s16", name: "Bell Push 1M", brand: "Anchor", image: "/assets/switchgear/anchor-bellpush-1m-black.png", color: "Black", type: "Bell Push" },
      { id: "s17", name: "Bell Push 2M", brand: "Anchor", image: "/assets/switchgear/anchor-bellpush-2m-white.png", color: "White", type: "Bell Push" },
      { id: "s18", name: "Bell Push 2M", brand: "Anchor", image: "/assets/switchgear/anchor-bellpush-2m-black.png", color: "Black", type: "Bell Push" },
      // Havells
      { id: "s19", name: "1M Plate", brand: "Havells", image: "/assets/switchgear/havells-1m-plate-white.png", color: "White", type: "Plate" },
      { id: "s20", name: "3M Plate", brand: "Havells", image: "/assets/switchgear/havells-3m-plate-white.png", color: "White", type: "Plate" },
      { id: "s21", name: "12M Plate", brand: "Havells", image: "/assets/switchgear/havells-12m-plate-white.png", color: "White", type: "Plate" },
      { id: "s22", name: "18M Plate", brand: "Havells", image: "/assets/switchgear/havells-18m-plate-white.png", color: "White", type: "Plate" },
      { id: "s23", name: "Adiva 4M Plate", brand: "Havells", image: "/assets/switchgear/havells-adiva-4m-plate-black.png", color: "Black", type: "Plate" },
      { id: "s24", name: "Adiva 6M Plate", brand: "Havells", image: "/assets/switchgear/havells-adiva-6m-plate-black.png", color: "Black", type: "Plate" },
      { id: "s25", name: "Adiva 8M Plate", brand: "Havells", image: "/assets/switchgear/havells-adiva-8m-plate-black.png", color: "Black", type: "Plate" },
      { id: "s26", name: "2-Way Switch", brand: "Havells", image: "/assets/switchgear/havells-2wayswitch-white.png", color: "White", type: "Switch" },
      { id: "s27", name: "2-Way Switch", brand: "Havells", image: "/assets/switchgear/havells-2wayswitch-black.png", color: "Black", type: "Switch" },
      { id: "s28", name: "16A Socket", brand: "Havells", image: "/assets/switchgear/havells-16a-socket-black.png", color: "Black", type: "Socket" },
    ],
  },
  {
    slug: "chimneys",
    name: "Chimneys",
    cover: "/assets/category-cover/sakash-automatic-chimney.png",
    count: "8+",
    products: [
      { id: "c1", name: "Automatic Chimney", brand: "Sakash", image: "/assets/chimneys/sakash-automatic-chimney.png", type: "Automatic" },
      { id: "c2", name: "Chimney", brand: "Sakash", image: "/assets/chimneys/Sakashchimney.png", type: "Standard" },
      { id: "c3", name: "Automatic Chimney", brand: "Glen", image: "/assets/chimneys/Glen-automatic-chimney.png", type: "Automatic" },
      { id: "c4", name: "Manual Chimney", brand: "Glen", image: "/assets/chimneys/glen-manual-chimney.png", type: "Manual" },
      { id: "c5", name: "Chimney", brand: "Inalsa", image: "/assets/chimneys/Inalsachimney.jpg", type: "Standard" },
      { id: "c6", name: "Manual Chimney", brand: "Inalsa", image: "/assets/chimneys/inalsa-manual-chimney.png", type: "Manual" },
    ],
  },
  {
    slug: "wires",
    name: "Wires",
    cover: "/assets/category-cover/havells-wire.png",
    count: "20+",
    products: [
      { id: "w1", name: "Wire", brand: "Havells", image: "/assets/wires/havells-wire.png", color: "Multi" },
      { id: "w2", name: "Wire", brand: "Havells", image: "/assets/wires/Havells-wire-blue.png", color: "Blue" },
      { id: "w3", name: "Wire", brand: "Havells", image: "/assets/wires/Havells-wire-red.png", color: "Red" },
      { id: "w4", name: "Wire", brand: "Havells", image: "/assets/wires/Havells-wire-green.png", color: "Green" },
      { id: "w5", name: "Wire", brand: "Havells", image: "/assets/wires/Havells-wire-black.png", color: "Black" },
      { id: "w6", name: "Wire", brand: "Polycab", image: "/assets/wires/polycab-wire.png" },
      { id: "w7", name: "Etira Wire", brand: "Polycab", image: "/assets/wires/polycab-etira-wire.png" },
      { id: "w8", name: "Wire", brand: "Chiwas", image: "/assets/wires/chiwas-wire.png" },
      { id: "w9", name: "Wire", brand: "Chiwas", image: "/assets/wires/Chiwas-wire2.png" },
    ],
  },
  {
    slug: "lighting",
    name: "Lighting",
    cover: "/assets/category-cover/celing-light.png",
    count: "35+",
    products: [
      // Bulbs
      { id: "l1", name: "Neo Maxx", brand: "Surya", image: "/assets/lights/bulbs/surya-neo-maxx.png", type: "Bulb" },
      { id: "l2", name: "LED Bulb", brand: "Panasonic", image: "/assets/lights/bulbs/panasonic-led.png", type: "Bulb" },
      { id: "l3", name: "Astron Plus", brand: "Halonix", image: "/assets/lights/bulbs/halonix-astron-plus.png", type: "Bulb" },
      { id: "l4", name: "Astron Jumbo", brand: "Halonix", image: "/assets/lights/bulbs/halonix-astron-jumbo.png", type: "Bulb" },
      { id: "l5", name: "Astron Jumbo 40W", brand: "Halonix", image: "/assets/lights/bulbs/halonix-astron-jumbo-40W.png", type: "Bulb" },
      // Down Lights
      { id: "l6", name: "Trim NXT Round", brand: "Havells", image: "/assets/lights/down-lights/havells-trim-nxt-round.png", type: "Down Light" },
      { id: "l7", name: "Trim NXT Square", brand: "Havells", image: "/assets/lights/down-lights/havells-trim-nxt-square.png", type: "Down Light" },
      { id: "l8", name: "Luna Round", brand: "Havells", image: "/assets/lights/down-lights/havells-luna-round.png", type: "Down Light" },
      { id: "l9", name: "Down Light Round", brand: "Halonix", image: "/assets/lights/down-lights/halonix-round.png", type: "Down Light" },
      { id: "l10", name: "Edge Glow Round", brand: "Halonix", image: "/assets/lights/down-lights/halonix-edge-glow-round.png", type: "Down Light" },
      { id: "l11", name: "Kornet Max+ Round", brand: "Halonix", image: "/assets/lights/down-lights/halonix-kornet-max+-round.png", type: "Down Light" },
      { id: "l12", name: "Astra Sleek Round", brand: "Philips", image: "/assets/lights/down-lights/philip-astrasleek-round.png", type: "Down Light" },
      { id: "l13", name: "Astra Sleek Square", brand: "Philips", image: "/assets/lights/down-lights/philip-astrasleek-square.png", type: "Down Light" },
      { id: "l14", name: "Shine NXT Round", brand: "Surya", image: "/assets/lights/down-lights/surya-shine-nxt-round.png", type: "Down Light" },
      { id: "l15", name: "Shine NXT Square", brand: "Surya", image: "/assets/lights/down-lights/surya-shine-nxt-square.png", type: "Down Light" },
      // Surface Lights
      { id: "l16", name: "Trim Cosmo Round", brand: "Havells", image: "/assets/lights/surface-light/havells-trim-cosmo-round.png", type: "Surface Light" },
      { id: "l17", name: "Trim Cosmo Square", brand: "Havells", image: "/assets/lights/surface-light/havells-trim-cosmo-square.png", type: "Surface Light" },
      { id: "l18", name: "Orion Round", brand: "Halonix", image: "/assets/lights/surface-light/halonix-orion-round.png", type: "Surface Light" },
      { id: "l19", name: "Orion Surface", brand: "Halonix", image: "/assets/lights/surface-light/halonix-orion-surface.png", type: "Surface Light" },
      { id: "l20", name: "Dazzle Max Round", brand: "Surya", image: "/assets/lights/surface-light/surya-dazzle-max-round.png", type: "Surface Light" },
      { id: "l21", name: "Dazzle Max Square", brand: "Surya", image: "/assets/lights/surface-light/surya-dazzle-max-square.png", type: "Surface Light" },
      // Accessories
      { id: "l22", name: "Prime Spot", brand: "Surya", image: "/assets/lights/assessory/surya-prime-spot.png", type: "Spot Light" },
      { id: "l23", name: "Track Light", brand: "Generic", image: "/assets/lights/assessory/tracklight.png", type: "Track Light" },
      { id: "l24", name: "Flare", brand: "Reo", image: "/assets/lights/assessory/Reo-flare.png", type: "Spot Light" },
      // Tube Light
      { id: "l25", name: "LED Batten", brand: "Generic", image: "/assets/lights/tubelights/ledbatten.png", type: "Tube Light" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBrandsForCategory(slug: string): string[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return [...new Set(category.products.map((p) => p.brand))].sort();
}

export function getTypesForCategory(slug: string): string[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return [...new Set(category.products.map((p) => p.type).filter(Boolean) as string[])].sort();
}

export function getColorsForCategory(slug: string): string[] {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return [...new Set(category.products.map((p) => p.color).filter(Boolean) as string[])].sort();
}
