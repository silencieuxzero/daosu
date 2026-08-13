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
    timeline: z
      .array(
        z.object({
          era: z.number(),   // 时间点序号（0 起，由滑块驱动）
          label: z.string(), // 刻度名（滑块下方显示）
          title: z.string(), // 该时间点的标题（正文在 timelines 集合单独成文件）
          theme: z.enum(['modern', 'ancient']).optional(), // 该时间点使用的主题（缺省不改变主题）
        })
      )
      .default([]), // 时间线（可选）：导航栏滑块驱动，正文从 src/content/timelines/ 加载
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

// 时间线内容集合（src/content/timelines/<slug>/<era>.md）
// 茶客档案 timeline 各时间点的正文：独立文件加载，与 ancient/ 主题分套同构，
// 由全局 data-era（导航栏时间线滑块）驱动显隐
const timelines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timelines' }),
  schema: z.object({
    guest: z.string(),       // 关联茶客 slug（guests 配对键，如 chawelier）
    era: z.number(),         // 时间点序号（对应档案 frontmatter timeline[].era）
    title: z.string().optional(), // 标题（可选；页面优先用档案 frontmatter 的 title）
  }),
});

export const collections = { blog, guests, stories, timelines };
