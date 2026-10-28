import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";
import { AntiSlipVariant, FilmHero, GradeComparison, WhyBranded } from "@/components/film";
import { Applications, Documents, Overview, ProductHero, QualityBlock, Related, rfqFor, Specs, SubNav } from "@/components/product";
import { JsonLd, SectionHeading } from "@/components/ui";
import { imgSrc } from "@/components/Img";
import { categories, getCategory } from "@/content/products";
import { docsForProduct } from "@/content/documents";
import { pageMeta, productLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) return {};
  return pageMeta({
    title: c.flagship ? "KOSMEX Film Faced Plywood — Branded Formwork Plywood" : `${c.name} from Vietnam`,
    description: `${c.intro} Specifications, documents and quotation.`.slice(0, 158),
    path: `/products/${c.slug}/`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const docs = docsForProduct(c.slug);
  const crumbs = [{ name: "Products", href: "/products/" }, { name: c.name, href: `/products/${c.slug}/` }];
  const related = categories.filter((x) => x.slug !== c.slug).map((x) => x.slug);

  return (
    <>
      {c.flagship ? (
        <FilmHero />
      ) : (
        <ProductHero
          crumbs={crumbs}
          kicker={`Product range · 0${c.order}`}
          title={c.name}
          intro={c.intro}
          benefits={c.benefits}
          application={c.primaryApplication}
          image={c.image}
          imageAlt={c.imageAlt}
          rfqHref={rfqFor(c.slug)}
          datasheet={docs.find((d) => d.docClass === "tds")}
        />
      )}
      <SubNav />

      <section className="section-sm bg-white">
        <div className="wrap">
          <SectionHeading
            align="split"
            eyebrow={c.flagship ? "Grades" : "In this range"}
            title={c.flagship ? "Film faced grades" : `${c.name} products`}
            lede={c.flagship ? "Three grades for different formwork demands. Grade names are provisional." : "Each product has its own specification page."}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.children.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <Overview paragraphs={c.overview} strengths={c.benefits} considerations={c.flagship ? ["Re-use depends on handling, release agent and pour type", "Specify grade per application", "Reseal cut edges on site"] : ["Grade, glue and emission class are agreed per order", "Range TDS pending publication"]} />
      {c.flagship && <GradeComparison />}
      <Specs rows={c.specs} name={c.name} />
      {c.flagship && <AntiSlipVariant />}
      {c.flagship && <WhyBranded />}
      <Applications items={c.applications} image={c.flagship ? "ffp-branded-panels" : c.image} imageAlt={c.imageAlt} />
      <QualityBlock />
      <Documents docs={docs} />
      <Related slugs={related} />
      <CTASection title={`Request a quote for ${c.name}`} text="Tell us thickness, size, grade, quantity and destination port. The product is preselected on the form." rfqHref={rfqFor(c.slug)} />

      <JsonLd
        data={productLd({
          name: c.flagship ? "KOSMEX Film Faced Plywood" : c.name,
          description: c.intro,
          href: `/products/${c.slug}/`,
          image: imgSrc(c.image),
          category: "Plywood",
          props: c.specs.filter((s) => s.status !== "pending" && s.value).slice(0, 8).map((s) => ({ name: s.label, value: s.value! })),
        })}
      />
    </>
  );
}
