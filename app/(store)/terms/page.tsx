import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, STORE_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-bold">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By browsing or ordering from {SITE_NAME}, you agree to these terms
            and our{" "}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">2. Products &amp; Pricing</h2>
          <p className="mt-2">
            Product images and descriptions are indicative. Prices, offers and
            stock may change during the sale without prior notice. The final
            price charged is the price confirmed at the time your order is
            placed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">3. Orders</h2>
          <p className="mt-2">
            An order is confirmed only after we send an order confirmation email
            with a unique Order ID. For QR / UPI payments, the order is placed
            with a &quot;Verification Pending&quot; status until the payment is
            manually verified.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">4. Payment</h2>
          <p className="mt-2">
            We accept QR / UPI payments and Cash on Delivery. Do not share your
            UPI PIN or card details with anyone. We will never ask for your UPI
            PIN, OTP or bank credentials.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">5. Delivery</h2>
          <p className="mt-2">
            Delivery timelines are estimates and may vary by location. Please
            provide a correct address and keep your phone reachable for delivery
            coordination.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">6. Returns &amp; Refunds</h2>
          <p className="mt-2">
            Returns and refunds are handled as described in our{" "}
            <Link href="/refund-policy" className="font-medium text-primary hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">7. Limitation of Liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, {SITE_NAME} is not liable
            for indirect or consequential losses arising from your use of this
            website.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">8. Contact</h2>
          <p className="mt-2">
            Questions about these terms? Email us at{" "}
            <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-primary hover:underline">
              {STORE_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
