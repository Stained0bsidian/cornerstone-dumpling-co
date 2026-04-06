import type { StaticImageData } from "next/image";
import type { Product } from "@/lib/products";
import goldPierogi from "../product-pierogi-gold.jpg";

const GOLD_ID = "gold-potato-farmer-cheese";

export function getProductImageSrc(
  product: Product,
): string | StaticImageData | null {
  if (product.id === GOLD_ID) return goldPierogi;
  return product.imageSrc;
}
