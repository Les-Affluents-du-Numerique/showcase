import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { postTagsSchema } from "./consts";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // backward-compatible: single `author` or new `authors` array
      author: z.string().optional(),
      authors: z.array(z.string()).optional(),
      tags: postTagsSchema,
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      authorImage: z.optional(image()),
    }),
});

const realisations = defineCollection({
  // Load Markdown files in `src/content/realisations/`
  loader: glob({
    base: "./src/content/realisations",
    pattern: "**/*.{md,mdx}",
  }),
  // Accept `image()` in the schema function so frontmatter can use imported assets
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Support start/end dates for projects; endDate is optional for ongoing works
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      // Authors as array of author slugs (see `src/consts.ts` mapping)
      authors: z.array(z.string()).optional(),
      hero: z.optional(image()),
      tech: z.array(z.string()).optional(),
      summary: z.string().optional(),
    }),
});

export const collections = { blog, realisations };
