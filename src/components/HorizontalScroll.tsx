import React, { useRef } from 'react';
import {ProjectCard} from './ProjectCard';
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.3; // 30vw
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative px-12 py-6">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg transition-transform duration-200 z-10 transform group hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-200 transform group-hover:-translate-x-1" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <div key={index} className="snap-start">
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