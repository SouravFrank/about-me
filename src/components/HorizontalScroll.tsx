import React, { useRef, useState, useEffect, TouchEvent, MouseEvent } from 'react';
import { ProjectCard } from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  projects: {
    title: string;
    description: string;
    thumbnail: string;
    githubLink: string;
  }[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });
  const lastX = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const velocity = useRef<number>(0);
  const animationRef = useRef<number>();

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const startDragging = (clientX: number) => {
    if (!containerRef.current) return;
    
    // Cancel any ongoing momentum scrolling
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsDragging(true);
    dragStartRef.current = {
      x: clientX,
      scrollLeft: containerRef.current.scrollLeft
    };
    lastX.current = clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    
    containerRef.current.style.cursor = 'grabbing';
    // Temporarily disable snap behavior during drag
    containerRef.current.style.scrollSnapType = 'none';
  };

  const drag = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const currentTime = performance.now();
    const timeDelta = currentTime - lastTime.current;
    const movement = clientX - lastX.current;
    
    if (timeDelta > 0) {
      // Update velocity (pixels per millisecond)
      velocity.current = movement / timeDelta;
    }

    const x = clientX;
    const walk = (dragStartRef.current.x - x);
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft + walk;

    lastX.current = clientX;
    lastTime.current = currentTime;
  };

  const stopDragging = () => {
    if (!containerRef.current) return;

    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';

    const startTime = performance.now();
    let currentVelocity = velocity.current * 100; // Scale up the velocity for more noticeable effect

    // Only apply momentum if there's significant velocity
    if (Math.abs(currentVelocity) > 0.1) {
      const momentumScroll = () => {
        if (!containerRef.current) return;

        const now = performance.now();
        const elapsed = now - startTime;
        
        // Apply momentum scrolling
        containerRef.current.scrollLeft += currentVelocity;
        
        // Reduce velocity with friction
        currentVelocity *= 0.95;

        if (Math.abs(currentVelocity) > 0.1) {
          animationRef.current = requestAnimationFrame(momentumScroll);
        } else {
          // Re-enable snap behavior after momentum scrolling ends
          containerRef.current.style.scrollSnapType = 'x mandatory';
        }
      };

      animationRef.current = requestAnimationFrame(momentumScroll);
    } else {
      // If no significant velocity, re-enable snap immediately
      containerRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startDragging(e.pageX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    drag(e.pageX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startDragging(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    drag(e.touches[0].clientX);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseUp = () => stopDragging();
    const handleMouseLeave = () => isDragging && stopDragging();
    const handleTouchEnd = () => stopDragging();

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  return (
    <div className="relative px-12 py-6">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-transform duration-200 z-10 transform group hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-200 transform group-hover:-translate-x-1" />
      </button>
      
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab select-none"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          scrollSnapType: 'x mandatory'
        }}
      >
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="snap-start shrink-0"
            style={{ minWidth: 'fit-content' }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-transform duration-200 z-10 transform group hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-200 transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default HorizontalScroll;