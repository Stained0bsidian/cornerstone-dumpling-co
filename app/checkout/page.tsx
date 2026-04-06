"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import {
  LAST_ORDER_STORAGE_KEY,
  type CheckoutOrder,
} from "@/lib/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotalCents, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">(
    "pickup",
  );
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-heading text-brand-green text-4xl font-semibold">
          Checkout
        </h1>
        <p className="font-body text-brand-forest/75 mt-4 text-lg">
          Your cart is empty. Add something delicious first.
        </p>
        <Link
          href="/shop"
          className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream mt-8 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold transition-colors"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email, and phone.");
      return;
    }
    if (fulfillment === "delivery" && !deliveryAddress.trim()) {
      setError("Please enter a delivery address.");
      return;
    }
    if (!preferredDateTime.trim()) {
      setError("Please choose a preferred date and time.");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const order: CheckoutOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      fulfillment,
      deliveryAddress:
        fulfillment === "delivery" ? deliveryAddress.trim() : null,
      preferredDateTime: preferredDateTime.trim(),
      specialInstructions: specialInstructions.trim(),
      lines: lines.map((l) => ({
        name: l.product.name,
        quantity: l.quantity,
        lineTotalCents: l.product.priceCents * l.quantity,
      })),
      subtotalCents,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      try {
        sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
      } catch {
        // ignore storage errors
      }

      // TODO: Stripe — after successful payment, attach payment intent id to order in DB.

      clearCart();
      router.push("/order-confirmed");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-brand-green text-4xl font-semibold">
        Checkout
      </h1>
      <p className="font-body text-brand-forest/75 mt-3 max-w-2xl">
        Local pickup or local delivery only—we&apos;ll confirm your order by
        email or phone.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <section className="border-brand-green/10 lg:col-span-3 rounded-3xl border bg-white/70 p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-brand-forest text-2xl font-semibold">
            Your details
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <p
                className="font-body rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="font-body block text-sm font-medium text-brand-forest">
                Full name
                <input
                  required
                  name="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  autoComplete="name"
                  className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
                />
              </label>
              <label className="font-body block text-sm font-medium text-brand-forest">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
                />
              </label>
            </div>

            <label className="font-body block text-sm font-medium text-brand-forest">
              Phone
              <input
                required
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
              />
            </label>

            <fieldset>
              <legend className="font-body text-sm font-medium text-brand-forest">
                Fulfillment
              </legend>
              <div className="mt-3 flex flex-wrap gap-4">
                <label className="font-body inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillment === "pickup"}
                    onChange={() => setFulfillment("pickup")}
                    className="text-brand-green focus:ring-brand-green border-brand-green/30"
                  />
                  Local pickup
                </label>
                <label className="font-body inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillment === "delivery"}
                    onChange={() => setFulfillment("delivery")}
                    className="text-brand-green focus:ring-brand-green border-brand-green/30"
                  />
                  Local delivery
                </label>
              </div>
            </fieldset>

            {fulfillment === "delivery" && (
              <label className="font-body block text-sm font-medium text-brand-forest">
                Delivery address
                <textarea
                  name="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                  className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
                  placeholder="Street, city, ZIP"
                />
              </label>
            )}

            <label className="font-body block text-sm font-medium text-brand-forest">
              Preferred date &amp; time
              <input
                required
                name="preferredDateTime"
                value={preferredDateTime}
                onChange={(e) => setPreferredDateTime(e.target.value)}
                className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
                placeholder="e.g. Saturday 4–6pm, or a specific date"
              />
            </label>

            <label className="font-body block text-sm font-medium text-brand-forest">
              Special instructions
              <textarea
                name="specialInstructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
                className="border-brand-green/20 focus:border-brand-green focus:ring-brand-green/30 mt-2 w-full rounded-xl border bg-white px-4 py-3 text-brand-forest shadow-sm focus:outline-none focus:ring-2"
                placeholder="Allergies, gate codes, gift note…"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream w-full rounded-full px-8 py-4 text-sm font-semibold shadow-md transition-colors enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>
          </form>
        </section>

        <aside className="lg:col-span-2">
          <div className="border-brand-green/10 bg-brand-cream/80 sticky top-28 rounded-3xl border p-6 shadow-sm">
            <h2 className="font-heading text-brand-forest text-xl font-semibold">
              Order summary
            </h2>
            <ul className="mt-4 space-y-3">
              {lines.map((l) => (
                <li
                  key={l.product.id}
                  className="font-body flex justify-between gap-4 text-sm text-brand-forest/90"
                >
                  <span>
                    {l.quantity}× {l.product.name}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(l.product.priceCents * l.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-body text-brand-forest mt-6 flex justify-between border-t border-brand-green/10 pt-4 text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </p>
            <p className="font-body text-brand-forest/65 mt-3 text-xs leading-relaxed">
              Payment will be collected when Stripe is connected. For now,
              we&apos;ll follow up to confirm total and arrange pickup or
              delivery.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
