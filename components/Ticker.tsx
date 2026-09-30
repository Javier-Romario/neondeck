import styles from '@components/Ticker.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

export type NeonTone = 'teal' | 'magenta' | 'yellow' | 'green' | 'violet' | 'orange' | 'red' | 'blue';

interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
  label?: string;
  tone?: NeonTone;
  direction?: 'left' | 'right';
  speed?: number; // seconds per full loop
}

const Ticker: React.FC<TickerProps> = ({
  items = [],
  label,
  tone = 'teal',
  direction = 'left',
  speed = 24,
  style,
  children,
  ...rest
}) => {
  const feed = items.length ? items : [label || 'NEONDECK'];
  const duration = { ['--ticker-speed' as any]: `${speed}s` } as React.CSSProperties;

  const renderRun = (key: string) => (
    <div className={styles.run} key={key} aria-hidden={key === 'run-b' ? 'true' : undefined}>
      {feed.map((item, index) => (
        <span className={styles.entry} key={`${key}-${index}`}>
          <span className={styles.sep} aria-hidden="true">
            ◈
          </span>
          <span className={styles.item}>{item}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={styles.root} data-tone={tone} style={{ ...duration, ...style }} {...rest}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <div className={styles.viewport}>
        <div className={styles.track} data-direction={direction}>
          {renderRun('run-a')}
          {renderRun('run-b')}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
