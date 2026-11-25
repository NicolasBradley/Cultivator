import { useEffect, useRef, useState } from 'react';

// Photo that, on a slow connection, first appears as ASCII art built from a tiny preview (lqip),
// flickering like the logo's ASCII state, then dissolves into the real photo once it arrives.
// Fast connections / cached photos skip the ASCII entirely and just fade in.
//
//  phase: 'idle'  → waiting (image not visible yet, or loading quickly)
//         'ascii' → still loading after a short grace period (or the browser reports a slow network)
//         'done'  → photo loaded

const RAMP = ' .:-=+*#%@';
const GRACE_MS = 350;

const slowNetwork = () => {
  const c = navigator.connection;
  return Boolean(c && (c.saveData || ['slow-2g', '2g', '3g'].includes(c.effectiveType)));
};

export default function AsciiImg({ src, alt, lqip, className = '', imgClassName = '', color = '#FF802E' }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('idle');

  // Decide whether to show ASCII: only once the photo is (nearly) on screen and still hasn't loaded.
  useEffect(() => {
    const img = imgRef.current;
    if (img.complete && img.naturalWidth) {
      setPhase('done');
      return undefined;
    }
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = setTimeout(() => {
          if (!(img.complete && img.naturalWidth)) setPhase((p) => (p === 'done' ? p : 'ascii'));
        }, slowNetwork() ? 0 : GRACE_MS);
      },
      { rootMargin: '200px' },
    );
    io.observe(wrapRef.current);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  // Draw the ASCII preview while waiting.
  useEffect(() => {
    if (phase !== 'ascii' || !lqip) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const raw = Uint8Array.from(atob(lqip.d), (ch) => ch.charCodeAt(0));
    // Contrast-stretch + gamma so subjects read as shapes instead of a uniform field of glyphs.
    let lo = 255;
    let hi = 0;
    raw.forEach((v) => {
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    });
    const tone = Array.from(raw, (v) => ((v - lo) / Math.max(1, hi - lo)) ** 1.8);
    let raf = 0;
    let last = 0;
    let tick = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 110) return;
      last = now;
      tick += 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(width * dpr)) canvas.width = Math.round(width * dpr);
      if (canvas.height !== Math.round(height * dpr)) canvas.height = Math.round(height * dpr);
      const cw = canvas.width / lqip.c;
      const ch = canvas.height / lqip.r;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `600 ${Math.min(cw * 1.7, ch * 1.05)}px ui-monospace, Menlo, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let y = 0; y < lqip.r; y++) {
        for (let x = 0; x < lqip.c; x++) {
          const b = tone[y * lqip.c + x];
          let k = Math.round(b * (RAMP.length - 1));
          // gentle flicker: a few cells swap to a neighbouring glyph each tick
          if (((x * 73856093) ^ (y * 19349663) ^ (tick * 83492791)) % 17 === 0) k = Math.max(0, Math.min(RAMP.length - 1, k + (tick % 2 ? 1 : -1)));
          if (k > 1) ctx.fillText(RAMP[k], (x + 0.5) * cw, (y + 0.5) * ch);
        }
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [phase, lqip, color]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-[#231F20] ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setPhase('done')}
        className={imgClassName}
        style={{
          opacity: phase === 'done' ? 1 : 0,
          filter: phase === 'done' ? 'none' : 'blur(10px)',
          transform: phase === 'done' ? 'none' : 'scale(1.04)',
          transition: 'opacity 700ms ease, filter 900ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1)',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: phase === 'ascii' ? 1 : 0, transition: 'opacity 600ms ease' }}
      />
    </div>
  );
}
