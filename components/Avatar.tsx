import styles from '@components/Avatar.module.css';

import * as React from 'react';

interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
  src?: string;
  href?: string;
  target?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({ src, href, target, style, children, ...rest }) => {
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
      <div className={styles.root} style={style} {...rest}>
        <a className={styles.link} href={href} target={target}>
          {inner}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.root} style={style} {...rest}>
      {inner}
    </div>
  );
};

export default Avatar;
