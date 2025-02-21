import React, { useRef, useState, useEffect, TouchEvent, MouseEvent, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HorizontalScrollProps } from './types';

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });

  // Function to adjust scroll position for infinite scrolling
  const adjustScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth } = container;
    const W = scrollWidth / 3; // Width of one set of children

    if (scrollLeft < W) {
      container.scrollLeft += W; // Move to the middle set if too far left
    } else if (scrollLeft > 2 * W) {
      container.scrollLeft -= W; // Move to the middle set if too far right
    }
  }, []);

  // Set up initial scroll position and scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHandler = () => adjustScrollPosition();
    container.addEventListener('scroll', scrollHandler);

    // Set initial scroll position to the middle set
    const W = container.scrollWidth / 3;
    container.scrollLeft = W;

    return () => {
      container.removeEventListener('scroll', scrollHandler);
    };
  }, [adjustScrollPosition]);

  // Smooth scrolling for navigation buttons
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

  // Start dragging
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

  // Handle dragging
  const drag = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const walk = (dragStartRef.current.x - clientX) * 1.5;
    container.scrollLeft = dragStartRef.current.scrollLeft + walk;
  };

  // Stop dragging
  const stopDragging = () => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = 'grab';
    adjustScrollPosition(); // Ensure position is adjusted after dragging
  };

  // Mouse event handlers
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

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startDragging(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    drag(e.touches[0].clientX);
  };

  // Global event listeners for stopping drag
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

  // Render three copies of children with unique keys
  const allChildren = [0, 1, 2].flatMap((setIndex) =>
    React.Children.toArray(children).map((child, index) =>
      React.cloneElement(child as React.ReactElement, { key: `${setIndex}-${index}` })
    )
  );

  return (
    <div className="relative px-12 py-6">
      <button
        onClick={() => smoothScroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
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
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HorizontalScroll;