import Link from "next/link";
import type { ReactNode } from "react";
import { Img } from "./Img";
import { Icon } from "./Icon";
import { CategoryCard, DocumentCard, ProductCard } from "./cards";
import { TechnicalTable } from "./TechnicalTable";
import { ArrowLink, Breadcrumbs, Button, PendingNote, SectionHeading } from "./ui";
import type { Application, SpecRow } from "@/content/products";
import { getCategory, getProduct } from "@/content/products";
import type { Doc } from "@/content/documents";
import { qcStages } from "@/content/quality";

export const SUBNAV = [
  ["overview", "Overview"],
  ["specifications", "Specifications"],
  ["documents", "Documents"],
  ["quality", "Quality control"],
  ["applications", "Applications"],
  ["related", "Related"],
] as const;

export function ProductHero({
  crumbs,
  kicker,
  title,
  intro,
  benefits,
  application,
  image,
  imageAlt,
  rfqHref,
  datasheet,
  provisional,
}: {
  crumbs: { name: string; href: string }[];
  kicker: string;
  title: string;
  intro: string;
  benefits: string[];
  application: string;
  image: string;
  imageAlt: string;
  rfqHref: string;
  datasheet?: Doc;
  provisional?: string;
}) {
  return (
    <section className="bg-ivory">
      <div className="wrap pt-10 md:pt-14">
        <Breadcrumbs items={crumbs} />
      </div>
      <div className="wrap grid gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-20">
        <div className="lg:col-span-6 lg:py-6">
          <p className="eyebrow mb-6">{kicker}</p>
          <h1>{title}</h1>
          <p className="lede mt-6">{intro}</p>
          <ul className="mt-8 space-y-3">
            {benefits.slice(0, 4).map((b) => (
              <li key={b} className="flex gap-3 text-[.98rem]">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold-2" strokeWidth={2.4} />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-5 text-[.9rem] text-muted">
            <span className="mr-2 text-[.7rem] font-bold uppercase tracking-[.16em] text-forest-2">Application</span>
            {application}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={rfqHref}>Request a Quote</Button>
            {datasheet?.file ? (
              <Button href={datasheet.file} variant="outline" icon="download">Download Datasheet</Button>
            ) : (
              <Button href={`${rfqHref}${rfqHref.includes("?") ? "&" : "?"}doc=${datasheet?.slug ?? "tds"}`} variant="outline" icon="doc">Request Datasheet</Button>
            )}
          </div>
          {provisional && <PendingNote className="mt-8">{provisional}</PendingNote>}
        </div>
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-forest lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <Img name={image} alt={imageAlt} priority sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SubNav() {
  return (
    <div className="sticky top-[76px] z-30 border-y border-line bg-white/95 backdrop-blur lg:top-[112px]">
      <nav aria-label="On this page" className="wrap">
        <ul className="flex gap-1 overflow-x-auto py-1 text-[.86rem] font-semibold [scrollbar-width:none]">
          {SUBNAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block whitespace-nowrap px-3 py-3 text-charcoal/75 transition-colors hover:text-forest">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Overview({ paragraphs, strengths, considerations }: { paragraphs: string[]; strengths: string[]; considerations: string[] }) {
  return (
    <section id="overview" className="section scroll-mt-40">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Product overview</p>
          <h2>Construction & intended use</h2>
          <div className="mt-7 space-y-5 text-[1.03rem] leading-relaxed text-charcoal/85">
            {paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="space-y-5 lg:col-span-5">
          <Panel title="Strengths" items={strengths} icon="check" tone="forest" />
          <Panel title="Specify with care" items={considerations} icon="clock" tone="amber" />
        </div>
      </div>
    </section>
  );
}

function Panel({ title, items, icon, tone }: { title: string; items: string[]; icon: string; tone: "forest" | "amber" }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-7">
      <h3 className="text-[.75rem] font-sans font-bold uppercase tracking-[.16em] text-forest-2">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((s) => (
          <li key={s} className="flex gap-3 text-[.95rem]">
            <Icon name={icon} className={`mt-1 h-4 w-4 shrink-0 ${tone === "forest" ? "text-forest-2" : "text-amber"}`} strokeWidth={2.2} />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Specs({ rows, name, note }: { rows: SpecRow[]; name: string; note?: ReactNode }) {
  return (
    <section id="specifications" className="section scroll-mt-40 bg-white">
      <div className="wrap">
        <SectionHeading
          align="split"
          eyebrow="Technical specifications"
          title="Specification"
          lede="Every value shows its source. Fields awaiting Kosmex data stay empty and are marked, so a placeholder can never be read as a commercial specification."
        />
        <div className="mt-12"><TechnicalTable rows={rows} caption={`${name} technical specifications`} /></div>
        {note && <div className="mt-6">{note}</div>}
      </div>
    </section>
  );
}

export function Applications({ items, image, imageAlt }: { items: Application[]; image: string; imageAlt: string }) {
  return (
    <section id="applications" className="section scroll-mt-40">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Applications</p>
          <h2>Where it performs</h2>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-forest">
            <Img name={image} alt={imageAlt} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
        <ol className="lg:col-span-7 lg:pt-20">
          {items.map((a, i) => (
            <li key={a.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 last:border-b">
              <span className="font-display text-[.85rem] font-bold text-gold-2">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[1.25rem]">{a.title}</h3>
                <p className="mt-2 text-muted">{a.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function QualityBlock() {
  return (
    <section id="quality" className="section scroll-mt-40 on-dark bg-forest text-white">
      <div className="wrap">
        <SectionHeading align="split" eyebrow="Quality control" title={<span className="text-white">Inspection from log to container</span>} lede="Every panel passes the same six stages before release. Batch QC reports are available per shipment on request.">
          <ArrowLink href="/quality/qc-process/" className="mt-6">Full QC process</ArrowLink>
        </SectionHeading>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {qcStages.map((s) => (
            <li key={s.n} className="bg-forest p-7">
              <span className="font-display text-[.8rem] font-bold text-gold">{s.n}</span>
              <h3 className="mt-2 text-[1.1rem] text-white">{s.title}</h3>
              <p className="mt-2 text-[.9rem] text-white/70">{s.short}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Documents({ docs }: { docs: Doc[] }) {
  return (
    <section id="documents" className="section scroll-mt-40">
      <div className="wrap">
        <SectionHeading align="split" eyebrow="Available documents" title="Technical documentation" lede="Download published documents, or request documents held per order.">
          <ArrowLink href="/quality/technical-data-sheets/" className="mt-6">Document library</ArrowLink>
        </SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((d) => <DocumentCard key={d.slug} d={d} />)}
        </div>
      </div>
    </section>
  );
}

export function Related({ slugs }: { slugs: string[] }) {
  return (
    <section id="related" className="section scroll-mt-40 bg-white">
      <div className="wrap">
        <SectionHeading eyebrow="Related products" title="Technically related" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((s) => {
            const p = getProduct(s);
            if (p) return <ProductCard key={s} p={p} />;
            const c = getCategory(s);
            return c ? <CategoryCard key={s} c={c} /> : null;
          })}
        </div>
      </div>
    </section>
  );
}

export function GenericImageNote() {
  return <p className="mt-3 text-[.78rem] text-muted">Image shows Kosmex production; product-specific photography to be supplied.</p>;
}

export const rfqFor = (slug: string) => `/request-a-quote/?product=${slug}`;

export function SiblingNav({ items, current }: { items: { slug: string; label: string; href: string }[]; current: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <Link key={i.slug} href={i.href} aria-current={i.slug === current ? "page" : undefined} className={`border px-4 py-2 text-[.86rem] font-semibold transition-colors ${i.slug === current ? "border-forest bg-forest text-white" : "border-line bg-white text-charcoal hover:border-forest"}`}>
          {i.label}
        </Link>
      ))}
    </div>
  );
}
