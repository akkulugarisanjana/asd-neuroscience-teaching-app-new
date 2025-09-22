import React from 'react';
import { loadProgress, saveProgress } from './progressUtils.js';

export default function ProgressTracker(){
  const [progress,setProgress]=React.useState(loadProgress);
  const [msg,setMsg]=React.useState('');
  React.useEffect(()=>{ const onStorage=()=>setProgress(loadProgress()); window.addEventListener('storage',onStorage); return()=>window.removeEventListener('storage',onStorage); },[]);
  function reset(){ const next={communication:0,emotions:0,social:0}; setProgress(next); saveProgress(next); setMsg('Progress reset'); setTimeout(()=>setMsg(''),2000); }
  function exportCSV(){ const rows=[['domain','value'],['communication',progress.communication],['emotions',progress.emotions],['social',progress.social]]; const csv=rows.map(r=>r.join(',')).join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='asd_progress.csv'; a.click(); URL.revokeObjectURL(url); }
  function importCSV(file){ const reader=new FileReader(); reader.onload=(e)=>{ const txt=e.target.result; const lines=txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean); const obj={}; for(let i=1;i<lines.length;i++){ const [k,v]=lines[i].split(','); obj[k]=Number(v||0);} const next={communication:obj.communication||0,emotions:obj.emotions||0,social:obj.social||0}; setProgress(next); saveProgress(next); setMsg('Imported CSV'); setTimeout(()=>setMsg(''),2000); }; reader.readAsText(file); }
  return (<div className="space-y-4">
    <h2 className="text-2xl font-bold text-violet-600">Progress Tracker</h2>
    <p className="text-gray-700">Overview of recent sessions, tokens, and mastery levels.</p>
    <div className="mt-4 grid sm:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow"><div className="text-sm text-gray-500">Communication</div><div className="text-2xl font-semibold">{progress.communication} ⭐</div></div>
      <div className="p-4 bg-white rounded-xl shadow"><div className="text-sm text-gray-500">Emotions</div><div className="text-2xl font-semibold">{progress.emotions}</div></div>
      <div className="p-4 bg-white rounded-xl shadow"><div className="text-sm text-gray-500">Social</div><div className="text-2xl font-semibold">{progress.social}</div></div>
    </div>
    <div className="mt-4 flex flex-wrap gap-3">
      <button onClick={reset} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow">🔄 Reset</button>
      <button onClick={()=>navigator.clipboard.writeText(JSON.stringify(progress))} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">📋 Copy JSON</button>
      <button onClick={exportCSV} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">⬇️ Export CSV</button>
      <label className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow cursor-pointer">⬆️ Import CSV
        <input type="file" accept=".csv" style={{display:'none'}} onChange={(e)=>importCSV(e.target.files[0])} />
      </label>
    </div>
    {msg&&<div className="text-sm text-gray-600 mt-2">{msg}</div>}
  </div>);
}
