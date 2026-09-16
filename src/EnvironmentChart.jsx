import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function EnvironmentChart({ history }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
      <div className="mb-5">
        <p className="text-sm font-bold text-white">Environmental trend</p>
        <p className="mt-1 text-xs text-slate-500">Temperature and humidity • simulated</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis yAxisId="temp" domain={[15, 40]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="humidity" orientation="right" domain={[30, 100]} hide />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#94a3b8" }}
              formatter={(value, name) => [name === "temperature" ? `${value}°C` : `${value}%`, name === "temperature" ? "Temperature" : "Humidity"]}
            />
            <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#06B6D4" strokeWidth={2.5} dot={false} />
            <Line yAxisId="humidity" type="monotone" dataKey="humidity" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default EnvironmentChart;
