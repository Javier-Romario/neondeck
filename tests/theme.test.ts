import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { CANVAS_THEME, withAlpha } from '@common/theme';

const root = join(__dirname, '..');

describe('withAlpha', () => {
  it('handles the colour serialisations getComputedStyle hands back', () => {
    expect(withAlpha('rgb(0, 255, 209)', 0.4)).toBe('rgba(0, 255, 209, 0.4)');
    expect(withAlpha('rgba(4, 7, 11, 0.5)', 0.1)).toBe('rgba(4, 7, 11, 0.1)');
    expect(withAlpha('rgb(0 255 209 / 0.5)', 1)).toBe('rgba(0, 255, 209, 1)');
  });

  it('handles hex in 3/4/6/8 digit forms', () => {
    expect(withAlpha('#0f0', 0.5)).toBe('rgba(0, 255, 0, 0.5)');
    expect(withAlpha('#00ffd1', 0)).toBe('rgba(0, 255, 209, 0)');
    expect(withAlpha('#00ffd180', 0.2)).toBe('rgba(0, 255, 209, 0.2)');
  });

  it('passes unknown formats through untouched', () => {
    expect(withAlpha('transparent', 0.5)).toBe('transparent');
    expect(withAlpha('oklch(70% 0.1 200)', 0.5)).toBe('oklch(70% 0.1 200)');
  });
});

describe('canvas theme palette', () => {
  it('every entry is a CSS colour expression that can flip with the theme', () => {
    for (const [k, v] of Object.entries(CANVAS_THEME)) {
      expect(v, k).toMatch(/^(var\(--|light-dark\()/);
    }
  });

  it('no canvas / 3D component hardcodes a neon hex default or a dark backdrop', () => {
    const files = readdirSync(join(root, 'components')).filter((f) => f.endsWith('.tsx') && f !== 'AsciiScene.tsx');
    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(join(root, 'components', f), 'utf8');
      if (/=\s*'#[0-9a-fA-F]{6}'/.test(src) || /rgba\(4,\s*7,\s*11/.test(src) || /'#04070b'/.test(src)) offenders.push(f);
    }
    expect(offenders).toEqual([]);
  });

  it('canvas draw callbacks receive the theme as the sixth argument', () => {
    const src = readFileSync(join(root, 'common/useCanvas.ts'), 'utf8');
    expect(src).toMatch(/drawRef\.current\(ctx, rect\.width, rect\.height, \(now - start\) \/ 1000, frame, theme\)/);
  });
});
