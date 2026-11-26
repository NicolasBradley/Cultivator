import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, BellRing, Ear, Footprints, Mail, Plug, Timer, Waves, Wind } from 'lucide-react';
import ContourPattern from '../../components/ContourPattern';
import { AeratorFront, AeratorGlyph, DeviceOnMotor, ShrimpGlyph, Waveform } from './art';
import crustea from '../../assets/carousel/crustea.png';
import lancore from '../../assets/carousel/Lancore_System.png';
import fubon from '../../assets/carousel/fubon insurane.png';
import sankina from '../../assets/carousel/sankina_aquaculture.jpeg';
import hult from '../../assets/carousel/Hult_International_Business_School_logo.png';
import nthu from '../../assets/carousel/nthulogo.png';
import imba from '../../assets/carousel/IMBA.png';
import pioneer from '../../assets/carousel/pioneer group logo.png';
import wisesemi from '../../assets/carousel/wisesemi_technology_coporation_logo.jpeg';
import hungstar from '../../assets/carousel/hung star logo.jpeg';
import teamPond from '../../assets/v2/team-pond.jpg';
import fransPic from '../../assets/v2/frans.jpg';
import danielPic from '../../assets/v2/daniel.jpg';
import jaiPic from '../../assets/v2/jai.jpg';
import jasonPic from '../../assets/v2/jason.jpg';
import installPic from '../../assets/v2/device-install.webp';
import aeratorPic from '../../assets/v2/aerator-real.webp';
import AsciiImg from './AsciiImg';
import { LQIP } from './lqip';
import { smooth, useProgress, useStageSizing } from './scroll';
import { CONTACT, PITCH_DECK } from './contact';

// Chapter scenes for /v2. Each scene lives inside <section data-scene id=…> which carries --e / --p (see scroll.js).
// Sticky scenes pin for (h − 1) screens and play their timeline on --p.

const MONO = 'ui-monospace, "JetBrains Mono", Menlo, monospace';
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

function Eyebrow({ children }) {
  return (
    <p className="mb-4 text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>
      {children}
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
          <Eyebrow>19:00 · The machine</Eyebrow>
          <H2 className="!text-[30px] md:!text-[60px]">This is an aerator.</H2>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed opacity-90 md:mt-5 md:text-[20px]">A $300 paddlewheel that beats oxygen into the pond, 24 hours a day. Every pond needs 4 to 8 of them.</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold md:mt-8 md:gap-3 md:text-[14px]">
            <li className="inline-flex items-center gap-2 rounded-full px-3 py-2 md:px-4" style={{ ...tint(10), opacity: 'var(--e)' }}><Wind size={14} /> Gives oxygen</li>
            <li className="inline-flex items-center gap-2 rounded-full px-3 py-2 md:px-4" style={{ ...tint(10), opacity: 'var(--e)' }}><Waves size={14} /> Circulates water</li>
          </ul>
          <figure className="mt-7 hidden max-w-[300px] md:block" style={rv(0.1, 16)}>
            <img src={aeratorPic} alt="The Cultivator team beside a paddlewheel aerator on a pond" loading="lazy" decoding="async" className="aspect-[760/625] w-full rounded-[20px] object-cover shadow-[0_8px_24px_rgb(0_0_0/0.18)]" />
            <figcaption className="mt-2 text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>The real thing, with the team that monitors it</figcaption>
          </figure>
        </div>
        <div className="relative mx-auto h-[clamp(140px,30svh,260px)] w-full max-w-[340px] md:mt-32 md:aspect-square md:h-auto md:max-w-none md:w-[min(62vw,380px)]">
          <div data-slot="wheel" className="absolute left-1/2 top-1/2 aspect-square h-[75%] -translate-x-1/2 -translate-y-1/2 md:h-full">
            <span className="absolute -right-2 top-6 hidden rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#231F20] md:block" style={{ fontFamily: MONO, opacity: seg(0.3, 0.42), transform: `translateY(calc(var(--p) * -40px))` }}>O₂ ↑</span>
          </div>
          <figure className="absolute inset-0 flex flex-col items-center md:hidden" style={{ opacity: `calc(${seg(0.48, 0.62)} * (1 - ${seg(0.92, 1)}))`, transform: `translateY(calc((1 - ${seg(0.48, 0.62)}) * 12px))` }}>
            <img src={aeratorPic} alt="The Cultivator team beside a real paddlewheel aerator" loading="lazy" decoding="async" className="min-h-0 w-full flex-1 rounded-[20px] object-cover" />
            <figcaption className="mt-2 text-center text-[10px] uppercase tracking-[0.06em] opacity-75" style={{ fontFamily: MONO }}>The real aerator, with our team</figcaption>
          </figure>
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
        <Eyebrow>21:00 · Beneath the wheel</Eyebrow>
        <H2 className="max-w-[16ch]">Under every wheel, a whole harvest breathes.</H2>
        <p className="mt-4 max-w-[38ch] text-[18px] opacity-90">About 1.8 tonnes of shrimp per pond depend on that one machine never stopping.</p>
      </div>
    </Stage>
  );
}

