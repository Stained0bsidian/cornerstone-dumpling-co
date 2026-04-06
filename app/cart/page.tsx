"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getProductImageSrc } from "@/lib/productImages";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { lines, setQuantity, removeLine, subtotalCents } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-brand-green text-4xl font-semibold">
          Your cart
        </h1>
        <p className="font-body text-brand-forest/75 mt-4 text-lg">
          Your cart is empty.
        </p>
        <Link
          href="/shop"
          className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream mt-8 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold transition-colors"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-brand-green text-4xl font-semibold">
        Your cart
      </h1>

      <ul className="mt-10 divide-y divide-brand-green/10 border-y border-brand-green/10">
        {lines.map(({ product, quantity }) => {
          const thumb = getProductImageSrc(product);
          return (
          <li
            key={product.id}
            className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center"
          >
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-brand-cream sm:h-28 sm:w-28">
              {thumb ? (
                <Image
                  src={thumb}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#274b3a] to-[#1c3529] p-2 text-center">
                  <span className="font-heading text-brand-cream text-xs font-medium leading-tight">
                    {product.name}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-brand-forest text-xl font-semibold">
                {product.name}
              </h2>
              <p className="font-body text-brand-forest/70 mt-1 text-sm">
                {formatPrice(product.priceCents)} each
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:justify-end">
              <label className="font-body flex items-center gap-2 text-sm">
                <span className="text-brand-forest/70">Qty</span>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (!Number.isFinite(n)) return;
                    setQuantity(product.id, n);
                  }}
                  className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 w-20 rounded-lg border bg-white px-3 py-2 text-center text-sm focus:outline-none focus:ring-2"
                />
              </label>
              <p className="font-body text-brand-forest min-w-[5rem] text-right text-lg font-semibold">
                {formatPrice(product.priceCents * quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeLine(product.id)}
                className="font-body text-brand-forest/60 hover:text-brand-forest text-sm underline-offset-4 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-brand-green/10 pt-8 sm:flex-row sm:items-center">
        <p className="font-body text-brand-forest text-xl">
          Subtotal{" "}
          <span className="font-semibold">{formatPrice(subtotalCents)}</span>
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/shop"
            className="font-body text-brand-green border-brand-green/30 hover:bg-brand-green/5 inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-center text-sm font-semibold transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            href="/checkout"
            className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-sm transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
