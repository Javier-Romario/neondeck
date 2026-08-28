'use client';

import styles from '@components/Input.module.css';

import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  caretChars?: string | any;
  label?: string | any;
  isBlink?: boolean;
};

const Input: React.FC<InputProps> = ({ caretChars = '▮', label, isBlink = true, style, ...rest }) => {
  return (
    <div className={styles.root} style={style}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <div className={styles.wrap}>
        <input className={styles.input} {...rest} />
        <span className={styles.caret} aria-hidden="true" data-blink={isBlink ? 'true' : 'false'}>
          {caretChars}
        </span>
      </div>
    </div>
  );
};

export default Input;
