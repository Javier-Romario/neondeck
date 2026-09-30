import type { Story } from '@ladle/react';

import * as React from 'react';

import Panel from '@components/Panel';
import { PANEL_SHAPES } from '@common/shape';
import type { Cuts, PanelShape } from '@common/shape';

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export default {
  title: 'Panel',
};

const backdrop: React.CSSProperties = {
  padding: 32,
  background:
    'repeating-linear-gradient(45deg, rgba(0,255,209,0.14) 0 2px, transparent 2px 18px), linear-gradient(135deg, #0a1a24, #1a0a24)',
};

export const Presets: Story<{ tone: string; border: number; flat: boolean }> = ({ tone, border, flat }) => (
  <div style={{ ...backdrop, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
    {(Object.keys(PANEL_SHAPES) as PanelShape[]).map((shape) => (
      <Panel key={shape} shape={shape} tone={tone as any} border={border} flat={flat} style={{ minHeight: 160 }}>
        <strong style={{ letterSpacing: 2, textTransform: 'uppercase' }}>{shape}</strong>
        <p style={{ margin: '8px 0 0' }}>Every edge is horizontal, vertical or 45°. No square corners.</p>
      </Panel>
    ))}
  </div>
);
Presets.args = { tone: 'teal', border: 1.5, flat: false };
Presets.argTypes = {
  tone: { control: { type: 'select' }, options: TONES },
};

const CUSTOM: Cuts = {
  tl: 26,
  tr: 10,
  br: 26,
  bl: 10,
  top: [
    { at: 70, width: 24, depth: 6 },
    { at: 110, width: 40, depth: 10 },
    { at: '85%', anchor: 'end', width: 60, depth: 8 },
  ],
  right: [{ at: '50%', anchor: 'center', width: 36, depth: 9 }],
};

export const CustomCuts: Story<{ tone: string }> = ({ tone }) => (
  <div style={backdrop}>
    <Panel shape={CUSTOM} tone={tone as any} style={{ maxWidth: 520, minHeight: 200 }}>
      Multiple 45° notches per side via a <code>Cuts</code> spec.
    </Panel>
  </div>
);
CustomCuts.args = { tone: 'magenta' };
CustomCuts.argTypes = { tone: { control: { type: 'select' }, options: TONES } };
