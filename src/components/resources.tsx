import Link from "next/link";
import { Icon } from "./Icon";
import { resourceSections, type Article } from "@/content/resources";

export const sectionTitle = (s: string) => resourceSections.find((r) => r.slug === s)?.title ?? s;

export const fmtDate = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function ArticleCard({ a }: { a: Article }) {
  return (
    <Link href={`/resources/articles/${a.slug}/`} className="group flex flex-col border border-line bg-white p-7 transition-colors hover:border-forest/40">
      <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-forest-2">{sectionTitle(a.section)}</p>
      <h3 className="mt-3 text-[1.2rem] leading-snug">{a.title}</h3>
      <p className="mt-3 flex-1 text-[.93rem] text-muted">{a.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[.8rem] text-stone">
        <span>{fmtDate(a.date)} · {a.readMinutes} min read</span>
        <Icon name="arrow" className="h-4 w-4 text-forest transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function ResourceNav({ current }: { current: string }) {
  return (
    <nav aria-label="Resources" className="border-b border-line bg-white">
      <ul className="wrap flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {resourceSections.map((r) => {
          const href = r.slug === "knowledge-center" ? "/resources/" : `/resources/${r.slug}/`;
          const on = r.slug === current;
          return (
            <li key={r.slug}>
              <Link href={href} aria-current={on ? "page" : undefined} className={`relative block whitespace-nowrap px-3.5 py-4 text-[.86rem] font-semibold ${on ? "text-forest" : "text-charcoal/70 hover:text-forest"}`}>
                {r.title}
                {on && <span className="absolute inset-x-3.5 bottom-0 h-[2px] bg-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
