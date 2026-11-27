import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, BellRing, Droplets, Footprints, Mail, Play, Waves, Wind, Zap, ZapOff } from 'lucide-react';
import ContourPattern from '../../components/ContourPattern';
import { AeratorFront, AeratorGlyph, CableToBox, ProbeGlyph, ShrimpGlyph, Waveform } from './art';
import { DEVICE_POINTS } from './devicePoints';
import NightFarmer from './NightFarmer';
import crustea from '../../assets/carousel/crustea.png';
import lancore from '../../assets/carousel/Lancore_System.png';
import sankina from '../../assets/carousel/sankina_aquaculture.jpeg';
import hult from '../../assets/carousel/Hult_International_Business_School_logo.png';
import nthu from '../../assets/carousel/nthulogo.png';
import imba from '../../assets/carousel/IMBA.png';
import maxmar from '../../assets/carousel/maxmar.webp';
import nthuGarage from '../../assets/carousel/nthu-garage.webp';
import teamPond from '../../assets/v2/team-pond.jpg';
import fransPic from '../../assets/v2/frans.jpg';
import danielPic from '../../assets/v2/daniel.jpg';
import jasonPic from '../../assets/v2/jason.jpg';
import aeratorPic from '../../assets/v2/aerator-real.webp';
// Real product photos (same as the Nov 2026 company deck, p.8)
import clampPic from '../../assets/v2/setup-clamp.jpg';
import fieldBoxPic from '../../assets/v2/setup-field-box.jpg';
import probePic from '../../assets/v2/setup-do-probe.jpg';
import { smooth, useProgress, useStageSizing } from './scroll';
import { CONTACT } from './contact';

// Chapter scenes for /v2. Each scene lives inside <section data-scene id=…> which carries --e / --p (see scroll.js).
// Sticky scenes pin for (h − 1) screens and play their timeline on --p.

const ORANGE = '#FF802E';

// CSS helpers -------------------------------------------------------------
// seg(a, b): 0→1 as --p goes a→b.
const seg = (a, b) => `clamp(0, calc((var(--p) - ${a}) / ${b - a}), 1)`;
// rv: reveal on enter (--e), optional stagger.
const rv = (d = 0, dist = 50) => ({
  opacity: `clamp(0, calc(var(--e) * 1.8 - ${0.5 + d}), 1)`,
  transform: `translateY(calc((1 - clamp(0, calc(var(--e) * 1.4 - ${d}), 1)) * ${dist}px))`,
});
const tint = (pct) => ({ background: `color-mix(in srgb, currentColor ${pct}%, transparent)` });

function Stage({ children, className = '' }) {
  const ref = useStageSizing();
  return <div ref={ref} data-stage className={`sticky flex min-h-svh items-center py-24 md:h-svh md:overflow-hidden md:py-0 ${className}`} style={{ top: 'calc(-1 * var(--stage-extra, 0px))' }}>{children}</div>;
}

// Chapter label: the time of night (the story device) and a short name, in the spec's small caps style.
function Eyebrow({ children }) {
  const text = String(children);
  const m = text.match(/^(\d\d:\d\d)\s+(.*)$/);
  return (
    <p className="mb-4 flex items-baseline gap-3 text-[11px] opacity-80 md:text-[12px]" data-label="">
      {m ? (
        <>
          <span className="tabular-nums">{m[1]}</span>
          <span className="opacity-70">{m[2]}</span>
        </>
      ) : text}
    </p>
  );
}

function H2({ children, className = '', style }) {
  return <h2 className={`text-[36px] font-bold leading-[1.02] tracking-[-0.035em] [text-wrap:balance] md:text-[60px] ${className}`} style={style}>{children}</h2>;
}

// Text whose content is driven by scroll progress (counters, clocks) without re-rendering React.
function Live({ id, format, className = '', style }) {
  const ref = useRef(null);
  useProgress(id, (p, e) => {
    if (ref.current) ref.current.textContent = format(p, e);
  });
  return <span ref={ref} className={className} style={style}>{format(0, 0)}</span>;
}

// Pond strip with a horizon that fades into the distance.
function Pond({ className = 'h-[20svh]' }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--v2-bg,#FF802E)_45%)] ${className}`}>
      <ContourPattern variant="horizon" lines={10} amp={4} speed={1.2} className="absolute inset-0 h-full w-full opacity-75 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_30%,#000_55%,transparent_96%)]" />
    </div>
  );
}

