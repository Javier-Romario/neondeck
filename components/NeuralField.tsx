'use client';

import * as React from 'react';
import CanvasShell from '@components/CanvasShell';
import { hexToRgba } from '@common/color';

interface NeuralFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  nodeCount?: number;
  linkDistance?: number;
  nodeRadius?: number;
  speed?: number;
  interactive?: boolean; // pointer repels nodes
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface FieldState {
  w: number;
  h: number;
  nodes: Particle[];
}

const NeuralField: React.FC<NeuralFieldProps> = ({
  height,
  color = '#00ffd1',
  nodeCount = 70,
  linkDistance = 110,
  nodeRadius = 2,
  speed = 1,
  interactive = true,
  ...rest
}) => {
  const state = React.useRef<FieldState | null>(null);
  const mouse = React.useRef<{ x: number; y: number } | null>(null);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (!state.current || state.current.w !== w || state.current.h !== h) {
        const nodes = new Array(nodeCount).fill(0).map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        }));
        state.current = { w, h, nodes };
      }
      const s = state.current;

      ctx.clearRect(0, 0, w, h);

      // integrate + wrap
      for (const n of s.nodes) {
        n.x += n.vx * speed;
        n.y += n.vy * speed;

        if (interactive && mouse.current) {
          const dx = n.x - mouse.current.x;
          const dy = n.y - mouse.current.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 0.001) {
            const d = Math.sqrt(d2);
            const f = ((120 - d) / 120) * 0.8;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }

        n.vx *= 0.995;
        n.vy *= 0.995;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 1.2) {
          n.vx = (n.vx / sp) * 1.2;
          n.vy = (n.vy / sp) * 1.2;
        }
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i];
          const b = s.nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.4;
            ctx.strokeStyle = hexToRgba(color, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.fillStyle = color;
      for (const n of s.nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [nodeCount, linkDistance, nodeRadius, speed, interactive, color],
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onPointerLeave = () => {
    mouse.current = null;
  };

  return (
    <CanvasShell
      draw={draw}
      height={height}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerLeave={interactive ? onPointerLeave : undefined}
      {...rest}
    />
  );
};

export default NeuralField;
