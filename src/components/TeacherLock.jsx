import React from 'react';

const PIN_KEY = 'asd-teacher-pin'; // not secure; demo only
const LOCK_STATE_KEY = 'asd-teacher-unlocked';

export default function TeacherLock({ unlocked, setUnlocked, defaultPin='1234' }){
  React.useEffect(()=>{
    const saved = sessionStorage.getItem(LOCK_STATE_KEY);
    if(saved === 'true') setUnlocked(true);
  }, [setUnlocked]);

  function lock(){ setUnlocked(false); sessionStorage.removeItem(LOCK_STATE_KEY); }
  function tryUnlock(){
    const pin = prompt('Enter teacher PIN'); // simple prompt to keep UI minimal
    const stored = localStorage.getItem(PIN_KEY) || defaultPin;
    if(pin === stored){ setUnlocked(true); sessionStorage.setItem(LOCK_STATE_KEY,'true'); }
    else alert('Incorrect PIN');
  }
  function setPin(){
    const newPin = prompt('Set new teacher PIN (numbers only)', defaultPin);
    if(newPin && /^\d{3,8}$/.test(newPin)){
      localStorage.setItem(PIN_KEY, newPin);
      alert('PIN updated');
    } else if(newPin != null) {
      alert('PIN must be 3-8 digits');
    }
  }

  return (
    <div className="mb-3 flex gap-2 items-center">
      {unlocked
        ? <>
            <span className="text-sm text-emerald-700">Teacher mode unlocked</span>
            <button onClick={lock} className="text-sm px-2 py-1 bg-rose-200 rounded">Lock</button>
            <button onClick={setPin} className="text-sm px-2 py-1 bg-indigo-200 rounded">Set PIN</button>
          </>
        : <button onClick={tryUnlock} className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Unlock Teacher Mode</button>
      }
    </div>
  );
}
