import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useImagePreloader } from '../../hooks/useImagePreloader';

interface HexagonPreloaderProps {
  isDark: boolean;
}

const HexagonPreloader: React.FC<HexagonPreloaderProps> = ({ isDark }) => {
  const { isLoading, progress } = useImagePreloader();
  const startTimeRef = useRef<number>(0);
  const [exit, setExit] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(2000 - elapsed, 0);
      const timeoutId = setTimeout(() => {
        setTimeout(() => setExit(true), 400);
      }, remainingTime);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  if (!visible) return null;

  // Theme palette
  const bg = isDark
    ? 'radial-gradient(ellipse at 50% 40%, #1a1033 0%, #0a0612 55%, #050308 100%)'
    : 'radial-gradient(ellipse at 50% 40%, #f5f3ff 0%, #e0e7ff 55%, #c7d2fe 100%)';
  const accentA = isDark ? '#a855f7' : '#7c3aed';
  const accentB = isDark ? '#ec4899' : '#db2777';
  const accentC = isDark ? '#22d3ee' : '#0891b2';
  const textColor = isDark ? '#e9d5ff' : '#312e81';
  const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(49,46,129,0.12)';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: bg }}
      initial={{ opacity: 1 }}
      animate={exit ? { opacity: 0, scale: 1.05, filter: 'blur(20px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => { if (exit) setVisible(false); }}
    >
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Hex loader */}
      <div className="hex-stage" aria-label="Loading">
        <svg className="hex-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentA} />
              <stop offset="50%" stopColor={accentB} />
              <stop offset="100%" stopColor={accentC} />
            </linearGradient>
            <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rotating hex */}
          <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
            <polygon
              points="100,15 173,57 173,143 100,185 27,143 27,57"
              fill="none"
              stroke="url(#hexGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              opacity="0.55"
            />
          </g>

          {/* Middle hex with stroke draw */}
          <g style={{ transformOrigin: '100px 100px' }} className="spin-rev">
            <polygon
              points="100,35 158,67 158,133 100,165 42,133 42,67"
              fill="none"
              stroke="url(#hexGrad)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="url(#hexGlow)"
              className="draw"
            />
          </g>

          {/* Inner pulsing hex */}
          <g style={{ transformOrigin: '100px 100px' }} className="pulse-scale">
            <polygon
              points="100,60 135,80 135,120 100,140 65,120 65,80"
              fill="url(#hexGrad)"
              opacity="0.18"
            />
            <polygon
              points="100,60 135,80 135,120 100,140 65,120 65,80"
              fill="none"
              stroke="url(#hexGrad)"
              strokeWidth="2"
              filter="url(#hexGlow)"
            />
          </g>

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill={accentB} className="center-dot" filter="url(#hexGlow)" />

          {/* Orbiting particles */}
          <g style={{ transformOrigin: '100px 100px' }} className="spin-fast">
            <circle cx="100" cy="20" r="3" fill={accentA} filter="url(#hexGlow)" />
            <circle cx="170" cy="140" r="2.5" fill={accentB} filter="url(#hexGlow)" />
            <circle cx="30" cy="140" r="2.5" fill={accentC} filter="url(#hexGlow)" />
          </g>
        </svg>
      </div>

      {/* Loading text with shimmer */}
      <div className="loader-text" style={{ color: textColor, marginTop: 5 }}>
        <span className="dot-1">.</span>
        <span className="dot-2">.</span>
        <span className="dot-3">.</span>
      </div>

      <div className="loader-text" style={{ color: textColor }}>
        <span className="shimmer-text">Loading</span>
      </div>
      

      {/* Progress bar */}
      <div className="progress-shell" style={{ background: trackColor }}>
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accentA}, ${accentB}, ${accentC})`,
          }}
        />
      </div>
      <div className="progress-pct" style={{ color: textColor }}>
        {Math.round(progress)}%
      </div>

      <style>{`
        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          opacity: ${isDark ? 0.45 : 0.35};
          pointer-events: none;
          mix-blend-mode: ${isDark ? 'screen' : 'multiply'};
        }
        .orb-1 { width: 380px; height: 380px; background: ${accentA}; top: 10%; left: 8%; animation: float1 9s ease-in-out infinite; }
        .orb-2 { width: 320px; height: 320px; background: ${accentB}; bottom: 8%; right: 10%; animation: float2 11s ease-in-out infinite; }
        .orb-3 { width: 260px; height: 260px; background: ${accentC}; top: 55%; left: 55%; animation: float3 13s ease-in-out infinite; }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(49,46,129,0.06)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(49,46,129,0.06)'} 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          pointer-events: none;
        }

        .hex-stage {
          width: 220px;
          height: 220px;
          position: relative;
          display: grid;
          place-items: center;
        }
        .hex-svg { width: 100%; height: 100%; overflow: visible; }

        .spin-slow { animation: spin 14s linear infinite; }
        .spin-rev  { animation: spin 9s linear infinite reverse; }
        .spin-fast { animation: spin 4s linear infinite; }

        .pulse-scale {
          animation: pulseScale 2.4s ease-in-out infinite;
          transform-box: fill-box;
        }
        .center-dot { animation: dotPulse 1.4s ease-in-out infinite; }

        .draw {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw 3s ease-in-out infinite;
        }

        .loader-text {
          margin-top: 28px;
          font-family: 'Comfortaa', system-ui, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.12em;
          display: inline-flex;
          align-items: baseline;
          gap: 1px;
        }
        .shimmer-text {
          background: linear-gradient(90deg, ${textColor} 0%, ${accentB} 50%, ${textColor} 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2.4s linear infinite;
        }
        .dot-1, .dot-2, .dot-3 { animation: blink 1.4s infinite; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }

        .progress-shell {
          margin-top: 20px;
          width: min(60%, 320px);
          height: 6px;
          border-radius: 999px;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.25);
          position: relative;
        }
        .progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.35s ease;
          box-shadow: 0 0 12px ${accentB}, 0 0 24px ${accentA};
          position: relative;
        }
        .progress-fill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: sweep 1.6s linear infinite;
        }
        .progress-pct {
          margin-top: 10px;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.85rem;
          font-variant-numeric: tabular-nums;
          opacity: 0.8;
          letter-spacing: 0.15em;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseScale {
          0%, 100% { transform: scale(0.92); opacity: 0.85; }
          50%      { transform: scale(1.08); opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { r: 3; opacity: 0.7; }
          50%      { r: 6; opacity: 1; }
        }
        @keyframes draw {
          0%   { stroke-dashoffset: 400; }
          50%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -400; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40%           { opacity: 1; }
        }
        @keyframes sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(40px,-30px) scale(1.1); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-50px,-20px) scale(1.08); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-30px,40px) scale(1.12); }
        }

        @media (prefers-reduced-motion: reduce) {
          .spin-slow, .spin-rev, .spin-fast, .pulse-scale, .center-dot,
          .draw, .shimmer-text, .dot-1, .dot-2, .dot-3,
          .orb-1, .orb-2, .orb-3, .progress-fill::after {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default HexagonPreloader;
