"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-actions";
import Container from "./Container";
import Logo from "./Logo";

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

export default function Header({ user }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;
  const closeRef = useRef(null);
  const links = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/account", label: "Account" },
      ]
    : [
        { href: "/#stages", label: "Stages" },
        { href: "/#plans", label: "Plans" },
        { href: "/about", label: "About" },
      ];

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
        <div className="border-b border-line bg-ink">
          <div className="h-px bg-gold/80" />
          <Container className="flex h-16 items-center justify-between gap-3">
            <Logo />
            <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
              {links.map((link) => {
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
              {user ? null : (
                <>
                  <Link href="/login" className="text-sm tracking-wide text-cream-dim hover:text-cream">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center rounded-full bg-cream px-4 text-sm font-medium text-ink transition hover:bg-gold-bright"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center gap-1.5 md:hidden">
              {user ? null : (
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center rounded-full bg-cream px-3 text-sm font-medium text-ink"
                >
                  Sign up
                </Link>
              )}
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpenPath(open ? null : pathname)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <MenuIcon open={open} />
              </button>
            </div>
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
          <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col px-5 pt-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenPath(null)}
                className="border-b border-line py-4 font-display text-[2rem] font-semibold tracking-[-0.02em] text-cream"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <form action={signOut} className="mt-8">
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center rounded-full border border-line text-sm text-cream"
                >
                  Log out
                </button>
              </form>
            ) : (
              <div className="mt-8 grid gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpenPath(null)}
                  className="flex h-12 items-center justify-center rounded-full border border-line text-sm text-cream"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpenPath(null)}
                  className="flex h-12 items-center justify-center rounded-full bg-cream text-sm font-medium text-ink"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </>
  );
}
