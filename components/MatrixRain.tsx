'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';

const KATAKANA =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFXYZ';

interface MatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  fontSize?: number;
  speed?: number;
  density?: number; // 0..1 — fraction of columns active per frame
}

interface RainState {
  cols: number;
  drops: number[];
  speeds: number[];
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  height,
  color = '#00ff9d',
  fontSize = 16,
  speed = 1,
  density = 0.9,
  ...rest
}) => {
  const state = React.useRef<RainState | null>(null);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const cols = Math.max(1, Math.floor(w / fontSize));
      if (!state.current || state.current.cols !== cols) {
        const drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -40));
        const speeds = new Array(cols).fill(0).map(() => 0.4 + Math.random() * 0.9);
        state.current = { cols, drops, speeds };
      }
      const s = state.current;

      // translucent fade leaves ghost trails
      ctx.fillStyle = 'rgba(4, 7, 11, 0.14)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < s.cols; i++) {
        if (Math.random() > density) continue;
        const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        const x = i * fontSize;
        const y = s.drops[i] * fontSize;
        ctx.fillStyle = color;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.975) {
          s.drops[i] = 0;
        } else {
          s.drops[i] += s.speeds[i] * speed;
        }
      }
    },
    [color, fontSize, speed, density],
  );

  return <CanvasShell draw={draw} height={height} fps={30} {...rest} />;
};

export default MatrixRain;
