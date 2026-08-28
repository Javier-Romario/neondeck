'use client';

import styles from '@components/NeoInput.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

type NeoInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  caretChars?: string;
  label?: string;
  isBlink?: boolean;
  tone?: NeonTone;
};

const NeoInput: React.FC<NeoInputProps> = ({
  caretChars = '▮',
  label,
  isBlink = true,
  tone = 'teal',
  style,
  ...rest
}) => {
  return (
    <div className={styles.root} data-tone={tone} style={style}>
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

export default NeoInput;
