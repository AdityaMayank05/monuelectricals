import { query } from "./_generated/server";
import { v } from "convex/values";

// Get a single parent product by ID, along with all its variants
export const getById = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.productId);
        if (!product) return null;

        const variants = await ctx.db
            .query("productVariants")
            .withIndex("by_product", (q) => q.eq("productId", args.productId))
            .collect();

        return { ...product, variants };
    },
});

// List all parent products for a category, each with its variants
export const listByCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();

        const productsWithVariants = await Promise.all(
            products.map(async (product) => {
                const variants = await ctx.db
                    .query("productVariants")
                    .withIndex("by_product", (q) => q.eq("productId", product._id))
                    .collect();
                return { ...product, variants };
            })
        );

        return productsWithVariants;
    },
});

// Get all unique brands for a category
export const getBrandsForCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();
        const brands = [...new Set(products.map((p) => p.brand))].sort();
        return brands;
    },
});

// Get all unique types for a category
export const getTypesForCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();
        const types = [...new Set(products.map((p) => p.type).filter(Boolean) as string[])].sort();
        return types;
    },
});

// Get all unique colors across all variants for a category
export const getColorsForCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();

        const allVariants = await Promise.all(
            products.map((p) =>
                ctx.db
                    .query("productVariants")
                    .withIndex("by_product", (q) => q.eq("productId", p._id))
                    .collect()
            )
        );

        const colors = [
            ...new Set(
                allVariants.flat().map((v) => v.color).filter(Boolean) as string[]
            ),
        ].sort();
        return colors;
    },
});

// List all products (for admin) with variants
export const listAll = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();

        const productsWithVariants = await Promise.all(
            products.map(async (product) => {
                const variants = await ctx.db
                    .query("productVariants")
                    .withIndex("by_product", (q) => q.eq("productId", product._id))
                    .collect();
                return { ...product, variants };
            })
        );

        return productsWithVariants;
    },
});
