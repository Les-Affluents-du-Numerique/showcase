import type { CollectionEntry } from "astro:content";
import { POST_TAGS_ENUM, type PostTagKey } from "../consts";

export const MIN_POSTS_PER_CATEGORY = 3;

export function getIndexableBlogCategories(
  posts: CollectionEntry<"blog">[],
): [PostTagKey, (typeof POST_TAGS_ENUM)[PostTagKey]][] {
  return (
    Object.entries(POST_TAGS_ENUM) as [
      PostTagKey,
      (typeof POST_TAGS_ENUM)[PostTagKey],
    ][]
  ).filter(
    ([tag]) =>
      posts.filter((post) => (post.data.tags ?? []).includes(tag)).length >=
      MIN_POSTS_PER_CATEGORY,
  );
}
