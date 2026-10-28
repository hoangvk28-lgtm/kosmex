import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { ArticleCard, fmtDate, sectionTitle } from "@/components/resources";
import { ArrowLink, Breadcrumbs, JsonLd } from "@/components/ui";
import { articles, getArticle } from "@/content/resources";
import { productHref, productName } from "@/content/products";
import { articleLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.title.split(":")[0], description: a.description, path: `/resources/articles/${a.slug}/`, type: "article" });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug && x.section === a.section).concat(articles.filter((x) => x.slug !== a.slug && x.section !== a.section)).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-ivory">
          <div className="wrap max-w-4xl pb-12 pt-10 md:pt-14">
            <Breadcrumbs items={[{ name: "Resources", href: "/resources/" }, { name: sectionTitle(a.section), href: `/resources/${a.section}/` }, { name: a.title, href: `/resources/articles/${a.slug}/` }]} />
            <p className="eyebrow mb-5 mt-10">{sectionTitle(a.section)}</p>
            <h1 className="text-[clamp(2rem,1.5rem+2vw,3.1rem)]">{a.title}</h1>
            <p className="lede mt-5">{a.description}</p>
            <p className="mt-6 text-[.85rem] text-stone"><time dateTime={a.date}>{fmtDate(a.date)}</time> · {a.readMinutes} min read · Kosmex Plywood</p>
          </div>
        </header>
        <div className="wrap max-w-4xl border-t border-line py-14">
          <div className="max-w-[68ch] space-y-10">
            {a.body.map((b) => (
              <section key={b.h}>
                <h2 className="text-[1.5rem]">{b.h}</h2>
                {b.p?.map((p) => <p key={p} className="mt-4 text-[1.05rem] leading-[1.75] text-charcoal/85">{p}</p>)}
                {b.list && (
                  <ul className="mt-4 space-y-2.5">
                    {b.list.map((l) => <li key={l} className="flex gap-3 text-[1.02rem]"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" />{l}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <aside className="mt-14 border-t border-line pt-8">
            <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">Related products</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {a.relatedProducts.map((s) => <ArrowLink key={s} href={productHref(s)}>{productName(s)}</ArrowLink>)}
            </div>
          </aside>
        </div>
      </article>
      <section className="section-sm bg-white">
        <div className="wrap">
          <h2 className="text-[length:var(--text-h3)]">More resources</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <ArticleCard key={x.slug} a={x} />)}</div>
        </div>
      </section>
      <CTASection />
      <JsonLd data={articleLd({ title: a.title, description: a.description, href: `/resources/articles/${a.slug}/`, date: a.date })} />
    </>
  );
}
