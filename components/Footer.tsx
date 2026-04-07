import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-brand-green/10 bg-brand-green text-brand-cream mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">
              Cornerstone Dumpling Co.
            </p>
            <p className="font-body mt-2 max-w-sm text-sm text-white/80">
              Handcrafted in Cornelius, NC. Local pickup and delivery only.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
              <a href="mailto:hello@cornerstonedumpling.com" className="hover:underline">
                hello@cornerstonedumpling.com
              </a>
            </div>
            <Link
              href="/shop"
              className="font-body bg-brand-cream text-brand-green hover:bg-brand-cream/90 mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold shadow-md transition-colors"
            >
              Order Now
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
          </div>
        </div>
        <p className="font-body mt-10 text-xs text-white/60">
          © {new Date().getFullYear()} Cornerstone Dumpling Co. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
