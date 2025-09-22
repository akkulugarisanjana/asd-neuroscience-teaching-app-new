import React from 'react';
import TeacherLock from './TeacherLock.jsx';

export default function FeatureControls({features,setFeatures}){
  const [unlocked, setUnlocked] = React.useState(false);
  const toggle=(k)=>setFeatures(f=>({...f,[k]:!f[k]}));
  const setVol=(v)=>setFeatures(f=>({...f,volume:parseFloat(v)}));

  // ensure muteByDefault defaults to true on first run
  React.useEffect(()=>{
    if(typeof features.muteByDefault === 'undefined'){
      setFeatures(f=>({...f, muteByDefault: true, sound: false}));
    } else if(features.muteByDefault && features.sound){
      // enforce mute
      setFeatures(f=>({...f, sound:false}));
    }
  }, []); // run once

  const disabled = !unlocked;

  return (
    <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
      <TeacherLock unlocked={unlocked} setUnlocked={setUnlocked} />

      <div className={"flex flex-wrap items-center gap-4 " + (disabled ? "opacity-50 pointer-events-none select-none" : "")}>
        <div className="text-sm font-semibold text-gray-700">Features</div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!features.confetti} onChange={()=>toggle('confetti')} />
          Confetti
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!features.adaptive} onChange={()=>toggle('adaptive')} />
          Adaptive
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!features.muteByDefault} onChange={()=>toggle('muteByDefault')} />
          Mute by default
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!features.sound && !features.muteByDefault}
            onChange={()=>toggle('sound')}
            disabled={features.muteByDefault}
          />
          Sound
        </label>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Volume</span>
          <input type="range" min="0" max="1" step="0.05" value={features.volume ?? 0.5}
                 onChange={(e)=>setVol(e.target.value)} disabled={features.muteByDefault || !features.sound} />
        </div>
      </div>
    </div>
  );
}
