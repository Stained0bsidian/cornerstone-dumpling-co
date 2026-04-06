"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      className="hover:text-brand-green-accent relative inline-flex items-center gap-1.5 transition-colors"
    >
      <span>Cart</span>
      {itemCount > 0 && (
        <span className="bg-brand-green text-brand-cream inline-flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-semibold">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
