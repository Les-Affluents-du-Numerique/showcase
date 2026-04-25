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
      author: z.string(),
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
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      hero: z.string().optional(),
      tech: z.array(z.string()).optional(),
      summary: z.string().optional(),
    }),
});

export const collections = { blog, realisations };
