'use client';

import styles from '@components/NeoButton.module.css';

import * as React from 'react';
import * as Utilities from '@common/utilities';
import type { NeonTone } from '@components/Ticker';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'raised' | 'pressed' | 'glass';
  tone?: NeonTone;
  children?: React.ReactNode;
}

const NeoButton: React.FC<NeoButtonProps> = ({ variant = 'raised', tone = 'teal', children, ...rest }) => {
  return (
    <button type="button" className={Utilities.classNames(styles.root, styles[variant])} data-tone={tone} {...rest}>
      {children}
    </button>
  );
};

export default NeoButton;
