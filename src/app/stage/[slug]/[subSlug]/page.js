import Link from "next/link";
import { notFound } from "next/navigation";
import AssistantPanel from "@/components/guide/AssistantPanel";
import ItemTick from "@/components/guide/ItemTick";
import MemberColumn from "@/components/guide/MemberColumn";
import ProgressMeter from "@/components/guide/ProgressMeter";
import SkipStep from "@/components/guide/SkipStep";
import WhyMatters from "@/components/guide/WhyMatters";
import LockedStage from "@/components/LockedStage";
import { checkKey } from "@/lib/check-key";
import { progressFor } from "@/lib/checks";
import { loadGuide } from "@/lib/guide";
import { pageMeta } from "@/lib/meta";
import { projectLine } from "@/lib/project-options";
import { getPublicStage } from "@/data/stages-public";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stage = getPublicStage(slug);
  return pageMeta({
    title: stage ? stage.title : "Stage",
    description: stage ? stage.teaser : "A construction stage on Constructions.homes.",
    path: `/stage/${slug}`,
  });
}

export default async function SubStagePage({ params }) {
  const { slug, subSlug } = await params;
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

  const found = guide.content.getSubStage(slug, subSlug);
  if (!found) notFound();
  const progress = progressFor(guide.tree.subStages, guide.checks.keys, guide.skips.slugs);
  const subProgress = progress.bySub[found.subStage.slug];
  const subIndex = guide.tree.subStages.findIndex((entry) => entry.slug === subSlug);
  const nextItem = found.subStage.items.find(
    (entry) => !guide.checks.keys.has(checkKey(subSlug, entry.slug)),
  );

  return (
    <MemberColumn
      back={{ href: `/stage/${slug}`, label: "Back" }}
      kicker={`Part ${String(subIndex + 1).padStart(2, "0")}`}
      title={found.subStage.title}
      note={projectLine(guide.project)}
      lede={found.subStage.summary}
      progress={
        subProgress.skipped ? null : (
          <ProgressMeter done={subProgress.done} total={subProgress.total} />
        )
      }
      hint={
        subProgress.skipped
          ? "You skipped this optional step."
          : nextItem
            ? `What to do next: ${nextItem.title}.`
            : "Every check in this step is ticked."
      }
      crumbs={[
        { href: "/dashboard", label: "Your stages" },
        { href: `/stage/${slug}`, label: guide.preview.title },
        { label: found.subStage.title },
      ]}
      assistant={
        <AssistantPanel
          stageSlug={slug}
          subStageSlug={subSlug}
          scopeLabel={`${guide.preview.title} · ${found.subStage.title}`}
        />
      }
    >
      <div className="space-y-4">
        {found.subStage.optional ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-gold">
              Optional
            </span>
            <SkipStep
              stageSlug={slug}
              subStageSlug={subSlug}
              initial={guide.skips.slugs.has(subSlug)}
            />
          </div>
        ) : null}
        <WhyMatters why={found.subStage.why} timeHint={found.subStage.timeHint} />
      </div>
      <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {found.subStage.items.map((entry) => {
          const href = `/stage/${slug}/${subSlug}/${entry.slug}`;
          const checked = guide.checks.keys.has(checkKey(subSlug, entry.slug));
          return (
            <li key={entry.slug} className="flex items-start gap-3 py-4">
              <ItemTick
                stageSlug={slug}
                subStageSlug={subSlug}
                itemSlug={entry.slug}
                initial={checked}
                label={`Mark ${entry.title} as checked`}
              />
              <Link href={href} className="min-w-0 flex-1">
                <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                  {entry.title}
                </span>
                <span className="mt-1 block text-sm text-cream-dim">Details</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </MemberColumn>
  );
}
