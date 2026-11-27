import { useEffect, useRef } from 'react';

// 23:00 "How farmers cope now": a small farmer with a flashlight patrols the line above the three ways farmers cope.
// Loop: he rests in his hut → the aerator on the right stops (shakes, red alert, the lamp by the hut turns on,
// $ and −O₂ float away) → he only notices 1–3 s later, as in real life → sprints to it → it runs again (lamp off)
// → he walks back to the hut (faster than a stroll, slower than the sprint) → again.
// Flat orange, side view, conical hat. Drawn with plain SVG each frame; only runs while on screen.
// Reduced motion: one still frame (farmer standing, light on, no alert).

const O = '#FF802E';
const RED = '#D92D20'; // alarm red from the design spec (same as the LINE "aerator down" alert)
const H = 76; // drawing height in px; the farmer's feet and the aerator stand on the bottom edge
const FS = 0.78; // farmer scale (about 48 px tall)
const AS = 0.9; // aerator scale
const SPRINT = 260; // px per second
const WALK = 110; // px per second, the walk back

const line = (a, b, w, op) =>
  `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${O}" stroke-width="${w}" stroke-linecap="round"${op ? ` opacity="${op}"` : ''}/>`;
const P = (o, len, a) => [o[0] + len * Math.sin(a), o[1] + len * Math.cos(a)];

function farmerSvg(mode, ph) {
  const run = mode === 'run';
  const walk = mode === 'walk';
  const amp = run ? 1.0 : walk ? 0.55 : 0;
  const lean = run ? 0.32 : walk ? 0.1 : 0.06;
  const bob = run ? -Math.abs(Math.sin(ph)) * 5 : walk ? -Math.abs(Math.sin(ph)) * 2.5 : 0;
  const hip = [0, -27 + bob + (run ? 2 : 0)];
  let s = '';
  const leg = (p, op) => {
    const t = amp * Math.sin(p);
    const bend = run ? 0.15 + 1.3 * Math.max(0, Math.sin(p + 1.4)) : walk ? 0.1 + 0.6 * Math.max(0, Math.sin(p + 1.4)) : 0;
    const k = P(hip, 13, t);
    const f = P(k, 13, t - bend);
    s += line(hip, k, 6, op) + line(k, f, 6, op);
  };
  const sh = [hip[0] + Math.sin(lean) * 20, hip[1] - Math.cos(lean) * 20];
  const backA = run ? -1.1 * Math.sin(ph) : walk ? -0.6 * Math.sin(ph) : 0.15;
  leg(ph + Math.PI, 0.55);
  const elbow = P(sh, 9, backA);
  s += line(sh, elbow, 5, 0.55) + line(elbow, P(elbow, 8, backA + (run ? 1.4 : 0.6)), 5, 0.55);
  s += line(hip, sh, 11);
  const hd = [sh[0] + Math.sin(lean) * 9, sh[1] - Math.cos(lean) * 9];
  s += `<circle cx="${(hd[0] + 1.5).toFixed(1)}" cy="${hd[1].toFixed(1)}" r="6.5" fill="${O}"/>`;
  s += `<path d="M${(hd[0] - 12).toFixed(1)} ${(hd[1] - 3).toFixed(1)} L${(hd[0] + 1.5).toFixed(1)} ${(hd[1] - 15).toFixed(1)} L${(hd[0] + 15).toFixed(1)} ${(hd[1] - 3).toFixed(1)} Z" fill="${O}" stroke="#231F20" stroke-width="1.5" stroke-linejoin="round"/>`;
  leg(ph, 0);
  // Flashlight held straight ahead; it only bobs a little with each step.
  const ta = 1.6 + (run ? 0.05 * Math.sin(ph * 2) : walk ? 0.03 * Math.sin(ph * 2) : 0);
  const hand = P(sh, 17, ta);
  s += line(sh, hand, 5);
  const deg = 90 - (ta * 180) / Math.PI;
  const beam = `<g transform="translate(${hand[0].toFixed(1)} ${hand[1].toFixed(1)}) rotate(${deg.toFixed(1)})"><rect x="6" y="-1.2" width="${run ? 95 : 120}" height="2.4" fill="url(#v2-farmer-beam)"/><rect x="-1" y="-3" width="8" height="6" rx="1.5" fill="#fff"/></g>`;
  return beam + s;
}