// 19:00 — the shrimp has sunk; a paddlewheel rises and spins with the scroll ---------------------------
export function WheelScene() {
  return (
    <Stage className="!py-20 md:!py-0">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-4 px-6 md:grid-cols-2 md:gap-10 md:pb-[14svh]">
        <div style={rv()}>
          <Eyebrow>19:00 The machine</Eyebrow>
          <H2 className="!text-[30px] md:!text-[60px]">This is an aerator.</H2>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed opacity-90 md:mt-5 md:text-[20px]">A $300 paddlewheel that beats oxygen into the pond, 24 hours a day. Every pond needs 4 to 8 of them.</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold md:mt-8 md:gap-3 md:text-[14px]">
            <li className="inline-flex items-center gap-2 rounded-full px-3 py-2 md:px-4" style={{ ...tint(10), opacity: 'var(--e)' }}><Wind size={14} /> Gives oxygen</li>
            <li className="inline-flex items-center gap-2 rounded-full px-3 py-2 md:px-4" style={{ ...tint(10), opacity: 'var(--e)' }}><Waves size={14} /> Circulates water</li>
          </ul>
          <figure className="mt-7 hidden max-w-[300px] md:block" style={rv(0.1, 16)}>
            <img src={aeratorPic} alt="The Cultivator team beside a paddlewheel aerator on a pond" loading="lazy" decoding="async" className="aspect-[760/625] w-full rounded-[20px] object-cover shadow-[0_8px_24px_rgb(0_0_0/0.18)]" />
            <figcaption className="mt-2 text-[12px] uppercase tracking-[0.08em] opacity-75" data-label="">The real thing, with the team that monitors it</figcaption>
          </figure>
        </div>
        <div className="relative mx-auto h-[clamp(140px,30svh,260px)] w-full max-w-[340px] md:mt-32 md:aspect-square md:h-auto md:max-w-none md:w-[min(62vw,380px)]">
          <div data-slot="wheel" className="absolute left-1/2 top-1/2 aspect-square h-[75%] -translate-x-1/2 -translate-y-1/2 md:h-full">
            <span className="absolute -right-2 top-6 hidden rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#231F20] md:block" style={{ opacity: seg(0.3, 0.42), transform: `translateY(calc(var(--p) * -40px))` }}>O₂ ↑</span>
          </div>
          {/* Phone: the team photo used to fade in on top of the turning wheel. It now only shows on desktop, beside the text. */}
        </div>
      </div>
      <Pond />
    </Stage>
  );
}

