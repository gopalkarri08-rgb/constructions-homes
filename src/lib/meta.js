/**
 * Shared page metadata so titles, descriptions, and canonical URLs stay consistent.
 * @param {{ title: string, description: string, path: string, absolute?: boolean }} page
 */
export function pageMeta({ title, description, path, absolute = false }) {
  const fullTitle = absolute ? title : `${title} · Constructions.homes`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
    },
  };
}
