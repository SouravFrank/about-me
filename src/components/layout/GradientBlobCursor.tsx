import React, { useState, useRef, useCallback } from 'react';
import { useTrail, animated } from '@react-spring/web';

const TRAIL_COUNT = Math.floor(Math.random() * 5) + 4; // Random number of blobs (4-8)
const MIN_SIZE = 40;
const MAX_SIZE = 300;

// Generate random sizes with smaller ones first
const generateBlobSizes = () => {
  const sizes = Array.from({ length: TRAIL_COUNT }, (_, i) => {
    const progress = i / (TRAIL_COUNT - 1); // 0 to 1
    const minSize = MIN_SIZE + (progress * 100); // Minimum size increases with index
    const maxSize = Math.min(MAX_SIZE, minSize + 100); // Cap maximum size
    return Math.floor(Math.random() * (maxSize - minSize) + minSize);
  });
  return sizes.sort((a, b) => a - b); // Sort from smallest to largest
};

const BLOB_SIZES = generateBlobSizes();
const FRICTION_VALUES = BLOB_SIZES.map((_, i) => 20 + (i * 15)); // Increasing friction for larger blobs

const MIN_HUE = 272; // Purple
const MAX_HUE = 300; // Bright Pink

const GradientBlobCursor: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({ isDarkMode, children }) => {
  const [trails, api] = useTrail(TRAIL_COUNT, (index) => ({
    xy: [0, 0],
    config: { 
      mass: 1 + index * 1.5,
      tension: 120 - index * 15,
      friction: FRICTION_VALUES[index],
    },
  }));
  
  const [hue, setHue] = useState(MIN_HUE); // Initialize with MIN_HUE
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      
      const xFraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const baseHue = MIN_HUE + (MAX_HUE - MIN_HUE) * xFraction;
      setHue(baseHue);
      
      trails.forEach((_, index) => {
        const randomX = (Math.random() - 0.5) * (index * 15);
        const randomY = (Math.random() - 0.5) * (index * 15);
        
        api.start(i => {
          if (i === index) {
            return {
              xy: [
                clientX - rect.left + randomX,
                clientY - rect.top + randomY
              ],
              immediate: false,
            };
          }
        });
      });
    });
  }, [api, trails]);

  const edgeHue = Math.min(hue + 10, MAX_HUE);

  return (
    <div 
      className="relative w-full h-full overflow-hidden" 
      ref={ref} 
      onMouseMove={handleMove} 
      onTouchMove={handleMove}
    >
      {children}
      {trails.map((props, index) => (
        <animated.div
          key={index}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: props.xy.to((x, y) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`),
            width: BLOB_SIZES[index],
            height: BLOB_SIZES[index],
            borderRadius: '50%',
            pointerEvents: 'none',
            willChange: 'transform',
            background: isDarkMode
              ? `radial-gradient(circle at center, 
                  hsla(${hue}, 100%, 70%, ${0.25 - index * 0.03}) 0%, 
                  hsla(${edgeHue}, 100%, 80%, ${0.15 - index * 0.02}) 100%)`
              : `radial-gradient(circle at center, 
                  hsla(${hue}, 100%, 50%, ${0.2 - index * 0.02}) 0%, 
                  hsla(${edgeHue}, 100%, 40%, ${0.1 - index * 0.015}) 100%)`,
            filter: `blur(${8 + index * 6}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default GradientBlobCursor;