import Link from "next/link";
import Container from "@/components/Container";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "About",
  description:
    "Constructions.homes is independent guidance for Indian homeowners building an independent house. We don't build your house. We help you understand how it should be built.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-20">
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">
        About
      </p>
      <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.12] tracking-[-0.025em] text-cream sm:text-6xl">
        We don&apos;t build your house. We help you understand how your house
        should be built.
      </h1>
      <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-cream-dim sm:text-[1.05rem]">
        <p>
          Constructions.homes is for people building an independent house in
          India. Many will do it once. The contractor, the mason, and the
          engineer are on site every day. You are not, and the important work
          keeps disappearing under the next stage.
        </p>
        <p>
          This is a guide to that sequence. For each stage it sets out what
          careful work looks like, what is still an acceptable standard, a
          checklist you can walk with, and the red flags worth a question
          before you pay for the next layer.
        </p>
        <p>
          We don&apos;t appoint your contractor and we don&apos;t sell
          materials. The aim is narrower: that you can stand on your own site
          and tell the difference between work that is ready to cover and work
          that is not.
        </p>
        <p>
          The notes assume a typical reinforced-concrete frame with brick or
          block walls, which is how most independent houses in towns and cities
          are built. A load-bearing house, a steep site, black cotton soil, or
          a high water table changes the structural stage. If this guide and
          your drawing disagree, the drawing and your structural engineer win.
        </p>
      </div>

      <h2 className="mt-14 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
        How to use it
      </h2>
      <ol className="mt-6 max-w-2xl space-y-4">
        {[
          "Read the stage you are about to start, while that work can still be seen.",
          "Walk the checklist before plaster, tiles, or paint close it up.",
          "Treat minimum acceptable as a line, not a target.",
          "Treat a red flag as a reason to pause and ask. It is not a script for an argument.",
        ].map((item, index) => (
          <li key={item} className="flex gap-4 text-base leading-7 text-cream">
            <span className="font-display text-xl tabular-nums text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <Link
        href="/signup"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-ink hover:bg-gold-bright"
      >
        Get Started
      </Link>
    </Container>
  );
}
