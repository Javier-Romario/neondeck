import styles from '@components/Panel.module.css';

import * as React from 'react';

import { shapePaths, PANEL_SHAPES } from '@common/shape';
import type { Cuts, PanelShape } from '@common/shape';
import type { NeonTone } from '@components/Ticker';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Named preset, or a custom `Cuts` spec (corner chamfers + edge notches). */
  shape?: PanelShape | Cuts;
  tone?: NeonTone;
  /** Edge ring width in px. */
  border?: number;
  /** Turn the neon halo + neumorphic drop shadow off. */
  flat?: boolean;
  /** Clip children to the inset shape so nothing pokes out of a cut. Default true. */
  clipContent?: boolean;
  children?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({
  shape = 'chamfer',
  tone = 'teal',
  border = 1.5,
  flat = false,
  clipContent = true,
  children,
  className,
  style,
  ...rest
}) => {
  const cuts = typeof shape === 'string' ? PANEL_SHAPES[shape] : shape;
  const paths = shapePaths(cuts, border);

  const vars = {
    '--panel-outer': paths.outer,
    '--panel-inner': paths.inner,
    '--panel-ring': paths.ring,
    '--panel-halo': paths.halo,
    '--panel-border': `${border}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={[styles.panel, className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-flat={flat || undefined}
      style={vars}
      {...rest}
    >
      {/* layers are siblings of .glass: an ancestor filter/clip-path would
          turn into a backdrop root and kill the frosted blur */}
      <span className={styles.halo} aria-hidden="true">
        <span className={styles.silhouette} />
      </span>
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.glass} aria-hidden="true" />
      <div className={styles.content} data-clip={clipContent || undefined}>{children}</div>
    </div>
  );
};

export default Panel;
