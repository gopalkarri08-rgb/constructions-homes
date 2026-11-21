import Link from "next/link";
import StageIcon from "./StageIcon";

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
      <rect
        x="3.2"
        y="7"
        width="9.6"
        height="6.2"
        rx="1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GlimpseCard({ stage }) {
  const number = String(stage.id).padStart(2, "0");

  return (
    <Link
      href={`/stage/${stage.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-ink-soft p-5 transition-colors hover:border-gold/45 hover:bg-panel sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-[1.7rem] font-semibold tabular-nums leading-none text-gold">
          {number}
        </span>
        <StageIcon
          name={stage.icon}
          className="h-7 w-7 text-cream-dim transition-colors group-hover:text-gold"
        />
      </div>
      <h3 className="mt-8 font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-cream">
        {stage.title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-dim">{stage.teaser}</p>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 pt-8 text-[0.68rem] uppercase tracking-[0.16em] text-gold">
        <LockIcon />
        Members
      </span>
    </Link>
  );
}