function aeratorSvg(alarm, wheel, t) {
  const jx = alarm ? (Math.random() - 0.5) * 4 : 0;
  const jy = alarm ? (Math.random() - 0.5) * 2 : 0;
  let s = `<g transform="translate(${jx.toFixed(1)} ${jy.toFixed(1)})">`;
  s += '<rect x="-26" y="-12" width="52" height="10" rx="4" fill="none" stroke="#fff" stroke-width="2"/>';
  s += '<rect x="-7" y="-36" width="14" height="24" rx="4" fill="#fff"/>';
  s += `<g transform="translate(-22 -10) rotate(${wheel.toFixed(1)})"><circle r="9" fill="none" stroke="${O}" stroke-width="2.5"/>`;
  for (let i = 0; i < 6; i += 1) s += `<line x1="0" y1="0" x2="${(9 * Math.cos(i * 1.047)).toFixed(1)}" y2="${(9 * Math.sin(i * 1.047)).toFixed(1)}" stroke="${O}" stroke-width="2"/>`;
  s += '</g>';
  if (alarm) {
    const b = Math.abs(Math.sin(t * 7)) * 4;
    s += `<g transform="translate(0 ${(-50 - b).toFixed(1)})"><circle r="11" fill="${RED}"/><text x="0" y="5" text-anchor="middle" fill="#fff" font-size="15" font-weight="800" font-family="Manrope, sans-serif">!</text></g>`;
    s += `<path d="M14 -30 q6 -4 0 -8 M20 -28 q9 -6 0 -12" fill="none" stroke="${RED}" stroke-width="1.5" opacity="${(0.5 + 0.5 * Math.sin(t * 12)).toFixed(2)}"/>`;
  }
  return `${s}</g>`;
}

// The farmer's hut at the left end of the line: white walls, door, orange roof (like his hat).
// The window glows while he is inside. A lamp on a post beside the hut is ON while the aerator is off
// and goes OFF once it runs again.
function hutSvg(farmerInside, lampOn) {
  let s = '<rect x="-34" y="-40" width="68" height="40" fill="#231F20" stroke="#fff" stroke-width="2"/>';
  s += `<rect x="-8" y="-26" width="16" height="26" fill="${farmerInside ? '#2a2526' : '#151213'}" stroke="#fff" stroke-width="1.5"/>`;
  s += `<rect x="14" y="-30" width="12" height="10" fill="${farmerInside ? '#FFE7D8' : '#151213'}" stroke="#fff" stroke-width="1.5"/>`;
  s += `<path d="M-44 -38 L0 -66 L44 -38 Z" fill="${O}" stroke="#231F20" stroke-width="1.5" stroke-linejoin="round"/>`;
  s += '<path d="M-30 -45 L0 -62 M30 -45 L0 -62" stroke="#231F20" stroke-width="1" opacity="0.35"/>';
  // lamp post + hanging lamp
  s += '<path d="M58 0 V-70 H48 V-64" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>';
  if (lampOn) s += '<circle cx="48" cy="-57" r="15" fill="#FFE7D8" opacity="0.18"/><circle cx="48" cy="-57" r="9" fill="#FFE7D8" opacity="0.25"/>';
  s += `<path d="M42 -64 H54 L52 -58 H44 Z" fill="${lampOn ? '#fff' : '#3a3435'}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>`;
  s += `<circle cx="48" cy="-56" r="3.5" fill="${lampOn ? '#FFE7D8' : '#151213'}" stroke="#fff" stroke-width="1.2"/>`;
  return s;
}

// While the aerator is down (before it is fixed), money and oxygen float away from it.
function lossSvg(parts) {
  return parts
    .map((p) => {
      const a = p.life < 0.25 ? p.life / 0.25 : Math.max(0, 1 - (p.life - 0.25) / 1.55);
      return p.o2
        ? `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" fill="${RED}" font-size="13" font-weight="800" font-family="Manrope, sans-serif" opacity="${a.toFixed(2)}">−O₂</text>`
        : `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" fill="${O}" font-size="17" font-weight="800" font-family="Manrope, sans-serif" opacity="${a.toFixed(2)}">$</text>`;
    })
    .join('');
}

