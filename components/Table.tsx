import styles from '@components/Table.module.css';

import * as React from 'react';

type TableProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Table: React.FC<TableProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.scrollWrapper}>
      <table className={styles.table} {...rest}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
