import { products } from "@/lib/products";

import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export function ProductGrid({
  items,
  layout = "grid",
  className,
}: {
  items: typeof products;
  layout?: "grid" | "list";
  className?: string;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
        No products found.
      </p>
    );
  }

  if (layout === "list") {
    return (
      <div className="flex flex-col gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4",
        className
      )}
    >
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
