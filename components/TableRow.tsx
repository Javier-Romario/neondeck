import styles from '@components/TableRow.module.css';

import * as React from 'react';

type TableRowProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const TableRow: React.FC<TableRowProps> = ({ children, ...rest }) => {
  return (
    <tr className={styles.row} {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;
