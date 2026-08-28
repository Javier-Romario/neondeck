import styles from '@components/Window.module.css';

import * as React from 'react';

type WindowProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Window: React.FC<WindowProps> = ({ children, style, ...rest }) => {
  return (
    <section className={styles.window} style={style} {...rest}>
      <div className={styles.scanlines} aria-hidden="true"></div>
      {children}
    </section>
  );
};

export default Window;
