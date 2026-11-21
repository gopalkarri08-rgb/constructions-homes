import Link from "next/link";
import { getPublicStage } from "@/data/stages-public";
import { buildTypeLabel, formatInr, projectLine } from "@/lib/project-options";

export default function HouseSummary({ project }) {
  if (!project) {
    return (
      <section className="rounded-lg border border-gold/30 bg-ink-soft px-5 py-5">
        <h2 className="font-display text-2xl font-semibold text-cream">Your house</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 text-cream-dim">
          Add the city and budget so product options on material steps match this house.
        </p>
        <Link
          href="/project"
          className="mt-4 inline-flex h-11 items-center rounded-full bg-cream px-5 text-sm font-medium text-ink hover:bg-gold-bright"
        >
          Add the house
        </Link>
      </section>
    );
  }

  const stage = project.current_stage_slug ? getPublicStage(project.current_stage_slug) : null;
  const facts = [
    projectLine(project).replace(/\.$/, ""),
    buildTypeLabel(project.construction_type),
    project.plot_size_sqft ? `${Number(project.plot_size_sqft).toLocaleString("en-IN")} sq ft` : "",
    project.budget_inr ? formatInr(project.budget_inr) : "",
    stage ? stage.title : "",
  ].filter(Boolean);

  return (
    <section className="rounded-lg border border-line bg-ink-soft px-5 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold text-cream">{project.name}</h2>
        <Link href="/project" className="text-sm text-gold">
          Edit
        </Link>
      </div>
      <p className="mt-2 text-sm leading-6 text-cream-dim">{facts.join(" · ")}</p>
    </section>
  );
}
