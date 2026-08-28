'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface SpectrumProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  bars?: number;
  speed?: number; // lerp speed toward targets
  glow?: boolean;
}

interface SpectrumState {
  targets: number[];
  values: number[];
}

const Spectrum: React.FC<SpectrumProps> = ({
  height,
  color = '#00ffd1',
  bars = 48,
  speed = 0.12,
  glow = true,
  ...rest
}) => {
  const state = React.useRef<SpectrumState | null>(null);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (!state.current) {
        state.current = {
          targets: new Array(bars).fill(0.2),
          values: new Array(bars).fill(0.1),
        };
      }
      const s = state.current;

      for (let i = 0; i < bars; i++) {
        if (Math.random() < 0.05) s.targets[i] = 0.15 + Math.random() * 0.85;
        s.values[i] += (s.targets[i] - s.values[i]) * speed;
      }

      ctx.clearRect(0, 0, w, h);
      const gap = Math.max(1, (w / bars) * 0.22);
      const bw = (w - gap * (bars - 1)) / bars;

      for (let i = 0; i < bars; i++) {
        const bh = s.values[i] * h * 0.85;
        const x = i * (bw + gap);
        const y = h - bh;
        if (glow) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
        }
        const grad = ctx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, color);
        grad.addColorStop(1, hexToRgba(color, 0.15));
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, bw, bh);
        ctx.shadowBlur = 0;
      }
    },
    [bars, speed, glow, color],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default Spectrum;
