import type { Product } from "@/lib/products";
import { getProductsByIds } from "@/lib/products";

export type DealSection = {
  id: string;
  title: string;
  href: string;
  productIds: string[];
};

/**
 * Homepage deal sections. Products are referenced by id from the
 * shared catalog in `lib/products.ts` so every card stays linked to a
 * real product detail page.
 */
export const dealSections: DealSection[] = [
  {
    id: "top-deals",
    title: "Top Deals",
    href: "/products?sort=discount",
    productIds: [
      "mob-001",
      "aud-002",
      "wea-001",
      "aud-001",
      "acc-001",
      "aud-006",
      "mob-005",
      "tv-002",
    ],
  },
  {
    id: "trending-gadgets",
    title: "Trending Gadgets & Appliances",
    href: "/category/electronics",
    productIds: [
      "aud-002",
      "hom-002",
      "wea-005",
      "acc-001",
      "aud-006",
      "tv-004",
      "wea-004",
      "app-009",
    ],
  },
  {
    id: "popular-picks",
    title: "Popular Picks",
    href: "/products",
    productIds: [
      "lap-001",
      "mob-003",
      "fas-002",
      "app-002",
      "fas-001",
      "wea-001",
      "mob-006",
      "aud-012",
    ],
  },
  {
    id: "monsoon-essentials",
    title: "Monsoon Essentials",
    href: "/products",
    productIds: [
      "fas-005",
      "toy-003",
      "gam-005",
      "toy-002",
      "bea-001",
      "acc-007",
      "fas-003",
      "gro-001",
    ],
  },
  {
    id: "beauty-care",
    title: "Beauty & Personal Care",
    href: "/category/beauty",
    productIds: [
      "bea-001",
      "bea-002",
      "hom-002",
      "bea-003",
      "bea-004",
      "aud-007",
      "bea-002",
      "gro-002",
    ],
  },
];

/** Resolve a deal section into concrete products. */
export function getDealProducts(section: DealSection): Product[] {
  return getProductsByIds(section.productIds);
}

export type PromoGridProduct = {
  sectionTitle: string;
  bannerId: string;
  productIds: string[];
};

/**
 * Promotional grids: one large banner on the left, product cards
 * filling the right side. bannerId maps into `lib/banners.ts`.
 */
export const promoGrids: PromoGridProduct[] = [
  {
    sectionTitle: "Grab the Best Fashion Picks",
    bannerId: "promo-banner-fashion",
    productIds: ["fas-001", "fas-002", "fas-003", "fas-004"],
  },
  {
    sectionTitle: "Gadget Bonanza",
    bannerId: "promo-banner-gadgets",
    productIds: ["aud-004", "aud-013", "acc-001", "wea-002"],
  },
  {
    sectionTitle: "Furnish Your Home",
    bannerId: "promo-banner-home",
    productIds: ["fur-008", "hom-001", "app-003", "gro-003"],
  },
];