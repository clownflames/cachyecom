import Link from "next/link";
import Image from "next/image";
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
    <footer className="mt-auto bg-[#172337] text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-gray-300 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Image
            src="/logo.jpg"
            alt={SITE_NAME}
            width={90}
            height={34}
            className="h-9 w-auto object-contain inverted "
            
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            {SITE_DESCRIPTION} Catch the biggest sale of the season with
            unbeatable prices on the latest gadgets and essentials.
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-400">
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
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
            Shop
          </h2>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support */}
        <nav aria-label="Customer support links">
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
            Customer Support
          </h2>
          <ul className="mt-4 space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Payments */}
        <div>
          <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
            Payment Options
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <QrCode className="size-4 text-white" aria-hidden="true" />
              QR / UPI Payment
            </li>
            <li className="flex items-center gap-2">
              <Banknote className="size-4 text-white" aria-hidden="true" />
              Cash on Delivery
            </li>
            <li className="flex items-center gap-2">
              <CreditCard className="size-4 text-white" aria-hidden="true" />
              Secure online checkout
            </li>
          </ul>
          <p className="mt-4 rounded-sm bg-white/10 px-3 py-2 text-xs text-gray-400">
            Safe &amp; secure shopping. Your details are never shared.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-400 sm:flex-row sm:px-6">
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