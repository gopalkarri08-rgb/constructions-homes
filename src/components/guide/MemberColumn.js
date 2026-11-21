import Link from "next/link";
import Container from "@/components/Container";

export default function MemberColumn({ crumbs, kicker, title, lede, progress, children, assistant }) {
  return (
    <Container className="py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-cream-dim">
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
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          {kicker ? (
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">{kicker}</p>
          ) : null}
          <h1 className="mt-2 max-w-3xl text-balance font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-cream sm:text-5xl">
            {title}
          </h1>
          {lede ? <p className="mt-4 max-w-2xl text-base leading-7 text-cream-dim">{lede}</p> : null}
          {progress ? <div className="mt-6 max-w-md">{progress}</div> : null}
          <div className="mt-8">{children}</div>
        </div>
        <div className="lg:sticky lg:top-24">{assistant}</div>
      </div>
    </Container>
  );
}
