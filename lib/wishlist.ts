export type WishlistItem = {
  productId: string;
};

export const WISHLIST_STORAGE_KEY = "big-deal-wishlist-v1";

export function readWishlistStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((id) => id);
  } catch {
    return [];
  }
}

export function writeWishlistStorage(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage may be unavailable (private mode / quota). Wishlist still works in memory.
  }
}

export function clearWishlistStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch {
    // ignore
  }
}