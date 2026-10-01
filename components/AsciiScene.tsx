'use client';

import styles from '@components/AsciiScene.module.css';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import type { HologramShape } from '@components/Hologram';
import type { NeonTone } from '@components/Ticker';

/** Glyph ramp, sparse → dense. Index 0 must be a space: empty cells render nothing. */
export const ASCII_RAMP = ' .:-=+*#%@';
/** Silhouette outline glyphs, indexed by gradient angle: vertical, diagonal, horizontal, anti-diagonal. */
export const EDGE_CHARS = '|/-\\';

interface AsciiSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Built-in shape; ignored when `children` supplies a custom scene. */
  shape?: HologramShape;
  /** Glyph colour for lit surfaces. */
  tone?: NeonTone;
  /** Glyph colour for shadowed surfaces and the outline. Default magenta. */
  accent?: NeonTone;
  /** Glyph ramp, sparse → dense. Keep index 0 a space. */
  characters?: string;
  /** Glyph cell height in px. Width follows the mono aspect (0.6). Default 14. */
  cell?: number;
  height?: number | string;
  /** Rotation speed multiplier. */
  speed?: number;
  interactive?: boolean;
  /** Sobel outline of the silhouette in `| / - \` glyphs. */
  edges?: boolean;
  /** Hash-ordered reveal of the cells on mount (ms). 0 disables. */
  reveal?: number;
  /** Periodic row tearing + channel split. */
  glitch?: boolean;
  /** Slow vertical scanline sweep. */
  scanlines?: boolean;
  /** Drop-shadow glow on the glyph layer. */
  glow?: boolean;
  /** Corner readout text. */
  label?: string;
  children?: React.ReactNode;
}

/* ---------------------------------------------------------------- shape */

function Shape({ shape, speed }: { shape: HologramShape; speed: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.6 * speed;
    m.rotation.x += delta * 0.22 * speed;
  });

  const geometry = (() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.5, 48, 48]} />;
      case 'torus':
        return <torusGeometry args={[1.25, 0.48, 32, 96]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.6, 0]} />;
      case 'diamond':
        return <octahedronGeometry args={[1.6, 0]} />;
      case 'knot':
      default:
        return <torusKnotGeometry args={[1.05, 0.34, 160, 24]} />;
    }
  })();

  return (
    <mesh ref={ref}>
      {geometry}
      <meshStandardMaterial color="#9a9a9a" roughness={0.45} metalness={0.1} flatShading={shape === 'diamond' || shape === 'icosahedron'} />
    </mesh>
  );
}

/* ---------------------------------------------------------------- glyph atlas */

const ASPECT = 0.6; // JetBrains Mono advance / em

