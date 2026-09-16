import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('all');

  // Telemetry Metrics
  const [moisture, setMoisture] = useState(52.4);
  const [temp, setTemp] = useState(27.8);
  const [ph, setPh] = useState(6.6);
  const [npk] = useState({ n: 148, p: 65, k: 218 });

  // Drone Radar & Controls
  const [droneStatus, setDroneStatus] = useState('Patrolling Zone Alpha');
  const [droneThermal, setDroneThermal] = useState('Optimal (31.2°C Field Heat)');
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  // Weather & Forecast
  const [weather, setWeather] = useState(null);

  // AI Diagnostic
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Profit Calculator
  const [landSize, setLandSize] = useState(33);
  const [cropType, setCropType] = useState('rice');

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.6 - 0.8)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setAiResult(null);
    }
  };

  const runAiDiagnostics = () => {
    if (!selectedImage) {
      alert(lang === 'en' ? "Please upload a leaf sample first!" : "অনুগ্রহ করে একটি পাতার ছবি দিন!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'en' ? 'Bacterial Leaf Blight (Xanthomonas oryzae)' : 'ব্যাকটেরিয়াল লিফ ব্লাইট',
        confidence: '99.6% Match',
        severity: lang === 'en' ? 'Stage 2 — Moderate Infection' : 'দ্বিতীয় পর্যায় — মাঝারি ঝুঁকি',
        symptoms: lang === 'en' ? 'Lesions on leaf margins, systemic wilting, reduced photosynthesis.' : 'পাতার কিনারা বিবর্ণ হওয়া এবং ছানি পড়া।',
        treatment: lang === 'en' ? 'Apply Copper Hydroxide (2g/L water) or Streptomycin. Drain excess field water.' : 'কপার হাইড্রক্সাইড স্প্রে করুন এবং পানি নিষ্কাশন করুন।',
        roiProtection: lang === 'en' ? 'Estimated Crop Yield Protected: ৳২২,৫০০' : 'রক্ষিত সম্ভাব্য ফসলের মূল্য: ৳২২,৫০০',
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col w-full overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Hyper Holographic Animated Backdrop */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none animate-float"></div>
      <div className="fixed top-1/3 -right-40 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[190px] pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="fixed -bottom-40 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none animate-float" style={{ animationDelay: '1.5s' }}></div>

      {/* Futuristic Header */}
      <header className="border-b border-slate-800/80 bg-[#060a17]/90 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl shadow-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 rounded-2xl shadow-xl shadow-cyan-500/20 group">
                <span className="text-xl block">🛸</span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400 text-xl tracking-tight">
                    AgriNexus <span className="text-white text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono tracking-widest">v4.0 HYPER</span>
                  </h1>
                </div>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Autonomous Drone & IoT Neural Matrix</p>
              </div>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="md:hidden px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-cyan-400 border border-slate-800"
            >
              🌐 {lang === 'en' ? 'BN' : 'EN'}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', en: '⚡ Hyper Overview', bn: '⚡ ওভারভিউ' },
              { id: 'drone', en: '🛸 Live Drone & Radar', bn: '🛸 ড্রোন ও রাডার' },
              { id: 'telemetry', en: '📊 IoT Telemetry', bn: '📊 ডাটা ম্যাট্রিক্স' },
              { id: 'ailab', en: '🧬 Neural Disease Lab', bn: '🧬 নিউরাল ল্যাব' },
              { id: 'profit', en: '💎 Profit & ROI Engine', bn: '💎 মুনাফা প্রজেক্টর' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-105'
                    : 'text-slate-400 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {lang === 'en' ? tab.en : tab.bn}
              </button>
            ))}

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="hidden md:block px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-all"
            >
              🌐 {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">

        {/* FEATURE 1: AUTONOMOUS DRONE SURVEILLANCE & RADAR */}
        {(activeTab === 'all' || activeTab === 'drone') && (
          <section className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              
              <div className="space-y-4 max-w-xl">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                  Autonomous Aerial Reconnaissance
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {lang === 'en' ? 'Live Autonomous Drone & Thermal Mapping' : 'লাইভ ড্রোন নজরদারি ও থার্মাল ম্যাপিং'}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'en' 
                    ? 'AgriNexus Sentinel-X Drone is scanning field sector 4B for crop stress, pest hot-spots, and uneven hydration zones.' 
                    : 'আগ্রিনেক্সাস সেন্টিনেল ড্রোন মাঠের শস্যের স্বাস্থ্য ও ক্ষতিকারক পোকার উপস্থিতি পর্যবেক্ষণ করছে।'}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">DRONE FLIGHT STATUS</span>
                    <span className="text-emerald-400 font-bold">{droneStatus}</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">FIELD THERMAL SCORE</span>
                    <span className="text-cyan-400 font-bold">{droneThermal}</span>
                  </div>
                </div>
              </div>

              {/* Holographic Radar Visualizer */}
              <div className="w-full lg:w-72 h-72 bg-slate-950/90 rounded-3xl border border-cyan-500/40 relative flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Radar Grid Circles */}
                <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20"></div>
                <div className="absolute w-40 h-40 rounded-full border border-cyan-500/30"></div>
                <div className="absolute w-24 h-24 rounded-full border border-cyan-500/40"></div>
                <div className="absolute w-full h-[1px] bg-cyan-500/20"></div>
                <div className="absolute h-full w-[1px] bg-cyan-500/20"></div>

                {/* Sweeping Radar Beam */}
                <div className="absolute w-28 h-28 top-8 right-8 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-tl-full animate-radar origin-bottom-left"></div>

                {/* Target Ping Points */}
                <div className="absolute top-16 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 right-16 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>

                <div className="absolute bottom-3 text-center">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">RADAR SWEEP ACTIVE</span>
                </div>
              </div>

            </div>
          </section>
        )}
        {/* FEATURE 2: LIVE IOT TELEMETRY MATRIX & LIVE GRAPH */}
        {(activeTab === 'all' || activeTab === 'telemetry') && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">ESP32 Telemetry Matrix • Connected</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {lang === 'en' ? 'Live Telemetry & Sensor Analytics' : 'লাইভ সেন্সর ডাটা পরিমাপ কেন্দ্র'}
                </h2>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    autoMode ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {lang === 'en' ? `Smart Valve: ${autoMode ? 'AUTO' : 'MANUAL'}` : `স্মার্ট ভালভ: ${autoMode ? 'স্বয়ংক্রিয়' : 'ম্যানুয়াল'}`}
                </button>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={autoMode}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-xl ${
                    pumpActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  } ${autoMode ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {pumpActive ? '🔴 STOP MOTOR' : '⚡ START MOTOR'}
                </button>
              </div>
            </div>

            {/* Metric Display Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Soil Moisture' : 'আর্দ্রতা'}</span>
                  <span className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-400">💧</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-emerald-400 font-mono">{moisture}</span>
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400 font-mono mt-4">✓ Optimal Root Range</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Ambient Temp' : 'তাপমাত্রা'}</span>
                  <span className="p-2.5 bg-amber-500/10 rounded-2xl text-amber-400">🌡️</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-amber-400 font-mono">{temp}</span>
                    <span className="text-slate-500 font-bold">°C</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Thermal Score: 94%</p>
                </div>
                <p className="text-[10px] text-amber-400 font-mono mt-4">✓ Normal Microclimate</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Soil pH Score' : 'মাটির pH'}</span>
                  <span className="p-2.5 bg-purple-500/10 rounded-2xl text-purple-400">🧪</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-purple-400 font-mono">{ph}</span>
                    <span className="text-slate-500 font-bold">pH</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Nutrient Absorbability: High</p>
                </div>
                <p className="text-[10px] text-purple-300 font-mono mt-4">Slightly Acidic (Ideal)</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'NPK Spectrum' : 'এনপিকে মাত্রা'}</span>
                  <span className="p-2.5 bg-cyan-500/10 rounded-2xl text-cyan-400">🌿</span>
                </div>
                <div className="mt-3 space-y-1 text-xs font-mono">
                  <div className="flex justify-between"><span className="text-slate-400">Nitrogen:</span><span className="font-bold text-emerald-400">{npk.n} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phosphorus:</span><span className="font-bold text-teal-400">{npk.p} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Potassium:</span><span className="font-bold text-cyan-400">{npk.k} mg/kg</span></div>
                </div>
                <p className="text-[10px] text-cyan-400 font-mono mt-3">Fertility Score: 91/100</p>
              </div>

            </div>

            {/* Dynamic Interactive SVG Graph */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <span className="text-cyan-400">📈</span>
                    <span>{lang === 'en' ? 'Live Telemetry Waveform Curve' : 'লাইভ আর্দ্রতা ও তাপমাত্রা ওয়েভফর্ম'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">Real-time IoT stream feeds updating continuously.</p>
                </div>
              </div>

              <div className="w-full h-44 bg-slate-950/90 rounded-2xl p-4 border border-slate-800 relative overflow-hidden flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4" />

                  <path d="M 0 90 Q 125 60, 250 80 T 500 50" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6" />
                  <path d="M 0 50 Q 125 15, 250 40 T 500 25" fill="none" stroke="#06b6d4" strokeWidth="3.5" />

                  <circle cx="500" cy="25" r="5" fill="#06b6d4" className="animate-pulse" />
                  <circle cx="500" cy="50" r="4" fill="#f59e0b" />
                </svg>
              </div>
            </div>
          </section>
        )}
        {/* FEATURE 3: NEURAL DISEASE LAB */}
        {(activeTab === 'all' || activeTab === 'ailab') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  Computer Vision Diagnostics
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'en' ? 'Neural Crop Leaf Disease Classifier' : 'নিউরাল রোগ নির্ণয় ল্যাব'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-3xl p-6 text-center bg-slate-950/70 transition-all flex flex-col items-center justify-center min-h-[200px]">
                  {selectedImage ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Crop Leaf Sample" className="w-full h-full object-cover" />
                      <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-2 text-xs hover:bg-rose-600">✕</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl block mb-2">📸</span>
                      <p className="text-xs text-slate-300 font-bold">Upload Leaf Sample Image</p>
                      <label className="mt-4 px-5 py-2 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl cursor-pointer border border-slate-700">
                        Browse File
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-300">Test Preset Datasets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50">
                      <span className="block font-bold text-xs text-white">Rice Leaf Sample</span>
                      <span className="text-[9px] text-slate-500 font-mono">Bacterial Blight</span>
                    </button>
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50">
                      <span className="block font-bold text-xs text-white">Corn Leaf Sample</span>
                      <span className="text-[9px] text-slate-500 font-mono">Common Rust</span>
                    </button>
                  </div>

                  <button onClick={runAiDiagnostics} disabled={aiLoading} className="w-full py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl uppercase tracking-wider">
                    {aiLoading ? 'Analyzing Classifier Model...' : '🚀 Execute AI Analysis'}
                  </button>
                </div>
              </div>

              {aiResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-white">{aiResult.disease}</h4>
                    <span className="text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{aiResult.confidence}</span>
                  </div>
                  <div className="text-xs space-y-2 text-slate-300">
                    <p><strong className="text-rose-400">Severity:</strong> {aiResult.severity}</p>
                    <p><strong className="text-emerald-400">Yield Value Saved:</strong> {aiResult.roiProtection}</p>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <strong>Treatment Protocol:</strong> {aiResult.treatment}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FEATURE 4: PROFIT & YIELD FORECASTER */}
        {(activeTab === 'all' || activeTab === 'profit') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Economic Predictive Engine
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'en' ? 'Harvest Profit & Fertilizer ROI Calculator' : 'মুনাফা ও সার বাজেট ক্যালকুলেটর'}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Land Size (Decimals / শতাংশ):</label>
                    <input type="number" value={landSize} onChange={(e) => setLandSize(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white font-bold font-mono text-sm outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Select Crop Type:</label>
                    <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white font-bold text-sm outline-none focus:border-cyan-500">
                      <option value="rice">Rice / Paddy (ধান)</option>
                      <option value="corn">Maize / Corn (ভুট্টা)</option>
                      <option value="wheat">Wheat (গম)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase">Estimated Harvest Yield</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">{(landSize * 1.2).toFixed(1)} Maunds</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase">Gross Revenue Projection</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono">৳{(landSize * 1.2 * 1320).toFixed(0)}</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 font-mono block uppercase">AI Fertilizer Savings</span>
                    <span className="text-2xl font-black text-purple-400 font-mono">৳{(landSize * 45).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="border-t border-slate-900 bg-[#060a17] py-6 text-center text-xs text-slate-500 font-mono">
        AgriNexus AI Prime v4.0 • Enterprise Autonomous Agritech Infrastructure
      </footer>

    </div>
  );
            }
        
