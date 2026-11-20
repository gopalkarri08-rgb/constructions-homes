"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Logo from "./Logo";

const LINKS = [
  { href: "/#journey", label: "Journey" },
  { href: "/about", label: "About" },
];

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 8h16M4 16h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onKey(event) {
      if (event.key === "Escape") setOpenPath(null);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40" aria-hidden={open || undefined}>
      <div className="relative border-b border-line bg-ink/92 backdrop-blur-md">
        <div className="h-px bg-gold/80" />
        <Container className="flex h-16 items-center justify-between gap-3">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((link) => {
              const current = link.href === pathname;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`text-sm tracking-wide ${
                    current ? "text-cream" : "text-cream-dim hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/get-started"
              aria-current={pathname === "/get-started" ? "page" : undefined}
              className="inline-flex h-10 items-center rounded-full bg-cream px-4 text-sm font-medium text-ink transition hover:bg-gold-bright"
            >
              Get Started
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </Container>
      </div>
    </header>
    {open ? (
      <div className="fixed inset-0 z-50 flex flex-col bg-ink md:hidden">
        <div className="h-px bg-gold/80" />
        <div className="flex h-16 items-center justify-between px-5">
          <div onClick={() => setOpenPath(null)}>
            <Logo />
          </div>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream"
            onClick={() => setOpenPath(null)}
          >
            <span className="sr-only">Close menu</span>
            <MenuIcon open />
          </button>
        </div>
        <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col px-5 pt-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenPath(null)}
              className="border-b border-line py-4 font-display text-[2rem] font-semibold tracking-[-0.02em] text-cream"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-started"
            onClick={() => setOpenPath(null)}
            className="mt-8 flex h-12 items-center justify-center rounded-full bg-cream text-sm font-medium text-ink"
          >
            Get Started
          </Link>
        </nav>
      </div>
    ) : null}
    </>
  );
}
