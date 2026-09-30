import type { Story } from '@ladle/react';

import * as React from 'react';

import BrailleLoader from '@components/BrailleLoader';
import type { BrailleVariant } from '@components/BrailleLoader';
import Panel from '@components/Panel';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;
const VARIANTS: BrailleVariant[] = ['spin', 'wave', 'rain', 'pulse', 'bar'];

export default {
  title: 'Loaders',
};

const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' };

export const Braille: Story<{ tone: string; glitch: boolean; size: number; speed: number }> = ({ tone, glitch, size, speed }) => (
  <div style={{ display: 'grid', gap: 24 }}>
    {VARIANTS.map((v) => (
      <div key={v} style={row}>
        <span style={{ width: 64, color: 'var(--theme-muted)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase' }}>{v}</span>
        <BrailleLoader variant={v} tone={tone as any} glitch={glitch} size={size} speed={speed || undefined} />
        <BrailleLoader variant={v} tone={tone as any} glitch={glitch} size={size} speed={speed || undefined} label="LOADING" />
      </div>
    ))}
  </div>
);
Braille.args = { tone: 'teal', glitch: true, size: 22, speed: 0 };
Braille.argTypes = {
  tone: { control: { type: 'select' }, options: TONES },
  size: { control: { type: 'range', min: 12, max: 64, step: 1 } },
  speed: { control: { type: 'range', min: 0, max: 4, step: 0.1 } },
};

export const InPanel: Story = () => (
  <Panel shape="terminal" tone="magenta" style={{ maxWidth: 480 }}>
    <div style={{ display: 'grid', gap: 18 }}>
      <BrailleLoader variant="bar" cells={16} tone="magenta" glitch size={20} label="BREACHING ICE" />
      <BrailleLoader variant="rain" cells={24} tone="teal" size={14} />
      <div style={row}>
        <BrailleLoader variant="spin" tone="yellow" glitch label="SYNC" />
        <BrailleLoader variant="pulse" tone="violet" label="UPLINK" />
      </div>
    </div>
  </Panel>
);
