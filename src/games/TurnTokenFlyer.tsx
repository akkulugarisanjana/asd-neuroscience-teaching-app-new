import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../state/useAppStore";

type Ring = { x: number; y: number; label: "My Turn"|"Your Turn"; hit?: boolean };

export default function TurnTokenFlyer() {
  const { logTrial, settings } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ good:0, total:0 });
  const vyRef = useRef<number>(0);
  const yRef = useRef<number>(150);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    let t=0;
    let rings: Ring[] = [];
    const W = 360, H = 300;
    cvs.width = W; cvs.height = H;

    const spawn = () => {
      const isMine = Math.random() < 0.5;
      rings.push({ x: W+40, y: 60+Math.random()*180, label: isMine ? "My Turn":"Your Turn" });
    };

    const tick = () => {
      t++;
      if (t%100===0) spawn();
      ctx.clearRect(0,0,W,H);
      // gravity
      vyRef.current += 0.5; yRef.current += vyRef.current;
      if (yRef.current>H-15) { yRef.current=H-15; vyRef.current=0; }
      if (yRef.current<15){ yRef.current=15; vyRef.current=0; }
      // player
      ctx.beginPath(); ctx.arc(60,yRef.current,15,0,Math.PI*2); ctx.fillStyle="#2563eb"; ctx.fill();
      // rings
      rings.forEach(r => {
        r.x -= 2;
        ctx.beginPath(); ctx.arc(r.x,r.y,16,0,Math.PI*2);
        ctx.strokeStyle = r.label==="My Turn" ? "#16a34a" : "#ef4444"; ctx.lineWidth=4; ctx.stroke();
        ctx.font = "12px system-ui"; ctx.fillStyle="#111"; ctx.fillText(r.label, r.x-25, r.y+30);
        // collision
        const dx = r.x-60, dy=r.y-yRef.current;
        if (!r.hit && Math.hypot(dx,dy) < 31) {
          r.hit = true;
          const correct = r.label==="My Turn";
          setScore(s => ({ good: s.good + (correct?1:0), total: s.total+1 }));
          logTrial({ id: crypto.randomUUID(), ts: Date.now(), skill:"social",
            question:"Turn-taking ring", answer:r.label, correct, rtMs:0 });
          if (!correct) navigator.vibrate?.(60);
        }
      });
      rings = rings.filter(r => r.x>-30);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [logTrial, settings.lowSensory]);

  const flap = () => { vyRef.current = -7; if (!settings.lowSensory) navigator.vibrate?.(10); };

  return (
    <div className="rounded-2xl border p-3 select-none">
      <div className="mb-2 font-semibold">Collect only <span className="text-green-700">“My Turn”</span> rings.</div>
      <canvas ref={canvasRef} className="w-full border rounded-lg" aria-label="Turn taking game canvas"
        onPointerDown={flap} />
      <p className="mt-2 text-sm">You waited your turn {score.good}/{score.total} times!</p>
    </div>
  );
}