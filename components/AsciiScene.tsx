'use client';

import styles from '@components/AsciiScene.module.css';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AsciiRenderer, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import type { HologramShape } from '@components/Hologram';
import type { NeonTone } from '@components/Ticker';

/**
 * Default ramp. Must start with a space: three's AsciiEffect treats fully
 * transparent pixels as brightness 1 → index 0, so the empty canvas becomes
 * blank text and the page shows through.
 */
export const ASCII_RAMP = ' .:-+*=%@#';

interface AsciiSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Built-in shape; ignored when `children` supplies a custom scene. */
  shape?: HologramShape;
  tone?: NeonTone;
  /** Character ramp, sparse → dense. Keep index 0 a space for transparency. */
  characters?: string;
  /** Cells per canvas pixel. Lower = chunkier glyphs. Default 0.18. */
  resolution?: number;
  /** Flip the ramp (dense where lit). Breaks the transparent background. */
  invert?: boolean;
  height?: number | string;
  /** Rotation speed multiplier. */
  speed?: number;
  interactive?: boolean;
  /** Neon text-shadow on the glyphs. */
  glow?: boolean;
  /** Corner readout text. */
  label?: string;
  children?: React.ReactNode;
}

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

  // dark body + rim light: dark → dense glyphs, highlights → sparse, background → space
  return (
    <mesh ref={ref}>
      {geometry}
      <meshStandardMaterial color="#5a5a5a" roughness={0.5} metalness={0.1} flatShading={shape === 'diamond' || shape === 'icosahedron'} />
    </mesh>
  );
}

/** drei's AsciiRenderer reads the canvas on its first frame, which can land
 *  before its own setSize effect; wait for a measured viewport first. */
function Ascii(props: React.ComponentProps<typeof AsciiRenderer>) {
  const ready = useThree((s) => s.size.width > 0 && s.size.height > 0);
  return ready ? <AsciiRenderer {...props} /> : null;
}

const AsciiScene: React.FC<AsciiSceneProps> = ({
  shape = 'knot',
  tone = 'teal',
  characters = ASCII_RAMP,
  resolution = 0.18,
  invert = false,
  height = 320,
  speed = 1,
  interactive = false,
  glow = true,
  label,
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-glow={glow || undefined}
      style={{ height, ...style }}
      {...rest}
    >
      <Canvas
        gl={{ alpha: true, antialias: false, premultipliedAlpha: false }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={1}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 6]} intensity={7} />
        <directionalLight position={[-5, -2, 3]} intensity={1.2} />
        {children ?? <Shape shape={shape} speed={speed} />}
        {interactive ? <OrbitControls enableZoom={false} enablePan={false} /> : null}
        {/* colour comes from the wrapper via currentColor; bg stays transparent */}
        <Ascii bgColor="transparent" fgColor="currentColor" characters={characters} invert={invert} resolution={resolution} />
      </Canvas>
      {label ? <div className={styles.readout}>{label}</div> : null}
    </div>
  );
};

export default AsciiScene;
