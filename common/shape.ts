/**
 * Chamfered-panel geometry. Builds CSS `polygon()` strings made only of
 * horizontal, vertical and 45° edges — corner chamfers plus any number of
 * trapezoid notches along each side (Wipeout-style HUD panels).
 *
 * Every coordinate is a linear `pct% + px` pair, so the polygon stays
 * responsive (`calc()`), and an exact inward offset can be derived for
 * the border ring without measuring the DOM.
 */

export interface Notch {
  /** Position along the edge: px from the edge start, or a `'NN%'` string. */
  at: number | string;
  /** Opening width of the notch at the edge, in px. */
  width: number;
  /** How far the notch cuts in, in px. Clamped to `width / 2` (45° sides). Default 8. */
  depth?: number;
  /** What `at` refers to on the notch. Default `'start'`. */
  anchor?: 'start' | 'center' | 'end';
}

export interface Cuts {
  /** Corner chamfers, px. A corner left at 0 stays square. */
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
  /** Notches per side; `at` counts along the clockwise walk (see note below). */
  top?: Notch[];
  right?: Notch[];
  bottom?: Notch[];
  left?: Notch[];
}

/**
 * Notch order per side follows the clockwise walk: top left→right,
 * right top→bottom, bottom right→left, left bottom→top. `at` measures from
 * the start of that walk. Use `anchor` + `'NN%'` to place notches relative to
 * the side regardless of direction.
 */

type Lin = { p: number; px: number };
type Pt = { x: Lin; y: Lin };

const EDGES = [
  { side: 'top', start: [0, 0], dir: [1, 0], n: [0, 1], c0: 'tl', c1: 'tr' },
  { side: 'right', start: [1, 0], dir: [0, 1], n: [-1, 0], c0: 'tr', c1: 'br' },
  { side: 'bottom', start: [1, 1], dir: [-1, 0], n: [0, -1], c0: 'br', c1: 'bl' },
  { side: 'left', start: [0, 1], dir: [0, -1], n: [1, 0], c0: 'bl', c1: 'tl' },
] as const;

function parseAt(at: number | string): Lin {
  if (typeof at === 'number') return { p: 0, px: at };
  const m = /^(-?\d+(?:\.\d+)?)%$/.exec(at.trim());
  return { p: m ? parseFloat(m[1]) : 0, px: 0 };
}

const add = (a: Lin, b: Lin): Lin => ({ p: a.p + b.p, px: a.px + b.px });
const sub = (a: Lin, b: Lin): Lin => ({ p: a.p - b.p, px: a.px - b.px });

function buildPoints(cuts: Cuts): Pt[] {
  const pts: Pt[] = [];

  for (const e of EDGES) {
    const [sx, sy] = e.start;
    const [dx, dy] = e.dir;
    const [nx, ny] = e.n;

    // point at distance `t` along the edge, `k` px inward
    const at = (t: Lin, k = 0): Pt => ({
      x: { p: sx * 100 + dx * t.p, px: dx * t.px + nx * k },
      y: { p: sy * 100 + dy * t.p, px: dy * t.px + ny * k },
    });

    const cStart = cuts[e.c0] ?? 0;
    const cEnd = cuts[e.c1] ?? 0;

    pts.push(at({ p: 0, px: cStart }));

    for (const notch of cuts[e.side] ?? []) {
      const w = Math.max(0, notch.width);
      const d = Math.min(notch.depth ?? 8, w / 2);
      let t0 = parseAt(notch.at);
      if (notch.anchor === 'center') t0 = sub(t0, { p: 0, px: w / 2 });
      if (notch.anchor === 'end') t0 = sub(t0, { p: 0, px: w });

      pts.push(at(t0));
      pts.push(at(add(t0, { p: 0, px: d }), d));
      pts.push(at(add(t0, { p: 0, px: w - d }), d));
      pts.push(at(add(t0, { p: 0, px: w })));
    }

    pts.push(at({ p: 100, px: -cEnd }));
  }

  // drop consecutive duplicates (square corners emit the same point twice)
  const same = (a: Pt, b: Pt) =>
    a.x.p === b.x.p && a.x.px === b.x.px && a.y.p === b.y.p && a.y.px === b.y.px;
  // keep the first point; drop any point equal to its predecessor, and a
  // trailing point equal to the first (closing duplicate)
  const out = pts.filter((p, i) => i === 0 || !same(p, pts[i - 1]));
  if (out.length > 1 && same(out[out.length - 1], out[0])) out.pop();
  return out;
}

