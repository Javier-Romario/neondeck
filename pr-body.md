## Summary

Adds a live canvas/3D layer to NEONDECK. Six new components + shared plumbing.

### New components
- **`GridCanvas`** — synthwave perspective grid: scrolling floor, converging lines, horizon glow, optional sun.
- **`MatrixRain`** — katakana/digit rain with ghost trails (translucent-fade technique).
- **`NeuralField`** — drifting node network; links appear within `linkDistance`; pointer repels nodes.
- **`Waveform`** — oscilloscope trace, layered sines + glitch spikes.
- **`Radar`** — sweeping radar with fading blips + trailing sweep ghosts.
- **`Hologram`** — react-three-fiber scene: rotating neon shape (`diamond | sphere | torus | knot | icosahedron`), orbiting halo, stars, OrbitControls.

### Plumbing
- **`common/useCanvas.ts`** — DPR-aware `ResizeObserver` + rAF loop; `draw` stored in a latest-ref so prop changes never restart the loop.
- **`common/color.ts`** — `hexToRgba` (canvas 2D can't resolve `var(--neon-*)`).
- **`CanvasShell`** — glass frame + full-bleed canvas every 2D component builds on.

### Deps
`three`, `@react-three/fiber`, `@react-three/drei` (matches the Astro masterclass versions).

### Docs & demos
- `app/page.tsx` — hologram section + canvas cards.
- `stories/Canvas.stories.tsx` — Ladle stories for all six.
- `components/AGENTS.md` — catalog entries.

## Test plan
- `npx tsc --noEmit` ✓ (0 errors)
- Visual: `npm run dev`, then `npm run ladle` → "Canvas + 3D" story
