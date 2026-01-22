import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
import ChaosSphere from './ChaosSphere';
import ParticleField from './ParticleField';

interface Scene3DProps {
  scrollProgress: number;
  isGlitching: boolean;
  mousePosition: { x: number; y: number };
  scrollSpeed?: number;
}

function Effects({ isGlitching, scrollSpeed = 0 }: { isGlitching: boolean; scrollSpeed?: number }) {
  const offset = useMemo(() => {
    const glitchAmount = isGlitching ? 0.008 : 0.001;
    const scrollGlitch = Math.min(scrollSpeed * 0.003, 0.004);
    return new Vector2(glitchAmount + scrollGlitch, glitchAmount + scrollGlitch);
  }, [isGlitching, scrollSpeed]);

  return (
    <EffectComposer>
      <Bloom
        intensity={2}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        height={300}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={offset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.04} />
      <Vignette eskil={false} offset={0.1} darkness={0.7} />
    </EffectComposer>
  );
}

export default function Scene3D({ scrollProgress, isGlitching, mousePosition, scrollSpeed = 0 }: Scene3DProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#050508']} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff0080" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#00ffff" />
          <pointLight position={[0, 0, 6]} intensity={0.6} color="#8000ff" />
          
          <ChaosSphere 
            scrollProgress={scrollProgress}
            isGlitching={isGlitching}
            mousePosition={mousePosition}
            scrollSpeed={scrollSpeed}
          />
          
          <ParticleField scrollProgress={scrollProgress} />
          
          <Effects isGlitching={isGlitching} scrollSpeed={scrollSpeed} />
        </Suspense>
      </Canvas>
    </div>
  );
}
