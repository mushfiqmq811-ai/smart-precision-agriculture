import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [moisture, setMoisture] = useState(48);
  const [temp, setTemp] = useState(27.4);
  const [humidity, setHumidity] = useState(62);
  const [ph, setPh] = useState(6.5);

  const [pumpActive, setPumpActive] = useState(false);
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [weather, setWeather] = useState(null);

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => Math.min(100, Math.max(20, +(prev + (Math.random() * 2 - 1)).toFixed(1))));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Live Weather API
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  // Auto Irrigation Logic Trigger
  useEffect(() => {
    if (autoIrrigation) {
      if (moisture < 35) setPumpActive(true);
      else if (moisture > 65) setPumpActive(false);
    }
  }, [moisture, autoIrrigation]);

  return (
    <div className="space-y-6">
      {/* Top Banner Status */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> MQTT BROKER CONNECTED
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Field Zone A-1 Telemetry</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setAutoIrrigation(!autoIrrigation)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              autoIrrigation 
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            AUTO-IRRIGATION: {autoIrrigation ? 'ON' : 'OFF'}
          </button>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">PUMP STATE</p>
            <p className={`text-sm font-black ${pumpActive ? 'text-blue-400' : 'text-slate-500'}`}>
              {pumpActive ? 'PUMPING WATER' : 'STANDBY'}
            </p>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Soil Moisture</span>
            <span className="text-xl">💧</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-emerald-400">{moisture}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">Threshold: 35% - 65%</span>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Ambient Temp</span>
            <span className="text-xl">🌡️</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-400">{temp}°C</span>
            <p className="text-[11px] text-slate-400 mt-1">Optimal Range: 22-30°C</p>
          </div>
          <span className="text-[10px] text-emerald-400 mt-2 block">✓ Healthy Climate</span>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Humidity</span>
            <span className="text-xl">☁️</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-cyan-400">{humidity}%</span>
            <p className="text-[11px] text-slate-400 mt-1">Evapotranspiration Index: Low</p>
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">Updated Live</span>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400">Soil pH Rating</span>
            <span className="text-xl">🧪</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-purple-400">{ph}</span>
            <p className="text-[11px] text-slate-400 mt-1">Nitrogen/Phosphorus Absorption: High</p>
          </div>
          <span className="text-[10px] text-purple-400/80 mt-2 block">Optimal Neutral Soil</span>
        </div>
      </div>

      {/* Control Actuators & External Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actuator Manual Controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Hardware Relay Controls</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="text-xs font-bold text-white">Water Pump Relay #1</p>
                <p className="text-[10px] text-slate-500">Submersible Motor Control</p>
              </div>
              <button 
                disabled={autoIrrigation}
                onClick={() => setPumpActive(!pumpActive)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  pumpActive 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                } ${autoIrrigation ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {pumpActive ? 'STOP PUMP' : 'START PUMP'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-white">Fertigation Valve</p>
                <p className="text-[10px] text-slate-500">Liquid NPK Doser</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">CLOSED</span>
            </div>
          </div>
        </div>

        {/* Live Weather Integration */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Field Meteorological Intelligence</h3>
            <span className="text-xs text-emerald-400 font-mono">Open-Meteo API Sync</span>
          </div>

          {weather ? (
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Air Temperature</p>
                <p className="text-2xl font-black text-white">{weather.temperature}°C</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Wind Velocity</p>
                <p className="text-2xl font-black text-white">{weather.windspeed} km/h</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Weather Code</p>
                <p className="text-2xl font-black text-teal-400">Code #{weather.weathercode}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 animate-pulse">Syncing with Satellite API...</p>
          )}

          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
            💡 <strong>AI Recommendation:</strong> Weather patterns indicate minimal evaporation today. Recommended irrigation cycle reduction by 15%.
          </div>
        </div>
      </div>
    </div>
  );
              }
            
