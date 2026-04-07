import type { MetadataRoute } from "next";

// Set to noindex until ready to launch publicly
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
