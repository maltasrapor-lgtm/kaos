import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ChaosSphereProps {
  scrollProgress: number;
  isGlitching: boolean;
  mousePosition: { x: number; y: number };
  scrollSpeed?: number;
}

const vertexShader = `
  uniform float uTime;
  uniform float uGlitchIntensity;
  uniform float uScrollProgress;
  uniform float uScrollSpeed;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Base noise displacement - enhanced
    float noiseFreq = 1.5 + uScrollProgress * 1.5;
    float noiseAmp = 0.12 + uGlitchIntensity * 0.25 + uScrollSpeed * 0.1;
    float noise = snoise(vec3(pos.x * noiseFreq + uTime * 0.25, pos.y * noiseFreq + uTime * 0.15, pos.z * noiseFreq + uTime * 0.1));
    
    // Enhanced heartbeat pulse - double beat
    float heartbeat1 = sin(uTime * 2.5) * 0.5 + 0.5;
    heartbeat1 = pow(heartbeat1, 4.0);
    float heartbeat2 = sin(uTime * 2.5 + 0.3) * 0.5 + 0.5;
    heartbeat2 = pow(heartbeat2, 6.0) * 0.5;
    float pulse = (heartbeat1 + heartbeat2) * 0.08 * (1.0 + uScrollProgress * 0.5);
    
    // Mouse influence - more responsive
    float mouseInfluence = (uMouse.x * pos.x + uMouse.y * pos.y) * 0.15;
    
    // Scroll-based glitch
    float scrollGlitch = uScrollSpeed * snoise(vec3(pos.xy * 8.0, uTime * 3.0)) * 0.15;
    
    // Glitch displacement
    float glitchNoise = 0.0;
    if (uGlitchIntensity > 0.0) {
      glitchNoise = snoise(vec3(pos.x * 12.0, pos.y * 12.0, uTime * 6.0)) * uGlitchIntensity * 0.25;
    }
    
    float displacement = noise * noiseAmp + pulse + mouseInfluence + glitchNoise + scrollGlitch;
    vDisplacement = displacement;
    
    pos += normal * displacement;
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uGlitchIntensity;
  uniform float uScrollProgress;
  uniform float uScrollSpeed;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  void main() {
    // Enhanced fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 2.5);
    
    // Dynamic color shift - magenta to cyan based on time and position
    float colorShift = sin(uTime * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5;
    vec3 shiftedColorA = mix(uColorA, uColorB, colorShift * 0.3);
    vec3 shiftedColorB = mix(uColorB, uColorA, colorShift * 0.3);
    
    // Color mixing based on scroll and displacement
    vec3 colorMix = mix(shiftedColorA, shiftedColorB, vDisplacement * 2.5 + 0.5);
    colorMix = mix(colorMix, uColorC, uScrollProgress * 0.6);
    
    // Enhanced fresnel glow with color shift
    vec3 fresnelColor = mix(shiftedColorA, shiftedColorB, fresnel + sin(uTime * 0.3) * 0.2);
    colorMix += fresnelColor * fresnel * 0.6;
    
    // Scroll speed color boost
    colorMix += uColorB * uScrollSpeed * 0.2;
    
    // Glitch color shift - more dramatic
    if (uGlitchIntensity > 0.0) {
      float glitchOffset = sin(vPosition.y * 60.0 + uTime * 12.0) * uGlitchIntensity;
      colorMix.r += glitchOffset * 0.4;
      colorMix.g -= glitchOffset * 0.2;
      colorMix.b -= glitchOffset * 0.3;
    }
    
    // Heartbeat pulse brightness
    float heartbeat = pow(sin(uTime * 2.5) * 0.5 + 0.5, 4.0);
    float pulse = 0.85 + heartbeat * 0.2;
    colorMix *= pulse;
    
    // Enhanced rim light
    float rim = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.5);
    colorMix += mix(uColorA, uColorB, sin(uTime * 0.4) * 0.5 + 0.5) * rim * 0.35;
    
    // Subtle scanline effect
    float scanline = sin(vPosition.y * 80.0 + uTime * 1.5) * 0.015;
    colorMix += scanline;
    
    float alpha = 0.92 + fresnel * 0.08;
    
    gl_FragColor = vec4(colorMix, alpha);
  }
`;

export default function ChaosSphere({ scrollProgress, isGlitching, mousePosition, scrollSpeed = 0 }: ChaosSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentScale = useRef(2.2);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uGlitchIntensity: { value: 0 },
    uScrollProgress: { value: 0 },
    uScrollSpeed: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color('#ff0080') },
    uColorB: { value: new THREE.Color('#00ffff') },
    uColorC: { value: new THREE.Color('#8000ff') },
  }), []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Update uniforms
    uniforms.uTime.value = time;
    uniforms.uGlitchIntensity.value = THREE.MathUtils.lerp(
      uniforms.uGlitchIntensity.value,
      isGlitching ? 1 : 0,
      0.08
    );
    uniforms.uScrollProgress.value = THREE.MathUtils.lerp(
      uniforms.uScrollProgress.value,
      scrollProgress,
      0.04
    );
    uniforms.uScrollSpeed.value = THREE.MathUtils.lerp(
      uniforms.uScrollSpeed.value,
      scrollSpeed,
      0.1
    );
    uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);
    
    // Smooth mouse-driven rotation
    targetRotation.current.y = time * 0.08 + mousePosition.x * 0.6;
    targetRotation.current.x = Math.sin(time * 0.04) * 0.15 + mousePosition.y * 0.4;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    
    // Enhanced pulse scale - GSAP-style heartbeat
    const heartbeat1 = Math.pow(Math.sin(time * 2.5) * 0.5 + 0.5, 4);
    const heartbeat2 = Math.pow(Math.sin(time * 2.5 + 0.3) * 0.5 + 0.5, 6) * 0.5;
    const pulseScale = 1 + (heartbeat1 + heartbeat2) * 0.06;
    
    // Bigger base scale + scroll influence
    const baseScale = 2.2;
    const scrollScale = 1 + scrollProgress * 0.2;
    const targetScale = baseScale * scrollScale * pulseScale;
    
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.08);
    meshRef.current.scale.setScalar(currentScale.current);
  });
  
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
