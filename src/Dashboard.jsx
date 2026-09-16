import { useState } from "react";
import { motion } from "framer-motion";
import PageContainer from "../components/layout/PageContainer";
import SensorCard from "../components/dashboard/SensorCard";
import StatusBar from "../components/dashboard/StatusBar";
import ControlPanel from "../components/dashboard/ControlPanel";
import ChartPanel from "../components/dashboard/ChartPanel";
import EnvironmentChart from "../components/dashboard/EnvironmentChart";
import { useMockSensors } from "../hooks/useMockSensors";

function Dashboard() {
  const [paused, setPaused] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [valveOn, setValveOn] = useState(false);
  const { sensors, history, lastSync } = useMockSensors(paused);

  const sensorCards = [
    { icon: "💧", label: "Soil Moisture", value: sensors.soilMoisture, unit: "%", status: sensors.soilMoisture < 45 ? "Low" : "Optimal", tone: "emerald", description: "Root-zone moisture level" },
    { icon: "N", label: "Nitrogen", value: sensors.nitrogen, unit: "mg/kg", status: "Monitor", tone: "cyan", description: "Simulated soil nutrient reading" },
    { icon: "P", label: "Phosphorus", value: sensors.phosphorus, unit: "mg/kg", status: "Monitor", tone: "cyan", description: "Simulated soil nutrient reading" },
    { icon: "K", label: "Potassium", value: sensors.potassium, unit: "mg/kg", status: "Monitor", tone: "cyan", description: "Simulated soil nutrient reading" },
    { icon: "pH", label: "Soil pH", value: sensors.soilPH, unit: "", status: sensors.soilPH >= 6 && sensors.soilPH <= 7 ? "Balanced" : "Check", tone: "amber", description: "Acidity / alkalinity indicator" },
    { icon: "🌡️", label: "Temperature", value: sensors.temperature, unit: "°C", status: "Live Demo", tone: "amber", description: "Ambient temperature" },
    { icon: "◌", label: "Humidity", value: sensors.humidity, unit: "%", status: "Live Demo", tone: "cyan", description: "Ambient relative humidity" },
  ];

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Field monitoring</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Live Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Real-time-style agricultural telemetry with a safe, clearly labeled simulation layer.
            </p>
          </div>
          <button
            onClick={() => setPaused((value) => !value)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            {paused ? "▶ Resume Simulation" : "Ⅱ Pause Simulation"}
          </button>
        </div>

        <StatusBar isPaused={paused} pumpOn={pumpOn} lastSync={lastSync} />

        <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
          <p className="text-xs font-bold text-amber-300">DEMO DATA NOTICE</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            All values on this page are simulated for demonstration. They are not readings from a physical sensor and are not evidence of agricultural performance.
          </p>
        </div>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Sensor telemetry</h2>
            <span className="text-[11px] text-slate-600">Auto-refresh simulation</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {sensorCards.map((card) => <SensorCard key={card.label} {...card} />)}
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <ChartPanel history={history} />
          <EnvironmentChart history={history} />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Precision control</p>
            <h2 className="mt-1 text-lg font-black text-white">Irrigation controls</h2>
            <p className="mt-1 text-xs text-slate-500">
              These switches simulate commands only. Hardware/API control will be connected in a later stage.
            </p>
          </div>
          <ControlPanel pumpOn={pumpOn} valveOn={valveOn} setPumpOn={setPumpOn} setValveOn={setValveOn} />
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["24H", "Historical view", "Chart-ready telemetry window"],
            ["7D", "Extended analytics", "Planned historical view"],
            ["API", "Hardware control", "Planned backend integration"],
          ].map(([value, title, note]) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-lg font-black text-white">{value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-300">{title}</p>
              <p className="mt-1 text-xs text-slate-600">{note}</p>
            </div>
          ))}
        </section>
      </motion.div>
    </PageContainer>
  );
}

export default Dashboard;
