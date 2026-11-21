/** Shared shape for a checkable item. Content files add the words. */
export function item(slug, title, what, best, minimum, howToCheck, redFlags, questions) {
  return { slug, title, what, best, minimum, howToCheck, redFlags, questions };
}

export function sub(slug, title, summary, items) {
  return { slug, title, summary, items };
}
