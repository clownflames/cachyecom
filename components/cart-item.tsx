"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { ProductImage } from "@/components/product-image";
import type { CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:gap-4 sm:p-4">
      <Link
        href={`/products/${line.slug}`}
        className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-24"
        aria-label={line.name}
      >
        <ProductImage src={line.image} alt={line.name} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {line.category}
            </p>
            <Link
              href={`/products/${line.slug}`}
              className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug hover:text-primary"
            >
              {line.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.productId)}
            aria-label={`Remove ${line.name} from cart`}
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex items-center rounded-lg border border-input">
            <button
              type="button"
              onClick={() => updateQuantity(line.productId, line.quantity - 1)}
              aria-label="Decrease quantity"
              className="grid size-8 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-bold tabular-nums">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.productId, line.quantity + 1)}
              aria-label="Increase quantity"
              className="grid size-8 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <div className="text-right">
            <p className="font-bold">{formatPrice(line.lineSubtotal)}</p>
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(line.originalPrice * line.quantity)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
