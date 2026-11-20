import Link from "next/link";
import Container from "@/components/Container";
import CreateProjectForm from "@/components/CreateProjectForm";
import { stages } from "@/data/stages";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Get Started",
  description:
    "What you get from Constructions.homes: eight stages of independent guidance for building a house in India, then a project name and location to begin.",
  path: "/get-started",
});

const PROMISES = [
  {
    title: "Eight stages, in site order",
    text: "From the foundation to handover, in the order the work is usually covered up.",
  },
  {
    title: "Best practice, and the minimum",
    text: "What careful work looks like, beside the line you should still insist on.",
  },
  {
    title: "A checklist and the red flags",
    text: "What to look at while the work is open, and what should make you pause.",
  },
];

export default function GetStartedPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">
            Get started
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-cream sm:text-5xl">
            Know what to watch, before it is hidden.
          </h1>
          <p className="mt-5 text-base leading-7 text-cream-dim sm:text-[1.05rem]">
            Building a house is a sequence of decisions that get covered.
            Start with what this guide gives you, name the house it is for,
            then open the stage you are about to pay for.
          </p>
          <ul className="mt-8 space-y-5">
            {PROMISES.map((item, index) => (
              <li key={item.title} className="flex gap-4">
                <span className="font-display text-xl tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-cream">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-cream-dim">
                    {item.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <CreateProjectForm />
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-12" aria-labelledby="stage-overview">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="stage-overview"
              className="font-display text-3xl font-semibold tracking-[-0.02em] text-cream sm:text-4xl"
            >
              The stage overview
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-dim">
              The same eight stages as the journey, ready to open.
            </p>
          </div>
          <Link
            href="/#journey"
            className="text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
          >
            View as cards
          </Link>
        </div>
        <ol className="mt-6 border-t border-line">
          {stages.map((stage) => (
            <li key={stage.id}>
              <Link
                href={`/stage/${stage.id}`}
                className="group flex items-baseline gap-4 border-b border-line py-4 sm:gap-6 sm:py-5"
              >
                <span className="w-8 shrink-0 font-display text-xl tabular-nums text-gold">
                  {String(stage.id).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                    {stage.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-cream-dim">
                    {stage.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-gold transition-transform group-hover:translate-x-0.5 sm:inline"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
