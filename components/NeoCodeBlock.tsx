import styles from '@components/NeoCodeBlock.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoCodeBlock: React.FC<NeoCodeBlockProps> = ({ children, tone = 'teal', ...rest }) => {
  const lines = typeof children === 'string' ? children.split('\n') : null;

  return (
    <pre className={styles.pre} data-tone={tone} {...rest}>
      {lines
        ? lines.map((line, index) => (
            <span className={styles.line} key={index}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.code}>{line || ' '}</span>
            </span>
          ))
        : children}
    </pre>
  );
};

export default NeoCodeBlock;
