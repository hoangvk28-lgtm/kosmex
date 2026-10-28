import Link from "next/link";
import { qualityPages } from "@/content/quality";

/** Section navigation for the Quality & Expertise center. */
export function QualityNav({ current }: { current: string }) {
  return (
    <nav aria-label="Quality & Expertise" className="border-b border-line bg-white">
      <ul className="wrap flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {qualityPages.map((q) => {
          const href = q.slug ? `/quality/${q.slug}/` : "/quality/";
          const on = q.slug === current;
          return (
            <li key={q.slug}>
              <Link href={href} aria-current={on ? "page" : undefined} className={`relative block whitespace-nowrap px-3.5 py-4 text-[.86rem] font-semibold ${on ? "text-forest" : "text-charcoal/70 hover:text-forest"}`}>
                {q.title}
                {on && <span className="absolute inset-x-3.5 bottom-0 h-[2px] bg-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
