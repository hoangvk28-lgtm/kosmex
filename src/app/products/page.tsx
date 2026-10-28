import Link from "next/link";
import { CategoryCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";
import { PageHero, SectionHeading } from "@/components/ui";
import { categories, productHref } from "@/content/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Plywood Products",
  description:
    "Kosmex Plywood ranges: Film Faced Plywood (flagship), Furniture Plywood, Upholstery Plywood and Packing Plywood. Specifications, documents and RFQ.",
  path: "/products/",
});

export default function ProductsPage() {
  const [film, ...rest] = categories;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", href: "/products/" }]}
        eyebrow="Product portfolio"
        title="Choose the right plywood"
        lede="Four product families, each with a structured technical specification, documented sources and a direct path to quotation."
      />
      <section className="section-sm">
        <div className="wrap">
          <CategoryCard c={film} large priority />
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {rest.map((c) => <CategoryCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Product index" title="All products" lede="Every range and product has its own page and URL." />
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div key={c.slug}>
                <Link href={productHref(c.slug)} className="font-display text-lg font-bold text-forest hover:underline underline-offset-4">
                  <span className="mr-2 text-gold-2">0{c.order}</span>{c.name}
                </Link>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {c.children.map((p) => (
                    <li key={p.slug}>
                      <Link href={productHref(p.slug)} className="flex items-center justify-between py-3 text-[.95rem] text-charcoal/85 hover:text-forest">
                        {p.navLabel}<span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
