"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function AdminProductsPage() {
    const router = useRouter();
    const products = useQuery(api.products.listAll);
    const categories = useQuery(api.categories.list);
    const deleteProduct = useMutation(api.admin.deleteProduct);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

    const handleDelete = async (id: Id<"products">) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct({ id });
            } catch (error) {
                alert("Failed to delete product. Ensure you are an admin.");
                console.error(error);
            }
        }
    };

    const getCategoryName = (categoryId: string) => {
        return categories?.find((c) => c._id === categoryId)?.name ?? "—";
    };

    const toggleCollapse = (catId: string) => {
        setCollapsedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(catId)) next.delete(catId);
            else next.add(catId);
            return next;
        });
    };

    // Filter products
    const filtered = products?.filter((p) => {
        const matchesSearch =
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            activeCategory === "all" || p.categoryId === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Group by category
    const grouped = categories
        ?.map((cat) => ({
            ...cat,
            products: filtered?.filter((p) => p.categoryId === cat._id) ?? [],
        }))
        .filter((g) => g.products.length > 0) ?? [];

    const totalFiltered = filtered?.length ?? 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100">Products</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {products?.length ?? 0} total products
                        {activeCategory !== "all" && ` · ${totalFiltered} shown`}
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                >
                    + Add Product
                </Link>
            </div>

            {/* Category Filter Pills */}
            {categories && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${activeCategory === "all"
                            ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/25"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800/60 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                    >
                        All
                        <span className={`ml-1.5 text-[10px] ${activeCategory === "all" ? "text-zinc-950/60" : "text-zinc-600"}`}>
                            {products?.length ?? 0}
                        </span>
                    </button>
                    {categories.map((cat) => {
                        const count = products?.filter((p) => p.categoryId === cat._id).length ?? 0;
                        return (
                            <button
                                key={cat._id}
                                onClick={() => setActiveCategory(activeCategory === cat._id ? "all" : cat._id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${activeCategory === cat._id
                                    ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/25"
                                    : "bg-zinc-900 text-zinc-400 border border-zinc-800/60 hover:border-zinc-700 hover:text-zinc-200"
                                    }`}
                            >
                                {cat.name}
                                <span className={`ml-1.5 text-[10px] ${activeCategory === cat._id ? "text-zinc-950/60" : "text-zinc-600"}`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <svg className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by name or brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800/60 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-zinc-700"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Category-Grouped Products */}
            {!filtered ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800/60 rounded-2xl h-48 animate-pulse" />
                    ))}
                </div>
            ) : grouped.length === 0 ? (
                <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-12 text-center">
                    <div className="space-y-2">
                        <span className="text-3xl">📦</span>
                        <p className="text-sm text-zinc-500">No products found.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {grouped.map((group) => {
                        const isCollapsed = collapsedCategories.has(group._id);
                        const outOfStockCount = group.products.filter((p) => p.outOfStock).length;

                        return (
                            <div
                                key={group._id}
                                className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden transition-all duration-300"
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCollapse(group._id)}
                                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Chevron */}
                                        <svg
                                            className={`w-4 h-4 text-zinc-600 transition-transform duration-300 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                                            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>

                                        <div className="flex items-center gap-3">
                                            {/* Category cover thumbnail */}
                                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700/50 flex-shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={group.coverImage} alt={group.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h3 className="text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                                                {group.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {outOfStockCount > 0 && (
                                            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                                                {outOfStockCount} out of stock
                                            </span>
                                        )}
                                        <span className="text-xs font-semibold text-zinc-500 bg-zinc-800/60 px-2.5 py-1 rounded-lg tabular-nums">
                                            {group.products.length} product{group.products.length !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                </button>

                                {/* Products List */}
                                {!isCollapsed && (
                                    <div className="border-t border-zinc-800/40 overflow-x-auto">
                                        <table className="w-full text-left text-sm min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-zinc-800/30">
                                                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest w-14"></th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Product</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Brand</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Price</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Status</th>
                                                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800/25">
                                                {group.products.map((product) => (
                                                    <tr
                                                        key={product._id}
                                                        onClick={() => router.push(`/admin/products/${product._id}`)}
                                                        className="group/row hover:bg-zinc-800/20 transition-colors cursor-pointer"
                                                    >
                                                        <td className="px-6 py-3">
                                                            <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/30">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`font-medium ${product.outOfStock ? "text-zinc-500 line-through" : "text-zinc-200"}`}>
                                                                    {product.name}
                                                                </span>
                                                                {product.color && (
                                                                    <span className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                                                                        {product.color}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-zinc-400">{product.brand}</td>
                                                        <td className="px-4 py-3 font-mono text-amber-500/80 text-xs">{product.price || "—"}</td>
                                                        <td className="px-4 py-3">
                                                            {product.outOfStock ? (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                                                    Out of Stock
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                                    In Stock
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-3 text-right">
                                                            <button
                                                                className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer opacity-100 lg:opacity-0 lg:group-hover/row:opacity-100"
                                                                onClick={(e) => { e.stopPropagation(); handleDelete(product._id); }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