function makeAtlas(chars: string, cellH: number): THREE.CanvasTexture {
  const dpr = 2;
  const cw = Math.round(cellH * ASPECT) * dpr;
  const ch = cellH * dpr;
  const c = document.createElement('canvas');
  c.width = cw * chars.length;
  c.height = ch;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(cellH * 0.92 * dpr)}px 'JetBrains Mono', ui-monospace, monospace`;
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], i * cw + cw / 2, ch / 2 + ch * 0.04);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

/* ---------------------------------------------------------------- shader */

const VERT = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uScene;
  uniform sampler2D uAtlas;
  uniform vec2 uRes;        // canvas px
  uniform vec2 uCell;       // cell px
  uniform float uRamp;      // ramp glyph count
  uniform float uEdge;      // edge glyph count (0 = off)
  uniform float uTime;
  uniform float uReveal;    // 0..1
  uniform float uGlitch;    // 0/1
  uniform float uScan;      // 0/1
  uniform vec3 uColA;       // lit
  uniform vec3 uColB;       // shadow / outline

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float lum(vec4 c) { return dot(c.rgb, vec3(0.3, 0.59, 0.11)); }
  vec4 cellSample(vec2 id) { return texture2D(uScene, (id + 0.5) * uCell / uRes); }

  void main() {
    vec2 px = gl_FragCoord.xy;
    vec2 id = floor(px / uCell);
    vec2 inCell = fract(px / uCell);

    // ---- glitch: a few random row bands tear sideways for a frame or two
    float slot = floor(uTime * 9.0);
    float bandOn = step(0.985, hash(vec2(slot, floor(id.y / 2.0)))) * uGlitch;
    float tear = floor((hash(vec2(id.y, slot)) - 0.5) * 14.0) * bandOn;
    vec2 sid = vec2(id.x + tear, id.y);

    vec4 s = cellSample(sid);
    float a = s.a;
    float l = lum(s);

    // ---- silhouette outline via alpha gradient (Sobel-lite)
    float ax = cellSample(sid + vec2(1.0, 0.0)).a - cellSample(sid - vec2(1.0, 0.0)).a;
    float ay = cellSample(sid + vec2(0.0, 1.0)).a - cellSample(sid - vec2(0.0, 1.0)).a;
    float edge = length(vec2(ax, ay));
    float isEdge = step(0.5, edge) * step(0.5, a) * step(0.5, uEdge);

    // ---- glyph index
    float rampIdx = floor(clamp(l, 0.0, 1.0) * (uRamp - 1.0) + 0.5);
    float ang = atan(ay, ax);                       // -pi..pi
    float bin = floor(mod((ang + 3.14159265) / 3.14159265 * 4.0 + 0.5, 4.0)); // 0 vertical, 1 diagonal, 2 horizontal, 3 anti-diagonal
    float edgeIdx = uRamp + bin;
    float idx = mix(rampIdx, edgeIdx, isEdge);

    // ---- rim sparkle: empty cells right outside the silhouette flicker faintly
    float nearRim = step(0.5, max(max(cellSample(sid + vec2(1.0, 0.0)).a, cellSample(sid - vec2(1.0, 0.0)).a),
                                  max(cellSample(sid + vec2(0.0, 1.0)).a, cellSample(sid - vec2(0.0, 1.0)).a)));
    float sparkle = (1.0 - step(0.5, a)) * nearRim * step(0.93, hash(id + floor(uTime * 6.0)));
    idx = mix(idx, 1.0, sparkle);                   // '.'
    float visible = max(step(0.5, a), sparkle);

    // ---- atlas lookup
    float total = uRamp + uEdge;
    vec2 auv = vec2((idx + inCell.x) / total, inCell.y);
    float g = texture2D(uAtlas, auv).a;

    // ---- colour: lit → tone, shadow/outline → accent; glitch splits channels
    vec3 col = mix(uColB, uColA, smoothstep(0.15, 0.85, l));
    col = mix(col, uColB, isEdge * 0.85);
    col = mix(col, vec3(col.r, col.b, col.g), bandOn * 0.8);

    // ---- scanline sweep + faint interlace
    float sweep = 1.0 + 0.35 * uScan * (1.0 - smoothstep(0.0, 0.06, abs(fract(uTime * 0.12) - px.y / uRes.y)));
    float interlace = 1.0 - 0.12 * uScan * mod(id.y, 2.0);

    // ---- reveal: cells appear in hash order
    float shown = step(hash(id * 0.37 + 7.0), uReveal);

    float alpha = g * visible * shown * (0.7 + 0.3 * max(l, isEdge)) * interlace * min(sweep, 1.25);
    alpha = mix(alpha, alpha * 0.45, sparkle);
    gl_FragColor = vec4(col * min(sweep, 1.25), alpha);
  }
`;

/* ---------------------------------------------------------------- pass */

interface PassProps {
  characters: string;
  cell: number;
  edges: boolean;
  reveal: number;
  glitch: boolean;
  scanlines: boolean;
  colA: THREE.Color;
  colB: THREE.Color;
}

