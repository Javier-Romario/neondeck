import * as React from 'react';

/**
 * Palette handed to canvas / WebGL components. Values are CSS colour
 * expressions; they are resolved through the cascade at runtime (so
 * light-dark(), var() and tint classes all apply) and re-read whenever
 * the theme changes.
 */
export const CANVAS_THEME = {
  /** primary neon: lines, text, nodes */
  fg: 'var(--theme-focused-foreground)',
  /** secondary neon: suns, RGB splits, halos */
  accent: 'var(--theme-accent)',
  /** third neon for RGB splits */
  accent2: 'light-dark(#0891b2, #2de2ff)',
  /** matrix green */
  green: 'light-dark(#009e60, #00ff9d)',
  /** page / canvas backdrop */
  bg: 'var(--theme-background-solid)',
  bg2: 'var(--cp-bg-2)',
  panel: 'var(--theme-panel)',
  text: 'var(--theme-text)',
  muted: 'var(--theme-muted)',
  /** darkening colour for scanlines, vignettes, trails */
  shade: 'light-dark(#3c5a6e, #000000)',
} as const;

export type CanvasTheme = { [K in keyof typeof CANVAS_THEME]: string };

/** Resolve each expression to a computed colour by assigning it to `el.style.color`. */
export function resolveThemeColors<M extends Record<string, string>>(el: HTMLElement, map: M): { [K in keyof M]: string } {
  const prev = el.style.color;
  const out = {} as { [K in keyof M]: string };
  for (const key in map) {
    el.style.color = map[key];
    out[key] = getComputedStyle(el).color || map[key];
  }
  el.style.color = prev;
  return out;
}

/** Re-run `cb` whenever the theme can change: html/body attributes or the OS scheme. */
export function observeTheme(cb: () => void): () => void {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
  if (document.body) mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
  const mq = window.matchMedia?.('(prefers-color-scheme: light)');
  mq?.addEventListener?.('change', cb);
  return () => {
    mo.disconnect();
    mq?.removeEventListener?.('change', cb);
  };
}

/**
 * Hook form: resolves `map` against `ref.current` and keeps it current.
 * Returns the palette as state (for React props) and as a ref (for rAF loops).
 */
export function useThemeColors<M extends Record<string, string>>(ref: React.RefObject<HTMLElement | null>, map: M) {
  const fallback = React.useMemo(() => ({ ...map }) as { [K in keyof M]: string }, [map]);
  const [colors, setColors] = React.useState(fallback);
  const colorsRef = React.useRef(fallback);

  React.useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      const next = resolveThemeColors(ref.current, map);
      colorsRef.current = next;
      setColors((prev) => {
        for (const k in next) if (prev[k] !== next[k]) return next;
        return prev;
      });
    };
    read();
    return observeTheme(read);
  }, [ref, map]);

  return { colors, colorsRef };
}

/** `withAlpha('rgb(0, 255, 209)', 0.4)` → `rgba(0, 255, 209, 0.4)`. Accepts hex, rgb(), rgba(); anything else is returned unchanged. */
export function withAlpha(color: string, alpha: number): string {
  const c = color.trim();
  const hex = /^#([0-9a-f]{3,8})$/i.exec(c);
  if (hex) {
    let v = hex[1];
    if (v.length === 3 || v.length === 4) v = v.split('').map((ch) => ch + ch).join('');
    const n = parseInt(v.slice(0, 6), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  const rgb = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/.exec(c);
  if (rgb) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
  return c;
}
