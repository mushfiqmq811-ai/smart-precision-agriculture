import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ChartPanel({ history }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-white">24-hour sensor trend</p>
          <p className="mt-1 text-xs text-slate-500">Simulated telemetry • updates automatically</p>
        </div>
        <span className="hidden rounded-lg bg-slate-800 px-2.5 py-1.5 text-[10px] font-bold text-slate-500 sm:inline">
          LAST 24H
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis domain={[30, 80]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#34d399" }}
              formatter={(value) => [`${value}%`, "Soil moisture"]}
            />
            <Area type="monotone" dataKey="soilMoisture" stroke="#10B981" strokeWidth={2.5} fill="url(#moistureFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default ChartPanel;
