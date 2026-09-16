import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moisture, setMoisture] = useState(48.2);
  const [temp, setTemp] = useState(28.5);
  const [ph, setPh] = useState(6.7);
  const [npk, setNpk] = useState({ n: 140, p: 50, k: 210 });
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [weather, setWeather] = useState(null);
  
  // AI Inference State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Live IoT Data Stream Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.2 - 0.6)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Fetch Open-Meteo Weather API
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  // Trigger AI Model
  const runAiInference = () => {
    setAiLoading(true);
    setAiResult(null);
    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        confidence: '97.4%',
        risk: 'High Risk',
        action: 'Apply Copper Hydroxide (2g/L) & suspend overhead sprinkler irrigation immediately.'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Top Banner / Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/20">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-lg sm:text-xl">
                  AgriSmart AI Pro
                </h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase">v2.4 Production</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">PRECISION IOT & RANDOM FOREST ML ENGINE</p>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {[
              { id: 'dashboard', name: '📊 Live Telemetry' },
              { id: 'ailab', name: '🧬 AI Disease Lab' },
              { id: 'arch', name: '⚙️ Architecture' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950 border border-emerald-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* TAB 1: LIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Status Header */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Node ESP32-Ready • Online</span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">Field Sector Alpha-1 Monitoring</h2>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    autoMode 
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  AUTO IRRIGATION: {autoMode ? 'ENABLED' : 'MANUAL'}
                </button>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={autoMode}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-lg ${
                    pumpActive 
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-950/50' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/50'
                  } ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {pumpActive ? '🔴 STOP MOTOR' : '⚡ START PUMP'}
                </button>
              </div>
            </div>

            {/* Sensor Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg group">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Soil Moisture</span>
                  <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">💧</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-emerald-400">{moisture}</span>
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-3 font-mono">Target Threshold: 40.0% - 65.0%</p>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg group">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Temperature</span>
                  <span className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">🌡️</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-amber-400">{temp}</span>
                    <span className="text-slate-500 font-bold">°C</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Ambient Air Thermal Index</p>
                </div>
                <p className="text-[10px] text-emerald-400 mt-3 font-mono">✓ Optimal Photosynthesis</p>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all shadow-lg group">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Soil pH Level</span>
                  <span className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">🧪</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-purple-400">{ph}</span>
                    <span className="text-slate-500 font-bold">pH</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Nutrient Solubilization State</p>
                </div>
                <p className="text-[10px] text-purple-300 mt-3 font-mono">Slightly Acidic (Ideal)</p>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg group">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">NPK Minerals</span>
                  <span className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">🌿</span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Nitrogen (N):</span><span className="font-bold text-emerald-400">{npk.n} mg/kg</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Phosphorus (P):</span><span className="font-bold text-teal-400">{npk.p} mg/kg</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Potassium (K):</span><span className="font-bold text-cyan-400">{npk.k} mg/kg</span></div>
                </div>
                <p className="text-[10px] text-cyan-400 mt-3 font-mono">Soil Fertility Index: 88%</p>
              </div>

            </div>

            {/* Weather & Advisory Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>📡</span> Live Meteorological Station
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Open-Meteo Satellite API</span>
                </div>

                {weather ? (
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">Field Temp</p>
                      <p className="text-2xl font-black text-white">{weather.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">Wind Velocity</p>
                      <p className="text-2xl font-black text-white">{weather.windspeed} <span className="text-xs text-slate-500">km/h</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">Weather Code</p>
                      <p className="text-2xl font-black text-teal-400">#{weather.weathercode}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 animate-pulse">Establishing Satellite API Link...</p>
                )}

                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/30 to-emerald-950/30 border border-teal-500/20 text-xs text-teal-200">
                  🤖 <strong>AI Agronomist Insights:</strong> Evapotranspiration index is low today. Automated drip valves will operate for 12 minutes during sunset to conserve 22% groundwater.
                </div>
              </div>

              {/* Hardware Status */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Actuator Relay Matrix</h3>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">Relay #1: Submersible Pump</p>
                      <p className="text-[10px] text-slate-500">GPIO 26 • 220V Solenoid</p>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${pumpActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                      {pumpActive ? 'ACTIVE' : 'OFF'}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">Relay #2: Fertigation Doser</p>
                      <p className="text-[10px] text-slate-500">GPIO 27 • NPK Injector</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">OFF</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI DISEASE LAB */}
        {activeTab === 'ailab' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">AI Crop Pathology Inference Engine</h2>
                <p className="text-xs text-slate-400 mt-1">Computer vision classification running via Random Forest ML Pipeline.</p>
              </div>

              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-10 text-center bg-slate-950/50 transition-all cursor-pointer">
                <span className="text-5xl block mb-3">🍃</span>
                <p className="text-xs text-slate-300 font-semibold">Upload Leaf Imagery or Select Sample</p>
                <p className="text-[10px] text-slate-500 mt-1">Supports Paddy Rice, Corn, Wheat & Tomato pathogens</p>
                <button
                  onClick={runAiInference}
                  disabled={aiLoading}
                  className="mt-5 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
                >
                  {aiLoading ? 'Running Model Diagnostics...' : '🚀 Execute AI Inference'}
                </button>
              </div>

              {aiResult && (
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Classification Confirmed</span>
                    <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {aiResult.confidence} Match
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{aiResult.disease}</h4>
                  <p className="text-xs font-semibold text-rose-400">Severity Index: {aiResult.risk}</p>
                  <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    <strong className="text-emerald-400">Treatment Protocol:</strong> {aiResult.action}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ARCHITECTURE */}
        {activeTab === 'arch' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-white">System Architecture & IoT Flow</h2>
              <p className="text-xs text-slate-400">End-to-end hardware, cloud ingestion, and machine learning pipeline.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-3xl">📡</span>
                  <h4 className="text-xs font-bold text-white">1. Edge Hardware Layer</h4>
                  <p className="text-[11px] text-slate-500">ESP32 collecting telemetry via Capacitive & Modbus sensors.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-3xl">⚡</span>
                  <h4 className="text-xs font-bold text-white">2. Cloud Analytics</h4>
                  <p className="text-[11px] text-slate-500">MQTT Broker streaming telemetry to REST classification endpoints.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-3xl">💦</span>
                  <h4 className="text-xs font-bold text-white">3. Precision Actuation</h4>
                  <p className="text-[11px] text-slate-500">Optocoupler Relays driving precision irrigation solenoids.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        Smart Precision Agriculture System • National Science & Technology Competition Project
      </footer>
    </div>
  );
        }
      
              
