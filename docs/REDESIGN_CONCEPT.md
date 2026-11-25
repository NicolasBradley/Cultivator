# Cultivator website redesign: concept for discussion

Status: proposal. Nothing built. Approve or change the decisions in §7, then a skeleton preview follows.

Sources: pitch deck (22 slides), sponsor proposal V5 (16 pages), logo files, design guide (`docs/DESIGN_GUIDE.md`), fastwork.com/selling.

---

## 1. What's wrong with the current site

| Problem | Seen on the current homepage |
|---|---|
| Looks generic / AI-made | Full-bleed stock-style photos under a blue-teal wash, centred headline + subtitle repeated section after section, glass nav pill, floating CTA bar |
| Brand colours missing | Orange appears only in the nav button and CTA. The page is mostly desaturated teal (`marine` / `ocean` palette), which isn't a Cultivator colour |
| No story | Sections are slide titles (Problem, Solution, Traction, Market) with photos behind them. Nothing happens; the reader has to imagine the failure |
| Slow | Images ship at full camera size: up to 6.6 MB per JPG, a 9.1 MB MP4, a 5.2 MB PDF in the bundle |

---

## 2. The big idea: "The Night Shift"

**Scroll = one night at a shrimp pond, 18:00 → 06:00.**

Aerator failures happen at night, when nobody is watching. That is the whole pitch. So the site *is* that night:

- A mono clock sits in the corner and advances as you scroll (`18:00 … 02:13 … 06:00`).
- The page colour follows the sky: **orange dusk → ink night → orange dawn.** The brand palette stops being decoration; it becomes the timeline. Orange = alive / daylight / alert. Ink = night / risk. White = oxygen.
- At **02:13** one aerator stops. The reader watches the loss happen, then watches Cultivator catch it.
- The story ends at dawn with the numbers, the team and the investor ask.

Why it works for investors: in 30 seconds of scrolling they *feel* the problem (night, silence, oxygen falling) and see the product solve it, before reading a single market figure. Then the figures land.

Alternatives considered (not recommended):
- **B. "Follow the oxygen"**: one O₂ bubble travels from aerator to shrimp to farmer. Clever, but abstract; the aerator gets less screen time.
- **C. "Dive into the pond"**: camera goes underwater. Needs 3D (WebGL), heavy, and harder to keep fast.

---

## 3. The chapters (mapped to the deck)

| # | Time | Chapter | What the reader sees | Deck slide |
|---|---|---|---|---|
| 0 | | **Loader** | Shrimp mark builds ASCII → smooth (the `ShrimpMark` we already have) while the first screen loads | Logo |
| 1 | 18:00 | **Hero** | Orange dusk. Top-down vector pond, 4 paddlewheel aerators spinning, oxygen bubbles. Headline: *"Know the moment an aerator fails, before your shrimp do."* | 1 |
| 2 | 20:00 | **The aerator** | One big vector aerator, side view. Hover/scroll explodes it: motor, paddlewheel, float. Labels: *gives oxygen · circulates water*. "The machine that brings life to ponds." | 3 |
| 3 | 22:00 | **Fragile** | Night falls (ink). *24/7 monitoring requirement. 1 failed cycle = major loss.* How farmers check today: listening to the motor, walking the pond (sound-wave line + footsteps icon) | 2, 6 |
| 4 | 02:13 | **The failure** (pinned, scroll-scrubbed) | One aerator slows and stops. Its hum line goes flat. O₂ chart falls in real time. Shrimp swarm slows and greys. Counter: **$300 machine → −$10,000 of shrimp in 1 hour.** Then: *"−$1.8 million / day across the industry."* No dead-shrimp photos; the data carries it | 4, 5 |
| 5 | 02:14 | **The gap** | Single line, huge type: *"Industry monitors the water. Who watches the machine that keeps the shrimp alive?"* | 7 |
| 6 | 02:14 | **Cultivator** | The device clicks onto the aerator (vector). Two live waveforms: **current** and **vibration**. Anomaly spikes → a phone buzzes with a real-looking push alert → the farmer restarts the aerator → O₂ recovers → swarm turns orange again. A connector line draws device → cloud → phone → farmer (*connection*). "Plug and play, ~10 minutes to install." | 8 |
| 7 | 04:00 | **Impact** | Grid of 12 aerators reduces to 9 as you scroll: **27.6 % energy saved.** Then **1.8 t more shrimp per crop · $10,000 per harvest back to the farmer.** | 9, 10 |
| 8 | 05:00 | **Market** | TAM/SAM/SOM as concentric pond ripples you scroll through: $7B → $1.6B → $115M → $3M | 11 |
| 9 | 05:30 | **Proof** (fastwork-style sticky list) | Left: sticky list of countries (Taiwan, Indonesia, Malaysia, China). Right: farmer/partner cards swap as you scroll. Big counters: **50+ farmers · 4 countries · 9 signed pilots · 3 paid pilots · idea → sales in 2 months.** Partner logos marquee (Crustea, LanCore, Fubon). Hult Prize badge | 15, 16, proposal p.7 |
| 10 | 05:45 | **Model** | Two cards: Hardware ~$100, Software $120/yr. One line on margin | 12, 22 |
| 11 | 06:00 | **Team** | Orange dawn. Founders + advisors; photos build in from ASCII (see §5). "12+ years of engineering: Kaikutek, Liteon, Logitech" | 17 |
| 12 | | **The ask** | *"Deploying $1M"* with the 4-way split as a simple bar. CTAs: **Download deck · Book a call.** Footer: *Cultivate trust. Empower farmers.* | 18, 21 |

