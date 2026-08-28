'use client';

import styles from '@components/Select.module.css';

import * as React from 'react';

interface SelectProps {
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
}

const Select: React.FC<SelectProps> = ({ name, options, placeholder = 'SELECT', defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string | undefined>(defaultValue);

  const select = (option: string) => {
    setValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={styles.root}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} type="button">
        <span className={styles.value}>{value || placeholder}</span>
        <span className={styles.glyph} aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      {isOpen ? (
        <div className={styles.menu} role="listbox">
          {options.map((option) => (
            <button
              key={option}
              className={styles.option}
              onClick={() => select(option)}
              role="option"
              aria-selected={value === option}
              type="button"
            >
              {value === option ? '◈' : '·'} {option}
            </button>
          ))}
        </div>
      ) : null}
      <input type="hidden" name={name} value={value || ''} />
    </div>
  );
};

export default Select;