// 23:00 — fragile ---------------------------------------------------------------------------------
export function FragileScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>23:00 · The night shift</Eyebrow>
        <H2 className="max-w-[14ch]">Shrimp farming is fragile.</H2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] p-7" style={{ ...tint(7), ...rv(0.1) }}>
          <p className="text-[44px] font-bold tracking-[-0.03em] md:text-[56px]">24/7</p>
          <p className="opacity-85">monitoring is required, every night of the crop.</p>
        </div>
        <div className="rounded-[24px] p-7" style={{ ...tint(7), ...rv(0.2) }}>
          <p className="text-[44px] font-bold tracking-[-0.03em] md:text-[56px]">1 failure</p>
          <p className="opacity-85">in a cycle can wipe out the harvest.</p>
        </div>
      </div>
      <p className="mt-12 text-[13px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO, ...rv(0.3) }}>How farmers check today</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4" style={rv(0.35)}><span className="grid h-12 w-12 place-items-center rounded-full" style={tint(10)}><Ear size={20} /></span>Listening for the motor</div>
        <div className="flex items-center gap-4" style={rv(0.42)}><span className="grid h-12 w-12 place-items-center rounded-full" style={tint(10)}><Footprints size={20} /></span>Walking the ponds at night</div>
      </div>
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
          <Eyebrow>02:13 · Pond 07</Eyebrow>
          <H2>The wheel stops.</H2>
          <p className="mt-4 max-w-[32ch] text-[17px] opacity-90" style={{ opacity: `calc(0.9 * ${seg(0.12, 0.25)})` }}>A $300 machine fails in the dark. Nobody hears it.</p>
          <div className="mt-4 md:mt-8" style={{ opacity: seg(0.3, 0.4) }}>
            <Live id="failure" format={(p) => `−$${Math.round(smooth(0.35, 0.92, p) * 10000).toLocaleString('en-US')}`} className="block text-[52px] font-bold tabular-nums tracking-[-0.04em] text-[#FF802E] md:text-[76px]" />
            <p className="text-[15px] opacity-85">of shrimp lost · <Live id="failure" format={clock} className="tabular-nums" style={{ fontFamily: MONO }} /></p>
          </div>
          <p className="mt-4 text-[18px] font-semibold md:mt-8 md:text-[24px]" style={{ opacity: seg(0.86, 0.96), transform: `translateY(calc((1 - ${seg(0.86, 0.96)}) * 20px))` }}>
            Industry-wide: −$1.8 million, every day.
          </p>
        </div>
        <div className="grid gap-3">
          <div data-slot="failure" className="mx-auto aspect-square w-[110px] md:w-[220px]" />
          <div className="hidden rounded-[16px] px-4 pb-2 pt-3 md:block" style={tint(6)}>
            <p className="text-[11px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>Motor hum</p>
            <Waveform ampRef={hum} kind="hum" className="h-12" />
          </div>
          <div className="rounded-[16px] px-4 pb-3 pt-3" style={tint(6)}>
            <p className="text-[11px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>Dissolved oxygen</p>
            <svg viewBox="0 0 300 84" className="mt-1 w-full" fill="none" aria-hidden="true">
              <path d="M0 62 H300" stroke={ORANGE} strokeDasharray="3 5" strokeWidth="1" />
              <text x="296" y="56" textAnchor="end" fontSize="10" fill={ORANGE} style={{ fontFamily: MONO }}>critical</text>
              <path d="M0 16 H95 C150 18 190 54 300 80" stroke="currentColor" strokeWidth="2" pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${seg(0.12, 0.9)})` }} />
            </svg>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// 02:13 — the gap -------------------------------------------------------------------------------
const GAP = 'Industry monitors the water. Who watches the machine that keeps the shrimp alive?'.split(' ');

export function GapScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl items-center px-6 py-24">
      <p className="text-[40px] font-bold leading-[1.04] tracking-[-0.035em] md:text-[76px]">
        {GAP.map((w, i) => (
          <span key={i} style={{ opacity: `clamp(0.12, calc(var(--e) * ${GAP.length * 1.5} - ${i}), 1)`, color: i >= 4 ? ORANGE : undefined }}>
            {w}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}

// 02:14 — Cultivator: turn to the front, clip the device on, detect, alert ---------------------------
const STEPS = [
  ['Turn', 0, 0.28],
  ['Clip on', 0.3, 0.5],
  ['Detect', 0.55, 0.7],
  ['Alert', 0.7, 1],
];

export function DeviceScene() {
  const current = useRef({ amp: 0.6, spike: 0 });
  const vib = useRef({ amp: 0.5, spike: 0 });
  const [fixed, setFixed] = useState(false);
  useProgress('device', (p) => {
    const s = smooth(0.58, 0.66, p) * (1 - smooth(0.8, 0.88, p));
    current.current.spike = s;
    vib.current.spike = s;
    setFixed(p > 0.86);
  });
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div>
          <Eyebrow>02:14 · Cultivator</Eyebrow>
          <H2>Clip it on. It listens for you.</H2>
          <p className="mt-4 hidden max-w-[34ch] text-[17px] opacity-90 md:block">A small sensor that fits any paddlewheel aerator. It reads the motor's current and vibration, and alerts your phone the moment something's wrong.</p>
          <ol className="mt-5 grid grid-cols-4 md:mt-8 gap-2 text-[12px] font-semibold uppercase tracking-[0.06em]" style={{ fontFamily: MONO }}>
            {STEPS.map(([label, a, b], i) => (
              <li key={label} className="border-t-2 pt-2" style={{ borderColor: 'currentColor', opacity: `calc(0.3 + 0.7 * ${seg(a, Math.min(b, a + 0.08))})` }}>
                {i + 1}. {label}
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-semibold md:mt-6">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={tint(10)}><Plug size={14} /> Plug and play</span>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={tint(10)}><Timer size={14} /> ~10 min install</span>
          </div>
          <figure className="mt-6 hidden items-center gap-4 md:flex" style={{ opacity: seg(0.4, 0.5), transform: `translateY(calc((1 - ${seg(0.4, 0.5)}) * 16px))` }}>
            <AsciiImg src={installPic} lqip={LQIP.install} alt="Cultivator sensor being clipped onto a real aerator gearbox" className="h-24 w-24 shrink-0 rounded-full ring-2 ring-[#FF802E]" imgClassName="h-full w-full object-cover" />
            <figcaption className="max-w-[22ch] text-[13px] opacity-85">The real thing: clipped under the motor of a pilot farm's aerator.</figcaption>
          </figure>
        </div>

        <div className="relative">
          <div className="relative" style={{ perspective: '900px' }}>
            <div data-slot="device" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2" />
            <AeratorFront
              className="w-full text-white"
              style={{ transform: `rotateY(calc((1 - ${seg(0.14, 0.28)}) * -90deg))`, opacity: seg(0.13, 0.17) }}
            >
              <DeviceOnMotor
                style={{ transform: `translateY(calc((1 - ${seg(0.3, 0.48)}) * -110px))`, opacity: seg(0.3, 0.36) }}
                calloutStyle={{ opacity: seg(0.46, 0.56) }}
              />
            </AeratorFront>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3" style={{ opacity: seg(0.5, 0.6) }}>
            <div className="rounded-[14px] px-3 pb-1 pt-2" style={tint(6)}>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}><Activity size={12} /> Current</p>
              <Waveform ampRef={current} kind="current" className="h-12" color={ORANGE} />
            </div>
            <div className="rounded-[14px] px-3 pb-1 pt-2" style={tint(6)}>
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}><Waves size={12} /> Vibration</p>
              <Waveform ampRef={vib} kind="vibration" className="h-12" color={ORANGE} />
            </div>
          </div>

          <div
            className="absolute -bottom-3 right-0 z-10 w-[230px] md:-top-8 md:bottom-auto md:left-0 md:right-auto rounded-[20px] bg-white p-4 text-[#231F20] shadow-[0_12px_24px_rgb(0_0_0/0.35)] md:-left-16"
            style={{ opacity: seg(0.68, 0.74), transform: `translateY(calc((1 - ${seg(0.68, 0.78)}) * 40px))` }}
          >
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>
              <BellRing size={12} /> Cultivator · now
            </p>
            <p className="mt-1.5 text-[15px] font-bold">{fixed ? 'Aerator 3 back online' : 'Aerator 3 stopped · Pond 07'}</p>
            <p className="text-[13px] opacity-80">{fixed ? 'Oxygen recovering. Shrimp safe.' : 'Motor current dropped to 0 A at 02:14.'}</p>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// 04:00 — impact ----------------------------------------------------------------------------------
export function ImpactScene() {
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <Eyebrow>04:00 · Impact</Eyebrow>
          <H2>Fewer aerators running. More shrimp harvested.</H2>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              [(p) => `${(smooth(0.1, 0.55, p) * 27.6).toFixed(1)}%`, 'energy saved'],
              [(p) => `${(smooth(0.2, 0.65, p) * 1.8).toFixed(1)} t`, 'more shrimp / crop'],
              [(p) => `$${Math.round(smooth(0.3, 0.72, p) * 10).toLocaleString('en-US')}k`, 'back per harvest'],
            ].map(([fmt, label]) => (
              <div key={label}>
                <Live id="impact" format={fmt} className="block text-[30px] font-bold tabular-nums tracking-[-0.03em] text-[#FF802E] md:text-[44px]" />
                <p className="text-[13px] opacity-80">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={[1, 6, 11].includes(i) ? { opacity: `calc(1 - ${seg(0.15, 0.55)})`, transform: `translateY(calc(${seg(0.15, 0.55)} * 24px)) scale(calc(1 - 0.4 * ${seg(0.15, 0.55)}))` } : undefined}>
              <div className="v2-anim" style={{ animation: `v2bob ${2.4 + (i % 4) * 0.3}s ease-in-out ${-i * 0.37}s infinite` }}>
                <AeratorGlyph className="w-full text-white" />
              </div>
            </div>
          ))}
          <p className="col-span-4 text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>
            12 aerators → 9, same oxygen
          </p>
        </div>
      </div>
    </Stage>
  );
}

// 05:00 — market ------------------------------------------------------------------------------------
const MARKET = [
  ['$7B', 'Global aquaculture aerators'],
  ['$1.6B', 'Shrimp aerators'],
  ['$115M', 'Monitoring in Indonesia, Vietnam, India, Taiwan'],
  ['$3M', '5-year reachable capture'],
];

export function MarketScene() {
  return (
    <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2">
      <div className="relative mx-auto aspect-square w-[min(80vw,440px)]">
        {MARKET.map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-[1.5px] border-[#FF802E]"
            style={{
              inset: `${i * 15}%`,
              background: i === 3 ? ORANGE : 'transparent',
              transform: `scale(clamp(0, calc(var(--e) * 1.6 - ${i * 0.15}), 1))`,
            }}
          />
        ))}
      </div>
      <div>
        <div style={rv()}>
          <Eyebrow>05:00 · Market</Eyebrow>
          <H2>A problem worth solving.</H2>
        </div>
        <dl className="mt-8 grid gap-4">
          {MARKET.map(([v, label], i) => (
            <div key={v} className="flex items-baseline gap-4 border-b border-current/15 pb-3" style={rv(0.1 + i * 0.08, 24)}>
              <dt className="w-[96px] text-[28px] font-bold tracking-[-0.03em] md:text-[34px]" style={{ color: i === 3 ? ORANGE : undefined }}>{v}</dt>
              <dd className="opacity-85">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// 05:30 — proof: sticky country list, cards scroll past ------------------------------------------------
const PROOF = [
  { country: 'Taiwan', people: ['Jason', 'Benny Chung', 'Nicholas', 'Lancore Aquaculture'], note: 'Pilot farms + hardware partner' },
  { country: 'Indonesia', people: ['Bryan', 'JALA tech'], note: '1,000+ potential aerators' },
  { country: 'Malaysia', people: ['Sankina Aquaculture'], note: '1,000+ potential aerators' },
  { country: 'China', people: ['Kevin'], note: 'Field visit + farmer interviews' },
];
const STATS = [['50+', 'farmers interviewed'], ['9', 'signed pilots'], ['3', 'paid pilots'], ['4', 'countries'], ['2', 'company partners']];
const PARTNERS = [
  ['Crustea', crustea],
  ['LanCore System', lancore],
  ['Fubon Insurance', fubon],
  ['Sankina Aquaculture', sankina],
  ['Hult Prize', hult],
  ['NTHU', nthu],
  ['IMBA NTHU', imba],
  ['Pioneer Group', pioneer],
  ['WiseSemi', wisesemi],
  ['Hung Star', hungstar],
];

export function ProofScene() {
  const [active, setActive] = useState(0);
  const cards = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.k))), { rootMargin: '-45% 0px -45% 0px' });
    cards.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>05:30 · Proof from the field</Eyebrow>
          <H2 className="md:text-[52px]">Built with farmers, not for them.</H2>
          <ul className="mt-8 space-y-1">
            {PROOF.map((p, i) => (
              <li key={p.country} className="flex items-center gap-3 text-[26px] font-bold tracking-[-0.02em] md:text-[32px]" style={{ opacity: active === i ? 1 : 0.38, transition: 'opacity 400ms ease' }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF802E]" style={{ transform: `scale(${active === i ? 1 : 0})`, transition: 'transform 400ms cubic-bezier(.16,1,.3,1)' }} />
                {p.country}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative isolate pb-[12svh]">
          {PROOF.map((p, i) => (
            <article
              key={p.country}
              ref={(el) => { cards.current[i] = el; }}
              data-k={i}
              className="sticky mb-8 flex min-h-[min(52svh,420px)] flex-col justify-between gap-16 rounded-[28px] p-7 md:p-8"
              style={{ top: `calc(88px + ${i * 14}px)`, zIndex: i + 1, background: i % 2 ? '#231F20' : '#FFFFFF', color: i % 2 ? '#FFFFFF' : '#231F20', border: '1px solid rgb(138 132 134 / 0.25)' }}
            >
              <p className="text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>{p.note}</p>
              <div>
                <p className="text-[44px] font-bold tracking-[-0.035em] md:text-[64px]">{p.country}</p>
                <p className="mt-2 text-[17px] opacity-85">{p.people.join(' · ')}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-5">
        {STATS.map(([v, l]) => (
          <div key={l}>
            <p className="text-[40px] font-bold tracking-[-0.035em] text-[#FF802E] md:text-[52px]">{v}</p>
            <p className="text-[14px] opacity-80">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>Idea → first sales in 2 months</p>

      <div className="mt-16 overflow-hidden border-y border-current/15 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="v2-anim flex w-max items-center gap-14" style={{ animation: 'v2marquee 36s linear infinite' }}>
          {[...PARTNERS, ...PARTNERS].map(([name, src], i) => (
            <img key={i} src={src} alt={i < PARTNERS.length ? name : ''} loading="lazy" className="h-9 w-auto max-w-[140px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-11" />
          ))}
        </div>
      </div>
    </div>
  );
}

// 05:45 — business model ------------------------------------------------------------------------
export function ModelScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>05:45 · Business model</Eyebrow>
        <H2>Hardware once. Software every year.</H2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          ['Hardware', '~$100', 'Cultivator device per aerator · 40% margin'],
          ['Software', '$120 / yr', 'Monitoring, alerts and history per aerator'],
        ].map(([k, v, d], i) => (
          <div key={k} className="rounded-[28px] p-8" style={{ ...rv(0.1 + i * 0.1), background: i ? ORANGE : '#231F20', color: i ? '#231F20' : '#FFFFFF' }}>
            <p className="text-[12px] uppercase tracking-[0.08em] opacity-80" style={{ fontFamily: MONO }}>{k}</p>
            <p className="mt-6 text-[52px] font-bold tracking-[-0.04em] md:text-[72px]">{v}</p>
            <p className="mt-2 opacity-90">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[15px] opacity-80" style={rv(0.3)}>Year 1: 90 ponds from 9 signed pilots → $58,500 revenue, $27,000 gross profit.</p>
    </div>
  );
}

// 06:00 — team ------------------------------------------------------------------------------------
const TEAM = [
  ['Frans', 'CEO', 'Product · Strategy', fransPic, LQIP.frans],
  ['Jason', 'COO', 'AI systems · Data', jasonPic, LQIP.jason],
  ['Daniel', 'CMO', 'Marketing · Growth', danielPic, LQIP.daniel],
  ['Jai-Jai', 'CTO', 'Hardware design', jaiPic, LQIP.jai],
];

const ADVISORS = [
  ['Jenny Ou', 'Managing Director, Sankina Aquaculture'],
  ['Bagas Pramana Putra Fadhila', 'Tech lead, Sinarmas'],
  ['Prof. Yu Wei Hsu', 'IMBA, NTHU · Business development'],
];

export function TeamScene() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-24">
      <div style={rv()}>
        <Eyebrow>06:00 · Dawn</Eyebrow>
        <H2>The team on the night shift.</H2>
        <p className="mt-4 opacity-90">12+ years of engineering across Kaikutek, Liteon and Logitech.</p>
      </div>
      <div className="mt-8 overflow-hidden rounded-[28px]" style={rv(0.05, 40)}>
        <AsciiImg src={teamPond} lqip={LQIP.teamPond} alt="The Cultivator team at a pond" className="aspect-[16/7] w-full" imgClassName="h-full w-full object-cover" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {TEAM.map(([n, r, f, pic, lq], i) => (
          <div key={n} className="group rounded-[24px] bg-[#231F20] p-5 text-white transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]" style={rv(0.08 * i, 40)}>
            <div className="mb-8 grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-[#FF802E] text-[18px] font-bold text-[#231F20] transition-transform duration-500 group-hover:scale-110">
              <AsciiImg src={pic} lqip={lq} alt={n} className="h-full w-full" imgClassName="h-full w-full object-cover" />
            </div>
            <p className="text-[20px] font-bold">{n}</p>
            <p className="text-[13px] opacity-80">{r} · {f}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO, ...rv(0.3) }}>Advisors</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {ADVISORS.map(([n, r], i) => (
          <div key={n} className="rounded-[20px] p-4" style={{ ...tint(10), ...rv(0.35 + i * 0.06, 24) }}>
            <p className="font-bold">{n}</p>
            <p className="text-[13px] opacity-85">{r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 06:00 — the ask -----------------------------------------------------------------------------------
const SPLIT = [
  ['R&D + product', 35],
  ['Operations', 30],
  ['Manufacturing', 20],
  ['Sales + marketing', 15],
];

export function AskScene() {
  return (
    <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-[1.5fr_1fr]">
      <div>
      <div style={rv()}>
        <Eyebrow>06:00 · The ask</Eyebrow>
        <H2 className="md:text-[88px]">Deploying $1M.</H2>
        <p className="mt-4 max-w-[40ch] text-[18px] opacity-90">To take Cultivator from 9 signed pilots to a first batch of 500–1,000 units across Southeast Asia.</p>
      </div>
      <div className="mt-10 flex h-12 w-full origin-left overflow-hidden rounded-full md:h-16" style={{ transform: `scaleX(clamp(0, calc(var(--e) * 1.5 - 0.3), 1))` }}>
        {SPLIT.map(([l, v], i) => (
          <div key={l} className="flex shrink-0 items-center justify-center px-1 text-[12px] font-semibold tabular-nums md:px-3 md:text-[13px]" style={{ width: `${v}%`, background: ['#231F20', '#3A3536', '#FFFFFF', '#FFE6D6'][i], color: i < 2 ? '#FFFFFF' : '#231F20' }}>
            <span className="whitespace-nowrap">{v}%</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] opacity-90 md:grid-cols-4">
        {SPLIT.map(([l, v]) => <p key={l}>{v}% · {l}</p>)}
      </div>
      <div className="mt-12 flex flex-wrap gap-3" style={rv(0.3)}>
        <a href={PITCH_DECK} download="Cultivator-Pitch-Deck.pdf" className="inline-flex h-14 items-center rounded-full bg-[#231F20] px-7 text-[16px] font-semibold text-white transition-transform hover:scale-[1.03]">Download the deck</a>
        <a href={CONTACT.conversation} className="inline-flex h-14 items-center rounded-full px-7 text-[16px] font-semibold transition-transform hover:scale-[1.03]" style={tint(12)}>Book a call</a>
      </div>
      <address id="contact" className="mt-10 border-t border-[#231F20]/20 pt-6 not-italic">
        <h3 className="text-[12px] uppercase tracking-[0.08em] opacity-75" style={{ fontFamily: MONO }}>Let’s connect</h3>
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
  );
}
