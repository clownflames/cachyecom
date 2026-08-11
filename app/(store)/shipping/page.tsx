import type { Metadata } from "next";
import { SHIPPING_INFO, SITE_NAME, STORE_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: `Shipping and delivery policy for ${SITE_NAME}.`,
};

export default function ShippingPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Shipping Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-bold">1. Processing Time</h2>
          <p className="mt-2">
            Orders are usually packed and dispatched within 1-2 working days
            after they are confirmed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">2. Delivery Time</h2>
          <p className="mt-2">
            Standard delivery takes 3-7 working days depending on your location.
            Delivery estimates may be longer for remote areas.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">3. Shipping Charges</h2>
          <p className="mt-2">{SHIPPING_INFO}</p>
        </section>

        <section>
          <h2 className="text-base font-bold">4. Tracking &amp; Support</h2>
          <p className="mt-2">
            Once your order is dispatched, you can contact us at{" "}
            <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-primary hover:underline">
              {STORE_EMAIL}
            </a>{" "}
            with your Order ID for delivery updates.
          </p>
        </section>
      </div>
    </article>
  );
}
