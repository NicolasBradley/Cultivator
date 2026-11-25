import { useEffect, useRef } from 'react';
import { SHRIMP_CENTER, SHRIMP_PARTS, SHRIMP_VIEWBOX } from './shrimpParts';

/*
 * Animated Cultivator shrimp mark (canvas, no libraries).
 * Loops through three looks, after the reference video (5.8s):
 *   ASCII glyph grid -> smooth staggered sweep with motion blur -> pixel grid with scanlines -> ASCII
 * Pauses off-screen. With prefers-reduced-motion it draws the static mark.
 */

const LOOP = 5.8;
// Phase boundaries (seconds)
const SMOOTH_IN = 0.5; // ASCII -> smooth
const SMOOTH_OUT = 2.3; // smooth -> pixel
const PIXEL_OUT = 4.0; // pixel -> ASCII
const XFADE = 0.28;

const SWEEP_DUR = 0.95;
const SWEEP_STAGGER = 0.07;
const SWEEP_ANGLE = -0.75; // radians the parts start rotated by
const TRAIL = 7; // motion-blur copies

const ASCII_CELLS = 56;
const PIXEL_CELLS = 34;
const GLYPHS_LOW = ['.', ':', '-'];
const GLYPHS_MID = ['/', '>', '+', '~'];
const GLYPHS_HIGH = ['0', '1', '0', '1', '#'];

