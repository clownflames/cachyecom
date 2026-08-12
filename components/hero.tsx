"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const bannerImages = [
  "https://new.dhamaka-offer.com/ES7Zt5S/OFFER/newsale/xxx/banner/lapalop1.webp",
  "https://new.dhamaka-offer.com/ES7Zt5S/OFFER/newsale/xxx/banner/lapalop2.webp",
  "https://new.dhamaka-offer.com/ES7Zt5S/OFFER/newsale/xxx/banner/lapalop3.webp",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  const goToSlide = (i: number) => {
    setIndex(i);
  };

  const nextSlide = () => {
    setIndex((i) => (i + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setIndex((i) => (i - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <section className="border-b border-border bg-background overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 relative">
        {/* Carousel Container */}
        <div className="relative h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
          {bannerImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Banner ${i + 1}`}
              className={cn(
                "absolute left-0 top-0 w-full h-full transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0"
              )}
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows - Middle Left & Right */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 p-2 text-white hover:text-primary transition-colors focus:outline-none z-10"
          aria-label="Previous banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 p-2 text-white hover:text-primary transition-colors focus:outline-none z-10"
          aria-label="Next banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all focus:outline-none",
                i === index
                  ? "bg-white w-4 sm:w-6"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}