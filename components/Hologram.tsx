'use client';

import styles from '@components/Hologram.module.css';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

export type HologramShape = 'diamond' | 'sphere' | 'torus' | 'knot' | 'icosahedron';

interface HologramProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: HologramShape;
  color?: string;
  accent?: string;
  height?: number | string;
  interactive?: boolean;
  autoRotate?: boolean;
}

function NeonShape({
  shape,
  color,
  accent,
  hovered,
  setHovered,
}: {
  shape: HologramShape;
  color: string;
  accent: string;
  hovered: boolean;
  setHovered: (b: boolean) => void;
}) {
  const ref = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.5;
    m.rotation.x += delta * 0.15;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
    m.scale.setScalar(pulse);
  });

  const geometry = (() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.4, 48, 48]} />;
      case 'torus':
        return <torusGeometry args={[1.2, 0.42, 24, 64]} />;
      case 'knot':
        return <torusKnotGeometry args={[1, 0.32, 120, 16]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 0]} />;
      case 'diamond':
      default:
        return <octahedronGeometry args={[1.5, 0]} />;
    }
  })();

  const c = hovered ? accent : color;

  return (
    <mesh ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {geometry}
      <meshStandardMaterial
        color={c}
        emissive={c}
        emissiveIntensity={hovered ? 0.95 : 0.4}
        metalness={0.6}
        roughness={0.2}
        wireframe={shape === 'icosahedron'}
      />
    </mesh>
  );
}

function HaloRing({ accent }: { accent: string }) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.4;
  });
  const dots = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x: Math.cos(a) * 2.7, y: Math.sin(a) * 2.7 };
  });
  return (
    <group ref={ref}>
      {dots.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
    </group>
  );
}

const Hologram: React.FC<HologramProps> = ({
  shape = 'diamond',
  color = '#00ffd1',
  accent = '#ff2d78',
  height = 360,
  interactive = true,
  autoRotate = true,
  style,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className={styles.root} style={{ height, ...style }} {...rest}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={40} color={color} />
        <NeonShape shape={shape} color={color} accent={accent} hovered={hovered} setHovered={setHovered} />
        <HaloRing accent={accent} />
        <Stars radius={60} depth={40} count={1200} factor={3} fade speed={1} />
        {interactive ? (
          <OrbitControls autoRotate={autoRotate} enableZoom={false} enablePan={false} autoRotateSpeed={0.6} />
        ) : null}
      </Canvas>
      <div className={styles.readout}>
        {shape.toUpperCase()} · {hovered ? 'HOVER' : 'DRAG TO ORBIT'}
      </div>
    </div>
  );
};

export default Hologram;
