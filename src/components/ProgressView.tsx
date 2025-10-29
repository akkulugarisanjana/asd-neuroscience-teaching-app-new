import { useMemo } from "react";
import { useAppStore } from "../state/useAppStore";
import { trialsToCSV, downloadCSV } from "../utils/exporters";

type Stat = { acc: number; rt: number; count: number };

export default function ProgressView() {
  const trials = useAppStore(s => s.trials);

  const stats = useMemo(() => {
    const by: Record<string, any[]> = { communication: [], emotions: [], social: [] };
    trials.forEach(t => (by[t.skill] ||= []).push(t));

    const calc = (arr: any[]): Stat => {
      if (!arr.length) return { acc: 0, rt: 0, count: 0 };
      const acc = Math.round(100 * (arr.filter(t => t.correct).length / arr.length));
      const rt = Math.round(arr.reduce((a,t)=>a+t.rtMs,0)/arr.length)/1000;
      return { acc, rt, count: arr.length };
    };

    const recent20 = calc(trials.slice(-20));
    return {
      overall: calc(trials),
      communication: calc(by.communication),
      emotions: calc(by.emotions),
      social: calc(by.social),
      recent20,
    };
  }, [trials]);

  const exportCSV = () => {
    const csv = trialsToCSV(trials);
    downloadCSV(csv, "progress.csv");
  };

  return (
    <section className="rounded-2xl border p-4 bg-white/80">
      <h2 className="text-xl md:text-2xl font-extrabold">Progress</h2>
      <p className="text-sm text-slate-600">
        Last 20: <b>{stats.recent20.acc}%</b> correct · Avg response time: <b>{stats.recent20.rt.toFixed(1)}s</b> · Tries: <b>{stats.recent20.count}</b>
      </p>
      <p className="text-sm text-slate-600">
        Overall: <b>{stats.overall.acc}%</b> correct · Avg response time: <b>{stats.overall.rt.toFixed(1)}s</b> · Tries: <b>{stats.overall.count}</b>
      </p>

      <div className="mt-4 space-y-3">
        <Bar label="Communication" pct={stats.communication.acc} />
        <Bar label="Emotions" pct={stats.emotions.acc} />
        <Bar label="Social Skills" pct={stats.social.acc} />
      </div>

      <div className="mt-4">
        <button className="btn-primary" onClick={exportCSV}>Share Progress (CSV)</button>
      </div>
    </section>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
        <div className="h-3 bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
