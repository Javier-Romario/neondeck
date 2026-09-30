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

  it('declares every --neo-* token in both the dark root and the light overrides', () => {
    const tokens = ['--neo-bg', '--neo-surface', '--neo-light', '--neo-dark', '--neo-rim', '--neo-raised', '--neo-pressed', '--neo-well', '--neo-drop'];
    for (const tok of tokens) {
      const count = css.split(`${tok}:`).length - 1;
      // dark root + html[data-theme='light'] + prefers-color-scheme block
      expect(count, tok).toBeGreaterThanOrEqual(3);
    }
  });

  it('the dark neumorphic light shadow is tone-tinted', () => {
    expect(css).toMatch(/html:not\(\[data-theme='light'\]\) \[data-tone\] \{ --neo-light: var\(--tone-faint\); \}/);
  });

  it('UI stack leads with Krypton and falls back to JetBrains Mono; code stack is JetBrains Mono', () => {
    expect(css).toMatch(/--font-family-mono: 'Monaspace Krypton', 'JetBrains Mono'/);
    expect(css).toMatch(/--font-family-code: 'JetBrains Mono'/);
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
