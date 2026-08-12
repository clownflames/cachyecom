"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Cable,
  Camera,
  ChevronDown,
  Cpu,
  Headphones,
  Laptop,
  Menu,
  Search,
  ShoppingCart,
  Smartphone,
  Tv,
  UtensilsCrossed,
  WashingMachine,
  Watch,
  X,
  type LucideIcon,
} from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { SITE_NAME } from "@/lib/config";
import { CATEGORIES } from "@/lib/products";

import { cn } from "@/lib/utils";

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

export function Navbar() {
  const { count, hydrated } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMobileOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(false);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      {/* Main bar */}
      {/* Main bar */}
<div className="border-b border-[#e0e0e0] bg-white">
  <div className="mx-auto max-w-[1200px] px-4">

    {/* Flipkart / Travel tabs */}
    <div className="flex items-center gap-4 pt-4">
      <Link
        href="/"
        className="flex h-11 w-[130px] items-center justify-center gap-2 rounded-xl bg-[#ffe500] text-sm font-bold text-black"
      >
        <Image
          src="/logo.jpg"
          alt="Flipkart"
          width={70}
          height={30}
          className="h-7 w-auto object-contain"
          unoptimized
        /> 
        Flipkart
      </Link>

      <button
        type="button"
        className="flex h-11 w-[130px] items-center justify-center gap-2 rounded-xl bg-[#f1f1f1] text-sm font-semibold text-[#333]"
      >
        <span className="text-xl">✈️</span>
        Travel
      </button>
    </div>

    {/* Search + actions */}
    <div className="flex items-center gap-5 py-5">

      {/* Search */}
      <form
        onSubmit={submitSearch}
        role="search"
        className="flex-1"
      >
        <div className="relative">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search for Products, Brands and More"
            aria-label="Search products"
            className="h-11 w-full rounded-xl border-2 border-[#2874f0] bg-white px-4 pr-12 text-sm outline-none placeholder:text-[#777] focus:ring-2 focus:ring-[#2874f0]/20"
          />

          <button
            type="submit"
            aria-label="Submit search"
            className="absolute right-0 top-0 grid h-11 w-12 place-items-center text-[#2874f0]"
          >
            <Search className="size-5" />
          </button>
        </div>
      </form>

      {/* Right actions — NO LOGIN */}
      <nav
        className="flex shrink-0 items-center gap-3"
        aria-label="Main navigation"
      >
        {/* More */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoriesOpen((v) => !v)}
            aria-expanded={categoriesOpen}
            aria-haspopup="true"
            className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-[#212121]"
          >
            More
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                categoriesOpen && "rotate-180"
              )}
            />
          </button>

          {categoriesOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setCategoriesOpen(false)}
              />

              <div className="absolute right-0 z-50 mt-2 w-64 rounded-md border bg-white p-2 shadow-lg">
                <Link
                  href="/products"
                  onClick={closeAll}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  All Products
                </Link>

                <Link
                  href="/products?sort=discount"
                  onClick={closeAll}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Deals of the Day
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          onClick={closeAll}
          aria-label={`Cart, ${count} items`}
          className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-[#212121]"
        >
          <span className="relative">
            <ShoppingCart className="size-5" />

            {hydrated && count > 0 && (
              <span className="absolute -right-2 -top-2 grid min-w-[18px] place-items-center rounded-full bg-[#ff6161] px-1 text-[10px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </span>

          <span>Cart</span>
        </Link>
      </nav>
    </div>
  </div>
</div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-t border-border px-3 pb-3 pt-2 md:hidden">
          <form onSubmit={submitSearch} role="search" className="relative">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for products..."
              aria-label="Search products"
              className="h-9 w-full rounded-sm border border-input bg-muted/40 px-3 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:bg-white"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-0 top-0 grid h-9 w-10 place-items-center text-[#2874f0]"
            >
              <Search className="size-5" />
            </button>
          </form>
        </div>
      )}

      {/* Category strip (icons on top) */}
      <nav
        aria-label="Categories"
        className="border-t border-border bg-white"
      >
        <div className="mx-auto flex max-w-7xl items-stretch gap-1 overflow-x-auto px-2 hide-scrollbar sm:px-6">
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat] ?? Cpu;
            const isActive = pathname.startsWith("/products") && activeCategory === cat;
            return (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                onClick={closeAll}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative flex shrink-0 flex-col items-center justify-center gap-1 border-b-2 px-3 py-2 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-b-[#2874f0] text-[#2874f0]"
                    : "border-b-transparent text-[#212121] hover:text-[#2874f0]"
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors group-hover:text-[#2874f0]",
                    isActive ? "text-[#2874f0]" : "text-[#878787]"
                  )}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span>{cat}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-white text-foreground md:hidden"
        >
          <div className="mx-auto max-w-7xl px-3 py-3">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#2874f0]">
              Shop by Category
            </p>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat] ?? Cpu;
                return (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={closeAll}
                    className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon className="size-4 shrink-0 text-[#2874f0]" strokeWidth={1.8} />
                    {cat}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 border-t border-border pt-2">
              <Link
                href="/cart"
                onClick={closeAll}
                className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <ShoppingCart className="size-4 text-[#2874f0]" />
                My Cart
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}