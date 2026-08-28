'use client';

import styles from '@components/ActionBar.module.css';

import * as React from 'react';
import ActionButton from '@components/ActionButton';

interface ActionBarItem {
  hotkey?: any;
  body: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  items?: ActionBarItem[];
  openHotkey?: string;
}

interface ActionBarProps {
  items: ActionBarItem[];
}

const ActionBar: React.FC<ActionBarProps> = ({ items }) => {
  return (
    <div className={styles.bar}>
      {items.map((item, index) => (
        <ActionButton key={index} hotkey={item.hotkey} onClick={item.onClick} isSelected={item.selected}>
          {item.body}
        </ActionButton>
      ))}
    </div>
  );
};

export default ActionBar;
