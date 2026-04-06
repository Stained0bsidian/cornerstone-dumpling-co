import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col items-start leading-none ${className}`}
    >
      <span className="mb-1 inline-flex" aria-hidden>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-brand-green-accent"
        >
          <path
            d="M7 0V18M0 7H14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-heading text-brand-forest text-xl font-semibold tracking-tight sm:text-2xl">
        Cornerstone
      </span>
      <span className="font-body text-brand-forest/80 mt-0.5 text-xs font-medium uppercase tracking-[0.2em]">
        Dumpling Co.
      </span>
    </Link>
  );
}
