
# ASD App — Core Fixes Full v3

Implements the full set of requested changes:
- Fixed tab order & active styling (bold + underline)
- ≥44×44 buttons via shared styles
- Pause & Repeat on every activity card
- Teacher PIN unlock + side panel with Confetti/Adaptive/Mute/Volume (greys out on mute)
- Kid-friendly prompts & realistic distractors for Communication/Emotions/Social
- Feedback: small star confetti + pop on correct; vibration + “Try again” + right-answer highlight on wrong
- Progress tracker: accuracy %, avg response time, category progress bars, CSV export
- Low Sensory Mode + Visual Schedule (Now → Next → Done)
- Social Skills mini-game: Turn-Token Flyer

## Install
```bash
npm i zustand howler canvas-confetti framer-motion papaparse
```
Import global button styles (once) in `src/index.css`:
```css
@import "./styles/buttons.css";
```

Add a short pop sound at `public/sounds/pop.mp3` (a file is included in this patch).

Run:
```bash
npm run dev
```
