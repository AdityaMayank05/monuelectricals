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
    const addVariant = useMutation(api.admin.addVariant);
    const updateVariant = useMutation(api.admin.updateVariant);
    const deleteVariant = useMutation(api.admin.deleteVariant);
    const categories = useQuery(api.categories.list);

    // Parent Product State
    const [formData, setFormData] = useState({
        name: "",
        basePrice: "",
        discountedPrice: "",
        discountBadge: "",
        brand: "",
        type: "",
        motor: "",
        energy: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [existingImageUrl, setExistingImageUrl] = useState<string>("");
    
    // New Variant State
    const [newVariant, setNewVariant] = useState({
        color: "",
        size: "",
        price: "",
        discountedPrice: "",
        discountBadge: "",
        outOfStock: false,
    });
    const [newVariantImageFile, setNewVariantImageFile] = useState<File | null>(null);
    const [newVariantImagePreview, setNewVariantImagePreview] = useState<string>("");

    // Editing Variant State
    const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
    const [editVariantData, setEditVariantData] = useState({
        color: "",
        size: "",
        price: "",
        discountedPrice: "",
        discountBadge: "",
        outOfStock: false,
    });
    const [editVariantImageFile, setEditVariantImageFile] = useState<File | null>(null);
    const [editVariantImagePreview, setEditVariantImagePreview] = useState<string>("");

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                basePrice: product.basePrice || "",
                discountedPrice: product.discountedPrice || "",
                discountBadge: product.discountBadge || "",
                brand: product.brand,
                type: product.type || "",
                motor: product.motor || "",
                energy: product.energy || "",
            });
            setExistingImageUrl(product.baseImage);
            if (!imageFile) {
                setImagePreview(product.baseImage);
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

    const handleSubmitParent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = existingImageUrl;

            if (imageFile) {
                setUploading(true);
                imageUrl = await uploadImage(imageFile);
                setUploading(false);
            }

            await updateProduct({
                id: productId,
                name: formData.name,
                baseImage: imageUrl,
                brand: formData.brand,
                basePrice: formData.basePrice || undefined,
                discountedPrice: formData.discountedPrice || undefined,
                discountBadge: formData.discountBadge || undefined,
                type: formData.type || undefined,
                motor: formData.motor || undefined,
                energy: formData.energy || undefined,
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

    const handleAddVariant = async () => {
        setLoading(true);
        try {
            let imageUrl = existingImageUrl;
            if (newVariantImageFile) {
                setUploading(true);
                imageUrl = await uploadImage(newVariantImageFile);
                setUploading(false);
            }

            await addVariant({
                productId,
                color: newVariant.color || undefined,
                size: newVariant.size || undefined,
                price: newVariant.price || undefined,
                discountedPrice: newVariant.discountedPrice || undefined,
                discountBadge: newVariant.discountBadge || undefined,
                image: imageUrl,
                outOfStock: newVariant.outOfStock,
            });

            setNewVariant({ color: "", size: "", price: "", discountedPrice: "", discountBadge: "", outOfStock: false });
            setNewVariantImageFile(null);
            setNewVariantImagePreview("");
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert("Failed to add variant");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateVariant = async () => {
        if (!editingVariantId) return;
        setLoading(true);
        try {
            const variant = product?.variants.find((v: any) => v._id === editingVariantId);
            let imageUrl = variant?.image;

            if (editVariantImageFile) {
                setUploading(true);
                imageUrl = await uploadImage(editVariantImageFile);
                setUploading(false);
            }

            await updateVariant({
                id: editingVariantId as Id<"productVariants">,
                color: editVariantData.color || undefined,
                size: editVariantData.size || undefined,
                price: editVariantData.price || undefined,
                discountedPrice: editVariantData.discountedPrice || undefined,
                discountBadge: editVariantData.discountBadge || undefined,
                image: imageUrl,
                outOfStock: editVariantData.outOfStock,
            });

            setEditingVariantId(null);
            setEditVariantImageFile(null);
            setEditVariantImagePreview("");
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert("Failed to update variant");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVariant = async (variantId: string) => {
        if (product?.variants.length === 1) {
            alert("Cannot delete the last variant. A product must have at least one variant.");
            return;
        }
        if (confirm("Are you sure you want to delete this variant?")) {
            try {
                await deleteVariant({ id: variantId as Id<"productVariants"> });
            } catch (error) {
                console.error(error);
                alert("Failed to delete variant");
            }
        }
    };

    const startEditVariant = (variant: any) => {
        setEditingVariantId(variant._id);
        setEditVariantData({
            color: variant.color || "",
            size: variant.size || "",
            price: variant.price || "",
            discountedPrice: variant.discountedPrice || "",
            discountBadge: variant.discountBadge || "",
            outOfStock: variant.outOfStock || false,
        });
        setEditVariantImageFile(null);
        setEditVariantImagePreview(variant.image);
    };

    const categoryName = product && categories
        ? categories.find((c) => c._id === product.categoryId)?.name ?? "Unknown"
        : "...";

    if (product === undefined) {
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

    if (product === null) {
        return (
            <div className="max-w-3xl mx-auto text-center py-20">
                <span className="text-4xl">🔍</span>
                <h2 className="text-lg font-bold text-zinc-300 mt-4">Product not found</h2>
                <Link href="/admin/products" className="text-amber-500 text-sm mt-2 hover:underline">
                    ← Back to products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
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

            {/* Section 1: Parent Product */}
            <form onSubmit={handleSubmitParent} className="space-y-6 bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl">
                <h3 className="text-sm font-bold text-zinc-100 border-b border-zinc-800/60 pb-3">1. Parent Product Details</h3>
                
                {/* Image Upload Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Base Image</h3>

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
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-zinc-200">{formData.name || "Untitled"}</p>
                                        <p className="text-xs text-zinc-600 mt-0.5">Current Base Image</p>
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
                                {imageFile ? "Replace with another image" : dragOver ? "Drop image here" : "Upload a new base image"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800/60">
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
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Base Price (MRP)</label>
                            <input
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                                placeholder="₹..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Discounted Price</label>
                            <input
                                name="discountedPrice"
                                value={formData.discountedPrice}
                                onChange={handleChange}
                                placeholder="₹..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Discount Badge</label>
                            <input
                                name="discountBadge"
                                value={formData.discountBadge}
                                onChange={handleChange}
                                placeholder="e.g. 33% + 20% EXTRA"
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
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Motor</label>
                            <input
                                name="motor"
                                value={formData.motor}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Energy</label>
                            <input
                                name="energy"
                                value={formData.energy}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="bg-zinc-800 text-zinc-200 px-6 py-2 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        {loading && uploading ? "Uploading..." : loading ? "Saving..." : "Save Parent Details"}
                    </button>
                </div>
            </form>

            {/* Section 2: Variants */}
            <div className="bg-zinc-900/60 border border-zinc-800/60 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                    <h3 className="text-sm font-bold text-zinc-100">2. Variants Management</h3>
                    <span className="text-xs font-semibold text-zinc-500 bg-zinc-800/60 px-2.5 py-1 rounded-lg tabular-nums">
                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Existing Variants List */}
                <div className="space-y-3">
                    {product.variants.map((variant: any) => (
                        <div key={variant._id} className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            {editingVariantId === variant._id ? (
                                /* EDIT VARIANT MODE */
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Color</label>
                                            <input
                                                value={editVariantData.color}
                                                onChange={(e) => setEditVariantData({ ...editVariantData, color: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Size</label>
                                            <input
                                                value={editVariantData.size}
                                                onChange={(e) => setEditVariantData({ ...editVariantData, size: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Price Override</label>
                                            <input
                                                value={editVariantData.price}
                                                onChange={(e) => setEditVariantData({ ...editVariantData, price: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discounted Price</label>
                                            <input
                                                value={editVariantData.discountedPrice}
                                                onChange={(e) => setEditVariantData({ ...editVariantData, discountedPrice: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discount Badge</label>
                                            <input
                                                value={editVariantData.discountBadge}
                                                onChange={(e) => setEditVariantData({ ...editVariantData, discountBadge: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Image Override</label>
                                            <div className="flex items-center gap-3">
                                                {editVariantImagePreview && (
                                                    <div className="w-9 h-9 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                                                        <img src={editVariantImagePreview} alt="variant" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setEditVariantImageFile(file);
                                                            setEditVariantImagePreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                    className="text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                                        <p className="text-sm font-semibold text-zinc-300">Out of Stock</p>
                                        <button
                                            type="button"
                                            onClick={() => setEditVariantData({ ...editVariantData, outOfStock: !editVariantData.outOfStock })}
                                            className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${editVariantData.outOfStock
                                                ? "bg-red-500/30 border border-red-500/40"
                                                : "bg-emerald-500/30 border border-emerald-500/40"
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${editVariantData.outOfStock
                                                    ? "left-[calc(100%-1.25rem)] bg-red-400"
                                                    : "left-1 bg-emerald-400"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button onClick={() => setEditingVariantId(null)} className="px-4 py-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-colors">Cancel</button>
                                        <button onClick={handleUpdateVariant} disabled={loading || uploading} className="px-4 py-1.5 bg-amber-500 text-zinc-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors">Save</button>
                                    </div>
                                </div>
                            ) : (
                                /* VIEW VARIANT MODE */
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/50 flex-shrink-0">
                                        <img src={variant.image} alt="variant" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-medium text-zinc-200">
                                                {variant.color || variant.size || "Default"}
                                            </span>
                                            {variant.color && variant.size && (
                                                <span className="text-xs text-zinc-500 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">{variant.size}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-mono text-amber-500/80">
                                            {variant.price || "Uses base price"}
                                        </div>
                                        <div className="sm:ml-auto">
                                            {variant.outOfStock ? (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> OOS
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> In Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => startEditVariant(variant)} className="p-1.5 text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 rounded transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDeleteVariant(variant._id)} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add New Variant */}
                <div className="pt-6 border-t border-zinc-800/60">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">+ Add New Variant</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Color</label>
                            <input
                                value={newVariant.color}
                                onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                placeholder="e.g. White"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Size</label>
                            <input
                                value={newVariant.size}
                                onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                placeholder="e.g. 1200mm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Price Override</label>
                            <input
                                value={newVariant.price}
                                onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                placeholder="Uses base price if empty"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discounted Price</label>
                            <input
                                value={newVariant.discountedPrice}
                                onChange={(e) => setNewVariant({ ...newVariant, discountedPrice: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                placeholder="Uses base discounted if empty"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Discount Badge</label>
                            <input
                                value={newVariant.discountBadge}
                                onChange={(e) => setNewVariant({ ...newVariant, discountBadge: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50"
                                placeholder="Uses base badge if empty"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Image Override</label>
                            <div className="flex items-center gap-3">
                                {newVariantImagePreview && (
                                    <div className="w-9 h-9 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                                        <img src={newVariantImagePreview} alt="variant" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setNewVariantImageFile(file);
                                            setNewVariantImagePreview(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4 bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                        <p className="text-sm font-semibold text-zinc-300">Out of Stock</p>
                        <button
                            type="button"
                            onClick={() => setNewVariant({ ...newVariant, outOfStock: !newVariant.outOfStock })}
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${newVariant.outOfStock
                                ? "bg-red-500/30 border border-red-500/40"
                                : "bg-emerald-500/30 border border-emerald-500/40"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${newVariant.outOfStock
                                    ? "left-[calc(100%-1.25rem)] bg-red-400"
                                    : "left-1 bg-emerald-400"
                                    }`}
                            />
                        </button>
                    </div>
                    <button
                        onClick={handleAddVariant}
                        disabled={loading || uploading}
                        className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading && uploading ? "Uploading..." : "Add Variant"}
                    </button>
                </div>
            </div>
        </div>
    );
}
