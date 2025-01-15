import React, { useRef, useState, useEffect, TouchEvent, MouseEvent, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HorizontalScrollProps } from './types';

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });

  const checkScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const threshold = 1;

    requestAnimationFrame(() => {
      setIsAtStart(scrollLeft <= threshold);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - threshold);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHandler = () => checkScrollPosition();
    const resizeObserver = new ResizeObserver(checkScrollPosition);

    container.addEventListener('scroll', scrollHandler);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', scrollHandler);
      resizeObserver.disconnect();
    };
  }, [checkScrollPosition]);

  const smoothScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const currentScroll = container.scrollLeft;
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, currentScroll + scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    checkScrollPosition();
  };

  const startDragging = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: clientX,
      scrollLeft: container.scrollLeft
    };

    container.style.cursor = 'grabbing';
  };

  const drag = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const walk = (dragStartRef.current.x - clientX) * 1.5; // Increased multiplier for more responsive drag
    container.scrollLeft = dragStartRef.current.scrollLeft + walk;

    checkScrollPosition();
  };

  const stopDragging = () => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = 'grab';
    checkScrollPosition();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startDragging(e.pageX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      drag(e.pageX);
    }
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
    };
  }, [isDragging]);

  return (
    <div className="relative px-12 py-6">
      <button
        onClick={() => smoothScroll('left')}
        disabled={isAtStart}
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 ${isAtStart ? 'opacity-30' : 'hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
      >
        {children}
      </div>
      
      <button
        onClick={() => smoothScroll('right')}
        disabled={isAtEnd}
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 ${isAtEnd ? 'opacity-30' : 'hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HorizontalScroll;