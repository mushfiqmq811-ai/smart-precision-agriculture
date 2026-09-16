import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moisture, setMoisture] = useState(48);
  const [temp, setTemp] = useState(27.4);
  const [pumpActive, setPumpActive] = useState(false);
  const [weather, setWeather] = useState(null);

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => Math.min(100, Math.max(20, +(prev + (Math.random() * 2 - 1)).toFixed(1))));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Weather
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-lg">
                AgriSmart AI Pro
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">PRECISION IOT PLATFORM</p>
            </div>
          </div>

          <nav className="flex space-x-2">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'ailab', name: 'AI Disease Lab' },
              { id: 'arch', name: 'Architecture' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> IOT CONNECTED
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Field Zone A-1 Telemetry</h2>
              </div>
              <button
                onClick={() => setPumpActive(!pumpActive)}
                className={`px-4 py-2 rounded-lg text-xs font-bold ${
                  pumpActive ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {pumpActive ? 'STOP PUMP' : 'START PUMP'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Soil Moisture</span>
                <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">{moisture}%</h3>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Temperature</span>
                <h3 className="text-3xl font-extrabold text-amber-400 mt-2">{temp}°C</h3>
              </div>
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400">Field Weather (API)</span>
                <h3 className="text-3xl font-extrabold text-cyan-400 mt-2">
                  {weather ? `${weather.temperature}°C` : 'Syncing...'}
                </h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ailab' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-xl mx-auto">
            <h2 className="text-lg font-bold text-white">AI Crop pathology Diagnostics</h2>
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center bg-slate-950/50">
              <span className="text-4xl block mb-2">📸</span>
              <p className="text-xs text-slate-400">Upload leaf imagery for Random Forest ML Inference</p>
            </div>
          </div>
        )}

        {activeTab === 'arch' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white">System Architecture</h2>
            <p className="text-xs text-slate-400">ESP32 Sensors ➔ Cloud MQTT Broker ➔ Random Forest Classifier Model ➔ Automated Relays</p>
          </div>
        )}
      </main>
    </div>
  );
  }
            
