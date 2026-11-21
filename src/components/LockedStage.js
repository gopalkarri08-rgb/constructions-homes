import Link from "next/link";
import Container from "./Container";
import PlanCards from "./PlanCards";
import StageIcon from "./StageIcon";

export default function LockedStage({ stage, signedIn, ordersReady, monthlyReady }) {
  const number = String(stage.id).padStart(2, "0");

  return (
    <Container className="py-12 sm:py-16">
      <Link href="/#stages" className="text-sm text-cream-dim hover:text-cream">
        ← All stages
      </Link>
      <div className="mt-8 flex items-center gap-3 text-gold">
        <StageIcon name={stage.icon} className="h-6 w-6" />
        <p className="font-display text-3xl font-semibold tabular-nums">{number}</p>
      </div>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-6xl">
        {stage.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream-dim">{stage.teaser}</p>

      <div className="mt-8 max-w-2xl rounded-lg border border-gold/40 bg-ink-soft px-5 py-6 sm:px-7">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">Members</p>
        <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          The standard for this stage is inside the membership.
        </p>
        <p className="mt-3 text-base leading-7 text-cream-dim">
          Best practice, the minimum acceptable line, the checklist, and the red flags
          are not on the public page. They open when your plan covers this stage.
        </p>
        {signedIn ? null : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/signup?next=${encodeURIComponent(`/stage/${stage.slug}`)}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-5 text-sm font-medium text-ink hover:bg-gold-bright"
            >
              Sign up
            </Link>
            <Link
              href={`/login?next=${encodeURIComponent(`/stage/${stage.slug}`)}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-5 text-sm text-cream"
            >
              Log in
            </Link>
          </div>
        )}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-cream">
          Open this stage
        </h2>
        <div className="mt-8">
          <PlanCards signedIn={signedIn} ordersReady={ordersReady} monthlyReady={monthlyReady} />
        </div>
      </div>
    </Container>
  );
}
