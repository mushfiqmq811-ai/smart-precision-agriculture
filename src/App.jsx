import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('all');

  // Telemetry Metrics
  const [moisture, setMoisture] = useState(52.4);
  const [temp, setTemp] = useState(27.8);
  const [ph] = useState(6.6);
  const [npk] = useState({ n: 148, p: 65, k: 218 });

  // Drone Controls
  const [droneStatus] = useState('Patrolling Sector B');
  const [droneThermal] = useState('Optimal (31.2°C)');
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  // AI Diagnostic
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Real-time sensor simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.6 - 0.8)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setAiResult(null);
    }
  };

  const runAiDiagnostics = () => {
    if (!selectedImage) {
      alert(lang === 'en' ? "Please select or upload a leaf sample first!" : "অনুগ্রহ করে একটি পাতার ছবি নির্বাচন করুন!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'en' ? 'Bacterial Leaf Blight' : 'ব্যাকটেরিয়াল লিফ ব্লাইট (Leaf Blight)',
        confidence: '99.6% Match',
        severity: lang === 'en' ? 'Stage 2 — Moderate Threat' : 'দ্বিতীয় পর্যায় — মাঝারি ঝুঁকি',
        treatment: lang === 'en' ? 'Apply Copper Hydroxide (2g/L water) and drain excess water.' : 'কপার হাইড্রক্সাইড স্প্রে করুন এবং ক্ষেতের অতিরিক্ত পানি নিষ্কাশন করুন।',
        roiProtection: '$2,450 / Acre Saved',
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col w-full overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* Background Animated Glows */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none animate-float"></div>
      <div className="fixed top-1/3 -right-40 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[190px] pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#060a17]/90 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 rounded-2xl shadow-xl shadow-cyan-500/20">
                <span className="text-xl block">🛸</span>
              </div>
              <div>
                <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400 text-xl tracking-tight">
                  AgriNexus <span className="text-white text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono">AI PRIME v4.0</span>
                </h1>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Autonomous Agritech Platform</p>
              </div>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="md:hidden px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-cyan-400 border border-slate-800"
            >
              🌐 {lang === 'en' ? 'BN' : 'EN'}
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: lang === 'en' ? '⚡ Command Center' : '⚡ কমান্ড সেন্টার' },
              { id: 'iot', label: lang === 'en' ? '📡 IoT Telemetry' : '📡 টেলিমোট্রি' },
              { id: 'ailab', label: lang === 'en' ? '🧬 AI Neural Lab' : '🧬 এআই রোগ নির্ণয়' },
              { id: 'drone', label: lang === 'en' ? '🛸 Drone Patrol' : '🛸 ড্রোন রাডার' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-105'
                    : 'text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">

        {/* SECTION 1: IOT TELEMETRY & METRICS */}
        {(activeTab === 'all' || activeTab === 'iot') && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  Live Sensor Stream
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {lang === 'en' ? 'Field Telemetry & Soil Health' : 'মাঠের তথ্য ও মৃত্তিকা স্বাস্থ্য'}
                </h2>
              </div>
              <span className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SYSTEM ONLINE</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Moisture */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>SOIL MOISTURE</span>
                  <span className="text-cyan-400 font-bold">OPTIMAL</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white font-mono">{moisture}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                </div>
              </div>

              {/* Temperature */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>AMBIENT TEMP</span>
                  <span className="text-amber-400 font-bold">NORMAL</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white font-mono">{temp}°C</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-400 h-full transition-all duration-500" style={{ width: `${(temp / 40) * 100}%` }}></div>
                </div>
              </div>

              {/* Soil pH */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>SOIL pH LEVEL</span>
                  <span className="text-emerald-400 font-bold">BALANCED</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white font-mono">{ph}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" style={{ width: `${(ph / 14) * 100}%` }}></div>
                </div>
              </div>

              {/* N-P-K Levels */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>NPK NUTRIENTS</span>
                  <span className="text-purple-400 font-bold">PPM</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-center font-mono">
                  <div className="p-1.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">N</span>
                    <span className="text-xs font-bold text-emerald-400">{npk.n}</span>
                  </div>
                  <div className="p-1.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">P</span>
                    <span className="text-xs font-bold text-cyan-400">{npk.p}</span>
                  </div>
                  <div className="p-1.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 block">K</span>
                    <span className="text-xs font-bold text-purple-400">{npk.k}</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: AI NEURAL LAB */}
        {(activeTab === 'all' || activeTab === 'ailab') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  Computer Vision Diagnostics
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {lang === 'en' ? 'AI Disease Diagnostics' : 'কৃত্রিম বুদ্ধিমত্তা দিয়ে রোগ নির্ণয়'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-3xl p-6 text-center bg-slate-950/70 transition-all flex flex-col items-center justify-center min-h-[200px]">
                  {selectedImage ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Sample" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-2 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl block mb-2">📸</span>
                      <p className="text-xs text-slate-300 font-bold">
                        {lang === 'en' ? 'Upload crop leaf image' : 'আক্রান্ত পাতার ছবি আপলোড করুন'}
                      </p>
                      <label className="mt-4 px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer border border-slate-700 transition-all">
                        {lang === 'en' ? 'Choose File' : 'ফাইল বাছুন'}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                {/* Demo Presets & Run Action */}
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Or try with sample presets:' : 'অথবা নিচের স্যাম্পল ডেমো চেষ্টা করুন:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80');
                        setAiResult(null);
                      }}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50 transition-all"
                    >
                      <span className="block font-bold text-xs text-white">Rice Leaf Sample</span>
                      <span className="text-[9px] text-slate-500 font-mono">Bacterial Blight</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80');
                        setAiResult(null);
                      }}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50 transition-all"
                    >
                      <span className="block font-bold text-xs text-white">Corn Leaf Sample</span>
                      <span className="text-[9px] text-slate-500 font-mono">Common Rust</span>
                    </button>
                  </div>

                  <button
                    onClick={runAiDiagnostics}
                    disabled={aiLoading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
                  >
                    {aiLoading ? (lang === 'en' ? 'Analyzing Neural Patterns...' : 'এআই বিশ্লেষণ চলছে...') : (lang === 'en' ? '🚀 Run AI Diagnostic' : '🚀 এআই বিশ্লেষণ চালান')}
                  </button>
                </div>

              </div>

              {/* Diagnostic Results */}
              {aiResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-white">{aiResult.disease}</h4>
                    <span className="text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{aiResult.confidence}</span>
                  </div>
                  <div className="text-xs space-y-2 text-slate-300">
                    <p><strong className="text-rose-400">Threat Level:</strong> {aiResult.severity}</p>
                    <p><strong className="text-emerald-400">Yield Protection:</strong> {aiResult.roiProtection}</p>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <strong>Prescription:</strong> {aiResult.treatment}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}
        
        {/* SECTION 3: DRONE RADAR & CONTROL */}
        {(activeTab === 'all' || activeTab === 'drone') && (
          <section className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                  Autonomous Drone Patrol
                </span>
                <h2 className="text-2xl font-black text-white">
                  {lang === 'en' ? 'Drone Telemetry & Irrigation Controls' : 'ড্রোন রাডার ও অটো সেচ নিয়ন্ত্রণ'}
                </h2>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">PATROL STATUS</span>
                    <span className="text-emerald-400 font-bold">{droneStatus}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">THERMAL READOUT</span>
                    <span className="text-cyan-400 font-bold">{droneThermal}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <button
                    onClick={() => setPumpActive(!pumpActive)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      pumpActive
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                    }`}
                  >
                    {pumpActive ? '🔴 Stop Water Pump' : '💧 Start Water Pump'}
                  </button>

                  <button
                    onClick={() => setAutoMode(!autoMode)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700"
                  >
                    AUTO: {autoMode ? 'ENABLED' : 'MANUAL'}
                  </button>
                </div>
              </div>

              {/* Animated Radar */}
              <div className="w-64 h-64 bg-slate-950 rounded-3xl border border-cyan-500/40 relative flex items-center justify-center overflow-hidden shadow-2xl shadow-cyan-500/10">
                <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20"></div>
                <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30"></div>
                <div className="absolute w-24 h-24 top-8 right-8 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-tl-full animate-radar origin-bottom-left"></div>
                <div className="absolute top-16 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <span className="absolute bottom-3 text-[9px] font-mono text-cyan-400 font-bold">LIVE RADAR ACTIVE</span>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#060a17] py-6 text-center text-xs text-slate-500 font-mono">
        AgriNexus AI Prime v4.0 • Autonomous Agritech Command Platform
      </footer>

    </div>
  );
}
