```text
 __   _ _______  _____  __   _ ______  _______ _______ _     _
 | \  | |______ |     | | \  | |     \ |______ |       |____/
 |  \_| |______ |_____| |  \_| |_____/ |______ |_____  |    \_
```

![NEONDECK](https://img.shields.io/badge/NEONDECK-CYBERPUNK-ff2d78?style=for-the-badge&labelColor=04070b)
![react](https://img.shields.io/badge/react-19-2de2ff?style=for-the-badge&labelColor=04070b)
![next](https://img.shields.io/badge/next.js-16-00ffd1?style=for-the-badge&labelColor=04070b)
![ladle](https://img.shields.io/badge/playground-LADLE-ff9d2d?style=for-the-badge&labelColor=04070b)
![license](https://img.shields.io/badge/license-MIT-00ff9d?style=for-the-badge&labelColor=04070b)

> `//` NEONDECK — a cyberpunk component library for the deck jockeys and netrunners.

**NEONDECK** rebuilds the [SRCL](https://github.com/internet-development/www-sacred)
(www-sacred) terminal-monospace primitives with the
[neon-native-real](https://github.com/) cyberpunk palette — **neon glows**,
**semi-transparent glass panels**, and a signature **ticker-board edge readout**.

Every component is copy-pasteable: one `.tsx` + one `.module.css`, themed entirely
through CSS custom properties (`--theme-*`, `--neon-*`, `--cp-*`).

## 📸 Preview

**Kitchen sink** — the ticker-board hero, `Next.js` app router:

![NEONDECK kitchen sink](docs/screenshots/hero.png)

**Component grid** — chamfered glass cards:

![NEONDECK component grid](docs/screenshots/components.png)

**Panel presets** — 45° chamfers + multi-notch sides, neon edge ring following every diagonal:

![NEONDECK panel presets](docs/screenshots/panels.png)

<div align="center">
  <img src="docs/screenshots/mobile.png" width="32%" alt="NEONDECK mobile" />
  <img src="docs/screenshots/ladle.png" width="62%" alt="Ladle playground" />
</div>

## ✦ Features

- ⚡ **Neon glows** — teal / magenta / yellow / green / violet / orange / red / blue accents with `text-shadow` + `box-shadow` halos.
- 🪟 **Semi-transparent surfaces** — `rgba()` panels with `backdrop-filter: blur() + saturate()`, plus scanline overlays.
- 📟 **Ticker-board edges** — the signature. A `Ticker` marquee strip runs along an edge, and a small `message` box floats **right above** the component via `TickerBoard`.
- 🧩 **SRCL-shaped API** — `Card`, `Button`, `Accordion`, `Window`, `Select`, `Dialog`… the same prop shapes you already know.

## // Install

```sh
npm install @javierromario/neondeck
```

React 19 is a peer dependency (install alongside if missing):

```sh
npm install react react-dom
```

### 1. Import the stylesheet

Once, at your app root (`app/layout.tsx`, `main.tsx`, etc.):

```tsx
import '@javierromario/neondeck/global.css';
```

`global-fonts.css` is optional — it loads the bundled faces: **Monaspace Krypton** (variable,
UI text) and **JetBrains Mono** (code blocks, inputs, and Krypton's fallback). Both ship under
the SIL Open Font License 1.1 (`dist/fonts/LICENSE-*.txt`). Skip the import to fall back to
system monospace.

```tsx
import '@javierromario/neondeck/global-fonts.css';
```

### 2. Use the components

```tsx
import { NeoCard, NeoButton, TickerBoard } from '@javierromario/neondeck';

<TickerBoard
  message="SYS.UPLINK // NODE 0x1F"
  messageTone="magenta"
  tickerLabel="NEONDECK"
  tickerItems={['UPLINK 34.2TB/S', 'ICE-BREAKER v2.1']}
>
  <NeoCard title="DECKS" tone="teal">
    <NeoButton tone="yellow">Sync</NeoButton>
  </NeoCard>
</TickerBoard>;
```

### Next.js (App Router)

Several components are client components (`'use client'`). Add the package to
`transpilePackages` so Next honors those boundaries and compiles the CSS modules:

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['@javierromario/neondeck'],
};

export default nextConfig;
```

### 3D / canvas components

`Hologram` needs the R3F peer deps (optional — skip unless you use it):

```sh
npm install three @react-three/fiber @react-three/drei
```

### Theming

All color comes from CSS custom properties. Re-theme by overriding tokens on `body`,
or use the shipped tint classes (`body.tint-magenta`, `body.tint-yellow`, …).

## // The ticker-board treatment

Wrap any component in `TickerBoard`:

```tsx
import TickerBoard from '@components/TickerBoard';
import Card from '@components/Card';

<TickerBoard
  message="SYS.UPLINK // NODE 0x1F"   // ◤ small box above the component
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

## // Theming — glass & neon

All color comes from `global.css`. Every token is `light-dark(light, dark)`, keyed off
`color-scheme`: `html[data-theme="light" | "dark"]` wins, otherwise the OS preference applies.
Any subtree can flip itself with its own `color-scheme` (e.g. `<TickerBoard theme="light">`).
Re-theme the whole deck by overriding tokens:

```css
body {
  --theme-focused-foreground: #ff2d78;   /* accent → magenta */
  --theme-button: #ff2d78;
  --theme-panel: rgba(20, 8, 20, 0.55);  /* semi-transparent surface */
}
```

Tint classes ship ready: `body.tint-magenta`, `body.tint-yellow`, `body.tint-green`,
`body.tint-violet`, `body.tint-orange`, `body.tint-red`, `body.tint-blue`.

## // Chamfered panels

`Panel` draws Wipeout-style HUD silhouettes: no square corners, and any side can carry
several 45° notches. Pick a preset or pass a `Cuts` spec:

```tsx
<Panel shape="wipeout" tone="magenta">…</Panel>

<Panel
  shape={{
    tl: 26, tr: 10, br: 26, bl: 10,
    top: [{ at: 70, width: 24, depth: 6 }, { at: '70%', width: 44, depth: 10 }],
    right: [{ at: '50%', anchor: 'center', width: 36, depth: 9 }],
  }}
>
  …
</Panel>
```

The neon edge and glow are separate clipped layers, so they follow every diagonal —
something a plain `clip-path` + `border` can't do.

Panels can also trail off either edge with a 45° zigzag lead line that ends in a
teardrop ticker cap:

```tsx
<Panel
  shape="wipeout"
  before={{ route: 'h20 u14 h28 d14 h20', anchor: 0.3, items: FEED, label: 'IN' }}
  after={{ route: 'h32 d18 h40', anchor: 0.7, items: FEED, label: 'OUT' }}
>
  …
</Panel>
```

![NEONDECK panel trails](docs/screenshots/trails.png)

Panels can trail off either side into a 45° zigzag lead line that ends in a teardrop
ticker cap:

```tsx
<Panel
  shape="wipeout"
  before={{ route: 'h20 u14 h28 d14 h20', anchor: 0.3, items: feed, label: 'IN' }}
  after={{ anchor: 0.7, items: feed, label: 'OUT', capWidth: 220 }}
>
  …
</Panel>
```

![NEONDECK panel trails](docs/screenshots/trails.png)

## // Component catalog

| Primitive | Purpose |
| --- | --- |
| `Ticker`, `TickerBoard` | 📟 Scrolling marquee + edge message box |
| `Panel` | ◢ Chamfered glass base — 45° corners + multi-notch sides, neon edge ring |
| `Card`, `NeoCard` | 🪟 Titled glass panels on top of `Panel` |
| `Button` | ⚡ PRIMARY / SECONDARY, disabled |
| `Window` | 🖥 Semi-transparent terminal frame with scanlines |
| `Accordion`, `Dialog`, `Drawer`, `Select` | 🗂 Disclosure + overlay + menu |
| `Badge`, `AlertBanner`, `Divider`, `CodeBlock` | 🏷 Status + copy primitives |
| `ActionBar`, `ActionButton`, `ActionListItem`, `ButtonGroup` | ⌨ Command surfaces |
| `Input`, `TextArea`, `Checkbox`, `BarLoader`, `BarProgress`, `BlockLoader` | ⌨ Forms + progress |
| `BrailleLoader` | ⣿ CSS-only braille spinners (`@property` + `@counter-style`), optional glitch |
| `Avatar`, `Breadcrumbs`, `Navigation` | 🪪 Identity + navigation |
| `Grid`, `Row`, `RowSpaceBetween`, `ContentFluid`, `Indent` | 📐 Layout |
| `Table`, `TableRow`, `TableColumn`, `ListItem`, `Text` | 🗃 Data + copy |

See `components/AGENTS.md` for the full per-component catalog.

## // Quick start

```sh
npm install
npm run dev          # Next.js kitchen sink → http://localhost:3000
npm run ladle        # Ladle playground → http://localhost:61000
npm run build-ladle  # static Ladle build → build/
npm run screenshot   # Playwright → docs/screenshots/*.png
```

## // Tests

```bash
npm test          # vitest run
npm run test:watch
```

Vitest + Testing Library. Covers the `Panel` geometry generator (45° invariant, uniform inset,
presets), trail route parsing, render contracts for `Panel` / `Ticker` / `TickerBoard` /
`BrailleLoader`, and CSS invariants (tone tokens, neumorphic tokens, braille frame tables,
bundled font files).

## // Component playground (Ladle)

Ladle's light/dark toggle drives `html[data-theme]`, so stories and the Ladle chrome always agree.

Components are exercised in [Ladle](https://ladle.dev) — a fast Vite-based
Storybook alternative. Stories live in `stories/*.stories.tsx` and use the CSF
format (`args` + `argTypes` with live controls).

- `.ladle/config.mjs` — Ladle config (story glob, vite config pointer).
- `.ladle/components.tsx` — the `Provider` that wraps every story and pulls in `global.css`.
- `vite.config.mjs` — Vite path aliases (`@components`, `@common`, `@root`).

## // Playwright + MCP

Screenshots are captured with [Playwright](https://playwright.dev). Regenerate them:

```sh
npm run screenshot   # needs `npm run dev` and `npm run ladle` running
```

The [Playwright MCP server](https://github.com/microsoft/playwright-mcp) is bundled
as a dev dependency for agent-driven browser control:

```sh
npx @playwright/mcp
```

## // Credits

- **www-sacred / SRCL** — the gold-standard terminal component library this deck is modeled on.
- **neon-native-real** — the cyberpunk palette and glass aesthetic.
- Banner set in the `cyberlarge` font via [`toilet`](http://caca.zoy.org/wiki/toilet).
