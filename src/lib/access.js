/**
 * Pure access rules. A cancelled monthly plan still covers the stage until expires_at.
 * An active plan with no expiry is treated as open, so a missing date does not lock a paying member out.
 */
export function membershipCoversStage(memberships, slug, now = new Date()) {
  return (memberships ?? []).some((membership) => {
    if (!coversPlan(membership, slug)) return false;
    const expiry = membership.expires_at ? new Date(membership.expires_at) : null;
    const expiryKnown = expiry && !Number.isNaN(expiry.getTime());

    if (membership.status === "active") {
      return !expiryKnown || expiry.getTime() > now.getTime();
    }

    if (membership.status === "cancelled") {
      return expiryKnown && expiry.getTime() > now.getTime();
    }

    return false;
  });
}

function coversPlan(membership, slug) {
  if (membership.plan === "full_pass" || membership.plan === "monthly") return true;
  return membership.plan === "stage" && membership.stage_slug === slug;
}

export function planName(plan) {
  if (plan === "full_pass") return "Full Project Pass";
  if (plan === "monthly") return "Monthly";
  if (plan === "stage") return "Stage-wise";
  return "Membership";
}
