import { useEffect, useRef } from 'react';

// Brand water-contour pattern (design guide §3b).
// variant: 1 | 4 | 5 | 'horizon' (pond surface, lines bunch toward the top) | 'sky' (lines bunch toward the bottom).
// Changing variant morphs from the lines as currently drawn, so switching mid-morph never jumps.
// chaos 0..1: evenly spaced clean current ↔ uneven, wandering lines (still smooth). Cultivator turns disorder into a usable signal.
// frozen = 02:13 failure state. Fast scrolling stirs the water.
// Optional life: `dotted` draws each line as a row of dots (sampled data points), `interactive` sends soft ring ripples out from the cursor, `pulses` sends small ripples along
// random lines as tiny travelling waves (data flowing), and a heartbeat burst sweeps across every few seconds.
const STROKE = { 1: '#FF802E', 4: '#FF802E', 5: '#FFFFFF', horizon: '#FFFFFF', sky: '#FFFFFF' };
const GREY = '#8A8486';
const STEP = 6;

const rand = (i, seed) => {
  const v = Math.sin(i * 91.7 + seed * 17.3) * 43758.5453;
  return v - Math.floor(v) - 0.5; // -0.5..0.5, stable per line
};

function cleanY(v, x, i, n, w, h, A, t, wavelength, convergence, focus) {
  const depth = (i + 1) / n;
  if (v === 5) {
    const y0 = ((i + 0.5) * h) / n;
    const k = Math.exp(-(((x - focus.x) / (w * 0.27)) ** 2));
    return y0 + (focus.y - y0) * convergence * k + A * Math.sin(x / (30 * wavelength) + i * 0.4 + t * 0.6);
  }
  if (v === 'horizon') {
    return h * depth ** 1.7 + A * depth * (Math.sin(x / ((18 + 40 * depth) * wavelength) + i * 0.9 + t * 0.6) + 0.5 * Math.sin(x / (11 * wavelength) - t * 0.5 + i));
  }
  if (v === 'sky') {
    return h * depth ** 0.55 + A * (0.4 + 0.6 * depth) * Math.sin(x / ((60 + 30 * depth) * wavelength) + i * 0.7 + t * 0.35);
  }
  const y0 = ((i + 0.5) * h) / n;
  return y0 + A * Math.sin(x / (34 * wavelength) + i * 0.55 + t * 0.6) + A * 0.6 * Math.sin(x / (15 * wavelength) + i * 1.3 - t * 0.42);
}

// Disorder stays low-frequency so lines remain smooth: uneven spacing + slow wandering swells.
function lineY(v, x, i, n, w, h, A, t, chaos, wavelength, convergence, focus) {
  const y = cleanY(v, x, i, n, w, h, A, t, wavelength, convergence, focus);
  if (chaos < 0.001) return y;
  return y + chaos * (rand(i, 1) * (h / n) * 0.9 + 9 * Math.sin(x / (80 + 60 * (rand(i, 2) + 0.5)) + i * 2.1 + t * 0.5));
}

