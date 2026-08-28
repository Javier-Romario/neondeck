import styles from '@components/TableColumn.module.css';

import * as React from 'react';

type TableColumnProps = React.HTMLAttributes<HTMLTableCellElement> & {
  children?: React.ReactNode;
};

const TableColumn: React.FC<TableColumnProps> = ({ children, ...rest }) => {
  return (
    <td className={styles.column} {...rest}>
      {children}
    </td>
  );
};

export default TableColumn;
