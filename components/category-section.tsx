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

export function CategorySection() {
  return (
    <section aria-labelledby="categories-heading" className="rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
        <h2
          id="categories-heading"
          className="text-base font-bold tracking-tight text-[#212121] sm:text-lg"
        >
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-1 p-3 sm:grid-cols-5 sm:p-4 lg:grid-cols-10">
        {CATEGORIES.map((category) => {
          const Icon = categoryIcons[category] ?? Cpu;
          const count = products.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          ).length;
          return (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group flex flex-col items-center gap-1.5 rounded-sm px-2 py-3 text-center transition-colors hover:bg-[#f5faff]"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[#f1f3f6] transition-colors group-hover:bg-[#2874f0]/10">
                <Icon
                  className="size-6 text-[#2874f0]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <span className="text-xs font-semibold leading-tight text-[#212121] group-hover:text-[#2874f0]">
                {category}
              </span>
              <span className="hidden text-[10px] text-[#878787] sm:block">
                {count} products
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}