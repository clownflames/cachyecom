import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgePercent, ShieldCheck, Star, Truck, Wallet } from "lucide-react";

import { ProductActions } from "@/components/product-actions";
import { ProductGallery } from "@/components/product-gallery";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeader } from "@/components/section-header";
import {
  getProductBySlug,
  products,
} from "@/lib/products";
import { formatNumber, formatPrice } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${formatPrice(product.salePrice)}`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const outOfStock = product.stock <= 0;
  const related = products
    .filter(
      (p) =>
        p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
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
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="max-w-[220px] truncate text-foreground sm:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge && (
              <span className="rounded bg-foreground px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-background">
                {product.badge}
              </span>
            )}
            <span className="rounded bg-accent px-2 py-1 text-[11px] font-bold text-accent-foreground">
              {product.discountPercentage}% OFF
            </span>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-medium text-muted-foreground hover:text-primary"
            >
              {product.category}
            </Link>
          </div>

          <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-sm font-bold text-white">
              {product.rating}
              <Star className="size-3.5 fill-white text-white" aria-hidden="true" />
            </span>
            <span className="text-sm text-muted-foreground">
              {formatNumber(product.reviewCount)} ratings
            </span>
          </div>

          {/* Price block */}
          <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-black tracking-tight">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm font-bold text-emerald-600">
                {product.discountPercentage}% OFF
              </span>
            </div>
            {product.offerPrice != null &&
              product.offerPrice < product.salePrice && (
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                    Special Offer
                  </span>
                  <span className="font-bold text-primary">
                    {formatPrice(product.offerPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    with this sale
                  </span>
                </p>
              )}
            <p className="mt-3 text-sm">
              <span className="font-semibold">
                MRP {formatPrice(product.originalPrice)}
              </span>{" "}
              (inclusive of all taxes)
            </p>
          </div>

          {/* Availability */}
          <p className="mt-4 text-sm">
            {outOfStock ? (
              <span className="font-semibold text-destructive">Out of Stock</span>
            ) : (
              <>
                <span className="font-semibold text-emerald-600">In Stock</span>
                <span className="ml-1 text-muted-foreground">
                  ({product.stock} available)
                </span>
              </>
            )}
          </p>

          <div className="mt-5">
            <ProductActions productId={product.id} stock={product.stock} />
          </div>

          {/* Trust badges */}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Truck, label: "Fast Delivery" },
              { icon: Wallet, label: "COD Available" },
              { icon: ShieldCheck, label: "Secure Payment" },
              { icon: BadgePercent, label: "Best Price" },
            ].map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium"
              >
                <b.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Details */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-black">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          {product.features.length > 0 && (
            <>
              <h3 className="mt-6 text-base font-bold">Key Features</h3>
              <ul className="mt-3 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h2 className="text-lg font-black">Specifications</h2>
          <dl className="mt-3 divide-y divide-border">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex items-start justify-between gap-4 py-2.5"
              >
                <dt className="text-sm text-muted-foreground">{key}</dt>
                <dd className="text-right text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <SectionHeader
            title="You may also like"
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="mb-5"
          />
          <ProductGrid items={related} className="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      )}
    </div>
  );
}
