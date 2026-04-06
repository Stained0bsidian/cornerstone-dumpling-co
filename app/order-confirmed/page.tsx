"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";
import {
  LAST_ORDER_STORAGE_KEY,
  type CheckoutOrder,
} from "@/lib/order";

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<CheckoutOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
      if (raw) {
        setOrder(JSON.parse(raw) as CheckoutOrder);
      }
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="border-brand-green/10 bg-white/70 rounded-3xl border p-8 shadow-sm sm:p-12">
        <p className="font-body text-brand-green-accent text-sm font-semibold uppercase tracking-[0.2em]">
          Thank you
        </p>
        <h1 className="font-heading text-brand-green mt-3 text-4xl font-semibold sm:text-5xl">
          Order received
        </h1>
        <p className="font-body text-brand-forest/80 mt-4 text-lg leading-relaxed">
          We&apos;re grateful you chose Cornerstone. You&apos;ll hear from us
          soon to confirm pickup or delivery details.
        </p>

        {order ? (
          <div className="border-brand-green/10 mt-10 space-y-6 border-t pt-8">
            <p className="font-body text-brand-forest">
              <span className="text-brand-forest/70">Order ID:</span>{" "}
              <span className="font-semibold">{order.orderId}</span>
            </p>
            <ul className="space-y-2">
              {order.lines.map((line, i) => (
                <li
                  key={`${line.name}-${i}`}
                  className="font-body flex justify-between gap-4 text-brand-forest/90"
                >
                  <span>
                    {line.quantity}× {line.name}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(line.lineTotalCents)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-body text-brand-forest flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotalCents)}</span>
            </p>
            <p className="font-body text-brand-forest/70 text-sm">
              {order.fulfillment === "pickup"
                ? "Fulfillment: Local pickup"
                : `Delivery to: ${order.deliveryAddress ?? ""}`}
            </p>
          </div>
        ) : (
          <p className="font-body text-brand-forest/70 mt-8 text-sm">
            If you just completed checkout, details will appear here. Otherwise
            you can still reach us from the shop page.
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream inline-flex rounded-full px-8 py-3.5 text-sm font-semibold transition-colors"
          >
            Back to shop
          </Link>
          <Link
            href="/"
            className="font-body text-brand-green border-brand-green/30 hover:bg-brand-green/5 inline-flex rounded-full border px-8 py-3.5 text-sm font-semibold transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
