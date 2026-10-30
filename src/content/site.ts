/**
 * Company-level facts. Every value here was taken from kosmexgroup.com or
 * a Kosmex-issued document (Oct 2026 audit). Items marked `confirm` must be
 * re-checked by Kosmex before launch — see CLIENT-CHECKLIST.md.
 */
export const SITE_URL = "https://www.kosmexplywood.com"; // confirm: final production domain

export const site = {
  brand: "KOSMEX PLYWOOD",
  legalName: "KOSMEX COMPANY LIMITED",
  shortLegal: "KOSMEX CO., LTD.",
  tagline: "The leading plywood factory & exporter in Vietnam.",
  description:
    "Kosmex Plywood manufactures film faced, furniture, upholstery and packing plywood in Vietnam for European importers, distributors and manufacturers.",
  founded: "2010", // per kosmexgroup.com "About"; confirm
  office: {
    label: "Head office",
    lines: ["No. 5, Lane 205/37/26 Xuan Dinh Street", "Xuan Dinh Ward, Hanoi, Vietnam"],
  },
  factory: {
    label: "Production",
    // kosmexgroup.com names Tuyen Quang (Yen Son) and Hung Yen provinces.
    lines: ["Yen Son, Tuyen Quang Province", "Vietnam"],
  },
  email: "anna@kosmexgroup.com",
  phoneDisplay: "+84 399 741 589",
  // Phone links open WhatsApp (client request).
  phoneHref: "https://wa.me/84399741589",
  // kosmexgroup.com links wa.me/0399741589 (missing country code). Normalised
  // to +84 here; confirm this is the official sales WhatsApp line.
  whatsappHref: "https://wa.me/84399741589",
  // Personal sales profile published on kosmexgroup.com; no company page found.
  linkedinHref: "https://www.linkedin.com/in/anna-nguyen-kosmex/",
  linkedinLabel: "LinkedIn · Sales",
  corporateSite: "https://kosmexgroup.com/",
} as const;

export type Status = "verified" | "declared" | "pending";

export const statusLabel: Record<Status, string> = {
  verified: "Test report",
  declared: "Kosmex declared",
  pending: "To be confirmed",
};

export const statusHelp: Record<Status, string> = {
  verified: "Supported by a published laboratory test report (tested sample only).",
  declared: "Published by Kosmex (Technical Data Sheet or kosmexgroup.com). Not independently tested.",
  pending: "Placeholder awaiting Kosmex-approved data. Not a commercial specification.",
};
