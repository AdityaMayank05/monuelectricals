"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getCategoryBySlug,
  getBrandsForCategory,
  getTypesForCategory,
  getColorsForCategory,
  categories,
} from "@/lib/products";

export default function ProductsPage() {
  const params = useParams();
  const slug = params.category as string;
  const category = getCategoryBySlug(slug);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const brands = useMemo(() => getBrandsForCategory(slug), [slug]);
  const types = useMemo(() => getTypesForCategory(slug), [slug]);
  const colors = useMemo(() => getColorsForCategory(slug), [slug]);

  const filteredProducts = useMemo(() => {
    if (!category) return [];
    return category.products.filter((p) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (selectedTypes.length > 0 && p.type && !selectedTypes.includes(p.type)) return false;
      if (selectedColors.length > 0 && p.color && !selectedColors.includes(p.color)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.type && p.type.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [category, selectedBrands, selectedTypes, selectedColors, searchQuery]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedColors([]);
    setSearchQuery("");
  };

  const activeFilterCount = selectedBrands.length + selectedTypes.length + selectedColors.length;

  if (!category) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black">Category Not Found</h1>
          <p className="text-zinc-500 mt-4">The category you are looking for does not exist.</p>
          <Link href="/" className="inline-block mt-8 bg-amber-500 text-zinc-950 px-6 py-3 font-bold hover:bg-amber-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      {/* Search */}
      <div className="mb-8">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 px-4 py-3 text-sm placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="mb-8">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Brand</label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer rounded ${
                  selectedBrands.includes(brand)
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent"
                }`}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 ${
                  selectedBrands.includes(brand) ? "border-amber-500 bg-amber-500" : "border-zinc-600"
                }`}>
                  {selectedBrands.includes(brand) && (
                    <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Type Filter */}
      {types.length > 1 && (
        <div className="mb-8">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Type</label>
          <div className="space-y-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer rounded ${
                  selectedTypes.includes(type)
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent"
                }`}
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 ${
                  selectedTypes.includes(type) ? "border-amber-500 bg-amber-500" : "border-zinc-600"
                }`}>
                  {selectedTypes.includes(type) && (
                    <svg className="w-3 h-3 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Filter */}
      {colors.length > 1 && (
        <div className="mb-8">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer rounded-full border ${
                  selectedColors.includes(color)
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/50"
                    : "text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear All */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full text-sm text-zinc-500 hover:text-amber-400 py-2 border border-zinc-800 hover:border-amber-500/30 transition-colors cursor-pointer rounded"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}

      {/* Category Navigation */}
      <div className="mt-10 pt-8 border-t border-zinc-800">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Categories</label>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className={`block px-3 py-2 text-sm rounded transition-colors ${
                cat.slug === slug
                  ? "bg-amber-500/15 text-amber-400 font-bold"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {cat.name}
              <span className="text-zinc-600 ml-2">({cat.products.length})</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 bg-amber-500 flex items-center justify-center">
                <span className="text-zinc-950 font-black">P</span>
              </div>
              <span className="text-lg font-black tracking-tighter">
                POWER<span className="text-amber-500">ZONE</span>
              </span>
            </Link>
            {/* Breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-zinc-300">{category.name}</span>
            </div>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm font-bold cursor-pointer hover:border-amber-500/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-zinc-950 text-xs font-black rounded-full flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Category Hero Banner - Unique for each category */}
      {slug === "ceiling-fans" && (
        <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          {/* Animated rotating fan blades background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="animate-spin-slow w-96 h-96">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M100,20 L100,50 M100,150 L100,180 M20,100 L50,100 M150,100 L180,100" stroke="currentColor" strokeWidth="4" className="text-zinc-400" />
                <circle cx="100" cy="100" r="8" fill="currentColor" className="text-zinc-400" />
              </svg>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center p-8 shadow-2xl shadow-amber-500/10 animate-float">
                  <Image src={category.cover} alt={category.name} width={120} height={120} className="object-contain animate-spin-slow" />
                </div>
                <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-xl"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  {category.name}
                </h1>
                <p className="text-zinc-500 mt-2 text-lg">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                  {activeFilterCount > 0 && ` (filtered from ${category.products.length})`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === "ventilation" && (
        <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-b border-zinc-800 overflow-hidden">
          {/* Air flow lines animation */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                style={{
                  top: `${20 + i * 12}%`,
                  width: '100%',
                  animation: `slideRight ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full mb-4">
                  <span className="text-xs font-bold text-cyan-400 tracking-widest">EXHAUST FANS</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                  <span className="text-cyan-400">AIR FLOW</span>
                  <span className="block text-zinc-100">SOLUTIONS</span>
                </h1>
                <p className="text-zinc-400 mt-4 max-w-md">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} for optimal ventilation
                </p>
              </div>
              <div className="relative h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
                <Image src={category.cover} alt={category.name} width={160} height={160} className="object-contain relative z-10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === "switchgear" && (
        <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(0deg, #fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 2px, transparent 2px),
              linear-gradient(0deg, #fff 2px, transparent 2px)
            `,
            backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
          }}></div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{category.name}</h1>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-zinc-400">Switches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-zinc-400">Sockets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-zinc-400">Plates</span>
                  </div>
                </div>
                <p className="text-zinc-500 mt-4">{filteredProducts.length} products available</p>
              </div>
              <div className="relative h-32 md:h-40">
                <div className="absolute inset-0 bg-amber-500/5 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={category.cover} alt={category.name} width={100} height={100} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === "chimneys" && (
        <div className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-b border-zinc-800 overflow-hidden">
          {/* Smoke effect */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-32 h-64 bg-gradient-to-t from-zinc-700/10 via-zinc-500/5 to-transparent blur-2xl"
                style={{
                  left: `${20 + i * 20}%`,
                  animation: `float ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`
                }}
              ></div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-500"></div>
                <span className="text-xs font-bold tracking-widest text-rose-400">KITCHEN SOLUTIONS</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-500"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                <span className="text-zinc-100">KITCHEN</span> <span className="text-rose-500">CHIMNEYS</span>
              </h1>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                {filteredProducts.length} premium chimneys • Automatic & Manual options
              </p>
              <div className="mt-10 relative h-40">
                <div className="absolute left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl"></div>
                <Image src={category.cover} alt={category.name} width={180} height={180} className="object-contain mx-auto relative z-10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === "wires" && (
        <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          {/* Wire/cable pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="text-amber-500">
              <defs>
                <pattern id="wirePattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M0,100 Q50,80 100,100 T200,100" stroke="currentColor" fill="none" strokeWidth="2" />
                  <path d="M0,120 Q50,140 100,120 T200,120" stroke="currentColor" fill="none" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wirePattern)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                  <span className="text-amber-500">ELECTRICAL</span>
                  <span className="block text-zinc-100 mt-1">WIRING</span>
                </h1>
                <div className="flex gap-4 mt-6">
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border-l-4 border-red-500">
                    <span className="text-xs text-zinc-400">Red</span>
                  </div>
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border-l-4 border-blue-500">
                    <span className="text-xs text-zinc-400">Blue</span>
                  </div>
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border-l-4 border-green-500">
                    <span className="text-xs text-zinc-400">Green</span>
                  </div>
                  <div className="bg-zinc-800 px-4 py-2 rounded-lg border-l-4 border-zinc-900">
                    <span className="text-xs text-zinc-400">Black</span>
                  </div>
                </div>
                <p className="text-zinc-500 mt-4">{filteredProducts.length} products from trusted brands</p>
              </div>
              <div className="relative">
                <div className="w-32 h-32 bg-zinc-800 rounded-2xl flex items-center justify-center p-6">
                  <Image src={category.cover} alt={category.name} width={100} height={100} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === "lighting" && (
        <div className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          {/* Light rays effect */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-yellow-400 tracking-widest">ILLUMINATION</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                <span className="text-yellow-400">LIGHTING</span>
                <span className="block text-zinc-100 mt-2">SOLUTIONS</span>
              </h1>
              <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                {filteredProducts.length} products • Bulbs, Down Lights, Surface Lights & More
              </p>
              <div className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
                <div className="bg-zinc-800/50 backdrop-blur px-3 py-2 rounded-lg text-xs text-zinc-400">Bulbs</div>
                <div className="bg-zinc-800/50 backdrop-blur px-3 py-2 rounded-lg text-xs text-zinc-400">Down Lights</div>
                <div className="bg-zinc-800/50 backdrop-blur px-3 py-2 rounded-lg text-xs text-zinc-400">Surface</div>
                <div className="bg-zinc-800/50 backdrop-blur px-3 py-2 rounded-lg text-xs text-zinc-400">Tube Lights</div>
                <div className="bg-zinc-800/50 backdrop-blur px-3 py-2 rounded-lg text-xs text-zinc-400">Spots</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Panel */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFiltersOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-zinc-900 border-l border-zinc-800 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-zinc-400 hover:text-zinc-100 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-zinc-800">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mr-2">Active:</span>
                {selectedBrands.map((b) => (
                  <button key={b} onClick={() => toggleFilter(b, selectedBrands, setSelectedBrands)} className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 text-xs rounded-full cursor-pointer hover:bg-amber-500/20 transition-colors">
                    {b}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ))}
                {selectedTypes.map((t) => (
                  <button key={t} onClick={() => toggleFilter(t, selectedTypes, setSelectedTypes)} className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 text-xs rounded-full cursor-pointer hover:bg-amber-500/20 transition-colors">
                    {t}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ))}
                {selectedColors.map((c) => (
                  <button key={c} onClick={() => toggleFilter(c, selectedColors, setSelectedColors)} className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 text-xs rounded-full cursor-pointer hover:bg-amber-500/20 transition-colors">
                    {c}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ))}
                <button onClick={clearAllFilters} className="text-zinc-500 hover:text-zinc-300 text-xs ml-2 cursor-pointer">
                  Clear all
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-xl font-black text-zinc-400">No products found</h3>
                <p className="text-zinc-600 mt-2">Try adjusting your filters or search query.</p>
                <button onClick={clearAllFilters} className="mt-6 bg-amber-500 text-zinc-950 px-6 py-2.5 font-bold text-sm cursor-pointer hover:bg-amber-400 transition-colors">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] hover:border-amber-500/30"
                >
                  {/* Product Image */}
                  <div className="relative bg-zinc-900 aspect-square flex items-center justify-center p-6 md:p-8">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Brand badge */}
                    <span className="absolute top-3 left-3 bg-zinc-800/90 text-zinc-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                      {product.brand}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="px-4 py-4 border-t border-zinc-800/50">
                    <h3 className="font-bold text-sm text-zinc-200 group-hover:text-amber-400 transition-colors duration-200 truncate">
                      {product.brand} {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {product.type && (
                        <span className="text-[11px] text-zinc-500">{product.type}</span>
                      )}
                      {product.type && product.color && (
                        <span className="text-zinc-700 text-[11px]">/</span>
                      )}
                      {product.color && (
                        <span className="text-[11px] text-zinc-500">{product.color}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-10 px-6 md:px-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-amber-500 flex items-center justify-center">
              <span className="text-zinc-950 font-black text-sm">P</span>
            </div>
            <span className="text-lg font-black tracking-tighter">
              POWER<span className="text-amber-500">ZONE</span>
            </span>
          </Link>
          <p className="text-zinc-600 text-sm">© 2025 POWERZONE ELECTRICALS</p>
        </div>
      </footer>
    </div>
  );
}
