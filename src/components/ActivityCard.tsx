import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import { useAppStore } from "../state/useAppStore";

const pop = new Howl({ src: ["/sounds/pop.mp3", "/sounds/pop.wav"], volume: 0.6 });

type Choice = { id: string; label: string; correct?: boolean };
type Props = {
  skill: "communication"|"emotions"|"social";
  prompt: string;
  choices: Choice[];
  /** Optional: path to an audio file for the prompt (e.g., "/sounds/prompt01.mp3"). */
  audioSrc?: string;
  onCompleted?: (correct: boolean, rtMs: number) => void;
};

export default function ActivityCard({ skill, prompt, choices, audioSrc, onCompleted }: Props) {
  const { settings, logTrial, trials } = useAppStore();
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showTry, setShowTry] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);
  const startRef = useRef<number>(performance.now());

  // Simple adaptive: 2-3-4 choices based on last-20 accuracy
  const displayedChoices = useMemo(() => {
    if (!settings.adaptive) return choices;
    const recent = trials.slice(-20);
    const acc = recent.length ? recent.filter(t=>t.correct).length/recent.length : 0.7;
    if (acc >= 0.8) return choices.slice(0, Math.min(4, choices.length));
    if (acc < 0.6)  return choices.filter(c=>c.correct || Math.random()<0.5).slice(0,2);
    return choices.slice(0,3);
  }, [choices, trials, settings.adaptive]);

  const speakPrompt = () => {
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(prompt);
        utter.rate = 0.95;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      }
    } catch {}
  };

  const promptHowl = useMemo(() => {
    if (!audioSrc) return null;
    try {
      return new Howl({ src: [audioSrc], volume: Math.min(1, Math.max(0, settings.volume)) });
    } catch {
      return null;
    }
  }, [audioSrc, settings.volume]);

  const handlePauseToggle = () => setPaused(p => !p);

  const handleRepeat = () => {
    if (promptHowl) { try { promptHowl.stop(); promptHowl.play(); } catch {} }
    else { speakPrompt(); }
    const node = document.getElementById("prompt-text");
    if (node) {
      node.classList.remove("pulse-once");
      void (node as any).offsetWidth;
      node.classList.add("pulse-once");
      setTimeout(() => node.classList.remove("pulse-once"), 700);
    }
  };

  const handleSelect = (c: Choice) => {
    if (paused || locked) return;
    const rt = performance.now() - startRef.current;
    const correct = !!c.correct;
    setLocked(true);

    logTrial({
      id: crypto.randomUUID(),
      ts: Date.now(),
      skill,
      question: prompt,
      answer: c.label,
      correct,
      rtMs: Math.round(rt),
    });

    if (correct) {
      // Small star + pop for correct
      if (!settings.mute && !settings.lowSensory) pop.volume(settings.volume).play();
      setShowStar(true);
      setTimeout(() => setShowStar(false), 700);

      // Big confetti only for big wins (first correct this session)
      const anyCorrect = trials.some(t => t.correct);
      if (!settings.lowSensory && settings.confettiBigWins && !anyCorrect) {
        confetti({ particleCount: 28, spread: 60, startVelocity: 35, origin: { y: 0.6 } });
      }

      onCompleted?.(true, rt);
      setTimeout(() => { setLocked(false); }, 350);
    } else {
      navigator.vibrate?.(80);
      setShowTry(true);
      const right = displayedChoices.find(x=>x.correct);
      if (right) {
        setFlashId(right.id);
        // wiggle the correct one briefly
        setTimeout(()=> setFlashId(null), 900);
      }
      onCompleted?.(false, rt);
      setLocked(false);
    }
  };

  return (
    <div className="rounded-2xl border p-4 bg-white/80 relative overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-2 mb-2">
        <button
          type="button"
          className="btn btn-secondary"
          aria-pressed={paused}
          onClick={handlePauseToggle}
        >
          {paused ? (<span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            Resume
          </span>) : (<span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
            Pause
          </span>)}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleRepeat}>
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M17 1l4 4-4 4V6H7a5 5 0 100 10h3v2H7a7 7 0 110-14h10V1zM20 13a7 7 0 01-7 7h-1v-2h1a5 5 0 000-10h-3V6h3a7 7 0 017 7z"/>
            </svg>
            Repeat
          </span>
        </button>
      </div>

      {/* Prompt */}
      <p className="text-base md:text-lg font-semibold text-slate-800">Tap the right answer.</p>
      <h2 id="prompt-text" className="mt-1 text-xl md:text-2xl font-extrabold">{prompt}</h2>

      {/* Try again text */}
      {showTry && <p className="mt-2 text-sm font-semibold text-amber-700">Try again</p>}

      {/* Choices */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {displayedChoices.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(c)}
            disabled={paused || locked}
            aria-disabled={paused || locked}
            className={`btn text-left justify-start border bg-slate-50 hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed ${flashId === c.id ? "ring-2 ring-green-500 wiggle-right" : ""}`}
          >
            {c.label}
          </motion.button>
        ))}
      </div>

      {/* Star animation */}
      {showStar && !settings.lowSensory && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="star-burst" aria-hidden="true">★</div>
        </div>
      )}
    </div>
  );
}
