
# Core Fixes v2 — Autistic Spectrum Disorders Intervention APP

Includes all requested changes:
- Fixed tab order, bold/underline active
- ≥44×44 buttons + Pause/Repeat
- Teacher Mode with PIN + side drawer (Confetti/Adaptive/Mute/Volume/Low Sensory)
- Kid-friendly prompts and realistic distractors
- Feedback: star + pop on correct; vibration + “Try again” + right-answer highlight on wrong
- Confetti only for big achievements (first correct or every 5-streak)
- Progress: accuracy %, avg response time, per-category progress bars + "Share Progress (CSV)"
- Low Sensory Mode (high contrast, no sound, no animations)
- Visual Schedule banner
- Social game: Turn-Token Flyer with logging

## Install
```bash
npm i zustand howler canvas-confetti framer-motion papaparse
```
Import global styles once (e.g., in `src/index.css`):
```css
@import "./styles/buttons.css";
```

Add a short pop sound at `public/sounds/pop.mp3`.

Run:
```bash
npm run dev
```
