import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ContourPattern from '../components/ContourPattern';
import FarmPonds from './v2/FarmPonds';
import { INTRO_MS, useScrollEngine, viewportHeight } from './v2/scroll';
import IntroScreen from './v2/IntroScreen';
import { AskScene, DeviceScene, FailureScene, FragileScene, GapScene, ImpactScene, LifeScene, MarketScene, ModelScene, ProofScene, TeamScene, WheelScene } from './v2/scenes';
import { ShrimpSymbol, WheelIcon } from './v2/art';
import { ShrimpActor } from './v2/actor';
import Lenis from 'lenis';
import { ArrowUp, Menu, X } from 'lucide-react';
import 'lenis/dist/lenis.css';
import wordmark from '../assets/v2/wordmark-white.png';

// "Night Shift" redesign (docs/REDESIGN_CONCEPT.md). Scroll engine: ./v2/scroll.js · scenes: ./v2/scenes.jsx · art: ./v2/art.jsx

const MONO = 'ui-monospace, "JetBrains Mono", Menlo, monospace';
const EASE = 'cubic-bezier(.16,1,.3,1)';
const TONES = {
  pond: { bg: '#FFFFFF', fg: '#231F20', pattern: 1 },
  dusk: { bg: '#FF802E', fg: '#231F20', pattern: 5 },
  night: { bg: '#231F20', fg: '#FFFFFF', pattern: 4 },
  light: { bg: '#FFFFFF', fg: '#231F20', pattern: 1 },
  dawn: { bg: '#FF802E', fg: '#231F20', pattern: 5 },
};

const CHIPS = ['Problem', 'Product', 'Traction', 'Team', 'Ask'];
const CHIP_TARGET = ['fragile', 'device', 'market', 'team', 'ask'];

// chip: index into CHIPS (-1 = none). wave: [amplitude, drift speed] for the background water.
// noise: 0 clean current … 1 raw noise. Page loads as noise and settles clean; the problem chapters get noisy,
// and the Cultivator chapter resolves it back to a clean signal (plug in → usable data).
const CHAPTERS = [
  { id: 'hero', noise: 0, time: '18:00', tone: 'pond', h: 1.45, chip: -1, wave: [5, 0.8] },
  { id: 'wheel', noise: 0, time: '19:00', tone: 'dusk', h: 2.2, chip: -1, wave: [6.5, 3.5] },
  { id: 'life', noise: 0, time: '21:00', tone: 'night', h: 1.6, chip: -1, wave: [5, 2.5], blend: 1.0 },
  { id: 'fragile', noise: 0.45, time: '23:00', tone: 'night', h: 1, chip: 0, wave: [2.5, 1] },
  { id: 'failure', noise: 1, time: '02:13', tone: 'night', h: 2.6, chip: 0, wave: [1.5, 0], fail: true },
  { id: 'gap', noise: 1, time: '02:13', tone: 'night', h: 1, chip: 0, wave: [1.5, 0], fail: true },
  { id: 'device', noise: 0, time: '02:14', tone: 'night', h: 3, chip: 1, wave: [4.5, 2] },
  { id: 'impact', noise: 0, time: '04:00', tone: 'night', h: 3, chip: 1, wave: [4, 2] },
  { id: 'market', noise: 0, time: '05:00', tone: 'light', h: 1, chip: 2, wave: [2.5, 1] },
  { id: 'proof', noise: 0, time: '05:30', tone: 'light', h: 1, chip: 2, wave: [3, 1.2] },
  { id: 'model', noise: 0, time: '05:45', tone: 'light', h: 1, chip: 2, wave: [2.5, 1] },
  { id: 'team', noise: 0, time: '06:00', tone: 'dawn', h: 1, chip: 3, wave: [4, 1.5] },
  { id: 'ask', noise: 0, time: '06:00', tone: 'dawn', h: 1, chip: 4, wave: [4.5, 2] },
];

