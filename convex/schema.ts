import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    categories: defineTable({
        name: v.string(),
        slug: v.string(),
        coverImage: v.string(),
        displayOrder: v.number(),
    }).index("by_slug", ["slug"]),

    products: defineTable({
        categoryId: v.id("categories"),
        excelId: v.string(),
        name: v.string(),
        brand: v.string(),
        image: v.string(),
        color: v.optional(v.string()),
        type: v.optional(v.string()),
        subCategory: v.optional(v.string()),
        brandLine: v.optional(v.string()),
        shape: v.optional(v.string()),
        size: v.optional(v.string()),
        price: v.optional(v.string()),
        motor: v.optional(v.string()),
        energy: v.optional(v.string()),
    })
        .index("by_category", ["categoryId"])
        .index("by_brand", ["brand"]),
});
