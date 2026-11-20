import Link from "next/link";
import Container from "@/components/Container";
import StageCard from "@/components/StageCard";
import { stages } from "@/data/stages";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Constructions.homes — Make sure it's done right",
  description:
    "Clear, independent guidance at every stage of building an independent house in India, so you can build with clarity and confidence.",
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-8 bg-gold/80" aria-hidden="true" />
              Independent houses in India
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[2.55rem] font-semibold leading-[1.06] tracking-[-0.025em] text-cream sm:text-6xl lg:text-[4.35rem]">
              Most homeowners build only once. Make sure it&apos;s done right.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
              Clear, independent guidance at every stage — so you can build
              with clarity and confidence.
            </p>
            <div className="mt-8">
              <Link
                href="/get-started"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-7 text-sm font-medium tracking-wide text-ink transition hover:bg-gold-bright"
              >
                Get Started
              </Link>
            </div>
          </div>
          <aside className="hidden lg:col-span-5 lg:block">
            <div className="rounded-lg border border-line bg-ink-soft px-5 py-6 sm:px-6">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
                Before it is covered
              </p>
              <p className="mt-3 font-display text-[1.7rem] font-semibold leading-snug tracking-[-0.02em] text-cream">
                What you cannot see decides the house you live in.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cream-dim">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  Steel and soil, once the concrete is cast.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  Pipes and conduits, once the plaster is on.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  Waterproofing, once the tiles go down.
                </li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-cream">
                Read the stage before that work is closed.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section id="journey" className="scroll-mt-20">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">
              Eight stages
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
              Your Construction Journey
            </h2>
            <p className="mt-4 text-base leading-7 text-cream-dim">
              In the order the work usually happens on an independent house.
              Open a stage before that work is covered up.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {stages.map((stage) => (
              <li key={stage.id} className="h-full">
                <StageCard stage={stage} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