// Hero: shrimp centred over the converging-current background, pond strip at the bottom.
// Scrolling through the (sticky) hero sinks the shrimp into the pond; the next chapter turns it into the wheel.
function Hero({ style = 'pond' }) {
  const stageRef = useRef(null);
  const copyRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const onScroll = () => {
      const r = stageRef.current.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - viewportHeight())));
      copyRef.current.style.opacity = String(1 - smoothT((p - 0.25) / 0.75));
      copyRef.current.style.transform = `translateY(${-p * 20}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stacked in normal flow (nav space → mark → copy → pond) so spacing can't collide at any screen size.
  return (
    <div ref={stageRef} className="sticky top-0 flex h-svh flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 pt-20 md:gap-5">
        {style === 'pond' && <FarmPonds reduced={reduced} />}
        {/* The logo itself is drawn here by the travelling shrimp (v2/actor.jsx), so it can morph on scroll. */}
        <div data-slot="hero" className="aspect-square h-[min(40svh,70vw)] shrink-0 translate-x-[3%] translate-y-[4%] md:h-[min(40svh,340px)]" />

      <div ref={copyRef} className="relative flex shrink-0 flex-col items-center px-6 pb-4 text-center">
        <p className="mb-3 text-[9px] uppercase tracking-[0.16em] opacity-55 md:mb-4 md:text-[10px]" style={{ fontFamily: MONO }}>
          Cultivate trust. Empower farmers.
        </p>
        <h1 className="max-w-[960px] text-[clamp(27px,8.2vw,34px)] font-semibold leading-[1.12] tracking-[-0.035em] [text-wrap:balance] md:text-[clamp(44px,4.6vw,60px)]">
          <span className="mb-2 block text-[18px] font-normal leading-snug tracking-[-0.015em] opacity-75 md:mb-3 md:text-[25px]">A smart aeration system for</span>
          <span className="block">3.5 million<br className="md:hidden" /> smallholder farmers.</span>
        </h1>
      </div>
      </div>

      {/* Pond: no hard horizon. Lines bunch toward the top and fade out, so the water seems to go on forever.
          The water turns opaque further down, so the shrimp fades as it sinks. */}
      <div className="relative h-[16svh] min-h-[84px] shrink-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--v2-bg,#FF802E)_65%)]">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={`pointer-events-none absolute inset-x-0 top-0 h-16 w-full overflow-visible ${style === 'pond' ? 'text-[#FF802E]' : 'text-white'}`} aria-hidden="true">
          <g className="v2-anim" style={{ animation: 'v2swell 7s ease-in-out infinite' }}>
            <path d="M-100 36 Q50 8 200 36 T500 36 T800 36 T1100 36 T1400 36 V120 H-100Z" fill="currentColor" fillOpacity="0.06" />
            <path d="M-100 36 Q50 8 200 36 T500 36 T800 36 T1100 36 T1400 36" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        <ContourPattern
          variant="horizon"
          color={style === 'pond' ? '#FF802E' : '#FFFFFF'}
          introChaos={0}
          lines={6}
          wavelength={2}
          heartbeat={false}
          amp={6}
          speed={1}
          className="absolute inset-0 h-full w-full opacity-45 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_25%,#000_70%,transparent_100%)]"
        />
        <a href="#wheel" className="absolute bottom-4 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#231F20] transition-opacity hover:opacity-70" style={{ fontFamily: MONO }}>
          <span>Scroll to dive</span>
          <svg viewBox="0 0 24 28" className="v2-anim h-7 w-6" fill="none" aria-hidden="true" style={{ animation: 'v2dive 2.4s ease-in-out infinite' }}>
            <path d="M12 2 V18 M7 13 L12 18 L17 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 23 Q7.5 20 12 23 T21 23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

const SCENES = {
  wheel: WheelScene,
  life: LifeScene,
  fragile: FragileScene,
  failure: FailureScene,
  gap: GapScene,
  device: DeviceScene,
  impact: ImpactScene,
  market: MarketScene,
  proof: ProofScene,
  model: ModelScene,
  team: TeamScene,
  ask: AskScene,
};

function Chapter({ c, heroStyle }) {
  if (c.id === 'hero') return <Hero style={heroStyle} />;
  const Scene = SCENES[c.id];
  return <Scene />;
}

// Header intro ("bubble split"), ~2.6 s, one step after another but overlapping slightly:
// 1. Load: one pill pops in at the top centre with the wordmark.
// 2. The wordmark bubble squashes, stretches out and breaks off to the left corner, overshoots, settles.
// 3. The empty centre bubble swells (with a little jelly wobble) into the menu; chips blur-rise in one by one.
// 4. The details bubble (clock + Deck) breaks off to the right; Deck pops.
// Blobs only animate transform (translate + scale) so the browser can composite them; a goo filter
// (blur + alpha threshold) makes them stick and stretch before they separate. Droplets trail behind.
// When settled, the goo layer is removed and each group keeps its own pill.
// Pill colour contrasts with the section: ink pills on orange/white, white pills on ink.
const T = { pop: 500, left: 350, leftDur: 900, nav: 700, navDur: 850, right: 1000, rightDur: 900 };
const SPRING = 'cubic-bezier(.22,1,.36,1)';
const PULL = 'cubic-bezier(.65,0,.35,1)';

function NavBar({ chapter, tone, startDelay = 0, onTop, heroStyle, onHeroStyle }) {
  const wordRef = useRef(null);
  const navRef = useRef(null);
  const rightRef = useRef(null);
  const deckRef = useRef(null);
  const blobs = useRef([]);
  const chipRefs = useRef([]);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [done, setDone] = useState(reduced);
  const [settled, setSettled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ind, setInd] = useState({ x: 0, w: 0 });
  const prevChip = useRef(-1);
  const light = tone.bg === '#231F20';
  const pill = light ? 'bg-white text-[#231F20] ring-[#231F20]/10' : 'bg-[#231F20] text-white ring-white/10';
  const [blobColour] = useState(() => (light ? '#FFFFFF' : '#231F20'));
  // Pill backgrounds switch on instantly when the goo layer is removed (no fade = no flicker);
  // colour transitions are enabled one frame later, for section changes only.
  const pillCls = (extra) =>
    `${extra} rounded-full ring-1 ${settled ? 'transition-[background-color,color,box-shadow] duration-700' : ''} ${done ? pill : `${pill} !bg-transparent !ring-transparent`} ${scrolled ? 'shadow-[0_6px_20px_rgb(0_0_0/0.18)]' : ''}`;

  useEffect(() => {
    if (!done) return undefined;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [done]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const cx = window.innerWidth / 2;
    const w = wordRef.current.getBoundingClientRect();
    const n = navRef.current.getBoundingClientRect();
    const r = rightRef.current.getBoundingClientRect();
    const [bL, bC, bR, d1, d2, d3, d4] = blobs.current;
    // Each blob sits at its final rect; transforms move it from the centre.
    const place = (el, b) => Object.assign(el.style, { left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px` });
    const navRect = n.width ? n : { left: cx - w.width / 2, top: w.top, width: w.width, height: w.height };
    place(bL, w);
    place(bC, navRect);
    place(bR, r);
    [d1, d2, d3, d4].forEach((d, i) => place(d, { left: cx - 9, top: w.top + w.height / 2 - 9, width: i % 2 ? 12 : 18, height: i % 2 ? 12 : 18 }));
    const dxTo = (b) => cx - (b.left + b.width / 2);
    const sx = (b) => w.width / Math.max(1, b.width);

    const anims = [];
    const go = (el, frames, opts) => anims.push(el.animate(frames, { fill: 'both', ...opts, delay: (opts.delay ?? 0) + startDelay }));
    const tf = (dx, scx = 1, scy = 1) => `translateX(${dx}px) scale(${scx}, ${scy})`;

    // 1. Pop in (centre bubble carries the start shape; the side bubbles hide inside it)
    const cStart = tf(dxTo(navRect), sx(navRect));
    go(bC, [{ transform: tf(dxTo(navRect), sx(navRect) * 0.9, 0.9) }, { transform: cStart }], { duration: T.pop, easing: SPRING });
    go(wordRef.current, [{ opacity: 0, transform: `translateX(${dxTo(w)}px) scale(.85)` }, { opacity: 1, transform: `translateX(${dxTo(w)}px) scale(1)` }], { duration: T.pop, easing: SPRING });

    // 2. Wordmark breaks off left: squash (sticks) → stretch → overshoot → settle
    const L = dxTo(w);
    go(bL, [
      { offset: 0, transform: tf(L), easing: 'ease-in-out' },
      { offset: 0.16, transform: tf(L + 6, 0.92, 1.06), easing: PULL },
      { offset: 0.6, transform: tf(L * 0.25, 1.08, 0.96), easing: 'ease-out' },
      { offset: 0.84, transform: tf(-3, 0.99, 1.01), easing: 'ease-in-out' },
      { offset: 1, transform: tf(0) },
    ], { duration: T.leftDur, delay: T.left });
    go(wordRef.current, [
      { offset: 0, transform: `translateX(${L}px)`, easing: 'ease-in-out' },
      { offset: 0.16, transform: `translateX(${L + 6}px)`, easing: PULL },
      { offset: 0.6, transform: `translateX(${L * 0.25}px)`, easing: 'ease-out' },
      { offset: 0.84, transform: 'translateX(-3px)', easing: 'ease-in-out' },
      { offset: 1, transform: 'none' },
    ], { duration: T.leftDur, delay: T.left });
    const drop = (el, toX, dur, delay) =>
      go(el, [
        { offset: 0, transform: 'translateX(0) scale(1)' },
        { offset: 0.35, transform: 'translateX(0) scale(1)', easing: PULL },
        { offset: 0.8, transform: `translateX(${toX * 0.85}px) scale(.8)` },
        { offset: 1, transform: `translateX(${toX}px) scale(0)` },
      ], { duration: dur, delay });
    drop(d1, w.right - 14 - cx, T.leftDur + 150, T.left);
    drop(d2, (w.right - cx) * 0.55, T.leftDur + 300, T.left);

    // 3. Centre swells into the menu with a jelly wobble; chips blur-rise in one by one
    go(bC, [
      { offset: 0, transform: cStart, easing: 'cubic-bezier(.3,0,.2,1)' },
      { offset: 0.55, transform: tf(0, 1.04, 0.9), easing: 'ease-in-out' },
      { offset: 0.78, transform: tf(0, 0.99, 1.04), easing: 'ease-in-out' },
      { offset: 1, transform: tf(0) },
    ], { duration: T.navDur, delay: T.nav, composite: 'replace' });
    chipRefs.current.forEach((chip, i) =>
      go(chip, [{ opacity: 0, transform: 'translateY(8px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 600, delay: T.nav + 380 + i * 75, easing: 'cubic-bezier(.16,1,.3,1)' }),
    );

    // 4. Details break off right; clock fades, Deck pops
    const Rx = dxTo(r);
    go(bR, [
      { offset: 0, transform: tf(Rx, sx(r)), easing: 'ease-in-out' },
      { offset: 0.16, transform: tf(Rx - 6, sx(r) * 0.92, 1.06), easing: PULL },
      { offset: 0.6, transform: tf(Rx * 0.25, 1.06, 0.97), easing: 'ease-out' },
      { offset: 0.84, transform: tf(3, 0.99, 1.01), easing: 'ease-in-out' },
      { offset: 1, transform: tf(0) },
    ], { duration: T.rightDur, delay: T.right });
    drop(d3, r.left + 14 - cx, T.rightDur + 150, T.right);
    drop(d4, (r.left - cx) * 0.55, T.rightDur + 300, T.right);
    go(rightRef.current, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: T.right + T.rightDur * 0.7, easing: 'ease-out' });
    go(deckRef.current, [{ transform: 'scale(.92)' }, { transform: 'scale(1)' }], { duration: 600, delay: T.right + T.rightDur * 0.75, easing: SPRING });

    // Hand over to the static pills only once every bubble has actually finished (robust to slow or hidden tabs).
    let live = true;
    Promise.all(anims.map((a) => a.finished))
      .then(() => live && setDone(true))
      .catch(() => {});
    return () => {
      live = false;
      anims.forEach((a) => a.cancel());
    };
  }, [reduced, startDelay]);

  // Indicator: stretches to cover both the old and new chip, then snaps onto the new one (elastic feel).
  useLayoutEffect(() => {
    const el = chipRefs.current[chapter.chip];
    const prev = chipRefs.current[prevChip.current];
    prevChip.current = chapter.chip;
    if (!el) return undefined;
    const to = { x: el.offsetLeft, w: el.offsetWidth };
    if (!prev || prev === el) {
      setInd(to);
      return undefined;
    }
    const x = Math.min(prev.offsetLeft, to.x);
    setInd({ x, w: Math.max(prev.offsetLeft + prev.offsetWidth, to.x + to.w) - x });
    const t = setTimeout(() => setInd(to), 180);
    return () => clearTimeout(t);
  }, [chapter.chip]);

  return (
    <header className="fixed inset-x-0 top-0 z-20">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="nav-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
        </filter>
      </svg>

      {!done && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24" style={{ filter: 'url(#nav-goo)' }} aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} ref={(el) => { blobs.current[i] = el; }} className="absolute rounded-full will-change-transform" style={{ background: blobColour }} />
          ))}
        </div>
      )}

      <div
        className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6"
        style={{ transform: scrolled && settled ? 'scale(.94)' : 'none', transformOrigin: '50% 0', transition: `transform 500ms ${EASE}` }}
      >
        <a ref={wordRef} href="#hero" aria-label="Cultivator" className={pillCls('inline-flex h-12 items-center px-4 md:px-5')}>
          {/* Nudged up/right: the wordmark's ink sits low and left of its box (tall letters, shrimp head), so true centring looks off. */}
          <span className="block h-[20px] w-[100px] md:h-[22px] md:w-[115px] translate-x-[0.5px] -translate-y-[1.5px] bg-current" style={{ WebkitMask: `url(${wordmark}) center / contain no-repeat`, mask: `url(${wordmark}) center / contain no-repeat` }} />
        </a>

        <nav ref={navRef} className={pillCls('relative hidden h-12 items-center p-1 lg:flex')}>
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-0 rounded-full ${light ? 'bg-[#231F20]/10' : 'bg-white/15'}`}
            style={{ width: ind.w, transform: `translateX(${ind.x}px)`, opacity: chapter.chip < 0 ? 0 : 1, transition: `transform 420ms ${SPRING}, width 420ms ${SPRING}, opacity 300ms ease, background-color 700ms ease` }}
          />
          {CHIPS.map((label, i) => (
            <a
              key={label}
              ref={(el) => { chipRefs.current[i] = el; }}
              href={`#${CHIP_TARGET[i]}`}
              aria-current={chapter.chip === i ? 'true' : undefined}
              className={`relative inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-300 ${light ? 'hover:bg-[#231F20]/5' : 'hover:bg-white/10'}`}
            >
              <span style={{ opacity: chapter.chip === i ? 1 : 0.72, transition: 'opacity 300ms ease' }}>{label}</span>
            </a>
          ))}
        </nav>

        <div ref={rightRef} className={pillCls('flex h-12 items-center gap-2 pl-4 pr-1.5 md:gap-3')}>
          <span className="hidden text-[13px] tabular-nums opacity-80 sm:inline" style={{ fontFamily: MONO }}>{chapter.time}</span>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="v2-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-ml-1 grid h-9 w-9 place-items-center rounded-full transition-transform active:scale-90"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <a ref={deckRef} href="#ask" className="inline-flex h-9 items-center rounded-full bg-[#FF802E] px-5 text-[14px] font-semibold text-[#231F20] transition-transform duration-300 hover:scale-105 active:scale-95">Deck</a>
        </div>
      </div>

      {/* Mobile menu sheet: the same chapters as the desktop chips, plus back to top. */}
      <div
        id="v2-mobile-menu"
        className={`absolute inset-x-3 top-[72px] origin-top rounded-[28px] p-2 shadow-[0_12px_32px_rgb(0_0_0/0.3)] ring-1 md:left-auto md:right-6 md:w-[320px] ${pill}`}
        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateY(-8px) scale(.97)', pointerEvents: menuOpen ? 'auto' : 'none', transition: `opacity 250ms ease, transform 350ms ${EASE}` }}
        aria-hidden={!menuOpen}
      >
        <div className="mb-2 border-b border-current/15 px-3 pb-4 pt-3">
          <p className="mb-3 text-[10px] uppercase tracking-[0.12em] opacity-60" style={{ fontFamily: MONO }}>Compare hero</p>
          <div role="group" aria-label="Compare hero styles" className="flex gap-1 rounded-full bg-current/10 p-1">
            {[['pond', 'Ponds'], ['dusk', 'Orange']].map(([value, label]) => <button key={value} type="button" tabIndex={menuOpen ? 0 : -1} aria-pressed={heroStyle === value} onClick={() => {
              onHeroStyle(value);
              onTop?.();
            }} className={`h-9 flex-1 rounded-full text-[13px] font-semibold transition-colors ${heroStyle === value ? 'bg-[#FF802E] text-[#231F20]' : 'opacity-70 hover:opacity-100'}`}>{label}</button>)}
          </div>
        </div>
        {CHIPS.map((label, i) => (
          <a
            key={label}
            href={`#${CHIP_TARGET[i]}`}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            className={`flex h-12 items-center justify-between rounded-[20px] px-4 text-[17px] font-semibold ${chapter.chip === i ? (light ? 'bg-[#231F20]/10' : 'bg-white/15') : ''}`}
          >
            {label}
            <span className="text-[12px] opacity-60" style={{ fontFamily: MONO }}>{['23:00', '02:14', '05:00', '06:00', '06:00'][i]}</span>
          </a>
        ))}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => {
            setMenuOpen(false);
            onTop?.();
          }}
          className="mt-1 flex h-12 w-full items-center gap-2 rounded-[20px] px-4 text-[15px] font-medium opacity-80"
        >
          <ArrowUp size={16} /> Back to top
        </button>
      </div>
    </header>
  );
}

