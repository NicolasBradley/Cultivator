import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { pondLayout } from './pondLayout';

const between = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const coords = (p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
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

export default function FarmPonds({ reduced }) {
  const ref = useRef(null);
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
  const ponds = useMemo(() => pondLayout(size.width, size.height).map((pond) => ({ ...pond, path: bankPath(pond.points) })), [size]);
  return <div ref={ref} className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-svh text-[#FF802E]" aria-hidden="true">
    {size.width > 0 && <svg viewBox={`0 0 ${size.width} ${size.height}`} className="h-full w-full overflow-hidden">
      <defs>{ponds.map((pond) => <clipPath id={`farm-parcel-${pond.id}`} key={pond.id}><path d={pond.path} /></clipPath>)}</defs>
      {ponds.map((pond, index) => <g key={pond.id} data-farm-pond>
        <path d={pond.path} fill="currentColor" fillOpacity={index % 3 === 0 ? '0.045' : '0.025'} />
        <g clipPath={`url(#farm-parcel-${pond.id})`}>
          {[0.2, 0.4, 0.6, 0.8].map((fraction, line) => {
            const left = between(pond.topLeft, pond.bottomLeft, fraction);
            const right = between(pond.topRight, pond.bottomRight, fraction);
            const a = wavePath(left, right, 1);
            const b = wavePath(left, right, -1);
            return <path key={line} d={a} fill="none" stroke="currentColor" strokeOpacity="0.27" strokeWidth="0.85" strokeLinecap="round">
              {!reduced && <animate attributeName="d" values={`${a};${b};${a}`} dur={`${6 + index % 4 + line * 0.45}s`} begin={`${-line * 1.2 - index}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />}
            </path>;
          })}
        </g>
        <path d={pond.path} fill="none" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1" strokeLinejoin="round" />
      </g>)}
    </svg>}
  </div>;
}
