import Link from "next/link";
import { HeroReel } from "@/components/HeroReel";
import { Img } from "@/components/Img";
import { Icon } from "@/components/Icon";
import { DocAction } from "@/components/cards";
import { Button } from "@/components/ui";
import { categories } from "@/content/products";
import { markets } from "@/content/markets";
import { qcStages } from "@/content/quality";
import { docClassLabel, getDoc } from "@/content/documents";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Engineered Plywood from Vietnam",
    description:
      "Kosmex Plywood: branded film faced plywood, furniture, upholstery and packing plywood manufactured in Vietnam. Technical data sheets, test reports and RFQ for European buyers.",
    path: "/",
  }),
  title: { absolute: "Kosmex Plywood — Leading Plywood Manufacturer & Exporter in Vietnam" },
};

export default function Home() {
  const fsc = getDoc("fsc-chain-of-custody")!;
  const docRows = ["tds-film-faced-plywood", "test-report-bending-film-faced-18mm", "test-report-anti-slip-din-51130", "tds-furniture-plywood"].map((s) => getDoc(s)!);

  return (
    <>
      {/* 1 — HERO: HTML/CSS product reel ---------------------------------- */}
      <HeroReel />

      {/* 2 — INTRO STATEMENT ---------------------------------------------------- */}
      <section id="intro" className="panel bg-sage scroll-mt-24">
        <div className="wrap section">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="kicker">Who we are</p>
            <h2 className="serif mt-5 text-[clamp(1.9rem,1.3rem+2vw,3rem)] font-normal leading-[1.12]">
              Kosmex Plywood — the leading plywood factory & exporter in Vietnam
            </h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
              {site.legalName} produces plywood for construction, furniture and export packaging. Our flagship film faced plywood carries the KOSMEX mark printed into the film, so every sheet on site can be traced back to its specification and documents.
            </p>
          </div>
          <dl className="reveal-stagger mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl bg-forest/10 sm:grid-cols-3">
            {[
              ["FSC® Chain of Custody", "BV-COC-220900", "Bureau Veritas certificate"],
              ["Laboratory tested", "EN 310 · EN 438-2", "Published test reports"],
              ["Panel formats", "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm", "or customised size"],
            ].map(([k, v, s]) => (
              <div key={k} className="bg-sage px-8 py-9 text-center">
                <dt className="text-[.72rem] font-semibold uppercase tracking-[.18em] text-forest-2">{k}</dt>
                <dd className="serif mt-3 text-[1.7rem] leading-tight text-forest">{v}</dd>
                <dd className="mt-1.5 text-[.88rem] text-muted">{s}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — PRODUCT RANGES ----------------------------------------------------- */}
      <section className="panel bg-white">
        <div className="wrap section">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="kicker">Products</p>
              <h2 className="serif mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.75rem)] font-normal leading-[1.05]">Four focused plywood ranges</h2>
            </div>
            <Link href="/products/" className="pill-link">See all products <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <div className="reveal-stagger mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}/`} className="group block">
                <div className="zoom-parent relative aspect-[3/4] overflow-hidden rounded-2xl bg-forest">
                  <Img name={c.image} alt={c.imageAlt} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="zoom-img absolute inset-0 h-full w-full object-cover" />
                  {c.flagship && <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[.68rem] font-semibold uppercase tracking-[.14em] text-forest">Flagship</span>}
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-gold group-hover:text-forest-3">
                    <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                  </span>
                </div>
                <p className="mt-5 text-[.75rem] font-semibold tracking-[.16em] text-gold-2">0{c.order}</p>
                <h3 className="serif mt-1.5 text-[1.55rem] font-normal leading-tight text-charcoal transition-colors group-hover:text-forest-2">{c.name}</h3>
                <p className="mt-2 text-[.95rem] leading-relaxed text-muted">{c.cardText}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — FLAGSHIP FILM FACED ------------------------------------------------ */}
      <section className="panel on-dark bg-forest text-white">
        <div className="wrap section grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="reveal lg:col-span-6">
            <p className="kicker text-gold">Flagship range</p>
            <h2 className="serif mt-5 text-[clamp(2.2rem,1.5rem+2.6vw,3.75rem)] font-normal leading-[1.05] text-white">KOSMEX film faced plywood</h2>
            <p className="serif mt-4 text-[1.3rem] italic text-gold">Built for performance. Recognised by our brand.</p>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/78">
              Phenolic film on acacia and eucalyptus hardwood cores, with the KOSMEX logo printed directly into the film. Contractors and distributors can identify the manufacturer on site, pour after pour.
            </p>
            <dl className="mt-10 max-w-xl divide-y divide-white/12 border-y border-white/12">
              {[
                ["Film", "Brown / black phenolic · 120 · 180 · 220 g/m²"],
                ["Sizes", "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size"],
                ["Thickness", "9–21 mm"],
                ["Glue", "MUF / PF · EN 314-2 class per grade"],
                ["Surface", "Abrasion 680 rev. (EN 438-2) · R10 anti-slip variant"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3.5 text-[.95rem]">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="text-white/92">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[.78rem] text-white/45">Kosmex TDS (Oct 2025) and published test reports.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/products/film-faced-plywood/" variant="gold">View specifications</Button>
              <Button href="/documents/kosmex-tds-film-faced-plywood-2025-10.pdf" variant="light" icon="download">Data sheet</Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-4">
              <div className="reveal-img col-span-3 overflow-hidden rounded-2xl">
                <Img name="ffp-kosmex-render" alt="KOSMEX film faced plywood panel with the logo printed across the film" sizes="(min-width:1024px) 30vw, 60vw" className="aspect-[3/4] h-full w-full object-cover" />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <div className="reveal-img film-surface aspect-[1/2] rounded-2xl" role="img" aria-label="KOSMEX film print artwork on dark brown phenolic film" />
                <p className="text-[.78rem] leading-snug text-white/55">Production print artwork, full panel 1250 × 2500 mm.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — MANUFACTURING ------------------------------------------------------ */}
      <section className="panel bg-sand">
        <div className="wrap section">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="kicker">Manufacturing</p>
            <h2 className="serif mt-5 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.08]">From veneer to finished panel, in our own facilities</h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              Peeling, drying, lay-up, pressing, film laminating and finishing take place in northern Vietnam. These are our own production photographs.
            </p>
            <Link href="/manufacturing/" className="pill-link mt-8">Our manufacturing <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-12">
            <Photo name="factory-layup-hall" cls="col-span-2 md:col-span-7 aspect-[16/10]" caption="Veneer lay-up hall" />
            <Photo name="factory-press-hall" cls="md:col-span-5 aspect-square md:aspect-auto" caption="Hot press line" />
            <Photo name="veneer-sanding-line" cls="md:col-span-4 aspect-square" caption="Sanding line" />
            <Photo name="ffp-factory-stacks" cls="col-span-2 md:col-span-8 aspect-[16/9] md:aspect-auto" caption="Finished film faced panels" />
          </div>
        </div>
      </section>

      {/* 6 — QUALITY ------------------------------------------------------------ */}
      <section className="panel bg-white">
        <div className="wrap section grid gap-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-5 lg:sticky lg:top-40 lg:self-start">
            <p className="kicker">Quality control</p>
            <h2 className="serif mt-5 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.08]">Six inspection stages, from log to container</h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              Each stage has defined checks and records, built around EN 314 and EN 636 requirements. Batch QC reports are available per shipment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quality/qc-process/" className="pill-link">QC process <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/quality/test-reports/" className="pill-link">Test reports <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>
          <ol className="reveal-stagger lg:col-span-7">
            {qcStages.map((s) => (
              <li key={s.n} className="grid grid-cols-[4rem_1fr] gap-4 border-t border-line py-8 last:border-b">
                <span className="serif text-[2rem] leading-none text-gold-2">{s.n}</span>
                <div>
                  <h3 className="text-[1.2rem] font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.short}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — CERTIFICATE + DOCUMENTS ------------------------------------------- */}
      <section className="panel bg-sage">
        <div className="wrap section">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="kicker">Certificates & documents</p>
            <h2 className="serif mt-5 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.08]">Documentation you can verify</h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              We publish a certificate only when we can show the document: issuer, number, scope and validity.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <article className="reveal flex flex-col rounded-2xl bg-forest p-9 text-white lg:col-span-5">
              <span className="w-fit rounded-full bg-white/12 px-3 py-1 text-[.7rem] font-semibold uppercase tracking-[.14em] text-mint">Verified certificate</span>
              <h3 className="serif mt-6 text-[1.9rem] font-normal leading-tight text-white">{fsc.title}</h3>
              <p className="mt-3 text-white/72">{fsc.issuer}{fsc.reference ? ` · ${fsc.reference}` : ""}</p>
              <p className="mt-5 flex-1 text-[.92rem] leading-relaxed text-white/65">{fsc.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={fsc.file!} variant="gold" icon="download" size="sm">Certificate PDF</Button>
                <Button href="/certificates/fsc-chain-of-custody/" variant="light" size="sm">Scope & details</Button>
              </div>
            </article>
            <div className="reveal rounded-2xl bg-white p-3 lg:col-span-7">
              <ul>
                {docRows.map((d) => (
                  <li key={d.slug} className="flex flex-col gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage text-forest"><Icon name="doc" className="h-[18px] w-[18px]" /></span>
                      <div>
                        <p className="font-semibold leading-snug text-charcoal">{d.title}</p>
                        <p className="mt-0.5 text-[.82rem] text-muted">{docClassLabel[d.docClass]} · {d.product}</p>
                      </div>
                    </div>
                    <div className="sm:min-w-[180px] sm:text-right"><DocAction d={d} /></div>
                  </li>
                ))}
              </ul>
              <div className="px-5 pb-3 pt-4">
                <Link href="/certificates/" className="link-arrow">All certificates & documents <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — EU MARKETS --------------------------------------------------------- */}
      <section className="panel on-dark bg-forest-3 text-white">
        <div className="wrap section grid gap-14 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="kicker text-gold">European markets</p>
            <h2 className="serif mt-5 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.08] text-white">Supplying plywood buyers across Europe</h2>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-white/72">
              Dedicated pages for eight priority markets, with the products, documents and procurement questions most relevant to each. We supply by container from Vietnam; there are no local offices or European stock.
            </p>
          </div>
          <ul className="reveal-stagger grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {markets.map((m) => (
              <li key={m.slug}>
                <Link href={`/eu/${m.slug}/`} className="group flex items-center justify-between gap-4 border-b border-white/12 py-5">
                  <span className="flex items-center gap-4">
                    <img src={`/flags/${m.code.toLowerCase()}.svg`} alt="" width={36} height={27} className="h-[27px] w-9 shrink-0 rounded-[4px] object-cover ring-1 ring-white/15" />
                    <span>
                    <span className="serif block text-[1.6rem] leading-tight text-white transition-colors group-hover:text-gold">{m.name}</span>
                    <span className="text-[.85rem] text-white/50">{m.native}</span>
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest-3">
                    <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — CTA ---------------------------------------------------------------- */}
      <section className="panel bg-sand">
        <div className="wrap section">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 className="serif text-[clamp(2.2rem,1.5rem+2.6vw,3.75rem)] font-normal leading-[1.05]">Looking for a reliable plywood supply partner?</h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
              Share your requirements and receive product information and a tailored quotation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/request-a-quote/">Request a quote</Button>
              <Button href={`mailto:${site.email}?subject=Plywood%20enquiry`} variant="outline" icon="mail">Email sales</Button>
            </div>
            <p className="mt-6 text-[.9rem] text-muted">
              <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a> · <a className="underline-offset-4 hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Photo({ name, cls, caption }: { name: string; cls: string; caption: string }) {
  return (
    <figure className={`reveal-img zoom-parent group relative overflow-hidden rounded-2xl bg-forest ${cls}`}>
      <Img name={name} alt={caption} sizes="(min-width:768px) 50vw, 100vw" className="zoom-img absolute inset-0 h-full w-full object-cover" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[.8rem] font-semibold text-forest backdrop-blur">{caption}</figcaption>
    </figure>
  );
}
