---
title: '这个博客的搭建记录'
description: 'Astro 内容集合 + CSS 变量双主题 + SVG 纹样，零图片依赖的静态博客是怎么搭出来的。'
date: 2026-07-25
tags: ['Astro', '技术']
---

这个博客基于 Astro 7 构建，全部代码只有三个层次：内容、主题、路由。

## 内容：Markdown 集合

文章放在 `src/content/blog/`，用内容集合（Content Collections）管理。每篇文章的头部声明元数据：

```yaml
---
title: '这个博客的搭建记录'
date: 2026-07-25
tags: ['Astro', '技术']
---
```

类型安全由 `content.config.ts` 保证——写错字段类型，构建时就会报错：

```ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## 主题：CSS 变量

双主题（现代/古代）只有一个核心机制——`data-theme` 属性切换一组变量：

- `localStorage` 记住选择
- 首帧内联脚本恢复主题，无闪烁
- 全部纹理是 SVG data URI，**零图片请求**

## 路由：只有三个页面

```
/                  首页（文章列表）
/blog/[...slug]/   文章详情
/about             关于
/theme             主题文档（开发用）
```

文章页用 `getStaticPaths` 在构建时生成，所以整个站点是纯静态的——部署到哪里都行。

## 一些数字

| 项目 | 数值 |
|------|------|
| 依赖 | 1 个（astro） |
| CSS 变量 | 约 20 个 |
| 图片请求 | 0 |
| 构建时间 | 约 1 秒 |

写博客最理想的形态，大概就是这样：**内容是一堆 Markdown，设计是一组变量，构建是一秒钟。**
