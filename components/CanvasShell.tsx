'use client';

import styles from '@components/CanvasShell.module.css';

import * as React from 'react';
import { useCanvas, type CanvasDrawFn } from '@common/useCanvas';

interface CanvasShellProps extends React.HTMLAttributes<HTMLDivElement> {
  draw: CanvasDrawFn;
  fps?: number;
  height?: number | string;
  children?: React.ReactNode;
}

const CanvasShell: React.FC<CanvasShellProps> = ({ draw, fps, height = 240, style, children, ...rest }) => {
  const canvasRef = useCanvas(draw, fps);

  return (
    <div className={styles.root} style={{ height, ...style }} {...rest}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {children}
    </div>
  );
};

export default CanvasShell;
