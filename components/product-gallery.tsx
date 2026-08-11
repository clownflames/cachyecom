"use client";

import { useState } from "react";

import { ProductImage } from "@/components/product-image";

import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
        <ProductImage src={src} alt={`${name} - image ${active + 1}`} priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${name}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border bg-muted transition-colors sm:w-20",
                active === i
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <ProductImage src={img} alt={`${name} thumbnail ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
