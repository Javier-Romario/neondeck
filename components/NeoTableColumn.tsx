import styles from '@components/NeoTableColumn.module.css';

import * as React from 'react';

type NeoTableColumnProps = React.HTMLAttributes<HTMLTableCellElement> & {
  children?: React.ReactNode;
};

const NeoTableColumn: React.FC<NeoTableColumnProps> = ({ children, ...rest }) => {
  return (
    <td className={styles.column} {...rest}>
      {children}
    </td>
  );
};

export default NeoTableColumn;
