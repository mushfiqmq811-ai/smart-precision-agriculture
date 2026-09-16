function StatusBar({ isPaused, pumpOn, lastSync }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-xs font-bold text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          ONLINE
        </span>
        <span className="rounded-full border border-amber-400/15 bg-amber-400/5 px-3 py-1.5 text-xs font-bold text-amber-300">
          DEMO / MOCK MODE
        </span>
        <span className="rounded-full border border-slate-800 px-3 py-1.5 text-xs text-slate-500">
          {pumpOn ? "Pump: ON" : "Pump: OFF"}
        </span>
      </div>
      <div className="text-xs text-slate-500">
        {isPaused ? "Simulation paused" : `Last sync ${lastSync}`}
      </div>
    </div>
  );
}
export default StatusBar;