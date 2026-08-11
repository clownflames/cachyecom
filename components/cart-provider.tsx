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
  clearCartStorage,
  readCartStorage,
  writeCartStorage,
  type CartItem,
  type CartLine,
} from "@/lib/cart";
import { getProductById, getProductsByIds } from "@/lib/products";

type CartContextValue = {
  hydrated: boolean;
  items: CartItem[];
  count: number;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  total: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  buyNow: (productId: string, quantity?: number) => void;
  setCartItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildLines(items: CartItem[]): CartLine[] {
  const products = getProductsByIds(items.map((i) => i.productId));
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    lines.push({
      productId: product.id,
      quantity: item.quantity,
      name: product.name,
      slug: product.slug,
      image: product.image,
      category: product.category,
      salePrice: product.salePrice,
      originalPrice: product.originalPrice,
      offerPrice: product.offerPrice,
      lineSubtotal: product.salePrice * item.quantity,
      lineDiscount:
        (product.originalPrice - product.salePrice) * item.quantity,
    });
  }
  return lines;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setItems(readCartStorage());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) writeCartStorage(items);
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product || product.stock <= 0) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      const newQty = Math.min(
        (existing?.quantity ?? 0) + quantity,
        product.stock
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { productId, quantity: Math.min(quantity, product.stock) }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const product = getProductById(productId);
    const max = product?.stock ?? 99;
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(quantity, max) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
    setItems([]);
  }, []);

  const buyNow = useCallback((productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product || product.stock <= 0) return;
    setItems([{ productId, quantity: Math.min(quantity, product.stock) }]);
  }, []);

  const setCartItems = useCallback((next: CartItem[]) => {
    setItems(next);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = buildLines(items);
    const subtotal = lines.reduce((sum, l) => sum + l.lineSubtotal, 0);
    const discount = lines.reduce((sum, l) => sum + l.lineDiscount, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    return {
      hydrated,
      items,
      count,
      lines,
      subtotal,
      discount,
      total: subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      buyNow,
      setCartItems,
    };
  }, [hydrated, items, addItem, removeItem, updateQuantity, clearCart, buyNow, setCartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
