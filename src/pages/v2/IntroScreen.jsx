import { useEffect, useRef, useState } from 'react';
import { SHRIMP_CENTER, SHRIMP_PARTS, SHRIMP_VIEWBOX } from '../../components/shrimpParts';
import wordmark from '../../assets/v2/wordmark-white.png';
import { INTRO_MS } from './scroll';

// Intro screen (every load): the shrimp curls in from its tail, one shell segment after another,
// with a soft motion trail; then the "cultivator" wordmark rolls out underneath; then the shrimp flies to exactly
// where the hero logo sits (same size), the wordmark drops away and the orange screen dissolves into the page.
// If the hero isn't on screen (refresh partway down), the screen simply fades away instead.
// Timings live in CSS (src/index.css: v2curl, v2ghost, v2roll, v2introOut).

const ORDER = ['tail', 'flick', 'shellRight', 'shellBottom', 'shellLeft', 'shellTop', 'head', 'antenna', 'tooth1', 'tooth2', 'pupil'];
const STAGGER = 75;
const parts = ORDER.map((id) => SHRIMP_PARTS.find((p) => p.id === id)).filter(Boolean);
const origin = `${SHRIMP_CENTER[0]}px ${SHRIMP_CENTER[1]}px`;

export default function IntroScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [dock, setDock] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      const slot = document.querySelector('[data-slot="hero"]')?.getBoundingClientRect();
      const me = svgRef.current?.getBoundingClientRect();
      if (slot && me && slot.bottom > 0 && slot.top < window.innerHeight) {
        setDock({
          x: slot.left + slot.width / 2 - (me.left + me.width / 2),
          y: slot.top + slot.height / 2 - (me.top + me.height / 2),
          s: slot.width / me.width,
        });
      } else setLeaving(true);
    }, INTRO_MS - 800);
    const t2 = setTimeout(() => onDone?.(), INTRO_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const part = (p, i, cls, extraDelay = 0) => (
    <path
      key={`${cls}-${p.id}`}
      d={p.d}
      className={cls}
      style={{ transformBox: 'view-box', transformOrigin: origin, animationDelay: `${i * STAGGER + extraDelay}ms` }}
    />
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 grid place-items-center"
      style={{
        backgroundColor: dock ? 'rgba(255,255,255,0)' : '#FFFFFF',
        transition: 'background-color 450ms ease 300ms',
        animation: leaving ? 'v2introOut 600ms cubic-bezier(.7,0,.3,1) forwards' : undefined,
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <svg
          ref={svgRef}
          viewBox={SHRIMP_VIEWBOX.join(' ')}
          className="h-[min(34svh,58vw)] w-[min(34svh,58vw)] overflow-visible"
          fill="#FF802E"
          fillRule="evenodd"
          style={{ transform: dock ? `translate(${dock.x}px, ${dock.y}px) scale(${dock.s})` : 'none', transition: 'transform 750ms cubic-bezier(.65,0,.35,1)' }}
        >
          <g opacity="0.35">{parts.map((p, i) => part(p, i, 'v2-ghost', 90))}</g>
          <g opacity="0.6">{parts.map((p, i) => part(p, i, 'v2-ghost', 45))}</g>
          <g>{parts.map((p, i) => part(p, i, 'v2-curl'))}</g>
        </svg>
        <span
          className="v2-roll block h-[clamp(28px,5svh,44px)] w-[clamp(147px,26svh,231px)] bg-[#FF802E]"
          style={{
            WebkitMask: `url(${wordmark}) center / contain no-repeat`,
            mask: `url(${wordmark}) center / contain no-repeat`,
            opacity: dock ? 0 : 1,
            translate: dock ? '0 14px' : '0 0',
            transition: 'opacity 350ms ease, translate 450ms ease',
          }}
        />
      </div>
    </div>
  );
}
