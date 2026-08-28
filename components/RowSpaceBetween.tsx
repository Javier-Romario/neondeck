import styles from '@components/RowSpaceBetween.module.css';

import * as React from 'react';

type RowSpaceBetweenProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const RowSpaceBetween: React.FC<RowSpaceBetweenProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.row} {...rest}>
      {children}
    </div>
  );
};

export default RowSpaceBetween;
