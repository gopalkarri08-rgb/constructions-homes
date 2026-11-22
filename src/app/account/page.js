import Link from "next/link";
import { redirect } from "next/navigation";
import CancelMembership from "@/components/CancelMembership";
import Container from "@/components/Container";
import HouseSummary from "@/components/HouseSummary";
import { signOut } from "@/lib/auth-actions";
import { planName } from "@/lib/access";
import { pageMeta } from "@/lib/meta";
import { paymentsAvailability } from "@/lib/payments-config";
import { formatWhen } from "@/lib/plans";
import { getPublicStage } from "@/data/stages-public";
import { getProject } from "@/lib/project";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Account",
  description: "Your Constructions.homes plan, expiry, and logout.",
  path: "/account",
});

export default async function AccountPage() {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-4xl font-semibold text-cream">Account</h1>
        <p className="mt-4 max-w-lg text-cream-dim">
          Accounts are not connected yet. Add the Supabase keys to see a plan here.
        </p>
      </Container>
    );
  }
  if (!viewer.user) redirect("/login?next=/account");

  const { project } = await getProject(viewer.user.id);
  const payments = paymentsAvailability();
  const monthly = viewer.memberships.find(
    (item) => item.plan === "monthly" && item.status === "active" && item.razorpay_subscription_id,
  );

  return (
    <Container className="py-12 sm:py-16">
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Account</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
        {viewer.profile?.name || "Your account"}
      </h1>
      <p className="mt-3 text-cream-dim">{viewer.user.email}</p>
      {viewer.profile?.location ? (
        <p className="mt-1 text-sm text-cream-dim">{viewer.profile.location}</p>
      ) : null}

      <div className="mt-10 max-w-2xl">
        <HouseSummary project={project} />
      </div>

      <h2 className="mt-12 font-display text-3xl font-semibold text-cream">Membership</h2>
      {viewer.memberships.length === 0 ? (
        <p className="mt-4 max-w-lg text-base leading-7 text-cream-dim">
          No plan yet.{" "}
          <Link href="/#plans" className="text-gold underline decoration-gold/40 underline-offset-4">
            See the memberships
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-5 max-w-2xl divide-y divide-line border-y border-line">
          {viewer.memberships.map((membership) => {
            const stage = membership.stage_slug ? getPublicStage(membership.stage_slug) : null;
            const when = formatWhen(membership.expires_at);
            return (
              <li key={membership.id} className="py-4">
                <p className="text-cream">
                  {planName(membership.plan)}
                  {stage ? ` · ${stage.title}` : ""}
                </p>
                <p className="mt-1 text-sm text-cream-dim">
                  {membership.status}
                  {when ? ` · until ${when}` : ""}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {monthly ? (
        <div className="mt-8">
          {payments.orders ? (
            <CancelMembership />
          ) : (
            <p className="text-sm text-cream-dim">Payments coming soon.</p>
          )}
        </div>
      ) : null}

      <form action={signOut} className="mt-10">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm text-cream hover:border-gold/40"
        >
          Log out
        </button>
      </form>
    </Container>
  );
}
