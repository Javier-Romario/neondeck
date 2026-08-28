'use client';

import styles from '@components/NeoBlockLoader.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

const FRAMES: Record<number, string[]> = {
  0: ['▖', '▘', '▝', '▗'],
  1: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'],
  2: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  3: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
  4: ['◐', '◓', '◑', '◒'],
  5: ['▞', '▚'],
  6: ['◢', '◣', '◤', '◥'],
  7: ['⌜', '⌝', '⌟', '⌞'],
  8: ['■', '□', '▪', '▫'],
  9: ['|', '/', '-', '\\'],
  10: ['▉', '▊', '▋', '▌', '▍', '▎', '▏'],
  11: ['▓', '▒', '░'],
};

interface NeoBlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  mode?: number;
  tone?: NeonTone;
}

const NeoBlockLoader: React.FC<NeoBlockLoaderProps> = ({ mode = 0, tone = 'teal', ...rest }) => {
  const frames = FRAMES[mode] || FRAMES[0];
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 120);
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <span className={styles.orb} data-tone={tone} {...rest}>
      {frames[index]}
    </span>
  );
};

export default NeoBlockLoader;
