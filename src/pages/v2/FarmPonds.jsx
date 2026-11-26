import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { pondLayout } from './pondLayout';
import { viewportHeight } from './scroll';

// Hero farm: a field of ponds seen from high up, each with tiny paddlewheel aerators.
// Scrolling the (pinned) hero moves a camera: it zooms into one pond, then tilts the ground back in 3D
// until the horizon shows, so the shrimp can drop into the water (v2/actor.jsx).

const between = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const coords = (p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const bankPath = (points) => points.map((point, i) => {
  const previous = points[(i + points.length - 1) % points.length];
  const next = points[(i + 1) % points.length];
  const enter = between(point, previous, Math.min(0.22, 24 / Math.hypot(point.x - previous.x, point.y - previous.y)));
  const exit = between(point, next, Math.min(0.22, 24 / Math.hypot(point.x - next.x, point.y - next.y)));
  return `${i ? 'L' : 'M'}${coords(enter)} Q${coords(point)} ${coords(exit)}`;
}).join(' ') + ' Z';

const wavePath = (left, right, direction) => {
  const dx = right.x - left.x, dy = right.y - left.y;
  const length = Math.hypot(dx, dy);
  const amplitude = Math.min(10, length * 0.05) * direction;
  const point = (t, bend = 0) => {
    const p = between(left, right, t);
    return { x: p.x - dy / length * bend, y: p.y + dx / length * bend };
  };
  let path = `M${coords(left)}`;
  for (let segment = 0; segment < 3; segment++) {
    const bend = amplitude * (segment % 2 ? -1 : 1);
    path += ` C${coords(point((segment + 1 / 3) / 3, bend))} ${coords(point((segment + 2 / 3) / 3, bend))} ${coords(point((segment + 1) / 3))}`;
  }
  return path;
};

// Camera. ZOOM: how far we zoom into the focus pond. TILT: final pitch of the ground (degrees).
// The ground pivots on the bottom edge of the screen; PERSP / EYE (fractions of screen height) set the
// perspective distance and the eye height (the true vanishing line is EYE·H − PERSP·H·cot(TILT)).
const ZOOM = 3.2;
const TILT = 64;
const PERSP = 1.2;
const EYE = 0.92;
// The pond grid runs FAR screen heights out (pre-tilt). The drawn horizon (line, haze, mountains) sits where
// the grid ends, a touch below the true vanishing line, so water and horizon always meet.
const FAR = 24;
const HORIZON = (() => {
  const rad = (TILT * Math.PI) / 180;
  const f = PERSP / (PERSP + FAR * Math.sin(rad));
  return EYE + (1 - FAR * Math.cos(rad) - EYE) * f;
})();
const FOCUS_Y = 0.75; // where the focus pond ends up before the tilt (fraction of screen height)

// Ground plane, in screen widths/heights: wider than the screen and reaching far "up", so it still fills
// the view once it tilts away.
const PLANE = { left: 1.4, width: 3.8, up: 2, height: 3 };

// Mountains on the horizon, drawn with the same thin strokes as the ponds: two ridgelines (the back one
// fainter), each with a few contour lines following its shape. viewBox is 1200 × 300; y = 300 is the horizon.
const ridge = (seed, peak, offset = 0, shrink = 1) => {
  const pts = [];
  for (let x = -20; x <= 1220; x += 10) {
    // Soft, rounded hills: a broad swell times gentle humps (no sharp peaks), with a faint ripple.
    const massif = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(x * 0.0037 + seed));
    const humps = (0.5 + 0.5 * Math.sin(x * 0.0078 + seed * 1.7)) ** 2;
    const ripple = (0.5 + 0.5 * Math.sin(x * 0.019 + seed * 2.3)) * 0.08;
    const h = peak * shrink * massif * (0.2 + 0.72 * humps + ripple);
    pts.push([x, Math.min(300, 300 - h + offset)]);
  }
  return pts;
};
// Smooth curve through the samples (quadratic segments between midpoints), so ridges read as soft.
const line = (pts) => {
  let d = `M${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += ` Q${x} ${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L${lx} ${ly.toFixed(1)}`;
};
const MOUNTAINS = [
  { seed: 4.1, peak: 270, opacity: 0.2 },
  { seed: 1.3, peak: 170, opacity: 0.34 },
].map((m) => {
  const top = ridge(m.seed, m.peak);
  return {
    ...m,
    fill: `${line(top)} L1220 300 L-20 300 Z`,
    ridge: line(top),
    contours: [[18, 0.85], [40, 0.68], [64, 0.5], [90, 0.34]].map(([off, k]) => line(ridge(m.seed, m.peak, off, k))),
  };
});

function Mountains() {
  return (
    <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="h-full w-full" fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
      {MOUNTAINS.map((m) => (
        <g key={m.seed}>
          <path d={m.fill} stroke="none" style={{ fill: 'var(--v2-bg, #FFFFFF)' }} />
          {m.contours.map((d) => <path key={d} d={d} strokeWidth="0.8" strokeOpacity={m.opacity * 0.45} vectorEffect="non-scaling-stroke" />)}
          <path d={m.ridge} strokeWidth="1" strokeOpacity={m.opacity} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}

// One paddlewheel aerator seen from above (unit length along x): shaft, motor, two wheels with paddles,
// and spray on the side it pushes water to.
function Aerator({ x, y, angle, size, live }) {
  const spray = (sx, delay) => (
    <g className={live ? 'v2-anim' : undefined} style={live ? { animation: `v2spray 2.6s ease-in-out ${delay}s infinite` } : { opacity: 0.3 }}>
      <path d={`M${sx - 0.11} 0.25 Q${sx} 0.33 ${sx + 0.11} 0.25`} vectorEffect="non-scaling-stroke" />
      <path d={`M${sx - 0.15} 0.37 Q${sx} 0.48 ${sx + 0.15} 0.37`} strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
    </g>
  );
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(1)}) scale(${size.toFixed(2)})`} opacity="0.4" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round">
      {spray(-0.34, 0)}
      {spray(0.34, -0.9)}
      <line x1="-0.5" y1="0" x2="0.5" y2="0" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />
      {[-0.34, 0.34].map((sx) => (
        <g key={sx}>
          <rect x={sx - 0.09} y="-0.17" width="0.18" height="0.34" rx="0.03" style={{ fill: 'var(--v2-bg, #FFFFFF)' }} vectorEffect="non-scaling-stroke" />
          {[-0.085, 0, 0.085].map((by) => <line key={by} x1={sx - 0.09} y1={by} x2={sx + 0.09} y2={by} strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />)}
        </g>
      ))}
      <rect x="-0.1" y="-0.08" width="0.2" height="0.16" rx="0.04" style={{ fill: 'var(--v2-bg, #FFFFFF)' }} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

// Keep the middle clear (shrimp logo + headline): aerators only sit out to the sides, top and bottom.
const clearOfCopy = (pt, W, H) => Math.abs(pt.x - W / 2) > Math.max(230, W * 0.34) || pt.y < H * 0.06 || pt.y > H * 0.86;

const aeratorsFor = (pond, index, always = false) => {
  const { center: c, topLeft, topRight, bottomRight, size } = pond;
  const angle = (Math.atan2(topRight.y - topLeft.y, topRight.x - topLeft.x) * 180) / Math.PI;
  const len = size * 0.17;
  const a = between(c, topLeft, 0.5);
  const b = between(c, bottomRight, 0.5);
  // Sparse on purpose: about one pond in three shows an aerator, so the farm reads as texture, not icons.
  if (!always && index % 3 !== 0) return [];
  return [index % 2 ? { ...a, angle, size: len } : { ...b, angle: angle + 180, size: len }];
};

export default function FarmPonds({ reduced }) {
  const ref = useRef(null);
  const planeRef = useRef(null);
  const zoomRef = useRef(null);
  const farRef = useRef(null);
  const farClipRef = useRef(null);
  const farPathRefs = useRef([]);
  const mountRef = useRef(null);
  const horizonRef = useRef(null);
  const revealRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize((previous) => previous.width === width && previous.height === height ? previous : { width, height });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    measure();
    return () => observer.disconnect();
  }, []);

  const { width: W, height: H } = size;
  // The pond the camera dives into: a single-size pond just below the shrimp. It always gets one aerator,
  // so the zoom lands on one.
  const { ponds, focus } = useMemo(() => {
    const layout = pondLayout(W, H);
    let target = null;
    let bestD = Infinity;
    layout.forEach((pond) => {
      if (pond.span !== 1) return;
      const d = Math.hypot(pond.center.x - W / 2, pond.center.y - H * 0.64);
      if (d < bestD) {
        bestD = d;
        target = pond;
      }
    });
    return {
      focus: target?.center ?? { x: W / 2, y: H * 0.64 },
      ponds: layout.map((pond, index) => ({
        ...pond,
        path: bankPath(pond.points),
        aerators: pond === target
          ? aeratorsFor(pond, 1, true).map((a) => ({ ...a, reveal: true }))
          : aeratorsFor(pond, index).filter((a) => clearOfCopy(a, W, H)),
        // Only ponds on screen at the start animate; the rest stay still to keep the page light.
        live: pond.center.x > -40 && pond.center.x < W + 40 && pond.center.y > -40 && pond.center.y < H + 40,
      })),
    };
  }, [W, H]);

  // Where a ground point lands on screen once the zoom is done and the ground is tilted by `rad`.
  // Mirrors the CSS: plane pivots on the screen's bottom edge, perspective PERSP·H from an eye at EYE·H.
  const project = useCallback((pt, rad) => {
    const X = W / 2 + (pt.x - focus.x) * ZOOM;
    const Y = H * FOCUS_Y + (pt.y - focus.y) * ZOOM;
    const f = (H * PERSP) / (H * PERSP - (Y - H) * Math.sin(rad));
    return { x: W / 2 + (X - W / 2) * f, y: H * EYE + (H + (Y - H) * Math.cos(rad) - H * EYE) * f };
  }, [W, H, focus]);
  const edgeAt = useCallback((rad) => {
    const d = H * PLANE.height;
    const f = (H * PERSP) / (H * PERSP + d * Math.sin(rad));
    return H * EYE + (H - d * Math.cos(rad) - H * EYE) * f;
  }, [H]);

  // The grid carries on past the tilted plane, out to the horizon. Only ponds that show up beyond the plane's
  // far edge (in the final view) are kept; their outlines are re-projected each frame while the ground tilts.
  const farPonds = useMemo(() => {
    if (!W) return [];
    const rad = (TILT * Math.PI) / 180;
    const edge = edgeAt(rad);
    const span = FAR * H; // how far out (in pre-tilt screen heights) the grid goes; beyond it is haze
    const bounds = {
      x0: focus.x - (W * 9) / ZOOM, x1: focus.x + (W * 9) / ZOOM,
      y0: focus.y + (H - span - H * FOCUS_Y) / ZOOM, y1: focus.y + (-H * PLANE.up + H * 0.3 - H * FOCUS_Y) / ZOOM,
    };
    return pondLayout(W, H, bounds).filter((pond) => {
      const pts = pond.points.map((pt) => project(pt, rad));
      const ys = pts.map((q) => q.y), xs = pts.map((q) => q.x);
      return Math.min(...ys) < edge + 2 && Math.max(...xs) > -20 && Math.min(...xs) < W + 20;
    });
  }, [W, H, focus, project, edgeAt]);

  // Scroll position → hero progress, plus how far the hero has scrolled away.
  const read = useCallback(() => {
    const section = document.getElementById('hero');
    if (!section) return null;
    const r = section.getBoundingClientRect();
    const vh = viewportHeight();
    return { p: clamp01(-r.top / Math.max(1, r.height - vh)), lift: Math.min(0, r.bottom - vh), gone: r.bottom <= 0, vh };
  }, []);

  const lastZoom = useRef('');
  const render = useCallback((p) => {
    if (!zoomRef.current || !W) return;
    const z = reduced ? 0 : smooth(0.04, 0.5, p);
    const t = reduced ? 0 : smooth(0.5, 0.86, p);
    const s = ZOOM ** z;
    const tx = focus.x + (W / 2 - focus.x) * z + W * PLANE.left;
    const ty = focus.y + (H * FOCUS_Y - focus.y) * z + H * PLANE.up;
    const zoom = `translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${s.toFixed(4)}) translate(${(-focus.x).toFixed(1)} ${(-focus.y).toFixed(1)})`;
    // Re-render the SVG only while the zoom is actually changing; the tilt itself is a composited transform.
    if (zoom !== lastZoom.current) {
      zoomRef.current.setAttribute('transform', zoom);
      lastZoom.current = zoom;
    }
    const angle = TILT * t;
    planeRef.current.style.transform = t > 0 ? `rotateX(${angle.toFixed(3)}deg)` : '';
    const rad = (angle * Math.PI) / 180;
    if (t > 0 && farPathRefs.current.length) {
      farClipRef.current.setAttribute('height', Math.max(0, edgeAt(rad)).toFixed(1));
      farPonds.forEach((pond, i) => {
        const el = farPathRefs.current[i];
        if (el) el.setAttribute('d', bankPath(pond.points.map((pt) => project(pt, rad))));
      });
    }
    farRef.current.style.opacity = t > 0 ? '1' : '0';
    // Mountains rise into view just before the shrimp drops in.
    const m = reduced ? 0 : smooth(0.7, 1, t);
    mountRef.current.style.opacity = m.toFixed(3);
    horizonRef.current.style.opacity = smooth(0.85, 1, t).toFixed(3);
    mountRef.current.style.transform = `translate3d(0, ${((1 - m) * H * 0.05).toFixed(1)}px, 0)`;
    if (revealRef.current) revealRef.current.setAttribute('opacity', reduced ? '0.6' : smooth(0.15, 0.45, p).toFixed(3));
  }, [W, H, focus, reduced, farPonds, project, edgeAt]);

  // The camera eases toward the scroll position (critically damped), so wheel steps and touch flicks glide.
  useEffect(() => {
    let raf = 0;
    let cur = null;
    let last = 0;
    const frame = (now) => {
      raf = 0;
      const s = read();
      if (!s || !ref.current) return;
      ref.current.style.transform = s.lift ? `translate3d(0, ${s.lift.toFixed(1)}px, 0)` : '';
      ref.current.style.visibility = s.gone ? 'hidden' : '';
      ref.current.style.opacity = s.lift ? String(clamp01(1 + s.lift / (s.vh * 0.35))) : '';
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      cur = cur === null || reduced ? s.p : cur + (s.p - cur) * (1 - Math.exp(-dt * 9));
      if (Math.abs(s.p - cur) < 0.0005) cur = s.p;
      render(cur);
      if (cur !== s.p) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    lastZoom.current = '';
    frame(performance.now());
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [read, render, reduced]);

  return <div ref={ref} className="pointer-events-none absolute inset-x-0 top-0 h-svh overflow-hidden text-[#FF802E]" style={{ perspective: `${(H * PERSP).toFixed(0)}px`, perspectiveOrigin: `50% ${(H * EYE).toFixed(0)}px` }} aria-hidden="true">
    {W > 0 && <div
      ref={planeRef}
      className="absolute origin-bottom"
      style={{ left: -W * PLANE.left, top: -H * PLANE.up, width: W * PLANE.width, height: H * PLANE.height }}
    >
      <svg viewBox={`0 0 ${W * PLANE.width} ${H * PLANE.height}`} className="h-full w-full overflow-visible">
        <defs>{ponds.map((pond) => <clipPath id={`farm-parcel-${pond.id}`} key={pond.id}><path d={pond.path} /></clipPath>)}</defs>
        <g ref={zoomRef}>
          {ponds.map((pond, index) => <g key={pond.id} data-farm-pond>
            <path d={pond.path} fill="currentColor" fillOpacity={index % 3 === 0 ? '0.05' : '0.03'} />
            <g clipPath={`url(#farm-parcel-${pond.id})`}>
              {[0.25, 0.5, 0.75].map((fraction, line) => {
                const left = between(pond.topLeft, pond.bottomLeft, fraction);
                const right = between(pond.topRight, pond.bottomRight, fraction);
                const a = wavePath(left, right, 1);
                const b = wavePath(left, right, -1);
                return <path key={line} d={a} fill="none" stroke="currentColor" strokeOpacity="0.24" strokeWidth="0.85" strokeLinecap="round" vectorEffect="non-scaling-stroke">
                  {!reduced && pond.live && <animate attributeName="d" values={`${a};${b};${a}`} dur={`${6 + index % 4 + line * 0.45}s`} begin={`${-line * 1.2 - index}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />}
                </path>;
              })}
            </g>
            <path d={pond.path} fill="none" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            {pond.aerators.map((a, k) => a.reveal
              ? <g key={k} ref={revealRef} opacity="0"><Aerator {...a} live={!reduced} /></g>
              : <Aerator key={k} {...a} live={!reduced && pond.live} />)}
          </g>)}
        </g>
      </svg>
    </div>}
    {/* Far ponds out to the horizon (same grid, projected), fading into haze; then the mountains behind. */}
    <div ref={farRef} className="absolute inset-0" style={{ opacity: 0 }}>
      {W > 0 && <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" style={{ maskImage: `linear-gradient(to bottom, transparent ${(HORIZON * H).toFixed(0)}px, #000 ${((HORIZON + 0.06) * H).toFixed(0)}px)`, WebkitMaskImage: `linear-gradient(to bottom, transparent ${(HORIZON * H).toFixed(0)}px, #000 ${((HORIZON + 0.06) * H).toFixed(0)}px)` }}>
        <defs><clipPath id="farm-far-clip"><rect ref={farClipRef} x="0" y="0" width={W} height="0" /></clipPath></defs>
        <g clipPath="url(#farm-far-clip)">
          {farPonds.map((pond, i) => <path key={pond.id} ref={(el) => { farPathRefs.current[i] = el; }} fill="currentColor" fillOpacity={i % 3 === 0 ? '0.05' : '0.03'} stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" strokeLinejoin="round" />)}
        </g>
      </svg>}
      <div ref={horizonRef} className="absolute inset-x-0" style={{ top: `${(HORIZON * 100).toFixed(2)}%`, opacity: 0 }}>
        <div className="h-px bg-[#FF802E]/30" />
        <p className="mx-auto mt-3 max-w-6xl px-6 text-[10px] uppercase tracking-[0.16em] text-[#231F20]/45" style={{ fontFamily: 'ui-monospace, "JetBrains Mono", Menlo, monospace' }}>A landscape of shrimp ponds</p>
      </div>
    </div>
    <div ref={mountRef} className="absolute inset-x-0" style={{ top: `${((HORIZON - 0.3) * 100).toFixed(2)}%`, height: '30%', opacity: 0 }}>
      <Mountains />
    </div>
  </div>;
}
