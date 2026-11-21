import "server-only";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createAdminClient } from "@/lib/supabase/admin";
import { addMonths, PLANS } from "@/lib/plans";
import { isStageSlug } from "@/data/stages-public";

export function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export function signaturesMatch(expected, received) {
  if (!expected || !received) return false;
  const left = Buffer.from(expected);
  const right = Buffer.from(received);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function orderSignature(orderId, paymentId) {
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

export function subscriptionSignature(paymentId, subscriptionId) {
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${paymentId}|${subscriptionId}`)
    .digest("hex");
}

export function webhookSignature(rawBody) {
  return crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
}

async function logPayment(admin, row) {
  const { error } = await admin.from("payments").insert(row);
  if (!error) return { duplicate: false };
  if (error.code === "23505") return { duplicate: true };
  throw error;
}

export async function grantFixedTerm({
  userId,
  plan,
  stageSlug = null,
  paymentId,
  orderId = null,
  amount = null,
  event = "payment.captured",
  eventId = null,
}) {
  if (plan !== "full_pass" && plan !== "stage") {
    throw new Error("This grant is only for a fixed-term plan.");
  }
  if (plan === "stage" && !isStageSlug(stageSlug)) {
    throw new Error("Unknown stage.");
  }

  const admin = createAdminClient();
  if (!admin) throw new Error("Service role is not configured.");

  const logged = await logPayment(admin, {
    user_id: userId,
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_event_id: eventId,
    event,
    amount,
    plan,
    stage_slug: stageSlug,
    status: "captured",
  });
  if (logged.duplicate) {
    const { data: already } = await admin
      .from("memberships")
      .select("id")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();
    if (already) return { ok: true, duplicate: true };
  }

  const months = plan === "full_pass" ? 12 : 4;
  let query = admin
    .from("memberships")
    .select("id, expires_at, status")
    .eq("user_id", userId)
    .eq("plan", plan);
  query = stageSlug ? query.eq("stage_slug", stageSlug) : query.is("stage_slug", null);
  const { data: rows, error: readError } = await query;
  if (readError) throw readError;

  const now = new Date();
  const current = (rows ?? []).find((row) => row.status === "active" || row.status === "cancelled");
  const currentExpiry = current?.expires_at ? new Date(current.expires_at) : null;
  const base = currentExpiry && currentExpiry > now ? currentExpiry : now;
  const expiresAt = addMonths(base, months).toISOString();

  if (current) {
    const { error } = await admin
      .from("memberships")
      .update({
        status: "active",
        expires_at: expiresAt,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
      })
      .eq("id", current.id);
    if (error) throw error;
  } else {
    const { error } = await admin.from("memberships").insert({
      user_id: userId,
      plan,
      stage_slug: stageSlug,
      status: "active",
      starts_at: now.toISOString(),
      expires_at: expiresAt,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
    });
    if (error) throw error;
  }

  return { ok: true };
}

export async function syncMonthly({
  userId,
  subscriptionId,
  status,
  expiresAt,
  paymentId = null,
  event,
  eventId = null,
  amount = null,
}) {
  const admin = createAdminClient();
  if (!admin) throw new Error("Service role is not configured.");

  if (paymentId || eventId) {
    await logPayment(admin, {
      user_id: userId,
      razorpay_payment_id: paymentId,
      razorpay_subscription_id: subscriptionId,
      razorpay_event_id: eventId,
      event,
      amount,
      plan: "monthly",
      status,
    });
  }

  const { data: existing, error: readError } = await admin
    .from("memberships")
    .select("id")
    .eq("razorpay_subscription_id", subscriptionId)
    .maybeSingle();
  if (readError) throw readError;

  const row = {
    user_id: userId,
    plan: "monthly",
    stage_slug: null,
    status,
    expires_at: expiresAt,
    razorpay_subscription_id: subscriptionId,
    razorpay_payment_id: paymentId,
  };

  if (existing) {
    const { error } = await admin.from("memberships").update(row).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await admin.from("memberships").insert({
      ...row,
      starts_at: new Date().toISOString(),
    });
    if (error) throw error;
  }

  return { ok: true };
}

export function describePlan(plan, stageTitle) {
  if (plan === "full_pass") return `${PLANS.full_pass.name} · 12 months`;
  if (plan === "monthly") return `${PLANS.monthly.name} membership`;
  return `${PLANS.stage.name} · ${stageTitle ?? "one stage"}`;
}
