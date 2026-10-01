'use client';

import styles from '@components/CRTOverlay.module.css';

import * as React from 'react';
import { useCanvas } from '@common/useCanvas';
import { withAlpha } from '@common/theme';
import type { CanvasTheme } from '@common/theme';

interface CRTOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  scanlines?: number; // 0..1 opacity
  flicker?: number; // 0..1 chance per frame
  vignette?: number; // 0..1 strength
  noise?: number; // 0..1 amount
  roll?: boolean; // rolling brightness band
  children?: React.ReactNode;
}

const CRTOverlay: React.FC<CRTOverlayProps> = ({
  height = '100%',
  scanlines = 0.5,
  flicker = 0.05,
  vignette = 0.6,
  noise = 0.35,
  roll = true,
  style,
  children,
  ...rest
}) => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _frame: number, theme: CanvasTheme) => {
      ctx.clearRect(0, 0, w, h);

      // scanlines
      if (scanlines > 0) {
        ctx.fillStyle = withAlpha(theme.shade, scanlines * 0.5);
        for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
      }

      // rolling brightness band
      if (roll) {
        const bandY = ((t * 45) % (h + 200)) - 100;
        const grad = ctx.createLinearGradient(0, bandY - 40, 0, bandY + 40);
        grad.addColorStop(0, withAlpha(theme.text, 0));
        grad.addColorStop(0.5, withAlpha(theme.text, 0.06));
        grad.addColorStop(1, withAlpha(theme.text, 0));
        ctx.fillStyle = grad;
        ctx.fillRect(0, bandY - 40, w, 80);
      }

      // noise
      if (noise > 0) {
        const n = Math.floor(w * h * noise * 0.002);
        for (let i = 0; i < n; i++) {
          ctx.fillStyle = Math.random() < 0.5 ? withAlpha(theme.text, 0.25) : withAlpha(theme.shade, 0.3);
          ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
        }
      }

      // vignette
      if (vignette > 0) {
        const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
        vg.addColorStop(0, withAlpha(theme.shade, 0));
        vg.addColorStop(1, withAlpha(theme.shade, vignette));
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, w, h);
      }

      // flicker
      if (flicker > 0 && Math.random() < flicker) {
        ctx.fillStyle = Math.random() < 0.5 ? withAlpha(theme.text, 0.04) : withAlpha(theme.shade, 0.08);
        ctx.fillRect(0, 0, w, h);
      }
    },
    [scanlines, flicker, vignette, noise, roll],
  );

  const canvasRef = useCanvas(draw, 30);

  return (
    <div className={styles.root} style={{ height, ...style }} {...rest}>
      {children}
      <canvas ref={canvasRef} className={styles.overlay} />
    </div>
  );
};

export default CRTOverlay;
