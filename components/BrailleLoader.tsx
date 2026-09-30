'use client';

import styles from '@components/BrailleLoader.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

export type BrailleVariant = 'spin' | 'wave' | 'rain' | 'pulse' | 'bar';

interface BrailleLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: BrailleVariant;
  tone?: NeonTone;
  /** Number of braille cells for the multi-cell variants. Ignored by `spin` / `pulse`. */
  cells?: number;
  /** Seconds per full cycle. */
  speed?: number;
  /** Chromatic-aberration flicker + sliced ghost layer. */
  glitch?: boolean;
  /** Font size of the glyphs; number = px. */
  size?: number | string;
  /** Text after the glyphs, e.g. "LOADING". */
  label?: string;
}

const DEFAULT_CELLS: Record<BrailleVariant, number> = {
  spin: 1,
  pulse: 1,
  wave: 8,
  rain: 10,
  bar: 8,
};

/**
 * Braille-cell loader driven entirely by CSS: an `@property`-registered integer
 * is animated with `steps()`, and a `@counter-style` maps that integer onto
 * braille glyphs via `content: counter()`. No JS timers, no re-renders.
 */
const BrailleLoader: React.FC<BrailleLoaderProps> = ({
  variant = 'spin',
  tone = 'teal',
  cells,
  speed,
  glitch = false,
  size,
  label,
  className,
  style,
  ...rest
}) => {
  const count = variant === 'spin' || variant === 'pulse' ? 1 : Math.max(1, cells ?? DEFAULT_CELLS[variant]);

  const vars = {
    ...(speed ? { '--bl-speed': `${speed}s` } : null),
    ...(size !== undefined ? { fontSize: typeof size === 'number' ? `${size}px` : size } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <span
      role="status"
      aria-busy="true"
      aria-label={label || 'Loading'}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-tone={tone}
      data-glitch={glitch || undefined}
      style={vars}
      {...rest}
    >
      <span className={styles.cells} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={styles.cell} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </span>
      {label ? <span className={styles.label}>{label}</span> : null}
    </span>
  );
};

export default BrailleLoader;
