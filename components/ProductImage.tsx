import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductImageSrc } from "@/lib/productImages";

export function ProductImage({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const src = getProductImageSrc(product);

  if (src) {
    return (
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl bg-brand-cream ${className}`}
      >
        <Image
          src={src}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#274b3a] via-[#35664f] to-[#1c3529] ${className}`}
      role="img"
      aria-label={`${product.name} (placeholder)`}
    >
      <span className="font-heading text-brand-cream/90 px-6 text-center text-lg font-medium leading-snug sm:text-xl">
        {product.name}
      </span>
    </div>
  );
}
