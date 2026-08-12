"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  readWishlistStorage,
  writeWishlistStorage,
} from "@/lib/wishlist";

type WishlistContextValue = {
  hydrated: boolean;
  ids: string[];
  count: number;
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIds(readWishlistStorage());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) writeWishlistStorage(ids);
  }, [ids, hydrated]);

  const isWishlisted = useCallback(
    (productId: string) => ids.includes(productId),
    [ids]
  );

  const toggle = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const add = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      hydrated,
      ids,
      count: ids.length,
      isWishlisted,
      toggle,
      add,
      remove,
      clear,
    }),
    [hydrated, ids, isWishlisted, toggle, add, remove, clear]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}