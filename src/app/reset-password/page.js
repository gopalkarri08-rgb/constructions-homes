import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { ResetForm } from "@/components/AuthForms";
import { pageMeta } from "@/lib/meta";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Choose a new password",
  description: "Set a new password for your Constructions.homes account.",
  path: "/reset-password",
});

export default async function ResetPasswordPage() {
  const viewer = await getViewer();
  if (!viewer.configured) {
    return (
      <Container className="py-14 sm:py-20">
        <p className="max-w-md text-cream-dim">Accounts are not connected yet.</p>
      </Container>
    );
  }
  if (!viewer.user) redirect("/forgot-password");

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
          Choose a new password
        </h1>
        <div className="mt-8">
          <ResetForm />
        </div>
      </div>
    </Container>
  );
}
