import React, { useRef, useState, useEffect, TouchEvent, MouseEvent, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HorizontalScrollProps } from './types';

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });

  const adjustScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth } = container;
    const W = scrollWidth / 3;

    if (scrollLeft < W) {
      container.scrollLeft += W;
    } else if (scrollLeft > 2 * W) {
      container.scrollLeft -= W;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHandler = () => adjustScrollPosition();
    container.addEventListener('scroll', scrollHandler);

    const W = container.scrollWidth / 3;
    container.scrollLeft = W;

    return () => {
      container.removeEventListener('scroll', scrollHandler);
    };
  }, [adjustScrollPosition]);

  const smoothScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const currentScroll = container.scrollLeft;
    const targetScroll =
      direction === 'left'
        ? Math.max(0, currentScroll - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, currentScroll + scrollAmount);

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const startDragging = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: clientX,
      scrollLeft: container.scrollLeft,
    };
    container.style.cursor = 'grabbing';
  };

  const throttledDrag = useCallback(
    throttle((clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const container = containerRef.current;
      const walk = (dragStartRef.current.x - clientX) * 1.5;
      container.scrollLeft = dragStartRef.current.scrollLeft + walk;
    }, 16),
    [isDragging]
  );

  const stopDragging = () => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = 'grab';
    adjustScrollPosition();
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startDragging(e.pageX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      throttledDrag(e.pageX);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startDragging(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    throttledDrag(e.touches[0].clientX);
  };

  useEffect(() => {
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

  const allChildren = [0, 1, 2].flatMap((setIndex) =>
    React.Children.toArray(children).map((child, index) =>
      React.cloneElement(child as React.ReactElement, { key: `${setIndex}-${index}` })
    )
  );

  return (
    <div className="relative px-4 md:px-12 py-6">
      <button
        onClick={() => smoothScroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-4 md:p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
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
        {allChildren}
      </div>

      <button
        onClick={() => smoothScroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-4 md:p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HorizontalScroll;