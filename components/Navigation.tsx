'use client';

import styles from '@components/Navigation.module.css';

import * as React from 'react';

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  logoHref?: string;
  logoTarget?: React.HTMLAttributeAnchorTarget;
  onClickLogo?: React.MouseEventHandler<HTMLButtonElement>;
  logo?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  children,
  logoHref,
  logoTarget,
  onClickLogo,
  logo = '◆',
  left,
  right,
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
    <nav className={styles.nav} {...rest}>
      <div className={styles.left}>
        {logoElement}
        {left}
      </div>
      <div className={styles.center}>{children}</div>
      <div className={styles.right}>{right}</div>
    </nav>
  );
};

export default Navigation;
