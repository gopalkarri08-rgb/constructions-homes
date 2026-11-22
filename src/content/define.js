/** Shared shape for a checkable item. Content files add the words. */
export function item(slug, title, what, best, minimum, howToCheck, redFlags, questions) {
  return { slug, title, what, best, minimum, howToCheck, redFlags, questions };
}

export function sub(slug, title, summary, items, extra = {}) {
  return {
    slug,
    title,
    summary,
    items,
    optional: Boolean(extra.optional),
    why: extra.why ?? [],
    timeHint: extra.timeHint ?? "",
  };
}
