# Software-Entwicklung unter Einsatz von KI

Web-Version des Vortrags *„Software-Entwicklung unter Einsatz von KI: Vorteile, Implementierung und Erfahrungen“* (Dr. Blasius Lofi Dewanto). Die Folien sind auf Deutsch.
Folien-Engine und Design stammen aus [`talk-ai-or-die`](../talk-ai-or-die); Folien mit ähnlichem Inhalt sind von dort kopiert und tragen den deutschen Text des PDFs.
Die Folien 11 und 12 stammen aus [`ki-softwareentwicklung`](../ki-softwareentwicklung). Bis Folie 11 entsprechen die Foliennummern den Seitenzahlen des Original-PDFs, ab Folie 13 ist die Seitenzahl um eins kleiner.

## Bedienung

| Taste | Aktion |
| --- | --- |
| `→` `↓` `Leertaste` `PageDown` | nächster Schritt / nächste Folie |
| `←` `↑` `Shift+Leertaste` `PageUp` | vorheriger Schritt / vorherige Folie |
| `Home` / `End` | erste / letzte Folie |
| `O` oder `Esc` | Folienübersicht (Pfeiltasten + `Enter` zum Springen) |
| `F` | Vollbild |

## Struktur

```
public/                  ← statische Seite (kein Build-Schritt)
  index.html             alle Folien als <section class="slide">
  assets/css/deck.css    Folien-Engine (wie talk-ai-or-die)
  assets/css/theme.css   Design-Tokens und gemeinsame Layouts (wie talk-ai-or-die)
  assets/css/talk.css    Layouts von talk-ai-or-die plus die PDF- und Agenda-Folien dieses Vortrags
  assets/js/deck.js      Logik der Folien-Engine (wie talk-ai-or-die)
  assets/img/slides/     Bilder aus dem PDF
tools/                   Deck-Prüfungen (nur für die Entwicklung)
```

## Lokale Vorschau

```sh
python3 -m http.server -d public 8000
```

## Prüfungen

```sh
cd tools && npm install && npm run check
```

Lizenzen von Drittanbietern: siehe [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
