import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExplodingTilesProps {
  children: React.ReactNode;
  triggerText?: string;
}

export function ExplodingTiles({ children, triggerText = 'Scroll' }: ExplodingTilesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll('[data-tile]');

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 2,
        markers: false,
      },
    });

    tiles.forEach((tile, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      // Calculate explosion direction
      const centerX = 1;
      const centerY = 1;
      const dirX = col - centerX;
      const dirY = row - centerY;
      const distance = Math.hypot(dirX, dirY);
      const normalizedX = distance > 0 ? dirX / distance : 0;
      const normalizedY = distance > 0 ? dirY / distance : 0;

      tl.to(
        tile,
        {
          x: normalizedX * 500,
          y: normalizedY * 500,
          rotation: (Math.random() - 0.5) * 360,
          opacity: 0,
          duration: 1,
        },
        0
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-32 px-8">
      {children}
    </div>
  );
}

// Tile component
export function Tile({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-tile
      className={`p-6 bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-lg hover:border-orange-500 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
