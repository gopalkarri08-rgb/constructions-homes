import "server-only";
import { publicStages } from "@/data/stages-public";
import { checkKey } from "@/lib/check-key";
import { stage as doors } from "./stages/doors-windows";
import { stage as handover } from "./stages/final-fittings-handover";
import { stage as flooring } from "./stages/flooring-tiles";
import { stage as woodwork } from "./stages/interior-woodwork";
import { stage as masonry } from "./stages/masonry-concealed-services";
import { stage as painting } from "./stages/painting";
import { stage as plaster } from "./stages/plastering";
import { stage as structural } from "./stages/structural-construction";

const trees = [structural, masonry, plaster, flooring, doors, woodwork, painting, handover];

const bySlug = new Map(trees.map((stage) => [stage.slug, stage]));

for (const stage of publicStages) {
  const tree = bySlug.get(stage.slug);
  if (!tree) throw new Error(`Missing content for ${stage.slug}`);
  const subSlugs = new Set();
  for (const subStage of tree.subStages) {
    if (subSlugs.has(subStage.slug)) {
      throw new Error(`Duplicate sub-stage ${subStage.slug} in ${stage.slug}`);
    }
    subSlugs.add(subStage.slug);
    const itemSlugs = new Set();
    for (const entry of subStage.items) {
      if (itemSlugs.has(entry.slug)) {
        throw new Error(`Duplicate item ${entry.slug} in ${stage.slug}/${subStage.slug}`);
      }
      itemSlugs.add(entry.slug);
      for (const key of ["what", "best", "minimum"]) {
        if (!entry[key] || entry[key].length < 20) {
          throw new Error(`Thin ${key} on ${stage.slug}/${subStage.slug}/${entry.slug}`);
        }
      }
      for (const key of ["howToCheck", "redFlags", "questions"]) {
        if (!Array.isArray(entry[key]) || entry[key].length < 1) {
          throw new Error(`Missing ${key} on ${entry.slug}`);
        }
      }
    }
  }
}

export function getStageContent(slug) {
  return bySlug.get(slug) ?? null;
}

export function getSubStage(stageSlug, subSlug) {
  const stage = getStageContent(stageSlug);
  if (!stage) return null;
  const subStage = stage.subStages.find((entry) => entry.slug === subSlug) ?? null;
  if (!subStage) return null;
  return { stage, subStage };
}

export function getItem(stageSlug, subSlug, itemSlug) {
  const found = getSubStage(stageSlug, subSlug);
  if (!found) return null;
  const entry = found.subStage.items.find((item) => item.slug === itemSlug) ?? null;
  if (!entry) return null;
  const index = found.subStage.items.findIndex((item) => item.slug === itemSlug);
  return {
    ...found,
    item: entry,
    previous: found.subStage.items[index - 1] ?? null,
    next: found.subStage.items[index + 1] ?? null,
  };
}

export function countStage(stageSlug) {
  const stage = getStageContent(stageSlug);
  if (!stage) return { subStages: 0, items: 0 };
  return {
    subStages: stage.subStages.length,
    items: stage.subStages.reduce((sum, subStage) => sum + subStage.items.length, 0),
  };
}

export function contentCounts() {
  return publicStages.map((stage) => ({
    slug: stage.slug,
    title: stage.title,
    ...countStage(stage.slug),
  }));
}

export { checkKey };
