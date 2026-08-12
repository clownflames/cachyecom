import Link from "next/link";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";

import { CategorySection } from "@/components/category-section";
import { FaqSection } from "@/components/faq";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeader } from "@/components/section-header";
import { WhyShopSection } from "@/components/why-shop";

import {
  getBestSelling,
  getDealsOfTheDay,
  getMegaDeals,
} from "@/lib/products";

export default function HomePage() {
  const deals = getDealsOfTheDay(10);
  const bestSelling = getBestSelling(8);
  const megaDeals = getMegaDeals(4);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Hero />

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <CategorySection />
      </section>

      {/* Deals of the day */}
      <section
        aria-labelledby="deals-heading"
        className="mx-auto w-full max-w-7xl px-3 sm:px-6"
      >
        <SectionHeader
          title="Deals of the Day"
          subtitle="Biggest discounts - updated today"
          href="/products?sort=discount"
          className="mb-4"
        />
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
          <ProductGrid items={deals} className="xl:grid-cols-5" />
        </div>
      </section>

      {/* Mega banner */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff9f00] via-[#fb641b] to-[#d63b00] px-6 py-8 text-center text-white sm:px-12 sm:py-10">
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-yellow-300/25 blur-2xl"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            Mega Deals Inside
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/90 sm:text-base">
            Hand-picked bestsellers at jaw-dropping prices. Limited stock on
            most items - once they are gone, they are gone!
          </p>
          <Link
            href="/products?sort=discount"
            className="group mt-5 inline-flex items-center gap-1.5 rounded-sm bg-white px-7 py-2.5 text-sm font-bold text-[#fb641b] transition-opacity hover:opacity-90"
          >
            Explore Mega Deals
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Best sellers */}
      <section
        aria-labelledby="best-heading"
        className="mx-auto w-full max-w-7xl px-3 sm:px-6"
      >
        <SectionHeader
          title="Best Selling Products"
          subtitle="Most loved by shoppers right now"
          href="/products?sort=popularity"
          className="mb-4"
        />
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
          <ProductGrid items={bestSelling} />
        </div>
      </section>

      {/* Mega deals grid */}
      <section
        aria-labelledby="mega-heading"
        className="mx-auto w-full max-w-7xl px-3 sm:px-6"
      >
        <SectionHeader
          title="Mega Deals"
          subtitle="Big-ticket items at unmissable prices"
          href="/products"
          className="mb-4"
        />
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-5">
          <ProductGrid items={megaDeals} className="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </section>

      {/* Why shop */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <WhyShopSection />
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <FaqSection />
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-7xl px-3 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-white p-5 shadow-sm sm:flex-row sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f1f3f6] text-[#2874f0]">
              <Flame className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[#212121] sm:text-lg">
                Still browsing? Deals are moving fast!
              </h2>
              <p className="text-sm text-[#878787]">
                Start shopping and lock in today&apos;s prices.
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="group flex shrink-0 items-center gap-1.5 rounded-sm bg-[#fb641b] px-7 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <TrendingUp className="size-4" aria-hidden="true" />
            Shop the Sale
          </Link>
        </div>
      </section>
    </div>
  );
}