import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { SALE_END_DATE } from "@/lib/config";

const faqs = [
  {
    q: "How long will the BIG SALE last?",
    a: `The sale runs until ${new Date(SALE_END_DATE).toLocaleDateString(
      "en-IN",
      { day: "numeric", month: "long", year: "numeric" }
    )} (or until the countdown on the homepage reaches zero). Prices and offers may change after the sale ends.`,
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept QR / UPI payments and Cash on Delivery. For QR payments you scan our UPI QR code, pay the exact amount, and submit your Transaction ID / UTR while placing the order.",
  },
  {
    q: "How does QR / UPI payment work?",
    a: "At checkout, choose 'Pay via QR Code'. Scan the QR with your UPI app, pay the exact order amount, then enter the Transaction ID / UTR in the checkout form. Your payment is marked 'Verification Pending' until we confirm it manually.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes. Select 'Cash on Delivery' at checkout and pay the order total in cash when your order arrives.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders are typically dispatched within 1-2 working days and delivered in 3-7 working days depending on your location.",
  },
  {
    q: "How do I know my order was placed?",
    a: "You will receive an order confirmation email with your Order ID and order summary right after placing the order. A copy is also sent to our store team.",
  },
  {
    q: "Can I cancel or get a refund?",
    a: "If you have an issue with your order, contact us as soon as possible. Please read our Refund Policy for full details before placing an order.",
  },
];

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading">
      <div className="mb-5 text-center sm:mb-7">
        <h2
          id="faq-heading"
          className="text-xl font-black tracking-tight sm:text-2xl lg:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you need to know before you shop.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-2.5">
        {faqs.map((faq, index) => (
          <details
            key={faq.q}
            className="group rounded-xl border border-border bg-card shadow-sm"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-semibold sm:px-5 [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Still have questions?{" "}
        <Link href="/contact" className="font-semibold text-primary hover:underline">
          Contact us
        </Link>
      </p>
    </section>
  );
}
