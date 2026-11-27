import { useEffect, useRef } from 'react';
import { SHRIMP_PARTS, SHRIMP_VIEWBOX } from '../../components/shrimpParts';
import { AERATOR } from './realShapes';
import { DEVICE_POINTS } from './devicePoints';

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
// Children render inside (cable, electrical box, probe).

// One wavy line across the drawing, two wave periods wider than it so it can drift sideways and loop seamlessly.
const WAVE_PERIOD = 64;
const wavePath = (y, amp) => {
  let d = `M-33 ${y}`;
  for (let x = -33; x < 841; x += WAVE_PERIOD) d += ` q${WAVE_PERIOD / 4} ${-amp} ${WAVE_PERIOD / 2} 0 t${WAVE_PERIOD / 2} 0`;
  return d;
};
// [y, amplitude, opacity, seconds per period, direction]
const WATER = [
  [466, 6, 0.75, 3.2, 1],
  [486, 5, 0.45, 4.6, -1],
  [506, 4, 0.25, 6.4, 1],
];

// The pond surface under the aerator: three wave lines drifting at different speeds (still under reduced motion).
// The floats sit in it, so it is drawn on top of them; a light fill below the top line reads as water.
function Water() {
  return (
    <g clipPath="url(#v2-water-clip)" fill="none" stroke="currentColor" strokeLinecap="round">
      <defs>
        <clipPath id="v2-water-clip"><rect x="31" y="440" width="746" height="100" /></clipPath>
      </defs>
      {WATER.map(([y, amp, op, dur, dir], i) => (
        <g key={y} className="v2-anim" style={{ animation: `v2waterdrift ${dur}s linear infinite`, animationDirection: dir > 0 ? 'normal' : 'reverse' }}>
          {i === 0 && <path d={`${wavePath(y, amp)} V540 H-33 Z`} fill="currentColor" fillOpacity="0.07" stroke="none" />}
          <path d={wavePath(y, amp)} strokeWidth={i === 0 ? 2.5 : 2} opacity={op} />
        </g>
      ))}
    </g>
  );
}

export function AeratorFront({ className = '', style, children }) {
  return (
    <svg viewBox={AERATOR.viewBox.join(' ')} className={`overflow-visible ${className}`} style={style} aria-hidden="true">
      <path d={AERATOR.body} fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d={AERATOR.metal} fill="currentColor" fillOpacity="0.8" />
      <path d={AERATOR.wheels} fill="#FF802E" fillRule="evenodd" />
      <Water />
      {children}
    </svg>
  );
}

// Where the Cultivator sensor really goes (Nov 2026 deck p.8): nothing is mounted on the aerator.
// The aerator's power cable runs back to the farm's existing electrical box on the bank, and a
// US$10 current clamp sits around that cable inside the box. (AeratorFront coordinates.)
// The sealed field box (electronics) sits inside the same electrical box, and one RS-485 cable runs from it
// down to the dissolved oxygen / pH probe in the pond.
// cableStyle draws the power cable in; boxStyle shows the electrical box; clampStyle / fieldBoxStyle / probeStyle
// show each part; leaders[i] shows the arrow for numbered label i+1 (labels are HTML, see DEVICE_LABELS in scenes.jsx).
export function CableToBox({ cableStyle, boxStyle, clampStyle, fieldBoxStyle, probeStyle, leaderStyles = [] }) {
  const leader = (p, style) => (
    <g style={style}>
      <path d={`M${p.from[0]} ${p.from[1]} L${p.to[0]} ${p.to[1]}`} stroke="#FFFFFF" strokeWidth="2" markerEnd="url(#v2-arrow)" />
    </g>
  );
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <marker id="v2-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L9 5 L1 9 Z" fill="#FFFFFF" />
        </marker>
      </defs>
      {/* power cable: motor → electrical box */}
      <path d="M463 132 C520 132 560 150 612 150 C660 150 690 150 711 150" stroke="currentColor" strokeWidth="5" pathLength="1" strokeDasharray="1" style={cableStyle} />
      {/* the farm's existing electrical box, on the bank behind the aerator */}
      <g style={boxStyle}>
        <rect x="690" y="72" width="84" height="96" rx="6" fill="#231F20" stroke="currentColor" strokeWidth="3" />
        <path d="M711 150 V96" stroke="currentColor" strokeWidth="5" />
      </g>
      {/* 1. the current clamp around the cable, inside the box */}
      <g style={clampStyle}>
        <rect x="700" y="124" width="22" height="18" rx="4" fill="#FF802E" stroke="#231F20" strokeWidth="2" />
      </g>
      {/* 3. the sealed field box, also inside the electrical box, with its cable connectors underneath */}
      <g style={fieldBoxStyle}>
        <rect x="731" y="88" width="34" height="46" rx="4" fill="#E8E4E0" stroke="#231F20" strokeWidth="2" />
        <path d="M739 98 H757" stroke="#231F20" strokeWidth="2" opacity="0.35" />
        <path d="M740 134 V142 M748 134 V142 M756 134 V142" stroke="#FF802E" strokeWidth="4" />
      </g>
      {/* 2. RS-485 cable from the field box down into the pond. It leaves the bottom of the drawing at x 767;
          DeviceScene continues it as a long line down the right side to the probe at the very bottom
          (the probe reads the water near the pond floor). */}
      <g style={probeStyle}>
        <path d="M756 142 V172 C756 182 767 182 767 194 V505" stroke="currentColor" strokeWidth="3" strokeDasharray="6 5" opacity="0.85" />
      </g>
      {leader(DEVICE_POINTS.clamp, leaderStyles[0])}
      {leader(DEVICE_POINTS.fieldBox, leaderStyles[2])}
    </g>
  );
}

// The dissolved oxygen / pH probe, drawn large: dark body, orange band, sensor tip down, bubbles at the tip.
export function ProbeGlyph({ className = '', style }) {
  return (
    <svg viewBox="-20 -4 40 128" className={`overflow-visible ${className}`} style={style} aria-hidden="true" fill="none" strokeLinecap="round">
      <rect x="-17" y="0" width="34" height="104" rx="13" fill="#231F20" stroke="currentColor" strokeWidth="3.5" />
      <path d="M-13 22 H13" stroke="#FF802E" strokeWidth="7" />
      <path d="M-11 86 H11" stroke="#FF802E" strokeWidth="4" opacity="0.7" />
      <path d="M0 104 V116" stroke="currentColor" strokeWidth="4" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-10 + i * 10} cy="108" r={3 + (i % 2)} stroke="currentColor" strokeWidth="1.8" opacity="0.8" className="v2-anim" style={{ animation: `v2probebubble 2.4s ease-in ${i * 0.8}s infinite`, transformBox: 'fill-box' }} />
      ))}
    </svg>
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
