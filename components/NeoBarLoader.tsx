'use client';

import styles from '@components/NeoBarLoader.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoBarLoaderProps {
  intervalRate?: number;
  progress?: number;
  tone?: NeonTone;
}

const NeoBarLoader: React.FC<NeoBarLoaderProps> = ({ intervalRate, progress, tone = 'teal' }) => {
  const [value, setValue] = React.useState<number>(progress ?? 0);

  React.useEffect(() => {
    if (intervalRate === undefined) return;
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, intervalRate);
    return () => clearInterval(timer);
  }, [intervalRate]);

  const displayValue = progress !== undefined ? progress : value;

  return (
    <div className={styles.track} data-tone={tone}>
      <div className={styles.fill} style={{ width: `${displayValue}%` }}></div>
      <span className={styles.label}>{displayValue}%</span>
    </div>
  );
};

export default NeoBarLoader;
