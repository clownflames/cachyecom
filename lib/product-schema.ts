import { z } from "zod";

import { type NewProductRow } from "@/db/schema";

export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || `product-${Date.now().toString(36)}`;
}

/** Accepts either a single string or an array of strings, normalizes to []. */
const textArray = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) => {
    if (typeof value === "string") return value ? [value] : [];
    return Array.isArray(value)
      ? value.filter(Boolean).map((v) => String(v))
      : [];
  });

/** Accepts an object of any values and normalizes every value to a string. */
const specRecord = z
  .record(z.string(), z.any())
  .optional()
  .default({})
  .transform((value) => {
    const out: Record<string, string> = {};
    for (const [key, val] of Object.entries(value ?? {})) {
      out[String(key)] = String(val);
    }
    return out;
  });

export const productInputSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "Product name is required"),
  slug: z.string().trim().min(1).optional(),
  description: z.string().optional().default(""),
  category: z.string().trim().min(1, "Category is required"),
  image: z.string().optional().default(""),
  images: textArray,
  originalPrice: z.coerce.number().nonnegative("Original price must be >= 0"),
  salePrice: z.coerce.number().nonnegative("Sale price must be >= 0"),
  offerPrice: z.coerce.number().nonnegative().optional(),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  reviewCount: z.coerce.number().int().nonnegative().optional().default(0),
  stock: z.coerce.number().int().nonnegative().optional().default(0),
  badge: z.string().trim().optional(),
  features: textArray,
  specifications: specRecord,
});

export type ProductInput = z.infer<typeof productInputSchema>;

/**
 * Parses bulk-import JSON. Accepts either a bare array of products or an
 * object with a `products` array (and optional `category`/`name` defaults).
 */
export const bulkImportSchema = z.union([
  z.array(productInputSchema),
  z.object({
    products: z.array(productInputSchema),
    category: z.string().optional(),
  }),
]);

export function toNewProduct(input: ProductInput): NewProductRow {
  const originalPrice = Math.round(input.originalPrice);
  const salePrice = Math.round(input.salePrice);
  const discountPercentage =
    originalPrice > 0 && salePrice < originalPrice
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : 0;

  return {
    id: input.id || `prod-${slugify(input.slug || input.name)}`,
    name: input.name,
    slug: input.slug || slugify(input.name),
    description: input.description ?? "",
    category: input.category,
    image: input.image ?? "",
    images: input.images ?? [],
    originalPrice,
    salePrice,
    offerPrice:
      input.offerPrice !== undefined && input.offerPrice !== null
        ? Math.round(input.offerPrice)
        : null,
    discountPercentage,
    rating: input.rating ?? 0,
    reviewCount: input.reviewCount ?? 0,
    stock: input.stock ?? 0,
    badge: input.badge || null,
    features: input.features ?? [],
    specifications: input.specifications ?? {},
  };
}