// Reload memory: where the reader was, so a refresh lands in the same place and the same colours.
const SAVE_KEY = 'cultivator-v2-pos';
const readSaved = () => {
  try {
    const v = JSON.parse(sessionStorage.getItem(SAVE_KEY));
    return v && Number.isFinite(v.y) && Number.isInteger(v.i) && v.i >= 0 && v.i < CHAPTERS.length ? v : null;
  } catch {
    return null;
  }
};

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
const smoothT = (t) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

export default function V2Page() {
  const [heroStyle, setHeroStyle] = useState('pond');
  const chapters = useMemo(() => CHAPTERS.map((chapter) => chapter.id === 'hero' ? { ...chapter, tone: heroStyle } : chapter), [heroStyle]);
  const [saved] = useState(readSaved);
  const [active, setActive] = useState(() => saved?.i ?? 0);
  // Intro plays on every load/refresh (skipped only for reduced motion); a restored position waits behind it.
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [introDelay] = useState(() => (intro ? INTRO_MS - 450 : 0));
  const lenisRef = useRef(null);
  const wheelRef = useRef(null);
  const bgRef = useRef(null);
  const rootRef = useRef(null);
  const c = chapters[active];
  const tone = TONES[c.tone];
  useScrollEngine();
  const endIntro = useCallback(() => setIntro(false), []);
  const toTop = useCallback(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Restore the reading position before first paint (we own scroll restoration on this page),
  // and keep saving it while the reader scrolls.
  useLayoutEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    if (saved) window.scrollTo(0, Math.min(saved.y, document.documentElement.scrollHeight - window.innerHeight));
    return () => {
      history.scrollRestoration = prev;
    };
  }, [saved]);

  useEffect(() => {
    let t = 0;
    const save = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      const secs = [...document.querySelectorAll('[data-i]')];
      const i = Math.max(0, secs.findLastIndex((el) => el.offsetTop <= mid));
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ y: window.scrollY, i }));
    };
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(save, 150);
    };
    const onHide = () => document.visibilityState === 'hidden' && save();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, []);

  // Smooth scrolling (Lenis). Skipped for reduced motion. Anchor links glide too.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.085, anchors: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  // Lock scrolling while the intro plays.
  useEffect(() => {
    if (!intro) return undefined;
    const id = requestAnimationFrame(() => lenisRef.current?.stop());
    document.documentElement.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();
    };
  }, [intro]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    const secs = [...document.querySelectorAll('[data-i]')];
    secs.forEach((el) => io.observe(el));
    const cols = chapters.map((ch) => ({ bg: hex(TONES[ch.tone].bg), fg: TONES[ch.tone].fg }));

    // Background colour blends continuously across each section boundary (no timed fades),
    // and text colour flips at the midpoint of the blend.
    const onScroll = () => {
      const y = window.scrollY;
      const vh = viewportHeight();
      const mid = y + vh * 0.5;
      let i = 0;
      while (i < secs.length - 1 && secs[i + 1].offsetTop <= mid) i += 1;
      const next = Math.min(i + 1, secs.length - 1);
      const b = secs[next].offsetTop;
      // Most boundaries blend over half a screen; dusk → night (into 21:00) fades over more than a screen,
      // so the sky darkens gradually while the aerator chapter is still pinned.
      const win = vh * (CHAPTERS[next].blend ?? 0.45);
      const t = next === i ? 0 : smoothT((mid - (b - win)) / win);
      const bg = mix(cols[i].bg, cols[next].bg, t);
      if (bgRef.current) bgRef.current.style.backgroundColor = bg;
      document.documentElement.style.setProperty('--v2-bg', bg);
      if (rootRef.current) rootRef.current.style.color = t > 0.5 ? cols[next].fg : cols[i].fg;
      if (wheelRef.current) wheelRef.current.style.transform = `rotate(${y * 0.25}deg)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chapters]);

  return (
    <div ref={rootRef} className="relative" style={{ color: tone.fg, transition: 'color 300ms ease' }}>
      <div ref={bgRef} className="fixed inset-0 -z-10" style={{ background: tone.bg }}>
        <div className="h-full w-full" style={{ opacity: c.id === 'hero' && heroStyle === 'pond' ? 0 : 1 }}>
          <ContourPattern variant={tone.pattern} frozen={Boolean(c.fail)} amp={c.wave[0]} speed={c.wave[1]} lines={c.id === 'hero' ? 5 : 8} wavelength={2.5} convergence={c.id === 'hero' ? 0.78 : 0.45} focusTarget={c.id === 'hero' ? '[data-slot="hero"]' : null} heartbeat={c.id !== 'hero'} chaos={c.noise} introChaos={0} pulses={0} lineOpacity={0.18} className="h-full w-full" />
        </div>
      </div>

      <ShrimpSymbol />
      <ShrimpActor hidden={intro} orangeHero={heroStyle === 'pond'} />
      {intro && <IntroScreen onDone={endIntro} />}
      <NavBar chapter={c} tone={tone} startDelay={introDelay} onTop={toTop} heroStyle={heroStyle} onHeroStyle={setHeroStyle} />


      {/* Back to top: the little paddlewheel turns as you scroll; tap it to glide back up. */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        className="group fixed bottom-5 right-5 z-20 grid h-12 w-12 place-items-center rounded-full transition-[opacity,transform] duration-300 hover:scale-110 active:scale-95"
        style={{ opacity: c.id === 'hero' ? 0 : 0.85, pointerEvents: c.id === 'hero' ? 'none' : 'auto' }}
      >
        <span ref={wheelRef} className="absolute inset-0">
          <WheelIcon className="h-full w-full" />
        </span>
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[#FF802E] text-[#231F20] shadow-[0_2px_6px_rgb(0_0_0/0.25)]">
          <ArrowUp size={14} strokeWidth={2.6} />
        </span>
      </button>

      <main>
        {chapters.map((ch, i) => (
          <section key={ch.id} id={ch.id} data-i={i} data-scene className="relative" style={{ minHeight: `calc(${ch.h * 100}svh + var(--stage-extra, 0px))` }}>
            <Chapter c={ch} heroStyle={heroStyle} />
          </section>
        ))}
      </main>

      <footer className="px-6 pb-16 text-center text-[14px] opacity-70">Cultivate Trust. Empower Farmers. · © 2026 Cultivator</footer>
    </div>
  );
}
