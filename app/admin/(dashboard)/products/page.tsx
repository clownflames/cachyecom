import Link from "next/link";
import { desc } from "drizzle-orm";

import { db } from "@/db";
import { products } from "@/db/schema";
import { formatPrice } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BulkImportForm } from "./import-form";
import { DeleteProductButton } from "./delete-product-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products",
};

export default async function AdminProductsPage() {
  const rows = await db.select().from(products).orderBy(desc(products.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Products</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} products in the database.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className={buttonVariants({ variant: "default" })}
        >
          Add Product
        </Link>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-1 font-black">Bulk Import (JSON)</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          `.json` file upload karo (array of products) — existing products update
          ho jayenge, naye add ho jayenge.
        </p>
        <BulkImportForm />
      </section>

      <section className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Sale Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    Koi product nahi. Upar JSON import karo ya &quot;Add Product&quot; se add karo.
                  </td>
                </tr>
              ) : (
                rows.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="font-medium hover:underline"
                      >
                        {product.name}
                      </Link>
                      <span className="block text-xs text-muted-foreground">
                        {product.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{formatPrice(product.salePrice)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          product.stock < 10
                            ? "font-bold text-destructive"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" })
                          )}
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
