"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Product } from "@/lib/products";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const lines: CartLine[] = useMemo(() => {
    return Object.entries(quantities)
      .map(([productId, quantity]) => {
        const product = getProductById(productId);
        if (!product || quantity <= 0) return null;
        return { product, quantity };
      })
      .filter((x): x is CartLine => x !== null);
  }, [quantities]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[productId] ?? 0) + quantity);
      if (next === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setQuantities((prev) => {
      if (quantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: quantity };
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setQuantities((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearCart = useCallback(() => {
    setQuantities({});
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotalCents = useMemo(
    () =>
      lines.reduce(
        (sum, l) => sum + l.product.priceCents * l.quantity,
        0,
      ),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
      subtotalCents,
    }),
    [
      lines,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
      subtotalCents,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
