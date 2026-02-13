"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function AdminProductsPage() {
    const products = useQuery(api.products.listAll);
    const categories = useQuery(api.categories.list);
    const deleteProduct = useMutation(api.admin.deleteProduct);
    const [search, setSearch] = useState("");

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

    const filtered = products?.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100">Products</h1>
                    <p className="text-sm text-zinc-500 mt-1">{products?.length ?? 0} total products</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                >
                    + Add Product
                </Link>
            </div>

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
            </div>

            {/* Table */}
            <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-zinc-800/60">
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Image</th>
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Product</th>
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Brand</th>
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Category</th>
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Price</th>
                                <th className="px-5 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/40">
                            {!filtered ? (
                                <tr>
                                    <td className="px-5 py-8 text-center text-zinc-600" colSpan={6}>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                            Loading products...
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td className="px-5 py-12 text-center text-zinc-600" colSpan={6}>
                                        <div className="space-y-2">
                                            <span className="text-2xl">📦</span>
                                            <p className="text-sm">No products found.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((product) => (
                                    <tr key={product._id} className="group hover:bg-zinc-800/20 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="font-medium text-zinc-200">{product.name}</span>
                                            {product.color && (
                                                <span className="ml-2 text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                                                    {product.color}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3 text-zinc-400">{product.brand}</td>
                                        <td className="px-5 py-3">
                                            <span className="text-xs text-zinc-500 bg-zinc-800/60 px-2 py-1 rounded-md">
                                                {getCategoryName(product.categoryId)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-amber-500 text-xs">{product.price || "—"}</td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                    className="px-3 py-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
