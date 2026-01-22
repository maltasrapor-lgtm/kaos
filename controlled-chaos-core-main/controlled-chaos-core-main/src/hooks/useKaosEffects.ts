import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1 range
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

export function useScrollProgress(): { progress: number; speed: number } {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      
      // Calculate scroll speed
      const now = Date.now();
      const deltaTime = now - lastTime.current;
      if (deltaTime > 0) {
        const deltaY = Math.abs(window.scrollY - lastScrollY.current);
        const speed = Math.min(deltaY / deltaTime * 10, 1); // Normalized 0-1
        setScrollSpeed(speed);
      }
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };

    // Decay scroll speed over time
    const decayInterval = setInterval(() => {
      setScrollSpeed(prev => prev * 0.9);
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayInterval);
    };
  }, []);

  return { progress: scrollProgress, speed: scrollSpeed };
}

interface GlitchState {
  isGlitching: boolean;
  triggerGlitch: () => void;
  fixGlitch: () => void;
}

export function useGlitch(): GlitchState {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
  }, []);

  const fixGlitch = useCallback(() => {
    setIsGlitching(false);
  }, []);

  // Auto-fix glitch after some time
  useEffect(() => {
    if (isGlitching) {
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isGlitching]);

  return { isGlitching, triggerGlitch, fixGlitch };
}

interface GyroscopeData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
}

export function useGyroscope(): GyroscopeData {
  const [data, setData] = useState({
    alpha: null as number | null,
    beta: null as number | null,
    gamma: null as number | null,
  });
  const [hasPermission, setHasPermission] = useState(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    setData({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    // Check if DeviceOrientationEvent is available
    if (typeof DeviceOrientationEvent === 'undefined') {
      return false;
    }

    // Check if we need to request permission (iOS 13+)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setHasPermission(true);
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        return false;
      }
    } else {
      // Non-iOS device or older iOS
      setHasPermission(true);
      window.addEventListener('deviceorientation', handleOrientation);
      return true;
    }

    return false;
  }, [handleOrientation]);

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);

  return { ...data, hasPermission, requestPermission };
}
