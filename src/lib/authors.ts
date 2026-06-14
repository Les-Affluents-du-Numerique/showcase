import type { ImageMetadata } from "astro";
import { AUTHORS } from "../consts";

export interface ResolvedAuthor {
  /** Display name */
  name: string;
  /** Profile image, present for known collective members */
  image?: ImageMetadata;
  /** Uppercase first letter, used as an avatar fallback */
  initial: string;
}

const KNOWN_AUTHORS = AUTHORS as Record<
  string,
  { name: string; image: ImageMetadata }
>;

/**
 * Normalise the two historical author shapes — a new `authors` slug array or a
 * legacy single `author` string — into a list of resolved authors with name,
 * image and initial. Unknown slugs/names fall back to an initial-only entry.
 */
export function resolveAuthors(
  authors?: string[],
  author?: string,
): ResolvedAuthor[] {
  const values = authors && authors.length ? authors : author ? [author] : [];

  return values.map((value) => {
    const known = KNOWN_AUTHORS[value];
    const name = known ? known.name : value;
    return {
      name,
      image: known?.image,
      initial: (name?.charAt(0) || "?").toUpperCase(),
    };
  });
}
