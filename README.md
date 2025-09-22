# ASD Intervention App — Vite + Tailwind (Teacher PIN + Mute-by-default)

This build adds:
- **Teacher PIN lock** for Feature Controls (default PIN `1234`, change via "Set PIN")
- **Mute-by-default** classroom switch (sound is off unless Teacher disables the switch)
- Smooth canvas confetti, adjustable sound (with volume), adaptive difficulty
- LocalStorage persistence, CSV export/import, JSON copy, reset
- Tailwind 3.4.13, Vite dev server, GH Pages deploy

## Run locally
```powershell
npm install
npm run dev
```
Open the URL (usually http://localhost:5173).

## Teacher Mode
- Click **"Unlock Teacher Mode"** → enter PIN (`1234` by default) to change settings.
- Set a new PIN: click **"Set PIN"** while unlocked.
- Lock again with **"Lock"**.

## Deploy to GitHub Pages
Set base path and deploy:
```powershell
$env:VITE_BASE="/your-repo-name/"
npm run deploy
```
Then enable Pages for the `gh-pages` branch.
