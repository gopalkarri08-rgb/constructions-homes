import "server-only";

/**
 * Published grades and Indian standards for materials a homeowner buys.
 * Tiers are a practical grouping for this guide, not a maker's own ranking.
 * Warranty text is only what the pack or the maker's literature usually states.
 */

const PRODUCT_DISCLAIMER =
  "These options use published grades and Indian standards. They are not an endorsement, and they are not a substitute for the drawing or the engineer’s specification. Confirm the grade on the bag, the bill, and the test certificate.";

function brand(tier, name, grade, standard, warranty, features) {
  return { tier, name, grade, standard, warranty, features };
}

export const categories = [
  {
    id: "cement",
    title: "Cement",
    buy: "Ordinary Portland cement (OPC) or Portland pozzolana cement (PPC), in the grade the drawing names.",
    standard: "OPC: IS 269. PPC: IS 1489.",
    brands: [
      brand(
        "economy",
        "Shree Cement",
        "OPC 53 or PPC",
        "IS 269 (OPC) or IS 1489 (PPC)",
        "Cement bags do not carry a homeowner warranty. Ask for the BIS licence number on the bag.",
        ["53 grade OPC is the higher early-strength ordinary cement.", "PPC is the fly-ash blend used when the drawing allows it."],
      ),
      brand(
        "economy",
        "Ramco Cement",
        "PPC",
        "IS 1489",
        "No homeowner warranty period is printed on cement. Keep the bag print and the dealer bill.",
        ["PPC to IS 1489.", "Check the week of packing. Old stock in a damp godown is a poor buy."],
      ),
      brand(
        "standard",
        "ACC",
        "OPC 53 grade",
        "IS 269",
        "No separate warranty period. The published control is the IS 269 grade on the bag.",
        ["OPC 53 is specified when the drawing wants higher early strength.", "Do not swap it for a cheaper PPC unless the engineer agrees."],
      ),
      brand(
        "standard",
        "Ambuja Cement",
        "PPC",
        "IS 1489",
        "No homeowner warranty period. Match the type printed on the bag to the drawing.",
        ["PPC to IS 1489.", "Useful where the specification allows a blended cement."],
      ),
      brand(
        "premium",
        "UltraTech Cement",
        "OPC 53 or PPC",
        "IS 269 (OPC) or IS 1489 (PPC)",
        "No homeowner warranty period. Buy the grade named on the structural drawing.",
        ["Both OPC 53 and PPC are sold under published BIS grades.", "The delivery should name the type, not only the brand."],
      ),
    ],
  },
  {
    id: "tmt",
    title: "TMT steel",
    buy: "Thermo-mechanically treated bars in the ductile grade the drawing names, usually Fe 500D or Fe 550D.",
    standard: "IS 1786.",
    brands: [
      brand(
        "economy",
        "Kamdhenu",
        "Fe 500D",
        "IS 1786",
        "Bars are sold against a mill test certificate, not a homeowner warranty card.",
        ["Fe 500D is a ductile grade in IS 1786.", "The D grades specify higher elongation than plain Fe 500."],
      ),
      brand(
        "standard",
        "Jindal Panther",
        "Fe 550D",
        "IS 1786",
        "Ask for the mill test certificate for this lot. There is no separate home warranty.",
        ["Fe 550D is the higher-strength ductile grade.", "Diameter and brand mark should be readable on the bar."],
      ),
      brand(
        "standard",
        "JSW Neosteel",
        "Fe 550D",
        "IS 1786",
        "Supply is against the mill test certificate for IS 1786.",
        ["Published as Fe 550D TMT.", "Do not accept a smaller diameter in place of the bar schedule."],
      ),
      brand(
        "premium",
        "Tata Tiscon",
        "Fe 550D",
        "IS 1786",
        "Ask for the test certificate. The bar itself is not sold with a painted-on warranty period.",
        ["Fe 550D to IS 1786.", "The D grade is the one specified where ductility matters."],
      ),
      brand(
        "premium",
        "SAIL",
        "Fe 500D or Fe 550D",
        "IS 1786",
        "Mill test certificate for the heat supplied. No homeowner warranty card.",
        ["Both ductile grades are published under IS 1786.", "Match the grade on the certificate to the drawing."],
      ),
    ],
  },
  {
    id: "aggregates",
    title: "Aggregates and sand",
    buy: "Fine aggregate (manufactured sand or river sand) and 20 mm / 10 mm coarse aggregate that pass a sieve test.",
    standard: "IS 383.",
    brands: [
      brand(
        "economy",
        "Local crusher M-sand",
        "Zone II grading, low silt",
        "IS 383",
        "There is no brand warranty. Pay only against a recent sieve and silt report for this stock.",
        ["IS 383 is the aggregate specification, not a brand name.", "Reject sand that leaves a thick mud stain in a hand test."],
      ),
      brand(
        "standard",
        "RoboSand",
        "Manufactured sand, graded",
        "IS 383",
        "Ask the plant for the latest grading report. A brand name does not replace that sheet.",
        ["Manufactured sand sold against IS 383 grading.", "Still check silt. A printed brand on the trip sheet is not a lab test."],
      ),
      brand(
        "standard",
        "Crusher 20 mm aggregate",
        "20 mm nominal, graded",
        "IS 383",
        "No consumer warranty. The delivery should match a grading test for coarse aggregate.",
        ["Coarse aggregate for house concrete is specified by size under IS 383.", "A mix of dust and flaky stone is not 20 mm metal."],
      ),
      brand(
        "premium",
        "Washed plant sand",
        "Washed manufactured sand, Zone II",
        "IS 383",
        "The wash and the grading report are the assurance. There is no long homeowner warranty.",
        ["Washing cuts silt, which is what weakens a mix.", "Keep the report with the pour record."],
      ),
    ],
  },
  {
    id: "bricks",
    title: "Bricks and blocks",
    buy: "Common burnt clay bricks, or autoclaved aerated concrete blocks, in the class the drawing allows.",
    standard: "Clay bricks: IS 1077. AAC blocks: IS 2185 (Part 3).",
    brands: [
      brand(
        "economy",
        "Local kiln clay brick",
        "Class designation 7.5",
        "IS 1077",
        "No brand warranty. Reject bricks that crumble or vary wildly in size.",
        ["IS 1077 class 7.5 is a common minimum for house walls.", "Soak clay bricks before laying. AAC is a different product."],
      ),
      brand(
        "standard",
        "First-class clay brick",
        "Class 10 or higher",
        "IS 1077",
        "The kiln’s class mark is the specification. There is no warranty card.",
        ["Higher class means a higher compressive strength in IS 1077.", "Edges should be sound enough to lay a true wall."],
      ),
      brand(
        "standard",
        "Siporex AAC",
        "AAC masonry block",
        "IS 2185 (Part 3)",
        "Follow the maker’s mortar and curing note. Do not treat it as a clay brick.",
        ["AAC density and strength are covered by IS 2185 Part 3.", "Use the thin-bed mortar the block maker specifies."],
      ),
      brand(
        "premium",
        "Magicrete AAC",
        "AAC masonry block",
        "IS 2185 (Part 3)",
        "Use the published fixing and mortar instructions. The block is not a substitute for a clay-brick detail.",
        ["Sold as AAC to IS 2185 Part 3.", "Chases and fasteners need the maker’s method, not a random nail."],
      ),
      brand(
        "premium",
        "Wienerberger",
        "Clay brick, class as printed",
        "IS 1077",
        "The class on the delivery is the spec. Ask which class this lot is.",
        ["Factory clay bricks with a stated IS 1077 class.", "Still check a sample for size and soundness on site."],
      ),
    ],
  },
  {
    id: "waterproofing",
    title: "Waterproofing",
    buy: "An integral compound for the concrete or mortar, or a coating or membrane for the sunken slab, terrace, or shower.",
    standard: "Integral compounds: IS 2645. Bituminous waterproofing compounds: IS 1580.",
    brands: [
      brand(
        "economy",
        "Dr. Fixit Pidiproof LW+",
        "Integral liquid admixture",
        "IS 2645",
        "The pack states the dosage. Extra cups do not make a failed detail waterproof.",
        ["Integral compound to IS 2645, mixed into the cement mortar or concrete.", "It does not replace a slope, a drain, or a coating where the detail needs one."],
      ),
      brand(
        "standard",
        "Dr. Fixit Roofseal",
        "Acrylic terrace coating",
        "Coating system published by Pidilite. Bitumen compounds, where used, follow IS 1580.",
        "Read the pack. A printed warranty usually needs the maker’s surface preparation and the stated coats.",
        ["A coating for exposed roofs, not a substitute for ponding the sunken slab.", "The surface has to be clean and the coats continuous."],
      ),
      brand(
        "standard",
        "SikaTop Seal-107",
        "Two-component cementitious slurry",
        "Maker’s published system. Use IS 2645 only for a separate integral compound.",
        "Warranty, if any, is on the system data sheet and often needs their applicator.",
        ["Two packs mixed to the sheet, not one pack thinned with water.", "Used as a slurry coat on concrete and masonry."],
      ),
      brand(
        "premium",
        "Fosroc Brushbond",
        "Acrylic polymer cementitious coating",
        "Maker’s published system",
        "Ask for the data sheet warranty conditions before you rely on a year count.",
        ["A branded coating system with a stated number of coats.", "Junctions and pipe penetrations are where it fails if they are skipped."],
      ),
      brand(
        "premium",
        "Asian Paints SmartCare Damp Proof",
        "Waterproof coating",
        "Maker’s published system. Integral admixtures remain IS 2645.",
        "The can states the warranty only for the system and surface it describes.",
        ["Sold as a damp-proof coating, not as a tile adhesive.", "Follow the dry-film or coat count on the can."],
      ),
    ],
  },
  {
    id: "electrical",
    title: "Wires, conduits, and MCBs",
    buy: "Copper wire, PVC conduit, and a miniature circuit breaker or residual-current device with the ISI mark.",
    standard: "Wires: IS 694. PVC conduit: IS 9537 (Part 3). MCB: IS/IEC 60898. RCCB: IS/IEC 61008.",
    brands: [
      brand(
        "economy",
        "Anchor by Panasonic",
        "FR copper wire, 1.5 and 2.5 sq mm for lighting and sockets",
        "IS 694",
        "Use the warranty printed on that coil, if any. The controlling mark is IS 694.",
        ["Copper conductor, flame-retardant insulation to IS 694.", "Do not buy aluminium wire for the house circuits."],
      ),
      brand(
        "standard",
        "Finolex",
        "FRLS copper wire",
        "IS 694",
        "Check the coil print for any warranty. Specify FRLS if that is what you are paying for.",
        ["FRLS means flame-retardant, low smoke.", "Match the sq mm to the circuit: lighting, sockets, and geyser are not the same."],
      ),
      brand(
        "standard",
        "Havells",
        "FRLS copper wire and MCB",
        "Wire IS 694. MCB IS/IEC 60898.",
        "MCBs are replaced, not repaired. Keep the bill with the rating.",
        ["The MCB rating must match the circuit, not the highest number in the shop.", "A 32 A breaker on a thin wire is not safer."],
      ),
      brand(
        "premium",
        "Polycab",
        "FRLS copper wire",
        "IS 694",
        "Read the warranty on the coil. The ISI mark and the conductor size still have to be on it.",
        ["FRLS copper to IS 694.", "Conduit for the same job should be ISI PVC to IS 9537 Part 3."],
      ),
      brand(
        "premium",
        "Legrand or Schneider RCCB",
        "30 mA residual current device",
        "IS/IEC 61008",
        "These devices are specified by sensitivity and current. There is no useful ‘lifetime’ sticker to trust blindly.",
        ["30 mA is the usual sensitivity for a house residual-current device.", "It is the safety switch, separate from an ordinary MCB."],
      ),
    ],
  },
  {
    id: "plumbing",
    title: "CPVC and uPVC pipes",
    buy: "CPVC for drinking water under pressure, and uPVC SWR pipes for waste and rainwater.",
    standard: "CPVC potable water: IS 15778. uPVC SWR: IS 13592.",
    brands: [
      brand(
        "economy",
        "Prince Pipes",
        "CPVC water pipe, SDR as printed",
        "IS 15778",
        "Use the same maker’s fittings and solvent. A mixed joint is a leak.",
        ["CPVC for pressure water to IS 15778.", "Do not use the drain pipe for the water line."],
      ),
      brand(
        "standard",
        "Supreme",
        "CPVC and SWR",
        "CPVC IS 15778. SWR IS 13592.",
        "No long home warranty replaces a pressure test before the wall is closed.",
        ["Water and drainage are different pipes and different standards.", "SWR needs a fall. CPVC needs a pressure test."],
      ),
      brand(
        "standard",
        "Finolex",
        "CPVC and SWR",
        "CPVC IS 15778. SWR IS 13592.",
        "Keep the bill that names the class and the diameter.",
        ["Published ranges cover both pressure pipe and drainage.", "Match the diameter on the drawing, especially the soil stack."],
      ),
      brand(
        "premium",
        "Ashirvad FlowGuard",
        "CPVC made with FlowGuard compound",
        "IS 15778",
        "Ask which SDR and which warranty the quotation includes. Fittings should be the same system.",
        ["CPVC for hot and cold potable water.", "The jointing cement has to be the one that system allows."],
      ),
      brand(
        "premium",
        "Astral",
        "CPVC and drainage",
        "CPVC IS 15778. SWR IS 13592.",
        "Confirm the printed class. A premium brand in the wrong class is still the wrong pipe.",
        ["Separate products for pressure water and for waste.", "Do not bend a straight pipe with heat to make a corner."],
      ),
    ],
  },
  {
    id: "tiles",
    title: "Tiles and tile adhesive",
    buy: "Vitrified or ceramic tile of one shade, fixed with a polymer-modified adhesive, not a thick cement patti.",
    standard: "Tiles: IS 15622. Adhesive: IS 15477.",
    brands: [
      brand(
        "economy",
        "Orientbell",
        "Vitrified tile, water absorption as printed",
        "IS 15622",
        "Shade and calibre are on the box. A later box of the ‘same’ tile can still differ.",
        ["IS 15622 covers pressed ceramic tiles, including vitrified.", "Buy the spare boxes from this shade lot."],
      ),
      brand(
        "standard",
        "Kajaria",
        "Vitrified tile",
        "IS 15622",
        "The box states the shade. There is no warranty for lippage caused by a thick bed.",
        ["A national vitrified range to IS 15622.", "Check shade codes match before the stack is opened."],
      ),
      brand(
        "standard",
        "Roff",
        "Polymer-modified tile adhesive, Type 2 where the bag says so",
        "IS 15477",
        "Use the open time and the notch size on the bag. Do not add extra cement.",
        ["Type 2 is the polymer-modified class in IS 15477.", "A 20 kg bag is mixed with water only, to the bag."],
      ),
      brand(
        "premium",
        "H&R Johnson",
        "Vitrified tile",
        "IS 15622",
        "Keep one labelled box. Replacement after a year depends on that shade still being made.",
        ["Published vitrified tiles to IS 15622.", "Stairs and wet floors need the slip resistance the box states, not the shiny hall tile."],
      ),
      brand(
        "premium",
        "MYK Laticrete",
        "Polymer-modified adhesive",
        "IS 15477",
        "Follow the bag for wet areas and for large tiles. The wrong trowel voids the point of the product.",
        ["Adhesive to IS 15477, including grades for wet areas.", "Large tiles need the coverage the maker states, not dots of mortar."],
      ),
    ],
  },
  {
    id: "doors",
    title: "Doors and windows",
    buy: "A uPVC or aluminium frame that is reinforced and coated as specified, or seasoned timber.",
    standard: "Powder coat about 50 micron on aluminium. Timber: seasoned, moisture generally under 12% before it is fixed.",
    brands: [
      brand(
        "economy",
        "Local uPVC with steel reinforcement",
        "Multi-chamber profile, galvanised steel inside",
        "Ask for the profile wall thickness in writing. Reinforcement should be in the quote.",
        "A local fabricator warranty is only as good as the written period on the quotation.",
        ["The frame should not twist in your hands.", "Steel reinforcement inside the uPVC is what keeps it square."],
      ),
      brand(
        "standard",
        "Fenesta",
        "uPVC windows and doors",
        "System profile with the maker’s reinforcement and glass spec",
        "The quotation should state the warranty years for profile, hardware, and glass separately.",
        ["A national uPVC system rather than a loose profile from the market.", "Still check the sill slope and the seal on site."],
      ),
      brand(
        "standard",
        "Jindal Aluminium",
        "Powder-coated aluminium sections",
        "Powder coat about 50 micron",
        "Coating failures are a fabricator issue. Write the micron claim into the order.",
        ["Aluminium sections from a known extruder.", "A thin colour wash is not a 50 micron powder coat."],
      ),
      brand(
        "premium",
        "Kommerling",
        "uPVC profile system",
        "System profile. Glass and hardware are specified separately.",
        "Confirm which parts the printed warranty covers: profile, hardware, or sealed glass.",
        ["A branded uPVC system sold through fabricators.", "The installer’s anchors matter as much as the profile name."],
      ),
      brand(
        "premium",
        "Seasoned teak or sal",
        "Moisture generally under 12% before fixing",
        "Seasoned hardwood. Ask for a moisture-meter reading.",
        "No brand warranty. Movement later is usually unseasoned wood.",
        ["Teak and sal are the timbers usually named for frames.", "Green wood will shrink after the plaster is done."],
      ),
    ],
  },
  {
    id: "plywood",
    title: "Plywood and boards",
    buy: "BWR plywood for dry kitchen carcasses, and BWP (marine) where the board will stay near water.",
    standard: "BWR: IS 303. BWP / marine: IS 710.",
    brands: [
      brand(
        "economy",
        "CenturyPly Sainik",
        "BWR plywood",
        "IS 303",
        "The stamp on the sheet should say BWR or MR. Do not accept an unmarked sheet at a BWR price.",
        ["IS 303 covers general-purpose plywood, including the BWR grade.", "Under a sink, BWR is the minimum and BWP is safer."],
      ),
      brand(
        "standard",
        "Greenply",
        "BWR plywood",
        "IS 303",
        "Match the IS mark and the thickness. 18 or 19 mm is the usual carcass thickness.",
        ["BWR to IS 303 for shutters and carcasses away from standing water.", "Every cut edge still needs a seal."],
      ),
      brand(
        "standard",
        "Kitply",
        "BWR plywood",
        "IS 303",
        "Check the grade stamp before the sheets are cut.",
        ["A known BWR sheet to IS 303.", "MR (moisture resistant) is a lower grade. Do not let it be swapped in."],
      ),
      brand(
        "premium",
        "CenturyPly Bond 710",
        "BWP marine plywood",
        "IS 710",
        "IS 710 is the marine grade. Use it where the board can get wet.",
        ["BWP survives boiling-water tests that BWR is not specified for.", "The sink unit and window pelmets in rain are the usual places."],
      ),
      brand(
        "premium",
        "Greenply Marine",
        "BWP plywood",
        "IS 710",
        "Confirm the sheet is stamped IS 710, not only ‘waterproof’ in a quotation.",
        ["Marine grade to IS 710.", "Still seal edges. The grade is not a permission to leave raw board in a puddle."],
      ),
    ],
  },
  {
    id: "paint",
    title: "Paint, putty, and primer",
    buy: "Acrylic wall putty, an alkali-resistant primer on new plaster, then the interior or exterior emulsion the room needs.",
    standard: "New cement plaster needs a primer made for alkali. Exterior work needs an exterior emulsion, not an interior one.",
    brands: [
      brand(
        "economy",
        "Asian Paints Tractor Emulsion",
        "Interior acrylic emulsion",
        "Interior emulsion. Not an exterior paint.",
        "The can states coverage and coats. It is the economy interior, not the luxury range.",
        ["Two finish coats, not one stretched coat.", "Use it inside only."],
      ),
      brand(
        "economy",
        "JK Wall Putty",
        "White cement-based wall putty",
        "Putty for interior plaster, applied in thin coats",
        "No film warranty that replaces a dry, cured wall.",
        ["A widely sold putty under the paint.", "Thick putty cracks. Keep the coats thin."],
      ),
      brand(
        "standard",
        "Birla White Wall Putty",
        "Acrylic or white-cement wall putty, as the bag states",
        "Putty under interior emulsion",
        "Follow the bag for the dry time. Paint over damp putty and it peels.",
        ["The usual putty under house paint.", "Do not use interior putty on a wet outside wall."],
      ),
      brand(
        "standard",
        "Asian Paints Apcolite Advanced",
        "Interior emulsion, plus the maker’s primer for new plaster",
        "Alkali-resistant primer on fresh cement, then this emulsion",
        "Read the can. Primer and finish are different products.",
        ["A standard interior emulsion.", "New plaster is alkaline. The primer is what stands up to that."],
      ),
      brand(
        "premium",
        "Asian Paints Royale or Apex Ultima",
        "Royale for interior luxury emulsion. Apex Ultima for exterior.",
        "Use the exterior product outside, including sunshade tops.",
        "Apex Ultima publishes a performance warranty on the can for the system and surface it describes. Read the years there.",
        ["Royale is an interior emulsion. Apex Ultima is an exterior one.", "A bathroom needs a paint made for wet rooms, not a leftover interior tin."],
      ),
    ],
  },
  {
    id: "sanitary",
    title: "Sanitaryware and CP fittings",
    buy: "Vitreous china closets and basins, and brass chrome taps and mixers.",
    standard: "Vitreous china: IS 2556. CP fittings: IS 8931.",
    brands: [
      brand(
        "economy",
        "Cera",
        "Vitreous china WC and basin",
        "IS 2556",
        "The carton should carry the IS mark. Chips and warped rims are a reject, not a discount.",
        ["Vitreous china to IS 2556.", "Seat and cistern fittings are a separate check."],
      ),
      brand(
        "standard",
        "Hindware",
        "Vitreous china WC and basin",
        "IS 2556",
        "Keep the carton label until the fixture is fixed and the waste does not leak.",
        ["A standard vitreous-china range to IS 2556.", "White cement is not the seal. Use sanitary silicone."],
      ),
      brand(
        "standard",
        "Parryware",
        "Vitreous china WC and basin",
        "IS 2556",
        "Match the model number on the box to the quotation.",
        ["IS 2556 vitreous china.", "Confirm the trap and the floor or wall outlet before the slab opening is closed."],
      ),
      brand(
        "premium",
        "Jaquar",
        "Chrome-plated brass tap and mixer",
        "IS 8931",
        "The cartridge and the finish warranty are on the current catalogue. Ask for that line in the bill.",
        ["CP brass fittings to IS 8931.", "A plastic body at a brass price is the usual swap."],
      ),
      brand(
        "premium",
        "Kohler",
        "Vitreous china sanitaryware",
        "IS 2556",
        "Confirm the model warranty in the quotation. Installation damage is not a product fault.",
        ["Vitreous china to IS 2556.", "The plumber still has to set it level and seal it."],
      ),
    ],
  },
];

