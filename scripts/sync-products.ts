/**
 * Syncs products from lib/products.ts into the database.
 * Run with: npx tsx scripts/sync-products.ts
 * Existing products are updated, new ones are inserted.
 */
import { db } from "../db";
import { products } from "../db/schema";
import { products as staticProducts } from "../lib/products";
import { eq } from "drizzle-orm";

async function main() {
  let inserted = 0;
  let updated = 0;

  for (const p of staticProducts) {
    const row = {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      category: p.category,
      image: p.image,
      images: p.images,
      originalPrice: p.originalPrice,
      salePrice: p.salePrice,
      offerPrice: p.offerPrice ?? null,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      reviewCount: p.reviewCount,
      stock: p.stock,
      badge: p.badge ?? null,
      features: p.features,
      specifications: p.specifications,
    };

    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, p.id))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(products)
        .set({ ...row, updatedAt: new Date() })
        .where(eq(products.id, p.id));
      updated += 1;
    } else {
      await db.insert(products).values(row);
      inserted += 1;
    }
  }

  console.log(`Done. ${inserted} inserted, ${updated} updated.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
