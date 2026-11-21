export default function WhyMatters({ why = [], timeHint }) {
  if (!why.length && !timeHint) return null;
  return (
    <section className="rounded-lg border border-line bg-ink-soft px-5 py-5">
      <h2 className="font-display text-2xl font-semibold text-cream">Why this matters</h2>
      {timeHint ? <p className="mt-3 text-sm leading-relaxed text-gold">{timeHint}</p> : null}
      <ul className="mt-3 space-y-2">
        {why.map((line) => (
          <li key={line} className="text-base leading-7 text-cream">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
