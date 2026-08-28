# AGENTS.md — components

Catalog of every React component under `components/`. One entry per `.tsx` file. The
two signatures of this deck are `Ticker` and `TickerBoard` — everything else is an
SRCL-shaped primitive retuned for cyberpunk glass.

## How to read each entry

- **Path** — where the source lives.
- **Purpose** — one sentence.
- **Props** — the source interface/type.
- **Theming** — `--theme-*` / `--neon-*` / `--cp-*` tokens the module reads.

---

## Ticker

- **Path:** `components/Ticker.tsx`
- **Purpose:** Seamless scrolling ticker-tape marquee (duplicated track, CSS `translateX` loop). Lives on any edge.
- **Props:**
  ```ts
  interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: string[];
    label?: string;
    tone?: NeonTone;            // 'teal' | 'magenta' | 'yellow' | 'green' | 'violet' | 'orange' | 'red' | 'blue'
    direction?: 'left' | 'right';
    speed?: number;             // seconds per loop
  }
  ```
- **Theming:** `--theme-text`, `--theme-border`, `--theme-focused-foreground`, `--neon-*`

## TickerBoard

- **Path:** `components/TickerBoard.tsx`
- **Purpose:** Wraps any component; renders a small message box **right above** the component plus ticker strips on the top/bottom edges.
- **Props:**
  ```ts
  interface TickerBoardProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    messageTone?: NeonTone;
    tickerItems?: string[];
    tickerLabel?: string;
    tickerTone?: NeonTone;
    tickerDirection?: 'left' | 'right';
    tickerSpeed?: number;
    showTopTicker?: boolean;
    showBottomTicker?: boolean;
    children?: React.ReactNode;
  }
  ```
- **Theming:** `--theme-background-modal`, `--theme-focused-foreground`, `--neon-*`

## Card

- **Path:** `components/Card.tsx`
- **Purpose:** Glass panel with neon corner brackets, a title bar, and three title modes (`default`, `'left'`, `'right'`).
- **Props:**
  ```ts
  interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    title?: string | any;
    mode?: string | any;
  }
  ```
- **Theming:** `--theme-panel`, `--theme-border`, `--theme-text`, `--theme-focused-foreground`

## CardDouble

- **Path:** `components/CardDouble.tsx`
- **Purpose:** Double-stroked variant of `Card` for nested/emphasis groupings.
- **Props:** same as `Card` plus `style`.
- **Theming:** same as `Card` + `--theme-border-subdued`

## Button

- **Path:** `components/Button.tsx`
- **Purpose:** Two-theme button (`PRIMARY` neon / `SECONDARY` glass) with disabled state.
- **Props:**
  ```ts
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'PRIMARY' | 'SECONDARY';
    isDisabled?: boolean;
    children?: React.ReactNode;
  }
  ```
- **Theming:** `--theme-button`, `--theme-button-text`, `--theme-panel`, `--theme-border-bright`, `--theme-focused-foreground`

## Badge

- **Path:** `components/Badge.tsx`
- **Purpose:** Inline neon chip for status/version markers.
- **Props:** `interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> { children?: React.ReactNode }`
- **Theming:** `--theme-focused-foreground`

## Accordion

- **Path:** `components/Accordion.tsx`
- **Purpose:** Click-to-toggle collapsible section with an OPEN/CLOSED state readout.
- **Props:** `interface AccordionProps { defaultValue?: boolean; title: string; children?: React.ReactNode }`
- **Theming:** `--theme-panel`, `--theme-border`, `--theme-focused-foreground`, `--theme-muted`

## AlertBanner

- **Path:** `components/AlertBanner.tsx`
- **Purpose:** Full-width notification with a magenta left accent.
- **Props:** `interface AlertBannerProps { style?: any; children?: any }`
- **Theming:** `--theme-border`, `--neon-magenta`, `--theme-text`

## Divider

