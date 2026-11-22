import "server-only";
import { getItem, getStageContent, getSubStage } from "@/content";
import { getPublicStage } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { getStageChecks } from "@/lib/checks";
import { getStepSkips } from "@/lib/skips";
import { paymentsAvailability } from "@/lib/payments-config";
import { getProject } from "@/lib/project";
import { getViewer } from "@/lib/session";

export async function loadGuide(stageSlug) {
  const preview = getPublicStage(stageSlug);
  if (!preview) return { missing: true };

  const viewer = await getViewer();
  const payments = paymentsAvailability();
  const entitled = Boolean(
    viewer.user && membershipCoversStage(viewer.memberships, preview.slug),
  );

  if (!entitled) {
    return { missing: false, preview, viewer, payments, entitled: false };
  }

  const tree = getStageContent(preview.slug);
  const [checks, skips, projectResult] = await Promise.all([
    getStageChecks(viewer.user.id, preview.slug),
    getStepSkips(viewer.user.id, preview.slug),
    getProject(viewer.user.id),
  ]);
  return {
    missing: false,
    preview,
    viewer,
    payments,
    entitled: true,
    tree,
    checks,
    skips,
    project: projectResult.project,
    projectReady: projectResult.ready,
    content: { getSubStage, getItem },
  };
}
