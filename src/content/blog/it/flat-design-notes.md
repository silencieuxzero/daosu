---
title: 'Appunti sul flat design: riportare il design all\u2019informazione'
description: 'Angoli retti, bordi spessi, superfici piatte, nessuna ombra \u2014 il flat design non \u00e8 assenza di stile, ma stile che cede il passo all\u2019informazione.'
date: 2026-08-03
tags: ['Design', 'Appunti']
---

Il flat design viene spesso frainteso come "design pigro" — niente gradienti, niente ombre, niente texture, qualcosa che chiunque saprebbe fare.

Ma le sue origini non sono così semplici. A metà del Novecento, lo stile tipografico internazionale svizzero trasformò la tipografia in una scienza: sistemi a griglia, caratteri sans-serif, allineamenti rigorosi. Il flat design ha ereditato quel lascito e ha rimosso un altro strato di ridondanza dell'era digitale.

## Tre regole del flat design

Se la logica di design di questo tema dovesse essere riassunta in tre frasi:

1. **Nessuna ombra** — gli oggetti non devono "galleggiare" sopra lo sfondo; sono semplicemente lì
2. **Bordi spessi** — una linea piena di 2px delimita il territorio più onestamente di qualsiasi ombra
3. **Superfici piatte** — un colore è un'informazione; mescolare significa solo diluirla

> Il design non è decorazione; è l'ordine dell'informazione. Rimuovi tutte le ombre, e le forme e i colori che restano parlano davvero.

## Il rapporto con le variabili CSS

Tutti i segreti di questo tema vivono nelle variabili:

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

Cambiare tema non significa ridisegnare: significa solo sostituire un insieme di valori. Moderno e antico condividono gli stessi componenti e lo stesso linguaggio tipografico — **cambia l'atmosfera, non la grammatica**. È per questo che credo che il flat design si adatti perfettamente a un sistema di temi.

## Perché bianco-nero-grigio e blu ardesia

| Tema | Colore principale | Carattere |
|------|-------------------|-----------|
| Moderno | Bianco, nero, grigio | Calmo, preciso, industriale |
| Antico | Blu ardesia #2E3B52 | Arcaico, calmo, attenuato |

Il bianco-nero-grigio è l'onestà del "senza colore"; il blu ardesia è la sobrietà del "un solo colore". Entrambi rifiutano l'ostentazione — ed è proprio per questo che possono convivere in un unico tema.
