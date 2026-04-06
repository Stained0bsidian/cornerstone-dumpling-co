import type { Metadata } from "next";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-heading text-brand-green text-4xl font-semibold sm:text-5xl">
          Shop
        </h1>
        <p className="font-body text-brand-forest/80 mt-4 text-lg leading-relaxed">
          Local pickup and delivery in the Lake Norman area—no shipping.
        </p>
      </header>

      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {products.map((product, i) => (
          <li
            key={product.id}
            className="group border-brand-green/10 flex flex-col overflow-hidden rounded-3xl border bg-white/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <ProductImage product={product} priority={i === 0} />
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h2 className="font-heading text-brand-forest text-2xl font-semibold leading-tight">
                {product.name}
              </h2>
              <p className="font-body text-brand-forest/75 mt-3 leading-relaxed">
                {product.description}
              </p>
              <p className="font-body text-brand-green mt-5 text-xl font-semibold">
                {formatPrice(product.priceCents)}
              </p>
              <div className="mt-8">
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
