'use client'
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
import { useRef, useState, useEffect } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-1 overflow-x-auto scroll-smooth p-3 sm:p-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {CATEGORIES.map((category) => {
            const Icon = categoryIcons[category] ?? Cpu;
            const count = products.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase()
            ).length;
            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group flex-shrink-0 flex flex-col items-center gap-1.5 rounded-sm px-2 py-3 text-center transition-colors hover:bg-[#f5faff]"
                style={{ minWidth: "80px" }}
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

        {/* Left Arrow - Mobile only */}
        {isMobile && showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full shadow-lg p-2 hover:bg-white transition-colors border border-gray-200"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#212121]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow - Mobile only */}
        {isMobile && showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full shadow-lg p-2 hover:bg-white transition-colors border border-gray-200"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#212121]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Gradient overlays for mobile */}
        {isMobile && (
          <>
            {showLeftArrow && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            )}
            {showRightArrow && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            )}
          </>
        )}
      </div>

      {/* Add this to your global CSS or component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}