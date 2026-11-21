import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import PayButton from "@/components/PayButton";
import { getPublicStage } from "@/data/stages-public";
import { pageMeta } from "@/lib/meta";
import { paymentsAvailability } from "@/lib/payments-config";
import { formatInr, isPlanId, PLANS } from "@/lib/plans";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Checkout",
  description: "Pay for a Constructions.homes membership with Razorpay.",
  path: "/checkout",
});

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const planId = params.plan;
  const stageSlug = params.stage || "";
  const viewer = await getViewer();
  const query = new URLSearchParams();
  if (planId) query.set("plan", planId);
  if (stageSlug) query.set("stage", stageSlug);
  const next = `/checkout?${query.toString()}`;

  if (!viewer.configured) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-4xl font-semibold text-cream">Checkout</h1>
        <p className="mt-4 max-w-lg text-cream-dim">Accounts are not connected yet.</p>
      </Container>
    );
  }
  if (!viewer.user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const payments = paymentsAvailability();
  const plan = isPlanId(planId) ? PLANS[planId] : null;
  const stage = planId === "stage" ? getPublicStage(stageSlug) : null;
  const ready = planId === "monthly" ? payments.monthly : payments.orders;
  const invalid = !plan || (planId === "stage" && !stage);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-lg">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Checkout</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          {invalid ? "Choose a plan" : plan.name}
        </h1>
        {invalid ? (
          <p className="mt-4 text-cream-dim">
            That link does not match a membership.{" "}
            <Link href="/#plans" className="text-gold underline decoration-gold/40 underline-offset-4">
              See the plans
            </Link>
            .
          </p>
        ) : (
          <>
            <p className="mt-5 font-display text-5xl font-semibold text-cream">
              {formatInr(plan.priceInr)}
            </p>
            <p className="mt-2 text-sm text-gold">{plan.cadence}</p>
            <p className="mt-4 text-base leading-7 text-cream-dim">
              {plan.summary}
              {stage ? ` This payment is for ${stage.title}.` : ""}
            </p>
            <div className="mt-8">
              {ready ? (
                <PayButton
                  plan={plan.id}
                  stageSlug={stage?.slug}
                  label={plan.id === "monthly" ? "Start monthly plan" : "Pay with Razorpay"}
                />
              ) : (
                <p className="inline-flex h-12 items-center rounded-full border border-line px-5 text-sm text-cream-dim">
                  Payments coming soon
                </p>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim">
              Razorpay opens next. A test key charges nothing real. The stage stays
              locked until the payment is confirmed.
            </p>
          </>
        )}
      </div>
    </Container>
  );
}
