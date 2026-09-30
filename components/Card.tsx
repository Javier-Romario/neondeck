import styles from '@components/Card.module.css';

import * as React from 'react';
import Panel from '@components/Panel';
import type { Cuts, PanelShape } from '@common/shape';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode;
  title?: React.ReactNode;
  mode?: string;
  /** Chamfer/notch preset or custom cuts. Default `'slab'`. */
  shape?: PanelShape | Cuts;
}

const Card: React.FC<CardProps> = ({ children, mode, title, shape = 'slab', style, ...rest }) => {
  return (
    <Panel
      shape={shape}
      style={{ '--panel-pad': '0', ...style } as React.CSSProperties}
      {...rest}
    >
      <header className={styles.action}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
      </header>
      <section className={styles.children}>{children}</section>
    </Panel>
  );
};

export default Card;
