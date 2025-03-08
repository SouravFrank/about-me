import React, { useRef, useState, useEffect, TouchEvent, MouseEvent, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HorizontalScrollProps } from './types';
import useIsMobile from '../../hooks/isMobile';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../utils/analytics';

const throttle = (func: { (clientX: number): void; apply?: any; }, limit: number | undefined) => {
  let inThrottle: boolean;
  return function (this: unknown, ...args: any) {
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
  const isMobile = useIsMobile();

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

    trackEvent('horizontal_scroll', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      direction: direction,
      container_width: container.clientWidth
    });

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
    if (isDragging) {
      // e.preventDefault();
      throttledDrag(e.touches[0].clientX);
    }
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
    <div className="relative md:px-12 py-4 md:py-6">
      {!isMobile && (
        <button
          onClick={() => smoothScroll('left')}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-[100] hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none pb-4 md:pb-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {allChildren}
      </div>

      {isMobile && (
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => smoothScroll('left')}
            className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => smoothScroll('right')}
            className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {!isMobile && (
        <button
          onClick={() => smoothScroll('right')}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-[100] hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HorizontalScroll;