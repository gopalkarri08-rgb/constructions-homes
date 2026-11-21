import Link from "next/link";
import Container from "@/components/Container";
import { ForgotForm } from "@/components/AuthForms";
import { pageMeta } from "@/lib/meta";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Reset password",
  description: "Send a password reset link for your Constructions.homes account.",
  path: "/forgot-password",
});

export default async function ForgotPasswordPage() {
  const viewer = await getViewer();

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Account</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          Reset password
        </h1>
        <p className="mt-4 text-base leading-7 text-cream-dim">
          We will email a link if this address has an account.
        </p>
        {viewer.configured ? null : (
          <p className="mt-6 rounded-lg border border-gold/30 bg-ink-soft px-4 py-3 text-sm leading-relaxed text-cream-dim">
            Accounts are not connected yet.
          </p>
        )}
        <div className="mt-8">
          <ForgotForm />
        </div>
        <p className="mt-6 text-sm text-cream-dim">
          <Link href="/login" className="hover:text-cream">
            Back to log in
          </Link>
        </p>
      </div>
    </Container>
  );
}
