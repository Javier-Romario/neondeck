'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface StarfieldProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  count?: number;
  speed?: number; // warp speed
}

interface Star {
  ux: number;
  uy: number;
  z: number;
}

function makeStar(): Star {
  const a = Math.random() * Math.PI * 2;
  return { ux: Math.cos(a), uy: Math.sin(a), z: 1 };
}

const Starfield: React.FC<StarfieldProps> = ({ height, color = '#00ffd1', count = 220, speed = 1, ...rest }) => {
  const stars = React.useRef<Star[] | null>(null);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (!stars.current) {
        stars.current = new Array(count).fill(0).map(() => makeStar());
      }
      const s = stars.current;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.max(w, h) * 0.62;

      ctx.clearRect(0, 0, w, h);

      for (const st of s) {
        const prevZ = st.z;
        st.z -= 0.02 * speed;
        if (st.z <= 0.04) {
          Object.assign(st, makeStar());
          continue;
        }
        const px = cx + (st.ux * R) / st.z;
        const py = cy + (st.uy * R) / st.z;
        const pp = cx + (st.ux * R) / prevZ;
        const ppy = cy + (st.uy * R) / prevZ;
        const alpha = Math.min(1, (1 - st.z) * 2);

        ctx.strokeStyle = hexToRgba(color, alpha);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pp, ppy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    },
    [count, speed, color],
  );

  return <CanvasShell draw={draw} height={height} {...rest} />;
};

export default Starfield;
