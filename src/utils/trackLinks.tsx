import React, { useEffect } from 'react';
import { trackCTA, trackSessionAction, trackConversion } from './analytics';

export const TrackLinks: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href') || '';
        const isExternal = link.getAttribute('target') === '_blank';
        const linkText = (link.textContent || 'unknown').trim();
        const section = link.closest('[data-section]')?.getAttribute('data-section') || 
                        link.closest('section')?.getAttribute('id') || 
                        'unknown';
        
        // 1. Check for Resume/CV Link Clicks
        const isResumeLink = href.includes('drive.google.com') && (
          href.includes('1jcx6KyKoar3csU4qez9-oKJTuTLD3alX') || 
          linkText.toLowerCase().includes('resume') || 
          linkText.toLowerCase().includes('cv')
        );

        if (isResumeLink) {
          trackCTA(linkText || 'Resume Link', 'click', section, { href, is_external: isExternal });
          trackSessionAction('resume', true);
          trackConversion('resume_download', { resume_source: 'link', section, device: 'unknown' });
          return;
        }

        // 2. Check for Contact Funnel Clicks
        if (href.startsWith('mailto:')) {
          trackCTA('Email Link', 'click', section, { email: href.replace('mailto:', '') });
          trackSessionAction('contact', 'email');
          trackConversion('email_click', { section });
          return;
        }

        if (href.startsWith('tel:')) {
          trackCTA('Phone Link', 'click', section, { phone: href.replace('tel:', '') });
          trackSessionAction('contact', 'phone');
          trackConversion('phone_click', { section });
          return;
        }

        if (href.includes('linkedin.com')) {
          trackCTA('LinkedIn Link', 'click', section, { href });
          trackSessionAction('contact', 'linkedin');
          trackConversion('linkedin_click', { section });
          return;
        }

        if (href.includes('github.com')) {
          trackCTA('GitHub Link', 'click', section, { href });
          trackSessionAction('contact', 'github');
          trackConversion('github_click', { section });
          return;
        }

        if (href.includes('calendly.com')) {
          trackCTA('Calendly Link', 'click', section, { href });
          trackSessionAction('contact', 'calendly');
          trackConversion('calendly_click', { section });
          return;
        }

        // 3. Fallback General Link Clicks
        trackCTA(linkText || href || 'Link', 'click', section, {
          href,
          is_external: isExternal,
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