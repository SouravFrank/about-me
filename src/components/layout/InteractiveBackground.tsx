import { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  isDark: boolean;
}

/**
 * A fixed, full-viewport background that:
 *  - Renders a slow drifting aurora/grid using canvas
 *  - Reacts to mouse movement (parallax-style spotlight follows the cursor)
 *  - Spawns subtle floating particles with parallax depth
 * Stays behind all content via z-index.
 */
const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      depth: Math.random() * 0.8 + 0.2,
    }));

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth;
      mouse.current.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    let t = 0;
    const tick = () => {
      t += 0.004;
      // ease mouse
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Move spotlight DOM element
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${mouse.current.x * width - 300}px, ${mouse.current.y * height - 300}px, 0)`;
      }

      // Draw connecting lines between nearby particles
      const linkDist = 130;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // parallax shift toward mouse
        const px = p.x + (mouse.current.x - 0.5) * 40 * p.depth;
        const py = p.y + (mouse.current.y - 0.5) * 40 * p.depth;

        // update
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // draw particle
        const alpha = isDark ? 0.55 : 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${280 + Math.sin(t + i) * 30}, 90%, 75%, ${alpha})`
          : `hsla(${280 + Math.sin(t + i) * 30}, 80%, 50%, ${alpha})`;
        ctx.fill();

        // links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const qx = q.x + (mouse.current.x - 0.5) * 40 * q.depth;
          const qy = q.y + (mouse.current.y - 0.5) * 40 * q.depth;
          const dx = px - qx;
          const dy = py - qy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const a = (1 - d / linkDist) * (isDark ? 0.18 : 0.12);
            ctx.strokeStyle = isDark
              ? `hsla(290, 90%, 80%, ${a})`
              : `hsla(280, 80%, 45%, ${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(qx, qy);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDark]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient wash */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_top,_rgba(76,29,149,0.35),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(14,116,144,0.3),_transparent_60%)]'
            : 'bg-[radial-gradient(ellipse_at_top,_rgba(196,181,253,0.45),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(165,243,252,0.4),_transparent_60%)]'
        }`}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />

      {/* Mouse-following spotlight */}
      <div
        ref={spotRef}
        className="absolute h-[600px] w-[600px] rounded-full will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(217,70,239,0.22) 0%, rgba(124,58,237,0.12) 35%, transparent 70%)'
            : 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, rgba(56,189,248,0.12) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveBackground;
