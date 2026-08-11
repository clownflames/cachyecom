import Link from "next/link";
import {
  Banknote,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  QrCode,
} from "lucide-react";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  STORE_ADDRESS,
  STORE_EMAIL,
  STORE_PHONE,
} from "@/lib/config";

const shopLinks = [
  { label: "Mobiles", href: "/products?category=Mobiles" },
  { label: "Laptops", href: "/products?category=Laptops" },
  { label: "Electronics", href: "/products?category=Electronics" },
  { label: "TVs", href: "/products?category=TVs" },
  { label: "Appliances", href: "/products?category=Appliances" },
  { label: "Audio", href: "/products?category=Audio" },
  { label: "All Deals", href: "/products?sort=discount" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
              BD
            </span>
            <span className="text-lg font-black tracking-tight">
              BIG<span className="text-primary">DEAL</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE_DESCRIPTION} Catch the biggest sale of the season with
            unbeatable prices on the latest gadgets and essentials.
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            {STORE_PHONE && (
              <p className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <span>{STORE_PHONE}</span>
              </p>
            )}
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span>{STORE_EMAIL}</span>
            </p>
            {STORE_ADDRESS && (
              <p className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                <span>{STORE_ADDRESS}</span>
              </p>
            )}
          </div>
        </div>

        {/* Shop */}
        <nav aria-label="Shop links">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Shop
          </h2>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support */}
        <nav aria-label="Customer support links">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Customer Support
          </h2>
          <ul className="mt-4 space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Payments */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Payment Options
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <QrCode className="size-4 text-primary" aria-hidden="true" />
              QR / UPI Payment
            </li>
            <li className="flex items-center gap-2">
              <Banknote className="size-4 text-primary" aria-hidden="true" />
              Cash on Delivery
            </li>
            <li className="flex items-center gap-2">
              <CreditCard className="size-4 text-primary" aria-hidden="true" />
              Secure online checkout
            </li>
          </ul>
          <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            Safe &amp; secure shopping. Your details are never shared.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <span aria-hidden="true">♥</span> for big savings
          </p>
        </div>
      </div>
    </footer>
  );
}
