# Website ↔ company deck alignment (November 2026)

Source of truth: **Cultivator Company Deck, November 2026** (16 pages, EN / 简体 / 繁體). **Not public yet**, so the decks aren't on the site. The site's download button links the old pitch deck (`src/assets/Cultivator Project Proposal.pdf`, same file as the live homepage).

Originals: `~/Downloads/Cultivator_Company_Deck_2026-11*.pdf`. Deck links and contact details live in `src/pages/v2/contact.js`.

The older pitch deck (`~/Downloads/Cultivator.pdf`) and sponsor proposal are **superseded**. Don't reuse their numbers: $10,000/hour, $1.8M/day, 27.6% energy saving, 1.8 t, TAM/SAM/SOM, $1M ask, 9 signed / 3 paid pilots, ~$100 hardware + $120/yr, the 4-person team.

## What changed on `/v2` (25–26 Nov 2026)

| Section | Was (old deck) | Now (Nov 2026 deck) | Deck page |
|---|---|---|---|
| Hero | A smart aeration system for 3.5 million smallholder farmers | **Smart aeration for shrimp farms** + "Know the moment an aerator stops" | 1 |
| 21:00 | 1.8 t of shrimp per pond | Up to **US$50,000** of shrimp in a single pond | 5 |
| 23:00 | "Shrimp farming is fragile", 24/7, listening/walking | **How farmers cope now:** walk ponds at 3 AM / run every aerator / cut back to save power; ~90% are smallholders | 5–6 |
| 02:13 | −$10,000 in an hour; −$1.8M/day industry-wide | **−US$50,000** of shrimp in one pond, in about an hour; "One stopped aerator can cost a whole pond." | 5 |
| Gap | Who watches the machine… | The industry monitors the water. **Who looks after** the machine that keeps the shrimp alive? | 6 |
| 02:14 | Reads current **and vibration**, clips under the motor | **US$10 current sensor** clamps onto the aerator's cable in the electrical box; DO probe; alerts on **LINE or WhatsApp** | 7–8 |
| 04:00 | 27.6% energy saved, 1.8 t, $10k/harvest | **Proof from a real farm:** one aerator drawing **3×** current → **US$200/yr** wasted, **US$15** fix, **<10 min** to fit; long-term reliability still to prove | 10 |
| 05:00 | Market $7B → $3M | **How we compare:** Aqua Exchange, Eruvaka, Hydroneo vs Cultivator | 11 |
| 05:30 | 50+ farmers, 9 signed, 3 paid, 2 partners | **15+ signed pilots, 5 paid, 4 countries, ~5,000 aerators** in pipeline; Maxmar (not signed), Crustea, Sankina, LanCore; milestones Feb 2026 → Jan 2027 | 2–3, 12 |
| 05:45 | ~$100 hardware + $120/yr | **Buy:** US$750/pond + US$10/aerator, then US$10/mo. **Lease-to-own:** US$99 setup + US$45/mo | 11 |
| 06:00 Team | Frans, Jason, Daniel, Jai-Jai; "12+ years engineering" | **Fransiskus Guntur, Daniel Ieong, Jason Nababan**; NTHU students graduating May 2027, full-time after | 15 |
| End | "Deploying $1M" + funding split | **What's next** (Now / Next / By end of 2027) + "Get in touch" + old pitch deck download (new decks not public yet) | 14, 16 |

## Still open
- The hero's 3D/vector device graphic shows the sensor on the motor. The real device sits in the electrical box on the cable. The labels say so, but the drawing is a simplification.
- Remaining Jai-Jai assets (`src/assets/v2/jai.jpg`, LQIP entry) are unused now and can be deleted if he's no longer on the team.
- Partner marquee: Maxmar (logo cropped from deck p.12; test agreed, nothing signed yet), Crustea, LanCore, Sankina, NTHU Garage (from the proposal cover), Hult Prize, NTHU, IMBA. LITEON is a text line only ("Featured in LITEON's Boldness campaign"), no logo, per the owner.
