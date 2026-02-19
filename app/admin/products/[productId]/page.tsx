"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.productId as Id<"products">;

    const product = useQuery(api.products.getById, { productId });
    const updateProduct = useMutation(api.admin.updateProduct);
    const categories = useQuery(api.categories.list);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        brand: "",
        type: "",
        color: "",
        size: "",
        outOfStock: false,
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price || "",
                image: product.image,
                brand: product.brand,
                type: product.type || "",
                color: product.color || "",
                size: product.size || "",
                outOfStock: product.outOfStock ?? false,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProduct({
                id: productId,
                name: formData.name,
                image: formData.image,
                brand: formData.brand,
                price: formData.price,
                type: formData.type,
                color: formData.color,
                size: formData.size,
                outOfStock: formData.outOfStock,
            });

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error(error);
            alert("Failed to update product. Ensure you are authorized.");
        } finally {
            setLoading(false);
        }
    };

    const categoryName = product && categories
        ? categories.find((c) => c._id === product.categoryId)?.name ?? "Unknown"
        : "...";

    if (product === undefined) {
        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
                <div className="h-8 bg-zinc-800 rounded w-48" />
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-12 bg-zinc-800 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (product === null) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <span className="text-4xl">🔍</span>
                <h2 className="text-lg font-bold text-zinc-300 mt-4">Product not found</h2>
                <Link href="/admin/products" className="text-amber-500 text-sm mt-2 hover:underline">
                    ← Back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-100">Edit Product</h1>
                        <p className="text-xs text-zinc-600 mt-0.5">
                            Category: <span className="text-zinc-400">{categoryName}</span>
                        </p>
                    </div>
                </div>

                {/* Save indicator */}
                {saved && (
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg animate-pulse">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span className="text-xs font-bold">Saved!</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Image Preview */}
                {formData.image && (
                    <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 flex items-center gap-5">
                        <div className="w-20 h-20 rounded-xl border border-zinc-700/50 overflow-hidden bg-zinc-800 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-200">{formData.name || "Untitled"}</p>
                            <p className="text-xs text-zinc-600 mt-0.5">{formData.brand || "No brand"}</p>
                        </div>
                    </div>
                )}

                {/* Main Form Fields */}
                <div className="bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl space-y-5">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Product Details</h3>

                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Product Name *</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Brand *</label>
                            <input
                                name="brand"
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Price</label>
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="₹..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Image URL *</label>
                        <input
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Type</label>
                            <input
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Color</label>
                            <input
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Size</label>
                            <input
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Stock Status Toggle */}
                <div className="bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Stock Status</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${formData.outOfStock
                                ? "bg-red-500/10 border border-red-500/20"
                                : "bg-emerald-500/10 border border-emerald-500/20"
                                }`}>
                                {formData.outOfStock ? (
                                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <p className={`text-sm font-bold transition-colors duration-300 ${formData.outOfStock ? "text-red-400" : "text-emerald-400"
                                    }`}>
                                    {formData.outOfStock ? "Out of Stock" : "In Stock"}
                                </p>
                                <p className="text-xs text-zinc-600">
                                    {formData.outOfStock
                                        ? "This product is marked as unavailable on the website"
                                        : "This product is available for customers"
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, outOfStock: !prev.outOfStock }))}
                            className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${formData.outOfStock
                                ? "bg-red-500/30 border border-red-500/40"
                                : "bg-emerald-500/30 border border-emerald-500/40"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${formData.outOfStock
                                    ? "left-[calc(100%-1.625rem)] bg-red-400"
                                    : "left-0.5 bg-emerald-400"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href="/admin/products"
                        className="flex-1 text-center bg-zinc-800 text-zinc-400 font-bold py-3 rounded-xl hover:bg-zinc-700 hover:text-zinc-200 transition-colors text-sm"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                Updating...
                            </span>
                        ) : (
                            "Update Product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
