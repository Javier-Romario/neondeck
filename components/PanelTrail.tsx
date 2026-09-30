import styles from "@components/PanelTrail.module.css";

import * as React from "react";

import Panel from "@components/Panel";
import Ticker, { NeonTone } from "@components/Ticker";

export interface TrailProps {
  /**
   * Lead-line route, walking *away* from the panel. Space-separated segments:
   * `h<px>` horizontal, `u<px>` / `d<px>` 45° up / down (px is horizontal extent).
   * Default `'h20 u14 h28 d14 h20'`.
   */
  route?: string;
  /** Where the line leaves the panel edge: fraction of height (0–1) or px from top. Default 0.5. */
  anchor?: number;
  tone?: NeonTone;
  /** Cap width in px. Default 180. */
  capWidth?: number;
  /** Cap height in px. Default 26. */
  capHeight?: number;
  /** Omit the ticker cap — just the line. */
  noCap?: boolean;
  items?: string[];
  label?: string;
  speed?: number;
  direction?: "left" | "right";
}

interface PanelTrailProps extends TrailProps {
  /** Which side of the panel the trail sits on. */
  side: "before" | "after";
}

const PAD = 6; // room for glow + bend nodes

type Seg = { kind: "h" | "u" | "d"; len: number };

function parseRoute(route: string): Seg[] {
  const out: Seg[] = [];
  for (const tok of route.trim().split(/\s+/)) {
    const m = /^([hud])(\d+(?:\.\d+)?)$/i.exec(tok);
    if (m)
      out.push({
        kind: m[1].toLowerCase() as Seg["kind"],
        len: parseFloat(m[2]),
      });
  }
  return out;
}

const PanelTrail: React.FC<PanelTrailProps> = ({
  side,
  route = "h20 u14 h28 d14 h20",
  anchor = 0.5,
  tone = "teal",
  capWidth = 180,
  capHeight = 26,
  noCap = false,
  items = [],
  label,
  speed = 18,
  direction,
}) => {
  const segs = parseRoute(route);

  // walk the route from (0,0) — panel edge — outward
  const pts: [number, number][] = [[0, 0]];
  let x = 0;
  let y = 0;
  for (const s of segs) {
    x += s.len;
    if (s.kind === "u") y -= s.len;
    if (s.kind === "d") y += s.len;
    pts.push([x, y]);
  }
  const yEnd = y;
  const capH = noCap ? 0 : capHeight;

  const ys = pts.map((p) => p[1]);
  const yMin = Math.min(...ys, yEnd - capH / 2);
  const yMax = Math.max(...ys, yEnd + capH / 2);
  const svgW = x;
  const svgH = yMax - yMin + PAD * 2;
  const shift = -yMin + PAD;

  const points = pts.map(([px, py]) => `${px},${py + shift}`).join(" ");
  const bends = pts.slice(1, -1);

  // the whole trail is positioned so the line origin lands on the anchor
  const originY = shift; // y of the first point inside the svg
  const anchorCss = anchor <= 1 ? `${anchor * 100}%` : `${anchor}px`;

  const rowStyle = {
    "--trail-origin": `${originY}px`,
    "--trail-anchor": anchorCss,
    width: svgW + (noCap ? 0 : capWidth),
  } as React.CSSProperties;

  const flip = side === "before";
  const half = capH / 2;
  // pointed end faces the line; small chamfers on the far end
  const capShape = flip
    ? { tr: half, br: half, tl: 5, bl: 5 }
    : { tl: half, bl: half, tr: 5, br: 5 };

  return (
    <div
      className={styles.trail}
      data-side={side}
      data-tone={tone}
      style={rowStyle}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <svg
          className={styles.line}
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={flip ? { transform: "scaleX(-1)" } : undefined}
        >
          <polyline points={points} />
          {bends.map(([bx, by], i) => (
            <rect
              key={i}
              x={bx - 2}
              y={by + shift - 2}
              width={4}
              height={4}
              transform={`rotate(45 ${bx} ${by + shift})`}
            />
          ))}
        </svg>
        {noCap ? null : (
          <Panel
            shape={capShape}
            tone={tone}
            border={1}
            className={styles.cap}
            style={
              {
                width: capWidth,
                height: capH,
                marginTop: yEnd + shift - half,
                "--panel-pad": "0",
              } as React.CSSProperties
            }
          >
            <Ticker
              className={styles.ticker}
              items={items}
              label={label}
              tone={tone}
              speed={speed}
              direction={direction}
            />
          </Panel>
        )}
      </div>
    </div>
  );
};

export default PanelTrail;
