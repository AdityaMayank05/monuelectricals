"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();
    const createProduct = useMutation(api.admin.createProduct);
    const categories = useQuery(api.categories.list);

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        price: "",
        brand: "",
        type: "",
        color: "",
        size: "",
        outOfStock: false,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
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
        if (!formData.categoryId) {
            alert("Please select a category");
            return;
        }
        if (!imageFile) {
            alert("Please upload a product image");
            return;
        }

        setLoading(true);
        try {
            // Upload image to Cloudinary
            setUploading(true);
            const imageUrl = await uploadImage(imageFile);
            setUploading(false);

            // Create product with Cloudinary URL
            await createProduct({
                name: formData.name,
                categoryId: formData.categoryId as any,
                image: imageUrl,
                brand: formData.brand,
                price: formData.price,
                type: formData.type,
                color: formData.color,
                size: formData.size,
                outOfStock: formData.outOfStock,
            });

            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert("Failed to create product. Ensure you are authorized.");
        } finally {
            setLoading(false);
        }
    };

    if (!categories) {
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

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100">Add New Product</h1>
                    <p className="text-xs text-zinc-600 mt-0.5">Fill in the details below</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Category *</label>
                            <select
                                name="categoryId"
                                required
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                    </div>

                    {/* Image Upload Zone */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Product Image *</label>

                        {!imagePreview ? (
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${dragOver
                                        ? "border-amber-500 bg-amber-500/5"
                                        : "border-zinc-700 hover:border-zinc-500 bg-zinc-950/50 hover:bg-zinc-900/50"
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${dragOver ? "bg-amber-500/10" : "bg-zinc-800"
                                        }`}>
                                        <svg className={`w-6 h-6 transition-colors ${dragOver ? "text-amber-400" : "text-zinc-500"}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-300 font-medium">
                                            {dragOver ? "Drop image here" : "Click to browse or drag & drop"}
                                        </p>
                                        <p className="text-xs text-zinc-600 mt-1">PNG, JPG, WebP up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative border border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-950/50">
                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-20 h-20 rounded-xl border border-zinc-700/50 overflow-hidden bg-zinc-800 flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-zinc-200 font-medium truncate">{imageFile?.name}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">
                                            {imageFile && (imageFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        {uploading && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-amber-400 font-medium">Uploading to Cloudinary...</span>
                                            </div>
                                        )}
                                    </div>
                                    {!uploading && !loading && (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Price</label>
                            <input
                                name="price"
                                placeholder="₹..."
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Type</label>
                            <input
                                name="type"
                                placeholder="e.g. Ceiling Fan"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        ? "This product will be marked as unavailable"
                                        : "This product will be available for customers"
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
                                {uploading ? "Uploading Image..." : "Creating..."}
                            </span>
                        ) : (
                            "Create Product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
