export function beep(enabled=true, volume=0.5, freq=880, type='sine', duration=0.08){
  if(!enabled) return;
  try {
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type=type; o.frequency.value=freq;
    g.gain.value = 0.05 * volume;
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + duration);
  } catch {}
}
