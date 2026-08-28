'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';

interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color?: string;
  accentA?: string; // left RGB split channel
  accentB?: string; // right RGB split channel
  fontSize?: number;
  height?: number | string;
  glitchRate?: number; // chance per frame of a slice glitch
  intensity?: number; // max offset, px
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  color = '#00ffd1',
  accentA = '#ff2d78',
  accentB = '#2de2ff',
  fontSize = 44,
  height = 160,
  glitchRate = 0.08,
  intensity = 6,
  ...rest
}) => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const fs = Math.min(fontSize, h * 0.6);
      ctx.font = `700 ${fs}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      const cx = w / 2;
      const cy = h / 2;

      // continuous micro-jitter + RGB split
      const jx = (Math.random() - 0.5) * intensity * 0.6;
      const jy = (Math.random() - 0.5) * intensity * 0.4;
      const split = intensity * 0.5;

      ctx.globalAlpha = 0.9;
      ctx.fillStyle = accentA;
      ctx.fillText(text, cx - split + jx, cy + jy);
      ctx.fillStyle = accentB;
      ctx.fillText(text, cx + split + jx, cy + jy);
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.fillText(text, cx + jx, cy + jy);

      // periodic slice glitch: displace horizontal bands
      if (Math.random() < glitchRate) {
        const bands = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < bands; i++) {
          const sy = Math.random() * h;
          const sh = 3 + Math.random() * 14;
          const dx = (Math.random() - 0.5) * intensity * 4;
          ctx.drawImage(ctx.canvas, 0, sy, w, sh, dx, sy, w, sh);
        }
      }
    },
    [text, color, accentA, accentB, fontSize, glitchRate, intensity],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default GlitchText;
