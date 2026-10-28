import { CTASection } from "@/components/CTASection";
import { Img, ImageSlot } from "@/components/Img";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";
import { machines, qcStages } from "@/content/quality";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Manufacturing — Plywood Production in Vietnam",
  description: "Inside Kosmex plywood manufacturing: raw materials, veneer preparation, pressing, film laminating, quality checkpoints, warehouse, packaging and export preparation.",
  path: "/manufacturing/",
});

const gallery = [
  ["production-hall", "Production hall with parallel lay-up lines"],
  ["veneer-sorting-floor", "Veneer sorting and composing tables"],
  ["veneer-storage", "Dried veneer staged for production"],
  ["ffp-branded-panels", "Handling KOSMEX-printed film faced panels"],
  ["qc-bending-test", "Bending test on a KOSMEX panel"],
  ["birch-panel-stack", "Finished birch-faced panels"],
] as const;

export default function ManufacturingPage() {
  return (
    <>
      <section className="on-dark relative min-h-[560px] overflow-hidden bg-forest-3 text-white">
        <Img name="production-hall" alt="Kosmex plywood production hall with lay-up lines and workers" priority className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-3 via-forest-3/80 to-forest-3/20" />
        <div className="relative">
          <PageHeroInner />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Manufacturing overview" title="An integrated plywood process" />
          </div>
          <div className="space-y-5 text-[1.03rem] text-charcoal/85 lg:col-span-7">
            <p>Kosmex turns plantation hardwood logs into finished plywood: rotary peeling, veneer drying and sorting, glue spreading and composing, cold and hot pressing, trimming, sanding, film laminating and CNC finishing.</p>
            <p>The head office is in Hanoi. Company information names production in Yen Son, Tuyen Quang Province, and in Hung Yen Province, northern Vietnam.</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-forest lg:col-span-6">
            <Img name="veneer-storage" alt="Stacks of dried veneer in the raw material area" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Raw materials" title="Selected logs and veneers" lede="Log species, diameter and moisture content are checked before peeling. Veneer is dried to 8–12% moisture and sorted by thickness and surface before lay-up." />
            <ArrowLink href="/quality/material-core-expertise/" className="mt-6">Material & core expertise</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading align="split" eyebrow="Production process" title="Eight machine stages" lede="From log to finished, film-faced or CNC-cut panel." />
          <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {machines.map((m, i) => (
              <li key={m.name} className="bg-white p-7">
                <span className="font-display text-[.85rem] font-bold text-gold-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-[1.1rem]">{m.name}</h3>
                <p className="mt-2 text-[.92rem] text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section on-dark bg-forest text-white">
        <div className="wrap">
          <SectionHeading align="split" eyebrow="Quality checkpoints" title={<span className="text-white">Inspection built into the line</span>}>
            <ArrowLink href="/quality/qc-process/" className="mt-2">Full QC process</ArrowLink>
          </SectionHeading>
          <ol className="mt-12 grid gap-px bg-white/12 md:grid-cols-3">
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

      <section className="section">
        <div className="wrap">
          <SectionHeading align="split" eyebrow="Warehouse, packaging & export" title="Prepared for international transport" lede="Packaging for film faced plywood is declared in the Kosmex TDS as carton sheets and plastic straps. Labelling and loading follow each order." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[["Warehouse & storage", "Covered, flat storage of finished panels"], ["Packaging", "Carton sheets & plastic straps"], ["Pallet labelling", "Order and batch identification"], ["Container loading", "Export loading at origin"]].map(([t, d]) => (
              <figure key={t}>
                <ImageSlot label={t} className="aspect-[4/3]" />
                <figcaption className="mt-3"><span className="font-display font-bold text-forest">{t}</span><span className="block text-[.88rem] text-muted">{d}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Factory gallery" title="Inside Kosmex production" />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {gallery.map(([n, cap], i) => (
              <figure key={n} className={`group relative overflow-hidden bg-forest ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/3]"}`}>
                <Img name={n} alt={cap} sizes="(min-width:1024px) 33vw, 50vw" className="zoom-img absolute inset-0 h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-3/90 to-transparent p-4 pt-12 text-[.85rem] font-semibold text-white">{cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-[.82rem] text-muted">Photographs from Kosmex. Capacity, factory area and workforce figures are deliberately not stated until Kosmex verifies them.</p>
        </div>
      </section>
      <CTASection />
    </>
  );

  function PageHeroInner() {
    return (
      <div className="[&_section]:bg-transparent">
        <PageHero
          dark
          crumbs={[{ name: "Manufacturing", href: "/manufacturing/" }]}
          eyebrow={`Manufacturing · ${site.factory.lines[0]}`}
          title="Manufacturing excellence, from material to finished panel"
          lede="Peeling, drying, lay-up, pressing, film laminating and finishing in our production facilities in northern Vietnam."
        />
      </div>
    );
  }
}
