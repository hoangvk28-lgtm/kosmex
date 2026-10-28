import Link from "next/link";
import { Img } from "./Img";
import { Icon } from "./Icon";
import type { Category, Product } from "@/content/products";
import { productHref } from "@/content/products";
import { availabilityLabel, docClassLabel, type Doc } from "@/content/documents";
import type { Market } from "@/content/markets";

/* Product category card ---------------------------------------------------- */
export function CategoryCard({ c, large = false, priority = false }: { c: Category; large?: boolean; priority?: boolean }) {
  return (
    <Link
      href={productHref(c.slug)}
      className={`zoom-parent group relative flex flex-col overflow-hidden rounded-2xl bg-forest text-white ${large ? "min-h-[520px] lg:min-h-[640px]" : "min-h-[420px]"}`}
    >
      <Img name={c.image} alt={c.imageAlt} sizes={large ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 28vw, 100vw"} priority={priority} className="zoom-img absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-3 via-forest-3/55 to-forest-3/5" />
      <div className="relative mt-auto p-7 md:p-9">
        <div className="flex items-center gap-3 text-[.7rem] font-bold uppercase tracking-[.18em] text-gold">
          <span>0{c.order}</span>
          <span className="h-px w-8 bg-gold/70" />
          <span>{c.flagship ? "Flagship range" : c.short}</span>
        </div>
        <h3 className={`mt-4 text-white ${large ? "text-[clamp(1.9rem,1.4rem+1.6vw,2.9rem)]" : ""}`}>{c.name}</h3>
        <p className={`mt-3 text-white/78 ${large ? "max-w-lg text-[1.02rem]" : "text-[.95rem]"}`}>{c.cardText}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/18 pt-5">
          <span className="text-[.82rem] text-white/65">
            <span className="mr-2 text-[.68rem] font-bold uppercase tracking-[.14em] text-mint">Primary use</span>
            {c.primaryApplication}
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-[.9rem] font-bold">
            View products <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Product (child) card ------------------------------------------------------ */
export function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={productHref(p.slug)} className="zoom-parent group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-forest/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-2">
        <Img name={p.image} alt={p.imageAlt} sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="zoom-img h-full w-full object-cover" />
        {p.provisional && <span className="absolute left-4 top-4 bg-white/92 px-2 py-1 text-[.625rem] font-bold uppercase tracking-[.14em] text-amber">Provisional grade name</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-forest-2">{p.kicker}</p>
        <h3 className="mt-2.5 text-[1.3rem]">{p.name}</h3>
        <p className="mt-3 flex-1 text-[.95rem] text-muted">{p.intro}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[.9rem] font-bold text-forest">
          Specifications <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* Document card ------------------------------------------------------------- */
export function DocumentCard({ d, compact = false }: { d: Doc; compact?: boolean }) {
  const meta = [
    ["Category", d.product],
    ["Type", docClassLabel[d.docClass]],
    ["Language", d.language],
    ["Revision", d.revision ?? "—"],
  ];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-forest/35">
      <div className="flex items-start gap-4 p-6 pb-5">
        <div className={`grid h-12 w-10 shrink-0 place-items-center border ${d.availability === "download" ? "border-forest/25 bg-forest text-white" : "border-line bg-ivory text-stone"}`}>
          <Icon name="doc" className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-forest-2">{docClassLabel[d.docClass]}</p>
          <h3 className="mt-1.5 font-display text-[1.02rem] font-bold leading-snug text-charcoal">{d.title}</h3>
          {d.reference && <p className="mt-1 text-[.8rem] text-muted">Ref. {d.reference}</p>}
        </div>
      </div>
      {!compact && <p className="px-6 text-[.9rem] text-muted">{d.summary}</p>}
      <dl className="mx-6 mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-[.8rem]">
        {meta.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-[.65rem] font-bold uppercase tracking-[.14em] text-stone">{k}</dt>
            <dd className="mt-0.5 truncate text-charcoal" title={v}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto p-6 pt-5">
        <DocAction d={d} />
      </div>
    </article>
  );
}

export function DocAction({ d }: { d: Doc }) {
  if (d.availability === "download" && d.file)
    return (
      <a href={d.file} download className="btn btn-primary btn-sm w-full" aria-label={`Download ${d.title} (PDF)`}>
        <Icon name="download" /> Download PDF
      </a>
    );
  if (d.availability === "on-request")
    return (
      <Link href={`/request-a-quote/?doc=${d.slug}`} className="btn btn-outline btn-sm w-full">
        Request document
      </Link>
    );
  return (
    <p className="flex min-h-10 items-center justify-center gap-2 border border-dashed border-amber/40 bg-amber-bg text-[.8rem] font-semibold text-amber">
      <Icon name="clock" /> {availabilityLabel.pending}
    </p>
  );
}

/* Market card --------------------------------------------------------------- */
export function MarketCard({ m, index }: { m: Market; index: number }) {
  return (
    <Link href={`/eu/${m.slug}/`} className="group relative flex flex-col border-t border-line py-6 transition-colors md:px-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-[.8rem] font-bold tracking-[.12em] text-stone">{String(index + 1).padStart(2, "0")} · {m.code}</span>
        <Icon name="arrow" className="h-4 w-4 text-forest opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
      <h3 className="mt-3 text-[1.55rem] text-forest transition-colors group-hover:text-forest-2">{m.name}</h3>
      <p className="text-[.85rem] text-muted">{m.native}</p>
      <span aria-hidden className="absolute left-0 top-[-1px] h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
