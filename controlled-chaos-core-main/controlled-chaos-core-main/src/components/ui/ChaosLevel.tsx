import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ChaosLevelProps {
  scrollSpeed: number;
  scrollProgress: number;
}

export default function ChaosLevel({ scrollSpeed, scrollProgress }: ChaosLevelProps) {
  const [chaosLevel, setChaosLevel] = useState(50);
  
  useEffect(() => {
    // Chaos level increases with scroll speed, base increases with scroll progress
    const baseLevel = 30 + scrollProgress * 40;
    const speedBoost = scrollSpeed * 50;
    const newLevel = Math.min(100, Math.max(0, baseLevel + speedBoost));
    
    setChaosLevel(prev => prev + (newLevel - prev) * 0.15);
  }, [scrollSpeed, scrollProgress]);

  const displayLevel = Math.round(chaosLevel);
  
  // Color shifts based on chaos level
  const getColor = () => {
    if (chaosLevel < 40) return 'text-secondary'; // Cyan
    if (chaosLevel < 70) return 'text-primary'; // Magenta
    return 'text-accent'; // Purple/mix
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-8 right-8 z-30 pointer-events-none"
    >
      <div className="relative">
        {/* Glow background */}
        <div 
          className="absolute inset-0 blur-xl opacity-30"
          style={{
            background: chaosLevel > 70 
              ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' 
              : 'hsl(var(--primary))'
          }}
        />
        
        {/* Main content */}
        <div className="relative font-mono text-xs uppercase tracking-[0.2em]">
          <span className="text-muted-foreground">Kaos Seviyesi</span>
          <motion.div
            key={displayLevel}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-2xl font-display font-bold ${getColor()} transition-colors duration-300`}
          >
            %{displayLevel}
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-24 h-0.5 bg-muted/30 mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary via-primary to-accent"
              animate={{ width: `${chaosLevel}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}