import ShrimpMark from '../components/ShrimpMark';
import shrimpSvg from '../assets/cultivator-shrimp.svg';

const MONO = 'ui-monospace, "JetBrains Mono", Menlo, monospace';

function LogoCard() {
  return (
    <div
      className="relative flex aspect-[3/4] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-[24px] p-6"
      style={{ background: '#FF7827', color: '#231F20' }}
    >
      <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em]" style={{ fontFamily: MONO }}>
        <img src={shrimpSvg} alt="" className="h-4 w-4" style={{ filter: 'brightness(0)' }} />
        Cultivator
      </div>
      <div className="mx-auto aspect-square w-[82%]">
        <ShrimpMark />
      </div>
      <p className="text-[11px] leading-relaxed" style={{ fontFamily: MONO }}>
        Every aerator, connected to your phone.
        <br />
        Farmers act before the harvest is lost.
      </p>
    </div>
  );
}

function AppIcon({ size = 56 }) {
  return (
    <div
      className="grid place-items-center rounded-[22%] shadow-[0_4px_12px_rgb(0_0_0/0.12)]"
      style={{ width: size, height: size, background: '#FF7827' }}
    >
      <img src={shrimpSvg} alt="" style={{ width: size * 0.7, filter: 'brightness(0) invert(1)' }} />
    </div>
  );
}

function PhoneSketch() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#F6F3F1]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" fill="none" stroke="#231F20" strokeOpacity="0.35" strokeWidth="1.5">
        <rect x="70" y="40" width="380" height="420" rx="56" transform="rotate(-28 260 250)" />
        <rect x="84" y="54" width="352" height="392" rx="44" transform="rotate(-28 260 250)" />
        <rect x="220" y="62" width="70" height="20" rx="10" transform="rotate(-28 260 250)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={150 + i * 90} y="140" width="64" height="64" rx="16" transform="rotate(-28 260 250)" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={`b${i}`} x={150 + i * 90} y="230" width="64" height="64" rx="16" transform="rotate(-28 260 250)" />
        ))}
      </svg>
      <div className="absolute left-[38%] top-[42%] -translate-x-1/2 -translate-y-1/2 -rotate-[28deg]">
        <AppIcon size={64} />
      </div>
    </div>
  );
}

function BrowserSketch() {
  return (
    <div className="overflow-hidden rounded-[24px] bg-[#F6F3F1] p-4">
      <div className="rounded-[12px] border border-[#231F20]/15 bg-white">
        <div className="flex items-center gap-3 border-b border-[#231F20]/10 px-3 py-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#231F20]/15" />
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-t-[8px] bg-[#F6F3F1] px-3 py-1 text-sm text-[#231F20]">
            <AppIcon size={18} />
            cultivator
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-[#231F20]/40">
          <span>←</span>
          <span>→</span>
          <span>↻</span>
          <div className="flex-1 rounded-full bg-[#F6F3F1] px-3 py-1 text-xs">cultivator.vercel.app</div>
        </div>
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-[#231F20]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.06em] text-[#7A7374]" style={{ fontFamily: MONO }}>
          Brand lab
        </p>
        <h1 className="mb-10 text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          The <span style={{ color: '#FF7827' }}>shrimp</span>, in motion.
        </h1>
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,420px)_1fr]">
          <LogoCard />
          <div className="grid gap-6">
            <PhoneSketch />
            <BrowserSketch />
          </div>
        </div>
      </div>
    </main>
  );
}
