import { useEffect, useLayoutEffect, useRef } from 'react';

// Scroll engine for /v2.
// One rAF-throttled scroll loop writes two CSS variables on every <section data-scene>:
//   --e  enter progress: 0 when the section's top hits the bottom of the screen, 1 when it reaches the top.
//   --p  pin progress:   0..1 while a tall (sticky) section is pinned; for 1-screen sections it equals --e.
// CSS reads them with calc() (cheap, no React renders). JS effects subscribe with useProgress(id, fn).

const subs = new Map();

export function useProgress(id, fn) {
  const ref = useRef(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  useEffect(() => {
    const set = subs.get(id) ?? new Set();
    const cb = (p, e) => ref.current(p, e);
    set.add(cb);
    subs.set(id, set);
    return () => set.delete(cb);
  }, [id]);
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Match CSS svh rather than the address-bar-dependent window.innerHeight.
export const viewportHeight = () => document.querySelector('[data-slot="hero"]')?.closest('.sticky')?.clientHeight || window.innerHeight;

// Tall phone scenes scroll fully into view before their bottom edge pins.
export function useStageSizing() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const stage = ref.current;
    const section = stage.closest('[data-scene]');
    const measure = () => section.style.setProperty('--stage-extra', `${Math.max(0, stage.offsetHeight - viewportHeight())}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  return ref;
}

export function useScrollEngine() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = viewportHeight();
      document.querySelectorAll('section[data-scene]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const e = clamp01((vh - r.top) / vh);
        const stageHeight = el.querySelector('[data-stage]')?.offsetHeight || vh;
        const extra = Math.max(0, stageHeight - vh);
        const travel = r.height - stageHeight;
        const p = travel > vh * 0.05 ? clamp01((-r.top - extra) / travel) : e;
        el.style.setProperty('--e', e.toFixed(4));
        el.style.setProperty('--p', p.toFixed(4));
        subs.get(el.id)?.forEach((cb) => cb(p, e));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

export const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Length of the first-visit intro screen (shrimp curl + wordmark roll), ms.
export const INTRO_MS = 3100;
