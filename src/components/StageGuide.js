import Link from "next/link";
import Container from "./Container";

const SECTIONS = [
  {
    id: "best-practice",
    title: "Best practice",
    lede: "What to aim for on a carefully built house.",
    key: "bestPractice",
    marker: "number",
    rule: "border-l-[#c6a36a]",
  },
  {
    id: "minimum-acceptable",
    title: "Minimum acceptable",
    lede: "The line below which you should stop and ask, rather than carry on.",
    key: "minimumAcceptable",
    marker: "number",
    rule: "border-l-[#f3eee6]",
  },
  {
    id: "checklist",
    title: "Checklist",
    lede: "Use this while the work is still open.",
    key: "checklist",
    marker: "check",
    rule: "border-l-[#cbbfae]",
    wide: true,
  },
  {
    id: "red-flags",
    title: "Red flags",
    lede: "Reasons to pause before this stage is covered up.",
    key: "redFlags",
    marker: "flag",
    rule: "border-l-[#e4c2b4]",
    wide: true,
  },
];

function Marker({ marker, index }) {
  if (marker === "check") {
    return (
      <span
        aria-hidden="true"
        className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-[3px] border border-gold/70"
      />
    );
  }

  if (marker === "flag") {
    return (
      <span
        aria-hidden="true"
        className="mt-2.5 h-px w-3.5 shrink-0 bg-[#e4c2b4]"
      />
    );
  }

  return (
    <span className="w-7 shrink-0 font-display text-lg tabular-nums leading-7 text-gold">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function SectionCard({ section, stage }) {
  return (
    <section
      id={section.id}
      className={`scroll-mt-24 rounded-lg border border-line border-l-2 ${section.rule} bg-ink-soft px-5 py-6 sm:px-7 sm:py-8`}
    >
      <h2 className="font-display text-[2rem] font-semibold leading-none tracking-[-0.02em] text-cream">
        {section.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cream-dim">{section.lede}</p>
      <ul
        className={
          section.wide
            ? "mt-6 grid gap-4 lg:grid-cols-2 lg:gap-x-10"
            : "mt-6 space-y-4"
        }
      >
        {stage[section.key].map((item, index) => (
          <li key={item} className="flex gap-3 text-base leading-7 text-cream">
            <Marker marker={section.marker} index={index} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function NeighborLink({ stage, direction }) {
  if (!stage) return <div className="hidden sm:block" />;

  const label = direction === "previous" ? "Previous stage" : "Next stage";

  return (
    <Link
      href={`/stage/${stage.slug}`}
      className={`group flex flex-col rounded-lg border border-line bg-ink-soft px-5 py-4 transition-colors hover:border-gold/40 ${
        direction === "next" ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">
        {label}
      </span>
      <span className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
        {stage.title}
      </span>
    </Link>
  );
}

export default function StageGuide({ stage, previous, next }) {
  const number = String(stage.id).padStart(2, "0");

  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-cream"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            d="M13 8H3M7 4 3 8l4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Your stages
      </Link>

      <p className="mt-8 font-display text-3xl font-semibold tabular-nums text-gold">
        {number}
      </p>
      <h1 className="mt-2 max-w-3xl text-balance font-display text-[2.45rem] font-semibold leading-[1.08] tracking-[-0.02em] text-cream sm:text-5xl">
        {stage.title}
      </h1>
      <p className="mt-4 text-sm tracking-wide text-gold/90">{stage.covers}</p>
      <p className="mt-5 max-w-2xl text-base leading-7 text-cream-dim sm:text-[1.05rem]">
        {stage.description}
      </p>

      <nav aria-label="On this page" className="no-print mt-8 flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full border border-line px-3.5 py-2 text-xs tracking-wide text-cream-dim hover:border-gold/40 hover:text-cream"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
        {SECTIONS.filter((section) => !section.wide).map((section) => (
          <SectionCard key={section.id} section={section} stage={stage} />
        ))}
      </div>
      <div className="mt-5 grid gap-5">
        {SECTIONS.filter((section) => section.wide).map((section) => (
          <SectionCard key={section.id} section={section} stage={stage} />
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-cream-dim">
        General guidance for a typical independent house. If it disagrees with
        your structural drawings or your engineer, follow the drawings.
      </p>

      <nav
        aria-label="Other stages"
        className="no-print mt-10 grid gap-3 sm:grid-cols-2"
      >
        <NeighborLink stage={previous} direction="previous" />
        <NeighborLink stage={next} direction="next" />
      </nav>
    </Container>
  );
}
