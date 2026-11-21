import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { SignupForm } from "@/components/AuthForms";
import { pageMeta } from "@/lib/meta";
import { safeNext } from "@/lib/safe-next";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Sign up",
  description:
    "Create a Constructions.homes account with your name, location, and email. Membership opens the stage guidance.",
  path: "/signup",
});

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const viewer = await getViewer();
  if (viewer.user) redirect(next);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Account</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          Sign up
        </h1>
        <p className="mt-4 text-base leading-7 text-cream-dim">
          Your name and the place the house will stand are saved with the account.
          The stage guidance opens after a membership.
        </p>
        {viewer.configured ? null : (
          <p className="mt-6 rounded-lg border border-gold/30 bg-ink-soft px-4 py-3 text-sm leading-relaxed text-cream-dim">
            Accounts are not connected yet. Add the Supabase URL and anon key before
            creating one.
          </p>
        )}
        <div className="mt-8">
          <SignupForm nextPath={next} />
        </div>
      </div>
    </Container>
  );
}
