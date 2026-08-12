import { imageSources } from "@/lib/images";

export type HeroBanner = {
  id: string;
  image: string;
  mobileImage: string;
  href: string;
  alt: string;
};

/**
 * Hero carousel banners. ~4:1 ecommerce banner ratio on desktop,
 * using the same artwork (cropped) on mobile.
 */
export const heroBanners: HeroBanner[] = [
  {
    id: "hero-4",
    image: imageSources.hero.fashion,
    mobileImage: imageSources.hero.fashion,
    href: "/category/fashion",
    alt: "Fashion Fest - up to 70% off on top styles",
  },
  {
    id: "hero-1",
    image: imageSources.hero.electronics,
    mobileImage: imageSources.hero.electronics,
    href: "/category/electronics",
    alt: "Electronics Wonderland - big savings on gadgets",
  },
  {
    id: "hero-2",
    image: imageSources.hero.mobile,
    mobileImage: imageSources.hero.mobile,
    href: "/category/mobiles",
    alt: "Mobiles & Tablets - lowest prices, best offers",
  },
  {
    id: "hero-3",
    image: imageSources.hero.grocery,
    mobileImage: imageSources.hero.grocery,
    href: "/category/grocery",
    alt: "Daily essentials - great deals on groceries",
  },
  {
    id: "hero-5",
    image: imageSources.hero.saleBlue,
    mobileImage: imageSources.hero.saleBlue,
    href: "/products?sort=discount",
    alt: "Blockbuster Sales - limited time deals",
  },
];

export type PromoStrip = {
  id: string;
  title: string;
  eyebrow: string;
  cta: string;
  href: string;
  gradient: string;
};

/**
 * Slim promotional proposition strip shown between the hero and the
 * first deal section (payments / delivery trust bars).
 */
export const promoStrip: PromoStrip[] = [
  {
    id: "promo-guarantee",
    title: "Genuine Products Guaranteed",
    eyebrow: "Quality seal",
    cta: "Shop Now",
    href: "/products",
    gradient: "from-[#2874f0] to-[#1c5fcc]",
  },
  {
    id: "promo-cod",
    title: "Cash on Delivery Available",
    eyebrow: "5000+ pincodes",
    cta: "Order Now",
    href: "/products",
    gradient: "from-[#fb641b] to-[#d84315]",
  },
  {
    id: "promo-returns",
    title: "7-Day Return & Exchange",
    eyebrow: "Easy refunds",
    cta: "Explore",
    href: "/refund-policy",
    gradient: "from-[#388e3c] to-[#1b5e20]",
  },
  {
    id: "promo-emi",
    title: "No Cost EMI Available",
    eyebrow: "On top brands",
    cta: "Check Offers",
    href: "/products?sort=discount",
    gradient: "from-[#7b1fa2] to-[#4a148c]",
  },
];

export type PromoBanner = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

/**
 * Large promotional banner used on the left side of promo grids.
 */
export const promoBanners: PromoBanner[] = [
  {
    id: "promo-banner-fashion",
    image: imageSources.promo.style,
    title: "Style Up Your Wardrobe",
    subtitle: "Min. 50% off on shoes, jeans & tees",
    cta: "Shop Fashion",
    href: "/category/fashion",
  },
  {
    id: "promo-banner-gadgets",
    image: imageSources.promo.gadgets,
    title: "Gadget Deals Under ₹999",
    subtitle: "Earbuds, watches, power banks & more",
    cta: "Shop Gadgets",
    href: "/products?sort=discount",
  },
  {
    id: "promo-banner-home",
    image: imageSources.promo.homeDecor,
    title: "Home Makeover Sale",
    subtitle: "Furniture, decor & appliances up to 60% off",
    cta: "Shop Home",
    href: "/category/home",
  },
];