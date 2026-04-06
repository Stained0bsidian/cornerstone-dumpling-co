import Link from "next/link";
import { Logo } from "./Logo";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="border-brand-green/10 bg-brand-cream/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo />
        <nav
          className="font-body flex items-center gap-6 text-sm font-medium text-brand-forest/90"
          aria-label="Main"
        >
          <Link
            href="/"
            className="hover:text-brand-green-accent transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-brand-green-accent transition-colors"
          >
            Shop
          </Link>
          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
