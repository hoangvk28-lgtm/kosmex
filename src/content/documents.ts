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

const FFP = ["film-faced-plywood", "economy-grade", "medium-grade", "premium-grade"];

export const documents: Doc[] = [
  {
    slug: "tds-film-faced-plywood",
    title: "Technical Data Sheet — Film Faced Plywood",
    docClass: "tds",
    product: "Film Faced Plywood",
    productSlugs: FFP,
    language: "English",
    revision: "2026",
    availability: "download",
    file: "/documents/kosmex-tds-film-faced-anti-slip-2026.pdf",
    issuer: "Kosmex Co., Ltd.",
    summary:
      "Manufacturer data for Common, Medium, Premium and Anti-slip film faced plywood: film weight, core, glue, re-use cycles, bonding, emission class, moisture, density, tolerances and bending properties.",
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
  {
    slug: "test-report-formaldehyde",
    title: "Formaldehyde Emission Test — EN 717-1",
    docClass: "lab-test",
    product: "Plywood (9 mm, 5-ply sample)",
    productSlugs: ["furniture-plywood", "birch-plywood", "eucalyptus-plywood", "poplar-plywood", "ev-plywood", "upholstery-plywood", "upholstery-plywood-overview", "bed-frame-bed-slat-applications", "packing-plywood"],
    language: "English",
    revision: "5 Jun 2026",
    availability: "download",
    file: "/documents/test-report-formaldehyde-en717-1-2026-06.pdf",
    issuer: "T&T Laboratory, Hanoi (ISO/IEC 17025)",
    reference: "005/MC/II/26",
    summary: "Chamber test of formaldehyde emission from a 9 mm, 5-ply hardwood plywood sample (UF glue), to EN 717-1.",
    facts: [
      { label: "Formaldehyde emission", value: "0.022 mg/m³ (at 23 °C, 45% RH)" },
      { label: "Reference requirement", value: "0.124 mg/m³ (CEN report CR 213)" },
      { label: "Test method", value: "EN 717-1, 72 h" },
      { label: "Sample", value: "HWPW – VC & UF, 9.0 mm, 5 plies" },
    ],
    caveat: "Results refer to the tested sample only (sample purpose: daily testing).",
  },
  {
    slug: "catalogue-kosmex-plywood",
    title: "Kosmex Plywood Product Catalogue",
    docClass: "catalogue",
    product: "All products",
    productSlugs: ["*"],
    language: "English",
    availability: "download",
    file: "/documents/kosmex-plywood-catalogue.pdf",
    issuer: "Kosmex Co., Ltd.",
    summary: "Company profile, factories, general specifications and the film faced, furniture, construction plywood and bed slat ranges.",
  },
  { slug: "tds-ev-plywood", title: "Technical Data Sheet — EV Plywood", docClass: "tds", product: "Furniture Plywood — EV", productSlugs: ["ev-plywood", "furniture-plywood"], language: "English", revision: "2026", availability: "download", file: "/documents/kosmex-tds-ev-plywood-2026.pdf", issuer: "Kosmex Co., Ltd.", summary: "EV face, eucalyptus/acacia core, MR or WBP glue, 4.6–25 mm, tolerances, E0.5 emission, moisture and density.", caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed." },
  { slug: "tds-upholstery-plywood", title: "Technical Data Sheet — Upholstery Plywood", docClass: "tds", product: "Upholstery Plywood", productSlugs: ["upholstery-plywood", "upholstery-plywood-overview"], language: "English", revision: "2026", availability: "download", file: "/documents/kosmex-tds-upholstery-plywood-2026.pdf", issuer: "Kosmex Co., Ltd.", summary: "Pine CP/CP faces on eucalyptus core, MR glue, 12 mm reference panel, thickness tolerance, E0.5 emission, density and moisture.", caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed." },
  { slug: "tds-bed-slats", title: "Technical Data Sheet — Bed Slats", docClass: "tds", product: "Upholstery — Bed slats", productSlugs: ["bed-frame-bed-slat-applications", "upholstery-plywood"], language: "English", revision: "2026", availability: "download", file: "/documents/kosmex-tds-bed-slats-2026.pdf", issuer: "Kosmex Co., Ltd.", summary: "Rubberwood bed slats: sizes, tolerance, MR glue, density, emission class and moisture content.", caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed." },
  { slug: "tds-raw-eucalyptus-plywood", title: "Technical Data Sheet — Raw Eucalyptus Plywood", docClass: "tds", product: "Packing Plywood — Eucalyptus", productSlugs: ["raw-eucalyptus-plywood", "packing-plywood"], language: "English", revision: "2026", availability: "download", file: "/documents/kosmex-tds-raw-eucalyptus-plywood-2026.pdf", issuer: "Kosmex Co., Ltd.", summary: "Eucalyptus CP/CP raw plywood: 8–25 mm, MR/Melamine glue, density, tolerances, emission class and moisture.", caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed." },
  { slug: "tds-styrax-plywood", title: "Technical Data Sheet — Styrax Plywood", docClass: "tds", product: "Packing Plywood — Styrax", productSlugs: ["styrax-okoume-bintangor-plywood", "packing-plywood"], language: "English", revision: "2026", availability: "download", file: "/documents/kosmex-tds-styrax-plywood-2026.pdf", issuer: "Kosmex Co., Ltd.", summary: "Full-styrax lightweight plywood: 6–21 mm, MR glue, density, tolerances, E0.5 emission and moisture.", caveat: "Manufacturer declaration. Values are not third-party certified unless a separate test report is listed." },
  // ---- Slots: not yet published -------------------------------------------
  { slug: "spec-film-faced-grades", title: "Product Specification — Film Faced Grades", docClass: "specification", product: "Film Faced Plywood", productSlugs: FFP, language: "English", availability: "on-request", summary: "Order-level specification sheet confirming grade, film, thickness, size and edge sealing." },
  { slug: "qc-report-batch", title: "Batch QC Inspection Report", docClass: "qc-report", product: "All products", productSlugs: ["*"], language: "English", availability: "on-request", summary: "Per-shipment record of dimensional, moisture, surface and bonding checks against agreed acceptance criteria." },
  { slug: "dop-ce-anti-slip", title: "Declaration of Performance / CE marking", docClass: "dop", product: "Film Faced Plywood", productSlugs: FFP, language: "English", availability: "on-request", summary: "CE marking is available for film faced plywood when the buyer requires it. The DoP is sent on request." },
  { slug: "traceability-legal-sourcing", title: "Legal Sourcing & Traceability File", docClass: "traceability", product: "All products", productSlugs: ["*"], language: "English", availability: "on-request", summary: "Species, origin and supplier documentation supporting buyers' due-diligence obligations." },
];

export const getDoc = (slug: string) => documents.find((d) => d.slug === slug);

export const docsForProduct = (slug: string, parent?: string) =>
  documents.filter(
    (d) => d.productSlugs.includes("*") || d.productSlugs.includes(slug) || (parent ? d.productSlugs.includes(parent) : false),
  );
