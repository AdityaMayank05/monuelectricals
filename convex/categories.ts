import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const categories = await ctx.db
            .query("categories")
            .collect();
        // Sort by displayOrder
        return categories.sort((a, b) => a.displayOrder - b.displayOrder);
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("categories")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});