const itemCategories = {
  pcc: ["cement", "aggregates"],
  "concrete-grade": ["cement", "aggregates"],
  "plinth-beam": ["cement"],
  "column-pour": ["cement"],
  "slab-pour": ["cement"],
  "mix-and-sand": ["cement", "aggregates"],
  "external-mix": ["cement", "aggregates"],
  "steel-and-spacing": ["tmt"],
  "column-steel": ["tmt"],
  "beam-steel": ["tmt"],
  "slab-steel": ["tmt"],
  "clay-bricks": ["bricks"],
  "aac-blocks": ["bricks"],
  dpc: ["waterproofing"],
  "sunken-slab": ["waterproofing"],
  "wet-area-coat": ["waterproofing"],
  "conduit-and-boxes": ["electrical"],
  rccb: ["electrical"],
  "earthing-and-circuits": ["electrical"],
  geyser: ["electrical"],
  "fans-and-lights": ["electrical"],
  "supply-lines": ["plumbing"],
  drains: ["plumbing"],
  "sleeves-not-breaks": ["plumbing"],
  "sleeves-in-beams": ["plumbing"],
  "slab-sleeves": ["plumbing"],
  adhesive: ["tiles"],
  "layout-and-batch": ["tiles"],
  joints: ["tiles"],
  substrate: ["tiles"],
  "stairs-and-outside": ["tiles"],
  spares: ["tiles"],
  "keep-a-box": ["tiles"],
  "wet-floor-fall": ["tiles"],
  "aluminium-upvc": ["doors"],
  "wood-moisture": ["doors"],
  hardware: ["doors"],
  shutters: ["doors"],
  grade: ["plywood"],
  "thickness-and-edges": ["plywood"],
  "sink-base": ["plywood"],
  lofts: ["plywood"],
  primer: ["paint"],
  "two-coats": ["paint"],
  "shade-code": ["paint"],
  exterior: ["paint"],
  "wet-rooms": ["paint"],
  fixtures: ["sanitary"],
  "wet-test": ["sanitary"],
};

