import "server-only";

export function paymentsAvailability() {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  const orders = Boolean(keyId && keySecret);
  return {
    orders,
    monthly: orders && Boolean(process.env.RAZORPAY_MONTHLY_PLAN_ID),
    webhook: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET),
  };
}
