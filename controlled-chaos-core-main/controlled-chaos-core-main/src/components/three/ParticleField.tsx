import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  scrollProgress: number;
}

export default function ParticleField({ count = 2000, scrollProgress }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorA = new THREE.Color('#ff0080');
    const colorB = new THREE.Color('#00ffff');
    const colorC = new THREE.Color('#8000ff');
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random color between three main colors
      const mixFactor = Math.random();
      const color = mixFactor < 0.33 
        ? colorA.clone().lerp(colorB, Math.random())
        : mixFactor < 0.66 
          ? colorB.clone().lerp(colorC, Math.random())
          : colorC.clone().lerp(colorA, Math.random());
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = Math.random() * 3 + 1;
    }
    
    return { positions, colors, sizes };
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
    
    // Expand based on scroll
    const scale = 1 + scrollProgress * 0.5;
    pointsRef.current.scale.setScalar(scale);
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
