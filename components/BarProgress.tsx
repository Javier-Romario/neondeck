'use client';

import styles from '@components/BarProgress.module.css';

import * as React from 'react';

interface BarProgressProps {
  intervalRate?: number;
  progress?: number;
  fillChar?: string;
}

const BarProgress: React.FC<BarProgressProps> = ({ intervalRate, progress, fillChar = '█' }) => {
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
    <span className={styles.bar}>
      <span className={styles.filled}>{fillChar.repeat(filled)}</span>
      <span className={styles.empty}>{fillChar.repeat(total - filled)}</span>
      <span className={styles.label}>{displayValue}%</span>
    </span>
  );
};

export default BarProgress;
