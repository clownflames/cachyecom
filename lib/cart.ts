export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartLine = {
  productId: string;
  quantity: number;
  name: string;
  slug: string;
  image: string;
  category: string;
  salePrice: number;
  originalPrice: number;
  offerPrice?: number;
  lineSubtotal: number;
  lineDiscount: number;
};

export const CART_STORAGE_KEY = "big-deal-cart-v1";

export function readCartStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          !!item &&
          typeof (item as CartItem).productId === "string" &&
          typeof (item as CartItem).quantity === "number" &&
          Number.isFinite((item as CartItem).quantity) &&
          (item as CartItem).quantity > 0
      )
      .map((item) => ({ productId: item.productId, quantity: item.quantity }));
  } catch {
    return [];
  }
}

export function writeCartStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private mode / quota). Cart still works in memory.
  }
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    // ignore
  }
}
