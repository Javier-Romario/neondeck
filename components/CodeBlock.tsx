import styles from '@components/CodeBlock.module.css';

import * as React from 'react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, ...rest }) => {
  const lines = typeof children === 'string' ? children.split('\n') : null;

  return (
    <pre className={styles.pre} {...rest}>
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

export default CodeBlock;
