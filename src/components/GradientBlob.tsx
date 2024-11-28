import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTrail, animated } from '@react-spring/web';
import { motion, AnimatePresence } from 'framer-motion';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

const GradientBlobCursor: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({ isDarkMode, children }) => {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  const [hue, setHue] = useState(0);
  const [particles, setParticles] = useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const { left, top } = updatePosition();
    const x = 'clientX' in e ? e.clientX : (e.touches[0].clientX);
    const y = 'clientY' in e ? e.clientY : (e.touches[0].clientY);
    
    api.start({ xy: [x - left, y - top] });
    
    const newHue = (x || 0) % 360;
    setHue(newHue);
    
    const newParticles = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 2,
      intensity: Math.random() * 0.5 + 0.5,
    }));
    
    setParticles((prev) => [...prev, ...newParticles].slice(-30));
  };

  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updatePosition]);

  // More distinct neon color schemes
  const gradientColors = {
    light: {
      blob: `linear-gradient(135deg, 
        hsl(${hue}, 100%, 50%), 
        hsl(${(hue + 60) % 360}, 100%, 40%)
      )`,
      boxShadow: `0 0 30px hsl(${hue}, 100%, 60%, 0.6)`,
      particle: `radial-gradient(
        circle at center, 
        hsl(${hue}, 100%, 45%), 
        transparent
      )`,
      particleBoxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.7)`
    },
    dark: {
      blob: `linear-gradient(135deg, 
        hsl(${hue}, 100%, 70%), 
        hsl(${(hue + 60) % 360}, 100%, 80%)
      )`,
      boxShadow: `0 0 40px hsl(${hue}, 100%, 60%, 0.8)`,
      particle: `radial-gradient(
        circle at center, 
        hsl(${hue}, 100%, 55%), 
        transparent
      )`,
      particleBoxShadow: `0 0 20px hsl(${hue}, 100%, 70%, 0.6)`
    }
  };

  const currentMode = isDarkMode ? 'dark' : 'light';
  const modeColors = gradientColors[currentMode];

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      ref={ref} 
      onMouseMove={handleMove} 
      onTouchMove={handleMove}
    >
      {children}

      {trail.map((props, index) => (
        <animated.div
          key={index}
          style={{
            position: 'absolute',
            transform: props.xy.to(trans),
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            background: modeColors.blob,
            boxShadow: modeColors.boxShadow,
            pointerEvents: 'none',
            opacity: 1,
          }}
        />
      ))}

      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ opacity: particle.intensity, scale: 0 }}
            animate={{ opacity: 0, scale: particle.size }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: modeColors.particle,
                filter: 'blur(2px)',
                boxShadow: modeColors.particleBoxShadow,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GradientBlobCursor;