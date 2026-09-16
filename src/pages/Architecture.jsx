import React from 'react';

export default function Architecture() {
  const specs = [
    { title: 'Microcontroller', desc: 'ESP32 Dual-Core 240MHz with Wi-Fi/BLE Transceiver' },
    { title: 'Soil Sensor Suite', desc: 'Capacitive Soil Moisture v1.2 + NPK Probe + RS485 Modbus' },
    { title: 'Machine Learning Model', desc: 'Random Forest Classifier deployed via REST Endpoint' },
    { title: 'Actuator Layer', desc: '5V Optocoupler 4-Channel Relay driving 12V DC Solenoids' }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 className="text-xl font-bold text-white">System Architecture & IoT Engineering</h2>
        <p className="text-xs text-slate-400 mt-1">End-to-End hardware data flow and cloud ingestion pipeline.</p>
      </div>

      {/* Hardware Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specs.map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-mono text-emerald-400">LAYER 0{idx + 1}</span>
            <h4 className="text-sm font-bold text-white">{item.title}</h4>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Pipeline Visual Block */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Edge-to-Cloud Pipeline Workflow</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-2xl">📡</span>
            <h5 className="text-xs font-bold text-white mt-2">1. Edge Sensing</h5>
            <p className="text-[11px] text-slate-500 mt-1">Sensors transmit raw electrical telemetry to ESP32 board every 5s.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-2xl">⚡</span>
            <h5 className="text-xs font-bold text-white mt-2">2. ML Decision Engine</h5>
            <p className="text-[11px] text-slate-500 mt-1">Cloud algorithm evaluates soil moisture threshold vs evapotranspiration rate.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-2xl">🌊</span>
            <h5 className="text-xs font-bold text-white mt-2">3. Actuator Trigger</h5>
            <p className="text-[11px] text-slate-500 mt-1">Automated command sent to active relays to open/close drip valves.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
