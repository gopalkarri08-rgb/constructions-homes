import Link from "next/link";
import StageIcon from "./StageIcon";

export default function StageCard({ stage }) {
  const number = String(stage.id).padStart(2, "0");

  return (
    <Link
      href={`/stage/${stage.id}`}
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
      <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-dim">
        {stage.summary}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.68rem] uppercase tracking-[0.18em] text-gold">
        View stage
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
