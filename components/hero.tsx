import Link from "next/link";
import {
  BadgePercent,
  ChevronRight,
  Gift,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Countdown } from "@/components/countdown";
import { SITE_TAGLINE } from "@/lib/config";
import { formatNumber } from "@/lib/utils";

import { cn } from "@/lib/utils";

const promos = [
  {
    title: "BIG SALE LIVE NOW",
    subtitle: "Up to 99% OFF on top brands",
    href: "/products?sort=discount",
    cta: "Grab the Deals",
    gradient: "from-[#2874f0] to-[#1c5cc0]",
  },
  {
    title: "Mobiles Galore",
    subtitle: "iPhone, Samsung, OnePlus & more",
    href: "/products?category=Mobiles",
    cta: "Shop Mobiles",
    gradient: "from-[#172337] to-[#2874f0]",
  },
  {
    title: "Electronics & Appliances",
    subtitle: "TVs, audio, cameras and wearables",
    href: "/products?category=Electronics",
    cta: "Shop Electronics",
    gradient: "from-[#388e3c] to-[#1d6b22]",
  },
];

const perks = [
  {
    icon: Truck,
    label: "Free & Fast Delivery",
    sub: "On all orders",
  },
  {
    icon: ShieldCheck,
    label: "100% Secure",
    sub: "QR / UPI & COD",
  },
  {
    icon: BadgePercent,
    label: "Big Savings",
    sub: "Up to 99% OFF",
  },
  {
    icon: Gift,
    label: "New Deals Daily",
    sub: "Refreshed daily",
  },
];

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
        {/* Banner card */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div
            className={cn(
              "relative bg-gradient-to-r px-5 py-8 text-white sm:px-10 sm:py-10",
              promos[0].gradient
            )}
          >
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-yellow-400 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#172337]">
              <BadgePercent className="size-3.5" aria-hidden="true" />
              {SITE_TAGLINE}
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              {promos[0].title}
            </h1>
            <p className="mt-2 max-w-lg text-sm font-medium text-white/90 sm:text-base">
              Unbeatable prices on mobiles, laptops, electronics, appliances and
              more. Limited-time sale - grab the best deals before they are gone!
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={promos[0].href}
                className="inline-flex items-center gap-1 rounded-sm bg-white px-5 py-2.5 text-sm font-bold text-[#2874f0] transition-opacity hover:opacity-90"
              >
                {promos[0].cta}
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/products?sort=discount"
                className="inline-flex items-center gap-1 rounded-sm border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              >
                View All Deals
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { value: `${formatNumber(10)}+`, label: "Categories" },
                { value: "99%", label: "Max Discount" },
                { value: "COD", label: "Available" },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <dt className="text-xl font-black text-yellow-300 sm:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="text-[11px] uppercase tracking-wider text-white/80">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Mini promo cards */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {promos.slice(1).map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={cn(
                  "relative bg-gradient-to-r px-5 py-6 text-white transition-transform duration-300 group-hover:scale-[1.01]",
                  promo.gradient
                )}
              >
                <h2 className="text-xl font-black tracking-tight">
                  {promo.title}
                </h2>
                <p className="mt-1 text-sm text-white/85">{promo.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-2">
                  {promo.cta}
                  <ChevronRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}

          {/* Countdown card */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative bg-gradient-to-r from-[#ff9f00] to-[#fb641b] px-5 py-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-white/85">
                Hurry, Sale Ends Soon!
              </p>
              <Countdown className="mt-3 bg-transparent" />
            </div>
          </div>
        </div>

        {/* Perks strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-white px-4 py-5 shadow-sm sm:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1f3f6] text-[#2874f0]">
                <perk.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#212121]">{perk.label}</p>
                <p className="text-xs text-[#878787]">{perk.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}