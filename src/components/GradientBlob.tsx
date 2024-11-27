import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTrail, animated } from '@react-spring/web';
import { motion, AnimatePresence } from 'framer-motion';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

const GradientBlobCursor = ({ children }) => {
  const [trail, api] = useTrail(3, i => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  const [hue, setHue] = useState(0);
  const [particles, setParticles] = useState([]);
  const ref = useRef();

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  const handleMove = e => {
    const { left, top } = updatePosition();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    api.start({ xy: [x - left, y - top] });
    const newHue = ((x || 0) % 360);
    setHue(newHue);
    const newParticles = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 2,
      intensity: Math.random() * 0.5 + 0.5
    }));
    setParticles(prev => [...prev, ...newParticles].slice(-30));
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

  // Determine gradient colors based on theme
  const gradientColors = {
    light: `radial-gradient(circle at center, hsl(${hue}, 100%, 70%), hsl(${(hue + 60) % 360}, 100%, 60%))`,
    dark: `radial-gradient(circle at center, hsl(${hue}, 100%, 50%), hsl(${(hue + 60) % 360}, 100%, 40%)`
  };

  const isDarkMode = document.body.classList.contains('dark'); // Adjust based on your theme management

  return (
    <div className='relative w-full h-full overflow-hidden' ref={ref} onMouseMove={handleMove} onTouchMove={handleMove}>
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
            background: gradientColors[isDarkMode ? 'dark' : 'light'],
            boxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.5)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none mix-blend-screen"
            style={{
              left: particle.x,
              top: particle.y,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ opacity: particle.intensity, scale: 0 }}
            animate={{ opacity: 0, scale: particle.size }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${particle.size * 4}px`,
                height: `${particle.size * 4}px`,
                background: `radial-gradient(circle at center, hsl(${(hue + index * 10) % 360}, 100%, ${70 + particle.intensity * 30}%), transparent)`,
                filter: 'blur(2px)',
                boxShadow: `0 0 ${particle.size * 2}px hsl(${(hue + index * 10) % 360}, 100%, 50%, ${particle.intensity})`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GradientBlobCursor;