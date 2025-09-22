import React from 'react';
import { burstConfetti } from '../lib/confetti.js';
import { loadProgress, saveProgress } from './progressUtils.js';

export default function SocialSkills({features={}}){
  const [progress,setProgress]=React.useState(loadProgress);
  function award(){ const next={...progress,social:progress.social+1}; setProgress(next); saveProgress(next); if(features.confetti) burstConfetti(); }
  return (<div className="space-y-4">
    <h2 className="text-2xl font-bold text-teal-600">Social Skills</h2>
    <p className="text-gray-700">Practice greetings and turn-taking with simple mini-games.</p>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="p-4 bg-white rounded-xl shadow"><div className="text-lg font-semibold">Greeting Game</div><p className="text-gray-600">Choose how to greet someone.</p><div className="mt-3"><button onClick={award} className="px-3 py-2 bg-blue-100 rounded-lg">Wave and say Hi (+1)</button></div></div>
      <div className="p-4 bg-white rounded-xl shadow"><div className="text-lg font-semibold">Turn-taking</div><p className="text-gray-600">Wait for the turn token and respond.</p><div className="mt-3"><button onClick={award} className="px-3 py-2 bg-emerald-100 rounded-lg">Take Turn (+1)</button></div></div>
    </div>
  </div>);
}
