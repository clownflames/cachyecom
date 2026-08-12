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
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="grid size-10 shrink-0 place-items-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={closeAll}
          className="flex shrink-0 flex-col items-start justify-center"
          aria-label={`${SITE_NAME} home`}
        >
          <Image
            src="/logo.jpg"
            alt={SITE_NAME}
            width={90}
            height={34}
            priority
            className="h-9 w-auto object-contain sm:h-10"
            unoptimized
          />
          <span className="hidden text-[10px] font-semibold text-muted-foreground sm:block">
            Explore Plus
          </span>
        </Link>

        {/* Desktop search */}
        <form
          onSubmit={submitSearch}
          role="search"
          className="ml-2 hidden flex-1 md:block md:max-w-xl"
        >
          <div className="relative">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for products, brands and more"
              aria-label="Search products"
              className="h-9 w-full rounded-sm border border-input bg-muted/40 px-3 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:bg-white focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-0 top-0 grid h-9 w-10 place-items-center text-[#2874f0]"
            >
              <Search className="size-5" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              if (!searchOpen) {
                window.setTimeout(() => searchRef.current?.focus(), 0);
              }
            }}
            aria-label="Search"
            className="grid size-10 place-items-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <Search className="size-5" />
          </button>

          {/* Desktop actions */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen((v) => !v)}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-sm px-2.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
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
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 z-50 mt-1 w-64 rounded-sm border border-border bg-popover p-2 shadow-lg">
                    {[
                      { label: "All Products", href: "/products" },
                      { label: "Deals of the Day", href: "/products?sort=discount" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeAll}
                        className="block rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Cart */}
          <Link
            href="/cart"
            onClick={closeAll}
            aria-label={`Cart, ${count} items`}
            className="flex items-center gap-1 rounded-sm px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <span className="relative">
              <ShoppingCart className="size-5" />
              {hydrated && count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid min-w-[18px] place-items-center rounded-full bg-[#ff6161] px-1 text-[10px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>
            <span className="hidden lg:inline">Cart</span>
          </Link>
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