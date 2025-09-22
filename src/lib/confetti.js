import confetti from 'canvas-confetti';
export function burstConfetti() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#7c3aed','#22c55e','#06b6d4','#f59e0b','#ef4444'] });
}
