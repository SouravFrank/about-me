import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThanosSnapProps {
  onComplete: () => void;
}

export default function ThanosSnap({ onComplete }: ThanosSnapProps) {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const particlesArray = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 0.5,
    }));
    setParticles(particlesArray);
    
    const timer = setTimeout(onComplete, 200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/50 rounded-full"
          initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0 }}
          animate={{
            x: [particle.x, particle.x + (Math.random() - 0.5) * 200],
            y: [particle.y, particle.y - 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
