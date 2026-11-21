import { NextResponse } from "next/server";
import { getViewer } from "@/lib/session";
import { getRazorpay } from "@/lib/billing";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const viewer = await getViewer();
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in to manage a membership." }, { status: 401 });
  }

  const razorpay = getRazorpay();
  const admin = createAdminClient();
  if (!razorpay || !admin) {
    return NextResponse.json({ error: "Payments coming soon." }, { status: 503 });
  }

  const membership = viewer.memberships.find(
    (item) => item.plan === "monthly" && item.status === "active" && item.razorpay_subscription_id,
  );
  if (!membership) {
    return NextResponse.json({ error: "There is no monthly plan to cancel." }, { status: 400 });
  }

  try {
    await razorpay.subscriptions.cancel(membership.razorpay_subscription_id, {
      cancel_at_cycle_end: 1,
    });
  } catch {
    return NextResponse.json(
      { error: "The plan could not be cancelled with Razorpay. Try again." },
      { status: 502 },
    );
  }

  const { error } = await admin
    .from("memberships")
    .update({ status: "cancelled" })
    .eq("id", membership.id)
    .eq("user_id", viewer.user.id);

  if (error) {
    return NextResponse.json(
      { error: "Razorpay accepted the cancellation, but the account did not update." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
