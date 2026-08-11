"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { CartItem } from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartClient() {
  const { hydrated, lines, subtotal, discount, count, clearCart } = useCart();
  const router = useRouter();

  if (!hydrated) {
    return (
      <div className="mt-8 space-y-3" aria-busy="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-border bg-muted/50"
          />
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-muted">
          <ShoppingCart className="size-8 text-muted-foreground" />
        </span>
        <h2 className="mt-4 text-lg font-bold">Your cart is empty</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Looks like you have not added anything yet. Grab some amazing deals
          before the sale ends!
        </p>
        <Button
          type="button"
          onClick={() => router.push("/products")}
          className="mt-6 rounded-lg px-8"
          size="lg"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Items */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">
            {count} {count === 1 ? "item" : "items"}
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" />
            Clear Cart
          </button>
        </div>
        <ul className="space-y-3">
          {lines.map((line) => (
            <CartItem key={line.productId} line={line} />
          ))}
        </ul>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
        >
          Continue shopping
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Summary */}
      <aside
        aria-label="Order summary"
        className="h-fit rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:sticky lg:top-24"
      >
        <h2 className="text-base font-black">Price Details</h2>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="font-medium text-emerald-600">
              - {formatPrice(discount)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-medium">Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-bold">Total</span>
          <span className="text-xl font-black">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          You save {formatPrice(discount)} on this order!
        </p>
        <Button
          type="button"
          onClick={() => router.push("/checkout")}
          className="mt-4 w-full rounded-lg py-3"
          size="lg"
        >
          Proceed to Checkout
          <ArrowRight className="size-4" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          QR / UPI &amp; Cash on Delivery available
        </p>
      </aside>
    </div>
  );
}
