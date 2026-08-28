import type { Story } from '@ladle/react';

import GridCanvas from '@components/GridCanvas';
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
