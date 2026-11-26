# Cultivator website redesign: handoff

Handoff from Claude Code to the next agent (Codex). Read this first, then `docs/DESIGN_GUIDE.md` and `docs/REDESIGN_CONCEPT.md`.

Last updated: 25 Nov 2026.

Production update, 26 Nov 2026: the owner approved the Night Shift redesign as the main homepage. `src/pages/V2.jsx` now serves `/` and `/v2`; the previous `Home.jsx` is preserved. Production deploys from `redesign/night-shift-v2` to `https://cultivatortech.com`. The deck and contact links now use the original homepage's PDF and public contact details. The remaining notes below describe the earlier handoff state.

---

## 1. What this project is

**Cultivator** is an agriculture-technology startup for **shrimp farming**. It makes a plug-and-play sensor that clips onto a pond's **paddlewheel aerator**, reads the motor's **current and vibration**, and alerts the farmer's phone the moment the aerator fails, before the shrimp suffocate.

The site is aimed at **investors first** (then farmers and partners).

- **Tagline (from the deck):** Cultivate Trust. Empower Farmers.
- **Hero title (from the deck):** A smart aeration system for 3.5 million smallholder farmers.
- **Earlier core line** (no longer in the hero; free to reuse elsewhere): Know the moment an aerator fails, before your shrimp do.

The redesign is an award-style scroll story called **"The Night Shift"**: scrolling plays one night at a pond (18:00 → 06:00). An aerator fails at 02:13, Cultivator catches it at 02:14, and dawn brings impact, traction, team and the ask.

---

## 2. Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

- **New site:** `/v2`. Old homepage `/` (`src/pages/Home.jsx`) is untouched and still live.
- `/brand` is an earlier sandbox for the animated logo card (`src/pages/Brand.jsx`). Can be deleted later.
- Stack: React 19, Vite 8, Tailwind 4, **Lenis** (smooth scroll), **GSAP + MorphSVG** (shrimp → wheel morph; all GSAP plugins are free since 2025).
- Node here was 22.22.2.
- Lint: `npx eslint src/pages/V2.jsx src/pages/v2 src/components/ContourPattern.jsx`. It was clean at handoff.
- Build: `npm run build`. It passed at handoff; the main JS chunk is about 240 KB gzipped.

**Owner preference:** do not run checks/builds unless asked; the owner usually reviews in the browser themselves. Make focused changes and explain them plainly.

---

## 3. Git state (important)

**Nothing from this redesign is committed yet.** Everything below is untracked or modified in the working tree. `src/pages/Home.jsx` and `src/assets/carousel/crustea.png` contain the owner's own in-progress edits and are **not** part of the redesign. Ask before committing them. Suggested first step: commit the redesign files on a branch.

Redesign files:
- `src/pages/V2.jsx` (+ route in `src/App.jsx`)
- `src/pages/v2/*`
- `src/components/ContourPattern.jsx`, `src/components/ShrimpMark.jsx`, `src/components/shrimpParts.js`
- `src/assets/v2/*`, `src/assets/cultivator-shrimp.svg`
- keyframes appended to `src/index.css`
- `package.json` / `package-lock.json` (lenis, gsap)
- `docs/*`
- `.claude/launch.json` (Claude preview config; harmless)

---

## 4. Where everything lives

### Documents and data (outside the repo, on the owner's Mac)
| What | Path |
|---|---|
| **Company deck, Nov 2026 (source for copy, NOT public yet)**: EN / zh-CN / zh-TW | `~/Downloads/Cultivator_Company_Deck_2026-11*.pdf`. Don't put these on the site until the owner says so. |
| Older pitch deck (22 slides, superseded) | `~/Downloads/Cultivator.pdf` |
| Sponsor proposal V5 (16 pages): traction, roadmap, team names, contacts | `~/Downloads/Projects/Cultivator Content/Cultivator Project Proposal V5-B9uZfaa1.pdf` |
| Official logo files (orange/white/black variants, wordmark, team-by-pond photo) | `~/Downloads/Projects/Cultivator Content/Cultivator Assets/` |
| Original logo-animation reference video | `~/Downloads/original-2969b52cc0b6ce4d78b287558fac3800.mp4` |
| LINE integration demo video (uploaded to YouTube, not embedded) | `~/Downloads/WhatsApp Video 2026-11-25 at 19.10.38.mp4` |

PDF tip: the PDFs are image-heavy. Text was extracted on macOS with JXA + PDFKit (`osascript -l JavaScript`), since poppler isn't installed.

### Design docs (in the repo)
| Doc | What's in it |
|---|---|
| `docs/DESIGN_GUIDE.md` | Brand values, colours, type, radii, motion system (easings/durations from fastwork.com), water-contour pattern spec (§3b), shrimp animation notes |
| `docs/REDESIGN_CONCEPT.md` | The "Night Shift" concept, chapter table mapped to deck slides, image-speed plan, decisions |
| `docs/HANDOFF.md` | This file |

