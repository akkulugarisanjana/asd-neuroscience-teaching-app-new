import React from 'react';
import { burstConfetti } from '../lib/confetti.js';
import { beep } from '../lib/sound.js';
import { loadProgress, saveProgress } from './progressUtils.js';

export default function EmotionRegulation({features={}}){
  const [progress,setProgress]=React.useState(loadProgress);
  const [badge,setBadge]=React.useState(false);
  const [difficulty,setDifficulty]=React.useState(1);
  const soundEnabled = !!features.sound && !features.muteByDefault;
  const pool=difficulty===1?['😀 Happy','😢 Sad']:['😡 Angry','😀 Happy','😢 Sad','😨 Scared'];
  function choose(){
    const next={...progress,emotions:progress.emotions+1}; setProgress(next); saveProgress(next);
    setBadge(true); if(features.confetti) burstConfetti(); beep(soundEnabled,features.volume??0.5,700,'square',0.06);
    setTimeout(()=>setBadge(false),1000); if(features.adaptive) setDifficulty(d=>Math.min(3,d+1));
  }
  return (<div className="space-y-4">
    <h2 className="text-2xl font-bold text-pink-600">Emotion Explorer</h2>
    <p className="text-gray-700">Tap the face that matches the emotion word.</p>
    <div className="grid sm:grid-cols-2 gap-4">{pool.map(e=>(<button key={e} onClick={choose} className="p-6 rounded-2xl bg-white shadow hover:scale-[1.02] transition"><div className="text-3xl">{e.split(' ')[0]}</div><div className="mt-2 text-gray-700">{e.split(' ').slice(1).join(' ')}</div></button>))}</div>
    {features.adaptive&&<div className="text-sm text-gray-500">Difficulty: {difficulty}</div>}
    {badge&&<div className="mt-3 inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full shadow">Nice! +1</div>}
  </div>);
}
