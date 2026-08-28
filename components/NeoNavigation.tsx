'use client';

import styles from '@components/NeoNavigation.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoNavigationProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  logoHref?: string;
  logoTarget?: React.HTMLAttributeAnchorTarget;
  onClickLogo?: React.MouseEventHandler<HTMLButtonElement>;
  logo?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  tone?: NeonTone;
}

const NeoNavigation: React.FC<NeoNavigationProps> = ({
  children,
  logoHref,
  logoTarget,
  onClickLogo,
  logo = '◆',
  left,
  right,
  tone = 'teal',
  ...rest
}) => {
  const logoElement = logoHref ? (
    <a className={styles.logo} href={logoHref} target={logoTarget}>
      {logo}
    </a>
  ) : (
    <button className={styles.logo} onClick={onClickLogo}>
      {logo}
    </button>
  );

  return (
    <nav className={styles.nav} data-tone={tone} {...rest}>
      <div className={styles.left}>
        {logoElement}
        {left}
      </div>
      <div className={styles.center}>{children}</div>
      <div className={styles.right}>{right}</div>
    </nav>
  );
};

export default NeoNavigation;
