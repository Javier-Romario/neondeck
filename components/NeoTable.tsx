import styles from '@components/NeoTable.module.css';

import * as React from 'react';
import type { NeonTone } from '@components/Ticker';

type NeoTableProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  tone?: NeonTone;
};

const NeoTable: React.FC<NeoTableProps> = ({ children, tone = 'teal', ...rest }) => {
  return (
    <div className={styles.scrollWrapper} data-tone={tone}>
      <table className={styles.table} {...rest}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default NeoTable;