- **Path:** `components/Divider.tsx`
- **Purpose:** Horizontal rule in `single`, `double`, or `gradient` style.
- **Props:** `interface DividerProps extends React.HTMLAttributes<HTMLSpanElement> { children?: React.ReactNode; type?: string | any; style?: any }`
- **Theming:** `--theme-border-bright`, `--theme-focused-foreground`, `--theme-accent`

## Window

- **Path:** `components/Window.tsx`
- **Purpose:** Semi-transparent terminal frame with a scanline overlay.
- **Props:** `type WindowProps = React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }`
- **Theming:** `--theme-window-background`, `--theme-window-shadow`, `--theme-border-bright`

## Navigation

- **Path:** `components/Navigation.tsx`
- **Purpose:** Top bar with logo, left/right rails, and a center slot.
- **Props:**
  ```ts
  interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode; logoHref?: string; logoTarget?: React.HTMLAttributeAnchorTarget;
    onClickLogo?: React.MouseEventHandler<HTMLButtonElement>; logo?: React.ReactNode;
    left?: React.ReactNode; right?: React.ReactNode;
  }
  ```
- **Theming:** `--theme-border`, `--theme-focused-foreground`

## ActionButton

- **Path:** `components/ActionButton.tsx`
- **Purpose:** Hotkey + label button pair.
- **Props:** `interface ActionButtonProps { onClick?: () => void; hotkey?: any; children?: React.ReactNode; style?: any; rootStyle?: any; isSelected?: boolean }`
- **Theming:** `--theme-panel`, `--theme-border`, `--theme-focused-foreground`

## ActionBar

- **Path:** `components/ActionBar.tsx`
- **Purpose:** Horizontal toolbar of `ActionButton`s.
- **Props:** `interface ActionBarProps { items: { hotkey?: any; body: React.ReactNode; onClick?: () => void; selected?: boolean }[] }`
- **Theming:** `--theme-border`

## ActionListItem

- **Path:** `components/ActionListItem.tsx`
- **Purpose:** Menu row as anchor or button with a leading icon.
- **Props:** `interface ActionListItemProps { style?; icon?; children?; href?; target?; onClick?; role? }`
- **Theming:** `--theme-text`, `--theme-focused-foreground`

## Avatar

- **Path:** `components/Avatar.tsx`
- **Purpose:** Square portrait (or placeholder) with optional label + link.
- **Props:** `interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> { src?; href?; target?; style?; children? }`
- **Theming:** `--theme-focused-foreground`

## BarLoader

- **Path:** `components/BarLoader.tsx`
- **Purpose:** Fill progress bar with optional auto-advance interval mode.
- **Props:** `interface BarLoaderProps { intervalRate?: number; progress?: number }`
- **Theming:** `--theme-panel-2`, `--theme-border-bright`, `--neon-teal`

## BarProgress

- **Path:** `components/BarProgress.tsx`
- **Purpose:** Character-fill progress bar (default `█`).
- **Props:** `interface BarProgressProps { intervalRate?: number; progress?: number; fillChar?: string }`
- **Theming:** `--theme-focused-foreground`, `--theme-border`, `--theme-muted`

## BlockLoader

- **Path:** `components/BlockLoader.tsx`
- **Purpose:** Single-glyph spinner cycling a Unicode sequence (12 modes).
- **Props:** `interface BlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> { mode?: number }`
- **Theming:** `--theme-focused-foreground`

## Breadcrumbs

- **Path:** `components/Breadcrumbs.tsx`
- **Purpose:** Linked breadcrumb trail.
- **Props:** `interface BreadcrumbsProps { items: { name: string; url?: string }[] }`
- **Theming:** `--theme-focused-foreground`, `--theme-text`, `--theme-muted`

## ButtonGroup

