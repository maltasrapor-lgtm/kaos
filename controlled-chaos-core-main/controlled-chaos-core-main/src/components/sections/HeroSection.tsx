import { motion } from 'framer-motion';

interface HeroSectionProps {
  isGlitching: boolean;
  onTriggerGlitch: () => void;
}

export default function HeroSection({ isGlitching, onTriggerGlitch }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Centered Manifesto Overlay - positioned over the sphere */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-secondary mb-8 drop-shadow-[0_0_10px_hsl(var(--secondary)/0.5)]"
        >
          Kontrollü Kaos'un Gücü
        </motion.p>

        {/* Main Title - Sharp, bold font */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6 ${
            isGlitching ? 'glitch animate-shake' : ''
          }`}
          data-text="K.A.O.S."
          style={{
            textShadow: '0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--secondary) / 0.2)',
          }}
        >
          <span className="gradient-text drop-shadow-2xl">K.A.O.S.</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-10"
        >
          <span className="font-display text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] text-foreground/80 uppercase">
            Management
          </span>
        </motion.div>

        {/* Services Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-mono text-[10px] md:text-xs text-muted-foreground/70 max-w-xl mx-auto mb-14 tracking-[0.15em] uppercase"
        >
          Menajerlik • Hukuk • Yatırım • Sigorta • Emlak • Prodüksiyon • Reklamcılık
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            className="btn-kaos"
            onClick={() => {
              const element = document.getElementById('services');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Keşfet
          </button>
          <button 
            className="btn-kaos btn-kaos-secondary group"
            onMouseEnter={onTriggerGlitch}
          >
            <span className="group-hover:animate-pulse">Kaosa Dal</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-9 border border-primary/40 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-0.5 h-2 bg-primary/80 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-1/3 left-8 w-px h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
    </section>
  );
}
