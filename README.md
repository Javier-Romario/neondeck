# NEONDECK

**A cyberpunk React component library.** Terminal-monospace primitives — modeled on
[SRCL](https://github.com/internet-development/www-sacred) (www-sacred) — rebuilt with
the [neon-native-real](https://github.com/) cyberpunk palette, **semi-transparent glass
panels**, and **ticker-board edge readouts**.

Every component is a copy-pasteable module: one `.tsx` + one `.module.css`, themed
entirely through CSS custom properties (`--theme-*`, `--neon-*`, `--cp-*`).

## Features

- **Neon glows** — teal / magenta / yellow / green / violet / orange / red / blue accents with `text-shadow` + `box-shadow` halos.
- **Semi-transparent surfaces** — `rgba()` panels with `backdrop-filter: blur()` + `saturate()`, plus scanline overlays.
- **Ticker-board edges** — the signature addition. A `Ticker` marquee strip runs along an edge, and a small `message` box floats right above the component via `TickerBoard`.
- **SRCL-shaped API** — `Card`, `Button`, `Accordion`, `Window`, `Select`, `Dialog`… the same prop shapes you already know.

## Quick start

```sh
npm install
npm run dev          # Next.js kitchen sink → http://localhost:3000
npm run ladle        # Ladle component playground → http://localhost:61000
npm run build-ladle  # static Ladle build → build/
```

## Component playground (Ladle)

Components are exercised in [Ladle](https://ladle.dev) — a fast Vite-based
Storybook alternative. Stories live in `stories/*.stories.tsx` and use the CSF
format (`args` + `argTypes` with live controls).

- `.ladle/config.mjs` — Ladle config (story glob, vite config pointer).
- `.ladle/components.tsx` — the `Provider` that wraps every story and pulls in `global.css`.
- `vite.config.mjs` — Vite path aliases (`@components`, `@common`, `@root`).

## The ticker-board treatment

Wrap any component in `TickerBoard`:

```tsx
import TickerBoard from '@components/TickerBoard';
import Card from '@components/Card';

<TickerBoard
  message="SYS.UPLINK // NODE 0x1F"   // small box above the component
  messageTone="magenta"
  tickerLabel="NEONDECK"
  tickerItems={['UPLINK 34.2TB/S', 'ICE-BREAKER v2.1']}
  tickerSpeed={28}
  showBottomTicker
>
  <Card title="DECKS">…</Card>
</TickerBoard>
```

- `message` → the small message box rendered right above the component.
- `tickerItems` → the scrolling ticker feed.
- `showTopTicker` / `showBottomTicker` → which edges get the marquee.
- `tickerTone` / `messageTone` → any of the eight neon tones.

`Ticker` is also available standalone for arbitrary edge strips.

## Theming

All colors come from `global.css`. Re-theme the whole deck by overriding tokens:

```css
body {
  --theme-focused-foreground: #ff2d78;   /* accent = magenta */
  --theme-button: #ff2d78;
  --theme-panel: rgba(20, 8, 20, 0.55);  /* semi-transparent surface */
}
```

Tint classes ship ready: `body.tint-magenta`, `body.tint-yellow`, `body.tint-green`,
`body.tint-violet`, `body.tint-orange`, `body.tint-red`, `body.tint-blue`.

## Component catalog

| Primitive | Purpose |
| --- | --- |
| `Ticker`, `TickerBoard` | Scrolling marquee + edge message box |
| `Card`, `CardDouble` | Neon-cornered glass panels |
| `Button` | PRIMARY / SECONDARY, disabled |
| `Window` | Semi-transparent terminal frame with scanlines |
| `Accordion`, `Dialog`, `Drawer`, `Select` | Disclosure + overlay + menu |
| `Badge`, `AlertBanner`, `Divider`, `CodeBlock` | Status + copy primitives |
| `ActionBar`, `ActionButton`, `ActionListItem`, `ButtonGroup` | Command surfaces |
| `Input`, `TextArea`, `Checkbox`, `BarLoader`, `BarProgress`, `BlockLoader` | Forms + progress |
| `Avatar`, `Breadcrumbs`, `Navigation` | Identity + navigation |
| `Grid`, `Row`, `RowSpaceBetween`, `ContentFluid`, `Indent` | Layout |
| `Table`, `TableRow`, `TableColumn`, `ListItem`, `Text` | Data + copy |

See `components/AGENTS.md` for the full per-component catalog.

## Credits

- **www-sacred / SRCL** — the gold-standard terminal component library this deck is modeled on.
- **neon-native-real** — the cyberpunk palette and glass aesthetic.
