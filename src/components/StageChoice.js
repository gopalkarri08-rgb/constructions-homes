"use client";

import Link from "next/link";
import { useState } from "react";
import { formatInr, PLANS } from "@/lib/plans";

export default function StageChoice({ stages, signedIn, paymentsReady }) {
  const [slug, setSlug] = useState(stages[0]?.slug ?? "");
  const next = `/checkout?plan=stage&stage=${slug}`;
  const href = signedIn ? next : `/signup?next=${encodeURIComponent(next)}`;
  const plan = PLANS.stage;

  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-ink-soft p-6 sm:p-7">
      <p className="invisible text-[0.68rem] uppercase tracking-[0.18em]" aria-hidden="true">
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
      <label htmlFor="stage-choice" className="mt-6 text-sm text-cream">
        Stage
      </label>
      <select
        id="stage-choice"
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-line bg-ink px-3 text-base text-cream outline-none focus:border-gold/70"
      >
        {stages.map((stage) => (
          <option key={stage.slug} value={stage.slug}>
            {String(stage.id).padStart(2, "0")} {stage.title}
          </option>
        ))}
      </select>
      {paymentsReady ? (
        <Link
          href={href}
          className="mt-auto inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-cream hover:border-gold/40"
        >
          Choose this stage
        </Link>
      ) : (
        <p className="mt-auto inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-cream-dim">
          Payments coming soon
        </p>
      )}
    </article>
  );
}
