import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { products } from "@/db/schema";

import { buttonVariants } from "@/components/ui/button";
import { ProductForm } from "./product-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Product",
};

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product = null;
  if (id !== "new") {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
    if (rows.length === 0) notFound();
    product = rows[0];
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">
          {product ? "Edit Product" : "Add Product"}
        </h1>
        <Link
          href="/admin/products"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          &larr; Back
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
