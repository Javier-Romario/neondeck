'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface HexGridProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  size?: number; // hex radius
  pulseRate?: number; // pulse waves per second
  glow?: boolean;
}

const HexGrid: React.FC<HexGridProps> = ({
  height,
  color = '#00ffd1',
  size = 26,
  pulseRate = 0.4,
  glow = true,
  ...rest
}) => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);

      const rowH = Math.sqrt(3) * size;
      const colW = 1.5 * size;
      const cols = Math.ceil(w / colW) + 2;
      const rows = Math.ceil(h / rowH) + 2;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(w, h) * 0.7;
      const waveR = ((t * pulseRate) % 1) * maxR;

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * colW;
          const y = r * rowH + (c % 2 ? rowH / 2 : 0);
          const d = Math.hypot(x - cx, y - cy);
          const inWave = Math.abs(d - waveR) < size * 1.7;

          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI / 3) * k;
            const px = x + size * Math.cos(a);
            const py = y + size * Math.sin(a);
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          if (inWave && glow) {
            ctx.strokeStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.fillStyle = hexToRgba(color, 0.07);
            ctx.fill();
          } else {
            ctx.strokeStyle = hexToRgba(color, 0.28);
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 0;
    },
    [color, size, pulseRate, glow],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default HexGrid;