const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Small deterministic hash so glyph flicker is stable per cell/tick.
const hash = (a, b) => {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const paths = SHRIMP_PARTS.map((p) => ({ id: p.id, path: new Path2D(p.d) }));
const [VX, VY, VW, VH] = SHRIMP_VIEWBOX;

// Coverage grid (0..1 per cell) of the whole mark, cached per resolution.
const coverageCache = new Map();
function getCoverage(n) {
  if (coverageCache.has(n)) return coverageCache.get(n);
  const SS = 4; // supersample for accurate coverage
  const c = document.createElement('canvas');
  c.width = c.height = n * SS;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.scale((n * SS) / VW, (n * SS) / VH);
  ctx.translate(-VX, -VY);
  ctx.fillStyle = '#fff';
  paths.forEach(({ path }) => ctx.fill(path, 'evenodd'));
  const data = ctx.getImageData(0, 0, n * SS, n * SS).data;
  const cov = new Float32Array(n * n);
  for (let y = 0; y < n * SS; y++) {
    for (let x = 0; x < n * SS; x++) {
      cov[((y / SS) | 0) * n + ((x / SS) | 0)] += data[(y * n * SS + x) * 4 + 3] / 255;
    }
  }
  for (let i = 0; i < cov.length; i++) cov[i] /= SS * SS;
  coverageCache.set(n, cov);
  return cov;
}

function drawSmooth(ctx, t, alpha, color) {
  // t: seconds since the smooth phase started
  const [cx, cy] = SHRIMP_CENTER;
  ctx.fillStyle = color;
  paths.forEach(({ path }, i) => {
    const local = t - i * SWEEP_STAGGER;
    if (local <= 0) return;
    const angleAt = (lt) => SWEEP_ANGLE * (1 - easeOutExpo(clamp01(lt / SWEEP_DUR)));
    const appear = smoothstep(0, 0.18, local);
    for (let k = TRAIL; k >= 0; k--) {
      const lt = local - k * 0.022;
      if (lt <= 0) continue;
      const a = angleAt(lt);
      const scale = 0.82 + 0.18 * easeOutExpo(clamp01(lt / SWEEP_DUR));
      ctx.save();
      ctx.globalAlpha = alpha * appear * (k === 0 ? 1 : 0.22 * (1 - k / (TRAIL + 1)));
      ctx.translate(cx, cy);
      ctx.rotate(a);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.fill(path, 'evenodd');
      ctx.restore();
    }
  });
}

function drawPixels(ctx, n, t, alpha, color) {
  const cov = getCoverage(n);
  const cw = VW / n;
  ctx.fillStyle = color;
  for (let y = 0; y < n; y++) {
    // Horizontal streak: rows drift sideways, settling over time, with a moving scan band.
    const band = Math.abs(y / n - ((t * 0.55) % 1.2) + 0.1);
    const drift = band < 0.08 ? (0.08 - band) * 60 : 0;
    for (let x = 0; x < n; x++) {
      const c = cov[y * n + x];
      if (c < 0.5) continue;
      const px = VX + x * cw + drift * cw * 0.25;
      const py = VY + y * cw;
      ctx.globalAlpha = alpha * (0.55 + 0.45 * c);
      // Two scanlines per cell
      ctx.fillRect(px, py + cw * 0.08, cw * 0.92, cw * 0.36);
      ctx.fillRect(px, py + cw * 0.52, cw * 0.92, cw * 0.36);
      if (drift > 0.5) {
        ctx.globalAlpha = alpha * 0.25;
        ctx.fillRect(px - cw * drift * 0.4, py + cw * 0.3, cw * drift * 0.4, cw * 0.28);
      }
    }
  }
  ctx.globalAlpha = 1;
}

function drawAscii(ctx, n, t, alpha, color) {
  const cov = getCoverage(n);
  const cw = VW / n;
  ctx.fillStyle = color;
  ctx.font = `600 ${cw * 1.15}px ui-monospace, "JetBrains Mono", Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const tick = Math.floor(t / 0.11);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const c = cov[y * n + x];
      if (c < 0.42) continue;
      const r = hash(x * 31 + tick, y * 17 + (tick >> 1));
      const set = c > 0.75 ? GLYPHS_HIGH : c > 0.4 ? GLYPHS_MID : GLYPHS_LOW;
      ctx.globalAlpha = alpha * (0.45 + 0.55 * c) * (r > 0.93 ? 0.35 : 1);
      ctx.fillText(set[(r * set.length) | 0], VX + (x + 0.5) * cw, VY + (y + 0.55) * cw);
    }
  }
  ctx.globalAlpha = 1;
}

function drawFrame(ctx, time, color) {
  const t = ((time % LOOP) + LOOP) % LOOP;

  // Smooth: fades in over XFADE at SMOOTH_IN, out over XFADE ending SMOOTH_OUT + XFADE
  const smoothA = smoothstep(SMOOTH_IN, SMOOTH_IN + XFADE, t) * (1 - smoothstep(SMOOTH_OUT, SMOOTH_OUT + XFADE, t));
  const pixelA = smoothstep(SMOOTH_OUT, SMOOTH_OUT + XFADE, t) * (1 - smoothstep(PIXEL_OUT, PIXEL_OUT + XFADE * 0.6, t));
  const asciiA = Math.max(1 - smoothstep(SMOOTH_IN - 0.05, SMOOTH_IN + XFADE * 0.6, t), smoothstep(PIXEL_OUT, PIXEL_OUT + XFADE * 0.6, t));

  if (asciiA > 0.01) drawAscii(ctx, ASCII_CELLS, t, asciiA, color);
  if (pixelA > 0.01) {
    // Resolve from coarse to fine as the pixel phase starts (like the video's depixelate).
    const res = t < SMOOTH_OUT + 0.4 ? Math.round(12 + (PIXEL_CELLS - 12) * smoothstep(SMOOTH_OUT, SMOOTH_OUT + 0.4, t)) : PIXEL_CELLS;
    drawPixels(ctx, res, t - SMOOTH_OUT, pixelA, color);
  }
  if (smoothA > 0.01) drawSmooth(ctx, t - SMOOTH_IN + 0.05, smoothA, color);
}

export default function ShrimpMark({ color = '#FFFFFF', className = '', label = 'Cultivator shrimp logo' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let pausedAt = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    };

    const render = (seconds) => {
      const s = Math.min(canvas.width / VW, canvas.height / VH);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(s, 0, 0, s, (canvas.width - VW * s) / 2 - VX * s, (canvas.height - VH * s) / 2 - VY * s);
      if (reduce.matches) {
        ctx.fillStyle = color;
        paths.forEach(({ path }) => ctx.fill(path, 'evenodd'));
      } else {
        drawFrame(ctx, seconds, color);
      }
    };

    const loop = (now) => {
      render((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (raf || reduce.matches || !visible) return;
      start = performance.now() - pausedAt * 1000;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      pausedAt = (performance.now() - start) / 1000;
    };

    setup();
    render(0);

    const ro = new ResizeObserver(() => {
      setup();
      render(raf ? (performance.now() - start) / 1000 : pausedAt);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    const onMotionChange = () => {
      pause();
      render(pausedAt);
      play();
    };
    reduce.addEventListener('change', onMotionChange);
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      reduce.removeEventListener('change', onMotionChange);
    };
  }, [color]);

  return <canvas ref={canvasRef} role="img" aria-label={label} className={`block h-full w-full ${className}`} />;
}
