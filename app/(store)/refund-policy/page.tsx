import type { Metadata } from "next";
import { SITE_NAME, STORE_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund and return policy for ${SITE_NAME}.`,
};

export default function RefundPolicyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Refund Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-bold">1. Order Verification &amp; Refunds (QR / UPI)</h2>
          <p className="mt-2">
            For QR / UPI orders, if the payment cannot be verified or the order
            cannot be fulfilled, a full refund is issued to the same UPI account
            within 5-7 working days.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">2. Cash on Delivery</h2>
          <p className="mt-2">
            For COD orders, payment is collected only when the product is
            delivered. If an order is cancelled before dispatch, no amount is
            collected from you.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">3. Damaged / Incorrect Items</h2>
          <p className="mt-2">
            If you receive a damaged, defective or incorrect item, contact us
            within 48 hours of delivery with your Order ID and a photo of the
            product. We will arrange a replacement or refund as applicable.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">4. Cancellations</h2>
          <p className="mt-2">
            If you wish to cancel an order, contact us as soon as possible.
            Orders already shipped may not be cancellable; you can refuse the
            delivery instead.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">5. How to Request a Refund</h2>
          <p className="mt-2">
            Email your Order ID and the reason for the refund to{" "}
            <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-primary hover:underline">
              {STORE_EMAIL}
            </a>
            . We will respond within 24-48 hours.
          </p>
        </section>
      </div>
    </article>
  );
}
