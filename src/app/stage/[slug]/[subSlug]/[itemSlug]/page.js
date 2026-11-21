import Link from "next/link";
import { notFound } from "next/navigation";
import AssistantPanel from "@/components/guide/AssistantPanel";
import ItemTick from "@/components/guide/ItemTick";
import MemberColumn from "@/components/guide/MemberColumn";
import LockedStage from "@/components/LockedStage";
import { checkKey } from "@/lib/check-key";
import { loadGuide } from "@/lib/guide";
import { pageMeta } from "@/lib/meta";
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

const prose = [
  ["what", "What it is"],
  ["best", "What we recommend"],
  ["minimum", "Minimum acceptable"],
];

const lists = [
  ["howToCheck", "How to check it on site"],
  ["redFlags", "Red flags"],
  ["questions", "Questions to ask the contractor"],
];

export default async function ItemPage({ params }) {
  const { slug, subSlug, itemSlug } = await params;
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

  const found = guide.content.getItem(slug, subSlug, itemSlug);
  if (!found) notFound();
  const checked = guide.checks.keys.has(checkKey(subSlug, itemSlug));

  return (
    <MemberColumn
      kicker={found.subStage.title}
      title={found.item.title}
      lede={null}
      crumbs={[
        { href: "/dashboard", label: "Your stages" },
        { href: `/stage/${slug}`, label: guide.preview.title },
        { href: `/stage/${slug}/${subSlug}`, label: found.subStage.title },
        { label: found.item.title },
      ]}
      assistant={
        <AssistantPanel
          stageSlug={slug}
          subStageSlug={subSlug}
          itemSlug={itemSlug}
          scopeLabel={`${guide.preview.title} · ${found.subStage.title} · ${found.item.title}`}
        />
      }
    >
      <div className="mb-6 flex items-center gap-3">
        <ItemTick
          stageSlug={slug}
          subStageSlug={subSlug}
          itemSlug={itemSlug}
          initial={checked}
          label={`Mark ${found.item.title} as checked`}
        />
        <span className="text-sm text-cream-dim">Checked on site</span>
      </div>
      <div className="space-y-4">
        {prose.map(([key, label]) => (
          <section key={key} className="rounded-lg border border-line border-l-2 border-l-[#c6a36a] bg-ink-soft px-5 py-5">
            <h2 className="font-display text-2xl font-semibold text-cream">{label}</h2>
            <p className="mt-3 text-base leading-7 text-cream">{found.item[key]}</p>
          </section>
        ))}
        {lists.map(([key, label]) => (
          <section key={key} className="rounded-lg border border-line bg-ink-soft px-5 py-5">
            <h2 className="font-display text-2xl font-semibold text-cream">{label}</h2>
            <ul className="mt-3 space-y-2">
              {found.item[key].map((line) => (
                <li key={line} className="text-base leading-7 text-cream">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between" aria-label="Other items">
        {found.previous ? (
          <Link href={`/stage/${slug}/${subSlug}/${found.previous.slug}`} className="text-sm text-gold">
            ← {found.previous.title}
          </Link>
        ) : (
          <span />
        )}
        {found.next ? (
          <Link href={`/stage/${slug}/${subSlug}/${found.next.slug}`} className="text-sm text-gold sm:text-right">
            {found.next.title} →
          </Link>
        ) : null}
      </nav>
    </MemberColumn>
  );
}
