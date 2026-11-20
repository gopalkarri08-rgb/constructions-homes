import { notFound } from "next/navigation";
import StageGuide from "@/components/StageGuide";
import { getNeighbors, getStage, stages } from "@/data/stages";
import { pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return stages.map((stage) => ({ id: String(stage.id) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const stage = getStage(id);

  if (!stage) {
    return pageMeta({
      title: "Stage",
      description: "Construction stage guidance from Constructions.homes.",
      path: `/stage/${id}`,
    });
  }

  return pageMeta({
    title: stage.title,
    description: stage.metaDescription,
    path: `/stage/${stage.id}`,
  });
}

export default async function StagePage({ params }) {
  const { id } = await params;
  const stage = getStage(id);

  if (!stage) {
    notFound();
  }

  const { previous, next } = getNeighbors(stage.id);

  return <StageGuide stage={stage} previous={previous} next={next} />;
}
