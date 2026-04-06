import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, products } from "@/lib/products";
import heroImage from "../product-pierogi-gold.jpg";

export const metadata: Metadata = {
  title: "Home",
};

const featured = products.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-brand-cream pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/45 to-brand-forest/25" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-body mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/90">
              Lake Norman, NC
            </p>
            <h1 className="font-heading text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Handcrafted Dumplings Worth Savoring
            </h1>
            <p className="font-body mt-6 max-w-xl text-lg leading-relaxed text-white/95">
              Made with care in Lake Norman, NC. Available for local pickup and
              delivery.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="font-body bg-brand-cream text-brand-green hover:bg-brand-cream/90 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg transition-colors"
              >
                Shop All Dumplings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-heading text-brand-green text-3xl font-semibold sm:text-4xl">
              Heritage &amp; craft
            </h2>
            <p className="font-body text-brand-forest/85 mt-6 text-lg leading-relaxed">
              At Cornerstone, every dumpling is handmade from scratch using
              premium ingredients. From classic pierogis to bold fusion flavors,
              each batch is crafted with intention—food you can feel good about
              sharing.
            </p>
            <p className="font-body text-brand-forest/75 mt-4 leading-relaxed">
              Faith-rooted and family-minded, we bring a warm, modern take on
              artisan dumplings—made to gather around the table.
            </p>
          </div>
          <div className="border-brand-green/15 bg-brand-cream relative overflow-hidden rounded-3xl border p-8 shadow-sm">
            <div className="bg-brand-green/5 absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" />
            <p className="font-heading text-brand-green relative text-2xl font-medium leading-snug">
              &ldquo;Premium ingredients. Patient hands. Flavors worth slowing
              down for.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="border-brand-green/15 bg-brand-green/5 rounded-3xl border px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="font-heading text-brand-green text-2xl font-semibold sm:text-3xl">
            How to order
          </h2>
          <ol className="font-body text-brand-forest/85 mt-6 list-decimal space-y-3 pl-5 text-base leading-relaxed sm:text-lg">
            <li>Browse the shop and add dumplings to your cart.</li>
            <li>
              At checkout, tell us your contact details and whether you want{" "}
              <strong className="text-brand-forest">local pickup</strong> or{" "}
              <strong className="text-brand-forest">local delivery</strong> (we
              don&apos;t ship by mail).
            </li>
            <li>
              Pick a preferred date and time; add any special instructions.
              We&apos;ll confirm by email or phone.
            </li>
          </ol>
          <div className="mt-8">
            <Link
              href="/shop"
              className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold shadow-md transition-colors"
            >
              Shop All Dumplings
            </Link>
          </div>
        </div>
      </section>

      <section className="border-brand-green/10 bg-white/40 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-brand-green text-3xl font-semibold sm:text-4xl">
                Featured dumplings
              </h2>
              <p className="font-body text-brand-forest/75 mt-2 max-w-lg">
                A taste of our lineup—add to cart and choose pickup or delivery
                at checkout.
              </p>
            </div>
            <Link
              href="/shop"
              className="font-body text-brand-green-accent hover:text-brand-green text-sm font-semibold underline-offset-4 hover:underline"
            >
              View full shop
            </Link>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <li
                key={product.id}
                className="group border-brand-green/10 flex flex-col overflow-hidden rounded-2xl border bg-white/60 shadow-sm transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductImage product={product} priority={i === 0} />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-brand-forest text-lg font-semibold leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-body text-brand-forest/70 mt-2 line-clamp-2 text-sm">
                    {product.description}
                  </p>
                  <p className="font-body text-brand-green mt-4 text-base font-semibold">
                    {formatPrice(product.priceCents)}
                  </p>
                  <div className="mt-auto pt-5">
                    <AddToCartButton productId={product.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex justify-center">
            <Link
              href="/shop"
              className="font-body bg-brand-green hover:bg-brand-green-accent text-brand-cream inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold shadow-md transition-colors"
            >
              Shop All Dumplings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
