---
title: '建站录（古卷版）'
description: '同一座博客，若落笔于竹简之上，便是这般模样。'
date: 2026-07-25
tags: ['竹简', '杂记']
---

此站之营造，与筑台无异。基、构、饰三者而已。

## 基 · 文字

文存于 `src/content/blog/`，一页一简，简首题注：

```yaml
---
title: '建站录（古卷版）'
date: 2026-07-25
tags: ['竹简', '杂记']
---
```

简式有度，由 `content.config.ts` 勘验——题写谬误者，筑台时即见败笔：

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

## 饰 · 丹青

古今二色，系于一"theme"之号：墨色为今，黛蓝为古。所择记于 `localStorage`，启卷即复，不见闪烁。纹样皆以 SVG 绘就，**不费一图**。

## 构 · 三径

```
/                  堂（文章之目）
/blog/[...slug]/   卷（文章之身）
/about             志（作者小传）
```

卷帙以 `getStaticPaths` 于筑台时写就，故全站纯静，随处可置。

## 数

| 事 | 数 |
|----|----|
| 依凭 | 一器（astro） |
| 丹青之变 | 约二十 |
| 图像之费 | 零 |
| 筑台之瞬 | 约一秒 |

筑博客之至境，大抵如此：**文为竹简，饰为一组色，筑台为一瞬。**