function AsciiPass({ characters, cell, edges, reveal, glitch, scanlines, colA, colB }: PassProps) {
  const { gl, size } = useThree();
  const [fontsReady, setFontsReady] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    document.fonts?.load(`14px 'JetBrains Mono'`).then(() => live && setFontsReady(true), () => live && setFontsReady(true));
    return () => {
      live = false;
    };
  }, []);

  const atlas = React.useMemo(() => makeAtlas(characters + EDGE_CHARS, cell), [characters, cell, fontsReady]);
  React.useEffect(() => () => atlas.dispose(), [atlas]);

  const target = React.useMemo(() => {
    const dpr = gl.getPixelRatio();
    return new THREE.WebGLRenderTarget(Math.max(1, size.width * dpr), Math.max(1, size.height * dpr), {
      format: THREE.RGBAFormat,
      depthBuffer: true,
    });
  }, [gl, size.width, size.height]);
  React.useEffect(() => () => target.dispose(), [target]);

  const material = React.useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uScene: { value: null },
          uAtlas: { value: null },
          uRes: { value: new THREE.Vector2(1, 1) },
          uCell: { value: new THREE.Vector2(8, 14) },
          uRamp: { value: 10 },
          uEdge: { value: 4 },
          uTime: { value: 0 },
          uReveal: { value: 1 },
          uGlitch: { value: 1 },
          uScan: { value: 1 },
          uColA: { value: new THREE.Color() },
          uColB: { value: new THREE.Color() },
        },
      }),
    [],
  );
  React.useEffect(() => () => material.dispose(), [material]);

  const quad = React.useMemo(() => {
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    return { scene, camera };
  }, [material]);

  const start = React.useRef<number | null>(null);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useFrame((state) => {
    const { gl, scene, camera, clock } = state;
    const dpr = gl.getPixelRatio();
    const u = material.uniforms;

    gl.setRenderTarget(target);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.clear();

    if (start.current === null) start.current = clock.elapsedTime;
    const t = clock.elapsedTime;
    const elapsed = (t - start.current) * 1000;

    u.uScene.value = target.texture;
    u.uAtlas.value = atlas;
    u.uRes.value.set(size.width * dpr, size.height * dpr);
    u.uCell.value.set(Math.round(cell * ASPECT) * dpr, cell * dpr);
    u.uRamp.value = characters.length;
    u.uEdge.value = edges ? EDGE_CHARS.length : 0;
    u.uTime.value = reduced ? 0 : t;
    u.uReveal.value = reveal > 0 && !reduced ? Math.min(1, elapsed / reveal) : 1;
    u.uGlitch.value = glitch && !reduced ? 1 : 0;
    u.uScan.value = scanlines && !reduced ? 1 : 0;
    u.uColA.value.copy(colA);
    u.uColB.value.copy(colB);

    gl.render(quad.scene, quad.camera);
  }, 1);

  return null;
}

/* ---------------------------------------------------------------- component */

/** Read the resolved CSS colour of a probe element (custom properties with light-dark() only resolve on use). */
function useProbeColor(ref: React.RefObject<HTMLElement | null>): THREE.Color {
  const [color, setColor] = React.useState(() => new THREE.Color('#00ffd1'));
  React.useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      const c = getComputedStyle(ref.current).color;
      setColor((prev) => {
        const next = new THREE.Color().setStyle(c);
        return prev.equals(next) ? prev : next;
      });
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    const mq = window.matchMedia?.('(prefers-color-scheme: light)');
    mq?.addEventListener?.('change', read);
    return () => {
      mo.disconnect();
      mq?.removeEventListener?.('change', read);
    };
  }, [ref]);
  return color;
}

const AsciiScene: React.FC<AsciiSceneProps> = ({
  shape = 'knot',
  tone = 'teal',
  accent = 'magenta',
  characters = ASCII_RAMP,
  cell = 14,
  height = 320,
  speed = 1,
  interactive = false,
  edges = true,
  reveal = 1400,
  glitch = true,
  scanlines = true,
  glow = true,
  label,
  children,
  className,
  style,
  ...rest
}) => {
  const probeA = React.useRef<HTMLSpanElement>(null);
  const probeB = React.useRef<HTMLSpanElement>(null);
  const colA = useProbeColor(probeA);
  const colB = useProbeColor(probeB);

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-glow={glow || undefined}
      style={{ height, ...style }}
      {...rest}
    >
      {/* colour probes: resolve --tone for each tone through the cascade */}
      <span ref={probeA} className={styles.probe} data-tone={tone} aria-hidden="true" />
      <span ref={probeB} className={styles.probe} data-tone={accent} aria-hidden="true" />
      <Canvas
        gl={{ alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 6]} intensity={6} />
        <directionalLight position={[-5, -2, 3]} intensity={1.2} />
        {children ?? <Shape shape={shape} speed={speed} />}
        {interactive ? <OrbitControls enableZoom={false} enablePan={false} /> : null}
        <AsciiPass
          characters={characters}
          cell={cell}
          edges={edges}
          reveal={reveal}
          glitch={glitch}
          scanlines={scanlines}
          colA={colA}
          colB={colB}
        />
      </Canvas>
      {label ? <div className={styles.readout}>{label}</div> : null}
    </div>
  );
};

export default AsciiScene;
