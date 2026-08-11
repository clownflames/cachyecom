import Link from "next/link";
import { ArrowRight, BadgePercent, PartyPopper, Sparkles, Zap } from "lucide-react";

import { Countdown } from "@/components/countdown";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORIES, products } from "@/lib/products";
import { SITE_TAGLINE } from "@/lib/config";
import { formatNumber } from "@/lib/utils";

import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#7f1d1d] text-white">
      {/* decorative elements */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-yellow-300/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur sm:text-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              {SITE_TAGLINE}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              BIG{" "}
              <span className="inline-block -skew-x-6 bg-yellow-300 px-3 text-[#7f1d1d] shadow-lg">
                DEAL
              </span>
            </h1>
            <p className="mt-4 text-lg font-bold uppercase tracking-widest sm:text-2xl">
              Up to <span className="text-yellow-300">99% OFF</span>
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:mx-0">
              Unbeatable prices on mobiles, laptops, electronics, appliances and
              more. Limited-time sale - grab the best deals before they are gone!
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-white px-7 text-sm font-bold text-[#7f1d1d] shadow-lg hover:bg-white/90 hover:text-[#7f1d1d]"
                )}
              >
                Shop Now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/products?sort=discount"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-lg border-white/40 bg-white/10 px-7 text-sm font-bold text-white hover:bg-white/20 hover:text-white"
                )}
              >
                <BadgePercent className="size-4" aria-hidden="true" />
                View Deals
              </Link>
            </div>

            {/* mini stats */}
            <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                { value: `${formatNumber(products.length)}+`, label: "Products" },
                { value: `${CATEGORIES.length}`, label: "Categories" },
                { value: "99%", label: "Max Discount" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <dt className="text-xl font-black text-yellow-300 sm:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="text-xs uppercase tracking-wider text-white/80">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right visual */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="flex items-center justify-center gap-2 text-center text-xs font-bold uppercase tracking-widest text-white/90">
                <Zap className="size-4 text-yellow-300" aria-hidden="true" />
                {SITE_TAGLINE}
              </p>
              <div className="mt-4">
                <Countdown className="w-full" />
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-white/80">
                <PartyPopper className="size-4 text-yellow-300" aria-hidden="true" />
                Don&apos;t miss out - offers end soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
