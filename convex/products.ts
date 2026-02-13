import { query } from "./_generated/server";
import { v } from "convex/values";

export const getById = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.productId);
    },
});

export const listByCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();
    },
});

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

export const getColorsForCategory = query({
    args: { categoryId: v.id("categories") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
            .collect();
        const colors = [...new Set(products.map((p) => p.color).filter(Boolean) as string[])].sort();
        return colors;
    },
});
