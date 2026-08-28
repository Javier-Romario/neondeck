import styles from '@components/NeoAlertBanner.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoAlertBannerProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoAlertBanner: React.FC<NeoAlertBannerProps> = ({ style, children, tone = 'magenta', ...rest }) => {
  return (
    <div className={styles.banner} style={style} data-tone={tone} {...rest}>
      <span className={styles.glyph} aria-hidden="true">
        ⚠
      </span>
      <span className={styles.content}>{children}</span>
    </div>
  );
};

export default NeoAlertBanner;
