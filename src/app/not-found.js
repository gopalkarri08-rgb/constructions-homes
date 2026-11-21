import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.025em] text-cream sm:text-6xl">
        This page is not part of the guide.
      </h1>
      <p className="mt-5 max-w-md text-base leading-7 text-cream-dim">
        The construction stages are numbered 1 to 8.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-ink hover:bg-gold-bright"
      >
        Back to the start
      </Link>
    </Container>
  );
}