Brand values coverage: empowering (6, 7, 11), shrimp (1, 4, 6, swarm everywhere), farmers (3, 9, 11), connection (6, 9), innovation (0, 4, 6), reliability (6, 7, steady motion system).

---

## 4. Look and feel: minimal vector

- **Three colours only:** orange `#FF7827`, ink `#231F20`, white. Drop the teal/blue palette entirely. One functional exception: a muted grey for "dead" states in the failure scene.
- **Illustration system:** flat vector, 1.5 px ink line + flat fills. Orange fill = alive/important. Built from simple shapes so every piece can animate (SVG). Same drawing language for pond, aerator, device, phone, map.
- **The shrimp swarm:** small shrimp built from the logo's own shell shapes, moving as a flock (canvas). It's the "heartbeat" of the page: lively orange when oxygen is fine, slow and grey during the failure, back to orange after the fix. Follows the cursor slightly.
- **The waveform motif:** one thin line runs down the page as section dividers: an aerator's "heartbeat". It's steady, goes flat at 02:13, and spikes when Cultivator detects the fault.
- **Type:** heavy geometric sans for display (matches the wordmark), mono for the clock, labels and numbers. Huge numbers, little body copy.
- **Photos:** fewer, smaller, used as proof (farm visits, team, Hult), never as backgrounds.
- **Motion:** fastwork's system (§6 of the design guide): strong ease-out `cubic-bezier(.16,1,.3,1)`, blur-rise entrances, CSS-first. Scroll-scrubbed scenes use CSS scroll-driven animations (`animation-timeline: view()`) where supported, with a simple fallback.

Optional, opt-in only: **sound toggle.** Ambient pond + aerator hum. At 02:13 the hum stops; *silence* is the alarm. Muted by default.

---

## 5. Images: speed first, then the build-in effect

The slow load is a file-size problem; an animation alone would only hide it. Two parts:

**a. Make the files small (the real fix)**
- Convert all photos to AVIF/WebP at 3–4 widths (e.g. 480/960/1600) at build time; serve with `srcset` + `loading="lazy"`. Target ≤ 150 KB per photo instead of 3–6 MB.
- Video: compress to ~1–2 MB, poster frame, load only when in view.
- Move the PDF deck out of the bundle into `/public` (download link only).
- Budget: first screen under 500 KB total, LCP under 2 s on 4G.

**b. "Develop" effect while each photo loads**
- At build time, each photo also gets a tiny 24 × 16 px preview (~300 bytes, inlined).
- On screen, that preview is drawn as a **grid of ASCII glyphs / tiny shrimp marks** in brand orange on ink, same visual language as the logo animation.
- When the real image arrives, the glyphs resolve into it (pixel grid → sharp) over ~500 ms. If the image is cached, it appears instantly with no effect.
- Cost: one small shared canvas component; no per-image work.

---

## 6. How it gets built (later, after approval)

- Keep React + Vite + Tailwind. New page at `/v2` first, swap with `/` only when approved, so the current site stays live.
- Vector art as React SVG components (pond, aerator, device, phone, map). The aerator and device need drawing; everything else is simple shapes.
- Canvas for 3 things only: shrimp swarm, image "develop" effect, logo loader.
- No heavy libraries planned. If the pinned failure scene needs exact scroll control on older Safari, add GSAP ScrollTrigger to that one scene.

Rough effort:
- Skeleton preview (grey blocks, scroll clock, colour timeline, no art): **2–3 hours**
- Full build: **about 2–3 weeks** for one person, most of it illustration and the failure/solution scenes

---

## 7. Decisions needed before the skeleton

1. **Concept:** "The Night Shift" (recommended), B "Follow the oxygen", or C "Dive into the pond"?
2. **Audience:** investors first (your brief) changes the design guide rule "farmer-facing pages win". OK to flip it for the homepage?
3. **Sound toggle:** include (muted by default) or skip?
4. **Where:** build at `/v2` and swap later (recommended), or replace `/` directly?
