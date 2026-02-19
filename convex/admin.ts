import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Admin check: verifies user is authenticated
async function checkAdmin(ctx: any) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error("Unauthenticated call to admin mutation");
    }
    return identity;
}

// ─── Dashboard Stats ───────────────────────────────────────────────
export const getDashboardStats = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db.query("categories").collect();
        const products = await ctx.db.query("products").collect();

        // Count products per category
        const categoryStats = categories
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((cat) => {
                const catProducts = products.filter((p) => p.categoryId === cat._id);
                const brands = [...new Set(catProducts.map((p) => p.brand))];
                return {
                    _id: cat._id,
                    name: cat.name,
                    slug: cat.slug,
                    coverImage: cat.coverImage,
                    displayOrder: cat.displayOrder,
                    productCount: catProducts.length,
                    brandCount: brands.length,
                    topBrands: brands.slice(0, 3),
                };
            });

        return {
            totalProducts: products.length,
            totalCategories: categories.length,
            totalBrands: [...new Set(products.map((p) => p.brand))].length,
            categoryStats,
        };
    },
});

// ─── Product Mutations ─────────────────────────────────────────────
export const createProduct = mutation({
    args: {
        name: v.string(),
        categoryId: v.id("categories"),
        price: v.optional(v.string()),
        image: v.string(),
        brand: v.string(),
        type: v.optional(v.string()),
        color: v.optional(v.string()),
        size: v.optional(v.string()),
        subCategory: v.optional(v.string()),
        brandLine: v.optional(v.string()),
        shape: v.optional(v.string()),
        motor: v.optional(v.string()),
        energy: v.optional(v.string()),
        outOfStock: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        return await ctx.db.insert("products", args);
    },
});

export const updateProduct = mutation({
    args: {
        id: v.id("products"),
        name: v.optional(v.string()),
        price: v.optional(v.string()),
        image: v.optional(v.string()),
        brand: v.optional(v.string()),
        type: v.optional(v.string()),
        color: v.optional(v.string()),
        size: v.optional(v.string()),
        subCategory: v.optional(v.string()),
        outOfStock: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

export const deleteProduct = mutation({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        await ctx.db.delete(args.id);
    },
});

// ─── Category Mutations ────────────────────────────────────────────
export const createCategory = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        coverImage: v.string(),
        displayOrder: v.number(),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        return await ctx.db.insert("categories", args);
    },
});

export const updateCategory = mutation({
    args: {
        id: v.id("categories"),
        name: v.optional(v.string()),
        slug: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        displayOrder: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

export const deleteCategory = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        // Also delete all products in this category
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.id))
            .collect();
        for (const product of products) {
            await ctx.db.delete(product._id);
        }
        await ctx.db.delete(args.id);
    },
});
