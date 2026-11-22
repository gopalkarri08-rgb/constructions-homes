import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Container from "@/components/Container";

export default function MemberColumn({
  back,
  crumbs,
  kicker,
  title,
  lede,
  note,
  progress,
  hint,
  children,
  assistant,
}) {
  return (
    <>
      <Container className="pb-72 pt-8 sm:pt-12">
        {back ? (
          <Link
            href={back.href}
            className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line bg-ink-soft px-4 text-sm font-medium text-cream"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {back.label}
          </Link>
        ) : null}
        <nav aria-label="Breadcrumb" className={`${back ? "mt-4" : ""} text-sm text-cream-dim`}>
          <p className="leading-6">
            {crumbs.map((crumb, index) => (
              <span key={crumb.href || crumb.label}>
                {index > 0 ? <span aria-hidden="true"> / </span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-cream">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-cream">{crumb.label}</span>
                )}
              </span>
            ))}
          </p>
        </nav>
        {kicker ? (
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.2em] text-gold">{kicker}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-balance font-display text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cream sm:text-5xl">
          {title}
        </h1>
        {note ? <p className="mt-3 max-w-2xl text-sm leading-6 text-gold">{note}</p> : null}
        {lede ? <p className="mt-4 max-w-2xl text-base leading-7 text-cream-dim">{lede}</p> : null}
        {progress ? <div className="mt-6 max-w-md">{progress}</div> : null}
        {hint ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream">{hint}</p> : null}
        <div className="mt-8">{children}</div>
      </Container>
      {assistant}
    </>
  );
}
