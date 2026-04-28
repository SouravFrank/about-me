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
          --current-shadow-color: ${isGradient ? 'rgba(225, 48, 108, 0.35)' : `${brandColor}55`};

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
          overflow: visible;

          /* LIGHT THEME BASE — soft neumorphic */
          background: linear-gradient(135deg, #ffffff 0%, #e6eaf0 100%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            -6px -6px 12px rgba(255, 255, 255, 1),
            6px 6px 12px rgba(0, 0, 0, 0.08);

          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.5s ease,
                      background 0.4s ease,
                      border-color 0.4s ease;
          animation: ambientFloat-${safeName} 5s ease-in-out infinite alternate;
          z-index: 10;
        }

        /* DARK THEME BASE — works because 'dark' class lives on <html> */
        html.dark .${containerClass} {
          background: linear-gradient(135deg, #2b303b 0%, #171920 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow:
            -5px -5px 12px rgba(255, 255, 255, 0.03),
            6px 6px 15px rgba(0, 0, 0, 0.55);
          ${darkIconColor ? `--current-icon-color: ${darkIconColor};` : ''}
        }

        /* ✨ Smooth, classy hover — gentle lift + soft brand glow */
        .${containerClass}:hover {
          transform: translateY(-8px) scale(1.12);
          z-index: 50;
          border-color: color-mix(in srgb, var(--brand-color) 40%, transparent);
          box-shadow:
            0 8px 18px -6px color-mix(in srgb, var(--brand-color) 55%, transparent),
            0 0 28px -4px color-mix(in srgb, var(--brand-color) 45%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.5);
          animation: none;
        }

        html.dark .${containerClass}:hover {
          box-shadow:
            0 8px 22px -4px color-mix(in srgb, var(--brand-color) 65%, transparent),
            0 0 36px -2px color-mix(in srgb, var(--brand-color) 55%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* Gentle SVG breathe on hover — no flicker, no skew */
        .${containerClass} svg {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
        }
        .${containerClass}:hover svg {
          transform: scale(1.12) rotate(-6deg);
          filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--brand-color) 50%, transparent));
        }

        @keyframes ambientFloat-${safeName} {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .${containerClass}, .${containerClass} svg { animation: none !important; transition: none !important; }
          .${containerClass}:hover { transform: none; }
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