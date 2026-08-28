import styles from '@components/Divider.module.css';

import * as React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  type?: string | any;
  style?: any;
}

const Divider: React.FC<DividerProps> = ({ children, type, style, ...rest }) => {
  let classNames = styles.single;
  if (type === 'DOUBLE') classNames = styles.double;
  if (type === 'GRADIENT') classNames = styles.gradient;

  return (
    <span className={classNames} style={style} {...rest}>
      {children}
    </span>
  );
};

export default Divider;
