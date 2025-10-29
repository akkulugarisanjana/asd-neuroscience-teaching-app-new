import { useState } from "react";
import { useAppStore } from "../state/useAppStore";

export default function SettingsDrawer() {
  const { settings, setSettings } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating gear button */}
      <button
        className="fixed right-4 top-20 z-30 btn-secondary rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        aria-label={open ? "Close settings" : "Open settings"}
        onClick={() => setOpen(o => !o)}
      >
        {/* Gear icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <path d="M19.14,12.94a7.49,7.49,0,0,0,.05-.94,7.49,7.49,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.21,7.21,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,11.79,2H8.21a.5.5,0,0,0-.5.42L7.33,5.07a7.21,7.21,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L2.91,11.06a7.49,7.49,0,0,0-.05.94,7.49,7.49,0,0,0,.05.94L.79,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.21,7.21,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.5.42h3.58a.5.5,0,0,0,.5-.42l.38-2.65a7.21,7.21,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64ZM10,15.5A3.5,3.5,0,1,1,13.5,12,3.5,3.5,0,0,1,10,15.5Z"/>
        </svg>
      </button>

      {/* Slide-over panel */}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-80 border-l bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Teacher Settings</h3>
            <button className="btn-secondary" onClick={() => setOpen(false)} aria-label="Close settings">Close</button>
          </div>

          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.confettiBigWins}
                     onChange={e => setSettings({ confettiBigWins: e.target.checked })}/>
              <span>Confetti only for big wins</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.adaptive}
                     onChange={e => setSettings({ adaptive: e.target.checked })}/>
              <span>Adaptive difficulty</span>
            </label>

            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={settings.mute}
                       onChange={e => setSettings({ mute: e.target.checked })}/>
                <span>Mute</span>
              </label>
              <div className={`opacity-100 ${settings.mute ? "opacity-40" : ""}`}>
                <label className="block text-sm mb-1">Volume</label>
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={settings.volume}
                  onChange={e => setSettings({ volume: Number(e.target.value) })}
                  disabled={settings.mute}
                />
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.lowSensory}
                     onChange={e => setSettings({ lowSensory: e.target.checked })}/>
              <span>Low Sensory Mode (high contrast, no sound, no animations)</span>
            </label>
          </div>
        </div>
      </aside>
    </>
  );
}
