import Link from "next/link";
import Container from "./Container";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#journey", label: "Journey" },
  { href: "/get-started", label: "Get Started" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-14 sm:py-16">
        <p className="max-w-xl font-display text-[1.85rem] font-semibold leading-tight tracking-[-0.02em] text-cream sm:text-4xl">
          We don&apos;t build your house. We help you understand how your house
          should be built.
        </p>
        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream-dim hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-cream-dim">
          General guidance for a typical RCC-framed independent house in India.
          Your soil report, structural drawings, and local building rules govern
          the site.
        </p>
        <p className="mt-6 text-xs tracking-wide text-cream-dim">
          © 2026 Constructions.homes
        </p>
      </Container>
    </footer>
  );
}
