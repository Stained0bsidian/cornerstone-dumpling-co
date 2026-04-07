import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteUrl = "https://cornerstone-dumpling.vercel.app";

const defaultTitle = "Cornerstone Dumpling Co.";
const defaultDescription =
  "Premium handcrafted dumplings and pierogis from Cornelius, NC. Local pickup and delivery.";

const recoletaLike = Fraunces({
  subsets: ["latin"],
  variable: "--font-recoleta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  name: "Cornerstone Dumpling Co.",
  description: defaultDescription,
  url: siteUrl,
  telephone: "+1-000-000-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cornelius",
    addressRegion: "NC",
    addressCountry: "US",
  },
  servesCuisine: ["Polish", "Asian", "American"],
  priceRange: "$$",
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Cornelius%2C+North+Carolina",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Cornerstone Dumpling Co.",
  },
  description: defaultDescription,
  keywords: [
    "handcrafted dumplings",
    "pierogis",
    "Cornelius NC",
    "Lake Norman food",
    "local delivery dumplings",
    "artisan dumplings NC",
  ],
  manifest: "/manifest.json",
  // Set to noindex until ready to launch publicly
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "Cornerstone Dumpling Co.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${recoletaLike.variable} ${inter.variable}`}
    >
      <body className="font-body flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <CartProvider>
          <div
            className="font-body bg-brand-green text-brand-cream border-brand-green/20 border-b px-4 py-2.5 text-center text-sm sm:text-[15px]"
            role="region"
            aria-label="Announcement"
          >
            🥟 Now taking orders for pickup &amp; delivery in Cornelius, NC
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
