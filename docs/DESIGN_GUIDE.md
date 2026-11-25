# Cultivator Design Guide

Status: reference. Built so far: §7 shrimp animation (`src/components/ShrimpMark.jsx`, demo at `/brand`). Traced vector mark: `src/assets/cultivator-shrimp.svg`.

References:
- Logo files (orange mark, white wordmark on orange, white wordmark on ink)
- fastwork.com/selling (measured from the live page, Nov 2026)
- Logo animation video (5.8 s loop, 1600×1200, 30 fps)

---

## 0. Who we are and what we stand for

### 0.1 Company

Cultivator is an **agriculture technology company for shrimp farming**. We help shrimp farmers reduce the chance of losing their shrimp to **aerator failure**.

The problem in one chain: aerator stops (often at night) → dissolved oxygen drops → shrimp suffocate within hours → a whole pond's harvest can be lost before anyone notices.

Our answer: a sensor on each aerator watches electrical current and vibration, spots failure early, and alerts the farmer's phone so they can fix it before the shrimp die.

**Tagline:** Cultivate Trust. Empower Farmers.
**Hero title:** A smart aeration system for 3.5 million smallholder farmers. (Both are from the pitch deck; updated Nov 2026.)
**Supporting line** (formerly the hero, reusable): Know the moment an aerator fails, before your shrimp do.

Design implications:
- **Lead with the farmer's outcome** (healthy shrimp, protected harvest), then the device. The sensor is the means, not the hero.
- **Night and urgency are real**, but don't sell fear. Show the loss once (problem section), then spend the rest of the page on control and calm.
- **Audience is two-sided:** farmers (plain language, phone-first, multilingual) and investors/partners (numbers, traction). Farmer-facing pages win any conflict.
- **Never show dead shrimp.** Show the risk with data (oxygen curve dropping, an alert), not imagery.

### 0.2 Brand values

Every design call below should push at least one of these. If a choice serves none, cut it.

| Value | What it means for Cultivator | Visual | Motion | Copy |
|---|---|---|---|---|
| **Empowering** | The farmer is in control; we give them the signal, they make the call | Farmer at the centre of photos, not the device. Big, confident headlines. Primary CTA always visible | Things rise *up* into place (blur-rise), never drop in | Second person, active verbs: "See every aerator", "Act before the loss" |
| **Shrimp** | The animal and the pond are why this exists | The shrimp mark is the hero graphic, not a corner logo. Real pond photos, water textures | The shrimp animates (§7); shell segments sweep like a tail flick | Name the shrimp and the harvest, not "assets" or "yield units" |
| **Farmers** | Built with and for working farmers, not lab users | Field photos (farm visits, build sessions already in `src/assets`). Warm neutrals, no cold corporate blue-grey | Calm, readable. No motion that blocks reading on a phone in sunlight | Plain words, short sentences. Works when translated (ID, TH, VI, ZH) |
| **Connection** | Sensor → app → farmer → team; ponds connected to each other | Thin ink connector lines between cards; phone + browser shown together (§7 card) | Staggered sequences that read as one chain (60–70 ms stagger) | "Your ponds, your phone, one view" |
| **Innovation** | IoT, anomaly detection, new for the industry | The ASCII and pixel states of the shrimp mark, mono labels, data readouts | Morphing states, scanlines, glyph flicker. Use only in brand moments, not in UI | Concrete tech claims with numbers, no buzzwords |
| **Reliability** | It works every night, so nothing dies at 3 a.m. | Ink dark sections, consistent 12/16/24 px radii, steady grid. Status green only for real status | Same easing and durations everywhere (§6). Nothing bouncy except tiny pops | Evidence: uptime, alerts sent, pilot results. State limits honestly |

Balance rule: **innovation shows in the brand moments, reliability shows everywhere else.** The animated shrimp is allowed to be playful; forms, dashboards and data must feel steady.

---

## 1. Brand colours

Sampled from the logo files.

