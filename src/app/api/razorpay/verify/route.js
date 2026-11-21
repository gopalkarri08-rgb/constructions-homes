import { NextResponse } from "next/server";
import { getViewer } from "@/lib/session";
import {
  getRazorpay,
  grantFixedTerm,
  orderSignature,
  signaturesMatch,
  subscriptionSignature,
  syncMonthly,
} from "@/lib/billing";
import { paymentsAvailability } from "@/lib/payments-config";
import { addMonths, PLANS } from "@/lib/plans";
import { isStageSlug } from "@/data/stages-public";

export async function POST(request) {
  const viewer = await getViewer();
  if (!viewer.user) {
    return NextResponse.json({ error: "Log in before confirming a payment." }, { status: 401 });
  }
  if (!paymentsAvailability().orders || !getRazorpay()) {
    return NextResponse.json({ error: "Payments coming soon." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    if (body.mode === "subscription") {
      const paymentId = body.razorpay_payment_id;
      const subscriptionId = body.razorpay_subscription_id;
      const signature = body.razorpay_signature;
      const expected = subscriptionSignature(paymentId, subscriptionId);
      if (!signaturesMatch(expected, signature)) {
        return NextResponse.json({ error: "The payment signature did not match." }, { status: 400 });
      }

      const razorpay = getRazorpay();
      const subscription = await razorpay.subscriptions.fetch(subscriptionId);
      if (subscription?.notes?.user_id && subscription.notes.user_id !== viewer.user.id) {
        return NextResponse.json({ error: "This payment belongs to another account." }, { status: 403 });
      }

      const currentEnd = subscription.current_end
        ? new Date(Number(subscription.current_end) * 1000).toISOString()
        : addMonths(new Date(), 1).toISOString();

      await syncMonthly({
        userId: viewer.user.id,
        subscriptionId,
        status: "active",
        expiresAt: currentEnd,
        paymentId,
        event: "subscription.activated",
      });

      return NextResponse.json({ ok: true });
    }

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;
    const expected = orderSignature(orderId, paymentId);
    if (!signaturesMatch(expected, signature)) {
      return NextResponse.json({ error: "The payment signature did not match." }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.fetch(orderId);
    const notes = order.notes || {};
    if (notes.user_id !== viewer.user.id) {
      return NextResponse.json({ error: "This payment belongs to another account." }, { status: 403 });
    }
    if (notes.plan !== "full_pass" && notes.plan !== "stage") {
      return NextResponse.json({ error: "This order is not a guide plan." }, { status: 400 });
    }
    if (notes.plan === "stage" && !isStageSlug(notes.stage_slug)) {
      return NextResponse.json({ error: "This order has no stage." }, { status: 400 });
    }
    if (Number(order.amount) !== PLANS[notes.plan].amountPaise) {
      return NextResponse.json({ error: "The amount does not match the plan." }, { status: 400 });
    }

    await grantFixedTerm({
      userId: viewer.user.id,
      plan: notes.plan,
      stageSlug: notes.plan === "stage" ? notes.stage_slug : null,
      paymentId,
      orderId,
      amount: Number(order.amount),
      event: "payment.captured",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "The payment was received but could not be confirmed yet." },
      { status: 500 },
    );
  }
}
