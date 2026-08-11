"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/products";

import { cn } from "@/lib/utils";

export type SortOption =
  | "popularity"
  | "price-asc"
  | "price-desc"
  | "discount"
  | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Discount" },
  { value: "rating", label: "Rating" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.salePrice - b.salePrice);
    case "price-desc":
      return list.sort((a, b) => b.salePrice - a.salePrice);
    case "discount":
      return list.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "popularity":
    default:
      return list.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export function ProductsBrowser({
  products,
  initialQuery = "",
  initialCategory = "all",
  initialSort = "popularity",
}: {
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: string;
}) {
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchInput, setSearchInput] = useState(initialQuery);

  const category = CATEGORIES.includes(initialCategory as never)
    ? initialCategory
    : "all";
  const sort = sortOptions.some((o) => o.value === initialSort)
    ? (initialSort as SortOption)
    : "popularity";

  const buildUrl = (overrides: {
    q?: string;
    category?: string;
    sort?: string;
  }) => {
    const params = new URLSearchParams();
    const q = overrides.q ?? searchInput;
    const cat = overrides.category ?? category;
    const so = overrides.sort ?? sort;
    if (q) params.set("q", q);
    if (cat && cat !== "all") params.set("category", cat);
    if (so && so !== "popularity") params.set("sort", so);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  };

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    buildUrl({ q: searchInput.trim() });
  };

  const clearAll = () => {
    setSearchInput("");
    router.replace("/products", { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = initialQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCategory =
        category === "all" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        Object.values(p.specifications)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    });
    return sortProducts(list, sort);
  }, [products, initialQuery, category, sort]);

  const resultCount = filtered.length;
  const hasActiveFilters = initialQuery !== "" || category !== "all";

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <form onSubmit={submitSearch} role="search" className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              className="pl-9"
            />
          </form>

          {/* Category */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="hidden size-4 text-muted-foreground lg:block" />
            <label htmlFor="category-select" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => buildUrl({ category: e.target.value })}
              className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 lg:w-48"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => buildUrl({ sort: e.target.value })}
              className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 lg:w-48"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 self-end lg:self-auto">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={cn(
                "grid size-10 place-items-center rounded-md border transition-colors",
                view === "grid"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input hover:bg-muted"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={cn(
                "grid size-10 place-items-center rounded-md border transition-colors",
                view === "list"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input hover:bg-muted"
              )}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>

        {/* Active filters */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">
            {resultCount} {resultCount === 1 ? "product" : "products"}
          </span>
          {category !== "all" && (
            <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              {category}
              <button
                type="button"
                onClick={() => buildUrl({ category: "all" })}
                aria-label={`Remove ${category} filter`}
                className="grid place-items-center rounded-full hover:text-primary"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {initialQuery && (
            <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              &ldquo;{initialQuery}&rdquo;
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  buildUrl({ q: "" });
                }}
                aria-label="Remove search"
                className="grid place-items-center rounded-full hover:text-primary"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto rounded-full px-2.5 py-1 text-xs font-semibold text-primary hover:bg-accent"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {resultCount === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-lg font-semibold">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or clear your filters.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Clear Filters
          </button>
        </div>
      ) : view === "list" ? (
        <div className="flex flex-col gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} layout="list" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Can&apos;t find what you&apos;re looking for?{" "}
        <Link href="/contact" className="font-semibold text-primary hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
