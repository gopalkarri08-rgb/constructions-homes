import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { LoginForm } from "@/components/AuthForms";
import { pageMeta } from "@/lib/meta";
import { safeNext } from "@/lib/safe-next";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Log in",
  description: "Log in to Constructions.homes to open the stages your membership covers.",
  path: "/login",
});

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const viewer = await getViewer();
  if (viewer.user) redirect(next);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Account</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          Log in
        </h1>
        <p className="mt-4 text-base leading-7 text-cream-dim">
          The stage standards are waiting on the account that paid for them.
        </p>
        {viewer.configured ? null : (
          <p className="mt-6 rounded-lg border border-gold/30 bg-ink-soft px-4 py-3 text-sm leading-relaxed text-cream-dim">
            Accounts are not connected yet. Add the Supabase URL and anon key, then email
            and Google sign-in will work.
          </p>
        )}
        {params.error === "auth" ? (
          <p role="alert" className="mt-6 text-sm leading-relaxed text-[#f0cfc4]">
            That link has expired. Log in, or request a new reset email.
          </p>
        ) : null}
        <div className="mt-8">
          <LoginForm nextPath={next} />
        </div>
      </div>
    </Container>
  );
}
