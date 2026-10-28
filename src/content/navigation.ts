import { categories, productHref } from "./products";
import { markets } from "./markets";
import { qualityPages } from "./quality";
import { resourceSections } from "./resources";

export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}
export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
  flagship?: boolean;
}
export interface NavItem {
  label: string;
  href: string;
  menu?: "products" | "list";
  groups?: NavGroup[];
  links?: NavLink[];
}

export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/products/",
    menu: "products",
    groups: categories.map((c) => ({
      label: `${c.order}. ${c.name}`,
      href: productHref(c.slug),
      flagship: c.flagship,
      links: c.children.map((p) => ({ label: p.navLabel, href: productHref(p.slug) })),
    })),
  },
  {
    label: "EU Markets",
    href: "/eu/",
    menu: "list",
    links: markets.map((m) => ({ label: m.name, href: `/eu/${m.slug}/`, desc: m.native })),
  },
  {
    label: "Quality",
    href: "/quality/",
    menu: "list",
    links: [
      ...qualityPages.map((q) => ({ label: q.title, href: q.slug ? `/quality/${q.slug}/` : "/quality/", desc: q.text })),
      { label: "Certificates & Documents", href: "/certificates/", desc: "FSC® certificate, test reports and document status" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/",
    menu: "list",
    links: resourceSections.map((r) => ({
      label: r.title,
      href: r.slug === "knowledge-center" ? "/resources/" : `/resources/${r.slug}/`,
      desc: r.text,
    })),
  },
  {
    label: "Company",
    href: "/about/",
    menu: "list",
    links: [
      { label: "About Us", href: "/about/", desc: "Who Kosmex is and how we work" },
      { label: "Manufacturing", href: "/manufacturing/", desc: "Our production facilities in northern Vietnam" },
      { label: "Contact", href: "/contact/", desc: "Sales email, phone and WhatsApp" },
    ],
  },
];
