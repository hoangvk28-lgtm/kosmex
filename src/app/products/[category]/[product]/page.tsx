import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { Applications, Documents, GenericImageNote, Overview, ProductHero, QualityBlock, Related, rfqFor, SiblingNav, Specs, SubNav } from "@/components/product";
import { JsonLd } from "@/components/ui";
import { imgSrc } from "@/components/Img";
import { allProducts, getCategory, getProduct, productHref } from "@/content/products";
import { docsForProduct } from "@/content/documents";
import { pageMeta, productLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => allProducts.map((p) => ({ category: p.parent, product: p.slug }));

const load = async (params: Promise<{ category: string; product: string }>) => {
  const { category, product } = await params;
  const p = getProduct(product);
  return p && p.parent === category ? p : undefined;
};

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const p = await load(params);
  if (!p) return {};
  return pageMeta({ title: p.name, description: `${p.intro} Specifications, documents and quotation from Kosmex Plywood.`.slice(0, 158), path: productHref(p.slug) });
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const p = await load(params);
  if (!p) notFound();
  const c = getCategory(p.parent)!;
  const docs = docsForProduct(p.slug, c.slug);

  return (
    <>
      <ProductHero
        crumbs={[{ name: "Products", href: "/products/" }, { name: c.name, href: productHref(c.slug) }, { name: p.navLabel, href: productHref(p.slug) }]}
        kicker={p.kicker}
        title={p.name}
        intro={p.intro}
        benefits={p.strengths}
        application={p.applications.map((a) => a.title).join(" · ")}
        image={p.image}
        imageAlt={p.imageAlt}
        rfqHref={rfqFor(p.slug)}
        datasheet={docs.find((d) => d.docClass === "tds")}
        provisional={p.provisional}
      />
      <SubNav />
      <div className="wrap pt-8">
        <p className="mb-3 text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">Also in {c.name}</p>
        <SiblingNav current={p.slug} items={c.children.map((x) => ({ slug: x.slug, label: x.navLabel, href: productHref(x.slug) }))} />
        {p.imageIsGeneric && <GenericImageNote />}
      </div>
      <Overview paragraphs={p.overview} strengths={p.strengths} considerations={p.considerations} />
      <Specs rows={p.specs} name={p.name} />
      <Applications items={p.applications} image={p.image} imageAlt={p.imageAlt} />
      <QualityBlock />
      <Documents docs={docs} />
      <Related slugs={p.related} />
      <CTASection title={`Request a quote for ${p.name}`} text="The product is preselected on the RFQ form. Add thickness, size, quantity and destination port." rfqHref={rfqFor(p.slug)} />
      <JsonLd
        data={productLd({
          name: p.name,
          description: p.intro,
          href: productHref(p.slug),
          image: imgSrc(p.image),
          category: c.name,
          props: p.specs.filter((s) => s.status !== "pending" && s.value).slice(0, 8).map((s) => ({ name: s.label, value: s.value! })),
        })}
      />
    </>
  );
}
