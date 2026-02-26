"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect, useRef, useCallback } from "react";
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
        brand: "",
        type: "",
        color: "",
        size: "",
        outOfStock: false,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [existingImageUrl, setExistingImageUrl] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price || "",
                brand: product.brand,
                type: product.type || "",
                color: product.color || "",
                size: product.size || "",
                outOfStock: product.outOfStock ?? false,
            });
            setExistingImageUrl(product.image);
            if (!imageFile) {
                setImagePreview(product.image);
            }
        }
    }, [product, imageFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("Image must be less than 10MB");
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    }, [handleFileSelect]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const removeNewImage = () => {
        setImageFile(null);
        setImagePreview(existingImageUrl);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = existingImageUrl;

            // Upload new image if one was selected
            if (imageFile) {
                setUploading(true);
                imageUrl = await uploadImage(imageFile);
                setUploading(false);
            }

            await updateProduct({
                id: productId,
                name: formData.name,
                image: imageUrl,
                brand: formData.brand,
                price: formData.price,
                type: formData.type,
                color: formData.color,
                size: formData.size,
                outOfStock: formData.outOfStock,
            });

            setSaved(true);
            setExistingImageUrl(imageUrl);
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error(error);
            setUploading(false);
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
                {/* Image Upload Section */}
                <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-4">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Product Image</h3>

                    {/* Current / Preview Image */}
                    {imagePreview && (
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-xl border border-zinc-700/50 overflow-hidden bg-zinc-800 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                {imageFile ? (
                                    <>
                                        <p className="text-sm text-zinc-200 font-medium truncate">{imageFile.name}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">
                                            {(imageFile.size / 1024 / 1024).toFixed(2)} MB · New image selected
                                        </p>
                                        {uploading && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-amber-400 font-medium">Uploading to Cloudinary...</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-zinc-200">{formData.name || "Untitled"}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">{formData.brand || "No brand"}</p>
                                    </>
                                )}
                            </div>
                            {imageFile && !uploading && !loading && (
                                <button
                                    type="button"
                                    onClick={removeNewImage}
                                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                    title="Remove new image"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Upload New Image Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${dragOver
                                ? "border-amber-500 bg-amber-500/5"
                                : "border-zinc-700/50 hover:border-zinc-500 bg-zinc-950/30 hover:bg-zinc-900/30"
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="flex items-center justify-center gap-3">
                            <svg className={`w-5 h-5 transition-colors ${dragOver ? "text-amber-400" : "text-zinc-600"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <p className="text-sm text-zinc-400">
                                {imageFile ? "Replace with another image" : dragOver ? "Drop image here" : "Upload a new image"}
                            </p>
                        </div>
                    </div>
                </div>

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
                        disabled={loading || uploading}
                        className="flex-[2] bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                {uploading ? "Uploading Image..." : "Updating..."}
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
