export default function VisualSchedule({ now, next }: { now: string; next: string }) {
  return (
    <div className="mx-auto my-3 max-w-3xl rounded-2xl border p-3 text-center bg-amber-50">
      <div className="flex items-center justify-center gap-4 text-sm sm:text-base font-bold">
        <span className="px-3 py-1 rounded-full bg-green-600 text-white">Now: {now}</span>
        <span className="px-3 py-1 rounded-full bg-blue-600 text-white">Next: {next}</span>
        <span className="px-3 py-1 rounded-full bg-slate-300 text-slate-800">Done</span>
      </div>
    </div>
  );
}