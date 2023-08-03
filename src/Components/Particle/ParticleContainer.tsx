import React, { useState, useEffect } from 'react';
import Particle from './Particle';

const MAX_PARTICLES = 100; // Maximum number of particles to show
export interface ParticleProps {
  x: number;
  y: number;
  shape: string; // Shape type, e.g., 'circle', 'square', etc.
}
interface ParticleWithVelocity extends ParticleProps {
  vx: number; // Velocity along the x-axis
  vy: number; // Velocity along the y-axis
}

const ParticleContainer: React.FC = () => {
  const [particles, setParticles] = useState<ParticleWithVelocity[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setParticles((prevParticles) => {
        const randomShape = Math.random() < 0.5 ? 'circle' : 'square'; // Assign random shape
        const newParticle: ParticleWithVelocity = {
          x: clientX + window.pageXOffset,
          y: clientY + window.pageYOffset,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          shape: randomShape,
        };
        return [newParticle, ...prevParticles.slice(0, MAX_PARTICLES - 1)];
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
        }))
      );
    };

    const animationId = requestAnimationFrame(updateParticles);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [particles]);

  return (
    <div style={{ position: 'absolute', top: 0 }}>
      {particles.map((particle, index) => (
        <Particle key={index} x={particle.x} y={particle.y} shape={particle.shape} />
      ))}
    </div>
  );
};

export default ParticleContainer;
