---
title: 'How This Blog Is Built'
description: 'Astro content collections + CSS variable dual themes + SVG patterns — a static blog with zero image requests.'
date: 2026-07-25
tags: ['Astro', 'Tech']
---

This blog is built on Astro 7, and the entire codebase has only three layers: content, theme, and routing.

## Content: Markdown Collections

Posts live in `src/content/blog/`, managed with Content Collections. Each post declares its metadata in the frontmatter:

```yaml
---
title: 'How This Blog Is Built'
date: 2026-07-25
tags: ['Astro', 'Tech']
---
```

Type safety is guaranteed by `content.config.ts` — a wrong field type fails the build:

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## Theme: Driven by the Timeline

The dual theme (modern/ancient) is driven by the timeline slider — each era declares its theme in the guest profile's `timeline[].theme` frontmatter:

- Drag the timeline to an era and the whole page switches theme (colors and content split)
- An inline script restores the default era's theme before first paint; no flash
- All textures are SVG data URIs — **zero image requests**

## Routing: A Handful of Pages

```
/                   Home (post list)
/blog/[...slug]/    Post page
/about              About
/theme              Theme docs (for development)
```

Post pages are generated at build time via `getStaticPaths`, so the whole site is pure static — deploy it anywhere.

## Some Numbers

| Item | Value |
|------|-------|
| Dependencies | 1 (astro) |
| CSS variables | ~20 |
| Image requests | 0 |
| Build time | ~1 second |

The ideal form of blogging, I suppose, is roughly this: **content is a pile of Markdown, design is a set of variables, and the build takes one second.**
