import Link from "next/link";
import Container from "@/components/Container";
import GlimpseCard from "@/components/GlimpseCard";
import PlanCards from "@/components/PlanCards";
import { publicStages } from "@/data/stages-public";
import { pageMeta } from "@/lib/meta";
import { paymentsAvailability } from "@/lib/payments-config";
import { getViewer } from "@/lib/session";

export const metadata = pageMeta({
  title: "Constructions.homes — Make sure it's done right",
  description:
    "Clear, independent guidance at every stage of building an independent house in India, so you can build with clarity and confidence.",
  path: "/",
  absolute: true,
});

const problems = [
  {
    title: "No independent advice",
    text: "The person explaining the work is usually the person being paid to do it. There is no one on your side of the table.",
  },
  {
    title: "Only the contractor's word",
    text: "You are asked to accept a sentence in place of a standard. If you have not built before, you cannot yet tell a careful answer from a convenient one.",
  },
  {
    title: "No picture of what good looks like",
    text: "Each stage has a look when it is done properly, and a different look when it will only pass until it is covered. Most owners are never shown the difference.",
  },
  {
    title: "Defects found after the finish",
    text: "Thin cover on the steel, a wet room without a real waterproof layer, a floor that falls the wrong way. These stay hidden until plaster and tiles are on.",
  },
  {
    title: "Rework eats the budget",
    text: "The overrun is rarely the first bill. It is the second one: breaking finished work to reach the mistake underneath.",
  },
];

const answers = [
  {
    title: "Stage by stage",
    text: "Eight stages, in the order an independent house is usually built. You read the one you are about to pay for, not a general essay about houses.",
  },
  {
    title: "Best practice, and the minimum",
    text: "What careful work looks like, set beside the line you should still insist on. One is the aim. The other is where you stop and ask.",
  },
  {
    title: "A checklist for the open work",
    text: "Each stage has a list meant to be walked while the steel, the pipes, or the waterproofing can still be seen.",
  },
  {
    title: "Red flags, before they are buried",
    text: "The specific things that should pause the next payment, written so you can raise them while a repair is still cheap.",
  },
];

export default async function Home() {
  const viewer = await getViewer();
  const payments = paymentsAvailability();

  return (
    <>
      <section className="border-b border-line">
        <Container className="py-14 sm:py-20 lg:py-24">
          <p className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-8 bg-gold/80" aria-hidden="true" />
            Independent houses in India
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-[2.55rem] font-semibold leading-[1.06] tracking-[-0.025em] text-cream sm:text-6xl lg:text-[4.35rem]">
            Most homeowners build only once. Make sure it&apos;s done right.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            Clear, independent guidance at every stage — so you can build with
            clarity and confidence.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-7 text-sm font-medium tracking-wide text-ink transition hover:bg-gold-bright"
            >
              Get Started
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="problem-title">
        <Container className="py-14 sm:py-20">
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">The problem</p>
          <h2
            id="problem-title"
            className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl"
          >
            You will hear a lot. Very little of it is independent.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {problems.map((item, index) => (
              <li key={item.title} className="border-t border-line pt-5">
                <p className="font-display text-2xl tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-7 text-cream-dim">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="solution-title">
        <Container className="py-14 sm:py-20">
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">How we solve it</p>
          <h2
            id="solution-title"
            className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl"
          >
            A standard you can take to site.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream-dim">
            We don&apos;t appoint the contractor and we don&apos;t sell the
            material. The membership is the guidance: what to aim for, what is
            still acceptable, what to check, and what should make you pause.
          </p>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {answers.map((item, index) => (
              <li key={item.title} className="grid gap-3 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8">
                <p className="font-display text-2xl tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-cream-dim">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="stages" className="scroll-mt-20 border-b border-line">
        <Container className="py-14 sm:py-20">
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Eight stages</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
            The path of the work. The detail is for members.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream-dim">
            These cards name the stage. The standard, the checklist, and the red
            flags open with a membership that covers it.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {publicStages.map((stage) => (
              <li key={stage.slug} className="h-full">
                <GlimpseCard stage={stage} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="plans" className="scroll-mt-20 border-b border-line">
        <Container className="py-14 sm:py-20">
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">Membership</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-5xl">
            Choose how long you need the guide.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream-dim">
            The pass covers the whole build. Monthly is there if you want to
            stop. Stage-wise is for the part of the house you are in now.
          </p>
          <div className="mt-10">
            <PlanCards
              signedIn={Boolean(viewer.user)}
              ordersReady={payments.orders}
              monthlyReady={payments.monthly}
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-24">
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-cream sm:text-6xl">
            Read the stage before it is covered up.
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-7 text-sm font-medium text-ink hover:bg-gold-bright"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-7 text-sm text-cream hover:border-gold/40"
            >
              Log in
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
