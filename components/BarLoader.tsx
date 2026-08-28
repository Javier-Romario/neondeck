'use client';

import styles from '@components/BarLoader.module.css';

import * as React from 'react';

interface BarLoaderProps {
  intervalRate?: number;
  progress?: number;
}

const BarLoader: React.FC<BarLoaderProps> = ({ intervalRate, progress }) => {
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
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${displayValue}%` }}></div>
      <span className={styles.label}>{displayValue}%</span>
    </div>
  );
};

export default BarLoader;
