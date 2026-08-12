import Link from "next/link";
import { Star } from "lucide-react";

import { ProductImage } from "@/components/product-image";
import type { Product } from "@/lib/products";
import { formatNumber, formatPrice } from "@/lib/utils";

import { cn } from "@/lib/utils";

function Rating({ product }: { product: Product }) {
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span className="fk-rating flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-bold text-white">
        {product.rating}
        <Star className="size-3 fill-white text-white" aria-hidden="true" />
      </span>
      <span className="font-medium text-[#878787]">
        ({formatNumber(product.reviewCount)})
      </span>
    </span>
  );
}

function PriceBlock({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-lg font-bold text-[#212121]">
          {formatPrice(product.salePrice)}
        </span>
        <span className="text-sm text-[#878787] line-through">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="fk-price rounded-sm px-1 py-0.5 text-xs font-bold">
          {product.discountPercentage}% off
        </span>
      </div>
      {product.offerPrice != null && product.offerPrice < product.salePrice && (
        <p className="mt-1 flex items-center gap-1.5 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#212121]">
            Special Offer:
          </span>
          <span className="fk-price font-bold">
            {formatPrice(product.offerPrice)}
          </span>
        </p>
      )}
    </div>
  );
}

export function ProductCard({
  product,
  layout = "grid",
  priority,
}: {
  product: Product;
  layout?: "grid" | "list";
  priority?: boolean;
}) {
  const href = `/products/${product.slug}`;
  const outOfStock = product.stock <= 0;

  if (layout === "list") {
    return (
      <Link
        href={href}
        aria-label={product.name}
        className="group flex gap-4 rounded-lg border border-border bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-4"
      >
        <div className="relative block aspect-square w-28 shrink-0 overflow-hidden rounded-sm bg-white sm:w-36">
          <ProductImage src={product.image} alt={product.name} priority={priority} />
          {outOfStock && (
            <span className="absolute inset-0 grid place-items-center bg-black/50 text-xs font-bold text-white">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-xs font-medium uppercase tracking-wide text-[#878787]">
            {product.category}
          </p>
          <span className="mt-0.5 line-clamp-2 text-sm font-medium text-[#212121] transition-colors group-hover:text-[#2874f0]">
            {product.name}
          </span>
          <div className="mt-1.5">
            <Rating product={product} />
          </div>
          <div className="mt-2">
            <PriceBlock product={product} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={product.name}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative block aspect-square overflow-hidden bg-white px-4 py-3">
        <ProductImage
          src={product.image}
          alt={product.name}
          priority={priority}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-sm bg-[#ff6161] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-bold text-white">
            Out of Stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-border p-3 sm:p-4">
        <span
          className={cn(
            "line-clamp-2 text-sm font-medium leading-snug text-[#212121] transition-colors group-hover:text-[#2874f0]"
          )}
        >
          {product.name}
        </span>
        <div className="mt-2">
          <Rating product={product} />
        </div>
        <div className="mt-2">
          <PriceBlock product={product} />
        </div>
      </div>
    </Link>
  );
}