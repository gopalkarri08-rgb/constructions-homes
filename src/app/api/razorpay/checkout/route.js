import { NextResponse } from "next/server";
import { getViewer } from "@/lib/session";
import { getRazorpay } from "@/lib/billing";
import { paymentsAvailability } from "@/lib/payments-config";
import { isPlanId, PLANS } from "@/lib/plans";
import { getPublicStage, isStageSlug } from "@/data/stages-public";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return NextResponse.json({ error: "Accounts are not configured yet." }, { status: 503 });
  }
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in before paying." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const plan = body.plan;
  const stageSlug = body.stageSlug || null;
  if (!isPlanId(plan)) {
    return NextResponse.json({ error: "Choose a plan." }, { status: 400 });
  }

  const payments = paymentsAvailability();
  const razorpay = getRazorpay();
  if (!razorpay || !payments.orders) {
    return NextResponse.json({ error: "Payments coming soon." }, { status: 503 });
  }

  if (plan === "stage" && !isStageSlug(stageSlug)) {
    return NextResponse.json({ error: "Choose a stage." }, { status: 400 });
  }

  const stage = stageSlug ? getPublicStage(stageSlug) : null;
  const description =
    plan === "full_pass"
      ? "Full Project Pass · 12 months"
      : plan === "monthly"
        ? "Monthly membership"
        : `Stage-wise · ${stage.title}`;

  try {
    if (plan === "monthly") {
      if (!payments.monthly) {
        return NextResponse.json({ error: "Payments coming soon." }, { status: 503 });
      }
      const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_MONTHLY_PLAN_ID,
        total_count: 60,
        customer_notify: 1,
        notes: {
          user_id: viewer.user.id,
          plan: "monthly",
        },
      });

      const admin = createAdminClient();
      if (admin) {
        await admin.from("memberships").insert({
          user_id: viewer.user.id,
          plan: "monthly",
          stage_slug: null,
          status: "pending",
          razorpay_subscription_id: subscription.id,
        });
      }

      return NextResponse.json({
        mode: "subscription",
        keyId: process.env.RAZORPAY_KEY_ID,
        subscriptionId: subscription.id,
        description,
      });
    }

    const amount = PLANS[plan].amountPaise;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `ch_${viewer.user.id.slice(0, 8)}_${Date.now()}`.slice(0, 40),
      notes: {
        user_id: viewer.user.id,
        plan,
        stage_slug: stageSlug || "",
      },
    });

    return NextResponse.json({
      mode: "order",
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount,
      currency: "INR",
      description,
    });
  } catch {
    return NextResponse.json(
      { error: "Payment could not be started. Try again in a moment." },
      { status: 502 },
    );
  }
}
