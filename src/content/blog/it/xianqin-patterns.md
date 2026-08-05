---
title: 'Appunti sui motivi pre-Qin: nuvola-tuono e maschere animali'
description: 'Motivi nuvola-tuono come sfondo, maschere animali come sentinelle, iscrizioni come filigrane \u2014 tradurre il linguaggio dei bronzi Shang e Zhou in CSS.'
date: 2026-07-30
tags: ['Pre-Qin', 'Motivi']
---

I vasi di bronzo delle dinastie Shang e Zhou portano due famiglie di ornamenti, che per caso si traducono in un sistema di temi.

## Motivi nuvola-tuono: il linguaggio dello sfondo

I motivi nuvola-tuono sono la decorazione di fondo più elementare dei bronzi, costruita da spirali continue. Le spirali angolari sono dette "motivi tuono", quelle arrotondate "motivi nuvola" — insieme, "nuvola-tuono".

Non rubano mai la scena, ma sono ovunque. Proprio come le spirali sotto le pagine di questo tema:

```css
--texture-body: url("data:image/svg+xml;utf8,<svg ...>...</svg>");
```

Blu-grigio su blu-grigio — appena visibile, mai di disturbo alla lettura. **Un buon motivo di fondo dovrebbe essere come la matrice di un bronzo: sorregge tutto senza annunciarsi.**

## Maschere animali: la presenza che veglia

La maschera animale, un tempo chiamata *taotie*, è la decorazione più appariscente dei bronzi. Occhi simmetrici, bocca spalancata con zanne, fissano direttamente l'osservatore.

Nel piè di pagina ho posto una versione lineare minima: corna, sopracciglia, occhi, ponte del naso, bocca. Tutto costruito con linee simmetriche, dritte e curve — il flat design e l'arte pre-Qin qui concordano:

> La simmetria non è conservatorismo; è senso dell'ordine. Le maschere animali la usano da millenni — noi abbiamo solo cambiato il modo di disegnarla.

## Iscrizioni: la consapevolezza della filigrana

Le iscrizioni in bronzo erano fuse sulla parete interna dei vasi, non destinate a essere viste — eppure sono diventate la presenza più silenziosa. Il carattere verticale nel tema segue questa idea: non compete con il contenuto, ma dà alla pagina una base "come se fosse fusa".

## Un'archeologia di un tema

Se questo tema venisse smontato, i suoi strati sono come sedimenti:

1. Il più profondo: motivo nuvola-tuono (sfondo della pagina)
2. Secondo: fascia a spirale (separatori delle sezioni)
3. Terzo: contenuto (testo e immagini)
4. Il più alto: maschera animale e iscrizione (piè di pagina e intestazioni)

I bronzi erano fusi in stampi — uno strato di argilla, uno strato di motivo, uno strato di fuoco. Le pagine web sono molto simili, solo che l'argilla è diventata CSS.
