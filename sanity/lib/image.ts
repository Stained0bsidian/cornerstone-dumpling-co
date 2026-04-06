import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!source || !builder) return null;
  return builder.image(source).url();
}