- **Path:** `components/ButtonGroup.tsx`
- **Purpose:** Cluster of buttons with a selected state.
- **Props:** `interface ButtonGroupProps { items: { body: string; hotkey?: string; selected?: boolean; onClick?: () => void }[]; isFull?: boolean }`
- **Theming:** `--theme-panel`, `--theme-border`, `--theme-button`

## Checkbox

- **Path:** `components/Checkbox.tsx`
- **Purpose:** Custom checkbox with a neon glyph state.
- **Props:** `interface CheckboxProps { style?; checkboxStyle?; name: string; defaultChecked?; onChange?; tabIndex?; children? }`
- **Theming:** `--theme-border-bright`, `--theme-background-input`, `--theme-focused-foreground`

## CodeBlock

- **Path:** `components/CodeBlock.tsx`
- **Purpose:** Preformatted code with line numbers.
- **Props:** `interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> { children?: React.ReactNode }`
- **Theming:** `--theme-border`, `--theme-focused-foreground`, `--theme-muted`

## ContentFluid

- **Path:** `components/ContentFluid.tsx`
- **Purpose:** Full-width block shell (flex-grow).
- **Props:** `interface ContentFluidProps extends React.HTMLAttributes<HTMLSpanElement> { children?: React.ReactNode }`

## Dialog

- **Path:** `components/Dialog.tsx`
- **Purpose:** Modal dialog with title, body, OK/Cancel.
- **Props:** `interface DialogProps { title?; children?; style?; onConfirm?; onCancel? }`
- **Theming:** `--theme-background-modal`, `--theme-border-bright`, `--theme-window-shadow`

## Drawer

- **Path:** `components/Drawer.tsx`
- **Purpose:** Collapsible sidebar with a toggle.
- **Props:** `interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> { children?; defaultValue? }`
- **Theming:** `--theme-panel`, `--theme-border-bright`, `--theme-focused-foreground`

## Grid

- **Path:** `components/Grid.tsx`
- **Purpose:** Responsive auto-fill grid.
- **Props:** `interface GridProps extends React.HTMLAttributes<HTMLDivElement> { children? }`

## Indent

- **Path:** `components/Indent.tsx`
- **Purpose:** Left-padding wrapper.
- **Props:** `interface IndentProps extends React.HTMLAttributes<HTMLDivElement> { children? }`

## Input

- **Path:** `components/Input.tsx`
- **Purpose:** Single-line input with a blinking caret + label.
- **Props:** `type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { caretChars?: string | any; label?: string | any; isBlink?: boolean }`
- **Theming:** `--theme-background-input`, `--theme-border-bright`, `--theme-focused-foreground`

## ListItem

- **Path:** `components/ListItem.tsx`
- **Purpose:** List row with hover highlight.
- **Props:** standard `<li>` attributes.

## Row

- **Path:** `components/Row.tsx`
- **Purpose:** Block-level row.
- **Props:** `type RowProps = React.HTMLAttributes<HTMLElement> & { children? }`

## RowSpaceBetween

- **Path:** `components/RowSpaceBetween.tsx`
- **Purpose:** Flex row pushing first/last children to opposite ends.
- **Props:** `type RowSpaceBetweenProps = React.HTMLAttributes<HTMLElement> & { children? }`

## Select

- **Path:** `components/Select.tsx`
- **Purpose:** Custom dropdown with a hidden input.
- **Props:** `interface SelectProps { name: string; options: string[]; placeholder?: string; defaultValue?: string; onChange?: (v: string) => void }`
- **Theming:** `--theme-background-input`, `--theme-background-modal`, `--z-index-page-select`

## Text

- **Path:** `components/Text.tsx`
- **Purpose:** Paragraph wrapper.
- **Props:** `interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> { children? }`

## TextArea

- **Path:** `components/TextArea.tsx`
- **Purpose:** Multi-line input with caret + optional typewriter autoplay.
- **Props:** `type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { autoPlay?: string; autoPlaySpeedMS?: number; isBlink?: boolean }`

