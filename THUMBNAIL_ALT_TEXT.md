# Custom ALT Text for Thumbnails and Hero Images

## Overview

This feature adds support for custom alternative text (ALT text) for thumbnails and hero images in blog posts and realisations (projects). This improves both accessibility and SEO by allowing content creators to provide descriptive text for each image.

## Usage

### For Blog Posts

Add the `thumbnailAlt` field to the frontmatter of your MDX blog posts:

```yaml
---
title: 'Your Blog Post Title'
authors: ['author-slug']
tags: []
description: 'Your post description'
pubDate: 'Apr 29 2026'
heroImage: '../../assets/your-image.png'
thumbnailAlt: 'Descriptive text for your image'
---
```

**Fallback behavior:**
- In `BlogCard.astro` (grid view): Falls back to "Miniature de l'article"
- In `FeaturedBlogCard.astro` and `BlogPost.astro`: Falls back to the post title

### For Réalisations (Projects)

Add the `heroAlt` field to the frontmatter of your MDX realisation files:

```yaml
---
title: "Project Title"
authors: ["author-slug"]
description: "Project description"
startDate: 2025-01-01
endDate: 2026-01-01
hero: "../../assets/project-image.webp"
heroAlt: "Descriptive text for your project image"
tech:
  - Tech1
  - Tech2
---
```

**Fallback behavior:**
- Falls back to the project title if `heroAlt` is not provided

## Implementation Details

### Schema Changes

1. **Blog Collection** (`src/content.config.ts`):
   - Added `thumbnailAlt: z.string().optional()` field

2. **Réalisations Collection** (`src/content.config.ts`):
   - Added `heroAlt: z.string().optional()` field

### Component Updates

1. **BlogCard.astro**:
   - Uses `post.data.thumbnailAlt ?? "Miniature de l'article"`

2. **FeaturedBlogCard.astro**:
   - Uses `post.data.thumbnailAlt ?? post.data.title`

3. **BlogPost.astro** (layout):
   - Uses `thumbnailAlt ?? title`

4. **RealisationCard.astro**:
   - Uses `project.data.heroAlt ?? project.data.title`

5. **pages/realisations/[slug].astro**:
   - Uses `project.data.heroAlt ?? project.data.title`

## Benefits

✅ **Improved Accessibility**: Screen readers can now describe images accurately to visually impaired users

✅ **Better SEO**: Search engines can better understand image content through descriptive ALT text

✅ **Flexibility**: Content creators can customize descriptions for each image instead of relying on generic or title-based text

✅ **Graceful Degradation**: If `thumbnailAlt` or `heroAlt` is not provided, the system falls back to sensible defaults

## Examples

See the following files for working examples:
- `/src/content/blog/comment-financer-transition-numerique-ile-de-france.mdx`
- `/src/content/realisations/tisseco.mdx`
