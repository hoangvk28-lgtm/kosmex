import Link from "next/link";
import { K_PATH, LOGO_VIEWBOX, WORD_PATHS } from "./logo-paths";

/** Official KOSMEX logo (K mark + wordmark), vectorised from the Kosmex film-print artwork. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Kosmex Plywood — home" className={`group inline-flex items-center ${className}`}>
      <svg viewBox={LOGO_VIEWBOX} role="img" aria-hidden className={`h-8 w-auto lg:h-9 ${light ? "text-white" : "text-forest"}`} fill="currentColor">
        <path d={K_PATH} className={`transition-colors duration-300 ${light ? "text-gold" : "group-hover:text-forest-2"}`} fill="currentColor" />
        {WORD_PATHS.map((d) => <path key={d.slice(0, 24)} d={d} />)}
      </svg>
    </Link>
  );
}
