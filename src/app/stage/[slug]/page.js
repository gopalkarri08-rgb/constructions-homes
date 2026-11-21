import Link from "next/link";
import { notFound } from "next/navigation";
import AssistantPanel from "@/components/guide/AssistantPanel";
import MemberColumn from "@/components/guide/MemberColumn";
import ProgressMeter from "@/components/guide/ProgressMeter";
import LockedStage from "@/components/LockedStage";
import { getPublicStage, publicStages } from "@/data/stages-public";
import { progressFor } from "@/lib/checks";
import { loadGuide } from "@/lib/guide";
import { pageMeta } from "@/lib/meta";

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

  const { preview, tree, checks } = guide;
  const progress = progressFor(tree.subStages, checks.keys);
  const index = publicStages.findIndex((stage) => stage.slug === preview.slug);
  const previous = publicStages[index - 1] ?? null;
  const next = publicStages[index + 1] ?? null;

  return (
    <MemberColumn
      kicker={`Stage ${String(preview.id).padStart(2, "0")}`}
      title={preview.title}
      lede="Open a part of the work. Each card is a sub-stage. Tick items as you check them on site."
      progress={<ProgressMeter done={progress.done} total={progress.total} />}
      crumbs={[
        { href: "/dashboard", label: "Your stages" },
        { label: preview.title },
      ]}
      assistant={
        <AssistantPanel stageSlug={preview.slug} scopeLabel={preview.title} />
      }
    >
      {!checks.ready ? (
        <p className="mb-4 text-sm text-cream-dim">
          Ticks will save to your account once the checks table is migrated.
        </p>
      ) : null}
      <ol className="grid gap-3">
        {tree.subStages.map((subStage, subIndex) => {
          const subProgress = progress.bySub[subStage.slug];
          return (
            <li key={subStage.slug}>
              <Link
                href={`/stage/${preview.slug}/${subStage.slug}`}
                className="block rounded-lg border border-line bg-ink-soft p-5 transition-colors hover:border-gold/40"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl tabular-nums text-gold">
                    {String(subIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-cream-dim">
                    {subProgress.done}/{subProgress.total}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                  {subStage.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">{subStage.summary}</p>
              </Link>
            </li>
          );
        })}
      </ol>
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
