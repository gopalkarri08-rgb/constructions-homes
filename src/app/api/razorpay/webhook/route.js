import { NextResponse } from "next/server";
import {
  getRazorpay,
  grantFixedTerm,
  signaturesMatch,
  syncMonthly,
  webhookSignature,
} from "@/lib/billing";
import { isStageSlug } from "@/data/stages-public";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET || !createAdminClient()) {
    return NextResponse.json({ error: "Payments coming soon." }, { status: 503 });
  }

  const raw = await request.text();
  const received = request.headers.get("x-razorpay-signature");
  const expected = webhookSignature(raw);
  if (!signaturesMatch(expected, received)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const eventId = request.headers.get("x-razorpay-event-id");
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const event = payload.event;

  try {
    if (event === "payment.captured") {
      await handleCaptured(payload, eventId);
    } else if (
      event === "subscription.activated" ||
      event === "subscription.charged" ||
      event === "subscription.cancelled" ||
      event === "subscription.completed" ||
      event === "subscription.halted"
    ) {
      await handleSubscription(event, payload, eventId);
    }
  } catch {
    return NextResponse.json({ error: "The event could not be recorded." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function handleCaptured(payload, eventId) {
  const payment = payload.payload?.payment?.entity;
  if (!payment?.id) return;

  let notes = payment.notes || {};
  if (notes.plan !== "full_pass" && notes.plan !== "stage" && payment.order_id) {
    const razorpay = getRazorpay();
    if (!razorpay) return;
    const order = await razorpay.orders.fetch(payment.order_id);
    notes = order.notes || {};
  }

  if (notes.plan !== "full_pass" && notes.plan !== "stage") return;
  if (!notes.user_id) return;
  if (notes.plan === "stage" && !isStageSlug(notes.stage_slug)) return;

  await grantFixedTerm({
    userId: notes.user_id,
    plan: notes.plan,
    stageSlug: notes.plan === "stage" ? notes.stage_slug : null,
    paymentId: payment.id,
    orderId: payment.order_id || null,
    amount: Number(payment.amount),
    event: "payment.captured",
    eventId,
  });
}

async function handleSubscription(event, payload, eventId) {
  const subscription = payload.payload?.subscription?.entity;
  if (!subscription?.id) return;
  const userId = subscription.notes?.user_id;
  if (!userId) return;

  const payment = payload.payload?.payment?.entity;
  const expiresAt = subscription.current_end
    ? new Date(Number(subscription.current_end) * 1000).toISOString()
    : null;

  let status = "active";
  if (event === "subscription.cancelled") status = "cancelled";
  if (event === "subscription.completed" || event === "subscription.halted") status = "expired";

  await syncMonthly({
    userId,
    subscriptionId: subscription.id,
    status,
    expiresAt,
    paymentId: payment?.id || null,
    event,
    eventId,
    amount: payment?.amount ? Number(payment.amount) : null,
  });
}
