import styles from '@components/NeoBreadcrumbs.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoBreadcrumbsItem {
  name: string;
  url?: string;
}

interface NeoBreadcrumbsProps {
  items: NeoBreadcrumbsItem[];
  tone?: NeonTone;
}

const NeoBreadcrumbs: React.FC<NeoBreadcrumbsProps> = ({ items, tone = 'teal' }) => {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb" data-tone={tone}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className={styles.crumb} key={index}>
            {item.url ? (
              <a className={styles.link} href={item.url}>
                {item.name}
              </a>
            ) : (
              <span className={styles.current}>{item.name}</span>
            )}
            {!isLast ? (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
};

export default NeoBreadcrumbs;
