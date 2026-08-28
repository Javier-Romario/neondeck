import styles from '@components/NeoActionListItem.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  role?: string;
  tone?: NeonTone;
}

const NeoActionListItem: React.FC<NeoActionListItemProps> = ({
  style,
  icon,
  children,
  href,
  target,
  onClick,
  role,
  tone = 'teal',
}) => {
  if (href) {
    return (
      <a className={styles.item} href={href} target={target} style={style} role={role} data-tone={tone}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.content}>{children}</span>
      </a>
    );
  }

  return (
    <div className={styles.item} onClick={onClick} style={style} role={role} tabIndex={0} data-tone={tone}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.content}>{children}</span>
    </div>
  );
};

export default NeoActionListItem;
