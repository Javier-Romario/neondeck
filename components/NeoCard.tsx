'use client';

import styles from '@components/NeoCard.module.css';

import * as React from 'react';
import Ticker, { NeonTone } from '@components/Ticker';

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  tone?: NeonTone;
  ticker?: boolean;
  tickerItems?: string[];
  tickerLabel?: string;
  tickerSpeed?: number;
  children?: React.ReactNode;
}

const NeoCard: React.FC<NeoCardProps> = ({
  title,
  tone = 'teal',
  ticker = false,
  tickerItems = [],
  tickerLabel,
  tickerSpeed,
  children,
  style,
  ...rest
}) => {
  const hasTicker = ticker && (tickerItems.length > 0 || Boolean(tickerLabel));

  return (
    <div className={styles.frame} data-tone={tone}>
      <article className={styles.card} style={style} {...rest}>
        {hasTicker ? (
          <div className={styles.ticker}>
            <Ticker items={tickerItems} label={tickerLabel} tone={tone} speed={tickerSpeed} />
          </div>
        ) : null}
        {title ? <header className={styles.title}>{title}</header> : null}
        <section className={styles.body}>{children}</section>
      </article>
    </div>
  );
};

export default NeoCard;
