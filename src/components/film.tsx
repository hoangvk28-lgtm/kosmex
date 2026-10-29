import { Img } from "./Img";
import { Icon } from "./Icon";
import { TechnicalTable } from "./TechnicalTable";
import { Breadcrumbs, Button, PendingNote, SectionHeading, StatusBadge, StatusLegend } from "./ui";
import type { Status } from "@/content/site";
import type { SpecRow } from "@/content/products";
import { getDoc } from "@/content/documents";

/* Flagship hero (dark, branded) ------------------------------------------- */
export function FilmHero() {
  const tds = getDoc("tds-film-faced-plywood")!;
  return (
    <section className="on-dark relative overflow-hidden bg-forest-3 text-white">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="wrap relative pt-10 md:pt-14">
        <Breadcrumbs light items={[{ name: "Products", href: "/products/" }, { name: "Film Faced Plywood", href: "/products/film-faced-plywood/" }]} />
      </div>
      <div className="wrap relative grid items-center gap-8 pb-16 pt-8 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">Flagship range · 01</p>
          <h1 className="text-white">KOSMEX Film Faced Plywood</h1>
          <p className="mt-4 font-display text-xl font-semibold text-gold">Built for performance. Recognised by our brand.</p>
          <p className="lede mt-6 max-w-xl">
            Phenolic film faced formwork plywood on acacia and eucalyptus hardwood cores, with the KOSMEX logo printed directly on the film surface.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Logo-printed film for site identification", "120 · 180 · 220 g/m² film options", "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm or customised", "EN-method laboratory test reports"].map((b) => (
              <li key={b} className="flex gap-3 text-[.95rem] text-white/90">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2.4} />{b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/request-a-quote/?product=film-faced-plywood" variant="gold">Request a Quote</Button>
            <Button href={tds.file!} variant="light" icon="download">Download Datasheet</Button>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative h-[340px] overflow-hidden rounded-2xl sm:h-[460px] lg:h-[560px]">
            <Img name="ffp-render-green" alt="KOSMEX film faced plywood panel with the logo printed across the film" priority sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Grade comparison --------------------------------------------------------- */
type Cell = { v?: string; s: Status };
const P: Cell = { s: "pending" };
const D = (v: string): Cell => ({ v, s: "declared" });

const grades = [
  { slug: "economy-grade", name: "Economy", tds: "Eco Form" },
  { slug: "standard-grade", name: "Standard", tds: "—" },
  { slug: "premium-grade", name: "Premium", tds: "Premium Form" },
];

const comparison: { attr: string; cells: [Cell, Cell, Cell] }[] = [
  { attr: "Core composition", cells: [D("Acacia"), P, D("Acacia / eucalyptus mix")] },
  { attr: "Film weight", cells: [D("120 g/m², black / brown"), P, D("180 g/m², black / brown")] },
  { attr: "Glue specification", cells: [D("MUF"), P, D("MUF / PF")] },
  { attr: "Bonding performance", cells: [D("BR-6h boil resistant"), P, D("EN 314-2 Class 2 & 3")] },
  { attr: "Bending strength L / W (EN 310)", cells: [D("40 / 30 N/mm²"), P, { v: "49 / 47 N/mm² · test report", s: "verified" }] },
  { attr: "Thickness options", cells: [P, P, P] },
  { attr: "Surface quality", cells: [D("Smooth phenolic film"), P, D("Smooth phenolic film")] },
  { attr: "Recommended application", cells: [D("Short-cycle formwork, foundations"), P, D("Repeated-cycle building formwork")] },
  { attr: "Available documentation", cells: [D("TDS (Oct 2025)"), P, { v: "TDS + EN 310 test report", s: "verified" }] },
];

// Range-wide rows already shown per grade in the comparison table.
const IN_COMPARISON = ["Core species", "Film weight", "Glue type", "Bonding classification", "Thickness options"];

export function GradeComparison({ rows }: { rows: SpecRow[] }) {
  const rangeRows = rows.filter((r) => !IN_COMPARISON.includes(r.label));
  return (
    <section id="specifications" className="section scroll-mt-40 bg-ivory-2">
      <div className="wrap">
        <SectionHeading
          align="split"
          eyebrow="Specifications & grades"
          title="Three grades, one specification"
          lede="Economy and Premium map to the Eco Form and Premium Form columns of the Kosmex Technical Data Sheet. Standard has no published specification yet."
        />
        <div className="table-scroll mt-12 rounded-2xl border border-line bg-white">
          <table className="spec-table min-w-[780px]">
            <caption className="sr-only">Film faced plywood grade comparison</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[24%]">Attribute</th>
                {grades.map((g) => (
                  <th scope="col" key={g.slug}>
                    <a href={`/products/film-faced-plywood/${g.slug}/`} className="block font-display text-[.95rem] normal-case tracking-normal text-forest hover:underline underline-offset-4">{g.name} Grade →</a>
                    <span className="mt-1 block text-[.65rem] normal-case tracking-normal text-stone">TDS: {g.tds}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((r) => (
                <tr key={r.attr}>
                  <th scope="row">{r.attr}</th>
                  {r.cells.map((c, i) => (
                    <td key={i}>
                      {c.s === "pending" ? <span className="pending-value">To be confirmed</span> : <span className="block">{c.v}</span>}
                      {c.s === "verified" && <span className="mt-1.5 block"><StatusBadge status="verified" /></span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-14 text-[1.25rem]">Range-wide specification</h3>
        <div className="mt-6"><TechnicalTable rows={rangeRows} caption="Film faced plywood range-wide specifications" legend={false} /></div>
        <StatusLegend className="mt-5" />
        <PendingNote className="mt-6">
          Grade names (Economy / Standard / Premium) are provisional until Kosmex confirms its commercial grade structure. Re-use cycles are deliberately left out: the TDS gives an indicative figure, but no test evidence has been published.
        </PendingNote>
      </div>
    </section>
  );
}

/* Why branded --------------------------------------------------------------- */
export function WhyBranded() {
  const points = [
    { t: "Product identification", d: "The KOSMEX mark is printed into the film across the full 1250 × 2500 mm panel in a repeating diagonal layout. It stays readable on offcuts and partial sheets." },
    { t: "Quality consistency", d: "Branded panels go through the same documented inspection stages: thickness and dimensional checks, moisture control and bonding checks before shipment." },
    { t: "Traceability", d: "A visible manufacturer mark links a panel on site back to its supplier, specification and batch documents. Batch QC reports are available per shipment." },
    { t: "Brand value for distributors", d: "Distributors can stock a recognisable, documented brand instead of an anonymous commodity panel. Private-label options are open for discussion." },
  ];
  return (
    <section id="why-branded" className="on-dark relative overflow-hidden bg-forest text-white">
      <div className="wrap section grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Img name="ffp-factory-stacks" alt="Tape measure across a KOSMEX-printed black film faced panel during inspection" sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="film-surface absolute -bottom-8 -right-6 hidden h-48 w-32 shadow-2xl md:block" aria-hidden />
            <figcaption className="mt-4 text-[.8rem] text-white/55">Finished KOSMEX film faced panels in our factory; the K KOSMEX film artwork is shown inset.</figcaption>
          </figure>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">Brand assurance</p>
          <h2 className="text-white">Why Kosmex branded film faced plywood?</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2">
            {points.map((p, i) => (
              <div key={p.t} className="bg-forest p-7">
                <span className="font-display text-[.8rem] font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-[1.15rem] text-white">{p.t}</h3>
                <p className="mt-2.5 text-[.93rem] leading-relaxed text-white/72">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Anti-slip variant -------------------------------------------------------- */
export function AntiSlipVariant() {
  return (
    <section className="section-sm bg-ivory-2">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Surface variant</p>
          <h2 className="text-[length:var(--text-h3)]">Anti-slip film (hexagon / rice pattern)</h2>
          <p className="mt-4 max-w-2xl text-muted">
            A 220 g/m² anti-slip film for truck, trailer and container flooring and walkways. It is listed in the Kosmex TDS alongside the Eco and Premium grades and has two independent test reports.
          </p>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-5">
          <div className="bg-white p-5">
            <dt className="text-[.68rem] font-bold uppercase tracking-[.14em] text-stone">Anti-slip · DIN 51130</dt>
            <dd className="mt-1 font-display text-xl font-bold text-forest">18.0° · R10</dd>
            <dd className="mt-1"><StatusBadge status="verified" /></dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-[.68rem] font-bold uppercase tracking-[.14em] text-stone">Abrasion · EN 438-2</dt>
            <dd className="mt-1 font-display text-xl font-bold text-forest">680 rev.</dd>
            <dd className="mt-1"><StatusBadge status="verified" /></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
