"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useMemo, useEffect } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const slug = params.category as string;
    const productId = params.productId as string;

    const product = useQuery(api.products.getById, {
        productId: productId as Id<"products">,
    });
    const category = useQuery(api.categories.getBySlug, { slug });
    const allProducts = useQuery(
        api.products.listByCategory,
        category ? { categoryId: category._id } : "skip"
    );

    const [imageZoomed, setImageZoomed] = useState(false);
    const [activeVariantId, setActiveVariantId] = useState<string | null>(null);

    // Initialize active variant from URL or default to first
    useEffect(() => {
        if (product && (product.variants || []).length > 0) {
            const variantParam = searchParams.get('variant');
            if (variantParam && (product.variants || []).some((v: any) => v._id === variantParam)) {
                setActiveVariantId(variantParam);
            } else if (!activeVariantId) {
                setActiveVariantId((product.variants || [])[0]?._id);
            }
        }
    }, [product, searchParams, activeVariantId]);

    const activeVariant = useMemo(() => {
        if (!product || !activeVariantId) return null;
        return (product.variants || []).find((v: any) => v._id === activeVariantId) || (product.variants || [])[0];
    }, [product, activeVariantId]);

    const handleVariantChange = (variantId: string) => {
        setActiveVariantId(variantId);
        // Optional: Update URL without navigation
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('variant', variantId);
        window.history.replaceState({}, '', newUrl.toString());
    };

    const relatedProducts = useMemo(() => {
        if (!allProducts || !product) return [];
        const filtered = allProducts.filter(
            (p) =>
                p._id !== product._id &&
                (p.brand === product.brand || p.type === product.type)
        );

        return filtered.sort((a, b) => {
            const aOutOfStockCount = (a.variants || []).filter((v: any) => v.outOfStock).length;
            const aAllOutOfStock = (a.variants || []).length > 0 && aOutOfStockCount === a.variants!.length;

            const bOutOfStockCount = (b.variants || []).filter((v: any) => v.outOfStock).length;
            const bAllOutOfStock = (b.variants || []).length > 0 && bOutOfStockCount === b.variants!.length;

            if (aAllOutOfStock && !bAllOutOfStock) return 1;
            if (!aAllOutOfStock && bAllOutOfStock) return -1;
            return 0;
        }).slice(0, 4);
    }, [allProducts, product]);

    // Group variants by color to show unique colors
    const uniqueColors = useMemo(() => {
        if (!product) return [];
        const colors = new Map<string, any>();
        (product.variants || []).forEach((v: any) => {
            if (v.color && !colors.has(v.color)) {
                colors.set(v.color, v);
            }
        });
        return Array.from(colors.values());
    }, [product]);

    // Get available sizes for the active color
    const availableSizes = useMemo(() => {
        if (!product || !activeVariant) return [];
        return (product.variants || []).filter((v: any) => v.color === activeVariant.color && v.size);
    }, [product, activeVariant]);

    // Loading
    if (product === undefined) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100">
                <header className="border-b border-zinc-800">
                    <div className="max-w-7xl mx-auto flex items-center gap-4 px-6 md:px-10 py-4">
                        <div className="w-9 h-9 bg-zinc-800 rounded animate-pulse"></div>
                        <div className="h-5 bg-zinc-800 rounded w-32 animate-pulse"></div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="aspect-square bg-zinc-900 rounded-2xl animate-pulse"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                            <div className="h-5 bg-zinc-800 rounded w-1/2 animate-pulse"></div>
                            <div className="h-10 bg-zinc-800 rounded w-1/3 mt-6 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product || !activeVariant) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black">Product Not Found</h1>
                    <p className="text-zinc-500 mt-4">This product doesn&apos;t exist or has been removed.</p>
                    <Link
                        href={`/products/${slug}`}
                        className="inline-block mt-8 bg-amber-500 text-zinc-950 px-6 py-3 font-bold hover:bg-amber-400 transition-colors"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const specs = [
        product.brand && { label: "Brand", value: product.brand },
        product.type && { label: "Type", value: product.type },
        product.subCategory && { label: "Category", value: product.subCategory },
        activeVariant.color && { label: "Color", value: activeVariant.color },
        activeVariant.size && { label: "Size", value: activeVariant.size },
        product.shape && { label: "Shape", value: product.shape },
        product.motor && { label: "Motor", value: product.motor },
        product.energy && { label: "Power", value: product.energy },
        product.brandLine && { label: "Brand Line", value: product.brandLine },
    ].filter(Boolean) as { label: string; value: string }[];

    const colorMap: Record<string, string> = {
        White: "bg-white",
        Black: "bg-zinc-900 border border-zinc-600",
        Brown: "bg-amber-900",
        "Dark Brown": "bg-amber-950",
        Beige: "bg-amber-100",
        Red: "bg-red-500",
        Blue: "bg-blue-500",
        Green: "bg-green-600",
        Yellow: "bg-yellow-400",
        Grey: "bg-zinc-500",
        Gold: "bg-yellow-600",
        "Warm White": "bg-yellow-200",
        "Cool White": "bg-blue-100",
    };

    const displayImage = activeVariant.image || product.baseImage;
    const displayPrice = activeVariant.price || product.basePrice;
    const displayDiscountedPrice = activeVariant.discountedPrice || product.discountedPrice;
    const displayDiscountBadge = activeVariant.discountBadge || product.discountBadge;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer">
                            <span className="text-lg font-black tracking-tighter">
                                MONU<span className="text-amber-500">ELECTRICALS</span>
                            </span>
                        </Link>
                        {/* Breadcrumb */}
                        <nav className="hidden md:flex items-center gap-2 text-sm text-zinc-500">
                            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
                            <span className="text-zinc-700">/</span>
                            <Link href={`/products/${slug}`} className="hover:text-zinc-300 transition-colors">
                                {category?.name || slug}
                            </Link>
                            <span className="text-zinc-700">/</span>
                            <span className="text-zinc-300 truncate max-w-[200px]">{product.name}</span>
                        </nav>
                    </div>
                    <Link
                        href={`/products/${slug}`}
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>
                </div>
            </header>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left: Image */}
                    <div className="space-y-4">
                        <div
                            className={`relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 cursor-zoom-in ${imageZoomed ? "aspect-auto min-h-[500px]" : "aspect-square"
                                }`}
                            onClick={() => setImageZoomed(!imageZoomed)}
                        >
                            {/* Gradient glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>

                            {/* Brand watermark */}
                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                    {product.brand}
                                </span>
                            </div>

                            {/* Product Image */}
                            <div className="absolute inset-0 flex items-center justify-center p-12 md:p-16">
                                <div
                                    className={`relative w-full h-full transition-transform duration-500 ${imageZoomed ? "scale-125" : "hover:scale-105"
                                        }`}
                                >
                                    {displayImage ? (
                                        <Image
                                            src={displayImage}
                                            alt={`${product.brand} ${product.name}`}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 opacity-50 absolute inset-0">
                                            <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="text-sm font-bold uppercase tracking-wider">No Image Provided</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Zoom hint */}
                            <div className="absolute bottom-4 right-4 bg-zinc-800/80 backdrop-blur-sm rounded-full p-2 border border-zinc-700/50">
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        {/* Title */}
                        <div>
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                {activeVariant.outOfStock && (
                                    <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                        Out of Stock
                                    </span>
                                )}
                                {product.type && (
                                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {product.type}
                                    </span>
                                )}
                                {product.subCategory && (
                                    <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {product.subCategory}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-snug">
                                {product.name}
                            </h1>
                            <p className="text-zinc-500 text-lg mt-1">{product.brand}</p>
                        </div>

                        {/* Price */}
                        {displayPrice && (
                            <div className="mt-6">
                                <div className="flex items-center gap-3 flex-wrap">
                                    {displayDiscountedPrice && (
                                        <span className="text-4xl md:text-5xl font-black text-zinc-100">
                                            ₹ {displayDiscountedPrice.toString().replace(/[^0-9.]/g, '')}
                                        </span>
                                    )}
                                    <span className={`${displayDiscountedPrice ? 'text-2xl md:text-3xl font-bold line-through decoration-2 text-zinc-500' : 'text-3xl md:text-4xl font-black text-zinc-500 line-through decoration-2'}`}>
                                        ₹{displayPrice.toString().replace(/[^0-9.]/g, '')}
                                    </span>
                                    {!displayDiscountedPrice && <span className="text-zinc-500 font-semibold self-end pb-1">MRP</span>}

                                    {displayDiscountBadge ? (
                                        <div className="bg-red-500 text-white px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full font-bold text-sm tracking-wide shadow-sm ml-2">
                                            {displayDiscountBadge}
                                        </div>
                                    ) : (
                                        !displayDiscountedPrice && (
                                            <div className="bg-red-500 text-white px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full font-bold text-sm tracking-wide shadow-sm ml-2">
                                                FOR BEST PRICE CONTACT STORE
                                            </div>
                                        )
                                    )}
                                </div>
                                <p className="text-zinc-600 text-sm mt-2">MRP incl. of all taxes</p>
                            </div>
                        )}

                        {!displayPrice && (
                            <div className="mt-6 flex items-center gap-3">
                                <span className="text-lg font-bold text-zinc-400">Contact for Price</span>
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t border-zinc-800 my-8"></div>

                        {/* Color Variants */}
                        {uniqueColors.length > 1 && (
                            <div className="mb-8">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
                                    Color — <span className="text-zinc-200">{activeVariant.color || "Default"}</span>
                                </label>
                                <div className="flex gap-3 flex-wrap">
                                    {uniqueColors.map((variant) => {
                                        const isActiveColor = variant.color === activeVariant.color;
                                        return (
                                            <button
                                                key={variant._id}
                                                onClick={() => handleVariantChange(variant._id)}
                                                className="relative group cursor-pointer"
                                            >
                                                <div className={`w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-zinc-950 transition-all ${isActiveColor ? 'ring-amber-500' : 'ring-zinc-700 hover:ring-amber-500/50'} ${colorMap[variant.color || ""] || "bg-zinc-600"}`}></div>
                                                {!isActiveColor && (
                                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{variant.color}</span>
                                                )}
                                                {isActiveColor && (
                                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-400 font-bold whitespace-nowrap">{variant.color}</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Size Variants */}
                        {availableSizes.length > 1 && (
                            <div className="mb-8 mt-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
                                    Size — <span className="text-zinc-200">{activeVariant.size || "Default"}</span>
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {availableSizes.map((variant: any) => {
                                        const isActiveSize = variant._id === activeVariant._id;
                                        return (
                                            <button
                                                key={variant._id}
                                                onClick={() => handleVariantChange(variant._id)}
                                                className={`px-4 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${isActiveSize
                                                    ? 'bg-amber-500/15 border-2 border-amber-500 text-amber-400'
                                                    : 'bg-zinc-900 border-2 border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-amber-400'
                                                }`}
                                            >
                                                {variant.size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Specifications */}
                        <div className="mt-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 block">
                                Specifications
                            </label>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800/50">
                                {specs.map((spec, i) => (
                                    <div
                                        key={i}
                                        className={`flex justify-between items-center px-5 py-3.5 ${i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/50"
                                            }`}
                                    >
                                        <span className="text-sm text-zinc-500">{spec.label}</span>
                                        <span className="text-sm font-semibold text-zinc-200">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA - WhatsApp */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-3">
                            <a
                                href={`https://wa.me/919213684115?text=Hi! I'm interested in the ${product.brand} ${product.name}${activeVariant.size ? ` (${activeVariant.size})` : ""}${activeVariant.color ? ` in ${activeVariant.color}` : ""}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 text-sm transition-all duration-200 rounded-xl cursor-pointer shadow-lg shadow-green-600/20 hover:shadow-green-500/30"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Enquire on WhatsApp
                            </a>
                            <a
                                href="tel:+919213684115"
                                className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold py-4 px-6 text-sm transition-all duration-200 rounded-xl cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                Call Now
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-8 grid grid-cols-3 gap-3">
                            {[
                                { icon: "✓", label: "100% Genuine" },
                                { icon: "◈", label: "Best Price" },
                                activeVariant.outOfStock
                                    ? { icon: "✕", label: "Out of Stock", isRed: true }
                                    : { icon: "⚡", label: "In Stock" },
                            ].map((badge) => (
                                <div
                                    key={badge.label}
                                    className={`flex flex-col items-center gap-1.5 rounded-lg py-3 px-2 ${'isRed' in badge && badge.isRed
                                        ? "bg-red-500/5 border border-red-500/20"
                                        : "bg-zinc-900/50 border border-zinc-800/50"
                                        }`}
                                >
                                    <span className={'isRed' in badge && badge.isRed ? "text-red-400 text-lg" : "text-amber-500 text-lg"}>{badge.icon}</span>
                                    <span className={'isRed' in badge && badge.isRed ? "text-[11px] text-red-400 font-medium" : "text-[11px] text-zinc-500 font-medium"}>{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-amber-500 text-xs font-bold tracking-widest">YOU MAY ALSO LIKE</span>
                                <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-1">Related Products</h2>
                            </div>
                            <Link
                                href={`/products/${slug}`}
                                className="text-sm text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
                            >
                                View all
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((rp) => (
                                <Link
                                    key={rp._id}
                                    href={`/products/${slug}/${rp._id}`}
                                    className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] cursor-pointer block"
                                >
                                    <div className="relative aspect-square bg-zinc-900 flex items-center justify-center p-6">
                                        {rp.baseImage ? (
                                            <Image
                                                src={rp.baseImage}
                                                alt={rp.name}
                                                width={160}
                                                height={160}
                                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 opacity-50">
                                                <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 bg-zinc-800/80 text-zinc-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                            {rp.brand}
                                        </span>
                                    </div>
                                    <div className="px-4 py-3 border-t border-zinc-800/50">
                                        <h3 className="font-bold text-sm text-zinc-200 group-hover:text-amber-400 transition-colors truncate">
                                            {rp.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {rp.basePrice && <span className="text-amber-400 font-bold text-xs ml-auto">{rp.basePrice}</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-zinc-900 border-t border-zinc-800 py-16 px-6 md:px-10 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer">
                            <span className="text-lg font-black tracking-tighter">
                                MONU<span className="text-amber-500">ELECTRICALS</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 mt-4 text-sm">Premium electrical products since 2005.</p>
                        <div className="flex gap-3 mt-6">
                            {["FB", "IG", "WA"].map((s) => (
                                <a key={s} href="#" className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-colors duration-200 cursor-pointer text-xs font-bold">
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-amber-500 mb-4 text-sm">BRANCH 01</h4>
                        <p className="text-zinc-500 text-sm">Sector -10 , vasundhara , Ghaziabad,UP</p>
                        <p className="text-zinc-500 text-sm">9213684115</p>
                    </div>
                    <div>
                        <h4 className="font-black text-amber-500 mb-4 text-sm">BRANCH 02</h4>
                        <p className="text-zinc-500 text-sm">Plot No-10, Govind Vihar II, Govindpuram, Ghaziabad,UP</p>
                        <p className="text-zinc-500 text-sm">9810468106</p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
                    © 2025 MONU ELECTRICALS
                </div>
            </footer>
        </div>
    );
}
