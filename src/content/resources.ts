/**
 * Resources: educational articles. General plywood knowledge is written as
 * such; any Kosmex-specific statement links to its source document.
 */
export type ResourceSection = "technical-guides" | "import-procurement-guides" | "product-comparisons" | "news-insights";

export const resourceSections: { slug: ResourceSection | "knowledge-center" | "faq"; title: string; text: string }[] = [
  { slug: "knowledge-center", title: "Plywood Knowledge Center", text: "Every guide, comparison and update in one place." },
  { slug: "technical-guides", title: "Technical Guides", text: "How to read specifications, data sheets and test reports." },
  { slug: "import-procurement-guides", title: "Export & Procurement Guides", text: "Documents, inspection and planning for EU importers." },
  { slug: "product-comparisons", title: "Product Comparisons", text: "Grades, species and constructions side by side." },
  { slug: "news-insights", title: "News & Insights", text: "Company updates and documentation releases." },
  { slug: "faq", title: "FAQ", text: "Short answers to common buyer questions." },
];

export interface Article {
  slug: string;
  section: ResourceSection;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  body: { h: string; p?: string[]; list?: string[] }[];
  relatedProducts: string[];
}

export const articles: Article[] = [
  {
    slug: "film-faced-plywood-tds-guide",
    section: "technical-guides",
    title: "How to read a film faced plywood Technical Data Sheet",
    description: "Film weight, glue system, bond class, density and EN test methods: what each TDS line means for formwork buyers.",
    date: "2026-10-26",
    readMinutes: 6,
    relatedProducts: ["film-faced-plywood", "premium-grade", "economy-grade"],
    body: [
      { h: "Start with construction, not adjectives", p: ["A useful TDS defines the panel's construction: core species, film type and weight, glue system and edge treatment. Words like “high quality” or “marine” mean nothing without these values."] },
      { h: "Film weight (g/m²)", p: ["Film weight is the mass of resin-impregnated paper per square metre on each face. Heavier film gives a thicker, more durable casting surface. Across the Kosmex range the TDS declares 120 g/m² (Eco Form), 180 g/m² (Premium Form) and 220 g/m² (Anti-slip)."] },
      { h: "Glue system and bond class", p: ["MUF (melamine-urea-formaldehyde) and PF (phenol-formaldehyde) glues behave differently under boiling and cyclic wetting. EN 314-2 defines bonding classes 1, 2 and 3. Class 3 is intended for exterior conditions. Always check which test the bond class is based on, and whether a report exists."] },
      { h: "Physical properties and their EN methods", list: ["Density: EN 323", "Moisture content: EN 322", "Dimensions and tolerances: EN 315", "Bending strength and modulus of elasticity: EN 310", "Bond quality: EN 314-1 / EN 314-2"] },
      { h: "Declared vs. tested", p: ["A TDS is a manufacturer declaration. A laboratory test report covers one tested sample, under a named method, on a stated date. For example, the Kosmex 18 mm EN 310 bending result (T&T Laboratory 06/MCI.AHK/IV/25) supports the bending values declared for Premium Form. Ask your supplier which declared values are backed by reports."] },
    ],
  },
  {
    slug: "qc-report-vs-test-report",
    section: "technical-guides",
    title: "QC report vs. test report vs. certificate: what buyers should request",
    description: "Three document types that are often confused, and what each one actually proves.",
    date: "2026-10-26",
    readMinutes: 5,
    relatedProducts: ["film-faced-plywood", "furniture-plywood"],
    body: [
      { h: "Internal QC report", p: ["Produced by the manufacturer for a specific batch or shipment. It records checks such as thickness, dimensions, moisture and surface against agreed acceptance criteria. It shows process control. It is not independent."] },
      { h: "Laboratory test report", p: ["Issued by a testing laboratory for a submitted sample, using a named standard method (e.g. EN 310 or DIN 51130). It is objective evidence for that sample only. Most reports state that results refer to the tested sample."] },
      { h: "Third-party certificate", p: ["Issued by an accredited certification body after an audit of a system or product scope, for example an FSC Chain of Custody certificate. Always read the scope: a CoC certificate covers the company's control system. A product is covered only when the FSC claim appears on sales documents."] },
      { h: "Declaration of Performance", p: ["Under the EU Construction Products Regulation, a DoP declares the performance of a construction product against its harmonised standard (for wood-based panels, EN 13986). It is linked to CE marking."] },
    ],
  },
  {
    slug: "plywood-pre-shipment-inspection-checklist",
    section: "import-procurement-guides",
    title: "Plywood pre-shipment inspection checklist",
    description: "What to check before a container of plywood leaves the factory.",
    date: "2026-10-26",
    readMinutes: 5,
    relatedProducts: ["film-faced-plywood", "packing-plywood"],
    body: [
      { h: "Before inspection", list: ["Agree the written product specification and acceptance criteria", "Agree sampling plan and inspection date", "Confirm packing, labelling and marking requirements"] },
      { h: "Dimensional checks", list: ["Length and width against tolerance (e.g. ±1 mm per EN 315)", "Thickness at several points (e.g. ±0.5 mm)", "Squareness and edge straightness"] },
      { h: "Surface and construction", list: ["Film coverage, bubbles, scratches and print legibility (for branded film)", "Edge sealing applied and continuous", "Core gaps, overlaps and delamination at edges"] },
      { h: "Moisture and bond", list: ["Moisture content (e.g. below 12% per EN 322)", "Bond check per agreed method if specified"] },
      { h: "Packing and loading", list: ["Pallet condition, carton sheets and straps", "Labels match order and batch", "Container clean, dry and correctly loaded"] },
    ],
  },
  {
    slug: "eu-plywood-import-documents",
    section: "import-procurement-guides",
    title: "Documents EU buyers may request from a plywood supplier",
    description: "A practical list of commercial, technical and sourcing documents for importing plywood into the EU.",
    date: "2026-10-26",
    readMinutes: 6,
    relatedProducts: ["film-faced-plywood", "furniture-plywood", "packing-plywood"],
    body: [
      { h: "Commercial and shipping", list: ["Commercial invoice and packing list", "Bill of lading", "Certificate of origin, where required for tariff purposes"] },
      { h: "Technical", list: ["Technical Data Sheet with revision", "Laboratory test reports for claimed properties", "Batch QC report", "Declaration of Performance where CE marking applies"] },
      { h: "Sourcing and legality", p: ["The EU Deforestation Regulation (Regulation (EU) 2023/1115) requires operators placing wood products on the EU market to carry out due diligence, including geolocation of harvest plots. Application dates have been revised. Check the current timetable with the European Commission. Certificates such as FSC CoC support, but do not replace, an operator's own due diligence."] },
      { h: "Emissions", p: ["Interior plywood is subject to formaldehyde emission requirements. Ask for the emission class and the test report and method behind it."] },
    ],
  },
  {
    slug: "packing-plywood-selection-guide",
    section: "import-procurement-guides",
    title: "Choosing packing plywood for industrial packaging",
    description: "Species, thickness, faces and glue: how to specify plywood for crates, pallets and boxes.",
    date: "2026-10-26",
    readMinutes: 4,
    relatedProducts: ["packing-plywood", "raw-acacia-plywood", "raw-eucalyptus-plywood"],
    body: [
      { h: "Define the load first", p: ["Crate size, payload, stacking and handling set the thickness and density you need. Heavier machinery crates favour dense cores such as acacia."] },
      { h: "Raw or faced?", p: ["Raw (unsanded) faces cost less and suit hidden or industrial packaging. Tropical faces such as Okoume or Bintangor give a more uniform look for visible or branded packaging."] },
      { h: "Glue and moisture", p: ["Packaging stored outdoors or shipped through humid conditions needs a more water-resistant glue system. Agree moisture content at delivery."] },
      { h: "ISPM 15", p: ["Plywood is a processed wood material and is generally exempt from ISPM 15 treatment and marking. Solid-wood parts in the same packaging are not. Confirm the rules at the destination."] },
    ],
  },
  {
    slug: "upholstery-plywood-specification",
    section: "technical-guides",
    title: "Specifying plywood for sofa frames and bed slats",
    description: "The properties that matter in hidden furniture structures, and how to write them into a specification.",
    date: "2026-10-26",
    readMinutes: 4,
    relatedProducts: ["upholstery-plywood", "sofa-frame-applications", "bed-frame-bed-slat-applications"],
    body: [
      { h: "Core quality over face grade", p: ["Frame parts are covered by upholstery, so face appearance hardly matters. Core gaps and overlaps, however, weaken staple and screw holding and must be limited."] },
      { h: "Thickness consistency", p: ["Jig-based assembly and CNC nesting depend on consistent thickness. Specify tolerance, not just nominal thickness."] },
      { h: "Bed slats", p: ["Specify width, thickness, length, flat or curved profile, surface finish and moisture content. Kosmex lists common slat sizes such as 15 × 60 × 670 mm and 18 × 70 × 900 mm."] },
    ],
  },
  {
    slug: "film-faced-grades-compared",
    section: "product-comparisons",
    title: "Economy vs. Standard vs. Premium film faced plywood",
    description: "How the Kosmex film faced grades differ in film, core, glue and declared mechanical properties.",
    date: "2026-10-26",
    readMinutes: 3,
    relatedProducts: ["economy-grade", "standard-grade", "premium-grade"],
    body: [
      { h: "Summary", p: ["Economy maps to the TDS “Eco Form” (120 g/m² film, acacia core, MUF). Premium maps to “Premium Form” (180 g/m², acacia/eucalyptus, MUF/PF). Standard is reserved for a grade that Kosmex has not yet specified. See the full comparison table on the Film Faced Plywood page."] },
      { h: "Which to choose", list: ["Economy: cost-sensitive, short-cycle pours", "Premium: repeated-cycle building formwork and better concrete finish", "Anti-slip (220 g/m²): flooring, trailers and walkways"] },
    ],
  },
  {
    slug: "plywood-species-compared",
    section: "product-comparisons",
    title: "Birch, eucalyptus, poplar and acacia plywood compared",
    description: "A practical overview of the common plywood species for furniture and packaging.",
    date: "2026-10-26",
    readMinutes: 4,
    relatedProducts: ["birch-plywood", "eucalyptus-plywood", "poplar-plywood", "raw-acacia-plywood"],
    body: [
      { h: "Birch", p: ["Fine, light face. Takes finishes well. The usual choice for exposed-edge furniture."] },
      { h: "Eucalyptus", p: ["Dense plantation hardwood with good fastener holding. A stable substrate at a competitive price."] },
      { h: "Poplar", p: ["Light and easy to machine. Suits components where weight matters more than strength."] },
      { h: "Acacia", p: ["Dense hardwood, used in formwork cores and heavy-duty packing panels. The Kosmex TDS declares 550 kg/m³ for acacia-core film faced plywood."] },
    ],
  },
  {
    slug: "fsc-chain-of-custody-certificate-2025",
    section: "news-insights",
    title: "Kosmex receives FSC® Chain of Custody certification",
    description: "Bureau Veritas issued certificate BV-COC-220900 to Kosmex Company Limited in September 2025.",
    date: "2025-09-29",
    readMinutes: 2,
    relatedProducts: ["film-faced-plywood", "furniture-plywood"],
    body: [
      { h: "Certificate details", list: ["Certificate code: BV-COC-220900", "Issued by: Bureau Veritas Certification Holding SAS", "Standard: FSC-STD-40-004 V3-1", "Scope: trading of wooden products certified FSC 100% and FSC Mix", "Valid: 24 Sep 2025 – 23 Sep 2030"] },
      { h: "What it means for buyers", p: ["Buyers can order FSC-claimed product, with the FSC claim stated on invoice and delivery documents. Verify current status in the FSC public database at info.fsc.org."] },
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  { q: "Where is Kosmex plywood manufactured?", a: "In Vietnam. Kosmex's head office is in Hanoi, and production is in northern Vietnam (Tuyen Quang Province, according to company information)." },
  { q: "Which products does Kosmex Plywood offer?", a: "Four ranges: Film Faced Plywood (flagship), Furniture Plywood, Upholstery Plywood and Packing Plywood." },
  { q: "Can the KOSMEX logo be printed on film faced plywood?", a: "Yes. Kosmex film faced plywood can carry the KOSMEX logo printed in the film surface, on a 1250 × 2500 mm print layout. Confirm availability for your grade and film colour with the sales team." },
  { q: "What sizes are available for film faced plywood?", a: "1220 × 2440, 1250 × 2500 and 610 × 2500 mm as standard, or customised size, per the Kosmex TDS. Thickness range is 9–21 mm." },
  { q: "Is Kosmex FSC certified?", a: "Kosmex Company Limited holds FSC Chain of Custody certificate BV-COC-220900 (Bureau Veritas) for trading of FSC 100% and FSC Mix products, valid to 23 Sep 2030. A product is FSC-certified only when sold with an FSC claim on the sales documents." },
  { q: "Is Kosmex film faced plywood CE marked?", a: "A Declaration of Performance has not yet been published. Ask the sales team for the current status before relying on CE marking." },
  { q: "How many times can film faced plywood be reused?", a: "Re-use depends on grade, handling, release agent and the type of pour. Kosmex does not publish a guaranteed number of re-uses. Discuss your application with the sales team." },
  { q: "How do I request a quotation?", a: "Use the Request a Quote form with product, thickness, size, quantity (m³ or containers) and destination port, or email the sales team." },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
