/**
 * Document library. Only entries with `file` are real, published Kosmex
 * documents (downloaded from kosmexgroup.com and checked page by page).
 * Everything else is a slot: "on-request" or "pending" — never shown as held.
 */
export type DocClass =
  | "tds"
  | "specification"
  | "qc-report"
  | "lab-test"
  | "certification"
  | "dop"
  | "traceability"
  | "catalogue";

export type Availability = "download" | "on-request" | "pending";

export interface Doc {
  slug: string;
  title: string;
  docClass: DocClass;
  product: string; // display category
  productSlugs: string[]; // product slugs it relates to ("*" = all)
  language: string;
  revision?: string;
  availability: Availability;
  file?: string;
  issuer?: string;
  reference?: string;
  summary: string;
  facts?: { label: string; value: string }[];
  caveat?: string;
}

export const docClassLabel: Record<DocClass, string> = {
  tds: "Technical Data Sheet",
  specification: "Product Specification",
  "qc-report": "QC Report",
  "lab-test": "Laboratory Test Report",
  certification: "Third-party Certification",
  dop: "Declaration of Performance",
  traceability: "Traceability Record",
  catalogue: "Product Catalogue",
};

export const availabilityLabel: Record<Availability, string> = {
  download: "Download PDF",
  "on-request": "Available on request",
  pending: "Pending publication",
};

const FFP = ["film-faced-plywood", "economy-grade", "standard-grade", "premium-grade"];

