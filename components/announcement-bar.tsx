import Link from "next/link";

import { SITE_TAGLINE } from "@/lib/config";
import { BadgePercent } from "lucide-react";

const messages = [
  `${SITE_TAGLINE} - Up to 99% OFF`,
  "Free & fast delivery on all orders",
  "QR / UPI & Cash on Delivery available",
];

export function AnnouncementBar() {
  return (
    <div className="relative z-50 flex items-center gap-3 overflow-hidden bg-[#172337] px-4 py-2 text-white">
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <BadgePercent className="size-4 text-[#ffe500]" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {SITE_TAGLINE}
        </span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max shrink-0 items-center gap-12 whitespace-nowrap">
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center gap-12" aria-hidden={row === 1}>
              {messages.map((msg) => (
                <span
                  key={msg}
                  className="flex items-center gap-2 text-xs font-medium"
                >
                  <span className="size-1.5 rounded-full bg-[#ffe500]" />
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Link
        href="/products"
        className="hidden shrink-0 rounded-sm bg-[#ffe500] px-3 py-1 text-xs font-bold text-[#172337] transition-opacity hover:opacity-90 sm:block"
      >
        Shop Now
      </Link>
    </div>
  );
}