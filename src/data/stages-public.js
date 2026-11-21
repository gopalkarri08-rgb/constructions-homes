/**
 * Public stage catalogue.
 * Titles and teasers only. The standards, checklists, and red flags live in
 * stages-full.js, which is server-only and must not be imported here.
 */

export const publicStages = [
  {
    id: 1,
    slug: "structural-construction",
    icon: "structure",
    title: "Structural Construction",
    teaser:
      "The frame of the house: foundations, columns, beams, and slabs. Members learn what to look at before the concrete is poured.",
  },
  {
    id: 2,
    slug: "masonry-concealed-services",
    icon: "masonry",
    title: "Masonry + Concealed Services",
    teaser:
      "Walls go up, and the pipes and wires go inside them. Members see what to confirm before plaster covers the work.",
  },
  {
    id: 3,
    slug: "plastering",
    icon: "plaster",
    title: "Plastering",
    teaser:
      "The coat that has to make the walls true. Members get the checks for this stage, while the surface can still be corrected.",
  },
  {
    id: 4,
    slug: "flooring-tiles",
    icon: "flooring",
    title: "Flooring / Tiles",
    teaser:
      "Levels and slopes you live with every day. Members see how to judge a floor before it is grouted and closed.",
  },
  {
    id: 5,
    slug: "doors-windows",
    icon: "openings",
    title: "Doors & Windows",
    teaser:
      "Openings that have to stay square and keep the rain out. Members get the points to check on frames, sills, and glass.",
  },
  {
    id: 6,
    slug: "interior-woodwork",
    icon: "woodwork",
    title: "Interior Woodwork",
    teaser:
      "Kitchens and storage in a humid climate. Members see what to insist on before the shutters are fixed.",
  },
  {
    id: 7,
    slug: "painting",
    icon: "paint",
    title: "Painting",
    teaser:
      "The finish depends on the wall underneath. Members learn when a new house is actually ready for paint.",
  },
  {
    id: 8,
    slug: "final-fittings-handover",
    icon: "handover",
    title: "Final Fittings & Handover",
    teaser:
      "Taps, switches, and the papers that should change hands. Members get the walk-through before the last payment.",
  },
];

export function getPublicStage(slug) {
  return publicStages.find((stage) => stage.slug === slug) ?? null;
}

export function isStageSlug(slug) {
  return publicStages.some((stage) => stage.slug === slug);
}
