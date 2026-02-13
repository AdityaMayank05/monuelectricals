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
    });

    const [loading, setLoading] = useState(false);

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
            });

            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to update product. Ensure you are authorized.");
        } finally {
            setLoading(false);
        }
    };

    if (product === undefined) return <div className="text-zinc-400">Loading product...</div>;
    if (product === null) return <div className="text-zinc-400">Product not found.</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-zinc-500 hover:text-zinc-300">
                    ← Back
                </Link>
                <h1 className="text-2xl font-bold text-zinc-100">Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Product Name *</label>
                        <input
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Brand *</label>
                            <input
                                name="brand"
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Price</label>
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL *</label>
                        <input
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                        />
                        {formData.image && (
                            <div className="mt-2 w-20 h-20 rounded border border-zinc-800 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Type</label>
                            <input
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Color</label>
                            <input
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Size</label>
                            <input
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 text-zinc-950 font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}
