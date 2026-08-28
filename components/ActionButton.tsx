import styles from '@components/ActionButton.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';

interface ActionButtonProps {
  onClick?: () => void;
  hotkey?: any;
  children?: React.ReactNode;
  style?: any;
  rootStyle?: any;
  isSelected?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, hotkey, children, style, rootStyle, isSelected }) => {
  return (
    <div className={styles.root} style={rootStyle}>
      <button className={Utilities.classNames(styles.button, isSelected ? styles.selected : null)} onClick={onClick} style={style}>
        <span className={styles.hotkey}>{hotkey}</span>
        <span className={styles.label}>{children}</span>
      </button>
    </div>
  );
};

export default ActionButton;
