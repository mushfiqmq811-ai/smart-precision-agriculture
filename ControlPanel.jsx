import { motion } from "framer-motion";

function ControlPanel({ pumpOn, valveOn, setPumpOn, setValveOn }) {
  const control = (label, value, setter, icon) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">{icon} {label}</p>
          <p className="mt-1 text-xs text-slate-500">Simulated control channel</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setter(!value)}
          aria-pressed={value}
          className={`relative h-8 w-14 rounded-full p-1 transition ${value ? "bg-emerald-500" : "bg-slate-700"}`}
        >
          <span className={`block h-6 w-6 rounded-full bg-white shadow transition ${value ? "translate-x-6" : "translate-x-0"}`} />
        </motion.button>
      </div>
      <p className={`mt-4 text-xs font-bold ${value ? "text-emerald-400" : "text-slate-500"}`}>
        {value ? "ACTIVE — DEMO COMMAND" : "INACTIVE"}
      </p>
    </div>
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {control("Irrigation Pump", pumpOn, setPumpOn, "💧")}
      {control("Field Valve", valveOn, setValveOn, "⚙️")}
    </div>
  );
}
export default ControlPanel;