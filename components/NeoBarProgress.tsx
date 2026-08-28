'use client';

import styles from '@components/NeoBarProgress.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoBarProgressProps {
  intervalRate?: number;
  progress?: number;
  fillChar?: string;
  tone?: NeonTone;
}

const NeoBarProgress: React.FC<NeoBarProgressProps> = ({ intervalRate, progress, fillChar = '█', tone = 'teal' }) => {
  const [value, setValue] = React.useState<number>(progress ?? 0);

  React.useEffect(() => {
    if (intervalRate === undefined) return;
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, intervalRate);
    return () => clearInterval(timer);
  }, [intervalRate]);

  const displayValue = progress !== undefined ? progress : value;
  const total = 20;
  const filled = Math.round((displayValue / 100) * total);

  return (
    <span className={styles.bar} data-tone={tone}>
      <span className={styles.filled}>{fillChar.repeat(filled)}</span>
      <span className={styles.empty}>{fillChar.repeat(total - filled)}</span>
      <span className={styles.label}>{displayValue}%</span>
    </span>
  );
};

export default NeoBarProgress;
