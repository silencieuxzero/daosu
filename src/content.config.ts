import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
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

// 茶客档案集合（茶客设定页 /guests，由 config.mjs 导航下拉组进入）
const guests = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guests' }),
  schema: z.object({
    name: z.string(),        // 显示名（如 "查维尔/Xaviel"）
    gender: z.coerce.string(),      // 性别
    age: z.coerce.string(),         // 年龄（允许数字，自动转字符串）
    identity: z.string(),    // 身份
    affiliation: z.string(), // 所属
    status: z.string(),      // 状态（活跃…）
    portrait: z.string().optional(), // 立绘路径（public 下，可缺省显示占位）
    description: z.string().optional(), // 索引页摘要（一句话）
    quote: z.string().optional(),   // 语录
    source: z.string().optional(),  // 档案来源（wiki 页面名）
    order: z.number().default(99),  // 展示顺序
  }),
});

// 茶馆故事集合（茶馆故事页 /stories，由 config.mjs 导航下拉组进入）
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),       // 作者/署名
    date: z.coerce.date().optional(),    // 发布日期
    description: z.string().optional(),  // 摘要
    tags: z.array(z.string()).default([]),
    source: z.string().optional(),       // 来源（wiki 页面名）
    order: z.number().default(99),       // 展示顺序
  }),
});

export const collections = { blog, guests, stories };