export default function NightFarmer({ className = '' }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const whoRef = useRef(null);
  const aerRef = useRef(null);
  const hutRef = useRef(null);
  const fxRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = wrap.clientWidth;
    // Modes: inside (resting in the hut) → unaware (aerator stopped, he hasn't noticed: 1–3 s, random each loop)
    // → run → fix → walk (back to the hut) → inside …
    const state = { x: 0, dir: 1, mode: 'inside', tm: 0, ph: 0, t: 0, wheel: 0, delay: 2, parts: [], spawn: 0 };
    const HUT_X = 46 * FS + 4; // hut centre (its door)
    const aerX = () => W - 34;
    const stopX = () => aerX() - 62;
    state.x = HUT_X;

    const draw = (alarm) => {
      const s = state;
      const inside = s.mode === 'inside' || s.mode === 'unaware';
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      hutRef.current.setAttribute('transform', `translate(${HUT_X.toFixed(1)} ${H}) scale(${FS})`);
      hutRef.current.innerHTML = hutSvg(inside, alarm);
      whoRef.current.setAttribute('transform', `translate(${s.x.toFixed(1)} ${H}) scale(${s.dir * FS} ${FS})`);
      whoRef.current.innerHTML = inside ? '' : farmerSvg(s.mode, s.ph);
      aerRef.current.setAttribute('transform', `translate(${aerX().toFixed(1)} ${H}) scale(${AS})`);
      aerRef.current.innerHTML = aeratorSvg(alarm, s.wheel, s.t);
      fxRef.current.innerHTML = lossSvg(s.parts);
    };

    const step = (dt) => {
      const s = state;
      s.t += dt;
      s.tm += dt;
      let alarm = false;
      if (s.mode === 'inside') {
        if (s.tm > 2) { s.mode = 'unaware'; s.tm = 0; s.delay = 1 + Math.random() * 2; }
      } else if (s.mode === 'unaware') {
        alarm = true;
        if (s.tm > s.delay) { s.mode = 'run'; s.tm = 0; s.dir = 1; s.x = HUT_X; }
      } else if (s.mode === 'run') {
        alarm = true;
        s.x += SPRINT * dt;
        s.ph += dt * 15;
        if (s.x >= stopX()) { s.x = stopX(); s.mode = 'fix'; s.tm = 0; }
      } else if (s.mode === 'fix') {
        alarm = s.tm < 0.6;
        if (s.tm > 1.4) { s.mode = 'walk'; s.tm = 0; s.dir = -1; }
      } else if (s.mode === 'walk') {
        s.x -= WALK * dt;
        s.ph += dt * 10;
        if (s.x <= HUT_X) { s.x = HUT_X; s.mode = 'inside'; s.tm = 0; s.dir = 1; }
      }
      // $ and −O₂ rise from the aerator for as long as it is down.
      if (alarm) {
        s.spawn -= dt;
        if (s.spawn <= 0) {
          s.spawn = 0.32;
          s.parts.push({ x: aerX() - 30 + Math.random() * 50, y: H - 36, vx: (Math.random() - 0.5) * 14, life: 0, o2: Math.random() < 0.4 });
        }
      }
      s.parts.forEach((p) => { p.life += dt; p.y -= 34 * dt; p.x += p.vx * dt; });
      s.parts = s.parts.filter((p) => p.life < 1.8);
      s.wheel += dt * (alarm ? Math.random() * 40 - 20 : 220);
      draw(alarm);
    };

    const ro = new ResizeObserver(() => {
      W = wrap.clientWidth;
      state.x = Math.min(state.x, stopX());
      draw(false);
    });
    ro.observe(wrap);
    draw(false);
    if (reduced) return () => ro.disconnect();

    // Only animate while the section is on screen.
    let raf = 0;
    let last = 0;
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
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
    io.observe(wrap);
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`pointer-events-none relative h-[76px] ${className}`} aria-hidden="true">
      <svg ref={svgRef} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="v2-farmer-beam" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FFE7D8" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FFE7D8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g ref={hutRef} />
        <g ref={aerRef} />
        <g ref={fxRef} />
        <g ref={whoRef} />
      </svg>
    </div>
  );
}
