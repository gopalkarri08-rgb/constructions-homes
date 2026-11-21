import "server-only";
import { getItem, getStageContent, getSubStage } from "@/content";
import { getPublicStage } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { getStageChecks } from "@/lib/checks";
import { paymentsAvailability } from "@/lib/payments-config";
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
  const checks = await getStageChecks(viewer.user.id, preview.slug);
  return {
    missing: false,
    preview,
    viewer,
    payments,
    entitled: true,
    tree,
    checks,
    content: { getSubStage, getItem },
  };
}