export const documents: Doc[] = [
  {
    slug: "tds-film-faced-plywood",
    title: "Technical Data Sheet — Film Faced Plywood",
    docClass: "tds",
    product: "Film Faced Plywood",
    productSlugs: FFP,
    language: "English",
    revision: "Oct 2025",
    availability: "download",
    file: "/documents/kosmex-tds-film-faced-plywood-2025-10.pdf",
    issuer: "Kosmex Co., Ltd.",
    summary:
      "Manufacturer data for Eco Form, Premium Form and Anti-slip Form film faced plywood: film, core, glue, bonding, emission class, moisture, density, tolerances and bending properties.",
    caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed.",
  },
  {
    slug: "test-report-bending-film-faced-18mm",
    title: "Bending Strength & MOE Test — 18 mm, 13-ply (EN 310)",
    docClass: "lab-test",
    product: "Film Faced Plywood",
    productSlugs: [...FFP],
    language: "English",
    revision: "11 Sep 2025",
    availability: "download",
    file: "/documents/test-report-bending-film-faced-18mm-2025-09.pdf",
    issuer: "T&T Laboratory, Hanoi",
    reference: "06/MCI.AHK/IV/25",
    summary: "Bending strength and modulus of elasticity of an 18 mm, 13-ply MUF-bonded sample, tested to EN 310.",
    facts: [
      { label: "Bending strength", value: "49 / 47.3 MPa (two directions, as reported)" },
      { label: "Modulus of elasticity", value: "6,470 / 5,670 MPa (as reported)" },
      { label: "Test method", value: "EN 310" },
      { label: "Sample", value: "18.0 mm, 13 plies, MUF glue" },
    ],
    caveat: "Results refer to the tested sample only (sample purpose: daily testing).",
  },
  {
    slug: "test-report-anti-slip-din-51130",
    title: "Anti-slip Property Test — DIN 51130",
    docClass: "lab-test",
    product: "Film Faced Plywood — Anti-slip surface",
    productSlugs: ["film-faced-plywood"],
    language: "Vietnamese / English",
    revision: "24 Sep 2025",
    availability: "download",
    file: "/documents/test-report-anti-slip-quatest3-2025-09.pdf",
    issuer: "QUATEST 3 — Quality Assurance & Testing Center 3",
    reference: "KT3-01466AXD5",
    summary: "Ramp test of anti-slip film faced plywood (18 mm samples) to DIN 51130:2014.",
    facts: [
      { label: "Acceptance angle (α)", value: "18.0° (average of 2 testers)" },
      { label: "Test method", value: "DIN 51130:2014" },
      { label: "Sample", value: "Anti-slip film faced plywood, 18 mm" },
    ],
    caveat: "18.0° falls within the R10 band (10°–19°) of DIN 51130. Results refer to the submitted samples only.",
  },
  {
    slug: "test-report-abrasion-en-438-2",
    title: "Abrasion Resistance Test — EN 438-2",
    docClass: "lab-test",
    product: "Film Faced Plywood — Anti-slip surface",
    productSlugs: ["film-faced-plywood"],
    language: "English",
    revision: "13 Sep 2025",
    availability: "download",
    file: "/documents/test-report-abrasion-anti-slip-2025-09.pdf",
    issuer: "T&T Laboratory, Hanoi",
    reference: "11/MCI.AHV/IV/25",
    summary: "Taber-type abrasion resistance of an anti-slip film surface, 200 × 200 × 18 mm sample, 13 plies.",
    facts: [
      { label: "Abrasion resistance", value: "680 revolutions (anti-slip surface)" },
      { label: "Test method", value: "EN 438-2:2016" },
    ],
    caveat: "Results refer to the tested sample only.",
  },
  {
    slug: "test-report-bending-plywood-12mm",
    title: "Bending Strength Test — 12 mm, 7-ply (JAS 0233-2)",
    docClass: "lab-test",
    product: "Plywood (12 mm sample)",
    productSlugs: ["packing-plywood", "furniture-plywood"],
    language: "English",
    revision: "26 Mar 2025",
    availability: "download",
    file: "/documents/test-report-bending-plywood-12mm-2025-03.pdf",
    issuer: "T&T Laboratory, Hanoi",
    reference: "23/MCI.AHA/I/25",
    summary: "Bending strength of a 12 mm, 7-ply MUF-bonded plywood sample, tested to JAS 0233-2. Published by Kosmex as a commercial plywood test.",
    facts: [
      { label: "Bending strength", value: "50.0 MPa along / 43.5 MPa across" },
      { label: "Test method", value: "JAS 0233-2" },
    ],
    caveat: "Kosmex to confirm which current product range this sample represents.",
  },
  {
    slug: "fsc-chain-of-custody",
    title: "FSC® Chain of Custody Certificate",
    docClass: "certification",
    product: "Company — trading of FSC-certified wood products",
    productSlugs: ["*"],
    language: "English",
    revision: "Issued 29 Sep 2025",
    availability: "download",
    file: "/documents/kosmex-fsc-coc-certificate-bv-coc-220900.pdf",
    issuer: "Bureau Veritas Certification Holding SAS",
    reference: "BV-COC-220900",
    summary:
      "Kosmex Company Limited (Hanoi) holds FSC Chain of Custody certification to FSC-STD-40-004 V3-1 for trading of wood products certified FSC 100% and FSC Mix.",
    facts: [
      { label: "Certificate code", value: "BV-COC-220900" },
      { label: "Certificate no. / version", value: "VN013989/1" },
      { label: "Standard", value: "FSC-STD-40-004 V3-1" },
      { label: "Scope", value: "Trading of wooden products certified FSC 100% and FSC Mix" },
      { label: "Valid", value: "24 Sep 2025 – 23 Sep 2030" },
      { label: "Type", value: "Single" },
    ],
    caveat:
      "The certificate alone does not make a product FSC-certified. Only products sold with an FSC claim on the invoice and delivery documents are covered. Verify current status at info.fsc.org.",
  },
  // ---- Slots: not yet published -------------------------------------------
  { slug: "tds-furniture-plywood", title: "Technical Data Sheet — Furniture Plywood", docClass: "tds", product: "Furniture Plywood", productSlugs: ["furniture-plywood", "birch-plywood", "eucalyptus-plywood", "poplar-plywood", "ev-plywood"], language: "English", availability: "pending", summary: "Species, grades, glue, thickness range, tolerances and emission class per furniture range." },
  { slug: "tds-upholstery-plywood", title: "Technical Data Sheet — Upholstery Plywood", docClass: "tds", product: "Upholstery Plywood", productSlugs: ["upholstery-plywood", "upholstery-plywood-overview", "sofa-frame-applications", "bed-frame-bed-slat-applications"], language: "English", availability: "pending", summary: "Lay-up, thickness, bonding and machining guidance for frame components and slats." },
  { slug: "tds-packing-plywood", title: "Technical Data Sheet — Packing Plywood", docClass: "tds", product: "Packing Plywood", productSlugs: ["packing-plywood", "raw-acacia-plywood", "raw-eucalyptus-plywood", "styrax-okoume-bintangor-plywood"], language: "English", availability: "pending", summary: "Species, glue, thickness, panel sizes and moisture limits for packing grades." },
  { slug: "spec-film-faced-grades", title: "Product Specification — Film Faced Grades", docClass: "specification", product: "Film Faced Plywood", productSlugs: FFP, language: "English", availability: "on-request", summary: "Order-level specification sheet confirming grade, film, thickness, size and edge sealing." },
  { slug: "qc-report-batch", title: "Batch QC Inspection Report", docClass: "qc-report", product: "All products", productSlugs: ["*"], language: "English", availability: "on-request", summary: "Per-shipment record of dimensional, moisture, surface and bonding checks against agreed acceptance criteria." },
  { slug: "test-report-formaldehyde", title: "Formaldehyde Emission Test Report", docClass: "lab-test", product: "Film Faced / Furniture Plywood", productSlugs: ["*"], language: "English", availability: "pending", summary: "Emission class (E1/E2 declared in the TDS) requires a published report naming method and sample." },
  { slug: "test-report-bonding-en-314", title: "Bonding Quality Test Report — EN 314", docClass: "lab-test", product: "Film Faced Plywood", productSlugs: FFP, language: "English", availability: "pending", summary: "Bond class per EN 314-1/-2 for the declared film faced grades." },
  { slug: "dop-ce-anti-slip", title: "Declaration of Performance / CE marking", docClass: "dop", product: "Film Faced Plywood", productSlugs: FFP, language: "English", availability: "pending", summary: "kosmexgroup.com refers to CE 2+ for anti-slip film faced plywood. The DoP and notified-body certificate have not been published." },
  { slug: "traceability-legal-sourcing", title: "Legal Sourcing & Traceability File", docClass: "traceability", product: "All products", productSlugs: ["*"], language: "English", availability: "on-request", summary: "Species, origin and supplier documentation supporting buyers' due-diligence obligations." },
  { slug: "catalogue-kosmex-plywood", title: "Kosmex Plywood Product Catalogue", docClass: "catalogue", product: "All products", productSlugs: ["*"], language: "English", availability: "pending", summary: "Complete product catalogue for the four Kosmex Plywood ranges." },
];

export const getDoc = (slug: string) => documents.find((d) => d.slug === slug);

export const docsForProduct = (slug: string, parent?: string) =>
  documents.filter(
    (d) => d.productSlugs.includes("*") || d.productSlugs.includes(slug) || (parent ? d.productSlugs.includes(parent) : false),
  );
