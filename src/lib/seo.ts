import type { Metadata } from "next";
import { SITE_URL, site } from "@/content/site";

export const absUrl = (path: string) => new URL(path, SITE_URL).toString();

export function pageMeta({
  title,
  description,
  path,
  image = "/og-kosmex-plywood.jpg",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Kosmex Plywood`,
      description,
      url: path,
      siteName: "Kosmex Plywood",
      type,
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: "KOSMEX film faced plywood print pattern" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Kosmex Plywood`, description, images: [image] },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: site.brand,
  legalName: site.legalName,
  url: SITE_URL,
  logo: absUrl("/icon-512.png"),
  email: site.email,
  telephone: site.phoneDisplay.replace(/\s/g, ""),
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.office.lines[0],
    addressLocality: "Hanoi",
    addressCountry: "VN",
  },
  sameAs: [site.corporateSite],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Kosmex Plywood",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

export const breadcrumbLd = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.href) })),
});

/** Product schema: only factual properties; no price, rating or availability. */
export const productLd = (p: { name: string; description: string; href: string; image: string; category: string; props?: { name: string; value: string }[] }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  url: absUrl(p.href),
  image: absUrl(p.image),
  category: p.category,
  brand: { "@type": "Brand", name: "KOSMEX" },
  manufacturer: { "@id": `${SITE_URL}/#organization` },
  countryOfOrigin: "VN",
  ...(p.props?.length ? { additionalProperty: p.props.map((x) => ({ "@type": "PropertyValue", name: x.name, value: x.value })) } : {}),
});

export const articleLd = (a: { title: string; description: string; href: string; date: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  url: absUrl(a.href),
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  image: absUrl("/og-kosmex-plywood.jpg"),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
