import type { Status } from "./site";

/**
 * Product taxonomy — order is contractual (approved wireframe V8):
 * 1 Film Faced · 2 Furniture · 3 Upholstery · 4 Packing.
 *
 * Spec values carry a `status`:
 *  - declared: published by Kosmex (TDS, sales team data or kosmexgroup.com product page)
 *  - verified: backed by a published laboratory report (see documents.ts)
 *  - pending:  placeholder; no value is shown, only the field name
 */
export interface SpecRow {
  label: string;
  value?: string;
  status: Status;
  source?: string;
}

export interface Application {
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  parent: string;
  name: string;
  navLabel: string;
  kicker: string;
  intro: string;
  overview: string[];
  strengths: string[];
  considerations: string[];
  applications: Application[];
  specs: SpecRow[];
  image: string;
  imageAlt: string;
  imageIsGeneric?: boolean;
  related: string[]; // product or category slugs
  provisional?: string;
}

export interface Category {
  slug: string;
  order: number;
  name: string;
  short: string;
  flagship?: boolean;
  tagline: string;
  cardText: string;
  primaryApplication: string;
  intro: string;
  overview: string[];
  benefits: string[];
  applications: Application[];
  specs: SpecRow[];
  image: string;
  imageAlt: string;
  children: Product[];
}

const TDS = "Kosmex TDS, 2026";
const WEB = "kosmexgroup.com product page";
const SALES = "Kosmex sales team, 2026";
const SIZES = "1220 × 2440 · 1250 × 2500 mm · customised size";

