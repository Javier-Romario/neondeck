import styles from '@components/TickerBoard.module.css';

import * as React from 'react';
import Ticker, { NeonTone } from '@components/Ticker';

interface TickerBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string; // small message box rendered right above the component
  messageTone?: NeonTone;
  tickerItems?: string[];
  tickerLabel?: string;
  tickerTone?: NeonTone;
  tickerDirection?: 'left' | 'right';
  tickerSpeed?: number;
  showTopTicker?: boolean;
  showBottomTicker?: boolean;
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

const TickerBoard: React.FC<TickerBoardProps> = ({
  message,
  messageTone = 'teal',
  tickerItems = [],
  tickerLabel,
  tickerTone = 'teal',
  tickerDirection = 'left',
  tickerSpeed,
  showTopTicker = true,
  showBottomTicker = false,
  theme,
  children,
  style,
  ...rest
}) => {
  const hasTicker = tickerItems.length > 0 || Boolean(tickerLabel);

  return (
    <div className={styles.root} {...rest} data-theme={theme} style={style}>
      {message ? (
        <div className={styles.message} data-tone={messageTone}>
          <span className={styles.messageGlyph} aria-hidden="true">
            ▤
          </span>
          <span className={styles.messageText}>{message}</span>
        </div>
      ) : null}
      {showTopTicker && hasTicker ? (
        <div className={styles.topTicker}>
          <Ticker
            items={tickerItems}
            label={tickerLabel}
            tone={tickerTone}
            direction={tickerDirection}
            speed={tickerSpeed}
          />
        </div>
      ) : null}
      <div className={styles.body}>{children}</div>
      {showBottomTicker && hasTicker ? (
        <div className={styles.bottomTicker}>
          <Ticker
            items={tickerItems}
            label={tickerLabel}
            tone={tickerTone}
            direction={tickerDirection === 'left' ? 'right' : 'left'}
            speed={tickerSpeed}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TickerBoard;
