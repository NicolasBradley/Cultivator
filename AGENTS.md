# AGENTS.md

Instructions for coding agents (Codex etc.) working in this repo.

**Start here:** read `docs/HANDOFF.md`, then `docs/DESIGN_GUIDE.md` and `docs/REDESIGN_CONCEPT.md`.

- The previous homepage (`src/pages/Home.jsx`) serves `/`. The active Night Shift redesign remains at `/v2`: `src/pages/V2.jsx` and `src/pages/v2/*`. Don't modify `Home.jsx` unless asked.
- Run with `npm run dev` and open `/v2` for redesign work.
- Brand colours are only orange `#FF802E`, ink `#231F20` and white (grey `#8A8486` for the 02:13 failure state). Text on orange is ink.
- Prefer CSS transforms/opacity for motion, respect `prefers-reduced-motion`, keep the vector + tone-traced style.
- Don't use watermarked or unlicensed stock images.
- The redesign is committed on `redesign/night-shift-v2`, which deploys to production. Ask the owner before committing unless the current request already authorizes committing or deploying, and never commit `Home.jsx` or `src/assets/carousel/crustea.png` as part of redesign work.
- The owner prefers to check in the browser themselves. Don't run lint/build unless asked, but keep `npx eslint src/pages/V2.jsx src/pages/v2 src/components/ContourPattern.jsx` clean.
