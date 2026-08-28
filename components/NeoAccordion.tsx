'use client';

import styles from '@components/NeoAccordion.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoAccordionProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoAccordion: React.FC<NeoAccordionProps> = ({
  defaultValue = false,
  title,
  children,
  tone = 'teal',
}) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(defaultValue);

  return (
    <div className={styles.accordion} data-tone={tone} data-expanded={isExpanded ? 'true' : 'false'}>
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

export default NeoAccordion;
