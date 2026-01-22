import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MagneticElement {
  element: HTMLElement;
  originalX: number;
  originalY: number;
}

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const magneticElementsRef = useRef<MagneticElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });

      // Cursor animation
      gsap.to(cursor, {
        x: clientX - 15,
        y: clientY - 15,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(cursorDot, {
        x: clientX - 3,
        y: clientY - 3,
        duration: 0.1,
      });

      // Magnetic elements
      magneticElementsRef.current.forEach(({ element, originalX, originalY }) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        const distance = Math.hypot(clientX - elementCenterX, clientY - elementCenterY);
        const magneticRadius = 150;

        if (distance < magneticRadius) {
          const angle = Math.atan2(clientY - elementCenterY, clientX - elementCenterX);
          const force = (magneticRadius - distance) / magneticRadius;
          const moveX = Math.cos(angle) * force * 50;
          const moveY = Math.sin(angle) * force * 50;

          gsap.to(element, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorDot, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Register magnetic elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElementsRef.current = Array.from(magneticElements).map((el) => ({
      element: el as HTMLElement,
      originalX: 0,
      originalY: 0,
    }));

    magneticElements.forEach((el) => {
      (el as HTMLElement).addEventListener('mouseenter', handleMouseEnter);
      (el as HTMLElement).addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      magneticElements.forEach((el) => {
        (el as HTMLElement).removeEventListener('mouseenter', handleMouseEnter);
        (el as HTMLElement).removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-50 mix-blend-screen"
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1.5 h-1.5 bg-orange-500 rounded-full pointer-events-none z-50"
      />
    </>
  );
}
