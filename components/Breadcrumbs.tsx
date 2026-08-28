import styles from '@components/Breadcrumbs.module.css';

import * as React from 'react';

interface BreadcrumbsItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb">
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

export default Breadcrumbs;
