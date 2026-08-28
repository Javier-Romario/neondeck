'use client';

import styles from '@components/NeoDrawer.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  children?: React.ReactNode;
  defaultValue?: boolean;
  tone?: NeonTone;
}

const NeoDrawer: React.FC<NeoDrawerProps> = ({ children, defaultValue = false, tone = 'teal', ...rest }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultValue);

  return (
    <div className={styles.drawer} data-tone={tone} {...rest}>
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

export default NeoDrawer;
