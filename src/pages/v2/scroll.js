import { useEffect, useLayoutEffect, useRef } from 'react';

// Scroll engine for /v2.
// One rAF-throttled scroll loop writes two CSS variables on every <section data-scene>:
//   --e  enter progress: 0 when the section's top hits the bottom of the screen, 1 when it reaches the top.
//   --p  scene progress: 0..1. Timed scenes (data-play) play it on a timer once in view; a tall (sticky) section
//        follows scroll while pinned; for other 1-screen sections it equals --e.
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

// Timed scenes: <section data-play="seconds">. Their --p does not follow scrolling. It plays 0 to 1 once, over that
// many seconds, starting when the scene comes into view, and then stays at 1. So nobody has to scroll to finish an
// animation, and scrolling is never locked. A scene can mark the part that should be on screen before it starts
// with data-play-target (on phones the animated drawing can sit below the text).
const plays = new WeakMap();

function timedProgress(el, vh, now, reduce) {
  let st = plays.get(el);
  if (!st) {
    st = { p: 0, t0: 0 };
    plays.set(el, st);
  }
  if (!st.t0) {
    const target = el.querySelector('[data-play-target]');
    const r = (target ?? el).getBoundingClientRect();
    if (r.top < vh * (target ? 0.7 : 0.45) && r.bottom > vh * 0.35) st.t0 = now;
  }
  if (st.t0 && st.p < 1) st.p = reduce ? 1 : clamp01((now - st.t0) / (Number(el.dataset.play) * 1000));
  return st;
}

export function useScrollEngine() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const now = performance.now();
      const vh = viewportHeight();
      let playing = false;
      document.querySelectorAll('section[data-scene]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const e = clamp01((vh - r.top) / vh);
        let p;
        if (el.dataset.play) {
          const st = timedProgress(el, vh, now, reduce);
          p = st.p;
          if (st.t0 && p < 1) playing = true;
        } else {
          const stageHeight = el.querySelector('[data-stage]')?.offsetHeight || vh;
          const extra = Math.max(0, stageHeight - vh);
          const travel = r.height - stageHeight;
          p = travel > vh * 0.05 ? clamp01((-r.top - extra) / travel) : e;
        }
        el.style.setProperty('--e', e.toFixed(4));
        el.style.setProperty('--p', p.toFixed(4));
        subs.get(el.id)?.forEach((cb) => cb(p, e));
      });
      // Keep ticking while a timed scene is playing.
      if (playing && !raf) raf = requestAnimationFrame(update);
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
