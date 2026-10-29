import type { Status } from "./site";

/**
 * Product taxonomy — order is contractual (approved wireframe V8):
 * 1 Film Faced · 2 Furniture · 3 Upholstery · 4 Packing.
 *
 * Spec values carry a `status`:
 *  - declared: published by Kosmex (TDS Oct 2025 or kosmexgroup.com product page)
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

const TDS = "Kosmex TDS, Oct 2025";
const WEB = "kosmexgroup.com product page";

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
    "The film gives a smooth, water-resistant casting face for clean concrete surfaces. The cross-laminated core provides stiffness and screw-holding at formwork thicknesses. Film weight, glue system and core species set the performance class. Kosmex publishes these in its Technical Data Sheet so buyers can compare grades like-for-like.",
    "Like every timber-based formwork panel, service life depends on handling, release agent, edge maintenance and the concrete pour. Kosmex does not publish a guaranteed number of re-uses. Grade selection should be discussed with the technical sales team for each project type.",
  ],
  benefits: [
    "KOSMEX logo printed in the film for on-site product identification",
    "Brown or black phenolic film, 120–220 g/m² across declared grades",
    "Acacia and acacia/eucalyptus hardwood cores",
    "1220 × 2440, 1250 × 2500 or 610 × 2500 mm, or customised size",
    "Edges sealed with waterproof paint",
    "Published TDS and EN-method laboratory test reports",
  ],
  applications: [
    { title: "Concrete formwork & shuttering", text: "Wall, column and slab formwork where a smooth, consistent concrete finish is required." },
    { title: "Building & civil construction", text: "Residential, commercial and infrastructure pours, including bridge works (per Kosmex application list)." },
    { title: "Industrial flooring", text: "Anti-slip film variants for truck, trailer and container floors and walkways." },
    { title: "Temporary works", text: "Hoarding, site protection and other short-cycle construction uses." },
  ],
  specs: [
    { label: "Core species", value: "Acacia, eucalyptus or mixed hardwood", status: "declared", source: WEB },
    { label: "Face / back", value: "Phenolic resin film, both faces", status: "declared", source: WEB },
    { label: "Film colour", value: "Brown / black", status: "declared", source: TDS },
    { label: "Film weight", value: "120 g/m² (Eco) · 180 g/m² (Premium) · 220 g/m² (Anti-slip)", status: "declared", source: TDS },
    { label: "Glue type", value: "MUF (Eco) · MUF / PF (Premium, Anti-slip)", status: "declared", source: TDS },
    { label: "Bonding classification", value: "BR-6h boil resistant (Eco) · EN 314-2 Class 2 & 3 (Premium)", status: "declared", source: TDS },
    { label: "Thickness options", value: "9–21 mm", status: "declared", source: WEB },
    { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: TDS },
    { label: "Density (EN 323)", value: "550 kg/m³ acacia · 600 kg/m³ mix · 650 kg/m³ eucalyptus (±3%)", status: "declared", source: TDS },
    { label: "Length / width tolerance (EN 315)", value: "±1 mm", status: "declared", source: TDS },
    { label: "Thickness tolerance (EN 315)", value: "±0.5 mm", status: "declared", source: TDS },
    { label: "Moisture content (EN 322)", value: "< 12%", status: "declared", source: TDS },
    { label: "Formaldehyde emission class", value: "E1 / E2 (declared)", status: "declared", source: TDS },
    { label: "Edge sealing", value: "Waterproof paint", status: "declared", source: WEB },
    { label: "Bending strength — 18 mm, 13-ply (EN 310)", value: "49 / 47.3 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
    { label: "Modulus of elasticity — 18 mm (EN 310)", value: "6,470 / 5,670 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
    { label: "Anti-slip surface (DIN 51130)", value: "Acceptance angle 18.0° — R10 band", status: "verified", source: "QUATEST 3 KT3-01466AXD5" },
    { label: "Abrasion — anti-slip film (EN 438-2)", value: "680 revolutions", status: "verified", source: "T&T Laboratory 11/MCI.AHV/IV/25" },
    { label: "Number of re-uses", status: "pending" },
    { label: "CE marking / Declaration of Performance", status: "pending" },
  ],
  image: "ffp-kosmex-render",
  imageAlt: "KOSMEX film faced plywood panel with the logo printed across the film",
  children: [],
};

const PROVISIONAL_GRADE =
  "Grade names are provisional until Kosmex confirms its commercial grade structure. The published TDS uses “Eco Form” and “Premium Form”; no TDS exists yet for a Standard grade.";

filmFaced.children = [
  {
    slug: "economy-grade",
    parent: "film-faced-plywood",
    name: "Economy Grade Film Faced Plywood",
    navLabel: "Economy Grade",
    kicker: "Film Faced · Grade 01",
    intro:
      "Entry formwork grade with 120 g/m² film on an acacia core. Mapped to the Kosmex “Eco Form” TDS column.",
    overview: [
      "The Economy grade is intended for formwork where cost per pour matters more than the maximum number of cycles: short-cycle residential work, foundations and temporary structures.",
      "Declared construction: brown or black 120 g/m² phenolic film, acacia core, MUF glue, BR-6h (boil resistant) bonding.",
    ],
    strengths: ["Lower film weight for cost-sensitive projects", "Acacia core, 550 kg/m³ declared density", "Same dimensional tolerances as Premium (EN 315)"],
    considerations: ["MUF bond: not the same as a full phenolic (PF) bond", "Lighter film wears faster than 180 g/m²", "Confirm whether the KOSMEX logo print is offered on this grade"],
    applications: [
      { title: "Foundations & footings", text: "Below-grade pours where surface finish is less critical." },
      { title: "Short-cycle formwork", text: "Projects with a limited number of planned pours." },
    ],
    specs: [
      { label: "TDS reference", value: "Eco Form Film Faced Plywood", status: "declared", source: TDS },
      { label: "Film", value: "Black / brown phenolic film, 120 g/m²", status: "declared", source: TDS },
      { label: "Core", value: "Acacia", status: "declared", source: TDS },
      { label: "Glue", value: "MUF", status: "declared", source: TDS },
      { label: "Bonding quality", value: "BR-6h (boil resistant)", status: "declared", source: TDS },
      { label: "Density (EN 323)", value: "550 kg/m³", status: "declared", source: TDS },
      { label: "Bending strength, length / width (EN 310)", value: "40 / 30 N/mm²", status: "declared", source: TDS },
      { label: "Modulus of elasticity, length / width (EN 310)", value: "5,000 / 3,000 N/mm²", status: "declared", source: TDS },
      { label: "Moisture content (EN 322)", value: "< 12%", status: "declared", source: TDS },
      { label: "Tolerances (EN 315)", value: "L/W ±1 mm · thickness ±0.5 mm", status: "declared", source: TDS },
      { label: "Emission class", value: "E1 / E2 (declared)", status: "declared", source: TDS },
      { label: "Sizes", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: TDS },
      { label: "Thickness options for this grade", status: "pending" },
      { label: "Number of re-uses", status: "pending" },
    ],
    image: "ffp-factory-stacks",
    imageAlt: "Stacks of black film faced plywood panels in the Kosmex factory",
    related: ["standard-grade", "premium-grade", "film-faced-plywood"],
    provisional: PROVISIONAL_GRADE,
  },
  {
    slug: "standard-grade",
    parent: "film-faced-plywood",
    name: "Standard Grade Film Faced Plywood",
    navLabel: "Standard Grade",
    kicker: "Film Faced · Grade 02",
    intro:
      "Mid-range formwork grade planned between Economy and Premium. Kosmex has not yet published a specification for this grade.",
    overview: [
      "This page reserves the position of a mid-range grade in the Kosmex film faced line-up. Every specification below stays blank until Kosmex releases a Technical Data Sheet for it.",
      "Until then, buyers can request a project-specific specification. Kosmex can propose film weight, core and glue to suit the application.",
    ],
    strengths: ["Positioned for general construction formwork", "Specification on request for each project"],
    considerations: ["No published TDS yet", "All values pending Kosmex confirmation"],
    applications: [{ title: "General construction formwork", text: "Walls, columns and slabs on standard building projects." }],
    specs: [
      { label: "Film type & weight", status: "pending" },
      { label: "Core composition", status: "pending" },
      { label: "Glue specification", status: "pending" },
      { label: "Bonding classification", status: "pending" },
      { label: "Thickness options", status: "pending" },
      { label: "Density", status: "pending" },
      { label: "Mechanical properties", status: "pending" },
      { label: "Sizes", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: TDS },
    ],
    image: "ffp-factory-panels",
    imageAlt: "Black film faced plywood panels inspected on the factory floor",
    related: ["economy-grade", "premium-grade", "film-faced-plywood"],
    provisional: PROVISIONAL_GRADE,
  },
  {
    slug: "premium-grade",
    parent: "film-faced-plywood",
    name: "Premium Grade Film Faced Plywood",
    navLabel: "Premium Grade",
    kicker: "Film Faced · Grade 03",
    intro:
      "Heavier 180 g/m² film on an acacia/eucalyptus core with MUF/PF glue. Mapped to the Kosmex “Premium Form” TDS column.",
    overview: [
      "The Premium grade is for buyers who need higher stiffness and a more durable casting face: multi-storey building frames, visible concrete and contractors who want more cycles from each panel.",
      "Declared construction: 180 g/m² brown or black phenolic film, acacia/eucalyptus mixed core, MUF/PF glue, EN 314-2 Class 2 & 3 bonding. The declared bending values match an independent EN 310 test of an 18 mm, 13-ply sample.",
    ],
    strengths: [
      "180 g/m² film: 50% heavier than Economy",
      "Higher declared bending strength and stiffness",
      "EN 310 bending test report published (18 mm sample)",
    ],
    considerations: ["Confirm thickness range and ply count per thickness", "Bond class test report (EN 314) not yet published"],
    applications: [
      { title: "Building frame formwork", text: "Walls, columns and slabs on repeated-cycle building projects." },
      { title: "Fair-faced concrete", text: "Where surface quality of the cast concrete is specified." },
    ],
    specs: [
      { label: "TDS reference", value: "Premium Form Film Faced Plywood", status: "declared", source: TDS },
      { label: "Film", value: "Black / brown phenolic film, 180 g/m²", status: "declared", source: TDS },
      { label: "Core", value: "Acacia / eucalyptus mix", status: "declared", source: TDS },
      { label: "Glue", value: "MUF / PF", status: "declared", source: TDS },
      { label: "Bonding quality", value: "EN 314-2 Class 2 & 3", status: "declared", source: TDS },
      { label: "Density (EN 323)", value: "550 / 600 / 650 kg/m³ ±3% by core", status: "declared", source: TDS },
      { label: "Bending strength, length / width (EN 310)", value: "49 / 47 N/mm²", status: "declared", source: TDS },
      { label: "Modulus of elasticity, length / width (EN 310)", value: "6,400 / 5,600 N/mm²", status: "declared", source: TDS },
      { label: "Independent test — 18 mm, 13-ply", value: "49 / 47.3 MPa · MOE 6,470 / 5,670 MPa", status: "verified", source: "T&T Laboratory 06/MCI.AHK/IV/25" },
      { label: "Moisture content (EN 322)", value: "< 12%", status: "declared", source: TDS },
      { label: "Tolerances (EN 315)", value: "L/W ±1 mm · thickness ±0.5 mm", status: "declared", source: TDS },
      { label: "Emission class", value: "E1 / E2 (declared)", status: "declared", source: TDS },
      { label: "Thickness options for this grade", status: "pending" },
      { label: "Number of re-uses", status: "pending" },
    ],
    image: "ffp-kosmex-render",
    imageAlt: "Premium KOSMEX film faced plywood panel with logo-printed film",
    related: ["economy-grade", "standard-grade", "film-faced-plywood"],
    provisional: PROVISIONAL_GRADE,
  },
];

// ---------------------------------------------------------------------------
// 2. FURNITURE PLYWOOD
// ---------------------------------------------------------------------------
const furniture: Category = {
  slug: "furniture-plywood",
  order: 2,
  name: "Furniture Plywood",
  short: "Furniture",
  tagline: "Stable substrates for furniture production.",
  cardText: "Birch, eucalyptus and poplar plywood with sanded faces for cabinet, panel and interior furniture manufacturing.",
  primaryApplication: "Furniture & interior manufacturing",
  intro:
    "Sanded plywood in birch, eucalyptus and poplar for furniture producers, panel processors and interior manufacturers.",
  overview: [
    "Furniture plywood is selected on face quality, flatness, machining behaviour and bond integrity rather than on structural values. Kosmex supplies three species families, each with a different balance of appearance, weight and cost.",
    "Faces are sanded on both sides for laminating, veneering, painting or lacquering. Grade, glue system and emission class are specified per order. Kosmex is preparing a Furniture Plywood TDS.",
  ],
  benefits: ["Three species: birch, eucalyptus, poplar", "Sanded two faces", "Specified per order: grade, glue, emission class", "Suited to CNC and panel processing"],
  applications: [
    { title: "Case & cabinet furniture", text: "Carcasses, shelving and drawer components." },
    { title: "Interior panels", text: "Wall and ceiling panels, joinery and fit-out." },
    { title: "Laminated & veneered panels", text: "Substrate for HPL, melamine paper or decorative veneer." },
  ],
  specs: [
    { label: "Species", value: "Birch · Eucalyptus · Poplar", status: "declared", source: WEB },
    { label: "Surface", value: "Sanded two faces", status: "declared", source: WEB },
    { label: "Face / back grades", status: "pending" },
    { label: "Glue type & bond class", status: "pending" },
    { label: "Thickness options", status: "pending" },
    { label: "Standard dimensions", status: "pending" },
    { label: "Formaldehyde emission class", status: "pending" },
    { label: "Moisture content", status: "pending" },
  ],
  image: "upholstery-panel-stack",
  imageAlt: "Stack of sanded light-faced plywood panels for upholstery frames",
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
        "Kosmex lists multiple birch face grades. The grade system and lay-up (birch-faced or all-birch core) should be confirmed for each order.",
      ],
      strengths: ["Fine, light-coloured face", "Clean edges for exposed-ply designs", "Wide declared thickness range"],
      considerations: ["Confirm core construction: birch-faced vs. all-birch", "Grade naming (C/D/E/F published) to be aligned with buyer standards"],
      applications: [
        { title: "Furniture manufacturing", text: "Exposed-edge furniture, shelving and cabinet fronts." },
        { title: "Decorative panels", text: "Wall and ceiling panels, joinery and interior design." },
      ],
      specs: [
        { label: "Face", value: "Birch veneer, smooth fine grain", status: "declared", source: WEB },
        { label: "Grades offered", value: "C, D, E, F (per Kosmex)", status: "declared", source: WEB },
        { label: "Thickness options", value: "3–30 mm", status: "declared", source: WEB },
        { label: "Core construction", status: "pending" },
        { label: "Glue type & bond class", status: "pending" },
        { label: "Standard dimensions", status: "pending" },
        { label: "Formaldehyde emission class", status: "pending" },
        { label: "Moisture content", status: "pending" },
      ],
      image: "birch-panel-stack",
      imageAlt: "Stack of birch-faced plywood panels in the factory",
      related: ["eucalyptus-plywood", "poplar-plywood", "upholstery-plywood"],
    },
    {
      slug: "eucalyptus-plywood",
      parent: "furniture-plywood",
      name: "Eucalyptus Plywood",
      navLabel: "Eucalyptus Plywood",
      kicker: "Furniture · Eucalyptus",
      intro: "Dense, stable eucalyptus plywood, sanded two faces, for furniture substrates and panel processing.",
      overview: [
        "Plantation eucalyptus is denser than poplar, which gives good screw-holding and a firm substrate for laminating. It is widely used where a hard, stable panel is needed at a competitive price.",
        "Sanded on both faces. Grade, thickness and glue specification are agreed for each order.",
      ],
      strengths: ["Higher density than poplar", "Good screw and fastener holding", "Sanded two faces"],
      considerations: ["Heavier than poplar for the same thickness", "Face colour varies more than birch"],
      applications: [
        { title: "Furniture substrates", text: "Laminated carcasses, tabletops and structural furniture parts." },
        { title: "Panel processing", text: "CNC-machined components and shop-fitting." },
      ],
      specs: [
        { label: "Species", value: "Eucalyptus", status: "declared", source: WEB },
        { label: "Surface", value: "Sanded two faces", status: "declared", source: WEB },
        { label: "Core construction", status: "pending" },
        { label: "Glue type & bond class", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Standard dimensions", status: "pending" },
        { label: "Density", status: "pending" },
        { label: "Formaldehyde emission class", status: "pending" },
      ],
      image: "eucalyptus-face-panel",
      imageAlt: "Eucalyptus-faced plywood panel with warm, even grain",
      imageIsGeneric: true,
      related: ["birch-plywood", "poplar-plywood", "raw-eucalyptus-plywood"],
    },
    {
      slug: "poplar-plywood",
      parent: "furniture-plywood",
      name: "Poplar Plywood",
      navLabel: "Poplar Plywood",
      kicker: "Furniture · Poplar",
      intro: "Lightweight poplar plywood, sanded two faces, easy to cut and shape for furniture and interior panels.",
      overview: [
        "Poplar is a light, soft hardwood with a pale, even face. Its low weight helps furniture and panels that must be handled, shipped or assembled efficiently.",
        "Sanded on both faces. Grade, thickness and glue specification are agreed for each order.",
      ],
      strengths: ["Low weight", "Easy to cut and shape", "Pale, uniform face"],
      considerations: ["Lower screw-holding than eucalyptus or birch", "Not intended for structural loads"],
      applications: [
        { title: "Lightweight furniture", text: "Drawer bottoms, back panels and components where weight matters." },
        { title: "Interior panels", text: "Lining, partitions and decorative substrates." },
      ],
      specs: [
        { label: "Species", value: "Poplar", status: "declared", source: WEB },
        { label: "Surface", value: "Sanded two faces", status: "declared", source: WEB },
        { label: "Core construction", status: "pending" },
        { label: "Glue type & bond class", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Standard dimensions", status: "pending" },
        { label: "Density", status: "pending" },
        { label: "Formaldehyde emission class", status: "pending" },
      ],
      image: "poplar-plywood-face",
      imageAlt: "Large pale poplar-faced plywood panel held upright in the factory",
      related: ["birch-plywood", "eucalyptus-plywood", "upholstery-plywood"],
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
  cardText: "Plywood frame components and bed slats for sofa, chair and bed manufacturers. Cut, profiled and specified for the frame.",
  primaryApplication: "Sofa frames, bed frames & slats",
  intro:
    "Plywood for the hidden structure of upholstered furniture: sofa and chair frames, bed frames and sprung bed slats.",
  overview: [
    "In upholstered furniture the plywood is never seen, but it carries every load. Upholstery plywood is chosen for bond integrity, consistent thickness, fastener holding (staples, screws, dowels) and clean machining, not for face appearance.",
    "Kosmex supplies panels for frame cutting as well as finished components such as bed slats, and offers CNC cutting to customer drawings.",
  ],
  benefits: ["Frame panels and finished components", "CNC cutting to drawings available", "Flat or curved bed slats", "Specified for staple and screw holding"],
  applications: [
    { title: "Sofa & chair frames", text: "Rails, arms, backs and seat frames cut from panel." },
    { title: "Bed frames", text: "Side rails, headboard structures and bases." },
    { title: "Bed slats", text: "Flat and curved slats for bed frames, bunk beds and sofa beds." },
  ],
  specs: [
    { label: "Product forms", value: "Panels for frame cutting · finished bed slats", status: "declared", source: WEB },
    { label: "CNC cutting", value: "To customer drawings", status: "declared", source: "kosmexgroup.com machines page" },
    { label: "Panel species & lay-up", status: "pending" },
    { label: "Glue type & bond class", status: "pending" },
    { label: "Thickness options", status: "pending" },
    { label: "Thickness tolerance", status: "pending" },
  ],
  image: "upholstery-panel-stack",
  imageAlt: "Stack of sanded light-faced plywood panels for upholstery frames",
  children: [
    {
      slug: "upholstery-plywood-overview",
      parent: "upholstery-plywood",
      name: "Upholstery Plywood Overview",
      navLabel: "Upholstery Plywood Overview",
      kicker: "Upholstery · Overview",
      intro: "How to specify plywood for upholstered furniture frames: the properties that matter and the questions to settle before ordering.",
      overview: [
        "Frame plywood must hold staples and screws close to edges, resist delamination under cyclic loading, and machine cleanly on CNC routers. Face grade matters little; core quality and bond consistency matter a lot.",
        "When specifying, define thickness and tolerance, acceptable core gaps or overlaps, glue system, moisture content at delivery, and whether panels or pre-cut parts are required.",
      ],
      strengths: ["Core-quality focus over face grade", "Consistent thickness for jig-based assembly", "Panels or pre-cut parts"],
      considerations: ["Kosmex lay-up and species for frame panels to be confirmed", "Fastener-holding values not yet tested"],
      applications: [
        { title: "Frame panels", text: "Full sheets for in-house cutting by the furniture maker." },
        { title: "Pre-cut parts", text: "CNC-cut components to the buyer's drawings." },
      ],
      specs: [
        { label: "Species & lay-up", status: "pending" },
        { label: "Glue type & bond class", status: "pending" },
        { label: "Thickness options & tolerance", status: "pending" },
        { label: "Moisture content at delivery", status: "pending" },
        { label: "Core quality criteria", status: "pending" },
      ],
      image: "upholstery-panel-stack",
      imageAlt: "Stack of sanded light-faced plywood panels for upholstery frames",
      related: ["sofa-frame-applications", "bed-frame-bed-slat-applications", "poplar-plywood"],
    },
    {
      slug: "sofa-frame-applications",
      parent: "upholstery-plywood",
      name: "Plywood for Sofa Frames",
      navLabel: "Sofa Frame Applications",
      kicker: "Upholstery · Sofa frames",
      intro: "Plywood panels and cut parts for sofa and armchair frames: rails, arms, backs and seat structures.",
      overview: [
        "Plywood sofa frames replace solid-wood frames with a dimensionally stable, efficiently nested panel product. Components are typically CNC-cut from 15–18 mm panels and assembled with staples, screws and corner blocks. Final thickness is chosen by the furniture designer.",
        "Kosmex can supply full panels or cut components to drawings. Lay-up and glue specification are agreed with each manufacturer.",
      ],
      strengths: ["Efficient nesting from full panels", "Dimensional stability vs. solid wood", "CNC cutting to drawings"],
      considerations: ["Specify fastener type and edge distances in drawings", "Panel specification pending Kosmex TDS"],
      applications: [
        { title: "Seat & back frames", text: "Load-bearing rails and frame members." },
        { title: "Arms & panels", text: "Shaped arm components and closing panels." },
      ],
      specs: [
        { label: "Supply form", value: "Panels or CNC-cut parts", status: "declared", source: "kosmexgroup.com machines page" },
        { label: "Species & lay-up", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Glue type & bond class", status: "pending" },
      ],
      image: "veneer-jointing-line",
      imageAlt: "Veneer jointing machine assembling core veneer sheets",
      related: ["upholstery-plywood-overview", "bed-frame-bed-slat-applications", "eucalyptus-plywood"],
    },
    {
      slug: "bed-frame-bed-slat-applications",
      parent: "upholstery-plywood",
      name: "Plywood for Bed Frames & Bed Slats",
      navLabel: "Bed Frame & Bed Slat Applications",
      kicker: "Upholstery · Bed frames & slats",
      intro: "Bed slats (flat or curved) and frame components for bed, bunk bed and sofa bed manufacturers.",
      overview: [
        "Kosmex lists bed slats in common sizes such as 15 × 60 × 670 mm, 15 × 60 × 915 mm and 18 × 70 × 900 mm, supplied flat or curved, in natural, laminated or finished surfaces. Size, thickness and species can be customised.",
        "Declared moisture content is below 12%, with bonding to E0/E1 formaldehyde emission levels. Emission test reports are yet to be published.",
      ],
      strengths: ["Flat or curved slats", "Custom size, thickness and species", "Natural, laminated or finished surface"],
      considerations: ["Material listed by Kosmex as “rubber/beech wood”: confirm species", "Emission test report pending"],
      applications: [
        { title: "Bed frames", text: "Slatted bases for single, double and king beds." },
        { title: "Bunk & sofa beds", text: "Slats for bunk beds, sofa beds and folding beds." },
      ],
      specs: [
        { label: "Common sizes", value: "15 × 60 × 670 · 15 × 60 × 915 · 18 × 70 × 900 mm", status: "declared", source: WEB },
        { label: "Profile", value: "Flat or curved", status: "declared", source: WEB },
        { label: "Surface", value: "Natural, laminated or finished", status: "declared", source: WEB },
        { label: "Moisture content", value: "< 12%", status: "declared", source: WEB },
        { label: "Emission level", value: "E0 / E1 (declared)", status: "declared", source: WEB },
        { label: "Species", status: "pending" },
        { label: "Curvature radius", status: "pending" },
        { label: "Packing per bundle", status: "pending" },
      ],
      image: "qc-moisture-meter",
      imageAlt: "Moisture meter reading 12.0 on pale wood slats",
      related: ["upholstery-plywood-overview", "sofa-frame-applications", "poplar-plywood"],
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
  cardText: "Unsanded acacia, eucalyptus and tropical-faced plywood for crates, pallets, boxes and protective export packaging.",
  primaryApplication: "Crates, pallets & export packaging",
  intro:
    "Cost-efficient plywood for industrial packaging: crates, cases, pallet decks and protective export packing.",
  overview: [
    "Packing plywood is specified for strength, nail holding and dimensional consistency rather than appearance. Raw (unsanded) faces keep cost down while the cross-laminated core resists splitting at fastener points.",
    "Kosmex offers acacia and eucalyptus raw panels and a tropical-faced group (Styrax, Okoume, Bintangor). Plywood is a processed wood product and is generally outside ISPM 15 heat-treatment requirements for wood packaging, but buyers should confirm the rules that apply at destination.",
  ],
  benefits: ["Acacia, eucalyptus and tropical faces", "1220 × 2440 / 1250 × 2500 / 610 × 2500 mm or customised", "Raw faces for cost efficiency", "Nail- and screw-holding hardwood cores"],
  applications: [
    { title: "Export crates & cases", text: "Machinery, spare parts and equipment crating." },
    { title: "Pallets & pallet decks", text: "Deck boards and pallet collars." },
    { title: "Boxes & protective packing", text: "Heavy-duty boxes and inner protection." },
  ],
  specs: [
    { label: "Core species", value: "Acacia, eucalyptus or mixed hardwood", status: "declared", source: "kosmexgroup.com commercial plywood page" },
    { label: "Face options", value: "Acacia · Eucalyptus · Styrax · Okoume · Bintangor", status: "pending" },
    { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com commercial plywood page" },
    { label: "Glue type", status: "pending" },
    { label: "Thickness options", status: "pending" },
    { label: "Moisture content", status: "pending" },
  ],
  image: "packing-panel-stack",
  imageAlt: "Stack of raw plywood panels for export packaging",
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
        "Supplied with raw (unsanded) faces. Thickness, glue and grade are agreed for each order.",
      ],
      strengths: ["Dense hardwood for heavy-duty crating", "Good nail holding", "Raw faces for cost efficiency"],
      considerations: ["Heavier than poplar or tropical-faced panels", "Specification pending Kosmex TDS"],
      applications: [
        { title: "Heavy crates", text: "Machinery and equipment export crates." },
        { title: "Industrial cases", text: "Re-usable transport cases." },
      ],
      specs: [
        { label: "Species", value: "Acacia", status: "declared", source: "kosmexgroup.com" },
        { label: "Surface", value: "Raw / unsanded", status: "pending" },
        { label: "Glue type", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com" },
        { label: "Moisture content", status: "pending" },
      ],
      image: "veneer-storage",
      imageAlt: "Veneer and panel stacks in the factory warehouse",
      imageIsGeneric: true,
      related: ["raw-eucalyptus-plywood", "styrax-okoume-bintangor-plywood", "film-faced-plywood"],
    },
    {
      slug: "raw-eucalyptus-plywood",
      parent: "packing-plywood",
      name: "Raw Eucalyptus Plywood",
      navLabel: "Raw Eucalyptus Plywood",
      kicker: "Packing · Eucalyptus",
      intro: "Unsanded eucalyptus plywood for pallets, boxes and general industrial packaging.",
      overview: [
        "Eucalyptus combines good density with consistent availability from plantation sources. It is a common choice for pallets, boxes and general packaging.",
        "Supplied with raw (unsanded) faces. Thickness, glue and grade are agreed for each order.",
      ],
      strengths: ["Plantation hardwood", "Balanced strength and cost", "Raw faces"],
      considerations: ["Specification pending Kosmex TDS"],
      applications: [
        { title: "Pallets & collars", text: "Pallet decks and collar boards." },
        { title: "Boxes", text: "General-purpose industrial boxes." },
      ],
      specs: [
        { label: "Species", value: "Eucalyptus", status: "declared", source: "kosmexgroup.com" },
        { label: "Surface", value: "Raw / unsanded", status: "pending" },
        { label: "Glue type", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com" },
        { label: "Moisture content", status: "pending" },
      ],
      image: "eucalyptus-core-stack",
      imageAlt: "Stack of eucalyptus plywood panels showing the core layers",
      imageIsGeneric: true,
      related: ["raw-acacia-plywood", "styrax-okoume-bintangor-plywood", "eucalyptus-plywood"],
    },
    {
      slug: "styrax-okoume-bintangor-plywood",
      parent: "packing-plywood",
      name: "Styrax / Okoume / Bintangor Plywood",
      navLabel: "Styrax / Okoume / Bintangor",
      kicker: "Packing · Tropical faces",
      intro: "Packing plywood with Styrax, Okoume or Bintangor face veneers on a hardwood core.",
      overview: [
        "Tropical face veneers give a more uniform, better-looking surface than raw core-species faces. That suits packaging that is printed, branded or seen by end customers.",
        "Kosmex lists Okoume and Bintangor among its face veneer options. It is still to confirm whether the three species are separate products or one commercial category.",
      ],
      strengths: ["More uniform face appearance", "Hardwood core strength"],
      considerations: ["Confirm SKU structure (separate or combined)", "Legal-sourcing documentation required for tropical species"],
      applications: [
        { title: "Presentation packaging", text: "Visible cases and branded crates." },
        { title: "General packing", text: "Boxes and crates where face quality is preferred." },
      ],
      specs: [
        { label: "Face species", value: "Styrax / Okoume / Bintangor", status: "pending" },
        { label: "Core", value: "Acacia, eucalyptus or mixed hardwood", status: "declared", source: "kosmexgroup.com" },
        { label: "Glue type", status: "pending" },
        { label: "Thickness options", status: "pending" },
        { label: "Standard dimensions", value: "1220 × 2440 · 1250 × 2500 · 610 × 2500 mm · customised size", status: "declared", source: "kosmexgroup.com" },
        { label: "Available grades", status: "pending" },
      ],
      image: "okoume-face-panel",
      imageAlt: "Okoume-faced plywood panel with reddish grain on the production line",
      imageIsGeneric: true,
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