// ---------------------------------------------------------------------------
// 1. FILM FACED PLYWOOD — flagship
// ---------------------------------------------------------------------------
const filmFaced: Category = {
  slug: "film-faced-plywood",
  order: 1,
  name: "Film Faced Plywood",
  short: "Film Faced",
  flagship: true,
  tagline: "Built for performance. Recognised by our brand.",
  cardText:
    "Hardwood-core formwork panels with phenolic film on both faces and sealed edges. Available with the KOSMEX logo printed into the film.",
  primaryApplication: "Concrete formwork & shuttering",
  intro:
    "Phenolic film faced plywood for concrete formwork, manufactured in Vietnam on acacia and eucalyptus hardwood cores. Specify it with the KOSMEX logo printed directly on the film surface.",
  overview: [
    "Kosmex film faced plywood is built from rotary-peeled hardwood veneers (acacia, eucalyptus or a mixed hardwood core), bonded under heat and pressure and overlaid on both faces with brown or black phenolic resin film. Panel edges are sealed with waterproof paint.",
    "The film gives a smooth, water-resistant casting face for clean concrete surfaces. The cross-laminated core provides stiffness and screw-holding at formwork thicknesses. Film weight, core grade, glue system and drying method set the performance class. Kosmex publishes these for each grade in its Technical Data Sheet so buyers can compare like-for-like.",
    "Kosmex states typical re-use cycles of 6–8 pours for the Common grade, 10–12 for the Medium grade and 12–15 (MUF) or 20+ (PF glue) for the Premium grade. Actual service life depends on handling, release agent, edge maintenance and the concrete pour.",
  ],
  benefits: [
    "KOSMEX logo printed in the film for on-site product identification",
    "Brown or black phenolic film, 120–145 g/m² (formwork) · 180–240 g/m² (anti-slip)",
    "Acacia, eucalyptus or mixed hardwood cores",
    "1220 × 2440 or 1250 × 2500 mm, or customised size",
    "Up to 20+ re-uses with PF glue (Premium grade)",
    "CE marking available on request",
  ],
  applications: [
    { title: "Concrete formwork & shuttering", text: "Wall, column and slab formwork where a smooth, consistent concrete finish is required." },
    { title: "Building & civil construction", text: "Residential, commercial and infrastructure pours, including bridge works (per Kosmex application list)." },
    { title: "Fencing & hoarding", text: "Premium-grade panels for site fences and hoarding." },
    { title: "Industrial flooring", text: "Anti-slip film variants for truck, trailer and container floors and walkways." },
  ],
  specs: [
    { label: "Core species", value: "Acacia, eucalyptus or mixed hardwood", status: "declared", source: TDS },
    { label: "Face / back", value: "Phenolic resin film, both faces", status: "declared", source: TDS },
    { label: "Film colour", value: "Black / brown", status: "declared", source: TDS },
    { label: "Film weight", value: "120 g/m² (Common) · 130 g/m² (Medium) · 145 g/m² (Premium) · 180–240 g/m² (Anti-slip)", status: "declared", source: TDS },
    { label: "Glue type", value: "MUF (Common, Medium) · MUF / PF (Premium, Anti-slip)", status: "declared", source: TDS },
    { label: "Bonding classification", value: "BR-6h (Common) · BR-12h (Medium) · EN 314-2 Class 2 & 3 (Premium, Anti-slip)", status: "declared", source: TDS },
    { label: "Thickness options", value: "11–21 mm", status: "declared", source: SALES },
    { label: "Standard dimensions", value: SIZES, status: "declared", source: TDS },
    { label: "Density (EN 323)", value: "550 kg/m³ acacia · 600 kg/m³ mix · 650 kg/m³ eucalyptus (±3%)", status: "declared", source: TDS },
    { label: "Length / width tolerance (EN 315)", value: "±1 mm", status: "declared", source: TDS },
    { label: "Thickness tolerance (EN 315)", value: "±0.5 mm", status: "declared", source: TDS },
    { label: "Moisture content (EN 322)", value: "< 12%", status: "declared", source: TDS },
    { label: "Formaldehyde emission class", value: "E0 / E1 / E2 (on request)", status: "declared", source: TDS },
    { label: "Edge sealing", value: "Waterproof paint", status: "declared", source: WEB },
    { label: "Number of re-uses", value: "6–8 (Common) · 10–12 (Medium) · 12–15 MUF / 20+ PF (Premium)", status: "declared", source: SALES },
    { label: "Anti-slip index", value: "R10–R13", status: "declared", source: TDS },
    { label: "Packaging", value: "Carton sheets & steel straps", status: "declared", source: TDS },
    { label: "CE marking / Declaration of Performance", value: "Available on request", status: "declared", source: SALES },
    { label: "Bending strength — 18 mm, 13-ply (EN 310)", value: "49 / 47.3 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
    { label: "Modulus of elasticity — 18 mm (EN 310)", value: "6,470 / 5,670 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
    { label: "Anti-slip surface (DIN 51130)", value: "Acceptance angle 18.0° — R10 band", status: "verified", source: "QUATEST 3 KT3-01466AXD5" },
    { label: "Abrasion — anti-slip film (EN 438-2)", value: "680 revolutions", status: "verified", source: "T&T Laboratory 11/MCI.AHV/IV/25" },
  ],
  image: "ffp-factory-collage",
  imageAlt: "KOSMEX logo-printed film faced plywood panels in the Kosmex factory",
  children: [],
};

const SHARED_FFP = (core: string, glue: string): SpecRow[] => [
  { label: "Core", value: core, status: "declared", source: TDS },
  { label: "Glue", value: glue, status: "declared", source: TDS },
  { label: "Thickness options", value: "11–21 mm", status: "declared", source: SALES },
  { label: "Sizes", value: SIZES, status: "declared", source: TDS },
  { label: "Moisture content (EN 322)", value: "< 12%", status: "declared", source: TDS },
  { label: "Tolerances (EN 315)", value: "L/W ±1 mm · thickness ±0.5 mm", status: "declared", source: TDS },
  { label: "Emission class", value: "E0 / E1 / E2 (on request)", status: "declared", source: TDS },
];

filmFaced.children = [
  {
    slug: "economy-grade",
    parent: "film-faced-plywood",
    name: "Economy Grade Film Faced Plywood",
    navLabel: "Economy Grade",
    kicker: "Film Faced · Grade 01",
    intro:
      "Entry formwork grade with 120 g/m² film on a hand-jointed AB-grade hardwood core. Listed as “Common Film Faced Plywood” in the Kosmex TDS.",
    overview: [
      "The Economy grade is intended for formwork where cost per pour matters more than the maximum number of cycles: short-cycle residential work, foundations and temporary structures. Kosmex states 6–8 re-uses.",
      "Declared construction: brown or black 120 g/m² phenolic film, AB-grade acacia, eucalyptus or mixed core jointed by hand and sun-dried, MUF glue, two hot presses, BR-6h (boil resistant) bonding.",
    ],
    strengths: ["Lowest cost per panel", "6–8 re-uses declared", "Same dimensional tolerances as Premium (EN 315)"],
    considerations: ["MUF bond: not the same as a full phenolic (PF) bond", "Sun-dried core: Medium and Premium grades are machine-dried"],
    applications: [
      { title: "Foundations & footings", text: "Below-grade pours where surface finish is less critical." },
      { title: "Short-cycle formwork", text: "Projects with a limited number of planned pours." },
    ],
    specs: [
      { label: "TDS reference", value: "Common Film Faced Plywood", status: "declared", source: TDS },
      { label: "Film", value: "Black / brown phenolic film, 120 g/m²", status: "declared", source: TDS },
      { label: "Number of re-uses", value: "6–8 times", status: "declared", source: SALES },
      ...SHARED_FFP("Acacia / eucalyptus / mix, AB grade, jointed by hand, sun-dried", "MUF"),
      { label: "Bonding quality", value: "BR-6h (boil resistant)", status: "declared", source: TDS },
      { label: "Density (EN 323)", value: "550 kg/m³ acacia · 600–630 kg/m³ eucalyptus", status: "declared", source: TDS },
      { label: "Bending strength, length / width (EN 310)", value: "40 / 30 N/mm²", status: "declared", source: TDS },
      { label: "Modulus of elasticity, length / width (EN 310)", value: "5,000 / 3,000 N/mm²", status: "declared", source: TDS },
    ],
    image: "ffp-render-light",
    imageAlt: "KOSMEX economy grade film faced plywood panels",
    related: ["medium-grade", "premium-grade", "film-faced-plywood"],
  },
  {
    slug: "medium-grade",
    parent: "film-faced-plywood",
    name: "Medium Grade Film Faced Plywood",
    navLabel: "Medium Grade",
    kicker: "Film Faced · Grade 02",
    intro:
      "Mid-range formwork grade with 130 g/m² film, a machine-dried core and BR-12h bonding. Listed as “Medium Film Faced Plywood” in the Kosmex TDS.",
    overview: [
      "The Medium grade sits between Economy and Premium: more cycles than the entry grade, at a lower cost than full Premium panels. Kosmex states 10–12 re-uses.",
      "Declared construction: brown or black 130 g/m² phenolic film, AB-grade acacia, eucalyptus or mixed core jointed by hand and machine-dried, WBP melamine (MUF) glue, core sanded twice, BR-12h (boil resistant) bonding.",
    ],
    strengths: ["10–12 re-uses declared", "Machine-dried core", "BR-12h boil-resistant bond"],
    considerations: ["MUF bond: for 20+ cycles choose Premium with PF glue"],
    applications: [{ title: "General construction formwork", text: "Walls, columns and slabs on standard building projects." }],
    specs: [
      { label: "TDS reference", value: "Medium Film Faced Plywood", status: "declared", source: TDS },
      { label: "Film", value: "Black / brown phenolic film, 130 g/m²", status: "declared", source: TDS },
      { label: "Number of re-uses", value: "10–12 times", status: "declared", source: SALES },
      ...SHARED_FFP("Acacia / eucalyptus / mix, AB grade, jointed by hand, machine-dried", "WBP melamine (MUF)"),
      { label: "Bonding quality", value: "BR-12h (boil resistant)", status: "declared", source: TDS },
      { label: "Density", value: "560–650 kg/m³", status: "declared", source: SALES },
      { label: "Bending strength, length / width (EN 310)", value: "40 / 30 N/mm²", status: "declared", source: TDS },
      { label: "Modulus of elasticity, length / width (EN 310)", value: "5,000 / 3,000 N/mm²", status: "declared", source: TDS },
    ],
    image: "ffp-render-green",
    imageAlt: "KOSMEX standard grade film faced plywood panels",
    related: ["economy-grade", "premium-grade", "film-faced-plywood"],
  },
  {
    slug: "premium-grade",
    parent: "film-faced-plywood",
    name: "Premium Grade Film Faced Plywood",
    navLabel: "Premium Grade",
    kicker: "Film Faced · Grade 03",
    intro:
      "145 g/m² film on a 100% A-grade, machine-jointed hardwood core with MUF or PF glue. Up to 20+ re-uses with PF glue.",
    overview: [
      "The Premium grade is for buyers who need higher stiffness and a more durable casting face: multi-storey building frames, visible concrete, fencing and contractors who want the most cycles from each panel.",
      "Declared construction: 145 g/m² brown or black phenolic film, 100% A-grade acacia, eucalyptus, rubberwood or mixed core jointed by machine and machine-dried, MUF or PF glue, EN 314-2 Class 2 & 3 bonding. The declared bending values match an independent EN 310 test of an 18 mm, 13-ply sample.",
    ],
    strengths: [
      "12–15 re-uses (MUF) · 20+ re-uses (PF)",
      "100% A-grade, machine-jointed core",
      "EN 310 bending test report published (18 mm sample)",
    ],
    considerations: ["Choose PF glue for the highest number of cycles"],
    applications: [
      { title: "Building frame formwork", text: "Walls, columns and slabs on repeated-cycle building projects." },
      { title: "Fair-faced concrete", text: "Where surface quality of the cast concrete is specified." },
      { title: "Fences", text: "Site fences and hoarding." },
    ],
    specs: [
      { label: "TDS reference", value: "Premium Film Faced Plywood", status: "declared", source: TDS },
      { label: "Film", value: "Black / brown phenolic film, 145 g/m²", status: "declared", source: TDS },
      { label: "Number of re-uses", value: "12–15 times (MUF) · 20+ times (PF)", status: "declared", source: SALES },
      ...SHARED_FFP("Acacia / eucalyptus / rubberwood / mix, 100% A grade, jointed by machine, machine-dried", "MUF / PF"),
      { label: "Bonding quality", value: "EN 314-2 Class 2 & 3", status: "declared", source: TDS },
      { label: "Density (EN 323)", value: "550 / 600 / 650 kg/m³ ±3% by core", status: "declared", source: TDS },
      { label: "Bending strength, length / width (EN 310)", value: "49 / 47 N/mm²", status: "declared", source: TDS },
      { label: "Modulus of elasticity, length / width (EN 310)", value: "6,400 / 5,600 N/mm²", status: "declared", source: TDS },
      { label: "Independent test — 18 mm, 13-ply", value: "49 / 47.3 MPa · MOE 6,470 / 5,670 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
    ],
    image: "ffp-render-closeup",
    imageAlt: "Premium KOSMEX film faced plywood panel with logo-printed film",
    related: ["economy-grade", "medium-grade", "film-faced-plywood"],
  },
];

// ---------------------------------------------------------------------------
// 2. FURNITURE PLYWOOD
// ---------------------------------------------------------------------------
const CORE_JOINT = "A grade jointed by composer machine · AB grade jointed by hand (per order)";
const FURN_COMMON = (glue: string): SpecRow[] => [
  { label: "Core construction", value: CORE_JOINT, status: "declared", source: SALES },
  { label: "Glue type", value: glue, status: "declared", source: SALES },
  { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 mm", status: "declared", source: SALES },
  { label: "Formaldehyde emission class", value: "E0.5", status: "declared", source: SALES },
  { label: "Moisture content", value: "8–12%", status: "declared", source: SALES },
];

const furniture: Category = {
  slug: "furniture-plywood",
  order: 2,
  name: "Furniture Plywood",
  short: "Furniture",
  tagline: "Stable substrates for furniture production.",
  cardText: "Birch, eucalyptus, poplar and EV plywood for cabinet, panel and interior furniture manufacturing. E0.5 emission class.",
  primaryApplication: "Furniture & interior manufacturing",
  intro:
    "Plywood in birch, eucalyptus, poplar and EV (engineered veneer) faces for furniture producers, panel processors and interior manufacturers.",
  overview: [
    "Furniture plywood is selected on face quality, flatness, machining behaviour and bond integrity rather than on structural values. Kosmex supplies four face families, each with a different balance of appearance, weight and cost.",
    "Panels are produced from 4 to 30 mm in 1220 × 2440 or 1250 × 2500 mm, with MR, melamine or phenolic glue and E0.5 formaldehyde emission. Core grade is chosen per order: A grade jointed by composer machine, or AB grade jointed by hand.",
  ],
  benefits: ["Four faces: birch, eucalyptus, poplar, EV", "E0.5 formaldehyde emission class", "4–30 mm, 1220 × 2440 / 1250 × 2500 mm", "MR, melamine or phenolic glue"],
  applications: [
    { title: "Case & cabinet furniture", text: "Carcasses, shelving and drawer components." },
    { title: "Interior panels", text: "Wall and ceiling panels, joinery and fit-out." },
    { title: "Laminated & veneered panels", text: "Substrate for HPL, melamine paper or decorative veneer." },
  ],
  specs: [
    { label: "Face species", value: "Birch · Eucalyptus · Poplar · EV", status: "declared", source: SALES },
    { label: "Glue type", value: "MR / Melamine (Phenolic on request)", status: "declared", source: SALES },
    { label: "Thickness options", value: "4–30 mm", status: "declared", source: SALES },
    { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 mm", status: "declared", source: SALES },
    { label: "Formaldehyde emission class", value: "E0.5", status: "declared", source: SALES },
    { label: "Moisture content", value: "8–12%", status: "declared", source: SALES },
    { label: "Formaldehyde emission — 9 mm sample (EN 717-1)", value: "0.022 mg/m³", status: "verified", source: "T&T Laboratory 005/MC/II/26" },
  ],
  image: "core-layers-edge",
  imageAlt: "Edge view of stacked plywood showing consistent core layers",
  children: [
    {
      slug: "birch-plywood",
      parent: "furniture-plywood",
      name: "Birch Plywood",
      navLabel: "Birch Plywood",
      kicker: "Furniture · Birch",
      intro: "Birch-faced plywood with a smooth, fine-grained surface for furniture, joinery and decorative panels.",
      overview: [
        "Birch has a light, uniform face with fine grain that takes paint, lacquer and laminate well. That makes it the standard choice for visible-edge furniture and premium interior panels.",
        "Kosmex lists C, D, E and F birch face grades. Core grade (A or AB) and glue system are agreed for each order.",
      ],
      strengths: ["Fine, light-coloured face", "Clean edges for exposed-ply designs", "E0.5 emission class"],
      considerations: ["Grade naming (C/D/E/F) to be aligned with buyer standards"],
      applications: [
        { title: "Furniture manufacturing", text: "Exposed-edge furniture, shelving and cabinet fronts." },
        { title: "Decorative panels", text: "Wall and ceiling panels, joinery and interior design." },
      ],
      specs: [
        { label: "Face", value: "Birch veneer, smooth fine grain", status: "declared", source: WEB },
        { label: "Grades offered", value: "C, D, E, F", status: "declared", source: WEB },
        { label: "Thickness options", value: "3–30 mm", status: "declared", source: WEB },
        ...FURN_COMMON("MR / Melamine / Phenolic"),
      ],
      image: "birch-panel-stack",
      imageAlt: "Stack of birch-faced plywood panels in the factory",
      related: ["eucalyptus-plywood", "poplar-plywood", "ev-plywood"],
    },
    {
      slug: "eucalyptus-plywood",
      parent: "furniture-plywood",
      name: "Eucalyptus Plywood",
      navLabel: "Eucalyptus Plywood",
      kicker: "Furniture · Eucalyptus",
      intro: "Dense, stable eucalyptus plywood for furniture substrates and panel processing.",
      overview: [
        "Plantation eucalyptus is denser than poplar, which gives good screw-holding and a firm substrate for laminating. It is widely used where a hard, stable panel is needed at a competitive price.",
        "Produced from 4 to 30 mm with MR, melamine or phenolic glue and E0.5 emission class. Core grade is agreed for each order.",
      ],
      strengths: ["Higher density than poplar", "Good screw and fastener holding", "E0.5 emission class"],
      considerations: ["Heavier than poplar for the same thickness", "Face colour varies more than birch"],
      applications: [
        { title: "Furniture substrates", text: "Laminated carcasses, tabletops and structural furniture parts." },
        { title: "Panel processing", text: "CNC-machined components and shop-fitting." },
      ],
      specs: [
        { label: "Species", value: "Eucalyptus", status: "declared", source: WEB },
        { label: "Thickness options", value: "4–30 mm", status: "declared", source: SALES },
        { label: "Density", value: "550–650 kg/m³", status: "declared", source: SALES },
        ...FURN_COMMON("MR / Melamine / Phenolic"),
      ],
      image: "eucalyptus-face-line",
      imageAlt: "Eucalyptus-faced plywood panel on the Kosmex production line",
      related: ["birch-plywood", "poplar-plywood", "raw-eucalyptus-plywood"],
    },
    {
      slug: "poplar-plywood",
      parent: "furniture-plywood",
      name: "Poplar Plywood",
      navLabel: "Poplar Plywood",
      kicker: "Furniture · Poplar",
      intro: "Lightweight poplar plywood, easy to cut and shape for furniture and interior panels.",
      overview: [
        "Poplar is a light, soft hardwood with a pale, even face. Its low weight helps furniture and panels that must be handled, shipped or assembled efficiently.",
        "Produced from 4 to 30 mm with MR, melamine or phenolic glue and E0.5 emission class. Core grade is agreed for each order.",
      ],
      strengths: ["Low weight", "Easy to cut and shape", "Pale, uniform face"],
      considerations: ["Lower screw-holding than eucalyptus or birch", "Not intended for structural loads"],
      applications: [
        { title: "Lightweight furniture", text: "Drawer bottoms, back panels and components where weight matters." },
        { title: "Interior panels", text: "Lining, partitions and decorative substrates." },
      ],
      specs: [
        { label: "Species", value: "Poplar", status: "declared", source: WEB },
        { label: "Thickness options", value: "4–30 mm", status: "declared", source: SALES },
        { label: "Density", value: "550–650 kg/m³", status: "declared", source: SALES },
        ...FURN_COMMON("MR / Melamine / Phenolic"),
      ],
      image: "poplar-plywood-face",
      imageAlt: "Large pale poplar-faced plywood panel held upright in the factory",
      related: ["birch-plywood", "eucalyptus-plywood", "ev-plywood"],
    },
    {
      slug: "ev-plywood",
      parent: "furniture-plywood",
      name: "EV Plywood",
      navLabel: "EV Plywood",
      kicker: "Furniture · Engineered Veneer",
      intro: "Engineered-veneer (EV) faced plywood with a smooth, uniform face, available as EV Pine or EV Poplar.",
      overview: [
        "EV (engineered veneer, also called recon veneer) is made by slicing, dyeing and re-pressing plantation wood into a reconstituted block. The result is a face veneer with a repeatable colour and grain, free of the natural defects found in rotary-cut faces.",
        "Kosmex lays 0.2 mm EV Pine or EV Poplar faces on a machine-jointed, sanded eucalyptus/acacia hardwood core, with MR (EN 636 Class 1) or WBP (EN 636 Class 2) glue. Panels are 4.6–25 mm with E0.5 emission class.",
      ],
      strengths: ["Uniform colour and grain from sheet to sheet", "Free of knots and natural face defects", "Good bending strength, E0.5 emission"],
      considerations: ["0.2 mm face, not sanded at the factory: avoid heavy sanding"],
      applications: [
        { title: "Furniture & cabinetry", text: "Wardrobes, kitchen cabinets, tables and shelving with matching visible faces." },
        { title: "Interior decoration", text: "Wall panelling, doors and shop-fitting where a consistent wood look is required." },
      ],
      specs: [
        { label: "Face designs", value: "EV Pine · EV Poplar", status: "declared", source: SALES },
        { label: "Face", value: "Engineered veneer, 0.2 mm, no face sanding", status: "declared", source: TDS },
        { label: "Core", value: "Eucalyptus / acacia hardwood, jointed by machine, core sanded", status: "declared", source: TDS },
        { label: "Glue", value: "MR (EN 636 Class 1) · WBP (EN 636 Class 2)", status: "declared", source: TDS },
        { label: "Thickness options", value: "4.6–25 mm", status: "declared", source: TDS },
        { label: "Thickness tolerance", value: "±0.3 mm (4.6–12 mm) · ±0.5 mm (13–25 mm)", status: "declared", source: TDS },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 mm", status: "declared", source: SALES },
        { label: "Length / width tolerance (EN 315)", value: "±1 mm", status: "declared", source: TDS },
        { label: "Density", value: "560–580 kg/m³", status: "declared", source: TDS },
        { label: "Formaldehyde emission class", value: "E0.5", status: "declared", source: TDS },
        { label: "Moisture content", value: "8–12%", status: "declared", source: TDS },
      ],
      image: "ev-plywood-stack",
      imageAlt: "Stack of EV engineered-veneer plywood sheets with uniform wood-look faces",
      related: ["poplar-plywood", "birch-plywood", "eucalyptus-plywood"],
    },
  ],
};

// ---------------------------------------------------------------------------
// 3. UPHOLSTERY PLYWOOD
// ---------------------------------------------------------------------------
const upholstery: Category = {
  slug: "upholstery-plywood",
  order: 3,
  name: "Upholstery Plywood",
  short: "Upholstery",
  tagline: "Hidden strength for upholstered furniture.",
  cardText: "High-density eucalyptus-core plywood for sofa, chair and bed frames, plus rubberwood bed slats. Cut to drawings.",
  primaryApplication: "Sofa frames, bed frames & slats",
  intro:
    "Plywood for the hidden structure of upholstered furniture: sofa and chair frames, bed frames and bed slats.",
  overview: [
    "In upholstered furniture the plywood is never seen, but it carries every load. Upholstery plywood is chosen for bond integrity, consistent thickness, fastener holding (staples, screws, dowels) and clean machining, not for face appearance.",
    "Kosmex upholstery plywood uses a dense eucalyptus core (630–650 kg/m³) built for cutting without delamination. Panels are supplied for frame cutting, and Kosmex also offers CNC cutting to customer drawings and finished bed slats.",
  ],
  benefits: ["Eucalyptus core, 630–650 kg/m³", "8–30 mm, thickness tolerance ±0.5 mm", "CNC cutting to drawings available", "Flat or curved rubberwood bed slats"],
  applications: [
    { title: "Sofa & chair frames", text: "Rails, arms, backs and seat frames cut from panel." },
    { title: "Bed frames", text: "Side rails, headboard structures and bases." },
    { title: "Bed slats", text: "Flat and curved slats for bed frames, bunk beds and sofa beds." },
  ],
  specs: [
    { label: "Product forms", value: "Panels for frame cutting · finished bed slats", status: "declared", source: WEB },
    { label: "CNC cutting", value: "To customer drawings", status: "declared", source: "kosmexgroup.com machines page" },
    { label: "Core", value: "Eucalyptus, AA / AB grade jointed by hand (per order)", status: "declared", source: SALES },
    { label: "Glue type", value: "MR / Melamine / Phenolic", status: "declared", source: SALES },
    { label: "Thickness options", value: "8–30 mm", status: "declared", source: SALES },
    { label: "Thickness tolerance", value: "±0.5 mm", status: "declared", source: SALES },
  ],
  image: "upholstery-panel-stack",
  imageAlt: "Stack of sanded light-faced plywood panels for upholstery frames",
  children: [
    {
      slug: "upholstery-plywood-overview",
      parent: "upholstery-plywood",
      name: "Upholstery Plywood",
      navLabel: "Upholstery Plywood",
      kicker: "Upholstery · Frame plywood",
      intro: "Dense eucalyptus-core plywood for sofa, chair and bed frames: panels for in-house cutting or CNC-cut parts to drawings.",
      overview: [
        "Frame plywood must hold staples and screws close to edges, resist delamination under cyclic loading, and machine cleanly on CNC routers. Face grade matters little; core quality and bond consistency matter a lot.",
        "Kosmex builds upholstery plywood on an AA or AB grade eucalyptus core with pine CP/CP faces and 1.6 mm layers, at a density of 630–650 kg/m³, guaranteed to cut without delamination. Components are typically cut from 15–18 mm panels and assembled with staples, screws and corner blocks.",
      ],
      strengths: ["High density for staple and screw holding", "Cuts without delamination", "Panels or CNC-cut parts"],
      considerations: ["Specify fastener type and edge distances in drawings", "Core gaps and overlaps may occur: agree acceptance criteria per order"],
      applications: [
        { title: "Seat & back frames", text: "Load-bearing rails and frame members." },
        { title: "Arms & panels", text: "Shaped arm components and closing panels." },
        { title: "Pre-cut parts", text: "CNC-cut components to the buyer's drawings." },
      ],
      specs: [
        { label: "Core", value: "Eucalyptus, 1.6 mm layers", status: "declared", source: TDS },
        { label: "Core quality", value: "AA / AB grade, jointed by hand (per order)", status: "declared", source: SALES },
        { label: "Face / back", value: "Pine, CP / CP", status: "declared", source: TDS },
        { label: "Glue type", value: "MR / Melamine / Phenolic", status: "declared", source: SALES },
        { label: "Thickness options", value: "8–30 mm", status: "declared", source: SALES },
        { label: "Thickness tolerance", value: "±0.5 mm", status: "declared", source: TDS },
        { label: "Standard dimensions", value: "1220 × 2440 mm", status: "declared", source: TDS },
        { label: "Density", value: "630–650 kg/m³", status: "declared", source: TDS },
        { label: "Formaldehyde emission class", value: "E0.5", status: "declared", source: TDS },
        { label: "Moisture content at delivery", value: "8–14%", status: "declared", source: SALES },
        { label: "Supply form", value: "Panels or CNC-cut parts", status: "declared", source: "kosmexgroup.com machines page" },
      ],
      image: "upholstery-panel-stack",
      imageAlt: "Stack of sanded light-faced plywood panels for upholstery frames",
      related: ["bed-frame-bed-slat-applications", "eucalyptus-plywood", "poplar-plywood"],
    },
    {
      slug: "bed-frame-bed-slat-applications",
      parent: "upholstery-plywood",
      name: "Bed Slats",
      navLabel: "Bed Slats",
      kicker: "Upholstery · Bed slats",
      intro: "Rubberwood bed slats, flat or curved, for bed, bunk bed and sofa bed manufacturers.",
      overview: [
        "Kosmex bed slats are made with rubberwood face and core veneers, sanded edges and MR glue (EN 636 Class 1), at a density of 700–720 kg/m³. Each slat is built to bear a load of 70 kg and up.",
        "Standard size is 15 × 60 mm in lengths from 680 to 1180 mm, supplied flat or curved (R4000). Sizes, curvature and packing are customised to the buyer's order.",
      ],
      strengths: ["Rubberwood, 700–720 kg/m³", "Bears 70 kg and up", "Flat or curved (R4000)"],
      considerations: ["Packing per bundle depends on slat size"],
      applications: [
        { title: "Bed frames", text: "Slatted bases for single, double and king beds." },
        { title: "Bunk & sofa beds", text: "Slats for bunk beds, sofa beds and folding beds." },
      ],
      specs: [
        { label: "Species", value: "Rubberwood (face and core)", status: "declared", source: TDS },
        { label: "Standard sizes", value: "15 × 60 × 680–1180 mm or customised", status: "declared", source: TDS },
        { label: "Curvature", value: "R4000 or flat (per order)", status: "declared", source: SALES },
        { label: "Thickness tolerance", value: "±1 mm", status: "declared", source: TDS },
        { label: "Edge", value: "Sanded", status: "declared", source: TDS },
        { label: "Glue", value: "MR, EN 636 Class 1", status: "declared", source: TDS },
        { label: "Density", value: "700–720 kg/m³", status: "declared", source: TDS },
        { label: "Formaldehyde emission class", value: "E0 / E1 / E2", status: "declared", source: TDS },
        { label: "Moisture content", value: "8–12%", status: "declared", source: TDS },
        { label: "Packing per bundle", value: "Depends on slat size", status: "declared", source: SALES },
      ],
      image: "bed-slats-moisture",
      imageAlt: "Rubberwood bed slats checked with a moisture meter reading 12%",
      related: ["upholstery-plywood-overview", "upholstery-plywood", "poplar-plywood"],
    },
  ],
};

// ---------------------------------------------------------------------------
// 4. PACKING PLYWOOD
// ---------------------------------------------------------------------------
const packing: Category = {
  slug: "packing-plywood",
  order: 4,
  name: "Packing Plywood",
  short: "Packing",
  tagline: "Fit-for-purpose panels for industrial packaging.",
  cardText: "Raw acacia, eucalyptus and styrax-faced plywood for crates, pallets, boxes and protective export packaging.",
  primaryApplication: "Crates, pallets & export packaging",
  intro:
    "Cost-efficient plywood for industrial packaging: crates, cases, pallet decks and protective export packing.",
  overview: [
    "Packing plywood is specified for strength, nail holding and dimensional consistency rather than appearance. Raw (unsanded) faces keep cost down while the cross-laminated core resists splitting at fastener points.",
    "Kosmex offers acacia and eucalyptus raw panels and a tropical-faced group (Styrax, Okoume, Bintangor). Plywood is a processed wood product and is generally outside ISPM 15 heat-treatment requirements for wood packaging, but buyers should confirm the rules that apply at destination.",
  ],
  benefits: ["Acacia, eucalyptus and tropical faces", "4–30 mm, 1220 × 2440 / 1250 × 2500 mm or customised", "MR, melamine or phenolic glue", "Nail- and screw-holding hardwood cores"],
  applications: [
    { title: "Export crates & cases", text: "Machinery, spare parts and equipment crating." },
    { title: "Pallets & pallet decks", text: "Deck boards and pallet collars." },
    { title: "Boxes & protective packing", text: "Heavy-duty boxes and inner protection." },
  ],
  specs: [
    { label: "Core species", value: "Acacia, eucalyptus or mixed hardwood", status: "declared", source: "kosmexgroup.com commercial plywood page" },
    { label: "Face options", value: "Acacia · Eucalyptus · Styrax · Okoume · Bintangor", status: "declared", source: SALES },
    { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com commercial plywood page" },
    { label: "Glue type", value: "MR / Melamine / Phenolic", status: "declared", source: SALES },
    { label: "Thickness options", value: "4–30 mm", status: "declared", source: SALES },
    { label: "Moisture content", value: "8–14%", status: "declared", source: SALES },
  ],
  image: "packing-plywood-bundle",
  imageAlt: "Strapped bundle of raw packing plywood at the Kosmex factory",
  children: [
    {
      slug: "raw-acacia-plywood",
      parent: "packing-plywood",
      name: "Raw Acacia Plywood",
      navLabel: "Raw Acacia Plywood",
      kicker: "Packing · Acacia",
      intro: "Unsanded acacia plywood for crates, cases and heavy-duty packaging.",
      overview: [
        "Acacia is a dense plantation hardwood. It gives a strong packing panel with good nail holding, which suits heavy crates and cases.",
        "Supplied with raw (unsanded) faces from 4 to 30 mm, with MR, melamine or phenolic glue. Grade is agreed for each order.",
      ],
      strengths: ["Dense hardwood for heavy-duty crating", "Good nail holding", "Raw faces for cost efficiency"],
      considerations: ["Heavier than poplar or tropical-faced panels"],
      applications: [
        { title: "Heavy crates", text: "Machinery and equipment export crates." },
        { title: "Industrial cases", text: "Re-usable transport cases." },
      ],
      specs: [
        { label: "Species", value: "Acacia", status: "declared", source: "kosmexgroup.com" },
        { label: "Surface", value: "Raw / unsanded", status: "declared", source: SALES },
        { label: "Glue type", value: "MR / Melamine / Phenolic", status: "declared", source: SALES },
        { label: "Thickness options", value: "4–30 mm", status: "declared", source: SALES },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com" },
        { label: "Moisture content", value: "8–14%", status: "declared", source: SALES },
      ],
      image: "raw-acacia-stacks",
      imageAlt: "Strapped stacks of raw acacia plywood on pallets in the Kosmex warehouse",
      related: ["raw-eucalyptus-plywood", "styrax-okoume-bintangor-plywood", "film-faced-plywood"],
    },
    {
      slug: "raw-eucalyptus-plywood",
      parent: "packing-plywood",
      name: "Raw Eucalyptus Plywood",
      navLabel: "Raw Eucalyptus Plywood",
      kicker: "Packing · Eucalyptus",
      intro: "High-density raw eucalyptus plywood for pallets, boxes and general industrial packaging.",
      overview: [
        "Eucalyptus combines good density with consistent availability from plantation sources. Kosmex raw eucalyptus plywood reaches 700 kg/m³ or more and is guaranteed to cut without delamination.",
        "Faces are short-grain jointed eucalyptus, grade CP/CP, on a eucalyptus core, with MR or melamine glue.",
      ],
      strengths: ["Density ≥ 700 kg/m³", "Cuts without delamination", "CP/CP faces"],
      considerations: ["Heavier than styrax for the same thickness"],
      applications: [
        { title: "Pallets & collars", text: "Pallet decks and collar boards." },
        { title: "Boxes", text: "General-purpose industrial boxes." },
      ],
      specs: [
        { label: "Face / back", value: "Eucalyptus, short-grain joint, CP / CP", status: "declared", source: TDS },
        { label: "Core", value: "Eucalyptus", status: "declared", source: TDS },
        { label: "Glue type", value: "MR / Melamine", status: "declared", source: TDS },
        { label: "Thickness options", value: "8–25 mm", status: "declared", source: TDS },
        { label: "Thickness tolerance", value: "±0.5 mm", status: "declared", source: TDS },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 mm", status: "declared", source: TDS },
        { label: "Density", value: "≥ 700 kg/m³", status: "declared", source: TDS },
        { label: "Formaldehyde emission class", value: "E0 / E1 / E2", status: "declared", source: TDS },
        { label: "Moisture content", value: "8–12%", status: "declared", source: TDS },
      ],
      image: "raw-eucalyptus-panel",
      imageAlt: "Raw eucalyptus plywood panel with short-grain jointed face",
      related: ["raw-acacia-plywood", "styrax-okoume-bintangor-plywood", "eucalyptus-plywood"],
    },
    {
      slug: "styrax-okoume-bintangor-plywood",
      parent: "packing-plywood",
      name: "Styrax / Okoume / Bintangor Plywood",
      navLabel: "Styrax / Okoume / Bintangor",
      kicker: "Packing · Tropical faces",
      intro: "Lightweight packing plywood with Styrax, Okoume or Bintangor faces, in AA, AB and BC grades.",
      overview: [
        "Tropical face veneers give a more uniform, better-looking surface than raw core-species faces. That suits packaging that is printed, branded or seen by end customers.",
        "Kosmex full-styrax plywood is light (450–500 kg/m³) with good screw holding: styrax face and core, MR glue (EN 636 Class 1), 6–21 mm, E0.5 emission class. Okoume and Bintangor faces are available on request.",
      ],
      strengths: ["Light weight, 450–500 kg/m³", "Good screw holding", "More uniform face appearance"],
      considerations: ["Legal-sourcing documentation required for tropical species"],
      applications: [
        { title: "Presentation packaging", text: "Visible cases and branded crates." },
        { title: "General packing", text: "Boxes and crates where face quality is preferred." },
      ],
      specs: [
        { label: "Face species", value: "Styrax / Okoume / Bintangor", status: "declared", source: SALES },
        { label: "Grades", value: "AA / AB / BC", status: "declared", source: SALES },
        { label: "Styrax plywood: face & core", value: "Styrax, no face sanding", status: "declared", source: TDS },
        { label: "Glue type", value: "MR (EN 636 Class 1) / Melamine", status: "declared", source: TDS },
        { label: "Thickness options", value: "6–21 mm", status: "declared", source: TDS },
        { label: "Thickness tolerance", value: "±0.3 mm (6–9 mm) · ±0.5 mm (9–21 mm)", status: "declared", source: TDS },
        { label: "Standard dimensions", value: "1220 × 2440 mm", status: "declared", source: TDS },
        { label: "Density (styrax)", value: "450–500 kg/m³", status: "declared", source: TDS },
        { label: "Formaldehyde emission class", value: "E0.5", status: "declared", source: TDS },
        { label: "Moisture content", value: "8–14%", status: "declared", source: TDS },
      ],
      image: "styrax-plywood-stack",
      imageAlt: "Stack of styrax-faced packing plywood in the Kosmex factory",
      related: ["raw-acacia-plywood", "raw-eucalyptus-plywood", "furniture-plywood"],
    },
  ],
};

export const categories: Category[] = [filmFaced, furniture, upholstery, packing];

export const allProducts: Product[] = categories.flatMap((c) => c.children);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getProduct = (slug: string) => allProducts.find((p) => p.slug === slug);

export const productHref = (slug: string): string => {
  const c = getCategory(slug);
  if (c) return `/products/${c.slug}/`;
  const p = getProduct(slug);
  return p ? `/products/${p.parent}/${p.slug}/` : "/products/";
};

export const productName = (slug: string) => getCategory(slug)?.name ?? getProduct(slug)?.name ?? slug;
