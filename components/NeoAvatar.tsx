import styles from '@components/NeoAvatar.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

interface NeoAvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
  src?: string;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  tone?: NeonTone;
}

const NeoAvatar: React.FC<NeoAvatarProps> = ({ src, href, target, style, children, tone = 'teal', ...rest }) => {
  const portrait = src ? (
    <img className={styles.image} src={src} alt="" />
  ) : (
    <span className={styles.placeholder}>◈</span>
  );

  const inner = (
    <>
      <span className={styles.portrait}>{portrait}</span>
      {children ? <span className={styles.label}>{children}</span> : null}
    </>
  );

  if (href) {
    return (
      <div className={styles.root} style={style} data-tone={tone} {...rest}>
        <a className={styles.link} href={href} target={target}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.root} style={style} data-tone={tone} {...rest}>
      {inner}
    </div>
  );
};

export default NeoAvatar;
