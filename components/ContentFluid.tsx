import styles from '@components/ContentFluid.module.css';

import * as React from 'react';

interface ContentFluidProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const ContentFluid: React.FC<ContentFluidProps> = ({ children, ...rest }) => {
  return (
    <span className={styles.fluid} {...rest}>
      {children}
    </span>
  );
};

export default ContentFluid;
