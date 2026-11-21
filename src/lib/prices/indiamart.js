/**
 * Sample stand-in for an IndiaMart local-price lookup.
 * These ranges are illustrative. They are not live quotes.
 * A later adapter can replace sampleLocalPrice without changing the page.
 */

export const SAMPLE_PRICE_DISCLAIMER =
  "Sample prices only. This is not a live IndiaMart listing. Real quotes change with the brand, the quantity, and the week you buy.";

const BOOK = {
  cement: { unit: "50 kg bag", low: 360, high: 480 },
  tmt: { unit: "kg of 12 mm TMT", low: 62, high: 78 },
  aggregates: { unit: "tonne of M-sand", low: 900, high: 1700 },
  bricks: { unit: "clay brick", low: 7, high: 14 },
  waterproofing: { unit: "litre of coating or admixture", low: 180, high: 520 },
  electrical: { unit: "90 m coil of 1.5 sq mm copper wire", low: 1500, high: 2600 },
  plumbing: { unit: "3 m length of CPVC", low: 280, high: 620 },
  tiles: { unit: "sq ft of vitrified tile", low: 45, high: 140 },
  doors: { unit: "sq ft of uPVC window", low: 480, high: 980 },
  plywood: { unit: "19 mm 8×4 ft BWR sheet", low: 2800, high: 5200 },
  paint: { unit: "litre of interior emulsion", low: 160, high: 620 },
  sanitary: { unit: "vitreous china water closet", low: 4500, high: 18000 },
};

const CITY_FACTORS = [
  ["navi mumbai", 1.12],
  ["mumbai", 1.14],
  ["bengaluru", 1.08],
  ["bangalore", 1.08],
  ["gurugram", 1.08],
  ["gurgaon", 1.08],
  ["new delhi", 1.06],
  ["delhi", 1.06],
  ["noida", 1.06],
  ["pune", 1.07],
  ["chennai", 1.04],
  ["hyderabad", 1],
  ["secunderabad", 1],
  ["kolkata", 1.02],
  ["ahmedabad", 0.98],
  ["jaipur", 0.97],
  ["lucknow", 0.96],
  ["kochi", 1.05],
  ["coimbatore", 1.02],
  ["indore", 0.97],
  ["bhubaneswar", 0.98],
  ["chandigarh", 1.03],
  ["visakhapatnam", 1],
  ["vizag", 1],
];

function cityFactor(city) {
  const name = String(city || "")
    .trim()
    .toLowerCase();
  if (!name) return { factor: 1, known: false, label: "a typical Indian city" };
  const match = CITY_FACTORS.find(([key]) => name.includes(key));
  if (!match) return { factor: 1, known: false, label: city.trim() };
  return { factor: match[1], known: true, label: city.trim() };
}

function scale(amount, factor) {
  const value = amount * factor;
  const step = value >= 1000 ? 50 : value >= 100 ? 10 : 1;
  return Math.round(value / step) * step;
}

export function sampleLocalPrice({ categoryId, city }) {
  const row = BOOK[categoryId];
  if (!row) return null;
  const place = cityFactor(city);
  return {
    provider: "indiamart-sample",
    sample: true,
    city: place.label,
    knownCity: place.known,
    unit: row.unit,
    low: scale(row.low, place.factor),
    high: scale(row.high, place.factor),
    disclaimer: SAMPLE_PRICE_DISCLAIMER,
  };
}
