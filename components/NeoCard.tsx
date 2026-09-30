'use client';

import * as React from 'react';
import Panel from '@components/Panel';
import Ticker, { NeonTone } from '@components/Ticker';
import styles from '@components/NeoCard.module.css';
import type { Cuts, PanelShape } from '@common/shape';

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  tone?: NeonTone;
  /** Chamfer/notch preset or custom cuts. Default `'slab'` (top-left + bottom-right chamfer). */
  shape?: PanelShape | Cuts;
  ticker?: boolean;
  tickerItems?: string[];
  tickerLabel?: string;
  tickerSpeed?: number;
  children?: React.ReactNode;
}

const NeoCard: React.FC<NeoCardProps> = ({
  title,
  tone = 'teal',
  shape = 'slab',
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
    <Panel
      shape={shape}
      tone={tone}
      style={{ '--panel-pad': '0', ...style } as React.CSSProperties}
      {...rest}
    >
      {hasTicker ? (
        <div className={styles.ticker}>
          <Ticker items={tickerItems} label={tickerLabel} tone={tone} speed={tickerSpeed} />
        </div>
      ) : null}
      {title ? <header className={styles.title}>{title}</header> : null}
      <section className={styles.body}>{children}</section>
    </Panel>
  );
};

export default NeoCard;
