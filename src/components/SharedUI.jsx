import { useEffect, useRef, useState } from 'react';

export const GlassCard = ({ children, className = '' }) => (
  <div className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

export const LiquidGlassCard = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] backdrop-blur-2xl ${className}`}>
    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-60 pointer-events-none"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

export const FadeIn = ({ children, delay = 0, className = '' }) => {
  const domRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`will-change-transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-screen">
      <div 
        className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(57,182,255,0.12),rgba(255,120,40,0.08)_38%,transparent_62%)] rounded-full blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${position.x - 300}px, ${position.y - 300}px)` }}
      />
    </div>
  );
};

export const Footer = () => (
  <footer className="border-t border-tealblue/30 bg-navy px-4 py-10">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-lightgrey md:flex-row">
      <span className="font-bold text-white">Cultivator</span>
      <span>Partnering with shrimp farmers across Asia.</span>
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/company/cultivatortech/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/70 transition hover:text-white hover:scale-105"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/cultivatorteam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/70 transition hover:text-white hover:scale-105"
          aria-label="Instagram"
        >
          Instagram
        </a>
      </div>
      <span>&copy; 2026 Cultivator. All rights reserved.</span>
    </div>
  </footer>
);
