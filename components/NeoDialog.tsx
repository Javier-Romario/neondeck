'use client';

import styles from '@components/NeoDialog.module.css';

import * as React from 'react';
import NeoButton from '@components/NeoButton';
import type { NeonTone } from '@components/Ticker';

interface NeoDialogProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onConfirm?: () => void;
  onCancel?: () => void;
  tone?: NeonTone;
}

const NeoDialog: React.FC<NeoDialogProps> = ({ title, children, style, onConfirm, onCancel, tone = 'teal' }) => {
  return (
    <div className={styles.backdrop} data-tone={tone}>
      <div className={styles.dialog} style={style}>
        {title ? <header className={styles.header}>{title}</header> : null}
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <NeoButton tone={tone} variant="glass" onClick={onCancel}>
            Cancel
          </NeoButton>
          <NeoButton tone={tone} onClick={onConfirm}>
            OK
          </NeoButton>
        </footer>
      </div>
    </div>
  );
};

export default NeoDialog;
