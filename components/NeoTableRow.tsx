import styles from '@components/NeoTableRow.module.css';

import * as React from 'react';

type NeoTableRowProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const NeoTableRow: React.FC<NeoTableRowProps> = ({ children, ...rest }) => {
  return (
    <tr className={styles.row} {...rest}>
      {children}
    </tr>
  );
};

export default NeoTableRow;