export default function ContourPattern({ variant = 1, frozen = false, amp = 4.5, speed = 2, lines = 11, wavelength = 1, convergence = 0.45, focusTarget = null, color = null, heartbeat = true, chaos = 0, introChaos = null, pulses = 0, interactive = false, dotted = false, lineOpacity = 1, className = '' }) {
  const svgRef = useRef(null);
  const props = useRef({});
  props.current = { variant, frozen, amp, speed, lines, chaos, wavelength, heartbeat, convergence, focusTarget, color };

  useEffect(() => {
    const svg = svgRef.current;
    const path = svg.firstChild;
    // Cursor ripples: each drop is a ring wave that spreads out and fades (like touching water).
    const drops = [];
    let lastDrop = 0;
    const packets = Array.from({ length: pulses }, (_, i) => ({ i: Math.floor(Math.random() * 99), x: Math.random(), v: 0.04 + Math.random() * 0.05, dir: i % 2 ? 1 : -1 }));
    let clock = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const live = { chaos: introChaos ?? props.current.chaos, amp: props.current.amp, speed: props.current.speed, run: 1, boost: 0, to: props.current.variant, mix: 1 };
    let ys = new Float32Array(0); // last drawn points
    let from = null; // snapshot to morph from
    let t = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let raf = 0;

    const draw = () => {
      const { width: w, height: h } = svg.getBoundingClientRect();
      const target = props.current.focusTarget && document.querySelector(props.current.focusTarget);
      const targetRect = target?.getBoundingClientRect();
      const origin = svg.getBoundingClientRect();
      const focus = targetRect ? { x: targetRect.left + targetRect.width / 2 - origin.left, y: targetRect.top + targetRect.height / 2 - origin.top } : { x: w / 2, y: h / 2 };
      const { frozen: f, lines: n } = props.current;
      const A = live.amp * (1 + 0.9 * live.boost);
      const m = live.mix * live.mix * (3 - 2 * live.mix);
      const cols = Math.floor((w + 12) / STEP) + 1;
      if (ys.length !== cols * n) {
        ys = new Float32Array(cols * n);
        from = null;
      }
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      // Cursor bends nearby lines away; a heartbeat burst sweeps across every 7 s.
      const beatT = (clock % 14) / 2.6;
      const beatX = beatT * (w + 200) - 100;
      const beatOn = beatT < 1 && !f && props.current.heartbeat ? Math.sin(beatT * Math.PI) : 0;
      // Tiny travelling waves: a short ripple riding along a few lines (data flowing through the water).
      const ripples = packets.map((pk) => ({ li: pk.i % n, x: pk.x * (w + 160) - 80, dir: pk.dir }));
      const bump = (x, y, i) => {
        let dy = 0;
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          if (rp.li !== i) continue;
          const u = x - rp.x;
          if (Math.abs(u) < 120) dy += 7 * Math.exp(-((u / 42) ** 2)) * Math.sin(u / 5.5 - clock * 9 * rp.dir);
        }
        for (let q = 0; q < drops.length; q++) {
          const dr = drops[q];
          const age = clock - dr.t;
          if (age > 2) continue;
          const d = Math.hypot(x - dr.x, y - dr.y);
          const front = d - age * 190;
          if (Math.abs(front) < 90) dy += 5 * (1 - age / 2) * Math.exp(-((front / 38) ** 2)) * Math.sin(front / 8);
        }
        if (beatOn) dy += beatOn * 9 * Math.exp(-(((x - beatX) / 70) ** 2)) * Math.sin(x / 6 - clock * 16);
        return dy;
      };
      let d = '';
      let k = 0;
      for (let i = 0; i < n; i++) {
        for (let c = 0; c < cols; c++, k++) {
          const x = -6 + c * STEP;
          let y = lineY(live.to, x, i, n, w, h, A, t, live.chaos, props.current.wavelength, props.current.convergence, focus);
          if (from && m < 1) y = from[k] * (1 - m) + y * m;
          y += bump(x, y, i);
          ys[k] = y;
          d += `${c === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
        }
      }
      path.setAttribute('d', d);
      path.style.stroke = f && live.to !== 5 ? GREY : props.current.color ?? STROKE[live.to];
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = props.current;
      const ease = (cur, target, rate) => cur + (target - cur) * Math.min(1, dt * rate);
      if (p.variant !== live.to) {
        from = ys.length ? Float32Array.from(ys) : null;
        live.to = p.variant;
        live.mix = 0;
      }
      live.mix = Math.min(1, live.mix + dt / 1.1);
      if (live.mix >= 1) from = null;
      const y = window.scrollY;
      const vel = dt > 0 ? Math.abs(y - lastY) / dt : 0;
      lastY = y;
      live.amp = ease(live.amp, p.amp, 1.5);
      live.speed = ease(live.speed, p.speed, 1.5);
      live.run = ease(live.run, p.frozen ? 0 : 1, 2.5);
      live.chaos = ease(live.chaos, p.chaos, 0.9);
      live.boost = ease(live.boost, p.frozen ? 0 : Math.min(1, vel / 2500), 3);
      t += dt * live.speed * live.run * (1 + 0.6 * live.boost);
      clock += dt * live.run;
      packets.forEach((pk) => {
        pk.x += pk.dir * pk.v * dt * live.run;
        if (pk.x > 1.1 || pk.x < -0.1) {
          pk.x = pk.dir > 0 ? -0.1 : 1.1;
          pk.i = Math.floor(Math.random() * 99);
          pk.v = 0.08 + Math.random() * 0.1;
        }
      });
      while (drops.length && clock - drops[0].t > 2) drops.shift();
      draw();
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      draw();
      return undefined;
    }

    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (e.isIntersecting) {
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(svg);
    const onMove = (e) => {
      if (e.pointerType !== 'mouse' || props.current.frozen) return;
      const now = performance.now();
      if (now - lastDrop < 220) return;
      lastDrop = now;
      const r = svg.getBoundingClientRect();
      drops.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: clock });
      if (drops.length > 5) drops.shift();
    };
    const onLeave = () => {};
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
    // Props are read live from props.current; the loop is set up once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg ref={svgRef} aria-hidden="true" className={`pointer-events-none ${className}`} preserveAspectRatio="none">
      <path
        fill="none"
        strokeWidth={dotted ? 2.4 : 1.25}
        strokeDasharray={dotted ? '0.01 9' : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 700ms ease', opacity: lineOpacity }}
      />
    </svg>
  );
}
