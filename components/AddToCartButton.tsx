"use client";

import { useCart } from "@/context/CartContext";

export function AddToCartButton({
  productId,
  label = "Add to cart",
}: {
  productId: string;
  label?: string;
}) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() => addItem(productId, 1)}
      className="font-body bg-brand-green hover:bg-brand-green-accent focus-visible:ring-brand-green-accent text-brand-cream w-full rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {label}
    </button>
  );
}
