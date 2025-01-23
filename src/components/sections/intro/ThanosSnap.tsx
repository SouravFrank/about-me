import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

interface ThanosSnapProps {
  onComplete: () => void;
}

export default function ThanosSnap({ onComplete }: ThanosSnapProps) {
  const particles = useMemo(() => {
    return Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.4,
      rotationY: Math.random() * 180,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: 'rgb(59, 130, 246)',
            filter: 'blur(1px)',
            backfaceVisibility: 'hidden',
          }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          animate={{
            x: [
              particle.x,
              particle.x + Math.sin(i) * 100,
              particle.x + Math.sin(i) * 200,
            ],
            y: [
              particle.y,
              particle.y - 100 + Math.cos(i) * 50,
              particle.y - 300 + Math.cos(i) * 100,
            ],
            opacity: [1, 0.8, 0],
            scale: [1, 0.6, 0],
            rotateY: [0, particle.rotationY],
          }}
          transition={{
            duration: 1.5,
            delay: particle.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        exit={{ opacity: 0 }}
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
