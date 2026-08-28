'use client';

import styles from '@components/Checkbox.module.css';

import * as React from 'react';

interface CheckboxProps {
  style?: React.CSSProperties;
  checkboxStyle?: React.CSSProperties;
  name: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tabIndex?: number;
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({ style, checkboxStyle, name, defaultChecked = false, onChange, tabIndex, children }) => {
  return (
    <label className={styles.label} style={style}>
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

export default Checkbox;