| Token | Hex | Use |
|---|---|---|
| `--c-orange` | `#FF802E` | Primary on the website (logo orange `#FF7827`, brightened slightly for screens). Logo files keep `#FF7827` |
| `--c-ink` | `#231F20` | Dark sections, primary button on light bg, body text on light |
| `--c-white` | `#FFFFFF` | Light bg, text on orange / ink |

Supporting neutrals (derived, keep warm to match the ink):

| Token | Hex | Use |
|---|---|---|
| `--c-ink-2` | `#2E2A2B` | Cards on dark sections |
| `--c-text` | `#3A3536` | Body text on white |
| `--c-muted` | `#7A7374` | Captions, secondary text |
| `--c-surface` | `#F6F3F1` | Secondary button, light card bg (fastwork's `#EFF2F7`, warmed) |
| `--c-line` | `#E8E2DE` | Borders, dividers |
| `--c-orange-soft` | `#FFE6D6` | Orange tints, chips, hover bg |
| `--c-orange-deep` | `#E5631A` | Orange pressed / hover |

Rules:
- Orange is an accent, not a background for long text. Full-orange blocks only for brand moments (hero card, logo animation card, footer CTA).
- White wordmark only on orange or ink. Orange mark on white or ink.
- Contrast: white on `#FF7827` is ~2.6:1, which fails WCAG AA even for large text (needs 3:1). Use white on orange only for the logo and big display headlines treated as brand graphics. Readable text on orange uses ink (`#231F20` on orange ≈ 6.3:1). `--c-orange-deep` with white is ~3.4:1, so it passes only for large text (≥24px, or ≥19px bold). Normal-size button labels on orange should be ink.

---

## 2. Typography

Fastwork uses Google Sans, 500 weight headings, letter-spacing about −0.02em. Our wordmark is a heavy geometric rounded sans, so pick a face close to it.

- Headings: geometric sans, 600–700 weight (suggest **Outfit** or **Plus Jakarta Sans**, both on Google Fonts and close to the wordmark).
- Body: same family at 400, or **Inter**.
- Mono (for the ASCII logo state and small labels like the video's "ANOTHER AI THING" tag): **JetBrains Mono** or **IBM Plex Mono**.

| Role | Size (desktop / mobile) | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display / H1 | 56 / 38 px | 700 | −0.03em | 1.05 |
| H2 | 44 / 32 px | 700 | −0.02em | 1.1 |
| H3 | 24 / 20 px | 600 | −0.01em | 1.25 |
| Body | 17 / 16 px | 400 | 0 | 1.55 |
| Small / caption | 14 px | 500 | 0 | 1.4 |
| Mono label | 12 px | 500 | +0.06em, uppercase | 1.2 |

Highlight word: like fastwork, one word per heading can carry the accent (orange, or an orange→`#FFB27A` gradient that sweeps, see §6).

---

## 3. Shape, spacing, depth

Fastwork tokens, adopted as-is:

| Token | Value | Use |
|---|---|---|
| `--r-inner` | 6px | Chips inside cards, small images |
| `--r-element` | 12px | Inputs, small cards (most common) |
| `--r-container` | 16px | Standard cards |
| `--r-card-lg` | 24–28px | Feature cards, profile/showcase cards |
| `--r-page` | 42px | Big section panels (the dark section that rounds into the page) |
| `--r-full` | 9999px | Buttons, nav pill, avatars |

Spacing: 4px base. Section padding 96–128px desktop, 64px mobile.

Shadows (fastwork's three levels):
```css
--shadow-low:  0 2px 4px rgb(0 0 0 / .05), 0 4px 8px  rgb(0 0 0 / .10);
--shadow-med:  0 2px 4px rgb(0 0 0 / .05), 0 4px 12px rgb(0 0 0 / .10);
--shadow-high: 0 4px 6px rgb(0 0 0 / .10), 0 12px 24px rgb(0 0 0 / .15);
```
On dark sections add a 1px inner hairline: `inset 0 0 0 1px rgb(255 255 255 / .08)`.

---

## 3b. Brand pattern: water contours

Approved Nov 2026. Hairline water-flow lines, drawn in code (SVG or canvas), never traced from photos. No dots, no fills.

**Settings (all variants):** 11 lines per tile · 1.25px stroke · wave height 4.5 · drift speed 2 · round caps/joins.

| Variant | Colours | Use |
|---|---|---|
| **1 · Current** | Orange lines on white | Light sections, section dividers |
| **4 · Night current** | Orange lines on ink, 85% opacity | Night and failure scenes |
| **5 · Converging** | White lines on orange, 90% opacity; lines pulled toward the centre | Orange brand moments: hero card, dawn, logo loader |

Line formula (tile `w × h`, line `i` of `n`, time `t`):
```js
const y0 = (i + 0.5) * h / n;
// 1 and 4
y = y0 + A * Math.sin(x / 34 + i * 0.55 + t * 0.6) + A * 0.6 * Math.sin(x / 15 + i * 1.3 - t * 0.42);
// 5: converging
const k = Math.exp(-(((x - w / 2) / 65) ** 2));
y = y0 + (h / 2 - y0) * 0.45 * k + A * Math.sin(x / 30 + i * 0.4 + t * 0.6);
// A = 4.5, t advances at drift speed 2 (seconds × 2)
```

Behaviour:
- Lines drift continuously while aerators are "on".
- **Failure (02:13):** variants 1 and 4 ease to a stop over ~0.4 s and turn grey `#8A8486`. Variant 5 is never used in the failure scene.
- **Recovery:** lines return to orange and drift resumes.
- `prefers-reduced-motion`: static lines, no drift.
- Pause the animation off-screen.

---

## 4. Components

**Buttons** (pill, 48px tall, radius full, padding 0 22px, weight 600)
- Primary on light: ink bg, white text. Hover: `--c-orange`.
- Brand: orange bg, ink text (white text fails contrast at button size).
- Secondary: `--c-surface` bg, `--c-text` text.
- Press: `scale(.97)` over 125ms.

**Nav**: floating pill, centred, `backdrop-filter: blur(20px)`, bg `rgb(255 255 255 / .10)` on dark / `.72` on light. Same as fastwork's top nav.

**Cards**: white, radius 16–28px, `--shadow-low`, hover lifts 4px to `--shadow-med`.

**Sticky notes** (dark section, like fastwork's pain-notes): small cards with `rotate(var(--note-rotate))` between −4° and 4°, they "stick" in with scale + rotate.

---

## 5. Page structure (adapted from fastwork /selling)

1. **Hero (light)**: big headline with one orange word, CTA pill, collage of floating cards around a ring (fastwork's orbit). For us: shrimp-pond photo cards, sensor readouts, a phone with the app. Cards float with a slow 8px bob.
2. **Sticky showcase**: left column is a sticky list (e.g. *Water quality · Aerators · Feeding · Alerts · Yield*). As you scroll, the right card swaps (`profile-fade`: fade + 12px rise). Fastwork does this with a sticky container, not a scroll library.
3. **Dark section** (`--c-ink`, radius 42px top corners): problems as tilted sticky notes (*Massive loss*, *Silent fail*, *Fragile ops*, already in `src/assets`).
4. **Logo animation card**: orange card with the shrimp mark cycling states (§7), beside a line-drawn phone and browser tab showing the app icon.
5. **Proof / partners**: two marquees going opposite directions (fastwork's cred-marquee).
6. **CTA + footer**.

---

## 6. Motion: how fastwork does it

Main finding: **no animation library and no smooth-scroll library.** No GSAP, no Lenis, no scroll-timeline. It is plain CSS keyframes + transitions, triggered by adding classes (Svelte + IntersectionObserver), with `scroll-behavior: smooth` on `html` and `position: sticky` for the scroll sections. What makes it feel smooth is the easing and the consistent timing scale.

### 6.1 Easing

| Token | Curve | Where fastwork uses it |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(.16, 1, .3, 1)` | Most used (36×). Entrances, cards in, copy in |
| `--ease-out-quint` | `cubic-bezier(.22, 1, .36, 1)` | 2nd most used (30×). Card rise, hovers |
| `--ease-standard` | `cubic-bezier(.24, 1, .4, 1)` | Design-system token: dialogs, drawers, tooltips |
| `--ease-drawer` | `cubic-bezier(.32, .72, 0, 1)` | Panel slides (iOS sheet feel) |
| `--ease-in-out` | `cubic-bezier(.4, 0, .2, 1)` | SVG stroke draws, exits |
| `--ease-spring` | `cubic-bezier(.22, 1.6, .36, 1)` | Overshoot pop (only in one keyframe step) |

All the main curves are strong ease-outs: fast start, long soft landing. That is the "smooth" feel. Almost nothing uses plain `ease`.

### 6.2 Duration scale

```css
--d-fast-min: 95ms;   --d-fast: 125ms;  --d-fast-max: 165ms;   /* hover, press, tooltip */
--d-med-min: 225ms;   --d-med: 300ms;   --d-med-max: 400ms;    /* dialogs, drawers, card in */
--d-slow-min: 525ms;  --d-slow: 700ms;  --d-slow-max: 935ms;   /* hero copy, SVG draws */
```
Hero choreography goes longer: cards fly out of the ring over 1.7s, copy starts at 1.14s delay.

### 6.3 Recurring patterns (copy these)

| Pattern | Keyframes | Timing |
|---|---|---|
| **Blur-rise in** (their signature) | `from { opacity:0; filter: blur(8px); transform: translateY(18px) scale(.96) }` | 700ms, expo-out |
| **Fade-rise** (swapping content) | `from { opacity:0; transform: translateY(12px) }` | 400ms, expo-out |
| **Small rise** (chat, chips) | `from { opacity:0; transform: translateY(6–8px) }` | 220ms, ease-out |
| **Pop** (avatars) | `from { opacity:0; transform: scale(.35) }` | 420ms, expo-out |
| **Stick** (tilted notes) | to `rotate(var(--note-rotate)) scale(1)` | ~500ms |
| **Flip in** (underline) | `from { rotateX(82deg) scale(.94); opacity:0 }`, opacity done by 55% | 640ms, expo-out |
| **SVG draw** | `stroke-dashoffset` 1 → 0 with `pathLength="1"` | 720–900ms, in-out |
| **Idle "boil"** | 3 hand-drawn frames swapped with `step-end` | 600ms loop |
| **Accent sweep** | gradient text, `background-position` 100% → 0% | 4.5s linear loop |
| **Float** | `translateY(0 → -8px → 0)` | 2.2s ease-in-out loop |
| **Marquee** | `translateX(0 → -50%)` on a duplicated row | linear loop |
| **3D card swap** | out: `rotateY(0 → -98deg)`; in: reverse | ~600ms |

Stagger: children get `animation-delay: calc(var(--i) * 60ms)`.

### 6.4 Rules

- Animate only `transform`, `opacity`, `filter`. Never width/height/top in loops.
- Entrance = expo-out. Exit = shorter (≈60% of entrance) and in-out.
- Trigger once on enter view (IntersectionObserver, threshold ~0.25), add `.is-in`.
- Respect `prefers-reduced-motion: reduce`: drop transforms/blur, keep opacity fades ≤150ms, stop loops. Fastwork ships this.

### 6.5 Tokens to drop into `src/index.css`

```css
:root {
  --ease-out-expo: cubic-bezier(.16, 1, .3, 1);
  --ease-out-quint: cubic-bezier(.22, 1, .36, 1);
  --ease-standard: cubic-bezier(.24, 1, .4, 1);
  --ease-drawer: cubic-bezier(.32, .72, 0, 1);
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);

  --d-fast: 125ms; --d-med: 300ms; --d-med-max: 400ms; --d-slow: 700ms;
}

@keyframes blur-rise {
  from { opacity: 0; filter: blur(8px); transform: translateY(18px) scale(.96); }
  to   { opacity: 1; filter: blur(0);   transform: none; }
}

.reveal { opacity: 0; }
.reveal.is-in { animation: blur-rise var(--d-slow) var(--ease-out-expo) both;
                animation-delay: calc(var(--i, 0) * 60ms); }

@media (prefers-reduced-motion: reduce) {
  .reveal.is-in { animation: none; opacity: 1; }
}
```

---

## 7. Shrimp logo animation (plan)

### 7.1 What the reference video does

5.8 s loop. Orange card, mono tag top-left, small mono caption bottom-left. The radial mark cycles:

| Time | State | Look |
|---|---|---|
| 0.0–0.5 s | **ASCII / dot** | Mark built from small mono glyphs and dots, soft edges |
| 0.5–2.3 s | **Smooth** | Solid white strokes with motion blur radiating from a centre dot; strokes sweep in with a stagger |
| 2.5–4.0 s | **Pixel** | Chunky pixel grid with horizontal scanline streaks |
| 4.0–5.8 s | **ASCII** | Back to fine glyph grid, then loops |

Beside it: a line-drawn phone with the app icon, and a browser tab with favicon + name. Those are static.

### 7.2 Mapping to the shrimp

The shrimp mark is a circle made of shell segments (curved bands) plus head, eye, antenna and tail. The shell bands play the role of the video's radial strokes.

- **Smooth state**: each shell segment sweeps in around the circle centre with a stagger (≈70 ms apart), motion-blurred along its arc. Head, eye and tail settle last. Eye can blink once.
- **Pixel state**: shrimp silhouette sampled into a ~32×32 grid, white squares, plus 2–3 horizontal streak lines that slide across.
- **ASCII state**: silhouette sampled into a ~48×48 grid, each cell drawn as a glyph (`0 1 / > ~`) picked by coverage; glyphs flicker every ~100 ms.

### 7.3 Build approach

One `<canvas>` component, `ShrimpMark.jsx`, no library.

1. **Source**: need a vector SVG of the shrimp mark (repo has only PNGs: `Orange_No BG.png`). Trace it or get the SVG from whoever made the logo, with each shell segment as its own `<path>`.
2. **Mask**: draw the SVG to an offscreen canvas once; read pixel alpha → coverage grid. Same grid feeds pixel and ASCII states.
3. **Smooth state**: draw each segment path with `Path2D`, rotate in from an offset angle around the centre, ease `--ease-out-expo`. Fake motion blur by drawing 6–8 trailing copies at lower alpha (cheaper than a real radial blur).
4. **Transitions**: cross-dissolve 250 ms between states, plus a quick "resolution" change (grid size steps 64 → 32 → 16) so pixel ↔ ASCII feels like the video.
5. **Loop**: one `requestAnimationFrame` timeline, 5.8 s, states by time. Pause when off-screen (IntersectionObserver) and when `prefers-reduced-motion` (show static orange mark).
6. **Card**: orange `#FF7827` bg, radius 24px, mono tag "CULTIVATOR" top-left, two-line mono caption bottom-left. Phone + browser line drawings as SVG beside it, ink strokes 1.5px.

Effort: about 1 day for the canvas component once the SVG exists.

---

## 8. Open questions

- Heading font: Outfit vs Plus Jakarta Sans (or a licensed match to the wordmark).
- Vector shrimp SVG with separate shell segments: available, or trace?
- Caption text for the logo card (current draft on `/brand`: "Every aerator, connected to your phone. Farmers act before the harvest is lost.").
- Should the existing site (current hero gradient, light blue) move to this palette, or is the guide for a new page?
