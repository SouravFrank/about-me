import  { useState, useEffect, useRef, useCallback } from 'react';
import { useTrail, animated } from '@react-spring/web';
import { motion, AnimatePresence } from 'framer-motion';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

const GradientBlobCursor = ({ 
  blobType = 'circle', 
  baseColor = '#00f0ff', 
  particleCount = 30 
}) => {
  // Blob trail state
  const [trail, api] = useTrail(3, i => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  // Particle and color state
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

    // Update blob trail
    api.start({ xy: [x - left, y - top] });

    // Update particles and hue
    const newHue = ((x || 0) % 360);
    setHue(newHue);

    // Add multiple new particles
    const newParticles = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 2, // Random size between 2 and 5
      intensity: Math.random() * 0.5 + 0.5 // Random intensity between 0.5 and 1
    }));

    setParticles(prev => [...prev, ...newParticles].slice(-particleCount));
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

  return (
    <div className='container relative w-full h-screen'>
      {/* Blob Filter SVG */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>

      {/* Main interactive area */}
      <div
        ref={ref}
        className='main absolute w-full h-full'
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Blob trail */}
        {trail.map((props, index) => (
          <animated.div 
            key={index} 
            style={{
              transform: props.xy.to(trans),
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              background: `radial-gradient(
                circle at center,
                hsl(${hue}, 100%, 70%),
                hsl(${(hue + 60) % 360}, 100%, 60%)
              )`,
              boxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.5)`,
            }} 
          />
        ))}

        {/* Particle trail */}
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
                  background: `radial-gradient(
                    circle at center,
                    hsl(${(hue + index * 10) % 360}, 100%, ${70 + particle.intensity * 30}%),
                    transparent
                  )`,
                  filter: 'blur(2px)',
                  boxShadow: `0 0 ${particle.size * 2}px hsl(${(hue + index * 10) % 360}, 100%, 50%, ${particle.intensity})`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GradientBlobCursor;