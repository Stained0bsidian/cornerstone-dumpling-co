"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({
  productId,
  label = "Add to cart",
}: {
  productId: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    addItem(productId, 1);
    setShowAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowAdded(false);
      timeoutRef.current = null;
    }, 1500);
  }, [addItem, productId]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-body bg-brand-green hover:bg-brand-green-accent focus-visible:ring-brand-green-accent text-brand-cream w-full rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {showAdded ? "Added!" : label}
    </button>
  );
}
