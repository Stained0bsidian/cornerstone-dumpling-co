"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmedPage() {
  const { clearCart } = useCart();

  // Clear cart after successful Stripe payment redirect
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="bg-brand-green/10 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
        <svg className="text-brand-green h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-heading text-brand-green text-4xl font-semibold sm:text-5xl">Order confirmed!</h1>
      <p className="font-body text-brand-forest/80 mt-6 text-lg leading-relaxed">
        Thank you for your order. We&apos;ll be in touch by email or phone to confirm your pickup or delivery details.
      </p>
      <p className="font-body text-brand-forest/60 mt-4 text-base">
        In the meantime, feel free to share the love — handcrafted dumplings make great gifts.
      </p>
      <Link href="/shop" className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream mt-10 inline-flex rounded-full px-10 py-4 text-sm font-semibold shadow-md transition-colors">
        Back to shop
      </Link>
    </div>
  );
}
