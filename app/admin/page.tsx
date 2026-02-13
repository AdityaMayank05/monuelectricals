"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function AdminDashboard() {
    const stats = useQuery(api.admin.getDashboardStats);

    if (!stats) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800/60 rounded-2xl h-32"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800/60 rounded-2xl h-48"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-amber-500/70 uppercase tracking-widest">Total Products</p>
                            <p className="text-4xl font-black text-zinc-100 mt-2 tabular-nums">{stats.totalProducts}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                        </div>
                    </div>
                    <Link href="/admin/products" className="mt-4 text-xs text-amber-500/60 hover:text-amber-500 transition-colors flex items-center gap-1">
                        View all products →
                    </Link>
                </div>

                <div className="group relative bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-emerald-500/70 uppercase tracking-widest">Categories</p>
                            <p className="text-4xl font-black text-zinc-100 mt-2 tabular-nums">{stats.totalCategories}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            </svg>
                        </div>
                    </div>
                    <Link href="/admin/categories" className="mt-4 text-xs text-emerald-500/60 hover:text-emerald-500 transition-colors flex items-center gap-1">
                        Manage categories →
                    </Link>
                </div>

                <div className="group relative bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/40 transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-violet-500/70 uppercase tracking-widest">Brands</p>
                            <p className="text-4xl font-black text-zinc-100 mt-2 tabular-nums">{stats.totalBrands}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.288.165" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-violet-500/60">Across all categories</p>
                </div>
            </div>

            {/* Category Breakdown */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-zinc-200">Category Breakdown</h2>
                    <Link
                        href="/admin/categories"
                        className="text-xs text-zinc-500 hover:text-amber-500 transition-colors"
                    >
                        Manage →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stats.categoryStats.map((cat) => (
                        <div
                            key={cat._id}
                            className="group bg-zinc-900/60 border border-zinc-800/60 rounded-2xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-950/50"
                        >
                            {/* Cover Image */}
                            <div className="h-28 relative overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={cat.coverImage}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-4">
                                    <h3 className="text-base font-bold text-zinc-100">{cat.name}</h3>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-900/80 backdrop-blur px-2 py-1 rounded-full">
                                        #{cat.displayOrder}
                                    </span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                        <span className="text-xs text-zinc-500">Products</span>
                                    </div>
                                    <span className="text-sm font-bold text-zinc-200 tabular-nums">{cat.productCount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-xs text-zinc-500">Brands</span>
                                    </div>
                                    <span className="text-sm font-bold text-zinc-200 tabular-nums">{cat.brandCount}</span>
                                </div>

                                {/* Top Brands */}
                                {cat.topBrands.length > 0 && (
                                    <div className="pt-2 border-t border-zinc-800/60">
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.topBrands.map((brand) => (
                                                <span
                                                    key={brand}
                                                    className="text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-md"
                                                >
                                                    {brand}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Link */}
                                <Link
                                    href={`/admin/products?category=${cat.slug}`}
                                    className="block text-center text-xs font-medium text-zinc-500 hover:text-amber-500 pt-2 transition-colors"
                                >
                                    View Products →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
