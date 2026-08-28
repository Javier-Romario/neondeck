'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  speed?: number;
  amplitude?: number; // 0..1 fraction of half-height
  layers?: number;
  glitch?: number; // 0..1 chance per frame of a glitch spike
}

const Waveform: React.FC<WaveformProps> = ({
  height,
  color = '#00ffd1',
  speed = 1,
  amplitude = 0.32,
  layers = 3,
  glitch = 0.08,
  ...rest
}) => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);

      // faint baseline grid
      ctx.strokeStyle = 'rgba(95, 143, 136, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      const mid = h / 2;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;

      for (let L = 0; L < layers; L++) {
        const freq = 1 + L * 2.3;
        const amp = (amplitude * h * 0.5) / (1 + L * 0.6);
        ctx.strokeStyle = L === 0 ? color : hexToRgba(color, Math.max(0.05, 0.4 - L * 0.1));
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const nx = x / w;
          const y =
            mid +
            Math.sin(nx * Math.PI * 2 * freq + t * speed * 2) * amp +
            Math.sin(nx * Math.PI * 6 + t * speed * 4) * amp * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // glitch spikes
      if (Math.random() < glitch) {
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + (Math.random() - 0.5) * 60, gy + (Math.random() - 0.5) * 60);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.shadowBlur = 0;
    },
    [color, speed, amplitude, layers, glitch],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default Waveform;
