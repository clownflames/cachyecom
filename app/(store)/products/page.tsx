import type { Metadata } from "next";
import Link from "next/link";

import { ProductsBrowser } from "@/components/products-browser";
import { products } from "@/lib/products";
import { SITE_DESCRIPTION } from "@/lib/config";

export const metadata: Metadata = {
  title: "All Products - Big Sale",
  description: `Browse all products on sale. ${SITE_DESCRIPTION}`,
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = Array.isArray(params.q) ? params.q[0] : (params.q ?? "");
  const category = Array.isArray(params.category)
    ? params.category[0]
    : (params.category ?? "all");
  const sort = Array.isArray(params.sort)
    ? params.sort[0]
    : (params.sort ?? "popularity");

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
          </li>
        </ol>
      </nav>

      <h1 className="mb-5 text-2xl font-black tracking-tight sm:text-3xl">
        Shop All Products
      </h1>

      <ProductsBrowser
        products={products}
        initialQuery={q}
        initialCategory={category}
        initialSort={sort}
      />
    </div>
  );
}
