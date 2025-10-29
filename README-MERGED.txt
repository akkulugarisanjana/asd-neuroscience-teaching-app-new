# Final Merged Patch
This package combines **core-fixes-v2** with the **targeted tabs/buttons/activity** patch.

Included:
- Fixed tab order + bold/underline active
- 44×44 global button styles
- ActivityCard with Pause & Repeat
- Teacher Mode PIN + Settings Drawer
- Adaptive difficulty
- Feedback (pop + small stars, big confetti on big wins)
- Progress view with accuracy %, response time, category bars + CSV export
- Visual Schedule + Low Sensory Mode
- Turn-Token Flyer mini-game

After copy into your repo:
1) `npm i zustand howler canvas-confetti framer-motion papaparse`
2) Ensure `@import "./styles/buttons.css";` is present in `src/index.css`
3) Add `public/sounds/pop.mp3`
4) `npm run dev`

