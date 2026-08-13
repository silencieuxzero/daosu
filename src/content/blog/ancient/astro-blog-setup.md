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

古今二色，随"时"而转：茶客之档可于 `timeline` 中注 `theme` 之号——曳轴而临其期，墨黛随换，色与文俱变。首帧即复默认之期，不见闪烁。纹样皆以 SVG 绘就，**不费一图**。

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

## 蔽字之法

本站复有"蔽字"一法：文字为墨所掩，悬笔其上乃现。其法，于文中直书：

```html
<span class="spoiler">所掩之字</span>
```

试之——此句为墨所蔽：<span class="spoiler">我是鱼，或许是鱼。</span>

以笔点之，或按之，其字亦现。
