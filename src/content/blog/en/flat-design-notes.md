---
title: 'Notes on Flat Design: Bringing Design Back to Information'
description: 'Right angles, thick borders, flat fills, no shadows — flat design is not the absence of style, but style yielding to information.'
date: 2026-08-03
tags: ['Design', 'Notes']
---

Flat design is often misread as "lazy design" — no gradients, no shadows, no textures, something anyone could do.

But its origins are not so simple. In the mid-twentieth century, Swiss International Style turned typography into a science: grid systems, sans-serif typefaces, strict alignment. Flat design inherited that legacy and stripped away another layer of digital-era redundancy.

## Three Rules of Flat Design

If this theme's design logic had to be summarized in three sentences:

1. **No shadows** — objects don't need to "float" above the background; they are simply there
2. **Thick borders** — a 2px solid line defines territory more honestly than any drop shadow
3. **Flat fills** — one color is one piece of information; blending only dilutes it

> Design is not decoration; it is the order of information. Remove all shadows, and the shapes and colors that remain truly speak.

## The Relationship with CSS Variables

All the secrets of this theme live in variables:

```css
[data-theme='modern'] {
  --bg: #ffffff;
  --fg: #0a0a0a;
  --accent: #0000e0;
}

[data-theme='ancient'] {
  --bg: #2e3b52;
  --fg: #f2f2ff;
  --accent: #ffffff;
}
```

Switching themes is not redesigning — it is just swapping a set of values. Modern and ancient share the same components and the same typographic language: **the mood changes, the grammar does not**. This is why I believe flat design is the best fit for a theme system.

## Why Black-White-Grey and Slate Blue

| Theme | Primary color | Character |
|-------|---------------|-----------|
| Modern | Black, white, grey | Calm, precise, industrial |
| Ancient | Slate blue #2E3B52 | Archaic, calm, muted |

Black-white-grey is the honesty of "no color"; deep blue is the restraint of "one color". Both refuse flashiness — which is exactly why they can coexist in one theme.
