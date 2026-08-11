"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

export function ProductActions({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const { addItem, buyNow } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = stock <= 0;

  const changeQty = (delta: number) => {
    setQty((prev) => Math.min(Math.max(prev + delta, 1), stock));
  };

  const handleAdd = () => {
    if (outOfStock) return;
    addItem(productId, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    buyNow(productId, qty);
    router.push("/checkout");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Quantity</span>
        <div className="flex items-center rounded-lg border border-input">
          <button
            type="button"
            onClick={() => changeQty(-1)}
            disabled={qty <= 1 || outOfStock}
            aria-label="Decrease quantity"
            className="grid size-10 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span
            className="w-12 text-center text-sm font-bold tabular-nums"
            aria-live="polite"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => changeQty(1)}
            disabled={qty >= stock || outOfStock}
            aria-label="Increase quantity"
            className="grid size-10 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
        {!outOfStock && stock <= 5 && (
          <span className="text-xs font-medium text-destructive">
            Only {stock} left!
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 rounded-lg py-3 text-sm"
          aria-label={`Add ${qty} to cart`}
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" /> Add to Cart
            </>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="flex-1 rounded-lg py-3 text-sm"
          aria-label="Buy now"
        >
          <ShoppingBag className="size-4" /> Buy Now
        </Button>
      </div>

      {outOfStock && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
          This product is currently out of stock.
        </p>
      )}
    </div>
  );
}
