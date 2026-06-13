import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all variants for a specific parent product
export const getByProduct = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("productVariants")
            .withIndex("by_product", (q) => q.eq("productId", args.productId))
            .collect();
    },
});

// Get a single variant by its ID
export const getById = query({
    args: { variantId: v.id("productVariants") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.variantId);
    },
});
