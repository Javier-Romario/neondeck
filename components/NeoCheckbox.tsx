'use client';

import styles from '@components/NeoCheckbox.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoCheckboxProps {
  style?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
  name: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tabIndex?: number;
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoCheckbox: React.FC<NeoCheckboxProps> = ({
  style,
  checkboxStyle,
  name,
  defaultChecked = false,
  onChange,
  tabIndex,
  children,
  tone = 'teal',
}) => {
  return (
    <label className={styles.label} style={style} data-tone={tone}>
      <span className={styles.box} style={checkboxStyle}>
        <input
          className={styles.input}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          onChange={onChange}
          tabIndex={tabIndex}
        />
        <span className={styles.glyph} aria-hidden="true">
          ◈
        </span>
      </span>
      <span className={styles.content}>{children}</span>
    </label>
  );
};

export default NeoCheckbox;
