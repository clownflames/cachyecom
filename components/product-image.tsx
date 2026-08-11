import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Shared image wrapper for product photos (local SVG placeholders). */
export function ProductImage({
  src,
  alt,
  className,
  priority,
}: ProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      className={cn("object-cover", className)}
      unoptimized
      priority={priority}
    />
  );
}
