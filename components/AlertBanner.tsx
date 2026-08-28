import styles from '@components/AlertBanner.module.css';

import * as React from 'react';

interface AlertBannerProps {
  style?: any;
  children?: any;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ style, children, ...rest }) => {
  return (
    <div className={styles.banner} style={style} {...rest}>
      <span className={styles.glyph} aria-hidden="true">
        ⚠
      </span>
      <span className={styles.content}>{children}</span>
    </div>
  );
};

export default AlertBanner;
