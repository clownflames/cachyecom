import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

import {
  STORE_ADDRESS,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_WHATSAPP,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the BIG DEAL support team.",
};

export default function ContactPage() {
  const whatsappLink = STORE_WHATSAPP
    ? `https://wa.me/${STORE_WHATSAPP.replace(/[^0-9]/g, "")}`
    : "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
        Contact Us
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Have a question about an order, product or the sale? We&apos;re here to help.
      </p>

      <div className="mt-8 space-y-4">
        <a
          href={`mailto:${STORE_EMAIL}`}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold">Email Us</span>
            <span className="mt-0.5 block text-sm text-muted-foreground">
              {STORE_EMAIL}
            </span>
          </span>
        </a>

        {STORE_PHONE && (
          <a
            href={`tel:${STORE_PHONE.replace(/[^0-9+]/g, "")}`}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">Call Us</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {STORE_PHONE}
              </span>
            </span>
          </a>
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">WhatsApp</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                Chat with us on WhatsApp
              </span>
            </span>
          </a>
        )}

        {STORE_ADDRESS && (
          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">Visit Us</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {STORE_ADDRESS}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">Tip</p>
        <p className="mt-1">
          When emailing about an order, please include your{" "}
          <span className="font-medium text-foreground">Order ID</span> (starts
          with BD-) so we can help you faster. Support queries are usually
          answered within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
