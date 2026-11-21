import Link from "next/link";
import Container from "./Container";

export default function Footer({ user }) {
  const links = user
    ? [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/account", label: "Account" },
        { href: "/about", label: "About" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/#stages", label: "Stages" },
        { href: "/#plans", label: "Plans" },
        { href: "/about", label: "About" },
        { href: "/login", label: "Log in" },
        { href: "/signup", label: "Sign up" },
      ];

  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-14 sm:py-16">
        <p className="max-w-xl font-display text-[1.85rem] font-semibold leading-tight tracking-[-0.02em] text-cream sm:text-4xl">
          We don&apos;t build your house. We help you understand how your house
          should be built.
        </p>
        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {links.map((link) => (
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
          the site. The stage standards are for members.
        </p>
        <p className="mt-6 text-xs tracking-wide text-cream-dim">
          © 2026 Constructions.homes
        </p>
      </Container>
    </footer>
  );
}
