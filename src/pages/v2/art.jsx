import { useEffect, useRef } from 'react';
import { SHRIMP_PARTS, SHRIMP_VIEWBOX } from '../../components/shrimpParts';
import { AERATOR } from './realShapes';

// Vector art kit for /v2. Flat, 1.25–2px lines, brand colours only (currentColor where possible).

const VB = SHRIMP_VIEWBOX.join(' ');

// Shrimp mark as a reusable <symbol>; render <ShrimpSymbol/> once, then <ShrimpGlyph/> anywhere.
export function ShrimpSymbol() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <symbol id="v2-shrimp" viewBox={VB}>
        <g fillRule="evenodd">
          {SHRIMP_PARTS.map((p) => <path key={p.id} d={p.d} />)}
        </g>
      </symbol>
      <symbol id="v2-aerator" viewBox={AERATOR.viewBox.join(' ')}>
        {/* Small-size version: solid silhouette so it stays legible as an icon. */}
        <path d={AERATOR.body} fill="currentColor" fillOpacity="0.92" />
        <path d={AERATOR.metal} fill="currentColor" />
        <path d={AERATOR.wheels} fill="#FF802E" fillRule="evenodd" />
      </symbol>
      {/* Whole shrimp, side view (head left): body, full tail fan, shell segments, legs, antennae.
          Segment lines and eye use the night ink so they read as gaps in the shell. */}
      <symbol id="v2-shrimp-real" viewBox="0 0 220 124">
        <path d="M10 45 L40 37 C58 29 84 25 108 25 C134 25 157 33 171 49 C183 62 188 78 184 91 C182 97 177 101 171 102 C166 96 166 84 160 74 C152 64 140 57 124 56 C110 55 96 57 80 59 C64 61 50 58 40 53 C32 50 24 48 10 45 Z" />
        <path d="M171 99 C164 106 154 114 146 120 C158 121 168 117 174 110 C178 117 188 121 200 119 C193 112 185 104 178 97 Z" />
        <g fill="none" stroke="#231F20" strokeWidth="2.4" strokeLinecap="round">
          <path d="M118 26 C121 38 121 48 117 56" />
          <path d="M134 28 C137 40 135 50 131 57" />
          <path d="M149 35 C150 47 147 57 142 61" />
          <path d="M162 45 C161 56 157 64 152 67" />
          <path d="M174 60 C169 68 165 73 161 77" />
          <path d="M44 41 C62 46 82 47 100 44" strokeWidth="1.6" />
        </g>
        <circle cx="40" cy="40" r="3.4" fill="#231F20" />
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M58 59 L52 76 L46 84 M70 59 L66 78 L60 89 M82 58 L80 79 L74 91 M94 57 L94 77 L90 87 M106 56 L108 74 L104 83" />
          <path d="M124 57 L127 68 M137 60 L140 71 M149 65 L151 75 M20 47 L4 53 M22 48 L7 60" />
        </g>
        <path d="M32 39 C24 10 90 -2 214 10 M35 41 C44 18 116 12 216 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </symbol>
    </svg>
  );
}

export function ShrimpGlyph({ size = 32, real = false, className = '', style }) {
  return (
    <svg viewBox={real ? '0 0 220 124' : VB} width={size} height={real ? (size * 124) / 220 : size} className={className} style={style} fill="currentColor" overflow="visible" aria-hidden="true">
      <use href={real ? '#v2-shrimp-real' : '#v2-shrimp'} />
    </svg>
  );
}

// Paddlewheel, face-on. paddleStyle(i) lets scenes stagger paddles in.
export function Paddlewheel({ className = '', style, paddleStyle, stroke = 'currentColor' }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle r="70" />
      <circle r="20" />
      <circle r="6" fill={stroke} />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`} style={paddleStyle?.(i)}>
          <path d="M0 -20 V-70" />
          <rect x="-15" y="-96" width="30" height="24" rx="4" fill={stroke} fillOpacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

// The traced real aerator as a lightweight reusable glyph (needs <ShrimpSymbol/> on the page).
export function AeratorGlyph({ className = '', style }) {
  const [, , w, h] = AERATOR.viewBox;
  return (
    <svg viewBox={AERATOR.viewBox.join(' ')} className={className} style={{ aspectRatio: `${w} / ${h}`, ...style }} aria-hidden="true">
      <use href="#v2-aerator" />
    </svg>
  );
}

// Small spinning wheel icon (impact grid, scroll indicator).
export function WheelIcon({ className = '', style }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <circle r="8" />
      <circle r="1.8" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} d="M0 -1.8 V-8 M-2.4 -10.5 H2.4" transform={`rotate(${a})`} />
      ))}
    </svg>
  );
}

// Aerator, front view, traced from a real 2-wheel paddlewheel aerator:
// motor housing + floats as outlines, shaft/frame in white, the paddlewheels in brand orange.
// Children render inside (the device clips on under the motor).
export function AeratorFront({ className = '', style, children }) {
  return (
    <svg viewBox={AERATOR.viewBox.join(' ')} className={className} style={style} aria-hidden="true">
      <path d="M31 468 H777" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 10" opacity="0.45" />
      <path d={AERATOR.body} fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d={AERATOR.metal} fill="currentColor" fillOpacity="0.8" />
      <path d={AERATOR.wheels} fill="#FF802E" fillRule="evenodd" />
      {children}
    </svg>
  );
}

// Cultivator device, clipped on under the motor (AeratorFront coordinates).
export function DeviceOnMotor({ style, calloutStyle }) {
  return (
    <>
      <g style={style}>
        <rect x="389" y="296" width="52" height="42" rx="7" fill="#FF802E" stroke="#231F20" strokeWidth="2" />
        <circle cx="428" cy="309" r="4" fill="#FFFFFF" />
        <path d="M400 326 H420" stroke="#231F20" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g style={calloutStyle} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M441 304 L500 128 H700" />
        <path d="M441 330 L520 178 H700" />
        <g fill="currentColor" stroke="none" fontSize="18">
          <text x="504" y="120">Current + vibration sensor</text>
          <text x="524" y="170">Clips on under the motor</text>
        </g>
      </g>
    </>
  );
}

// Live waveform. ampRef.current = { amp: 0..1, spike: 0..1 }. kind: 'hum' | 'current' | 'vibration'.
export function Waveform({ ampRef, kind = 'hum', className = '', color = 'currentColor' }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = svgRef.current;
    const path = svg.firstChild;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const { width: w, height: h } = svg.getBoundingClientRect();
      const { amp = 1, spike = 0 } = ampRef?.current ?? {};
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      let d = '';
      for (let x = 0; x <= w; x += 3) {
        let s;
        if (kind === 'current') s = Math.tanh(3 * Math.sin(x / 14 - t * 6)) * 0.8;
        else if (kind === 'vibration') s = Math.sin(x / 5 + t * 23) * 0.5 + Math.sin(x / 2.3 - t * 31) * 0.3 + Math.sin(x / 11 + t * 7) * 0.2;
        else s = Math.sin(x / 9 - t * 9) * 0.7 + Math.sin(x / 23 + t * 4) * 0.3;
        const burst = spike * Math.exp(-(((x - w * 0.62) / (w * 0.08)) ** 2)) * Math.sin(x / 2 + t * 40) * 2.2;
        const y = h / 2 - (s * amp + burst) * h * 0.32;
        d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
      }
      path.setAttribute('d', d);
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (e.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(svg);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ampRef, kind]);

  return (
    <svg ref={svgRef} className={`block w-full ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <path fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 600ms ease' }} />
    </svg>
  );
}
