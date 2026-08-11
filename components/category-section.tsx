import Link from "next/link";
import {
  Cable,
  Camera,
  Cpu,
  Headphones,
  Laptop,
  Smartphone,
  Tv,
  UtensilsCrossed,
  WashingMachine,
  Watch,
  type LucideIcon,
} from "lucide-react";

import { CATEGORIES, products } from "@/lib/products";

const categoryIcons: Record<string, LucideIcon> = {
  Mobiles: Smartphone,
  Laptops: Laptop,
  Electronics: Cpu,
  TVs: Tv,
  Appliances: WashingMachine,
  Audio: Headphones,
  Wearables: Watch,
  Cameras: Camera,
  "Home & Kitchen": UtensilsCrossed,
  Accessories: Cable,
};

const accentClasses = [
  "bg-red-100 text-red-600",
  "bg-orange-100 text-orange-600",
  "bg-amber-100 text-amber-600",
  "bg-emerald-100 text-emerald-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
  "bg-rose-100 text-rose-600",
  "bg-teal-100 text-teal-600",
  "bg-indigo-100 text-indigo-600",
  "bg-fuchsia-100 text-fuchsia-600",
];

export function CategorySection() {
  return (
    <section aria-labelledby="categories-heading">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="categories-heading"
          className="text-xl font-black tracking-tight sm:text-2xl lg:text-3xl"
        >
          Shop by Category
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-4 lg:grid-cols-10">
        {CATEGORIES.map((category, index) => {
          const Icon = categoryIcons[category] ?? Cpu;
          const count = products.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          ).length;
          return (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-4"
            >
              <span
                className={`grid size-10 place-items-center rounded-full ${accentClasses[index % accentClasses.length]}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-tight sm:text-sm">
                {category}
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                {count} products
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
