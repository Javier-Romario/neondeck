import * as React from 'react';

export type CanvasDrawFn = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  frame: number,
) => void;

/**
 * Owns a <canvas>'s DPR-aware sizing + rAF loop and calls the latest `draw`
 * every frame. `draw` is stored in a ref so prop changes never restart the
 * loop — only `fps` does.
 */
export function useCanvas(draw: CanvasDrawFn, fps = 60) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const drawRef = React.useRef<CanvasDrawFn>(draw);

  React.useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let frame = 0;
    const start = performance.now();
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const interval = 1000 / fps;
      if (now - last < interval) return;
      last = now - ((now - last) % interval);
      frame += 1;
      const rect = canvas.getBoundingClientRect();
      drawRef.current(ctx, rect.width, rect.height, (now - start) / 1000, frame);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [fps]);

  return canvasRef;
}
