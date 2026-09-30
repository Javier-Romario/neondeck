import '@root/global-fonts.css';
import '@root/global.css';

import type { GlobalProvider } from '@ladle/react';
import * as React from 'react';

/** Ladle's own light/dark toggle drives the deck: global.css keys every
 *  light-dark() token off html[data-theme]. */
export const Provider: GlobalProvider = ({ children, globalState }) => {
  React.useEffect(() => {
    document.documentElement.dataset.theme = globalState.theme;
  }, [globalState.theme]);

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        padding: '2rem 1.5rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};
