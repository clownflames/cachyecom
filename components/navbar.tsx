"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  Tags,
  X,
} from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { SITE_NAME } from "@/lib/config";
import { CATEGORIES } from "@/lib/products";

import { cn } from "@/lib/utils";

export function Navbar() {
  const { count, hydrated } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [query, setQuery] = useState("");

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-4 sm:px-6">
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
          className="flex shrink-0 items-center gap-2"
          aria-label={`${SITE_NAME} home`}
        >
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-black text-primary-foreground shadow-sm">
            BD
          </span>
          <span className="text-lg font-black leading-none tracking-tight sm:text-xl">
            BIG<span className="text-primary">DEAL</span>
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for products, brands and more"
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-input bg-muted/40 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/30"
            />
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="grid size-10 place-items-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          >
            <Search className="size-5" />
          </button>

          {/* Desktop nav links */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/products"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                isActive("/products") && "text-primary"
              )}
            >
              All Products
            </Link>

            <Link
              href="/products?sort=discount"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Deals
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen((v) => !v)}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Categories
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
                  <div className="absolute right-0 z-50 mt-2 grid w-[560px] grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-2 shadow-lg">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        onClick={closeAll}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted"
                      >
                        <Tags className="size-4 text-primary" />
                        {cat}
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
            className="relative grid size-10 place-items-center rounded-md text-foreground transition-colors hover:bg-muted"
          >
            <ShoppingCart className="size-5" />
            {hydrated && count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-t border-border px-3 py-3 md:hidden">
          <form onSubmit={submitSearch} role="search" className="relative">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for products..."
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-input bg-muted/40 pl-10 pr-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto max-w-7xl px-3 py-3">
            <Link
              href="/products"
              onClick={closeAll}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              All Products
            </Link>
            <Link
              href="/products?sort=discount"
              onClick={closeAll}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Deals
            </Link>
            <Link
              href="/cart"
              onClick={closeAll}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Cart
            </Link>
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </p>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={closeAll}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <Tags className="size-4 text-primary" />
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
