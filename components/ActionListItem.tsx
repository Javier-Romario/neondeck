import styles from '@components/ActionListItem.module.css';

import * as React from 'react';

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  role?: string;
}

const ActionListItem: React.FC<ActionListItemProps> = ({ style, icon, children, href, target, onClick, role }) => {
  if (href) {
    return (
      <a className={styles.item} href={href} target={target} style={style} role={role}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.content}>{children}</span>
      </a>
    );
  }

  return (
    <div className={styles.item} onClick={onClick} style={style} role={role} tabIndex={0}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.content}>{children}</span>
    </div>
  );
};

export default ActionListItem;
