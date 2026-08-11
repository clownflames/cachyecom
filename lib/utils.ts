import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Format a number as Indian Rupees, e.g. 189990 -> ₹1,89,990 */
export function formatPrice(amount: number): string {
  return inrFormatter.format(amount);
}

/** Format a plain number with Indian digit grouping, e.g. 189990 -> 1,89,990 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}