### Key facts for copy (November 2026 deck: the source of truth)
See `docs/DECK_ALIGNMENT.md` for the full section-by-section mapping. The site's deck download is the old pitch deck (`src/assets/Cultivator Project Proposal.pdf`, same as the live homepage). The Nov 2026 decks aren't public yet.
- Hero: title **Smart aeration for shrimp farms**, one line "Know the moment an aerator stops" (no full stops, keep it this short). Tagline: **Cultivate trust. Empower farmers.**
- US$300 aerator protects up to **US$50,000** of shrimp in one pond; lost in **about 1 hour**. ~90% of farmers are smallholders.
- Product: **US$10 current sensor** on the aerator's cable (electrical box), DO + pH probe, sealed field box (RS-485), alerts on **LINE / WhatsApp**, daily/weekly/monthly/per-harvest reports. Control from oxygen readings is in development.
- Farm proof: aerator at **3×** normal current → **US$200/yr** wasted, **US$15** fix; **<10 min** to fit.
- Traction: **15+ signed pilots, 5 paid, 4 countries** (Indonesia, Taiwan, Malaysia, China), **~5,000 aerators** pipeline. Partners: Maxmar (test agreed, not signed), Crustea, Sankina Aquaculture, LanCore System.
- Pricing: **Buy** US$750/pond + US$10/aerator, then US$10/mo; **lease-to-own** US$99 setup + US$45/mo.
- Milestones: started Feb 2026 · NTHU Garage Mar 2026 · **Hult Prize Taiwan 2026 champion** · first paid pilots May–Jul · DeployAI 2nd (Nov) · LITEON "Boldness" film (Nov) · Techathon+ finals 25 Jan 2027 if selected.
- Team: **Fransiskus Guntur** (overall architecture), **Daniel Ieong** (software and business), **Jason Nababan** (partnerships and product development). Advisors: Jenny Ou, Bagas Pramana Putra Fadhila, Prof. Yu Wei Hsu.
- No funding ask in the current deck. Don't reintroduce the old $1M split.

---

## 5. Brand rules (short version)

- **Colours:** site orange `#FF802E` (the logo files use `#FF7827`; brightened slightly for screens), ink `#231F20`, white. Grey `#8A8486` only for the 02:13 "dead" state. No other colours.
- White text on orange fails contrast, so **text on orange is ink**. White is fine for big graphics only.
- **Motion:** strong ease-out `cubic-bezier(.16,1,.3,1)`, CSS-first, transforms/opacity only, respect `prefers-reduced-motion`.
- **Style:** minimal vector; realism comes from **tone-tracing real photos** (see §7).
- **Never** show dead shrimp; show loss with data.
- **Don't use watermarked/stock previews.** The owner once supplied a Shutterstock comp; it was rejected for licensing.

---

## 6. Architecture of `/v2`

```
src/pages/V2.jsx              page shell: chapter list, menu (NavBar), hero, colour blending, Lenis, intro, back-to-top
src/pages/v2/scroll.js        scroll engine: writes --e / --p CSS vars per <section data-scene>; useProgress(); INTRO_MS
src/pages/v2/scenes.jsx       one component per chapter (WheelScene … AskScene)
src/pages/v2/actor.jsx        the travelling shrimp: logo → wheel morph, keyframes, real wheel/body, idle + electric arcs
src/pages/v2/art.jsx          SVG kit: shrimp symbol, swarm shrimp, aerator front view, device, waveforms, wheel icon
src/pages/v2/realShapes.js    traced vector data (wheel blades/centre, WHEEL_REAL, BODY_REAL, AERATOR front)
src/pages/v2/IntroScreen.jsx  intro: shrimp curls in from tail, wordmark rolls out, shrimp flies onto the hero logo
src/pages/v2/AsciiImg.jsx     photos that appear as ASCII art on slow networks, then resolve
src/pages/v2/lqip.js          tiny previews used by AsciiImg (regenerate if a photo changes)
src/components/ContourPattern.jsx  animated water-line background (variants, morphing, chaos, ripples, heartbeat)
src/components/shrimpParts.js      the logo traced into 11 parts (from src/assets/Orange_Shrimp.png)
```

### Chapters (`CHAPTERS` in `V2.jsx`)
`hero 18:00 → wheel 19:00 → life 21:00 → fragile 23:00 → failure 02:13 → gap → device 02:14 → impact 04:00 → market 05:00 → proof 05:30 → model 05:45 → team 06:00 → ask`

Each chapter has:
- `tone` (dusk/night/light/dawn → background and text colours)
- `h` (height in screens; >1 means a pinned/sticky scene)
- `chip` (which menu item it highlights)
- `wave` (background amplitude/speed)
- `noise` (0 clean … 1 disordered lines)
- `fail` (freeze + grey)
- optional `blend` (how many screens the colour fades over into this chapter; `life` uses 1.0)

