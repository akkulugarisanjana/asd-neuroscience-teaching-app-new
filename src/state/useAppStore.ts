import { create } from "zustand";

export type SkillTab = "communication" | "emotions" | "social" | "progress";
export type Trial = {
  id: string;
  ts: number;
  skill: "communication"|"emotions"|"social";
  question: string;
  answer: string;
  correct: boolean;
  rtMs: number;
};

type Settings = {
  teacherUnlocked: boolean;
  teacherPin: string;
  mute: boolean;
  volume: number; // 0..1
  confettiBigWins: boolean;
  adaptive: boolean;
  lowSensory: boolean;
};

type AppState = {
  tab: SkillTab;
  settings: Settings;
  trials: Trial[];
  setTab: (t: SkillTab) => void;
  setSettings: (p: Partial<Settings>) => void;
  logTrial: (t: Trial) => void;
  clearSession: () => void;
};

const STORAGE_KEY = "asd-core-fixes-v3";

const loadPartial = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
};
const persist = (s: AppState) => {
  const data = { settings: s.settings, trials: s.trials };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const useAppStore = create<AppState>((set, get) => ({
  tab: "communication",
  settings: {
    teacherUnlocked: false,
    teacherPin: "1234",
    mute: true,
    volume: 0.6,
    confettiBigWins: true,
    adaptive: true,
    lowSensory: false,
    ...(loadPartial().settings || {})
  },
  trials: (loadPartial().trials || []),
  setTab: (t) => set({ tab: t }),
  setSettings: (p) => set((s) => {
    const next = { ...s, settings: { ...s.settings, ...p } };
    persist(next as AppState);
    return next;
  }),
  logTrial: (t) => set((s) => {
    const next = { ...s, trials: [...s.trials, t] };
    persist(next as AppState);
    return next;
  }),
  clearSession: () => set((s) => {
    const next = { ...s, trials: [] };
    persist(next as AppState);
    return next;
  }),
}));