/** Move every vertex inward by `d` px, keeping the 45° / axis-aligned edges parallel. */
function inset(pts: Pt[], d: number): Pt[] {
  if (d === 0) return pts;
  // evaluate on a nominal box just to read edge directions
  const W = 1000;
  const H = 1000;
  const ev = (p: Pt) => [(p.x.p / 100) * W + p.x.px, (p.y.p / 100) * H + p.y.px];
  const P = pts.map(ev);
  const n = pts.length;

  const normal = (i: number) => {
    const [ax, ay] = P[i];
    const [bx, by] = P[(i + 1) % n];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len]; // inward for a clockwise walk in screen space
  };

  return pts.map((pt, i) => {
    const [n1x, n1y] = normal((i + n - 1) % n);
    const [n2x, n2y] = normal(i);
    const k = 1 + n1x * n2x + n1y * n2y;
    const s = d / (k < 1e-6 ? 1 : k);
    return {
      x: { p: pt.x.p, px: pt.x.px + (n1x + n2x) * s },
      y: { p: pt.y.p, px: pt.y.px + (n1y + n2y) * s },
    };
  });
}

const r = (v: number) => Math.round(v * 1000) / 1000;

function fmt({ p, px }: Lin): string {
  if (p === 0) return `${r(px)}px`;
  if (px === 0) return `${r(p)}%`;
  return `calc(${r(p)}% ${px < 0 ? '-' : '+'} ${r(Math.abs(px))}px)`;
}

const fmtPt = (p: Pt) => `${fmt(p.x)} ${fmt(p.y)}`;

function loop(pts: Pt[]): string[] {
  return pts.map(fmtPt);
}

export interface ShapePaths {
  /** Full silhouette. */
  outer: string;
  /** Silhouette inset by the border width — the glass fill. */
  inner: string;
  /** Outer minus inner (evenodd) — the neon edge. */
  ring: string;
  /** Everything *outside* the silhouette — clips the shadow/glow layer so it never tints the glass. */
  halo: string;
}

/**
 * @param cuts   corner chamfers + edge notches
 * @param border border ring width in px
 * @param bleed  how far past the box the halo may extend, px
 */
export function shapePaths(cuts: Cuts, border = 1.5, bleed = 120): ShapePaths {
  const outerPts = buildPoints(cuts);
  const innerPts = inset(outerPts, border);
  const o = loop(outerPts);
  const i = loop(innerPts);

  const huge = [
    `${-bleed}px ${-bleed}px`,
    `calc(100% + ${bleed}px) ${-bleed}px`,
    `calc(100% + ${bleed}px) calc(100% + ${bleed}px)`,
    `${-bleed}px calc(100% + ${bleed}px)`,
  ];

  return {
    outer: `polygon(${o.join(', ')})`,
    inner: `polygon(${i.join(', ')})`,
    // bridge segments are traversed twice in opposite directions → zero area under evenodd
    ring: `polygon(evenodd, ${[...o, o[0], ...i, i[0], o[0]].join(', ')})`,
    halo: `polygon(evenodd, ${[...huge, huge[0], ...o, o[0], huge[0]].join(', ')})`,
  };
}

/** Ready-made shapes. `sm` ≈ the old single-chamfer card; the rest are notched. */
export const PANEL_SHAPES = {
  /** two opposite chamfers — matches the legacy Card */
  slab: { tl: 18, br: 18 },
  /** all four corners chamfered, no square corner */
  chamfer: { tl: 16, tr: 16, br: 16, bl: 16 },
  /** chamfers + stepped notches on every side */
  wipeout: {
    tl: 22,
    tr: 12,
    br: 22,
    bl: 12,
    top: [
      { at: 64, width: 28, depth: 6 },
      { at: '70%', width: 44, depth: 10 },
    ],
    right: [{ at: '38%', width: 30, depth: 8 }],
    bottom: [
      { at: 64, width: 44, depth: 10 },
      { at: '38%', width: 24, depth: 6 },
    ],
    left: [{ at: '30%', width: 30, depth: 8 }],
  },
  /** tab-like: big lead-in chamfer + one notch either end */
  terminal: {
    tl: 28,
    tr: 10,
    br: 28,
    bl: 10,
    top: [{ at: '60%', width: 36, depth: 9 }],
    bottom: [{ at: '40%', width: 36, depth: 9 }],
  },
} satisfies Record<string, Cuts>;

export type PanelShape = keyof typeof PANEL_SHAPES;
