import { describe, expect, it } from 'vitest';

import { parseRoute, routeGeometry } from '@components/PanelTrail';

describe('parseRoute', () => {
  it('parses h/u/d tokens with px lengths', () => {
    expect(parseRoute('h20 u14 h28 d14 h20')).toEqual([
      { kind: 'h', len: 20 },
      { kind: 'u', len: 14 },
      { kind: 'h', len: 28 },
      { kind: 'd', len: 14 },
      { kind: 'h', len: 20 },
    ]);
  });

  it('is case-insensitive, accepts decimals and drops junk', () => {
    expect(parseRoute('  H10.5  x9 up3 D2 ')).toEqual([
      { kind: 'h', len: 10.5 },
      { kind: 'd', len: 2 },
    ]);
  });
});

describe('routeGeometry', () => {
  it('walks outward from (0,0) and every u/d step is 45°', () => {
    const g = routeGeometry('h20 u14 h28 d14 h20', 0);
    expect(g.pts).toEqual([
      [0, 0],
      [20, 0],
      [34, -14],
      [62, -14],
      [76, 0],
      [96, 0],
    ]);
    for (let i = 1; i < g.pts.length; i++) {
      const dx = g.pts[i][0] - g.pts[i - 1][0];
      const dy = Math.abs(g.pts[i][1] - g.pts[i - 1][1]);
      expect(dy === 0 || dy === dx).toBe(true);
    }
    expect(g.yEnd).toBe(0);
  });

  it('sizes the svg to fit the line, the cap and the glow pad', () => {
    const g = routeGeometry('h10 d20 h10', 26);
    // yEnd = 20; cap spans 7..33; line spans 0..20 → range 0..33
    expect(g.yEnd).toBe(20);
    expect(g.svgW).toBe(40 + 6);
    expect(g.svgH).toBe(33 + 12);
    expect(g.shift).toBe(6);
    // shifted origin never lands on the svg edge
    expect(g.pts[0][1] + g.shift).toBeGreaterThan(0);
  });

  it('a route that rises shifts everything down so nothing is clipped', () => {
    const g = routeGeometry('u30', 0);
    expect(g.shift).toBe(36);
    expect(g.pts[1][1] + g.shift).toBe(6);
  });
});
