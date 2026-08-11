import type { Metadata } from "next";

import { CheckoutClient } from "@/components/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Secure checkout with QR / UPI payment or Cash on Delivery.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your details and choose a payment method to place your order.
      </p>
      <CheckoutClient />
    </div>
  );
}
