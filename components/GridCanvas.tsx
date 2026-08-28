'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface GridCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  speed?: number; // scroll speed, rows per second
  color?: string; // grid line color
  horizon?: number; // 0..1 vertical position of the horizon
  sunColor?: string; // synthwave sun; 'transparent' to hide
}

const GridCanvas: React.FC<GridCanvasProps> = ({
  height,
  speed = 1.2,
  color = '#00ffd1',
  horizon = 0.42,
  sunColor = '#ff2d78',
  ...rest
}) => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const horizonY = h * horizon;
      const vanishX = w / 2;

      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, 'rgba(4, 7, 11, 0.98)');
      sky.addColorStop(1, 'rgba(8, 14, 23, 0.9)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, horizonY);

      // synthwave sun
      if (sunColor !== 'transparent') {
        const r = Math.min(w, h) * 0.16;
        const sun = ctx.createLinearGradient(0, horizonY - r, 0, horizonY + r * 0.1);
        sun.addColorStop(0, sunColor);
        sun.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = sun;
        ctx.beginPath();
        ctx.arc(vanishX, horizonY, r, Math.PI, 0);
        ctx.fill();
        // clip slats over the lower half of the sun
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, horizonY, w, h);
        ctx.clip();
        ctx.fillStyle = 'rgba(4, 7, 11, 0.92)';
        for (let i = 0; i < 6; i++) {
          const sy = horizonY + 2 + i * (r / 6);
          ctx.fillRect(0, sy, w, (r / 6) * (0.5 - i * 0.055));
        }
        ctx.restore();
      }

      // horizon glow
      const glow = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY);
      glow.addColorStop(0, 'rgba(0,0,0,0)');
      glow.addColorStop(1, hexToRgba(color, 0.35));
      ctx.fillStyle = glow;
      ctx.fillRect(0, horizonY - 40, w, 40);

      // ground
      const ground = ctx.createLinearGradient(0, horizonY, 0, h);
      ground.addColorStop(0, 'rgba(10, 17, 28, 0.85)');
      ground.addColorStop(1, 'rgba(4, 7, 11, 0.98)');
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // horizontal grid lines scrolling toward the viewer
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      const rows = 16;
      const scroll = (t * speed) % 1;
      for (let i = 0; i < rows; i++) {
        const p = (i + scroll) / rows;
        const y = horizonY + Math.pow(p, 2.4) * (h - horizonY);
        ctx.globalAlpha = (1 - p) * 0.75;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // vertical lines fanning from the vanishing point
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      const cols = 24;
      for (let i = 0; i <= cols; i++) {
        const xBottom = (i / cols) * w;
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(xBottom, h);
      }
      ctx.stroke();

      ctx.globalAlpha = 1;
    },
    [speed, color, horizon, sunColor],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default GridCanvas;
