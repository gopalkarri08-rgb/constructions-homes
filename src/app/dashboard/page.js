import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { publicStages } from "@/data/stages-public";
import { membershipCoversStage } from "@/lib/access";
import { pageMeta } from "@/lib/meta";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Your stages",
  description: "The eight stages, and which ones your membership opens.",
  path: "/dashboard",
});

export default async function DashboardPage({ searchParams }) {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-4xl font-semibold text-cream">Your stages</h1>
        <p className="mt-4 max-w-lg text-cream-dim">
          Accounts are not connected yet. Add the Supabase keys to open the dashboard.
        </p>
      </Container>
    );
  }
  if (!viewer.user) redirect("/login?next=/dashboard");

  const params = await searchParams;

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Dashboard</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
        Your stages
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-cream-dim">
        {viewer.profile?.name ? `${viewer.profile.name}, these` : "These"} are the eight
        stages. A lock means the current membership does not cover that one.
      </p>
      {params.paid ? (
        <p className="mt-6 max-w-xl rounded-lg border border-gold/30 bg-ink-soft px-4 py-3 text-sm text-cream">
          Payment confirmed. Open a stage below.
        </p>
      ) : null}
      <ol className="mt-10 border-t border-line">
        {publicStages.map((stage) => {
          const open = membershipCoversStage(viewer.memberships, stage.slug);
          return (
            <li key={stage.slug}>
              <Link
                href={`/stage/${stage.slug}`}
                className="flex items-baseline gap-4 border-b border-line py-5 sm:gap-6"
              >
                <span className="w-8 shrink-0 font-display text-xl tabular-nums text-gold">
                  {String(stage.id).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                    {stage.title}
                  </span>
                  <span className="mt-1 block text-sm text-cream-dim">
                    {open ? "Open on your plan" : "Locked"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
