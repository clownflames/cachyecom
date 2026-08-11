import type { Metadata } from "next";

import { CartClient } from "@/components/cart-client";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the products in your cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-8">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Your Cart
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review your items and proceed to checkout.
      </p>
      <CartClient />
    </div>
  );
}
