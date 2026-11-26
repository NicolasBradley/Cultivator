import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SHRIMP_PARTS, SHRIMP_VIEWBOX } from '../../components/shrimpParts';
import { BODY_REAL, WHEEL_BLADES, WHEEL_CENTRE, WHEEL_REAL } from './realShapes';
import { viewportHeight } from './scroll';

gsap.registerPlugin(MorphSVGPlugin);

// The shrimp "actor": one fixed SVG that travels through the whole page and morphs.
// logo (hero) → sinks → rises as a paddlewheel (shell parts morph into paddles, MorphSVG)
// → shrinks to the surface → stops and greys at 02:13 → flips into the aerator front view (device scene)
// → reassembles as the logo at the ask.
// Scenes mark where it should sit with <div data-slot="name">; keyframes interpolate between slots by scroll.

const [VX, VY, VW, VH] = SHRIMP_VIEWBOX;
const C = [VX + VW / 2, VY + VH / 2];
const WHITE = [255, 255, 255];
const ORANGE = [255, 128, 46];
const GREY = [138, 132, 134];

const circle = (x, y, r) => `M${x - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 Z`;

// Shrimp part → piece of the real paddlewheel (traced from a photo).
// The head becomes the ring + spokes + hub; eight body parts become the eight blades (nearest angle wins);
// the teeth shrink into the hub.
function buildTargets(centroids) {
  const toBlades = ['shellTop', 'shellLeft', 'shellBottom', 'shellRight', 'tail', 'flick', 'antenna', 'pupil'];
  const free = new Set(WHEEL_BLADES.map((_, k) => k));
  const out = { head: WHEEL_CENTRE };
  toBlades
    .map((id) => ({ id, a: Math.atan2(centroids[id][1] - C[1], centroids[id][0] - C[0]) }))
    .forEach(({ id, a }) => {
      let best = -1;
      let bestD = Infinity;
      free.forEach((k) => {
        const d = Math.abs(Math.atan2(Math.sin(WHEEL_BLADES[k].angle - a), Math.cos(WHEEL_BLADES[k].angle - a)));
        if (d < bestD) {
          bestD = d;
          best = k;
        }
      });
      free.delete(best);
      out[id] = WHEEL_BLADES[best].d;
    });
  out.tooth1 = circle(C[0] - 6, C[1], 3);
  out.tooth2 = circle(C[0] + 6, C[1], 3);
  return out;
}

// Keyframes. slot = data-slot name (position + size measured while its scene is pinned),
// otherwise x / y as fractions of the viewport and size in px.
const KF = [
  { sec: 'hero', p: 0, slot: 'hero', wheel: 0, spin: 0, grey: 0, op: 1, body: 0, rot: 0 },
  { sec: 'hero', p: 1, x: 0.5, y: 1.15, sizeOf: 'hero', scale: 0.75, wheel: 0.2, spin: 0.15, grey: 0, op: 1, body: 0, rot: 540 },
  { sec: 'wheel', p: 0.14, slot: 'wheel', wheel: 1, spin: 0.7, grey: 0, op: 1, body: 1, rot: 720 },
  { sec: 'wheel', p: 0.92, slot: 'wheel', wheel: 1, spin: 0.7, grey: 0, op: 1, body: 1, rot: 720 },
  { sec: 'life', p: 0.22, slot: 'life', wheel: 1, spin: 0.6, grey: 0, op: 1, body: 0, rot: 720 },
  { sec: 'life', p: 0.92, slot: 'life', wheel: 1, spin: 0.6, grey: 0, op: 1, body: 0, rot: 720 },
  { sec: 'fragile', p: 0.5, x: 0.86, y: 0.2, size: 110, wheel: 1, spin: 0.45, grey: 0, op: 0.6, body: 0, rot: 720 },
  { sec: 'failure', p: 0.05, slot: 'failure', wheel: 1, spin: 0.45, grey: 0, op: 1, body: 0, rot: 720 },
  { sec: 'failure', p: 0.4, slot: 'failure', wheel: 1, spin: 0, grey: 1, op: 1, body: 0, rot: 720 },
  { sec: 'failure', p: 0.96, slot: 'failure', wheel: 1, spin: 0, grey: 1, op: 1, body: 0, rot: 720 },
  { sec: 'gap', p: 0.5, x: 0.5, y: 0.86, size: 90, wheel: 1, spin: 0, grey: 1, op: 0.3, body: 0, rot: 720 },
  { sec: 'device', p: 0, slot: 'device', wheel: 1, spin: 0.25, grey: 0, op: 1, flip: 0, body: 0, rot: 720 },
  { sec: 'device', p: 0.14, slot: 'device', wheel: 1, spin: 0, grey: 0, op: 0, flip: 90, body: 0, rot: 720 },
  { sec: 'team', p: 0.9, slot: 'ask', wheel: 0, spin: 0, grey: 0, op: 0, flip: 0, body: 0, rot: 720 },
  { sec: 'ask', p: 0.55, slot: 'ask', wheel: 0, spin: 0, grey: 0, op: 1, flip: 0, body: 0, rot: 720 },
];
const NUM = ['x', 'y', 'size', 'wheel', 'spin', 'grey', 'op', 'flip', 'body', 'rot'];

