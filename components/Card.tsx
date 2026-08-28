import styles from '@components/Card.module.css';

import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string | any;
  mode?: string | any;
}

const Card: React.FC<CardProps> = ({ children, mode, title, style, ...rest }) => {
  let titleElement = (
    <header className={styles.action}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
    </header>
  );

  return (
    <div className={styles.frame}>
      <article className={styles.card} style={style} {...rest}>
        {titleElement}
        <section className={styles.children}>{children}</section>
      </article>
    </div>
  );
};

export default Card;