const byId = new Map(categories.map((category) => [category.id, category]));

export function categoriesForItem(itemSlug) {
  return (itemCategories[itemSlug] || []).map((id) => byId.get(id)).filter(Boolean);
}

export function assertProductMap(itemSlugs) {
  const tiers = new Set(["economy", "standard", "premium"]);
  if (categories.length !== 12) {
    throw new Error("Expected 12 material categories");
  }
  for (const category of categories) {
    if (category.brands.length < 3 || category.brands.length > 5) {
      throw new Error(`${category.id} needs 3 to 5 options`);
    }
    const seen = new Set(category.brands.map((entry) => entry.tier));
    for (const tier of tiers) {
      if (!seen.has(tier)) throw new Error(`${category.id} is missing the ${tier} tier`);
    }
    for (const entry of category.brands) {
      if (!entry.name || !entry.grade || !entry.standard || !entry.warranty || entry.features.length < 2) {
        throw new Error(`Thin brand data on ${category.id} / ${entry.name}`);
      }
    }
  }
  for (const slug of Object.keys(itemCategories)) {
    if (!itemSlugs.has(slug)) throw new Error(`Product map points at unknown item ${slug}`);
    for (const id of itemCategories[slug]) {
      if (!byId.has(id)) throw new Error(`Unknown category ${id} on ${slug}`);
    }
  }
}

export { PRODUCT_DISCLAIMER };
