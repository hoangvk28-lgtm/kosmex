/**
 * Priority EU markets (approved list, in order). France and the Netherlands
 * are intentionally excluded from navigation.
 *
 * Content rules: no local offices, stock, delivery guarantees or claims of
 * existing customers. Ports are common container gateways for orientation only.
 */
export interface Market {
  slug: string;
  name: string;
  native: string;
  code: string; // ISO 3166-1 alpha-2
  headline: string;
  intro: string;
  buyerSegments: string[];
  focusProducts: string[]; // product/category slugs
  focusReason: string;
  considerations: { title: string; text: string }[];
  documents: string[]; // doc slugs most relevant to this market's buyers
  gateways: string[];
  language: string;
  faqs: { q: string; a: string }[];
  article: string; // resources article slug
  // Approximate position on the stylised Europe map (percent of viewBox).
  map: { x: number; y: number };
}

const COMMON_DOCS = ["tds-film-faced-plywood", "fsc-chain-of-custody", "traceability-legal-sourcing", "qc-report-batch"];

export const markets: Market[] = [
  {
    slug: "poland",
    name: "Poland",
    native: "Polska",
    code: "PL",
    headline: "Plywood supply for Polish distributors and packaging manufacturers",
    intro:
      "Poland combines a large construction sector with one of Europe's biggest furniture and industrial packaging industries. Kosmex supports Polish buyers comparing film faced and packing plywood on documented specifications, not on price alone.",
    buyerSegments: ["Building-material distributors and formwork resellers", "Industrial packaging and crate manufacturers", "Panel wholesalers supplying regional merchants"],
    focusProducts: ["packing-plywood", "film-faced-plywood", "upholstery-plywood"],
    focusReason: "Packing plywood for crate and pallet producers; film faced plywood for construction distribution; upholstery plywood for Poland's furniture sector.",
    considerations: [
      { title: "Price-to-performance comparison", text: "Polish buyers often benchmark against regional birch and Eastern European supply. Compare on film weight, glue system and tolerances, not on panel price alone." },
      { title: "Packing-grade definition", text: "Agree nail-holding needs, acceptable face defects and moisture at delivery for packaging lines in advance." },
      { title: "EUDR due diligence", text: "As EU operators, importers must collect geolocation and legality information under Regulation (EU) 2023/1115. Check current application dates." },
    ],
    documents: [...COMMON_DOCS, "tds-raw-eucalyptus-plywood"],
    gateways: ["Gdańsk", "Gdynia"],
    language: "Polish; English for technical correspondence",
    faqs: [
      { q: "Can Kosmex quote packing plywood by container for Polish ports?", a: "Yes. Share thickness, size, species preference, monthly volume and destination port (e.g. Gdańsk or Gdynia) through the RFQ form and the sales team will prepare a quotation." },
      { q: "Which documents can be supplied with a shipment to Poland?", a: "Commercial documents plus the product TDS and, on request, a batch QC report and sourcing information. FSC-claimed product is available only where the FSC claim is stated on sales documents." },
    ],
    article: "packing-plywood-selection-guide",
    map: { x: 60, y: 42 },
  },
  {
    slug: "italy",
    name: "Italy",
    native: "Italia",
    code: "IT",
    headline: "Furniture and upholstery plywood for Italian manufacturers",
    intro:
      "Italian furniture and upholstered-furniture makers demand consistent face quality, flatness and machining behaviour. This page is for Italian producers and panel distributors evaluating Kosmex furniture and upholstery plywood.",
    buyerSegments: ["Furniture and kitchen manufacturers", "Upholstered furniture producers (sofa and bed frames)", "Panel distributors serving the furniture industry"],
    focusProducts: ["furniture-plywood", "upholstery-plywood", "film-faced-plywood"],
    focusReason: "Furniture plywood for case goods; upholstery plywood for Italy's sofa and bed manufacturing districts; film faced plywood for construction distributors.",
    considerations: [
      { title: "Face and machining quality", text: "Define face grade, acceptable repairs, sanding grit and flatness tolerance before sampling." },
      { title: "Formaldehyde emissions", text: "Interior panels are subject to EU and national emission rules. Request the emission class and test report for the specific product." },
      { title: "Sampling before volume", text: "Plan a sample or trial shipment so your production line can approve the substrate." },
    ],
    documents: ["tds-ev-plywood", "tds-upholstery-plywood", "test-report-formaldehyde", "qc-report-batch"],
    gateways: ["Genoa", "La Spezia", "Trieste"],
    language: "Italian; English for technical correspondence",
    faqs: [
      { q: "Can Kosmex supply pre-cut sofa frame components?", a: "Kosmex offers CNC cutting to customer drawings. Send drawings, panel specification and annual volume with your RFQ." },
      { q: "Is emission test data available for furniture plywood?", a: "An emission test report for furniture plywood is pending publication. Request the current status through the RFQ form." },
    ],
    article: "upholstery-plywood-specification",
    map: { x: 49, y: 66 },
  },
  {
    slug: "spain",
    name: "Spain",
    native: "España",
    code: "ES",
    headline: "Film faced plywood for Spanish construction and timber distributors",
    intro:
      "Spanish construction-material wholesalers and formwork resellers need panels that perform reliably in warm, dry and coastal conditions. Kosmex supplies documented film faced and packing plywood for application-driven grade selection.",
    buyerSegments: ["Construction-material wholesalers", "Formwork hire and resale companies", "Timber and panel traders"],
    focusProducts: ["film-faced-plywood", "packing-plywood"],
    focusReason: "Film faced plywood for building formwork; packing plywood for industrial exporters.",
    considerations: [
      { title: "Storage and handling", text: "Store film faced panels flat, covered and off the ground. Reseal cut edges to limit moisture uptake and swelling." },
      { title: "Grade by application", text: "Match film weight and core to the planned number of pours and the concrete finish required." },
      { title: "Product identification", text: "A logo-printed film helps contractors and resellers identify the manufacturer on site." },
    ],
    documents: COMMON_DOCS,
    gateways: ["Valencia", "Barcelona", "Algeciras"],
    language: "Spanish; English for technical correspondence",
    faqs: [
      { q: "Which film faced grade suits multi-storey building work?", a: "Premium grade (145 g/m² film, MUF/PF glue, up to 20+ re-uses) is intended for repeated-cycle building formwork. Compare grades on the Film Faced Plywood page and confirm with the sales team." },
      { q: "Can panels be supplied in 1250 × 2500 mm?", a: "Yes. 1220 × 2440, 1250 × 2500 and 610 × 2500 mm are standard formats, and customised sizes are possible." },
    ],
    article: "film-faced-plywood-tds-guide",
    map: { x: 27, y: 70 },
  },
  {
    slug: "belgium",
    name: "Belgium",
    native: "België · Belgique",
    code: "BE",
    headline: "Plywood for Belgian timber merchants and panel wholesalers",
    intro:
      "Belgium's timber trade combines merchants who supply contractors with wholesalers who stock furniture panels. Many work in more than one language and serve neighbouring markets. Kosmex supports both with consistent, documented specifications for repeat orders.",
    buyerSegments: ["Timber merchants supplying contractors", "Panel wholesalers and stockists", "Construction-material distributors"],
    focusProducts: ["film-faced-plywood", "furniture-plywood"],
    focusReason: "Film faced plywood for the contractor trade; furniture plywood for panel stockists.",
    considerations: [
      { title: "Stockist specifications", text: "Wholesalers need a stable specification across repeat orders. Fix grade, film and tolerances in a written product specification." },
      { title: "Multilingual documentation", text: "Documentation is currently in English. Dutch and French versions are not yet available." },
      { title: "Sourcing documentation", text: "Request FSC-claimed product, where needed, at order stage, plus the sourcing information for your due-diligence file." },
    ],
    documents: [...COMMON_DOCS, "spec-film-faced-grades"],
    gateways: ["Antwerp-Bruges"],
    language: "Dutch, French, German; English for technical correspondence",
    faqs: [
      { q: "Does Kosmex hold stock in Belgium?", a: "No. Kosmex supplies by container from Vietnam and does not operate a European warehouse." },
      { q: "Can a fixed product specification be agreed for repeat orders?", a: "Yes. A product specification sheet can be agreed and referenced on every order. Request it through the RFQ form." },
    ],
    article: "qc-report-vs-test-report",
    map: { x: 40, y: 47 },
  },
  {
    slug: "cyprus",
    name: "Cyprus",
    native: "Κύπρος",
    code: "CY",
    headline: "Plywood for construction importers in Cyprus",
    intro:
      "Cypriot importers supply contractors and joinery workshops on an island where every panel arrives by sea. Clear product identification, careful packing and complete documents matter as much as the panel itself.",
    buyerSegments: ["Construction-material importers", "Joinery and fit-out suppliers", "Building distributors"],
    focusProducts: ["film-faced-plywood", "furniture-plywood"],
    focusReason: "Film faced plywood for project formwork; furniture plywood for joinery and fit-out.",
    considerations: [
      { title: "Mixed-container orders", text: "Smaller import volumes often call for several thicknesses or grades in one container. State the mix in your RFQ." },
      { title: "Moisture and packing", text: "Sea transport and warm climate make protective packing and moisture control at loading important." },
      { title: "Project documentation", text: "Contractors may ask for TDS and test reports. Collect them before tendering." },
    ],
    documents: COMMON_DOCS,
    gateways: ["Limassol"],
    language: "Greek; English widely used in business",
    faqs: [
      { q: "Can one container combine several thicknesses?", a: "Mixed-specification containers can be discussed. List each thickness, grade and quantity in the RFQ form." },
      { q: "What packaging is used for export?", a: "The Kosmex TDS lists carton sheets and plastic straps for film faced plywood. Ask for project-specific packing if required." },
    ],
    article: "plywood-pre-shipment-inspection-checklist",
    map: { x: 82, y: 80 },
  },
  {
    slug: "bulgaria",
    name: "Bulgaria",
    native: "България",
    code: "BG",
    headline: "Packing and film faced plywood for Bulgarian distributors",
    intro:
      "Bulgarian timber merchants and packaging producers compare suppliers on grade, consistency and inspection records. Kosmex provides structured specifications and batch-level QC documentation.",
    buyerSegments: ["Timber merchants", "Packing and pallet manufacturers", "Building-material wholesalers"],
    focusProducts: ["packing-plywood", "film-faced-plywood"],
    focusReason: "Packing plywood for industrial users; film faced plywood for construction wholesale.",
    considerations: [
      { title: "Repeat-order consistency", text: "Agree acceptance criteria up front and reference them in each batch QC report." },
      { title: "Inspection records", text: "Ask for a batch QC report and, if needed, an independent pre-shipment inspection." },
      { title: "Freight planning", text: "Container routing to Black Sea ports should be planned early in the order schedule." },
    ],
    documents: [...COMMON_DOCS, "tds-raw-eucalyptus-plywood"],
    gateways: ["Varna", "Burgas"],
    language: "Bulgarian; English for technical correspondence",
    faqs: [
      { q: "Can a third-party inspection be arranged before loading?", a: "Buyers may appoint an inspection company of their choice. Coordinate timing with the Kosmex sales team." },
      { q: "Which packing species are available?", a: "Raw acacia, raw eucalyptus and Styrax / Okoume / Bintangor-faced plywood. See the Packing Plywood range." },
    ],
    article: "plywood-pre-shipment-inspection-checklist",
    map: { x: 72, y: 64 },
  },
  {
    slug: "germany",
    name: "Germany",
    native: "Deutschland",
    code: "DE",
    headline: "Film faced plywood for technical procurement in Germany",
    intro:
      "German buyers qualify suppliers on reproducible specifications, test methods and document control. This page sets out what Kosmex can document today for film faced plywood, and what is still pending.",
    buyerSegments: ["Construction-material wholesalers", "Formwork distributors", "Technical purchasing departments"],
    focusProducts: ["film-faced-plywood", "furniture-plywood"],
    focusReason: "Film faced plywood with EN-method test data; furniture plywood for panel processors.",
    considerations: [
      { title: "Test method transparency", text: "Kosmex publishes the EN 310 bending test, the EN 438-2 abrasion test and the DIN 51130 anti-slip test, each with report number and date." },
      { title: "CE marking scope", text: "Check whether CE marking under EN 13986 applies to your intended use. A Kosmex Declaration of Performance is pending." },
      { title: "Revision control", text: "Reference the TDS revision and the batch QC report on each order so you can trace every delivery." },
    ],
    documents: ["tds-film-faced-plywood", "test-report-bending-film-faced-18mm", "test-report-anti-slip-din-51130", "dop-ce-anti-slip"],
    gateways: ["Hamburg", "Bremerhaven"],
    language: "German; English for technical correspondence",
    faqs: [
      { q: "Is the bending strength independently tested?", a: "Yes for an 18 mm, 13-ply sample: T&T Laboratory report 06/MCI.AHK/IV/25 (EN 310) records 49 / 47.3 MPa bending strength. Results apply to the tested sample." },
      { q: "Is anti-slip film faced plywood R-rated?", a: "QUATEST 3 report KT3-01466AXD5 records an acceptance angle of 18.0° to DIN 51130, which falls in the R10 band." },
    ],
    article: "film-faced-plywood-tds-guide",
    map: { x: 48, y: 46 },
  },
  {
    slug: "sweden",
    name: "Sweden",
    native: "Sverige",
    code: "SE",
    headline: "Documented plywood supply for Swedish importers",
    intro:
      "Swedish timber importers and panel distributors put sourcing transparency, emissions data and dimensional consistency first. Kosmex supports evaluation with certificate, test and traceability documentation.",
    buyerSegments: ["Technical timber importers", "Furniture panel distributors", "Procurement teams with sustainability criteria"],
    focusProducts: ["furniture-plywood", "film-faced-plywood"],
    focusReason: "Furniture plywood for panel distribution; film faced plywood for construction.",
    considerations: [
      { title: "Certified sourcing", text: "Kosmex holds FSC Chain of Custody certificate BV-COC-220900 for trading of FSC 100% and FSC Mix products. Specify FSC-claimed product at order stage." },
      { title: "Emission evidence", text: "Furniture plywood is declared E0.5. An EN 717-1 chamber test of a 9 mm sample measured 0.022 mg/m³ (T&T Laboratory, June 2026)." },
      { title: "Climate considerations", text: "Panels arriving from a tropical origin should acclimatise before machining or installation." },
    ],
    documents: ["fsc-chain-of-custody", "traceability-legal-sourcing", "test-report-formaldehyde", "tds-ev-plywood"],
    gateways: ["Gothenburg"],
    language: "Swedish; English widely used in business",
    faqs: [
      { q: "Can Kosmex supply FSC-certified plywood?", a: "Kosmex is FSC CoC certified for trading of FSC 100% and FSC Mix products (BV-COC-220900). A product is FSC-certified only when the FSC claim appears on the invoice and delivery documents." },
      { q: "How can I verify the FSC certificate?", a: "Search the certificate code BV-COC-220900 in the FSC public database at info.fsc.org." },
    ],
    article: "eu-plywood-import-documents",
    map: { x: 55, y: 24 },
  },
];

export const getMarket = (slug: string) => markets.find((m) => m.slug === slug);
