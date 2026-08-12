import { imageSources } from "@/lib/images";

export type NavCategory = {
  id: string;
  name: string;
  image: string;
  href: string;
};

/**
 * Horizontal category navigation shown below the main header,
 * modelled after the Flipkart homepage category strip.
 */
export const categories: NavCategory[] = [
  {
    id: "foryou",
    name: "For You",
    image: imageSources.categories.foryou,
    href: "/products",
  },
  {
    id: "fashion",
    name: "Fashion",
    image: imageSources.categories.fashion,
    href: "/category/fashion",
  },
  {
    id: "mobiles",
    name: "Mobiles",
    image: imageSources.categories.mobiles,
    href: "/category/mobiles",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: imageSources.categories.electronics,
    href: "/category/electronics",
  },
  {
    id: "beauty",
    name: "Beauty",
    image: imageSources.categories.beauty,
    href: "/category/beauty",
  },
  {
    id: "home",
    name: "Home",
    image: imageSources.categories.home,
    href: "/category/home",
  },
  {
    id: "appliances",
    name: "Appliances",
    image: imageSources.categories.appliances,
    href: "/category/appliances",
  },
  {
    id: "toys",
    name: "Toys, Baby & Kids",
    image: imageSources.categories.toys,
    href: "/category/toys",
  },
  {
    id: "food-health",
    name: "Food & Health",
    image: imageSources.categories.foodHealth,
    href: "/category/food-health",
  },
  {
    id: "auto",
    name: "Auto Accessories",
    image: imageSources.categories.auto,
    href: "/category/auto",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    image: imageSources.categories.sports,
    href: "/category/sports",
  },
  {
    id: "furniture",
    name: "Furniture",
    image: imageSources.categories.furniture,
    href: "/category/furniture",
  },
  {
    id: "books",
    name: "Books & Media",
    image: imageSources.categories.books,
    href: "/category/books",
  },
  {
    id: "two-wheelers",
    name: "2 Wheelers",
    image: imageSources.categories.twoWheelers,
    href: "/category/two-wheelers",
  },
];

export function getCategoryBySlug(slug: string): NavCategory | undefined {
  return categories.find((c) => c.id === slug);
}