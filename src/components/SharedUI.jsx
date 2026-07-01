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
          className="p-2 rounded-lg text-white/70 transition hover:text-white hover:scale-110 hover:bg-white/5"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/cultivatorteam/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-white/70 transition hover:text-white hover:scale-110 hover:bg-white/5"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>
      <span>&copy; 2026 Cultivator. All rights reserved.</span>
    </div>
  </footer>
);
