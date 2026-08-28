'use client';

import styles from '@components/Drawer.module.css';

import * as React from 'react';

interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  children?: React.ReactNode;
  defaultValue?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ children, defaultValue = false, ...rest }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultValue);

  return (
    <div className={styles.drawer} {...rest}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span className={styles.glyph} aria-hidden="true">
          {isOpen ? '◂' : '▸'}
        </span>
        <span className={styles.label}>{isOpen ? 'CLOSE' : 'OPEN'}</span>
      </button>
      {isOpen ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
};

export default Drawer;
