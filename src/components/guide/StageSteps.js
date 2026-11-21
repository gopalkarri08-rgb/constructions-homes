"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SkipStep from "./SkipStep";

export default function StageSteps({ stageSlug, steps, initialOpen }) {
  const [openSlug, setOpenSlug] = useState(initialOpen || "");

  return (
    <ol className="space-y-3">
      {steps.map((step, index) => {
        const open = openSlug === step.slug;
        const panelId = `step-${step.slug}`;
        return (
          <li key={step.slug} className="rounded-lg border border-line bg-ink-soft">
            <div className="flex items-start gap-2 p-4 sm:p-5">
              <button
                type="button"
                className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-cream"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenSlug(open ? "" : step.slug)}
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                />
                <span className="sr-only">{open ? "Collapse" : "Expand"} {step.title}</span>
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-lg tabular-nums text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.optional ? (
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                      Optional
                    </span>
                  ) : null}
                  {step.skipped ? (
                    <span className="text-xs text-cream-dim">Skipped</span>
                  ) : (
                    <span className="text-xs text-cream-dim">
                      {step.done}/{step.total}
                    </span>
                  )}
                </div>
                <h2 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-cream">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-cream-dim">{step.summary}</p>
              </div>
            </div>
            {open ? (
              <div id={panelId} className="border-t border-line px-4 py-4 sm:px-5">
                {step.timeHint ? (
                  <p className="text-sm leading-relaxed text-gold">{step.timeHint}</p>
                ) : null}
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
                  Why this matters
                </p>
                <ul className="mt-2 space-y-2">
                  {step.why.map((line) => (
                    <li key={line} className="text-sm leading-relaxed text-cream">
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {step.optional ? (
                    <SkipStep
                      stageSlug={stageSlug}
                      subStageSlug={step.slug}
                      initial={step.skipped}
                    />
                  ) : null}
                  <Link
                    href={`/stage/${stageSlug}/${step.slug}`}
                    className="text-sm text-gold underline decoration-gold/40 underline-offset-4"
                  >
                    Open this step
                  </Link>
                </div>
                {step.skipped ? null : (
                  <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
                    {step.items.map((entry) => (
                      <li key={entry.slug}>
                        <Link
                          href={`/stage/${stageSlug}/${step.slug}/${entry.slug}`}
                          className="block py-3 text-base text-cream hover:text-gold"
                        >
                          {entry.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
