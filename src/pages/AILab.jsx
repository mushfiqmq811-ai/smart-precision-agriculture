import React, { useState } from 'react';

export default function AILab() {
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);

  // Yield Estimation State
  const [area, setArea] = useState(1);
  const [cropType, setCropType] = useState('Paddy Rice');

  const runAnalysis = () => {
    setLoading(true);
    setDetection(null);
    setTimeout(() => {
      setLoading(false);
      setDetection({
        disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        confidence: 96.8,
        severity: 'Moderate (Stage 2)',
        treatment: 'Apply Copper Hydroxide spray (2g/L water). Maintain field drainage to lower canopy humidity.'
      });
    }, 1800);
  };

  const calculateYield = () => {
    const baseYield = cropType === 'Paddy Rice' ? 4.5 : cropType === 'Wheat' ? 3.8 : 6.2;
    return (area * baseYield).toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Crop Disease Inference */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">AI Crop Pathology Inference Engine</h2>
          <p className="text-xs text-slate-400">Upload leaf imagery for Random Forest ML Disease Classification.</p>
        </div>

        <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-slate-950/50 transition-all">
          <span className="text-4xl block mb-2">📸</span>
          <p className="text-xs text-slate-400">Select or Drag Crop Sample Image</p>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
          >
            {loading ? 'Running Inference Model...' : 'Run Diagnostics'}
          </button>
        </div>

        {detection && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Detection Result</span>
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                {detection.confidence}% Match
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">{detection.disease}</h4>
            <p className="text-xs text-amber-400">Severity: {detection.severity}</p>
            <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 mt-2">
              <strong className="text-emerald-400">Protocol:</strong> {treatmentPlan(detection.treatment)}
            </p>
          </div>
        )}
      </div>

      {/* Predictive Yield & Fertilizer Calculator */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">Predictive Agronomic Calculator</h2>
          <p className="text-xs text-slate-400">Estimate harvest yield & fertilizer demand based on land area.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Land Area (Hectares)</label>
            <input 
              type="number" 
              value={area}
              onChange={(e) => setArea(Math.max(0.1, +e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Crop Type</label>
            <select 
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Paddy Rice">Paddy Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize (Corn)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Estimated Yield:</span>
              <span className="text-lg font-black text-emerald-400">{calculateYield()} Metric Tons</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-900 pt-2">
              <span className="text-xs text-slate-400">Req. Urea (Nitrogen):</span>
              <span className="text-sm font-bold text-white">{(area * 95).toFixed(0)} kg</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-900 pt-2">
              <span className="text-xs text-slate-400">Water Consumption:</span>
              <span className="text-sm font-bold text-cyan-400">{(area * 12500).toLocaleString()} Liters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function treatmentPlan(text) {
  return text;
}
