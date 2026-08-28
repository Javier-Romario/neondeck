'use client';

import styles from '@components/BlockLoader.module.css';

import * as React from 'react';

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

interface BlockLoaderProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  mode?: number;
}

const BlockLoader: React.FC<BlockLoaderProps> = ({ mode = 0, ...rest }) => {
  const frames = FRAMES[mode] || FRAMES[0];
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 120);
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <span className={styles.loader} {...rest}>
      {frames[index]}
    </span>
  );
};

export default BlockLoader;
