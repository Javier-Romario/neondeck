'use client';

import styles from '@components/ButtonGroup.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface ButtonGroupItem {
  body: string;
  hotkey?: string;
  selected?: boolean;
  onClick?: () => void;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
  isFull?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ items, isFull }) => {
  const [selected, setSelected] = React.useState<number>(() => items.findIndex((i) => i.selected));

  return (
    <div className={Utilities.classNames(styles.group, isFull ? styles.full : null)}>
      {items.map((item, index) => (
        <button
          key={index}
          className={Utilities.classNames(styles.item, selected === index ? styles.selected : null)}
          onClick={() => {
            setSelected(index);
            item.onClick?.();
          }}
        >
          {item.hotkey ? <span className={styles.hotkey}>{item.hotkey}</span> : null}
          {item.body}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
