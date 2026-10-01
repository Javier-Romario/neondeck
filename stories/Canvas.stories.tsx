import type { Story } from '@ladle/react';

import AsciiScene from '@components/AsciiScene';
import GridCanvas from '@components/GridCanvas';
import Panel from '@components/Panel';
import GlitchText from '@components/GlitchText';
import Hologram from '@components/Hologram';
import MatrixRain from '@components/MatrixRain';
import NeuralField from '@components/NeuralField';
import Radar from '@components/Radar';
import Waveform from '@components/Waveform';

export default {
  title: 'Canvas + 3D',
};

export const Grid: Story<{ color: string; horizon: number; sunColor: string }> = ({ color, horizon, sunColor }) => (
  <div style={{ maxWidth: 720 }}>
    <GridCanvas height={320} color={color} horizon={horizon} sunColor={sunColor} />
  </div>
);
Grid.args = { color: '#00ffd1', horizon: 0.42, sunColor: '#ff2d78' };

export const Rain: Story<{ color: string; fontSize: number }> = ({ color, fontSize }) => (
  <div style={{ maxWidth: 720 }}>
    <MatrixRain height={320} color={color} fontSize={fontSize} />
  </div>
);
Rain.args = { color: '#00ff9d', fontSize: 16 };

export const Field: Story<{ nodeCount: number; linkDistance: number }> = ({ nodeCount, linkDistance }) => (
  <div style={{ maxWidth: 720 }}>
    <NeuralField height={320} nodeCount={nodeCount} linkDistance={linkDistance} />
  </div>
);
Field.args = { nodeCount: 70, linkDistance: 110 };

export const Signal: Story<{ color: string; layers: number }> = ({ color, layers }) => (
  <div style={{ maxWidth: 720 }}>
    <Waveform height={240} color={color} layers={layers} />
  </div>
);
Signal.args = { color: '#00ffd1', layers: 3 };

export const Sweep: Story<{ color: string; sweepSpeed: number }> = ({ color, sweepSpeed }) => (
  <div style={{ maxWidth: 720 }}>
    <Radar height={320} color={color} sweepSpeed={sweepSpeed} />
  </div>
);
Sweep.args = { color: '#00ffd1', sweepSpeed: 0.4 };

export const Glitch: Story<{ text: string; color: string; intensity: number }> = ({ text, color, intensity }) => (
  <div style={{ maxWidth: 720 }}>
    <GlitchText text={text} color={color} fontSize={56} height={200} intensity={intensity} />
  </div>
);
Glitch.args = { text: 'NEONDECK', color: '#00ffd1', intensity: 6 };

export const Hologram3D: Story<{ shape: string; color: string }> = ({ shape, color }) => (
  <div style={{ maxWidth: 720 }}>
    <Hologram shape={shape as any} color={color} accent="#ff2d78" height={400} />
  </div>
);
Hologram3D.args = { shape: 'diamond', color: '#00ffd1' };
Hologram3D.argTypes = {
  shape: {
    options: ['diamond', 'sphere', 'torus', 'knot', 'icosahedron'],
    control: { type: 'select' },
  },
};

const TONES = ['teal', 'magenta', 'yellow', 'green', 'violet', 'orange', 'red', 'blue'] as const;

export const Ascii3D: Story<{
  shape: string;
  tone: string;
  accent: string;
  cell: number;
  edges: boolean;
  glitch: boolean;
  scanlines: boolean;
  glow: boolean;
  interactive: boolean;
}> = ({ shape, tone, accent, cell, edges, glitch, scanlines, glow, interactive }) => (
  <div style={{ maxWidth: 720 }}>
    <AsciiScene
      shape={shape as any}
      tone={tone as any}
      accent={accent as any}
      cell={cell}
      edges={edges}
      glitch={glitch}
      scanlines={scanlines}
      glow={glow}
      interactive={interactive}
      height={400}
      label="ASCII // TRANSPARENT"
    />
  </div>
);
Ascii3D.args = { shape: 'knot', tone: 'teal', accent: 'magenta', cell: 14, edges: true, glitch: true, scanlines: true, glow: true, interactive: false };
Ascii3D.argTypes = {
  shape: { options: ['knot', 'torus', 'sphere', 'diamond', 'icosahedron'], control: { type: 'select' } },
  tone: { options: TONES, control: { type: 'select' } },
  accent: { options: TONES, control: { type: 'select' } },
  cell: { control: { type: 'range', min: 8, max: 28, step: 1 } },
};

/** Sits inside a Panel like any other content — the glass shows through the glyphs. */
export const AsciiInPanel: Story = () => (
  <Panel shape="wipeout" tone="magenta" style={{ maxWidth: 720 }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 16 }}>
      <div>
        <strong style={{ letterSpacing: 2, textTransform: 'uppercase' }}>Ghost protocol</strong>
        <p style={{ margin: '8px 0 0', color: 'var(--theme-muted)' }}>
          Rendered to an offscreen target, then a shader swaps each cell for a glyph. Empty cells are alpha 0, so only the object is drawn — as text.
        </p>
      </div>
      <AsciiScene shape="torus" tone="magenta" accent="blue" height={260} cell={12} />
    </div>
  </Panel>
);