// 21:00 — night: the wheel spins at the surface, shrimp swim beneath (parallax layers) ------------------
const SWARM = Array.from({ length: 22 }, (_, i) => {
  const r = (k) => {
    const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  return { x: r(1) * 100, y: 40 + r(2) * 52, size: 26 + r(3) * 40, layer: Math.floor(r(4) * 3), flip: r(5) > 0.5, d: r(6) * 3 };
});

// Shrimp swim across the pond (front layer fastest), bob gently, and drift with scroll (parallax).
// Default glyph faces left; flipped ones face and swim right.
function Swarm() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ color: ORANGE }}>
      {[0, 1, 2].map((layer) => (
        <div key={layer} className="absolute inset-0" style={{ transform: `translateX(calc(var(--p) * ${-(layer + 1) * 8}vw))`, opacity: 0.5 + layer * 0.25 }}>
          {SWARM.filter((s) => s.layer === layer).map((s, i) => {
            const dur = 15 - layer * 3.5 + s.d;
            return (
              <div
                key={i}
                className="v2-anim absolute left-0"
                style={{ top: `${s.y}%`, animation: `${s.flip ? 'v2swimR' : 'v2swimL'} ${dur}s linear ${-(s.x / 100) * dur}s infinite` }}
              >
                <div className="v2-anim" style={{ animation: `v2bob ${2.2 + s.d * 0.6}s ease-in-out ${-s.d}s infinite` }}>
                  <ShrimpGlyph real size={s.size * (1.2 + layer * 0.45)} style={{ transform: s.flip ? 'scaleX(-1)' : undefined }} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Bubbles({ count = 12 }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="v2-anim absolute bottom-0 rounded-full border border-white/50"
          style={{ left: `${8 + ((i * 37) % 84)}%`, width: 6 + (i % 4) * 3, height: 6 + (i % 4) * 3, animation: `v2rise ${5 + (i % 5)}s linear ${-i * 0.7}s infinite` }}
        />
      ))}
    </div>
  );
}

export function LifeScene() {
  return (
    <Stage>
      <Bubbles />
      <Swarm />
      <div data-slot="life" className="absolute left-1/2 top-[12%] aspect-square w-[min(40vw,220px)] -translate-x-1/2" />
      <div className="absolute inset-x-0 top-[34%] h-px bg-white/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#231F20] via-[#231F20]/85 to-transparent" />
      <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-6 pb-16" style={rv()}>
        <Eyebrow>21:00 Beneath the wheel</Eyebrow>
        <H2 className="max-w-[18ch]">A US$300 machine keeps up to US$50,000 of shrimp alive.</H2>
        <p className="mt-4 max-w-[38ch] text-[18px] opacity-90">That is the value of the shrimp in a single pond, and they depend on the aerators running all night.</p>
      </div>
    </Stage>
  );
}

// 23:00 — how farmers cope now (deck p.6) -----------------------------------------------------------
const COPE = [
  ['3 AM', 'Walk the ponds at night', 'Someone checks every aerator by hand. People miss things, and every visit is a biosecurity risk.', Footprints],
  ['Too much', 'Run every aerator all day', 'Safe for the shrimp, but aerators are the biggest electricity cost on the farm.', Zap],
  ['Too little', 'Cut back to save power', 'The bill goes down. So does the oxygen, and the farmer finds out from dead shrimp.', ZapOff],
];

export function FragileScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>23:00 The night shift</Eyebrow>
        <H2 className="max-w-[16ch]">How farmers cope now.</H2>
        <p className="mt-4 max-w-[40ch] text-[18px] opacity-90">None of these deals with the machine itself.</p>
      </div>
      {/* The night patrol: a farmer with a flashlight runs along the top rule of the list (v2/NightFarmer.jsx). */}
      <NightFarmer className="mt-6" />
      {/* A plain list with rules between items (was three tinted cards in a row). */}
      <ol className="grid border-t border-current/20 md:grid-cols-3 md:border-t-0">
        {COPE.map(([tag, title, body, Icon], i) => (
          <li key={title} className="border-b border-current/20 py-6 md:border-b-0 md:border-t md:py-7 md:pr-8" style={rv(0.1 + i * 0.08)}>
            <p className="flex items-center gap-2 text-[11px] text-[#FF802E]" data-label="">
              <Icon size={14} strokeWidth={2.25} aria-hidden="true" /> {tag}
            </p>
            <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.02em] md:text-[26px]">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed opacity-85">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[56ch] text-[15px] opacity-80" style={rv(0.35)}>
        About 90% of shrimp farmers are smallholders. Most check their ponds by hand every night and rely on experience.
      </p>
    </div>
  );
}

// 02:13 — the wheel stops --------------------------------------------------------------------------
export function FailureScene() {
  const hum = useRef({ amp: 1, spike: 0 });
  useProgress('failure', (p) => {
    hum.current.amp = 1 - smooth(0.06, 0.36, p);
  });
  const clock = (p) => {
    const m = 13 + Math.round(smooth(0.35, 0.92, p) * 60);
    return `0${2 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
  };
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-6 md:grid-cols-2 md:gap-10">
        <div>
          <Eyebrow>02:13 Pond 07</Eyebrow>
          <H2>The wheel stops.</H2>
          <p className="mt-4 max-w-[32ch] text-[17px] opacity-90" style={{ opacity: `calc(0.9 * ${seg(0.12, 0.25)})` }}>A US$300 machine fails in the dark. Nobody hears it.</p>
          {/* The loss counts up with the clock: at 03:13, about an hour after the stop, it reaches the deck's US$50,000. */}
          <div className="mt-4 md:mt-8" style={{ opacity: seg(0.3, 0.4) }}>
            <p className="text-[11px] opacity-75 md:text-[12px]" data-label="">Time now <Live id="failure" format={clock} className="tabular-nums" /></p>
            <Live id="failure" format={(p) => `−US$${Math.round(smooth(0.35, 0.92, p) * 50000).toLocaleString('en-US')}`} className="v2-display block text-[40px] font-extrabold tabular-nums tracking-[-0.04em] text-[#FF802E] md:text-[68px]" />
            <p className="text-[15px] opacity-85">of shrimp lost from one pond. Up to US$50,000 in about an hour.</p>
          </div>
          <p className="mt-4 text-[18px] font-semibold md:mt-8 md:text-[24px]" style={{ opacity: seg(0.86, 0.96), transform: `translateY(calc((1 - ${seg(0.86, 0.96)}) * 20px))` }}>
            One stopped aerator can cost a whole pond.
          </p>
        </div>
        <div className="grid gap-3">
          <div data-slot="failure" className="mx-auto aspect-square w-[110px] md:w-[220px]" />
          <div className="hidden rounded-[16px] px-4 pb-2 pt-3 md:block" style={tint(6)}>
            {/* What Cultivator reads: the aerator's current, falling to 0 A when it stops (current only, no vibration). */}
            <p className="text-[11px] opacity-75" data-label="">Aerator current</p>
            <Waveform ampRef={hum} kind="current" className="h-12" />
          </div>
          <div className="rounded-[16px] px-4 pb-3 pt-3" style={tint(6)}>
            <p className="text-[11px] uppercase tracking-[0.08em] opacity-75" data-label="">Dissolved oxygen</p>
            <svg viewBox="0 0 300 84" className="mt-1 w-full" fill="none" aria-hidden="true">
              <path d="M0 62 H300" stroke={ORANGE} strokeDasharray="3 5" strokeWidth="1" />
              <text x="296" y="56" textAnchor="end" fontSize="10" fill={ORANGE} data-label="">critical</text>
              <path d="M0 16 H95 C150 18 190 54 300 80" stroke="currentColor" strokeWidth="2" pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${seg(0.12, 0.9)})` }} />
            </svg>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// 02:13 — the gap -------------------------------------------------------------------------------
const GAP = 'The industry monitors the water. Who looks after the machine that keeps the shrimp alive?'.split(' ');

export function GapScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl items-center px-6 py-24">
      <p className="text-[40px] font-bold leading-[1.04] tracking-[-0.035em] md:text-[76px]">
        {GAP.map((w, i) => (
          <span key={i} style={{ opacity: `clamp(0.12, calc(var(--e) * ${GAP.length * 1.5} - ${i}), 1)`, color: i >= 5 ? ORANGE : undefined }}>
            {w}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}

// 02:14 — Cultivator: how it works (Nov 2026 deck p.7–8) ----------------------------------------------
// [title, text, photo, appears at --p]. Timing follows the old steps so the scroll feel is unchanged.
const STEPS = [
  ['Clip on', 'A current sensor clamps onto the aerator’s cable inside the existing electrical box.', clampPic, 0.3],
  ['Read the water', 'An optical dissolved oxygen probe and a pH sensor sit in the pond.', probePic, 0.42],
  ['Field box', 'A sealed box inside the same electrical box holds the electronics. Every sensor shares one RS-485 cable back to it.', fieldBoxPic, 0.52],
  ['Phone and dashboard', 'Alerts on LINE or WhatsApp, daily to per-harvest reports, and a web dashboard.', null, 0.68],
];

// Numbered labels on the drawing, matching the list. Placed in drawing coordinates (AeratorFront viewBox 31 68 746 437)
// and converted to %, so they stay on their arrows at any width. The label's right edge sits at the arrow's start.
// [number, label, point, index in STEPS]. The probe (2) is labelled at the bottom of the column, where it hangs.
const DEVICE_LABELS = [
  ['1', 'Clip-on sensor', DEVICE_POINTS.clamp.from, 0],
  ['3', 'Field box', DEVICE_POINTS.fieldBox.from, 2],
];
const atPct = ([x, y]) => ({ left: `${((x - 31) / 746) * 100}%`, top: `${((y - 68) / 437) * 100}%` });
// Where the probe cable leaves the drawing (x 767 in drawing units), as a % of the drawing's width.
const PROBE_X = `${((767 - 31) / 746) * 100}%`;

function NumberDot({ n }) {
  return <span className="v2-display grid size-5 shrink-0 place-items-center rounded-full bg-[#FF802E] text-[11px] font-extrabold text-[#231F20]">{n}</span>;
}

export function DeviceScene() {
  const current = useRef({ amp: 0.6, spike: 0 });
  const oxy = useRef({ amp: 0.45, spike: 0 });
  const [fixed, setFixed] = useState(false);
  useProgress('device', (p) => {
    const s = smooth(0.58, 0.66, p) * (1 - smooth(0.8, 0.88, p));
    current.current.spike = s;
    setFixed(p > 0.86);
  });
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div>
          <Eyebrow>02:14 Cultivator</Eyebrow>
          <H2 className="md:!text-[48px]">We watch the machine and tell the farmer straight away.</H2>
          <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed opacity-90 md:text-[17px]">Nothing is mounted on the aerator. A US$10 sensor sits on its cable in the farm’s electrical box. No cable is cut, and in our tests it took under 10 minutes to fit.</p>
          <ol className="mt-6 divide-y divide-current/15 border-y border-current/15 md:mt-8">
            {STEPS.map(([title, text, pic, at], i) => (
              <li key={title} className="flex items-center gap-4 py-3" style={{ opacity: `calc(0.6 + 0.4 * ${seg(at, at + 0.06)})` }}>
                {pic ? (
                  <img src={pic} alt="" loading="lazy" decoding="async" className="size-12 shrink-0 rounded-[10px] bg-white object-cover md:size-14" />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-[10px] bg-[#FF802E] text-[#231F20] md:size-14"><BellRing size={20} aria-hidden="true" /></span>
                )}
                <span className="min-w-0">
                  <span className="v2-display block text-[15px] font-bold md:text-[16px]">{i + 1}. {title}</span>
                  <span className="block text-[13px] leading-snug opacity-80 md:text-[14px]">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Right column: drawing (with room around it for the labels), then the readings, then the alert.
            Nothing overlaps the drawing. The probe cable runs down the right-hand lane, past everything,
            to the probe at the very bottom: it reads the water near the pond floor. */}
        <div className="relative md:ml-6" data-play-target="">
          {/* Probe lane: same width and position as the drawing, so the line lines up with the cable leaving it.
              Its top is the drawing's bottom edge: the drawing's top margin + its height (437/746 of its width = 58.58cqw). */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[92%] -translate-x-1/2 [container-type:inline-size] md:w-[86%]" style={{ opacity: seg(0.42, 0.48) }} aria-hidden="true">
            <span className="absolute bottom-[94px] top-[calc(24px+58.58cqw)] -translate-x-1/2 border-l-[2px] border-dashed border-white/85 md:top-[calc(40px+58.58cqw)]" style={{ left: PROBE_X }} />
            <span className="absolute bottom-2 -translate-x-1/2" style={{ left: PROBE_X }}>
              <ProbeGlyph className="w-7 text-white" />
            </span>
            {/* the pond floor */}
            <span className="absolute bottom-0 left-[55%] right-0 border-t border-dashed border-white/25" />
          </div>
          <span
            className="pointer-events-none absolute bottom-[42px] z-[1] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-0.5 pr-2.5 text-[12px] font-bold text-[#231F20] shadow-[0_2px_8px_rgb(0_0_0/0.3)]"
            style={{ right: 'calc(8% + 30px)', opacity: seg(STEPS[1][3] + 0.02, STEPS[1][3] + 0.08) }}
          >
            <NumberDot n="2" />
            <span className="v2-display">Oxygen and pH probe, near the pond floor</span>
          </span>

          <div className="relative mx-auto mt-6 w-[92%] md:mt-10 md:w-[86%]" style={{ perspective: '900px' }}>
            <div data-slot="device" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2" />
            <AeratorFront
              className="w-full text-white"
              style={{ transform: `rotateY(calc((1 - ${seg(0.14, 0.28)}) * -90deg))`, opacity: seg(0.13, 0.17) }}
            >
              <CableToBox
                cableStyle={{ strokeDashoffset: `calc(1 - ${seg(0.3, 0.42)})` }}
                boxStyle={{ opacity: seg(0.28, 0.34) }}
                clampStyle={{ opacity: seg(0.3, 0.36), transform: `translateY(calc((1 - ${seg(0.3, 0.36)}) * -30px))` }}
                probeStyle={{ opacity: seg(0.42, 0.48) }}
                fieldBoxStyle={{ opacity: seg(0.52, 0.58) }}
                leaderStyles={[STEPS[0][3], STEPS[1][3], STEPS[2][3]].map((at) => ({ opacity: seg(at + 0.02, at + 0.08) }))}
              />
            </AeratorFront>
            {DEVICE_LABELS.map(([n, label, pt, stepIndex]) => {
              const at = STEPS[stepIndex][3];
              return (
                <span
                  key={n}
                  className="pointer-events-none absolute z-[1] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-0.5 text-[12px] font-bold text-[#231F20] shadow-[0_2px_8px_rgb(0_0_0/0.3)] sm:pr-2.5"
                  style={{ ...atPct(pt), transform: 'translate(-100%, -50%)', opacity: seg(at + 0.02, at + 0.08) }}
                >
                  <NumberDot n={n} />
                  <span className="v2-display hidden sm:inline">{label}</span>
                </span>
              );
            })}
          </div>

          {/* Readings and alert stop short of the right edge, leaving a clear lane for the probe cable. */}
          <div className="pr-[13%]">
          <div className="mt-8 grid grid-cols-2 gap-3" style={{ opacity: seg(0.5, 0.6) }}>
            <div className="rounded-[14px] px-3 pb-1 pt-2" style={tint(6)}>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] opacity-75" data-label=""><Activity size={12} /> Current</p>
              <Waveform ampRef={current} kind="current" className="h-12" color={ORANGE} />
            </div>
            <div className="rounded-[14px] px-3 pb-1 pt-2" style={tint(6)}>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] opacity-75" data-label=""><Droplets size={12} /> Dissolved O₂</p>
              <Waveform ampRef={oxy} kind="hum" className="h-12" color={ORANGE} />
            </div>
          </div>

          {/* The alert, under the readings on every screen size (it used to cover the drawing on desktop). */}
          <div
            className="relative z-10 mt-3 w-full rounded-[18px] bg-white p-4 text-[#231F20] shadow-[0_12px_24px_rgb(0_0_0/0.35)]"
            style={{ opacity: seg(0.68, 0.74), transform: `translateY(calc((1 - ${seg(0.68, 0.78)}) * 24px))` }}
          >
            <p className="flex items-center gap-2">
              <NumberDot n="4" />
              <span className="flex items-center gap-1.5 text-[11px] opacity-75" data-label=""><BellRing size={12} aria-hidden="true" /> Cultivator on LINE</span>
            </p>
            <p className="v2-display mt-1.5 text-[15px] font-bold">{fixed ? 'Pond 07: aerator 3 running again' : 'Pond 07: aerator 3 stopped'}</p>
            <p className="text-[13px] opacity-80">{fixed ? 'Oxygen is recovering.' : 'Current dropped to 0 A at 02:14. Oxygen is falling.'}</p>
          </div>
          </div>
          {/* room at the bottom for the probe and its label */}
          <div className="h-[110px]" />
        </div>
      </div>
    </Stage>
  );
}

// 03:00 — see it working: the team's software walkthrough on YouTube.
// Shows the thumbnail only; YouTube's player (privacy-enhanced domain) loads when the reader presses play.
const DEMO = { id: 'Z1nB4kvm3vs', title: 'Cultivator Software Integration', url: 'https://youtu.be/Z1nB4kvm3vs' };

export function DemoScene() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 py-24 md:py-20">
      <div style={rv()}>
        <Eyebrow>03:00 See it working</Eyebrow>
        <H2 className="max-w-[22ch]">From the aerator to the farmer&apos;s phone.</H2>
        <p className="mt-4 max-w-[46ch] text-[17px] opacity-85">A short walkthrough of the Cultivator app, where farmers see their aerators, alerts and logs.</p>
      </div>
      <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-[24px] bg-black md:mt-8 md:max-w-[max(30rem,calc((100svh-26rem)*16/9))] shadow-[0_20px_50px_rgb(0_0_0/0.35)]" style={rv(0.1, 30)}>
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${DEMO.id}?autoplay=1&rel=0&modestbranding=1`}
            title={DEMO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${DEMO.title}`}>
            <img src={`https://i.ytimg.com/vi/${DEMO.id}/maxresdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgb(35_31_32/0.7),transparent_55%)]" />
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FF802E] sm:size-20 text-[#231F20] shadow-[0_8px_24px_rgb(0_0_0/0.35)] transition-transform duration-300 group-hover:scale-110">
              <Play fill="currentColor" className="ml-1 size-6 sm:size-8" aria-hidden="true" />
            </span>
            <span className="absolute bottom-5 left-6 hidden text-left text-white sm:block">
              <span className="block text-[11px] uppercase tracking-[0.08em] opacity-80" data-label="">Video</span>
              <span className="mt-1 block text-[18px] font-semibold">{DEMO.title}</span>
            </span>
          </button>
        )}
      </div>
      <a href={DEMO.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1 self-start text-[14px] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current" style={rv(0.2)}>
        Watch on YouTube<ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </div>
  );
}

// 04:00 — proof from a real farm (deck p.10): one of twelve aerators was drawing 3× its normal current ----
const FAULTY = 6;

export function ImpactScene() {
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <Eyebrow>04:00 Proof from a real farm</Eyebrow>
          <H2>On a farm test, one aerator was drawing 3× its normal current.</H2>
          {/* Real figures, shown as they are. (They used to count up with scroll, so a reader who stopped
              partway saw wrong numbers like US$14.) */}
          <dl className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              ['US$200', 'a year of electricity wasted, for one aerator'],
              ['US$15', 'to fix it, once we knew which one'],
              ['<10 min', 'to fit one aerator, in our own tests'],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-row-reverse items-baseline justify-end gap-3 sm:flex-col-reverse sm:items-stretch sm:gap-0">
                <dt className="text-[13px] leading-snug opacity-80">{label}</dt>
                <dd className="v2-display w-[4.4em] shrink-0 whitespace-nowrap text-[28px] font-extrabold tabular-nums tracking-[-0.03em] text-[#FF802E] sm:w-auto sm:text-[clamp(22px,3.4vw,34px)] md:text-[clamp(22px,2.7vw,40px)]">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[46ch] text-[14px] opacity-75">
            <span className="font-semibold">Still to prove:</span> how the system holds up over months on a farm. Our pilots will give us that data.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="relative">
              <div className="v2-anim" style={{ animation: `v2bob ${2.4 + (i % 4) * 0.3}s ease-in-out ${-i * 0.37}s infinite` }}>
                <AeratorGlyph className="w-full text-white" />
              </div>
              {i === FAULTY && (
                <>
                  <span className="pointer-events-none absolute -inset-2 rounded-[16px] ring-2 ring-[#FF802E]" style={{ opacity: seg(0.15, 0.3), boxShadow: '0 0 24px rgba(255,128,46,0.55)' }} />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF802E] px-2 py-0.5 text-[11px] font-bold text-[#231F20]" style={{ opacity: seg(0.2, 0.32) }}>3×</span>
                </>
              )}
            </div>
          ))}
          <p className="col-span-4 text-[12px] uppercase tracking-[0.08em] opacity-75" data-label="">
            Measured on a farm in Taiwan
          </p>
        </div>
      </div>
    </Stage>
  );
}

// 05:00 — how we compare (Nov 2026 deck p.11, word for word) ---------------------------------------------
const COMPARE_ROWS = ['Focus', 'Hardware', 'What it controls', 'How it is sold'];
const COMPARE = [
  { name: 'Aqua Exchange', cells: ['Farm operations and power visibility', 'Its own platform equipment', 'Farm-level visibility', 'Lease'] },
  { name: 'Eruvaka', cells: ['Water quality and feeding', 'A full system for each pond', 'Pond conditions', 'Lease, US$15 to 35 per pond a month'] },
  { name: 'HydroNeo', cells: ['Dissolved oxygen automation', 'A full system for each pond', 'Aeration from oxygen readings', 'Lease, US$300 per pond a month'] },
  { name: 'Cultivator', us: true, cells: ['The aerator itself', 'On the cables of the aerators farmers already own, any brand', 'Each aerator, with a check that it responded (in development)', 'Buy: US$750 per pond + US$10 per aerator, then US$10 a month. Lease-to-own: US$99 setup + US$45 a month'] },
];

export function MarketScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>05:00 How we compare</Eyebrow>
        <H2 className="max-w-[20ch]">Others manage the pond. We start with the aerator.</H2>
      </div>

      {/* Desktop: one table, Cultivator's column in orange. */}
      <div className="mt-10 hidden overflow-hidden rounded-[18px] border border-[#231F20]/12 md:block" style={rv(0.1, 30)}>
        <table className="w-full table-fixed border-collapse text-left text-[15px] leading-snug">
          <thead>
            <tr>
              <th className="w-[15%] p-4" aria-label="Compared on" />
              {COMPARE.map((c) => (
                <th key={c.name} scope="col" className={`p-4 text-[18px] font-bold ${c.us ? 'bg-[#FF802E] text-[#231F20]' : ''}`}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, r) => (
              <tr key={row} className="border-t border-[#231F20]/12">
                <th scope="row" className="p-4 align-top text-[11px] opacity-70" data-label="">{row}</th>
                {COMPARE.map((c) => (
                  <td key={c.name} className={`p-4 align-top ${c.us ? 'bg-[#FF802E] font-semibold text-[#231F20]' : 'opacity-85'}`}>{c.cells[r]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: Cultivator first, then each competitor as a short list. */}
      <div className="mt-8 grid gap-3 md:hidden">
        {[COMPARE[3], ...COMPARE.slice(0, 3)].map((c) => (
          <dl key={c.name} className={`rounded-[18px] p-5 ${c.us ? 'bg-[#FF802E] text-[#231F20]' : 'border border-[#231F20]/12'}`}>
            <p className="v2-display text-[20px] font-bold">{c.name}</p>
            {COMPARE_ROWS.map((row, r) => (
              <div key={row} className="mt-3">
                <dt className="text-[10px] opacity-70" data-label="">{row}</dt>
                <dd className={`text-[15px] leading-snug ${c.us ? 'font-semibold' : 'opacity-85'}`}>{c.cells[r]}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      <p className="mt-4 text-[12px] opacity-65">Competitor details are from public information gathered for our pitch deck and may have changed.</p>
    </div>
  );
}

// 05:30 — proof: sticky country list, cards scroll past ------------------------------------------------
const PROOF = [
  { country: 'Indonesia', note: 'Maxmar and Crustea', body: 'Maxmar, a large shrimp farmer, has agreed to test our finished product on a 10-pond farm in Madura (nothing is signed yet). Crustea is our aquaculture guide and launch partner.' },
  { country: 'Taiwan', note: 'Farm tests and LanCore System', body: 'Farm visits, tests and our first paid pilots. LanCore System is our technical partner for aerator control and motor drives.' },
  { country: 'Malaysia', note: 'Sankina Aquaculture', body: 'Partner and advisor on shrimp farming, through Managing Director Jenny Ou.' },
  { country: 'China', note: 'Signed pilots', body: 'Pilot farms signed up to test Cultivator.' },
];
const STATS = [['15+', 'signed pilots'], ['5', 'paid pilots'], ['4', 'countries'], ['~5,000', 'aerators across our pilots and partners']];
// Nov 2026 deck p.3
const MILESTONES = [
  ['Feb 2026', 'Cultivator starts'],
  ['Mar 2026', 'Joins NTHU Garage'],
  ['Apr 2026', 'Hult Prize Taiwan champion'],
  ['May–Jul 2026', 'Farm tests and first paid pilots'],
  ['Autumn 2026', 'Nominated by NTHU for Techathon+'],
  ['Nov 2026', 'A teammate takes 2nd place at DeployAI'],
  ['Nov 2026', 'Filmed by LITEON; first sealed field box'],
  ['25 Jan 2027', 'Techathon+ finals, if selected'],
];
const PARTNERS = [
  ['Maxmar', maxmar],
  ['Crustea', crustea],
  ['LanCore System', lancore],
  ['Sankina Aquaculture', sankina],
  ['NTHU Garage', nthuGarage],
  ['Hult Prize', hult],
  ['NTHU', nthu],
  ['IMBA NTHU', imba],
];

export function ProofScene() {
  const [active, setActive] = useState(0);
  const cards = useRef([]);
  useEffect(() => {
    // Desktop (cards stick and stack): the active country is the last card that has reached, or nearly reached,
    // the place where it sticks. Phone (plain list): the card crossing the middle of the screen.
    const sticky = () => cards.current[0] && getComputedStyle(cards.current[0]).position === 'sticky';
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && !sticky() && setActive(Number(e.target.dataset.k))), { rootMargin: '-45% 0px -45% 0px' });
    cards.current.forEach((el) => el && io.observe(el));
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!sticky()) return;
      let a = 0;
      cards.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= (parseFloat(getComputedStyle(el).top) || 0) + window.innerHeight * 0.25) a = i;
      });
      setActive(a);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>05:30 Traction and partners</Eyebrow>
          <H2 className="md:text-[52px]">Who is working with us.</H2>
          <ul className="mt-8 space-y-1">
            {PROOF.map((p, i) => (
              <li key={p.country} className="flex items-center gap-3 text-[26px] font-bold tracking-[-0.02em] md:text-[32px]" style={{ opacity: active === i ? 1 : 0.38, transition: 'opacity 400ms ease' }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF802E]" style={{ transform: `scale(${active === i ? 1 : 0})`, transition: 'transform 400ms cubic-bezier(.16,1,.3,1)' }} />
                {p.country}
              </li>
            ))}
          </ul>
        </div>
        {/* Desktop: cards stack while the country list stays put. Phone: a plain list (the country list
            above can't stay in view on a phone, so stacked cards lost their context). */}
        <div className="relative isolate md:pb-[12svh]" data-snap-children="">
          {PROOF.map((p, i) => (
            <article
              key={p.country}
              ref={(el) => { cards.current[i] = el; }}
              data-k={i}
              className="mb-4 flex flex-col gap-6 rounded-[18px] p-6 md:sticky md:mb-8 md:min-h-[min(52svh,420px)] md:justify-between md:gap-16 md:rounded-[28px] md:p-8"
              style={{ '--top': `calc(88px + ${i * 14}px)`, top: 'var(--top)', zIndex: i + 1, background: i % 2 ? '#231F20' : '#FFFFFF', color: i % 2 ? '#FFFFFF' : '#231F20', border: '1px solid rgb(35 31 32 / 0.12)' }}
            >
              <p className="text-[11px] opacity-75" data-label="">{p.note}</p>
              <div>
                <h3 className="text-[32px] font-bold tracking-[-0.035em] md:text-[64px]">{p.country}</h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed opacity-85 md:mt-3 md:text-[16px]">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Numbers in ink with an orange mark: orange text on white is too faint to read (about 2.5:1). */}
      <dl className="mt-16 grid grid-cols-2 gap-6 md:mt-20 md:grid-cols-4">
        {STATS.map(([v, l]) => (
          <div key={l} className="flex flex-col-reverse justify-end border-t-[3px] border-[#FF802E] pt-3">
            <dt className="text-[14px] opacity-80">{l}</dt>
            <dd className="v2-display text-[40px] font-extrabold tracking-[-0.035em] md:text-[52px]">{v}</dd>
          </div>
        ))}
      </dl>
      <ol className="mt-12 grid border-t border-current/15 sm:grid-cols-2 md:grid-cols-4" aria-label="Milestones">
        {MILESTONES.map(([when, what]) => (
          <li key={when + what} className="border-b border-current/15 py-4 pr-4">
            <p className="text-[11px] opacity-70" data-label="">{when}</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug">{what}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 overflow-hidden border-y border-current/15 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="v2-anim flex w-max items-center gap-14" style={{ animation: 'v2marquee 36s linear infinite' }}>
          {[...PARTNERS, ...PARTNERS].map(([name, src], i) => (
            <img key={i} src={src} alt={i < PARTNERS.length ? name : ''} loading="lazy" className="h-9 w-auto max-w-[140px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-11" />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] opacity-70" data-label="">Featured in LITEON&apos;s “Boldness” campaign, November 2026</p>
    </div>
  );
}

// 05:45 — pricing (deck p.11) -----------------------------------------------------------------------
export function ModelScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>05:45 Pricing</Eyebrow>
        <H2>Buy it, or lease it to own.</H2>
        <p className="mt-4 max-w-[44ch] text-[18px] opacity-90">A US$10 sensor on each aerator’s cable, in the electrical box the farm already has. Works with any brand.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          ['Buy', 'US$750', 'per pond, + US$10 per aerator, then US$10 a month'],
          ['Lease-to-own', 'US$45 / mo', 'after a US$99 setup'],
        ].map(([k, v, d], i) => (
          <div key={k} className="rounded-[18px] p-7 md:p-8" style={{ ...rv(0.1 + i * 0.1), background: i ? ORANGE : '#231F20', color: i ? '#231F20' : '#FFFFFF' }}>
            <p className="text-[11px] opacity-80" data-label="">{k}</p>
            <p className="v2-display mt-6 text-[48px] font-extrabold tracking-[-0.04em] md:text-[72px]">{v}</p>
            <p className="mt-2 opacity-90">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 06:00 — team (deck p.15) ---------------------------------------------------------------------------
const TEAM = [
  ['Fransiskus Guntur', 'Overall architecture of the company', fransPic],
  ['Daniel Ieong', 'Software and business', danielPic],
  ['Jason Nababan', 'Partnerships and product development', jasonPic],
];

const ADVISORS = [
  ['Jenny Ou', 'Managing Director, Sankina Aquaculture. Advises us on shrimp farming.'],
  ['Bagas Pramana Putra Fadhila', 'Tech lead, Sinarmas. Advises us on technology development.'],
  ['Prof. Yu Wei Hsu', 'IMBA, National Tsing Hua University. Advises us on business development.'],
];

export function TeamScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>06:00 Dawn</Eyebrow>
        <H2>The people.</H2>
        <p className="mt-4 max-w-[52ch] opacity-90">We are fourth-year students at National Tsing Hua University and graduate in May 2027. All three of us go full-time on Cultivator straight after.</p>
      </div>
      <div className="mt-8 overflow-hidden rounded-[18px] bg-[#231F20]/10" style={rv(0.05, 40)}>
        <img src={teamPond} alt="The Cultivator team at a pond" loading="lazy" decoding="async" className="aspect-[16/7] w-full object-cover" />
      </div>
      <ul className="mt-10 grid gap-x-6 border-t border-[#231F20]/20 sm:grid-cols-3">
        {TEAM.map(([n, f, pic], i) => (
          <li key={n} className="flex items-center gap-4 border-b border-[#231F20]/20 py-5 sm:flex-col sm:items-start sm:border-b-0" style={rv(0.08 * i, 24)}>
            <img src={pic} alt="" loading="lazy" decoding="async" className="size-16 shrink-0 rounded-full bg-[#231F20]/10 object-cover sm:size-20" />
            <div>
              <h3 className="text-[20px] font-bold tracking-[-0.02em]">{n}</h3>
              <p className="text-[14px] opacity-80">{f}</p>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-10 text-[11px] opacity-75" data-label="" style={rv(0.3)}>Advisors</h3>
      <ul className="mt-3 grid gap-x-6 md:grid-cols-3">
        {ADVISORS.map(([n, r], i) => (
          <li key={n} className="border-t border-[#231F20]/20 py-4" style={rv(0.35 + i * 0.06, 24)}>
            <p className="font-bold">{n}</p>
            <p className="text-[14px] opacity-85">{r}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 06:00 — what's next + decks + contact (deck p.14, p.16) ---------------------------------------------
// Nov 2026 deck p.14
const ROADMAP = [
  ['Now', 'Sensing works on the bench', 'Alerts and reports on LINE and WhatsApp. First sealed field box built.'],
  ['Next', 'A long trial in a real pond', 'Farm-ready hardware: a custom circuit board, 4G fallback and battery backup.'],
  ['By end of 2027', '150+ ponds equipped', 'A production unit running 30+ days on a farm without a visit.'],
];

export function AskScene() {
  return (
    <div className="mx-auto min-h-svh max-w-6xl px-6 py-24">
      <div style={rv()}>
        <Eyebrow>06:00 What&apos;s next</Eyebrow>
        <H2 className="md:text-[72px]">From the bench to the pond.</H2>
      </div>
      <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        {/* the line the three steps sit on */}
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-[#231F20]/20 md:inset-x-0 md:bottom-auto md:left-0 md:top-[7px] md:h-px md:w-auto" />
        {ROADMAP.map(([when, title, note], i) => (
          <li key={when} className="relative pl-9 md:pl-0 md:pt-10" style={rv(0.1 + i * 0.08, 24)}>
            <span aria-hidden="true" className={`absolute left-0 top-1 size-[15px] rounded-full border-2 border-[#231F20] md:top-0 ${i === 0 ? 'bg-[#231F20]' : 'bg-transparent'}`} />
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] opacity-75" data-label="">{when}</p>
            <p className="mt-2 text-[24px] font-bold leading-tight tracking-[-0.02em] md:text-[28px]">{title}</p>
            <p className="mt-1 text-[15px] opacity-75">{note}</p>
          </li>
        ))}
      </ol>
      <div className="mt-16 grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <h3 className="max-w-[30ch] text-[26px] font-bold leading-tight tracking-[-0.02em] md:text-[34px]" style={rv(0.2)}>
            Want to see it on one of your aerators, or follow our progress? Get in touch.
          </h3>

          {/* The old pitch deck download was removed: that PDF still has numbers the Nov 2026 deck replaced.
              Add the new deck here once it can go public (see contact.js). */}
          <div className="mt-8 flex flex-wrap gap-3" style={rv(0.3)}>
            <a href={CONTACT.conversation} className="v2-btn bg-[#231F20] text-white hover:bg-[#3a3435]">Get in touch</a>
          </div>
          <address id="contact" className="mt-10 scroll-mt-28 border-t border-[#231F20]/20 pt-6 not-italic">
            <h3 className="text-[11px] opacity-75" data-label="">Let’s connect</h3>
            <a href={`mailto:${CONTACT.email}`} className="mt-2 inline-flex min-h-11 items-center gap-2 text-[16px] font-semibold underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
              <Mail size={18} aria-hidden="true" />
              {CONTACT.email}
            </a>
            <div className="mt-2 grid grid-cols-2 gap-x-4">
              {CONTACT.phones.map(({ name, number, href }) => (
                <a key={name} href={href} className="flex min-h-14 flex-col justify-center text-[14px] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
                  <span className="text-[12px] opacity-75">{name}</span>
                  <span className="whitespace-nowrap font-medium">{number}</span>
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6">
              {CONTACT.socials.map(({ name, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-[14px] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current">
                  {name}<ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </address>
        </div>
        <div data-slot="ask" className="mx-auto aspect-square w-[min(56vw,300px)]" />
      </div>
    </div>
  );
}