const smooth = (t) => t * t * (3 - 2 * t);
const SPARK_PARTS = SHRIMP_PARTS.filter((p) => ['shellTop', 'shellLeft', 'shellBottom', 'shellRight', 'head', 'tail'].includes(p.id));

export function ShrimpActor({ hidden = false, orangeHero = true }) {
  const orangeHeroRef = useRef(orangeHero);
  useEffect(() => { orangeHeroRef.current = orangeHero; }, [orangeHero]);
  const hiddenRef = useRef(hidden);
  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);
  const boxRef = useRef(null);
  const gRef = useRef(null);
  const bodyRef = useRef(null);
  const realRef = useRef(null);
  const legRef = useRef(null);
  const partsRef = useRef(null);
  const sparkRef = useRef(null);
  const partRefs = useRef({});

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parts = SHRIMP_PARTS.map((p) => partRefs.current[p.id]);
    const centroids = {};
    SHRIMP_PARTS.forEach((p) => {
      const b = partRefs.current[p.id].getBBox();
      centroids[p.id] = [b.x + b.width / 2, b.y + b.height / 2];
    });
    const targets = buildTargets(centroids);
    const tl = gsap.timeline({ paused: true });
    SHRIMP_PARTS.forEach((p, i) => tl.to(partRefs.current[p.id], { morphSVG: { shape: targets[p.id], type: 'rotational' }, duration: 1, ease: 'power1.inOut' }, i * 0.025));

    let anchors = [];
    const measure = () => {
      const vh = viewportHeight();
      const vw = window.innerWidth;
      anchors = KF.map((k) => {
        const sec = document.getElementById(k.sec);
        if (!sec) return null;
        const top = sec.offsetTop;
        const h = sec.offsetHeight;
        const stageHeight = sec.querySelector('[data-stage]')?.offsetHeight || vh;
        const extra = Math.max(0, stageHeight - vh);
        const y = h - stageHeight > vh * 0.05 ? top + extra + k.p * (h - stageHeight) : top - vh * 0.5 + k.p * h;
        const out = { ...k, at: y };
        const slotEl = k.slot && document.querySelector(`[data-slot="${k.slot}"]`);
        if (slotEl) {
          // Pinned scene: position inside the sticky stage. Otherwise: where the slot sits on screen at this anchor.
          const stage = slotEl.closest('.sticky');
          const r = slotEl.getBoundingClientRect();
          out.x = r.left + r.width / 2;
          out.y = stage ? r.top - stage.getBoundingClientRect().top - extra + r.height / 2 : r.top + window.scrollY - y + r.height / 2;
          out.size = r.width;
        } else {
          out.x = (k.x ?? 0.5) * vw;
          out.y = (k.y ?? 0.5) * vh;
          if (k.sizeOf) {
            const ref = document.querySelector(`[data-slot="${k.sizeOf}"]`);
            out.size = (ref ? ref.getBoundingClientRect().width : 300) * (k.scale ?? 1);
          }
          if (vw < 768 && k.size) out.size = k.size * 0.65;
        }
        out.flip = k.flip ?? 0;
        return out;
      }).filter(Boolean);
    };

    const state = (y) => {
      if (y <= anchors[0].at) return anchors[0];
      const last = anchors[anchors.length - 1];
      if (y >= last.at) return last;
      let i = 0;
      while (anchors[i + 1].at < y) i += 1;
      const a = anchors[i];
      const b = anchors[i + 1];
      const t = smooth((y - a.at) / Math.max(1, b.at - a.at));
      const o = {};
      NUM.forEach((k) => {
        o[k] = a[k] + (b[k] - a[k]) * t;
      });
      return o;
    };

    let angle = 0;
    let idleWas = true;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      const s = state(y);
      // Before a tall scene finishes scrolling into view, its slot hasn't
      // reached the pinned position used by the keyframes yet.
      const wheelStage = document.querySelector('#wheel [data-stage]');
      if (window.innerWidth < 768 && wheelStage) {
        const section = wheelStage.parentElement;
        const rect = section.getBoundingClientRect();
        const travel = rect.height - wheelStage.offsetHeight;
        if (rect.top <= 0 && rect.bottom >= viewportHeight() && travel > 0) {
          const p = (-rect.top - Math.max(0, wheelStage.offsetHeight - viewportHeight())) / travel;
          const photo = Math.min(1, Math.max(0, (p - 0.48) / 0.14)) * (1 - Math.min(1, Math.max(0, (p - 0.92) / 0.08)));
          s.op *= 1 - photo;
        }
      }
      if (wheelStage && s.body > 0 && y >= document.getElementById('wheel').offsetTop) {
        const extra = Math.max(0, wheelStage.offsetHeight - viewportHeight());
        if (extra > 0 && wheelStage.getBoundingClientRect().top > -extra) {
          const slot = wheelStage.querySelector('[data-slot="wheel"]').getBoundingClientRect();
          s.y = slot.top + slot.height / 2;
        }
      }
      angle += (s.spin * 300 * dt + (y - lastY) * 0.25 * s.wheel) * (reduce ? 0 : 1);
      lastY = y;
      tl.progress(s.wheel);
      const box = boxRef.current;
      box.style.width = `${s.size}px`;
      box.style.height = `${s.size}px`;
      // Hidden while the intro's own shrimp is on screen; it lands exactly here, then this one takes over.
      box.style.opacity = hiddenRef.current ? '0' : s.op.toFixed(3);
      // Idle life while it's still the logo (hero / ask): gentle float, tail flick, antenna sway, an occasional blink.
      const idle = reduce ? 0 : Math.max(0, 1 - s.wheel * 6) * (1 - s.body);
      const sec = now / 1000;
      const bob = Math.sin(sec * 1.1) * 6 * idle;
      box.style.transform = `translate3d(${s.x - s.size / 2}px, ${s.y - s.size / 2 + bob}px, 0) perspective(900px) rotateY(${s.flip}deg)`;
      // Every 5 s: current crackles around the shell edges for about a second.
      const ct = sec % 5;
      const spark = ct < 1.1 ? Math.sin((ct / 1.1) * Math.PI) : 0;
      sparkRef.current.style.opacity = (spark * idle * (0.65 + Math.random() * 0.35)).toFixed(3);
      if (spark > 0) {
        [...sparkRef.current.children].forEach((el, k) => {
          el.style.strokeDashoffset = String(-(ct * 1.25 + k * 0.17 + (Math.random() - 0.5) * 0.015));
        });
      }
      box.style.filter = 'none';
      if (idle > 0.001 || idleWas) {
        const P = partRefs.current;
        const flick = Math.sin(sec * 2.4) * 6 * idle;
        P.tail?.setAttribute('transform', `rotate(${flick.toFixed(2)} 405 345)`);
        P.flick?.setAttribute('transform', `rotate(${(flick * 1.6).toFixed(2)} 405 345)`);
        P.antenna?.setAttribute('transform', `rotate(${(Math.sin(sec * 1.6 + 1) * 2.5 * idle).toFixed(2)} 410 205)`);
        const blink = sec % 4.2 < 0.14 ? 0.15 : 1;
        P.pupil?.setAttribute('transform', `translate(352 247) scale(1 ${(1 - (1 - blink) * idle).toFixed(2)}) translate(-352 -247)`);
        idleWas = idle > 0.001;
      }
      // Scroll-linked spin (rot) as the logo travels down into the pond, plus the wheel's own running spin.
      gRef.current.setAttribute('transform', `rotate(${((s.rot + angle * s.wheel) % 360).toFixed(2)} ${C[0]} ${C[1]})`);
      const inHero = orangeHeroRef.current && y < document.getElementById('wheel').offsetTop;
      const colourBlend = inHero ? Math.min(1, s.wheel * 5) : 1;
      const base = WHITE.map((w, k) => ORANGE[k] + (w - ORANGE[k]) * colourBlend);
      const c = base.map((w, k) => Math.round(w + (GREY[k] - w) * s.grey));
      gRef.current.style.fill = `rgb(${c.join(',')})`;
      bodyRef.current.style.opacity = s.body.toFixed(3);
      const real = Math.max(0, Math.min(1, (s.wheel - 0.72) / 0.26));
      realRef.current.style.opacity = real.toFixed(3);
      realRef.current.style.fill = `rgb(${c.join(',')})`;
      partsRef.current.style.opacity = (1 - real).toFixed(3);
      legRef.current.style.opacity = s.body.toFixed(3);
      raf = requestAnimationFrame(frame);
    };

    measure();
    // Re-measure whenever layout can shift: resize, fonts/images finishing, late reflows after a reload.
    const remeasure = () => measure();
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', remeasure);
    document.fonts?.ready.then(remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    const t1 = setTimeout(remeasure, 600);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      ro.disconnect();
      window.removeEventListener('load', remeasure);
      window.removeEventListener('resize', remeasure);
      tl.kill();
      parts.forEach((el, i) => el && el.setAttribute('d', SHRIMP_PARTS[i].d));
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 will-change-transform" style={{ opacity: 0 }}>
      <svg viewBox={SHRIMP_VIEWBOX.join(' ')} className="h-full w-full overflow-visible">
        {/* Aerator side view behind the wheel, tone-traced from the reference photo: motor housing + floats in 3 light bands,
            a shade band for seams/ends, and the second wheel peeking out behind.
            Shown only in the "This is an aerator" chapter. It doesn't rotate; only the wheel does. */}
        <g ref={bodyRef} style={{ opacity: 0 }} fill="#FFFFFF" transform="translate(0 24)">
          <path d={BODY_REAL.back} fillOpacity="0.45" />
          <path d={BODY_REAL.base} fillOpacity="0.14" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="3" strokeLinejoin="round" />
          <path d={BODY_REAL.tones[0]} fillOpacity="0.16" />
          <path d={BODY_REAL.tones[1]} fillOpacity="0.2" />
          <path d={BODY_REAL.tones[2]} fillOpacity="0.32" />
          <path d={BODY_REAL.shade} fill="#231F20" fillOpacity="0.22" />
        </g>
        <g ref={gRef}>
          {/* Tone-traced real paddlewheel (8-fold symmetric): crossfades in as the morph completes and stays in every chapter. */}
          <g ref={realRef} style={{ opacity: 0 }} fillRule="evenodd">
            <path d={WHEEL_REAL[0]} fillOpacity="0.62" />
            <path d={WHEEL_REAL[1]} fillOpacity="0.95" />
          </g>
          <g ref={partsRef} fillRule="evenodd">
            {SHRIMP_PARTS.map((p) => (
              <path key={p.id} id={`v2a-${p.id}`} ref={(el) => { partRefs.current[p.id] = el; }} d={p.d} />
            ))}
          </g>
          {/* Electric: short bright arcs of current race around the shell edges, flickering. */}
          <g ref={sparkRef} fill="none" stroke="#FFF7E0" strokeWidth="11" strokeLinecap="round" style={{ opacity: 0, filter: 'drop-shadow(0 0 5px #FFFFFF) drop-shadow(0 0 12px rgba(255,230,180,0.9))' }}>
            {SPARK_PARTS.map((p) => <path key={p.id} d={p.d} pathLength="1" strokeDasharray="0.07 0.93" />)}
          </g>
        </g>
        {/* Frame leg in front of the wheel (aerator chapter only): axle cap + bearing bracket down to the front float,
            so the wheel reads as mounted on the machine rather than floating in front of it. */}
        <g ref={legRef} style={{ opacity: 0 }}>
          <path d="M286 286 H310 L317 394 Q298 408 279 394 Z" fill="#FFFFFF" fillOpacity="0.92" stroke="#231F20" strokeOpacity="0.18" strokeWidth="2" />
          <path d="M292 300 V386" stroke="#231F20" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
          <circle cx="298" cy="282" r="24" fill="#FFFFFF" stroke="#231F20" strokeOpacity="0.2" strokeWidth="2" />
          <circle cx="298" cy="282" r="9" fill="#231F20" fillOpacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
