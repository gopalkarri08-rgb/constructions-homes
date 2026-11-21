export default function ProgressMeter({ done = 0, total = 0 }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-xs tracking-wide text-cream-dim">
        <span>
          {done} of {total} checked
        </span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