### Scroll engine
- `useScrollEngine()` sets `--e` (enter progress) and `--p` (pin progress, 0→1 while pinned) on each section.
- Scenes animate with CSS `calc()` on those vars. The `seg(a,b)` helper in `scenes.jsx` maps `--p` from a→b onto 0→1.
- For JS-driven values (counters, waveforms) use `useProgress(id, fn)`.

### The shrimp actor (`actor.jsx`)
- One fixed SVG that travels the whole page. `KF` = keyframes, each tied to a section + progress.
- Positions come from `<div data-slot="name">` placeholders inside scenes (`hero`, `wheel`, `life`, `failure`, `device`, `ask`), measured while the scene is pinned.
- Keyframe fields:
  - `wheel` 0→1 drives the GSAP MorphSVG timeline (shrimp parts → wheel). Past 0.72, the tone-traced `WHEEL_REAL` fades in and stays everywhere.
  - `spin`: speed in the 0..1 range; 0 = stopped, as at 02:13.
  - `grey`: 0..1 tint toward the 02:13 grey.
  - `op`: opacity.
  - `flip`: rotateY in degrees for the 02:14 handoff to the aerator front view.
  - `body`: 0..1, the aerator body + frame leg, **19:00 only**.
  - `rot`: extra rotation in degrees, linked to scroll. The hero logo spins 1.5 turns as it travels down into the pond, plus another half turn as it rises as the wheel.
- Idle (logo state only): float, tail flick, antenna sway, blink, depth shadow, **electric arcs** around the shell every 5 s. The pulse ring was removed at the owner's request.
- `hidden` prop: kept invisible during the intro; the intro shrimp lands exactly on it.

### Menu (`NavBar` in `V2.jsx`)
- Intro "bubble split" (goo SVG filter + WAAPI): wordmark pill → left, centre swells into chips, details → right.
- The bubble split starts after the intro screen (`startDelay`).
- Sliding elastic indicator.
- Mobile: menu button + sheet.
- Pill colour flips white on ink sections.

### Other behaviours
- **Refresh restores the reading position** (`sessionStorage` key `cultivator-v2-pos`; `history.scrollRestoration = 'manual'`). `App.jsx`'s `ScrollToTop` only fires on real route changes.
- **The intro plays on every load** (3.1 s; `INTRO_MS` in `scroll.js`). It's skipped for reduced motion.
- **Background colour blends continuously** across sections via `--v2-bg`. Pond strips use that var so they never stay orange at night.

---

## 7. How the realistic art was made (repeatable)

Python 3 with Pillow, NumPy, SciPy and scikit-image (all installed on the owner's Mac):

1. **Segment by colour** (yellow wheel, blue body) → mask; clean up with morphology.
2. **Tone bands:** quantiles of luminance inside the mask → 2–3 nested masks. Median-filter first to kill JPEG noise.
3. **Trace:** `skimage.measure.find_contours` → `approximate_polygon` → Catmull-Rom → cubic Bézier `d` strings.
4. **Align** to the actor's coordinate space: wheel hub at `(298, 282)`, blade tips at r≈205, body scaled ×0.8 around the hub.
5. **Wheel symmetry:** pick the cleanest blade sector (±22.5°), resample every pixel's angle into that sector (8-fold), then trace. This removed the wobble.

Reference photos live in `~/Downloads/...` and chat uploads. The traced outputs are already in `realShapes.js`.

---

## 8. Open items / ideas (not done)

- **Book a call** button has no real link (`#ask` placeholder). Needs the owner's preferred contact or a Calendly link.
- **Download the deck / Deck buttons** jump to the ask section. Should link to a deck PDF placed in `/public` (not bundled).
- **Swap `/v2` to `/`** when the owner approves; update SEO entries in `App.jsx` (`routeSeo`).
- **Bundle weight:** about 240 KB gzipped (GSAP + traced shapes). Options:
  - lazy-load `realShapes.js`
  - drop the `WHEEL_REAL` highlight layer
  - code-split the scenes
- **Pre-existing console warning** from `Home.jsx` ("Unexpected ref object provided for section"). Not part of the redesign.
- **Copy** written by Claude that the owner should confirm:
  - "Under every wheel, a whole harvest breathes."
  - "The team on the night shift."
  - install-photo caption
  - "a first batch of 500–1,000 units"
- **YouTube** channel and LINE-video descriptions were drafted in chat (not in the repo).
- **Blender MCP** is installed in Claude's environment but needed Blender open with the add-on; not used.

---

## 9. Owner's feedback history (what they liked / disliked)

- **Liked:**
  - orange + ink + white only
  - water-contour lines (variants 1/4/5)
  - the curl-from-tail logo animation
  - shrimp → paddlewheel story
  - realistic traced aerator
  - bubbly menu intro
- **Disliked / removed:**
  - generic AI look
  - teal palette
  - too-busy hero (status pill, signal-line shrimp)
  - jagged/noisy lines
  - cursor "squares" (now soft ripples)
  - wobbly wheel
  - the shine and the pulse on the logo
- **Wants:** realism via tracing, smooth/continuous transitions, readability, mobile parity, investor clarity.
