import React from 'react';
const tabs=[
  {key:'communication',label:'🗣️ Communication'},
  {key:'emotion',label:'😊 Emotions'},
  {key:'social',label:'🤝 Social Skills'},
  {key:'progress',label:'📊 Progress'}
];
export default function Navbar({setTab,active}){
  return (<header className="p-4 bg-indigo-600/95 text-white shadow-md rounded-b-2xl">
    <nav className="max-w-4xl mx-auto flex gap-3 justify-around items-center">
      <div className="text-lg font-semibold">ASD Intervention App</div>
      <div className="flex gap-2">{tabs.map(t=>(
        <button key={t.key} onClick={()=>setTab(t.key)} className={"px-3 py-2 rounded-lg transition "+(active===t.key?'bg-white/20':'hover:bg-white/10')} aria-pressed={active===t.key}>{t.label}</button>
      ))}</div>
    </nav>
  </header>);
}
