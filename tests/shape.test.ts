import { describe, expect, it } from 'vitest';

import { PANEL_SHAPES, shapePaths } from '@common/shape';
import type { Cuts } from '@common/shape';

/** Pull `x y` point strings out of a `polygon(...)` string. */
function points(polygon: string): string[] {
  const inner = polygon.replace(/^polygon\((evenodd,\s*)?/, '').replace(/\)$/, '');
  return inner.split(',').map((s) => s.trim());
}

/** Evaluate a `calc(P% ± Npx)` / `Npx` / `P%` coordinate on a W×H box. */
function evalLen(v: string, size: number): number {
  const m = /^calc\((-?[\d.]+)% ([+-]) ([\d.]+)px\)$/.exec(v);
  if (m) return (parseFloat(m[1]) / 100) * size + (m[2] === '-' ? -1 : 1) * parseFloat(m[3]);
  if (v.endsWith('%')) return (parseFloat(v) / 100) * size;
  return parseFloat(v);
}

const COORD = /^(calc\([^)]*\)|\S+) (calc\([^)]*\)|\S+)$/;

function evalPoly(polygon: string, W: number, H: number): [number, number][] {
  return points(polygon).map((p) => {
    const m = COORD.exec(p);
    if (!m) throw new Error(`bad point: ${p}`);
    return [evalLen(m[1], W), evalLen(m[2], H)];
  });
}

/** Every edge must be horizontal, vertical, or exactly 45°. */
function assertOnlyAxisOr45(pts: [number, number][]) {
  for (let i = 0; i < pts.length; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[(i + 1) % pts.length];
    const dx = Math.abs(bx - ax);
    const dy = Math.abs(by - ay);
    const ok = dx < 1e-6 || dy < 1e-6 || Math.abs(dx - dy) < 1e-6;
    expect(ok, `edge ${i}: (${ax},${ay}) → (${bx},${by})`).toBe(true);
  }
}

describe('shapePaths', () => {
  it('a panel with no cuts is a plain rectangle', () => {
    const { outer } = shapePaths({}, 0);
    expect(points(outer)).toEqual(['0px 0px', '100% 0px', '100% 100%', '0px 100%']);
  });

  it('corner chamfers emit two points per cut corner', () => {
    const { outer } = shapePaths({ tl: 18, br: 18 }, 0);
    expect(points(outer)).toEqual([
      '18px 0px',
      '100% 0px',
      '100% calc(100% - 18px)',
      'calc(100% - 18px) 100%',
      '0px 100%',
      '0px 18px',
    ]);
  });

  it('a notch adds four points and cuts at 45°', () => {
    const { outer } = shapePaths({ top: [{ at: 40, width: 30, depth: 10 }] }, 0);
    const pts = evalPoly(outer, 400, 200);
    expect(pts).toHaveLength(8);
    // notch: down 10 over 10, flat for 10, up 10 over 10
    expect(pts.slice(1, 5)).toEqual([
      [40, 0],
      [50, 10],
      [60, 10],
      [70, 0],
    ]);
    assertOnlyAxisOr45(pts);
  });

  it('notch depth is clamped to width / 2 so sides stay 45°', () => {
    const { outer } = shapePaths({ top: [{ at: 40, width: 20, depth: 50 }] }, 0);
    const pts = evalPoly(outer, 400, 200);
    // flat run collapses to a single point, which dedupe removes → 7 points, V-shaped notch
    expect(pts).toHaveLength(7);
    expect(pts.slice(1, 4)).toEqual([
      [40, 0],
      [50, 10],
      [60, 0],
    ]);
    assertOnlyAxisOr45(pts);
  });

  it('percent `at` and anchors place the notch relative to the side', () => {
    const W = 400;
    const start = evalPoly(shapePaths({ top: [{ at: '50%', width: 40 }] }, 0).outer, W, 200)[1][0];
    const center = evalPoly(shapePaths({ top: [{ at: '50%', width: 40, anchor: 'center' }] }, 0).outer, W, 200)[1][0];
    const end = evalPoly(shapePaths({ top: [{ at: '50%', width: 40, anchor: 'end' }] }, 0).outer, W, 200)[1][0];
    expect(start).toBe(200);
    expect(center).toBe(180);
    expect(end).toBe(160);
  });

  it('inner path keeps every edge parallel to the outer (uniform inset)', () => {
    const cuts: Cuts = PANEL_SHAPES.wipeout;
    const { outer, inner } = shapePaths(cuts, 2);
    const o = evalPoly(outer, 600, 300);
    const i = evalPoly(inner, 600, 300);
    expect(i).toHaveLength(o.length);
    for (let k = 0; k < o.length; k++) {
      const [ax, ay] = o[k];
      const [bx, by] = o[(k + 1) % o.length];
      const [cx, cy] = i[k];
      const [dx, dy] = i[(k + 1) % i.length];
      // cross product of edge directions ≈ 0 → parallel
      const cross = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
      expect(Math.abs(cross)).toBeLessThan(1e-6);
    }
    assertOnlyAxisOr45(i);
  });

  it('axis-aligned edges move inward by exactly the border width', () => {
    const { inner } = shapePaths({}, 1.5);
    expect(evalPoly(inner, 100, 50)).toEqual([
      [1.5, 1.5],
      [98.5, 1.5],
      [98.5, 48.5],
      [1.5, 48.5],
    ]);
  });

  it('ring and halo are evenodd compound polygons', () => {
    const { ring, halo, outer } = shapePaths({ tl: 10 }, 1);
    expect(ring.startsWith('polygon(evenodd, ')).toBe(true);
    expect(halo.startsWith('polygon(evenodd, ')).toBe(true);
    // halo starts outside the box and includes the whole outer loop
    expect(points(halo)[0]).toBe('-120px -120px');
    for (const p of points(outer)) expect(points(halo)).toContain(p);
  });

  it('every preset obeys the 45° rule', () => {
    for (const [name, cuts] of Object.entries(PANEL_SHAPES)) {
      const pts = evalPoly(shapePaths(cuts, 0).outer, 640, 320);
      try {
        assertOnlyAxisOr45(pts);
      } catch (e) {
        throw new Error(`preset ${name}: ${(e as Error).message}`);
      }
    }
  });
});
