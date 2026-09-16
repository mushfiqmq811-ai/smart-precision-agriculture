import { motion } from "framer-motion";

function SensorCard({ icon, label, value, unit, status="Normal", tone="emerald", description }) {
  const tones = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/10",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/10",
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${tones[tone]}`}>{icon}</div>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-400">{status}</span>
      </div>
      <p className="mt-4 text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-end gap-1">
        <span className="text-2xl font-black tracking-tight text-white">{value}</span>
        <span className="mb-1 text-xs font-semibold text-slate-500">{unit}</span>
      </div>
      {description && <p className="mt-2 text-[11px] leading-4 text-slate-600">{description}</p>}
    </motion.div>
  );
}

export default SensorCard;