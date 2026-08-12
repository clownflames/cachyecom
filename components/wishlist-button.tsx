"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { useWishlist } from "@/components/wishlist-provider";

import { cn } from "@/lib/utils";

/**
 * Round heart toggle used on product cards. Only visible on hover on
 * desktop, always visible on touch devices.
 */
export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { isWishlisted, toggle } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const active = mounted && isWishlisted(productId);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "absolute right-1.5 top-1.5 z-10 grid size-8 place-items-center rounded-full border border-[#e0e0e0] bg-white text-[#c2c2c2] shadow-sm transition-all hover:scale-110 hover:text-[#ff6161]",
        active && "border-[#ff6161]/30 text-[#ff6161]",
        className
      )}
    >
      <Heart
        className={cn("size-4", active && "fill-[#ff6161] text-[#ff6161]")}
        aria-hidden="true"
      />
    </button>
  );
}