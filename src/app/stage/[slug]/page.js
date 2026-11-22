import Link from "next/link";
import { notFound } from "next/navigation";
import AssistantPanel from "@/components/guide/AssistantPanel";
import MemberColumn from "@/components/guide/MemberColumn";
import ProgressMeter from "@/components/guide/ProgressMeter";
import StageSteps from "@/components/guide/StageSteps";
import LockedStage from "@/components/LockedStage";
import { getPublicStage, publicStages } from "@/data/stages-public";
import { progressFor } from "@/lib/checks";
import { loadGuide } from "@/lib/guide";
import { pageMeta } from "@/lib/meta";
import { projectLine } from "@/lib/project-options";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stage = getPublicStage(slug);
  if (!stage) {
    return pageMeta({
      title: "Stage",
      description: "A construction stage on Constructions.homes.",
      path: `/stage/${slug}`,
    });
  }
  return pageMeta({
    title: stage.title,
    description: stage.teaser,
    path: `/stage/${stage.slug}`,
  });
}

export default async function StagePage({ params }) {
  const { slug } = await params;
  const guide = await loadGuide(slug);
  if (guide.missing) notFound();
  if (!guide.entitled) {
    return (
      <LockedStage
        stage={guide.preview}
        signedIn={Boolean(guide.viewer.user)}
        ordersReady={guide.payments.orders}
        monthlyReady={guide.payments.monthly}
      />
    );
  }

  const { preview, tree, checks, skips } = guide;
  const progress = progressFor(tree.subStages, checks.keys, skips.slugs);
  const index = publicStages.findIndex((stage) => stage.slug === preview.slug);
  const previous = publicStages[index - 1] ?? null;
  const next = publicStages[index + 1] ?? null;
  const steps = tree.subStages.map((subStage) => {
    const subProgress = progress.bySub[subStage.slug];
    return {
      slug: subStage.slug,
      title: subStage.title,
      summary: subStage.summary,
      optional: Boolean(subStage.optional),
      why: subStage.why,
      timeHint: subStage.timeHint,
      done: subProgress.done,
      total: subProgress.total,
      skipped: subProgress.skipped,
      items: subStage.items.map((entry) => ({ slug: entry.slug, title: entry.title })),
    };
  });
  const nextStep = steps.find((step) => !step.skipped && step.done < step.total);

  return (
    <MemberColumn
      back={{ href: "/dashboard", label: "Back to your stages" }}
      kicker={`Stage ${String(preview.id).padStart(2, "0")}`}
      title={preview.title}
      note={projectLine(guide.project)}
      lede="Open a step with the arrow. Then work through the checks inside it."
      progress={<ProgressMeter done={progress.done} total={progress.total} />}
      hint={
        nextStep
          ? `What to do next: ${nextStep.title}.`
          : "Every required step in this stage is checked or skipped."
      }
      crumbs={[
        { href: "/dashboard", label: "Your stages" },
        { label: preview.title },
      ]}
      assistant={<AssistantPanel stageSlug={preview.slug} scopeLabel={preview.title} />}
    >
      {!checks.ready ? (
        <p className="mb-4 text-sm text-cream-dim">
          Ticks and skips will save once the database tables are migrated.
        </p>
      ) : null}
      <StageSteps
        stageSlug={preview.slug}
        steps={steps}
        initialOpen={nextStep?.slug || steps[0]?.slug || ""}
      />
      <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Other stages">
        {previous ? (
          <Link href={`/stage/${previous.slug}`} className="rounded-lg border border-line px-4 py-3">
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">Previous stage</span>
            <span className="mt-1 block font-display text-xl text-cream">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/stage/${next.slug}`}
            className="rounded-lg border border-line px-4 py-3 sm:text-right"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">Next stage</span>
            <span className="mt-1 block font-display text-xl text-cream">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </MemberColumn>
  );
}
