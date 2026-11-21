import { notFound } from "next/navigation";
import LockedStage from "@/components/LockedStage";
import StageGuide from "@/components/StageGuide";
import { getPublicStage } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { pageMeta } from "@/lib/meta";
import { paymentsAvailability } from "@/lib/payments-config";
import { getViewer } from "@/lib/session";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stage = getPublicStage(slug);
  if (!stage) {
    return pageMeta({
      title: "Stage",
      description: "A construction stage on Constructions.homes.",
      path: `/stage/${slug}`,
    });
  }

  return pageMeta({
    title: stage.title,
    description: stage.teaser,
    path: `/stage/${stage.slug}`,
  });
}

export default async function StagePage({ params }) {
  const { slug } = await params;
  const preview = getPublicStage(slug);
  if (!preview) notFound();

  const viewer = await getViewer();
  const payments = paymentsAvailability();
  const entitled = Boolean(
    viewer.user && membershipCoversStage(viewer.memberships, preview.slug),
  );

  if (!entitled) {
    return (
      <LockedStage
        stage={preview}
        signedIn={Boolean(viewer.user)}
        ordersReady={payments.orders}
        monthlyReady={payments.monthly}
      />
    );
  }

  const { getFullStage, getFullNeighbors } = await import("@/data/stages-full");
  const stage = getFullStage(preview.slug);
  if (!stage) notFound();
  const neighbors = getFullNeighbors(preview.slug);

  return (
    <StageGuide
      stage={stage}
      previous={
        neighbors.previous
          ? { slug: neighbors.previous.slug, title: neighbors.previous.title }
          : null
      }
      next={
        neighbors.next ? { slug: neighbors.next.slug, title: neighbors.next.title } : null
      }
    />
  );
}