## Table / TableRow / TableColumn

- **Path:** `components/Table.tsx`, `TableRow.tsx`, `TableColumn.tsx`
- **Purpose:** Semantic table shell, row, and cell.
- **Theming:** `--theme-border`, `--theme-text`

## Canvas + 3D (the neon deck's live layer)

Shared plumbing first:

- **`common/useCanvas.ts`** — `useCanvas(draw, fps)` hook. Owns a `<canvas>`'s DPR-aware
  sizing (`ResizeObserver`) + `requestAnimationFrame` loop. `draw` is stored in a ref so prop
  changes never restart the loop; only `fps` does. Signature:
  `(ctx, width, height, time, frame) => void`.
- **`common/color.ts`** — `hexToRgba(hex, alpha)` for neon glows (canvas 2D can't resolve
  `var(--neon-*)` strings).
- **`CanvasShell.tsx`** — glass frame + full-bleed `<canvas>` that runs a `draw` fn. Every 2D
  canvas component is `CanvasShell` + a `draw` closure.

## GridCanvas

- **Path:** `components/GridCanvas.tsx`
- **Purpose:** Synthwave perspective grid — scrolling floor, converging lines, horizon glow, optional sun.
- **Props:**
  ```ts
  interface GridCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    height?: number | string; speed?: number;   // rows per second
    color?: string;          horizon?: number;  // 0..1 vertical horizon position
    sunColor?: string;       // 'transparent' hides the sun
  }
  ```
- **Theming:** `--theme-border` (via CanvasShell)

## MatrixRain

- **Path:** `components/MatrixRain.tsx`
- **Purpose:** Falling katakana/digit rain with ghost trails (translucent-fade technique).
- **Props:** `height?, color?, fontSize?, speed?, density?` (density = 0..1 active-column fraction).

## NeuralField

- **Path:** `components/NeuralField.tsx`
- **Purpose:** Drifting node network; links appear within `linkDistance`. Pointer repels nodes (poke it).
- **Props:** `height?, color?, nodeCount?, linkDistance?, nodeRadius?, speed?, interactive?`.

## Waveform

- **Path:** `components/Waveform.tsx`
- **Purpose:** Oscilloscope trace — layered sines + occasional glitch spikes.
- **Props:** `height?, color?, speed?, amplitude?, layers?, glitch?` (glitch = 0..1 chance/frame).

## Radar

- **Path:** `components/Radar.tsx`
- **Purpose:** Sweeping radar with fading blips and trailing sweep ghosts.
- **Props:** `height?, color?, sweepSpeed?, blipRate?, maxBlips?`.

## Hologram

- **Path:** `components/Hologram.tsx`
- **Purpose:** react-three-fiber scene — rotating neon shape + orbiting halo + stars. The 3D signature.
- **Props:**
  ```ts
  interface HologramProps extends React.HTMLAttributes<HTMLDivElement> {
    shape?: 'diamond' | 'sphere' | 'torus' | 'knot' | 'icosahedron';
    color?: string; accent?: string; height?: number | string;
    interactive?: boolean;  // OrbitControls
    autoRotate?: boolean;
  }
  ```
- **Deps:** `three`, `@react-three/fiber`, `@react-three/drei`. Client-only (`'use client'`).
- **Theming:** `--theme-border`, `--theme-focused-foreground` (readout).

## GlitchText

- **Path:** `components/GlitchText.tsx`
- **Purpose:** Canvas text with RGB channel split, micro-jitter, and periodic horizontal slice glitch.
- **Props:**
  ```ts
  interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string; color?: string; accentA?: string; accentB?: string;
    fontSize?: number; height?: number | string;
    glitchRate?: number; // chance per frame of a slice glitch
    intensity?: number;  // max offset, px
  }
  ```
- **Theming:** `--theme-border` (via CanvasShell)

---

## Neomorphic layer (mixed cyberpunk)

