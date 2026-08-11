import Link from "next/link";
import { ArrowRight, Flame, Gift, TrendingUp } from "lucide-react";

import { CategorySection } from "@/components/category-section";
import { Countdown } from "@/components/countdown";
import { FaqSection } from "@/components/faq";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeader } from "@/components/section-header";
import { WhyShopSection } from "@/components/why-shop";
import { buttonVariants } from "@/components/ui/button";
import {
  getBestSelling,
  getDealsOfTheDay,
  getMegaDeals,
} from "@/lib/products";

import { cn } from "@/lib/utils";

export default function HomePage() {
  const deals = getDealsOfTheDay(10);
  const bestSelling = getBestSelling(8);
  const megaDeals = getMegaDeals(4);

  return (
    <div className="flex flex-col gap-14 pb-16 sm:gap-20">
      <Hero />

      {/* Countdown strip */}
      <section aria-label="Sale countdown" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl bg-foreground p-5 text-background sm:p-8">
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Hurry, Sale Ends Soon!
              </h2>
              <p className="mt-1 text-sm text-background/70">
                The clock is ticking - do not miss the biggest discounts of the season.
              </p>
            </div>
            <Countdown className="w-full max-w-xl" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <CategorySection />
      </section>

      {/* Deals of the day */}
      <section
        aria-labelledby="deals-heading"
        className="bg-gradient-to-b from-primary/5 to-transparent py-12 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="Deals of the Day"
            subtitle="Biggest discounts - updated today"
            href="/products?sort=discount"
            className="mb-5"
          />
          <ProductGrid items={deals} className="xl:grid-cols-5" />
        </div>
      </section>

      {/* Mega banner */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#dc2626] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-yellow-300/20 blur-2xl" aria-hidden="true" />
          <Gift className="mx-auto size-10 text-yellow-300" aria-hidden="true" />
          <h2 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-4xl">
            Mega Deals Inside
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/85 sm:text-base">
            Hand-picked bestsellers at jaw-dropping prices. Limited stock on most
            items - once they are gone, they are gone!
          </p>
          <Link
            href="/products?sort=discount"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 rounded-lg bg-white px-8 text-sm font-bold text-[#7f1d1d] hover:bg-white/90 hover:text-[#7f1d1d]"
            )}
          >
            Explore Mega Deals
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Best sellers */}
      <section aria-labelledby="best-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          title="Best Selling Products"
          subtitle="Most loved by shoppers right now"
          href="/products?sort=popularity"
          className="mb-5"
        />
        <ProductGrid items={bestSelling} />
      </section>

      {/* Mega deals grid */}
      <section aria-labelledby="mega-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          title="Mega Deals"
          subtitle="Big-ticket items at unmissable prices"
          href="/products"
          className="mb-5"
        />
        <ProductGrid items={megaDeals} className="sm:grid-cols-2 lg:grid-cols-4" />
      </section>

      {/* Why shop */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <WhyShopSection />
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <FaqSection />
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Flame className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-black sm:text-xl">
                Still browsing? Deals are moving fast!
              </h2>
              <p className="text-sm text-muted-foreground">
                Start shopping and lock in today&apos;s prices.
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "rounded-lg px-8")}
          >
            <TrendingUp className="size-4" aria-hidden="true" />
            Shop the Sale
          </Link>
        </div>
      </section>
    </div>
  );
}
