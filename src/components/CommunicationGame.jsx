import React from 'react';
import { burstConfetti } from '../lib/confetti.js';
import { beep } from '../lib/sound.js';
import { loadProgress, saveProgress } from './progressUtils.js';

export default function CommunicationGame({ features = {} }){
  const [progress,setProgress]=React.useState(loadProgress);
  const [step,setStep]=React.useState(0);
  const [streak,setStreak]=React.useState(0);
  const [difficulty,setDifficulty]=React.useState(1);
  const soundEnabled = !!features.sound && !features.muteByDefault;

  const base=[
    {stim:'👋 A friend says hi',options:['Say Hi','Ignore','Walk away'],answer:'Say Hi'},
    {stim:'You want the toy',options:['Ask politely','Take it','Cry'],answer:'Ask politely'}
  ];
  const prompts=features.adaptive?base.map(p=>difficulty===1?p:(difficulty===2?{...p,options:[...p.options,'Smile']}:{...p,options:[...p.options,'Smile','Say please']})):base;
  const cur=prompts[step];

  function respond(choice){
    const correct=choice===cur.answer;
    if(correct){
      const next={...progress,communication:progress.communication+1}; setProgress(next); saveProgress(next);
      setStreak(s=>s+1); if(features.confetti) burstConfetti(); beep(soundEnabled,features.volume??0.5,880,'sine',0.08);
      if(features.adaptive && streak+1>=3){ setDifficulty(d=>Math.min(3,d+1)); setStreak(0); }
    }else{
      setStreak(0); if(features.adaptive) setDifficulty(1); beep(soundEnabled,features.volume??0.5,330,'sawtooth',0.08);
    }
    setTimeout(()=>setStep(s=>(s+1)%prompts.length),250);
  }
  return (<div className="space-y-4">
    <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-indigo-700">Communication Practice</h2><div className="bg-yellow-100 px-3 py-2 rounded-xl">⭐ {progress.communication}</div></div>
    <div className="p-4 rounded-xl bg-white shadow-md">
      <div className="flex justify-between items-center mb-2"><div className="text-xl">{cur.stim}</div>{features.adaptive&&<div className="text-sm text-gray-500">Difficulty: {difficulty}</div>}</div>
      <p className="text-gray-600 mt-2">Choose the best response</p>
      <div className="grid gap-3 sm:grid-cols-3 mt-4">{cur.options.map(o=>(<button key={o} onClick={()=>respond(o)} className="bg-green-100 hover:bg-green-200 p-3 rounded-xl shadow-sm">{o}</button>))}</div>
    </div>
  </div>);
}
