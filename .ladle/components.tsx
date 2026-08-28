import '@root/global-fonts.css';
import '@root/global.css';

import * as React from 'react';

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
