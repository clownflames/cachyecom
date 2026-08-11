import type { Metadata } from "next";
import { SITE_NAME, STORE_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-bold">1. Information We Collect</h2>
          <p className="mt-2">
            When you place an order on {SITE_NAME}, we collect the details you
            provide: your name, mobile number, email address and delivery
            address. We also collect basic technical data (such as your browser
            and device type) to keep the site working smoothly.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">2. How We Use Your Information</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>To process and deliver your orders.</li>
            <li>To send you order confirmations and updates by email.</li>
            <li>To respond to your support requests.</li>
            <li>To improve our website and shopping experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold">3. Payment Information</h2>
          <p className="mt-2">
            We do not store card details. For QR / UPI payments you pay directly
            through your UPI app. The transaction ID you share is used only to
            match and verify your payment.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">4. No Data Sold</h2>
          <p className="mt-2">
            We never sell, rent or trade your personal information to third
            parties for marketing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">5. Data Retention</h2>
          <p className="mt-2">
            Order-related details are kept in our email records to help with
            support, refunds and deliveries. You may request removal by
            contacting us at {STORE_EMAIL}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">6. Contact</h2>
          <p className="mt-2">
            For any privacy questions, reach out to us at{" "}
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
