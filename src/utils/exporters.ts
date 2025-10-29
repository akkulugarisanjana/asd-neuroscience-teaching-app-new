import Papa from "papaparse";
import type { Trial } from "../state/useAppStore";

export function trialsToCSV(trials: Trial[]) {
  return Papa.unparse(trials.map(t => ({
    timestamp: new Date(t.ts).toISOString(),
    skill: t.skill,
    question: t.question,
    answer: t.answer,
    correct: t.correct ? 1 : 0,
    response_time_s: (t.rtMs/1000).toFixed(2)
  })));
}

export function downloadCSV(name: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}