import * as React from 'react';

import NeoButton from '@components/NeoButton';

export function useNeoTheme() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    document.documentElement.dataset.theme = mode;
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [mode]);

  return { mode, toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')) };
}

export const NeoThemeToggle: React.FC = () => {
  const { mode, toggle } = useNeoTheme();
  return (
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
      <NeoButton tone="yellow" variant="glass" onClick={toggle}>
        THEME: {mode.toUpperCase()}
      </NeoButton>
      <span style={{ color: 'var(--theme-muted)', fontSize: 12 }}>
        flips html[data-theme] → neumorphic tokens re-key for light / dark
      </span>
    </div>
  );
};
