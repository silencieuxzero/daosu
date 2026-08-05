import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章内容集合（Astro 5+ Content Layer：显式 glob loader）
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
