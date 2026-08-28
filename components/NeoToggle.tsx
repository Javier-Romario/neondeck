'use client';

import styles from '@components/NeoToggle.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoToggleProps {
  label?: string;
  tone?: NeonTone;
  checked?: boolean;
  defaultChecked?: boolean;
  onToggle?: (next: boolean) => void;
}

const NeoToggle: React.FC<NeoToggleProps> = ({
  label,
  tone = 'teal',
  checked,
  defaultChecked = false,
  onToggle,
}) => {
  const [on, setOn] = React.useState(checked ?? defaultChecked);

  React.useEffect(() => {
    if (checked !== undefined) setOn(checked);
  }, [checked]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      className={styles.root}
      data-tone={tone}
      data-checked={on}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={toggle}
    >
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      {label ? <span className={styles.label}>{label}</span> : null}
    </button>
  );
};

export default NeoToggle;
