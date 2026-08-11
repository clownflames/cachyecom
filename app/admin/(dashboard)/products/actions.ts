"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import {
  bulkImportSchema,
  productInputSchema,
  toNewProduct,
} from "@/lib/product-schema";

export type BulkImportResult = {
  total: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: string[];
};

function splitLines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpecifications(value: string | undefined): Record<string, string> {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [String(k), String(v)])
      );
    }
  } catch {
    // fall through
  }
  return {};
}

/**
 * Bulk imports products from a JSON string (uploaded via the admin UI).
 * Products that already exist are updated, new ones are inserted.
 */
export async function bulkImportProducts(input: {
  json: string;
}): Promise<BulkImportResult> {
  await requireAdmin();

  const result: BulkImportResult = {
    total: 0,
    imported: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  let raw: unknown;
  try {
    raw = JSON.parse(input.json);
  } catch {
    return { ...result, errors: ["Invalid JSON. Upload a valid .json file."] };
  }

  const parsed = bulkImportSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const where = first?.path.length ? first.path.join(".") : "product";
    return {
      ...result,
      errors: [
        `Invalid product data. ${where}: ${first?.message ?? "check the file structure."}`,
      ],
    };
  }

  const rows = Array.isArray(parsed.data) ? parsed.data : parsed.data.products;
  result.total = rows.length;

  for (const item of rows) {
    try {
      const row = toNewProduct(item);
      const existing = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.id, row.id))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(products)
          .set({ ...row, updatedAt: new Date() })
          .where(eq(products.id, row.id));
        result.updated += 1;
      } else {
        await db.insert(products).values(row);
        result.imported += 1;
      }
    } catch (error) {
      result.skipped += 1;
      result.errors.push(
        `${item.name || item.id || "Unknown product"}: ${
          error instanceof Error ? error.message : "failed to save"
        }`
      );
    }
  }

  revalidatePath("/admin/products");
  return result;
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
}

export type SaveProductState = { error?: string } | null;

export async function saveProduct(
  _prevState: SaveProductState,
  formData: FormData
): Promise<SaveProductState> {
  await requireAdmin();

  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    raw[key] = String(value);
  }

  const candidate = {
    id: raw.id || undefined,
    name: raw.name,
    slug: raw.slug || undefined,
    description: raw.description,
    category: raw.category,
    image: raw.image,
    images: splitLines(raw.images),
    originalPrice: raw.originalPrice,
    salePrice: raw.salePrice,
    offerPrice: raw.offerPrice ? raw.offerPrice : undefined,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    stock: raw.stock,
    badge: raw.badge,
    features: splitLines(raw.features),
    specifications: parseSpecifications(raw.specifications),
  };

  const parsed = productInputSchema.safeParse(candidate);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid form data.",
    };
  }

  const row = toNewProduct(parsed.data);
  const existing = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.id, row.id))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(products)
      .set({ ...row, updatedAt: new Date() })
      .where(eq(products.id, row.id));
  } else {
    await db.insert(products).values(row);
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}
