'use client';

import styles from '@components/Accordion.module.css';

import * as React from 'react';

interface AccordionProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ defaultValue = false, title, children }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(defaultValue);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.glyph} aria-hidden="true">
          {isExpanded ? '▾' : '▸'}
        </span>
        <span className={styles.title}>{title}</span>
        <span className={styles.state} aria-hidden="true">
          {isExpanded ? 'OPEN' : 'CLOSED'}
        </span>
      </button>
      {isExpanded ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
};

export default Accordion;
