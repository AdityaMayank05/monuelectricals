"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function AdminCategoriesPage() {
    const categories = useQuery(api.categories.list);
    const stats = useQuery(api.admin.getDashboardStats);
    const createCategory = useMutation(api.admin.createCategory);
    const updateCategory = useMutation(api.admin.updateCategory);
    const deleteCategory = useMutation(api.admin.deleteCategory);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<Id<"categories"> | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        coverImage: "",
        displayOrder: 0,
    });

    const resetForm = () => {
        setFormData({ name: "", slug: "", coverImage: "", displayOrder: 0 });
        setEditingId(null);
        setShowForm(false);
    };

    const handleNameChange = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            name,
            slug: editingId ? prev.slug : slugify(name),
        }));
    };

    const handleEdit = (cat: any) => {
        setEditingId(cat._id);
        setFormData({
            name: cat.name,
            slug: cat.slug,
            coverImage: cat.coverImage,
            displayOrder: cat.displayOrder,
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCategory({
                    id: editingId,
                    name: formData.name,
                    slug: formData.slug,
                    coverImage: formData.coverImage,
                    displayOrder: formData.displayOrder,
                });
            } else {
                await createCategory({
                    name: formData.name,
                    slug: formData.slug,
                    coverImage: formData.coverImage,
                    displayOrder: formData.displayOrder,
                });
            }
            resetForm();
        } catch (error) {
            console.error(error);
            alert("Failed to save category. Ensure you are authorized.");
        }
    };

    const handleDelete = async (id: Id<"categories">, name: string) => {
        if (
            confirm(
                `Are you sure you want to delete "${name}"?\n\nThis will also delete ALL products in this category. This action cannot be undone.`
            )
        ) {
            try {
                await deleteCategory({ id });
            } catch (error) {
                console.error(error);
                alert("Failed to delete category.");
            }
        }
    };

    const getProductCount = (catId: string) => {
        return stats?.categoryStats.find((c) => c._id === catId)?.productCount ?? 0;
    };

    if (!categories) {
        return (
            <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800/60 rounded-2xl h-24"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100">Categories</h1>
                    <p className="text-sm text-zinc-500 mt-1">{categories.length} categories configured</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 cursor-pointer"
                >
                    + Add Category
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-zinc-200">
                            {editingId ? "Edit Category" : "New Category"}
                        </h3>
                        <button onClick={resetForm} className="text-zinc-500 hover:text-zinc-300 text-sm cursor-pointer">
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                                    Category Name *
                                </label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. LED Lights"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                                    URL Slug *
                                </label>
                                <input
                                    required
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                                    }
                                    placeholder="e.g. led-lights"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors font-mono"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                                    Cover Image URL *
                                </label>
                                <input
                                    required
                                    value={formData.coverImage}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                                    }
                                    placeholder="https://..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                                    Display Order *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.displayOrder}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            displayOrder: parseInt(e.target.value) || 0,
                                        }))
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        {formData.coverImage && (
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-xl border border-zinc-800 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.coverImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-xs text-zinc-600">Image preview</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 px-6 py-2.5 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
                        >
                            {editingId ? "Update Category" : "Create Category"}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="space-y-3">
                {categories
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((cat) => (
                        <div
                            key={cat._id}
                            className="group bg-zinc-900/60 border border-zinc-800/60 rounded-2xl overflow-hidden hover:border-zinc-700/60 transition-all flex items-stretch"
                        >
                            {/* Cover Image Thumbnail */}
                            <div className="w-32 flex-shrink-0 relative overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={cat.coverImage}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-base font-bold text-zinc-200">{cat.name}</h3>
                                        <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-md">
                                            /{cat.slug}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                            {getProductCount(cat._id)} products
                                        </span>
                                        <span>Order: {cat.displayOrder}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="px-3 py-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id, cat.name)}
                                        className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {categories.length === 0 && (
                <div className="bg-zinc-900 border border-zinc-800/60 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📁</span>
                    </div>
                    <h3 className="font-bold text-zinc-300 text-lg">No categories yet</h3>
                    <p className="text-sm text-zinc-600 mt-1">Create your first category to get started.</p>
                </div>
            )}
        </div>
    );
}
