// Particle.tsx
import React from 'react';

export interface ParticleProps {
  x: number;
  y: number;
  shape: string; // Shape type, e.g., 'circle', 'square', etc.
}

const Particle: React.FC<ParticleProps> = ({ x, y, shape }) => {
  let particleStyle = {};
  switch (shape) {
    case 'circle':
      particleStyle = {
        borderRadius: '50%',
      };
      break;
    case 'square':
      particleStyle = {
        borderRadius: '0%',
      };
      break;
    // Add more cases for different shapes as needed.
    default:
      break;
  }

  return (
    <div
      style={{
        ...particleStyle,
        position: 'absolute',
        width: '8px',
        height: '8px',
        background: '#fafafa',
        left: x,
        top: y,
      }}
    />
  );
};

export default Particle;
