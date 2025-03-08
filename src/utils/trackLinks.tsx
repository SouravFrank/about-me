import React, { useEffect } from 'react';
import { trackEvent, ANALYTICS_CATEGORIES } from './analytics';

export const TrackLinks: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        const isExternal = link.getAttribute('target') === '_blank';
        const linkText = link.textContent || 'unknown';
        const section = link.closest('[data-section]')?.getAttribute('data-section') || 'unknown';
        
        trackEvent('link_click', {
          category: isExternal ? ANALYTICS_CATEGORIES.EXTERNAL_LINK : ANALYTICS_CATEGORIES.NAVIGATION,
          url: href,
          text: linkText,
          is_external: isExternal,
          section: section
        });
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return <>{children}</>;
};