"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

type VariantData = {
    id: string; // temp id for UI
    color: string;
    size: string;
    imageFile: File | null;
    imagePreview: string;
    price: string;
    discountedPrice: string;
    discountBadge: string;
    outOfStock: boolean;
};

export default function NewProductPage() {
    const router = useRouter();
    const createProduct = useMutation(api.admin.createProduct);
    const categories = useQuery(api.categories.list);

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        basePrice: "",
        discountedPrice: "",
        discountBadge: "",
        brand: "",
        type: "",
        motor: "",
        energy: "",
    });

    const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
    const [baseImagePreview, setBaseImagePreview] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [variants, setVariants] = useState<VariantData[]>([
        { id: "1", color: "", size: "", imageFile: null, imagePreview: "", price: "", discountedPrice: "", discountBadge: "", outOfStock: false }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBaseFileSelect = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("Image must be less than 10MB");
            return;
        }
        setBaseImageFile(file);
        setBaseImagePreview(URL.createObjectURL(file));
    }, []);

    const handleBaseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleBaseFileSelect(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleBaseFileSelect(file);
    }, [handleBaseFileSelect]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const removeBaseImage = () => {
        setBaseImageFile(null);
        setBaseImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleVariantChange = (index: number, field: keyof VariantData, value: any) => {
        setVariants(prev => {
            const newVariants = [...prev];
            newVariants[index] = { ...newVariants[index], [field]: value };
            return newVariants;
        });
    };

    const handleVariantFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert("Image must be less than 10MB");
                return;
            }
            handleVariantChange(index, "imageFile", file);
            handleVariantChange(index, "imagePreview", URL.createObjectURL(file));
        }
    };

    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            { id: Math.random().toString(), color: "", size: "", imageFile: null, imagePreview: "", price: "", discountedPrice: "", discountBadge: "", outOfStock: false }
        ]);
    };

    const removeVariant = (index: number) => {
        if (variants.length <= 1) {
            alert("At least one variant is required");
            return;
        }
        setVariants(prev => prev.filter((_, i) => i !== index));
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
        if (!baseImageFile) {
            alert("Please upload a base product image");
            return;
        }

        setLoading(true);
        try {
            setUploading(true);
            const baseImageUrl = await uploadImage(baseImageFile);
            
            const uploadedVariants = [];
            for (const v of variants) {
                let variantImgUrl = baseImageUrl;
                if (v.imageFile) {
                    variantImgUrl = await uploadImage(v.imageFile);
                }
                uploadedVariants.push({
                    color: v.color || undefined,
                    size: v.size || undefined,
                    image: variantImgUrl,
                    price: v.price || undefined,
                    discountedPrice: v.discountedPrice || undefined,
                    discountBadge: v.discountBadge || undefined,
                    outOfStock: v.outOfStock,
                });
            }

            setUploading(false);

            await createProduct({
                name: formData.name,
                categoryId: formData.categoryId as Id<"categories">,
                baseImage: baseImageUrl,
                brand: formData.brand,
                basePrice: formData.basePrice || undefined,
                discountedPrice: formData.discountedPrice || undefined,
                discountBadge: formData.discountBadge || undefined,
                type: formData.type || undefined,
                motor: formData.motor || undefined,
                energy: formData.energy || undefined,
                variants: uploadedVariants,
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
            <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
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
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100">Add New Product</h1>
                    <p className="text-xs text-zinc-600 mt-0.5">Fill in the parent details and its variants below</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent Product Details */}
                <div className="bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl space-y-5">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">1. Parent Details</h3>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Base Price (MRP)</label>
                            <input
                                name="basePrice"
                                placeholder="₹..."
                                value={formData.basePrice}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Discounted Price</label>
                            <input
                                name="discountedPrice"
                                placeholder="₹..."
                                value={formData.discountedPrice}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Discount Badge</label>
                            <input
                                name="discountBadge"
                                placeholder="e.g. 33% + 20% EXTRA"
                                value={formData.discountBadge}
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
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Motor (Optional)</label>
                            <input
                                name="motor"
                                placeholder="e.g. BLDC"
                                value={formData.motor}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Energy (Optional)</label>
                            <input
                                name="energy"
                                placeholder="e.g. 23W"
                                value={formData.energy}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Image Upload Zone */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Base Product Image *</label>

                        {!baseImagePreview ? (
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
                                    onChange={handleBaseFileChange}
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
                                        <img src={baseImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-zinc-200 font-medium truncate">{baseImageFile?.name}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">
                                            {baseImageFile && (baseImageFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    {!uploading && !loading && (
                                        <button
                                            type="button"
                                            onClick={removeBaseImage}
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
                </div>

                {/* Variants Section */}
                <div className="bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">2. Variants (At least 1 required)</h3>
                    </div>

                    <div className="space-y-4">
                        {variants.map((variant, index) => (
                            <div key={variant.id} className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl relative group">
                                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Color</label>
                                        <input
                                            value={variant.color}
                                            onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            placeholder="e.g. White"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Size</label>
                                        <input
                                            value={variant.size}
                                            onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            placeholder="e.g. 1200mm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Price Override (MRP)</label>
                                        <input
                                            value={variant.price}
                                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            placeholder="Uses base price if empty"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discounted Price Override</label>
                                        <input
                                            value={variant.discountedPrice}
                                            onChange={(e) => handleVariantChange(index, "discountedPrice", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            placeholder="Uses base discounted if empty"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discount Badge Override</label>
                                        <input
                                            value={variant.discountBadge}
                                            onChange={(e) => handleVariantChange(index, "discountBadge", e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            placeholder="Uses base badge if empty"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Image Override</label>
                                        <div className="flex items-center gap-3">
                                            {variant.imagePreview && (
                                                <div className="w-9 h-9 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                                                    <img src={variant.imagePreview} alt="variant" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleVariantFileChange(index, e)}
                                                className="text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-300">Out of Stock</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleVariantChange(index, "outOfStock", !variant.outOfStock)}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${variant.outOfStock
                                            ? "bg-red-500/30 border border-red-500/40"
                                            : "bg-emerald-500/30 border border-emerald-500/40"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${variant.outOfStock
                                                ? "left-[calc(100%-1.25rem)] bg-red-400"
                                                : "left-1 bg-emerald-400"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addVariant}
                        className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-sm font-bold text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer"
                    >
                        + Add Another Variant
                    </button>
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
                                {uploading ? "Uploading Images..." : "Creating..."}
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
