import type { ReactElement } from 'react';
import * as SimpleIcons from 'simple-icons';
import { socialMediaLinks } from '../../../data';
import { SocialIcon } from './types';

// Theme-Aware Neumorphic Icon with Power-Packed Animations
const IconComponent = (iconData: any, brandColor: string, isGradient: boolean = false, darkIconColor?: string): ReactElement => {
  const safeName = iconData.title.replace(/\s+/g, '');
  const containerClass = `extreme-icon-${safeName}`;
  
  // Inject CSS variables so the SVG can inherit colors dynamically based on theme
  const modifiedSvg = iconData.svg.replace(
    '<svg ',
    `<svg fill="${isGradient ? `url(#ig-gradient-${safeName})` : 'var(--current-icon-color)'}" style="width: 100%; height: 100%; filter: drop-shadow(0px 3px 5px var(--current-shadow-color)); transition: all 0.2s ease;" `
  );

  return (
    <div className={containerClass}>
      <style>{`
        .${containerClass} {
          /* CSS Variables for dynamic theming */
          --brand-color: ${brandColor};
          --current-icon-color: ${brandColor};
          --current-shadow-color: ${isGradient ? 'rgba(225, 48, 108, 0.4)' : `${brandColor}66`};
          
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 55px;
          padding: 14px;
          margin: 8px;
          border-radius: 25%;
          cursor: pointer;
          
          /* LIGHT THEME BASE */
          background: linear-gradient(135deg, #ffffff 0%, #e2e6eb 100%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 
            -6px -6px 12px rgba(255, 255, 255, 1),
            6px 6px 12px rgba(0, 0, 0, 0.08);
            
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: ambientFloat-${safeName} 4s ease-in-out infinite alternate;
          z-index: 10;
        }

        /* DARK THEME BASE (Triggers when a parent has the 'dark' class) */
        :global(.dark) .${containerClass}, .dark .${containerClass} {
          background: linear-gradient(135deg, #2b303b 0%, #171920 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 
            -5px -5px 12px rgba(255, 255, 255, 0.03),
            6px 6px 15px rgba(0, 0, 0, 0.6);
          ${darkIconColor ? `--current-icon-color: ${darkIconColor};` : ''}
        }

        /* 🚀 POWER-PACKED EXCESSIVE HOVER EFFECT */
        .${containerClass}:hover {
          /* Massive scale and dynamic 3D rotation */
          transform: scale(1.35) translateY(-12px) rotateZ(8deg) rotateY(15deg);
          z-index: 50;
          
          /* Intense Neon Explosion */
          border-color: rgba(255,255,255,0.4);
          box-shadow: 
            0 0 10px var(--brand-color),
            0 0 25px var(--brand-color),
            0 0 50px var(--brand-color),
            0 0 90px var(--brand-color),
            inset 0 0 20px rgba(255,255,255,0.6);
            
          animation: none; /* Stop ambient float on hover */
        }
        
        /* ⚡ INSANE SVG GLITCH/HEARTBEAT ON HOVER */
        .${containerClass}:hover svg {
          animation: hyperGlitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both alternate;
        }

        @keyframes ambientFloat-${safeName} {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        @keyframes hyperGlitch {
          0%   { transform: scale(1) rotate(0deg) skew(0deg); filter: brightness(1); }
          20%  { transform: scale(1.25) rotate(-12deg) skew(-4deg); filter: brightness(1.5) drop-shadow(0 0 8px var(--brand-color)); }
          40%  { transform: scale(0.85) rotate(10deg) skew(4deg); filter: brightness(0.7); }
          60%  { transform: scale(1.3) rotate(-5deg) skew(-2deg); filter: brightness(2) drop-shadow(0 0 15px var(--brand-color)); }
          80%  { transform: scale(0.9) rotate(15deg) skew(2deg); filter: brightness(0.6); }
          100% { transform: scale(1.15) rotate(-8deg) skew(0deg); filter: brightness(1.3); }
        }
      `}</style>

      {/* SVG Definitions for Instagram Original Gradient */}
      {isGradient && (
        <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id={`ig-gradient-${safeName}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
        </svg>
      )}

      <div dangerouslySetInnerHTML={{ __html: modifiedSvg }} style={{ display: 'contents' }} />
    </div>
  );
};

// LinkedIn icon from simple-icons CDN data
const siLinkedin = {
  title: 'LinkedIn',
  hex: '0A66C2',
  svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
};

// Get icon data from simple-icons
const { siFacebook, siInstagram, siGithub, siWhatsapp } = SimpleIcons;

export const socialIcons: SocialIcon[] = [
  {
    name: 'facebook',
    icon: () => IconComponent(siFacebook, `#${siFacebook.hex}`),
    href: socialMediaLinks.facebook,
    color: `#${siFacebook.hex}`,
    background: `#${siFacebook.hex}`,
  },
  {
    name: 'instagram',
    icon: () => IconComponent(siInstagram, `#E1306C`, true), 
    href: socialMediaLinks.instagram,
    color: `url(#ig-gradient-Instagram)`,
    background: `linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)`,
  },
  {
    name: 'github',
    // 4th parameter '#ffffff' ensures GitHub turns white in Dark Mode but stays dark in Light Mode!
    icon: () => IconComponent(siGithub, `#181717`, false, `#ffffff`), 
    href: socialMediaLinks.github,
    color: `#181717`, 
    background: `#${siGithub.hex}`,
  },
  {
    name: 'linkedin',
    icon: () => IconComponent(siLinkedin, `#${siLinkedin.hex}`),
    href: socialMediaLinks.linkedin,
    color: `#${siLinkedin.hex}`,
    background: `#${siLinkedin.hex}`,
  },
  {
    name: 'whatsapp',
    icon: () => IconComponent(siWhatsapp, `#${siWhatsapp.hex}`),
    href: socialMediaLinks.whatsapp,
    color: `#${siWhatsapp.hex}`,
    background: `#${siWhatsapp.hex}`,
  },
];