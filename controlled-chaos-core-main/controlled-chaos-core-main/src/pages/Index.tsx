import { Suspense, lazy, useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import ChaosLevel from '@/components/ui/ChaosLevel';
import { useMousePosition, useScrollProgress, useGlitch } from '@/hooks/useKaosEffects';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// Lazy load the 3D scene for better initial load
const Scene3D = lazy(() => import('@/components/three/Scene3D'));

// Loading component for 3D scene
function Scene3DLoader() {
  return (
    <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="font-display text-sm uppercase tracking-widest text-muted-foreground">
          Kaos yükleniyor...
        </p>
      </div>
    </div>
  );
}

const Index = () => {
  const mousePosition = useMousePosition();
  const { progress: scrollProgress, speed: scrollSpeed } = useScrollProgress();
  const { isGlitching, triggerGlitch, fixGlitch } = useGlitch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize smooth scroll
  useSmoothScroll();

  // Set loaded state after initial render
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Random glitch trigger
  useEffect(() => {
    const randomGlitch = () => {
      if (Math.random() > 0.95 && !isGlitching) {
        triggerGlitch();
        setTimeout(fixGlitch, 200 + Math.random() * 500);
      }
    };

    const interval = setInterval(randomGlitch, 3000);
    return () => clearInterval(interval);
  }, [isGlitching, triggerGlitch, fixGlitch]);

  return (
    <div className={`relative min-h-screen ${isGlitching ? 'scanlines' : ''}`}>
      {/* 3D Background */}
      <Suspense fallback={<Scene3DLoader />}>
        <Scene3D
          scrollProgress={scrollProgress}
          isGlitching={isGlitching}
          mousePosition={mousePosition}
          scrollSpeed={scrollSpeed}
        />
      </Suspense>

      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none" />

      {/* Navigation */}
      <Navigation isGlitching={isGlitching} onFixGlitch={fixGlitch} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection isGlitching={isGlitching} onTriggerGlitch={triggerGlitch} />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chaos Level Indicator */}
      <ChaosLevel scrollSpeed={scrollSpeed} scrollProgress={scrollProgress} />

      {/* Glitch Overlay */}
      {isGlitching && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none animate-flicker"
          style={{
            background: 'linear-gradient(0deg, transparent 50%, rgba(255,0,128,0.03) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 pointer-events-none z-20" />
      <div className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-secondary/20 pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-secondary/20 pointer-events-none z-20" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 pointer-events-none z-20" />
    </div>
  );
};

export default Index;
