'use client';

import styles from '@components/NeonTunnel.module.css';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface NeonTunnelProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  color?: string;
  accent?: string;
  speed?: number; // forward fly speed
  rings?: number;
}

const DEPTH = 48;

function Tunnel({ rings, speed, color, accent }: { rings: number; speed: number; color: string; accent: string }) {
  const group = React.useRef<THREE.Group>(null);

  const data = React.useMemo(
    () =>
      Array.from({ length: rings }, (_, i) => ({
        z: -i * (DEPTH / rings),
        radius: 1.2 + (i % 4) * 0.55,
        useAccent: i % 3 === 1,
      })),
    [rings],
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    for (const child of g.children) {
      child.position.z += speed * delta;
      if (child.position.z > 5) child.position.z -= DEPTH;
    }
  });

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <mesh key={i} position={[0, 0, d.z]}>
          <torusGeometry args={[d.radius, 0.025, 8, 72]} />
          <meshBasicMaterial color={d.useAccent ? accent : color} />
        </mesh>
      ))}
    </group>
  );
}

const NeonTunnel: React.FC<NeonTunnelProps> = ({
  height = 360,
  color = '#00ffd1',
  accent = '#ff2d78',
  speed = 6,
  rings = 40,
  style,
  ...rest
}) => {
  return (
    <div className={styles.root} style={{ height, ...style }} {...rest}>
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }} dpr={[1, 2]}>
        <color attach="background" args={['#04070b']} />
        <Tunnel rings={rings} speed={speed} color={color} accent={accent} />
        <Stars radius={80} depth={60} count={2000} factor={4} fade speed={2} />
      </Canvas>
      <div className={styles.readout}>NEON TUNNEL · {Math.round(speed * 10)} KM/S</div>
    </div>
  );
};

export default NeonTunnel;
