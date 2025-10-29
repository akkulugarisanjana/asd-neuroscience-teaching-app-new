
# Targeted Patch: Tabs, Button Size, Pause/Repeat

**Implements exactly these items:**
- Tab order fixed: Communication → Emotions → Social Skills → Progress.
- Active tab is bold + underlined.
- Global button classes ensure ≥44×44 px tap targets.
- Activity cards include **Pause** and **Repeat**.

## Files
- `src/components/TopTabs.tsx`
- `src/components/ActivityCard.tsx`
- `src/styles/buttons.css`

## Setup
1) Copy files into your project.
2) Import the button CSS once (e.g., in `src/index.css`):
```css
@import "./styles/buttons.css";
```
3) Ensure you have `useAppStore` with `tab`, `setTab`, `settings`, and `logTrial`. (Use the full v2 patch if not.)
4) (Optional) Add `public/sounds/pop.mp3` for the feedback sound.
