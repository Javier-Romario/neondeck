import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const root = join(__dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'];

describe('global.css tone + neumorphic tokens', () => {
  const css = read('global.css');

  it('defines --tone / --tone-soft / --tone-faint for every tone via [data-tone]', () => {
    for (const t of TONES) {
      const rule = new RegExp(`\\[data-tone='${t}'\\]\\s*\\{([^}]*)\\}`).exec(css);
      expect(rule, t).not.toBeNull();
      expect(rule![1]).toContain('--tone:');
      expect(rule![1]).toContain('--tone-soft:');
      expect(rule![1]).toContain('--tone-faint:');
    }
  });

  it('declares every colour token exactly once, as light-dark(), with no per-theme override blocks', () => {
    const tokens = ['--neo-bg', '--neo-surface', '--neo-dark', '--neo-rim', '--neo-pressed', '--neo-well', '--neo-drop',
      '--cp-bg', '--cp-panel', '--cp-text', '--theme-background', '--theme-glass'];
    for (const tok of tokens) {
      const decls = [...css.matchAll(new RegExp(`${tok}:\\s*([^;]*);`, 'g'))].map((m) => m[1]);
      expect(decls, tok).toHaveLength(1);
      expect(decls[0], tok).toContain('light-dark(');
    }
    // the only theme-specific rules left are the color-scheme switches
    expect(css.match(/html\[data-theme='light'\]/g)).toHaveLength(1);
    expect(css.match(/html\[data-theme='dark'\]/g)).toHaveLength(1);
    expect(css.match(/@media \(prefers-color-scheme/g)).toHaveLength(1);
  });

  it('the neumorphic light shadow is tone-tinted on dark, plain white on light', () => {
    expect(css).toMatch(/\[data-tone\] \{\s*--neo-light: light-dark\(rgba\(255, 255, 255, 0\.95\), var\(--tone-faint\)\);/);
  });

  it('UI stack leads with Krypton and falls back to JetBrains Mono; code stack is JetBrains Mono', () => {
    expect(css).toMatch(/--font-family-mono: 'Monaspace Krypton', 'JetBrains Mono'/);
    expect(css).toMatch(/--font-family-code: 'JetBrains Mono'/);
  });
});

describe('component modules theme through tokens, not their own theme blocks', () => {
  it('no module selects on html[data-theme] or prefers-color-scheme', () => {
    const { readdirSync } = require('node:fs') as typeof import('node:fs');
    const offenders = readdirSync(join(root, 'components'))
      .filter((f) => f.endsWith('.module.css'))
      .filter((f) => /html\[data-theme|prefers-color-scheme/.test(read(`components/${f}`)));
    expect(offenders).toEqual([]);
  });

  it('no module hardcodes the dark page/panel surface colours', () => {
    const { readdirSync } = require('node:fs') as typeof import('node:fs');
    const dark = /rgba\((4, 7, 11|7, 12, 19|10, 17, 28|14, 22, 36),/;
    const offenders = readdirSync(join(root, 'components'))
      .filter((f) => f.endsWith('.module.css'))
      .filter((f) => {
        // strip light-dark(...) calls — a dark value inside one is fine
        const stripped = read(`components/${f}`).replace(/light-dark\([^;]*\)/g, '');
        return dark.test(stripped);
      });
    expect(offenders).toEqual([]);
  });
});

describe('Neo* modules do not re-declare tone maps', () => {
  it('only global.css owns [data-tone] → --tone', () => {
    const { readdirSync } = require('node:fs') as typeof import('node:fs');
    const offenders = readdirSync(join(root, 'components'))
      .filter((f) => f.endsWith('.module.css'))
      .filter((f) => /\[data-tone='teal'\]\s*\{[^}]*--tone:/.test(read(`components/${f}`)));
    // legacy modules still carrying their own maps are allowed for now; the new/refactored ones must not
    for (const f of ['Panel', 'PanelTrail', 'NeoCard', 'NeoButton', 'NeoToggle', 'Ticker', 'NeoTicker', 'TickerBoard', 'BrailleLoader']) {
      expect(offenders, f).not.toContain(`${f}.module.css`);
    }
  });
});

describe('BrailleLoader CSS frame tables', () => {
  const css = read('components/BrailleLoader.module.css');

  const symbolCount = (style: string) => {
    const m = new RegExp(`@counter-style ${style}\\s*\\{[^}]*symbols:([^;]*);`).exec(css);
    expect(m, style).not.toBeNull();
    return m![1].match(/'[^']+'/g)!.length;
  };

  const keyframeEnd = (name: string) => {
    const m = new RegExp(`@keyframes ${name}\\s*\\{[\\s\\S]*?to\\s*\\{\\s*--bl-frame:\\s*(\\d+)`).exec(css);
    expect(m, name).not.toBeNull();
    return Number(m![1]);
  };

  it('every counter-style has as many symbols as the steps()/keyframe range that drives it', () => {
    // default (spin) → bl-step / steps(10)
    expect(symbolCount('nd-braille-spin')).toBe(10);
    expect(keyframeEnd('bl-step')).toBe(10);
    expect(css).toMatch(/\.cell \{[^}]*steps\(10, end\)/);

    const twelve = ['rain', 'pulse', 'bar'];
    for (const v of twelve) {
      expect(symbolCount(`nd-braille-${v}`), v).toBe(12);
      const rule = new RegExp(`\\[data-variant='${v}'\\] \\.cell \\{([^}]*)\\}`).exec(css)!;
      expect(rule[1]).toContain('steps(12, end)');
      expect(rule[1]).toContain('animation-name: bl-step-12');
    }
    expect(keyframeEnd('bl-step-12')).toBe(12);

    expect(symbolCount('nd-braille-wave')).toBe(16);
    expect(css).toMatch(/\[data-variant='wave'\] \.cell \{[^}]*steps\(16, end\)[^}]*bl-step-16/);
    expect(keyframeEnd('bl-step-16')).toBe(16);
  });

  it('registers --bl-frame as an integer so steps() produces whole frames', () => {
    expect(css).toMatch(/@property --bl-frame \{\s*syntax: '<integer>'/);
  });

  it('glitch ghost layer uses the same counter style as the variant', () => {
    for (const v of ['wave', 'rain', 'pulse', 'bar']) {
      expect(css).toContain(`[data-glitch][data-variant='${v}'] .cell::after { content: counter(bl, nd-braille-${v}); }`);
    }
  });
});

describe('bundled fonts', () => {
  const css = read('global-fonts.css');

  it('every url() in global-fonts.css points at a file that exists', () => {
    const urls = [...css.matchAll(/url\('\.\/(fonts\/[^']+)'\)/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);
    for (const u of urls) expect(existsSync(join(root, u)), u).toBe(true);
  });

  it('ships the OFL license next to each family', () => {
    expect(existsSync(join(root, 'fonts/LICENSE-Monaspace.txt'))).toBe(true);
    expect(existsSync(join(root, 'fonts/LICENSE-JetBrainsMono.txt'))).toBe(true);
    expect(read('fonts/LICENSE-Monaspace.txt')).toContain('SIL Open Font License');
    expect(read('fonts/LICENSE-JetBrainsMono.txt')).toContain('SIL Open Font License');
  });

  it('build script copies fonts/ into dist', () => {
    expect(read('scripts/build.mjs')).toMatch(/join\(dist, 'fonts'\)/);
  });
});
