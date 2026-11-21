import Link from "next/link";
import { publicStages } from "@/data/stages-public";
import { formatInr, PLANS } from "@/lib/plans";
import StageChoice from "./StageChoice";

function destination(plan, signedIn) {
  const next = `/checkout?plan=${plan}`;
  return signedIn ? next : `/signup?next=${encodeURIComponent(next)}`;
}

function FixedPlan({ plan, signedIn, ready, featured = false }) {
  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-ink-soft p-6 sm:p-7 ${
        featured ? "border-gold/70" : "border-line"
      }`}
    >
      <p
        className={`text-[0.68rem] uppercase tracking-[0.18em] ${featured ? "text-gold" : "invisible"}`}
        aria-hidden={featured ? undefined : true}
      >
        Recommended
      </p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
        {plan.name}
      </h3>
      <p className="mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-cream">
        {formatInr(plan.priceInr)}
      </p>
      <p className="mt-2 text-sm text-gold">{plan.cadence}</p>
      <p className="mt-4 text-sm leading-relaxed text-cream-dim">{plan.summary}</p>
      {ready ? (
        <Link
          href={destination(plan.id, signedIn)}
          className={`mt-auto inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium ${
            featured
              ? "bg-cream text-ink hover:bg-gold-bright"
              : "border border-line text-cream hover:border-gold/40"
          }`}
        >
          {signedIn ? "Continue" : "Sign up to continue"}
        </Link>
      ) : (
        <p className="mt-auto inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-cream-dim">
          Payments coming soon
        </p>
      )}
    </article>
  );
}

export default function PlanCards({ signedIn = false, ordersReady = false, monthlyReady = false }) {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-3">
      <FixedPlan plan={PLANS.full_pass} signedIn={signedIn} ready={ordersReady} featured />
      <FixedPlan plan={PLANS.monthly} signedIn={signedIn} ready={monthlyReady} />
      <StageChoice
        stages={publicStages}
        signedIn={signedIn}
        paymentsReady={ordersReady}
      />
    </div>
  );
}