Every `Neo*` component mixes soft neumorphic extrusion (`--neo-surface` / `--neo-raised` /
`--neo-pressed` / `--neo-well` / `--neo-drop`) with a cyberpunk neon accent. All accept a
`tone?: NeonTone` prop (`'teal' | 'magenta' | 'yellow' | 'green' | 'violet' | 'orange' |
'red' | 'blue'`) that drives `--tone` via `data-tone`. Light/dark is free: the `--neo-*`
tokens and `--theme-*` text re-key in `global.css` under `html[data-theme='light']` and
`prefers-color-scheme: light`.

Surfaces: `NeoButton`, `NeoCard`, `NeoToggle`, `NeoTicker` (see `stories/Neomorphic.stories.tsx`).

### Forms

- **NeoInput** — `components/NeoInput.tsx`. Labeled single-line input in a neumorphic well + neon caret. Props: `caretChars?, label?, isBlink?, tone?` + input attrs.
- **NeoTextArea** — `components/NeoTextArea.tsx`. Multi-line input, neumorphic well, optional `autoPlay` typewriter. Props: `autoPlay?, autoPlaySpeedMS?, isBlink?, tone?` + textarea attrs.
- **NeoSelect** — `components/NeoSelect.tsx`. Raised trigger + inset glass menu. Props: `name, options, placeholder?, defaultValue?, onChange?, tone?`.
- **NeoCheckbox** — `components/NeoCheckbox.tsx`. Inset neumorphic box + neon `◈` glyph. Props: `style?, checkboxStyle?, name, defaultChecked?, onChange?, tabIndex?, children?, tone?`.
- **NeoBarLoader** — `components/NeoBarLoader.tsx`. Pill well + neon fill bar. Props: `intervalRate?, progress?, tone?`.
- **NeoBarProgress** — `components/NeoBarProgress.tsx`. Character-fill meter in a pill well. Props: `intervalRate?, progress?, fillChar?, tone?`.
- **NeoBlockLoader** — `components/NeoBlockLoader.tsx`. Spinner glyph in a circular raised orb. Props: `mode?, tone?`.

### Data & Structure

- **NeoAccordion** — `components/NeoAccordion.tsx`. Raised header (pressed when open) + inset body. Props: `defaultValue?, title, children?, tone?`.
- **NeoTable / NeoTableRow / NeoTableColumn** — `components/NeoTable*.tsx`. Raised table frame, pressed row hover. Props: `tone?` (table only).
- **NeoDialog** — `components/NeoDialog.tsx`. Backdrop + chamfered neumorphic panel, `NeoButton` footer. Props: `title?, children?, style?, onConfirm?, onCancel?, tone?`.
- **NeoDrawer** — `components/NeoDrawer.tsx`. Raised toggle + inset body. Props: `children?, defaultValue?, tone?`.
- **NeoNavigation** — `components/NeoNavigation.tsx`. Raised top bar + neon logo. Props: `logoHref?, logoTarget?, onClickLogo?, logo?, left?, right?, children?, tone?`.
- **NeoBreadcrumbs** — `components/NeoBreadcrumbs.tsx`. Neon trail in a soft pill well. Props: `items: { name, url? }[], tone?`.
- **NeoAvatar** — `components/NeoAvatar.tsx`. Raised portrait frame + neon ring. Props: `src?, href?, target?, style?, children?, tone?`.
- **NeoAlertBanner** — `components/NeoAlertBanner.tsx`. Raised banner + neon alert accent (default `magenta`). Props: `style?, children?, tone?`.
- **NeoCodeBlock** — `components/NeoCodeBlock.tsx`. Inset well + neon left accent. Props: `children?, tone?` + pre attrs.
- **NeoActionListItem** — `components/NeoActionListItem.tsx`. Raised row, pressed on hover. Props: `style?, icon?, children?, href?, target?, onClick?, role?, tone?`.
