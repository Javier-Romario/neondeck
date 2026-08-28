import styles from '@components/ListItem.module.css';

import * as React from 'react';

const ListItem: React.FC<React.HTMLAttributes<HTMLLIElement>> = ({ children, ...rest }) => {
  return (
    <li className={styles.item} {...rest}>
      {children}
    </li>
  );
};

export default ListItem;
