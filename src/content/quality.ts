/**
 * QC stages: content from the kosmexgroup.com "QC Process" page, grouped
 * into the six stages of the approved homepage brief.
 */
export const qcStages = [
  {
    n: "01",
    title: "Raw Material Inspection",
    short: "Logs checked for species, diameter and moisture before peeling.",
    checks: ["Log species, diameter and moisture content checked before peeling", "Only selected veneers released to production"],
    image: "veneer-storage",
  },
  {
    n: "02",
    title: "Core Preparation & Assembly",
    short: "Veneer dried to 8–12% moisture and sorted by thickness and face.",
    checks: ["Veneer moisture controlled within 8–12% to prevent delamination", "Veneers sorted by thickness and surface appearance"],
    image: "veneer-jointing-line",
  },
  {
    n: "03",
    title: "Glue Application & Pressing",
    short: "Adhesive mixed per product formula; temperature, pressure and time controlled.",
    checks: ["Adhesive mixed to formula per plywood type (MR, WBP, melamine)", "Glue uniformity and spread checked before pressing", "Cold and hot press temperature, pressure and time controlled"],
    image: "production-hall",
  },
  {
    n: "04",
    title: "Dimensional Inspection",
    short: "Size tolerance, thickness calibration and flatness after trimming and sanding.",
    checks: ["Panel size tolerance and thickness calibration checked", "Panels with cracks, overlaps or uneven surfaces rejected"],
    image: "qc-caliper-ffp",
  },
  {
    n: "05",
    title: "Surface & Bonding Tests",
    short: "Random bond testing against EN 314-2 and surface inspection.",
    checks: ["Random bond testing according to EN 314-2", "Surface smoothness and film quality inspected"],
    image: "qc-bending-test",
  },
  {
    n: "06",
    title: "Final QC & Packaging",
    short: "100% panel inspection, final moisture and bond checks before shipment.",
    checks: ["100% of panels inspected for surface, labelling and packing condition", "Final moisture and bonding strength tests before shipment"],
    image: "qc-dimension-check",
  },
] as const;

export const machines = [
  { name: "Log peeling", text: "Rotary cutting of logs into veneer of uniform thickness." },
  { name: "Veneer drying", text: "Multi-layer roller dryer for fast, even moisture reduction." },
  { name: "Glue spreading & composing", text: "Accurate glue coating and veneer jointing." },
  { name: "Cold & hot pressing", text: "Stable bonding strength and flat panel surfaces." },
  { name: "Cutting & trimming", text: "Accurate sizing and clean edges." },
  { name: "Sanding line", text: "Thickness calibration and surface smoothness." },
  { name: "Film laminating", text: "Film pressing for film faced plywood with heat and pressure control." },
  { name: "CNC cutting & painting", text: "Custom cutting and surface finishing to customer drawings." },
] as const;

export const qualityPages = [
  { slug: "", title: "Quality Control Overview", text: "How Kosmex defines, checks and documents panel quality." },
  { slug: "qc-process", title: "QC Process", text: "Six inspection stages from log to loaded container." },
  { slug: "product-specifications", title: "Product Specifications", text: "Every specification field, with its source and status." },
  { slug: "technical-data-sheets", title: "Technical Data Sheets", text: "Published and pending TDS for each range." },
  { slug: "qc-reports", title: "QC Reports", text: "Batch-level inspection records for shipments." },
  { slug: "test-reports", title: "Test Reports", text: "Independent laboratory reports with method and date." },
  { slug: "testing-inspection", title: "Testing & Inspection", text: "Tests run in production and by external laboratories." },
  { slug: "material-core-expertise", title: "Material & Core Expertise", text: "Species, veneer, glue and core construction explained." },
] as const;
