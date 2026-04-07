"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function ShopStickyCartBar() {
  const { itemCount } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="border-brand-green/20 bg-brand-cream/95 supports-[backdrop-filter]:bg-brand-cream/90 fixed bottom-0 left-0 right-0 z-40 border-t p-4 shadow-[0_-4px_24px_rgba(28,53,41,0.12)] backdrop-blur-sm md:hidden">
      <Link
        href="/cart"
        className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold shadow-md transition-colors"
      >
        View cart ({itemCount} {itemCount === 1 ? "item" : "items"})
      </Link>
    </div>
  );
}
