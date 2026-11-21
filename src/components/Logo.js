import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex min-w-0 items-baseline whitespace-nowrap font-display text-[1.28rem] leading-none tracking-[-0.03em] text-cream sm:text-[1.55rem]"
    >
      Constructions
      <span className="text-gold">.homes</span>
    </Link>
  );
}
