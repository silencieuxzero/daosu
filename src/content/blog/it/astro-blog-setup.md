---
title: 'Come \u00e8 stato costruito questo blog'
description: 'Content collections Astro + temi doppi con variabili CSS + motivi SVG \u2014 un blog statico con zero richieste di immagini.'
date: 2026-07-25
tags: ['Astro', 'Tecnologia']
---

Questo blog è costruito su Astro 7, e l'intero codice ha solo tre livelli: contenuto, tema e routing.

## Contenuto: Markdown Collections

Gli articoli vivono in `src/content/blog/`, gestiti con le Content Collections. Ogni articolo dichiara i propri metadati nel frontmatter:

```yaml
---
title: 'Come è stato costruito questo blog'
date: 2026-07-25
tags: ['Astro', 'Tecnologia']
---
```

La sicurezza dei tipi è garantita da `content.config.ts` — un tipo di campo errato fa fallire la build:

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

## Tema: guidato dalla timeline

Il doppio tema (moderno/antico) è guidato dal cursore della timeline — ogni epoca dichiara il proprio tema nel frontmatter `timeline[].theme` della scheda dell'ospite:

- Trascina la timeline su un'epoca e l'intera pagina cambia tema (colori e contenuti)
- Uno script inline ripristina il tema dell'epoca predefinita prima del primo rendering; nessun lampeggio
- Tutte le texture sono data URI SVG — **zero richieste di immagini**

## Routing: poche pagine

```
/                   Home (elenco articoli)
/blog/[...slug]/    Pagina articolo
/about              Chi sono
/theme              Documentazione del tema (per sviluppo)
```

Le pagine degli articoli sono generate a build time tramite `getStaticPaths`, quindi l'intero sito è puramente statico — deployabile ovunque.

## Alcuni numeri

| Voce | Valore |
|------|--------|
| Dipendenze | 1 (astro) |
| Variabili CSS | ~20 |
| Richieste di immagini | 0 |
| Tempo di build | ~1 secondo |

La forma ideale del blogging, suppongo, è più o meno questa: **il contenuto è un mucchio di Markdown, il design è un insieme di variabili, e la build dura un secondo.**
