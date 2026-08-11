"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Plus, ShoppingBag, Star } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { ProductImage } from "@/components/product-image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatNumber, formatPrice } from "@/lib/utils";

import { cn } from "@/lib/utils";

function Rating({ product }: { product: Product }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className="font-semibold text-foreground">{product.rating}</span>
      <span>({formatNumber(product.reviewCount)})</span>
    </span>
  );
}

function PriceBlock({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-lg font-black text-foreground">
          {formatPrice(product.salePrice)}
        </span>
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="rounded bg-accent px-1.5 py-0.5 text-xs font-bold text-accent-foreground">
          {product.discountPercentage}% OFF
        </span>
      </div>
      {product.offerPrice != null && product.offerPrice < product.salePrice && (
        <p className="mt-1 flex items-center gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Special Offer:
          </span>
          <span className="font-bold text-primary">
            {formatPrice(product.offerPrice)}
          </span>
        </p>
      )}
    </div>
  );
}

function CardActions({ product }: { product: Product }) {
  const { addItem, buyNow } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addItem(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    buyNow(product.id);
    router.push("/checkout");
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        disabled={outOfStock}
        className="flex-1 rounded-lg"
        aria-label={`Add ${product.name} to cart`}
      >
        {added ? (
          <>
            <Check className="size-4" /> Added
          </>
        ) : (
          <>
            <Plus className="size-4" /> Add to Cart
          </>
        )}
      </Button>
      <Button
        type="button"
        onClick={handleBuyNow}
        disabled={outOfStock}
        className="flex-1 rounded-lg"
        aria-label={`Buy ${product.name} now`}
      >
        <ShoppingBag className="size-4" /> Buy Now
      </Button>
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
      <article className="group flex gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-4">
        <Link
          href={href}
          className="relative block aspect-square w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-36"
          aria-label={product.name}
        >
          <ProductImage src={product.image} alt={product.name} priority={priority} />
          {outOfStock && (
            <span className="absolute inset-0 grid place-items-center bg-black/50 text-xs font-bold text-white">
              Out of Stock
            </span>
          )}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>
          <Link
            href={href}
            className="mt-0.5 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="mt-1">
            <Rating product={product} />
          </div>
          <div className="mt-2">
            <PriceBlock product={product} />
          </div>
          <div className="mt-auto pt-3">
            <CardActions product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={product.name}
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          priority={priority}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-background shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-primary px-2 py-1 text-[10px] font-black text-primary-foreground shadow-sm">
          {product.discountPercentage}% OFF
        </span>
        {outOfStock && (
          <span className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-bold text-white">
            Out of Stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </p>
        <Link
          href={href}
          className={cn(
            "mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary"
          )}
        >
          {product.name}
        </Link>
        <div className="mt-2">
          <Rating product={product} />
        </div>
        <div className="mt-2">
          <PriceBlock product={product} />
        </div>
        <div className="mt-auto pt-3">
          <CardActions product={product} />
        </div>
      </div>
    </article>
  );
}
