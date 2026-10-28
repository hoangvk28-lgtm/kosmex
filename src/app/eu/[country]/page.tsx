import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard, DocumentCard } from "@/components/cards";
import { ProductCycle } from "@/components/ProductCycle";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { ArrowLink, Button, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { getMarket, markets } from "@/content/markets";
import { getCategory, getProduct } from "@/content/products";
import { getDoc } from "@/content/documents";
import { getArticle } from "@/content/resources";
import { faqLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => markets.map((m) => ({ country: m.slug }));

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const m = getMarket((await params).country);
  if (!m) return {};
  return pageMeta({ title: `Plywood Supplier for ${m.name}`, description: m.intro.slice(0, 158), path: `/eu/${m.slug}/` });
}

export default async function MarketPage({ params }: { params: Promise<{ country: string }> }) {
  const m = getMarket((await params).country);
  if (!m) notFound();
  const docs = m.documents.map(getDoc).filter(Boolean) as NonNullable<ReturnType<typeof getDoc>>[];
  const article = getArticle(m.article);
  const focusCats = m.focusProducts.map((s) => getCategory(s) ?? getCategory(getProduct(s)?.parent ?? "")).filter(Boolean);

  return (
    <>
      <PageHero
        dark
        crumbs={[{ name: "EU Markets", href: "/eu/" }, { name: m.name, href: `/eu/${m.slug}/` }]}
        eyebrow={`${m.name} · ${m.native}`}
        title={m.headline}
        lede={m.intro}
        aside={
          <div className="space-y-5">
            <div className="relative mx-auto w-full max-w-[520px] pb-6 pl-6">
              {/* Every range, cycling: any market can source any product */}
              <ProductCycle className="aspect-[5/4]" />
              {/* Waving flag badge */}
              <figure className="flag-wave absolute bottom-0 left-0 z-10 w-[38%] overflow-hidden rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,.7)] ring-4 ring-forest">
                <img src={`/flags/${m.code.toLowerCase()}.svg`} alt={`Flag of ${m.name}`} width={640} height={480} className="aspect-[4/3] w-full object-cover" />
                <span aria-hidden className="flag-sheen absolute inset-0" />
              </figure>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/12 text-sm">
              <div className="bg-forest p-5">
                <dt className="text-[.65rem] font-bold uppercase tracking-[.16em] text-mint">Available ranges</dt>
                <dd className="mt-1.5 font-semibold">All four: film faced, furniture, upholstery, packing</dd>
              </div>
              <div className="bg-forest p-5">
                <dt className="text-[.65rem] font-bold uppercase tracking-[.16em] text-mint">Container gateways</dt>
                <dd className="mt-1.5 font-semibold">{m.gateways.join(" · ")}</dd>
              </div>
              <div className="col-span-2 bg-forest p-5">
                <dt className="text-[.65rem] font-bold uppercase tracking-[.16em] text-mint">Business language</dt>
                <dd className="mt-1.5 font-semibold">{m.language}</dd>
              </div>
            </dl>
          </div>
        }
      >
        <Button href={`/request-a-quote/?country=${m.code}`} variant="gold">Request a Quote</Button>
        <Button href="/products/" variant="light">Explore Products</Button>
      </PageHero>

      {/* Buyers */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Buyer overview" title={`Who we support in ${m.name}`} lede={m.focusReason} />
          </div>
          <ul className="lg:col-span-7">
            {m.buyerSegments.map((b, i) => (
              <li key={b} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 last:border-b">
                <span className="font-display text-[.85rem] font-bold text-gold-2">0{i + 1}</span>
                <span className="font-display text-[1.2rem] font-bold text-charcoal">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Recommended ranges" title={`Products for ${m.name}`} />
          <div className={`mt-12 grid gap-5 ${focusCats.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {focusCats.map((c) => <CategoryCard key={c!.slug} c={c!} />)}
          </div>
        </div>
      </section>

      {/* Procurement considerations */}
      <section className="section on-dark bg-forest text-white">
        <div className="wrap">
          <SectionHeading align="split" eyebrow="Procurement considerations" title={<span className="text-white">What to settle before ordering</span>} lede={`Practical points for buyers in ${m.name}, based on the documentation Kosmex can provide today.`} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/12 md:grid-cols-3">
            {m.considerations.map((c, i) => (
              <div key={c.title} className="bg-forest p-8">
                <span className="font-display text-[.8rem] font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-[1.2rem] text-white">{c.title}</h3>
                <p className="mt-3 text-[.95rem] leading-relaxed text-white/72">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section">
        <div className="wrap">
          <SectionHeading align="split" eyebrow="Documentation" title={`Documents buyers in ${m.name} ask for`} lede="Published documents can be downloaded now. Others are held per order or are pending publication.">
            <ArrowLink href="/certificates/" className="mt-6">Certificates & documents</ArrowLink>
          </SectionHeading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((d) => <DocumentCard key={d.slug} d={d} compact />)}
          </div>
        </div>
      </section>

      {/* FAQ + guide */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Buyer FAQ" title={`Questions from ${m.name}`} />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {m.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.08rem] font-bold text-charcoal">
                    {f.q}
                    <Icon name="chevron" className="mt-1 h-5 w-5 shrink-0 text-forest transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          {article && (
            <aside className="lg:col-span-5">
              <Link href={`/resources/articles/${article.slug}/`} className="group block rounded-2xl border border-line bg-ivory p-8 transition-colors hover:border-forest/40">
                <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-forest-2">Related guide</p>
                <h3 className="mt-3 text-[1.35rem]">{article.title}</h3>
                <p className="mt-3 text-[.95rem] text-muted">{article.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-forest">Read the guide <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
              <p className="mt-6 text-[.82rem] leading-relaxed text-muted">
                Container gateways are listed for orientation only. Kosmex does not operate local offices or stock in {m.name}, and delivery terms are agreed per order.
              </p>
            </aside>
          )}
        </div>
      </section>

      {/* Other markets */}
      <section className="section-sm">
        <div className="wrap">
          <p className="mb-4 text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">Other EU markets</p>
          <div className="flex flex-wrap gap-2">
            {markets.filter((x) => x.slug !== m.slug).map((x) => (
              <Link key={x.slug} href={`/eu/${x.slug}/`} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2.5 pr-4 text-[.88rem] font-semibold text-charcoal hover:border-forest hover:text-forest"><img src={`/flags/${x.code.toLowerCase()}.svg`} alt="" width={20} height={15} className="h-[15px] w-5 rounded-[3px] object-cover" />{x.name} →</Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Sourcing plywood for ${m.name}?`} rfqHref={`/request-a-quote/?country=${m.code}`} />
      <JsonLd data={faqLd(m.faqs)} />
    </>
  );
}
