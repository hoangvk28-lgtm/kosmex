import { categories, allProducts, productHref } from "@/content/products";
import { markets } from "@/content/markets";
import { qualityPages } from "@/content/quality";
import { documents } from "@/content/documents";
import { articles, resourceSections } from "@/content/resources";

/** Every indexable public route. Used by sitemap.xml and the IndexNow script. */
export function allRoutes(): string[] {
  return [
    "/",
    "/products/",
    ...categories.map((c) => productHref(c.slug)),
    ...allProducts.map((p) => productHref(p.slug)),
    "/eu/",
    ...markets.map((m) => `/eu/${m.slug}/`),
    ...qualityPages.map((q) => (q.slug ? `/quality/${q.slug}/` : "/quality/")),
    "/certificates/",
    ...documents.filter((d) => ["certification", "dop", "lab-test", "qc-report", "traceability"].includes(d.docClass)).map((d) => `/certificates/${d.slug}/`),
    "/manufacturing/",
    "/resources/",
    ...resourceSections.filter((r) => r.slug !== "knowledge-center").map((r) => `/resources/${r.slug}/`),
    ...articles.map((a) => `/resources/articles/${a.slug}/`),
    "/about/",
    "/contact/",
    "/request-a-quote/",
  ];
}
