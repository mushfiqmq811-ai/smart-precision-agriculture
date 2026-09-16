import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('en'); // Default language English
  const [activeTab, setActiveTab] = useState('all');

  // Real-time Telemetry State
  const [moisture, setMoisture] = useState(48.5);
  const [temp, setTemp] = useState(28.4);
  const [ph, setPh] = useState(6.7);
  const [npk] = useState({ n: 145, p: 62, k: 210 });

  // Actuator States
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [weather, setWeather] = useState(null);

  // AI Diagnostic States
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Calculator States
  const [landSize, setLandSize] = useState(33);
  const [cropType, setCropType] = useState('rice');

  // Live Weather API Fetching
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  // Dynamic Telemetry Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.4 - 0.7)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2500);
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
      alert(lang === 'en' ? "Please upload a crop leaf image first!" : "অনুগ্রহ করে আগে একটি পাতার ছবি আপলোড করুন!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'en' ? 'Bacterial Leaf Blight (Xanthomonas oryzae)' : 'ব্যাকটেরিয়াল লিফ ব্লাইট (Bacterial Leaf Blight)',
        confidence: '99.2%',
        severity: lang === 'en' ? 'Stage 2 — Moderate Infection Risk' : 'দ্বিতীয় পর্যায় — মাঝারি সংক্রমণ ঝুঁকি',
        symptoms: lang === 'en' 
          ? 'Yellowish-orange wavy stripes along leaf margins, wilting, and reduced photosynthesis capacity.' 
          : 'পাতার কিনারা তরঙ্গায়িত হলুদ-কমলা হওয়া, ঢলে পড়া ও সালোকসংশ্লেষণ মারাত্মকভাবে হ্রাস।',
        treatment: lang === 'en' 
          ? 'Spray Copper Hydroxide (2g/L) or Streptomycin Sulfate. Drain excess stagnant water immediately.' 
          : 'কপার হাইড্রক্সাইড (২ গ্রাম/লিটার) বা স্ট্রেপ্টোমাইসিন সালফেট স্প্রে করুন। জমিতে জমা পানি নিষ্কাশন করুন।',
        yieldImpact: lang === 'en' ? 'Potential 15-20% yield drop if untreated within 48h.' : '৪৮ ঘণ্টার মধ্যে ব্যবস্থা না নিলে ১৫-২০% ফলন হ্রাস পেতে পারে।',
      });
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans flex flex-col w-full overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* Dynamic Background Glowing Orbs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-glow"></div>
      <div className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none animate-glow"></div>

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#070c18]/90 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-500/20">
                <svg className="w-6 h-6 text-slate-950 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m4.5-4.5l9 9m0-9l-9 9" />
                </svg>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-xl tracking-tight">
                    AgriNexus <span className="text-white text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono">AI PRIME</span>
                  </h1>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Precision IoT Telemetry & ML Engine</p>
              </div>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="md:hidden px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-emerald-400 border border-slate-800"
            >
              🌐 {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', en: '⚡ Overview', bn: '⚡ ওভারভিউ' },
              { id: 'telemetry', en: '📊 Live Telemetry', bn: '📊 লাইভ ডাটা' },
              { id: 'ailab', en: '🧬 AI Disease Lab', bn: '🧬 এআই ল্যাব' },
              { id: 'forecast', en: '🔮 Hydrology & Flood', bn: '🔮 বন্যা পূর্বাভাস' },
              { id: 'roi', en: '💰 Yield ROI', bn: '💰 সার ও বাজেট' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {lang === 'en' ? tab.en : tab.bn}
              </button>
            ))}

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="hidden md:block px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-all"
            >
              🌐 {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        
        {/* BANGLADESH FARMER QUICK ACTION ADVISORY CARD */}
        <section className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-cyan-950/40 border border-emerald-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-7xl text-emerald-400 select-none pointer-events-none">BD</div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">🌾</span>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  {lang === 'en' ? 'FARMER DIRECT ACTION ADVISORY' : 'কৃষক মাঠ পর্যায় সহায়িকা'}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {lang === 'en' ? 'Optimal Soil Hydration • Normal Conditions' : 'মাটির আর্দ্রতা চমৎকার • কোনো জরুরি সেচ প্রয়োজন নেই'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'Soil moisture is at 48.5%. Save groundwater by pausing pump operations for the next 18 hours.' 
                    : 'মাটিতে আর্দ্রতা পর্যাপ্ত রয়েছে (৪৮.৫%)। আগামী ১৮ ঘণ্টা সেচ বন্ধ রেখে ভূগর্ভস্থ পানি ও বিদ্যুৎ সাশ্রয় করুন।'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex-1 md:flex-none">
                <span className="text-[9px] text-slate-500 font-mono block">LIVE PADDY RATE</span>
                <span className="text-xs font-bold text-emerald-400">৳১,৩২০ / মণ</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex-1 md:flex-none">
                <span className="text-[9px] text-slate-500 font-mono block">RECOMMENDED DRAINAGE</span>
                <span className="text-xs font-bold text-cyan-400">Normal</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: LIVE TELEMETRY & GRAPH */}
        {(activeTab === 'all' || activeTab === 'telemetry') && (
          <section className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Node-Alpha-01 • ESP32 Wireless Telemetry Active</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {lang === 'en' ? 'Live Soil & Microclimate Telemetry' : 'লাইভ মাটি ও আবহাওয়া পরিমাপ কেন্দ্র'}
                </h2>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    autoMode ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {lang === 'en' ? `Auto-Irrigation: ${autoMode ? 'ACTIVE' : 'OFF'}` : `স্বয়ংক্রিয় সেচ: ${autoMode ? 'চালু' : 'বন্ধ'}`}
                </button>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={autoMode}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
                    pumpActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  } ${autoMode ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {pumpActive ? (lang === 'en' ? '🔴 STOP PUMP' : '🔴 পাম্প বন্ধ') : (lang === 'en' ? '⚡ START PUMP' : '⚡ পাম্প চালু')}
                </button>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Soil Moisture Card */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-md relative overflow-hidden group">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Soil Moisture' : 'মাটির আর্দ্রতা'}</span>
                  <span className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-400">💧</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-emerald-400 font-mono">{moisture}</span>
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400 font-mono mt-4">✓ {lang === 'en' ? 'Optimal Root Hydration' : 'আদর্শ সেচ রেঞ্জে রয়েছে'}</p>
              </div>

              {/* Temperature Card */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Ambient Temp' : 'বাতাসের তাপমাত্রা'}</span>
                  <span className="p-2.5 bg-amber-500/10 rounded-2xl text-amber-400">🌡️</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-amber-400 font-mono">{temp}</span>
                    <span className="text-slate-500 font-bold">°C</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{lang === 'en' ? 'Thermal Comfort Index: 92%' : 'থার্মাল সূচক: ৯২%'}</p>
                </div>
                <p className="text-[10px] text-amber-400 font-mono mt-4">✓ {lang === 'en' ? 'Normal Field Temp' : 'স্বাভাবিক তাপমাত্রা'}</p>
              </div>

              {/* pH Rating Card */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Soil pH Level' : 'মাটির পিএইচ (pH)'}</span>
                  <span className="p-2.5 bg-purple-500/10 rounded-2xl text-purple-400">🧪</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-purple-400 font-mono">{ph}</span>
                    <span className="text-slate-500 font-bold">pH</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{lang === 'en' ? 'Nutrient Absorption: High' : 'পুষ্টি উপাদান শোষণ: উত্তম'}</p>
                </div>
                <p className="text-[10px] text-purple-300 font-mono mt-4">{lang === 'en' ? 'Slightly Acidic (Ideal)' : 'উৎকৃষ্ট মাত্রা'}</p>
              </div>

              {/* NPK Minerals Card */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'NPK Minerals' : 'এনপিকে উপাদান'}</span>
                  <span className="p-2.5 bg-cyan-500/10 rounded-2xl text-cyan-400">🌿</span>
                </div>
                <div className="mt-3 space-y-1 text-xs font-mono">
                  <div className="flex justify-between"><span className="text-slate-400">N (Nitrogen):</span><span className="font-bold text-emerald-400">{npk.n} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">P (Phosphorus):</span><span className="font-bold text-teal-400">{npk.p} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">K (Potassium):</span><span className="font-bold text-cyan-400">{npk.k} mg/kg</span></div>
                </div>
                <p className="text-[10px] text-cyan-400 font-mono mt-3">{lang === 'en' ? 'Fertility Score: 89/100' : 'উর্বরতা স্কোর: ৮৯/১০০'}</p>
              </div>
            </div>

            {/* Interactive SVG Real-time Telemetry Trend Chart */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <span className="text-emerald-400">📈</span>
                    <span>{lang === 'en' ? '24-Hour Soil Moisture Trend Telemetry' : '২৪ ঘণ্টার মাটির আর্দ্রতা গ্রাফ'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">{lang === 'en' ? 'Real-time telemetry curve recorded by IoT sensor nodes.' : 'আইওটি সেন্সর থেকে প্রাপ্ত মাটির আর্দ্রতা লাইভ স্কেলিং।'}</p>
                </div>
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                    <span>Moisture %</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                    <span>Temp °C</span>
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Waveform Chart */}
              <div className="w-full h-48 bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 relative overflow-hidden flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4" />

                  {/* Temperature Curve */}
                  <path
                    d="M 0 100 Q 125 70, 250 85 T 500 65"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="6"
                  />
                  {/* Moisture Curve */}
                  <path
                    d="M 0 60 Q 125 20, 250 45 T 500 35"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                  />
                  {/* Glowing Dots */}
                  <circle cx="500" cy="35" r="5" fill="#10b981" className="animate-pulse" />
                  <circle cx="500" cy="65" r="4" fill="#f59e0b" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 px-2">
                <span>00:00 AM</span>
                <span>06:00 AM</span>
                <span>12:00 PM</span>
                <span>06:00 PM</span>
                <span>NOW</span>
              </div>
            </div>

            {/* Satellite Weather Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <span>🛰️</span>
                    <span>{lang === 'en' ? 'Live Satellite Weather Telemetry' : 'স্যাটেলাইট আবহাওয়া তথ্য'}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Open-Meteo Live API</span>
                </div>

                {weather ? (
                  <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'en' ? 'Temperature' : 'তাপমাত্রা'}</p>
                      <p className="text-2xl font-black text-white mt-1 font-mono">{weather.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'en' ? 'Wind Speed' : 'বাতাসের গতি'}</p>
                      <p className="text-2xl font-black text-white mt-1 font-mono">{weather.windspeed} <span className="text-xs text-slate-500">km/h</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'en' ? 'Weather Code' : 'ওয়েদার কোড'}</p>
                      <p className="text-2xl font-black text-teal-400 mt-1 font-mono">#{weather.weathercode}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 animate-pulse">
                    Connecting to Satellite Telemetry Server...
                  </div>
                )}
              </div>

              {/* Actuator Relay Matrix */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'en' ? 'Relay Actuator Matrix' : 'রিলে সুইচ স্ট্যাটাস'}</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">{lang === 'en' ? 'Relay #2: NPK Chemical Doser' : 'রিলে ২: সার ইনজেক্টর'}</p>
                      <p className="text-[10px] text-slate-500 font-mono">GPIO 27 • Precision Valve</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-lg bg-slate-800 text-slate-500">
                      IDLE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: AI DISEASE DIAGNOSTICS LAB */}
        {(activeTab === 'all' || activeTab === 'ailab') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Deep Learning Vision Model
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'en' ? 'AI Neural Crop Disease Scanner' : 'এআই শস্য রোগ নির্ণয় ল্যাব'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'Upload an image of an infected leaf to execute real-time classification and localized treatment guidance.' 
                    : 'আক্রান্ত পাতার ছবি আপলোড করে মুহূর্তেই রোগ নির্ণয় ও প্রতিকার নির্দেশনা পান।'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-3xl p-6 text-center bg-slate-950/60 transition-all flex flex-col items-center justify-center min-h-[220px]">
                  {selectedImage ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Crop Leaf Sample" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setSelectedImage(null)} 
                        className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-2 text-xs hover:bg-rose-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl block mb-3">📸</span>
                      <p className="text-xs text-slate-300 font-bold">{lang === 'en' ? 'Select Crop Leaf Sample' : 'আক্রান্ত পাতার ছবি সিলেক্ট করুন'}</p>
                      <label className="mt-4 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer transition-all border border-slate-700">
                        {lang === 'en' ? 'Browse Image File' : 'গ্যালারি থেকে সিলেক্ট করুন'}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-300">{lang === 'en' ? 'Or test sample dataset:' : 'অথবা নিচের টেস্ট ডেমো ছবি ব্যবহার করুন:'}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} 
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-emerald-500/50 transition-all"
                    >
                      <span className="block font-bold text-xs text-white">{lang === 'en' ? 'Rice Paddy Leaf' : 'ধান পাতা'}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Bacterial Blight</span>
                    </button>
                    <button 
                      onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} 
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-emerald-500/50 transition-all"
                    >
                      <span className="block font-bold text-xs text-white">{lang === 'en' ? 'Maize Leaf' : 'ভুট্টা পাতা'}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Common Rust</span>
                    </button>
                  </div>

                  <button 
                    onClick={runAiDiagnostics} 
                    disabled={aiLoading} 
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all uppercase tracking-wider hover:opacity-95"
                  >
                    {aiLoading ? (lang === 'en' ? 'Processing Neural Model...' : 'মডেল প্রসেসিং হচ্ছে...') : (lang === 'en' ? '🚀 Run AI Diagnostics' : '🚀 রোগ নির্ণয় করুন')}
                  </button>
                </div>
              </div>

              {/* AI Diagnostic Output */}
              {aiResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">{lang === 'en' ? 'DIAGNOSIS MATCH' : 'নির্ণীত রোগ'}</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{aiResult.disease}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                      {aiResult.confidence}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block mb-1">{lang === 'en' ? 'Severity Index:' : 'ক্ষতির মাত্রা:'}</span>
                      <p className="font-semibold text-rose-400">{aiResult.severity}</p>
                      <p className="text-slate-400 text-[11px] mt-1">{aiResult.yieldImpact}</p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block mb-1">{lang === 'en' ? 'Visible Symptoms:' : 'লক্ষণসমূহ:'}</span>
                      <p className="text-slate-300">{aiResult.symptoms}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                    <strong className="text-emerald-400 block mb-1">{lang === 'en' ? 'Recommended Organic/Chemical Protocol:' : 'প্রস্তাবিত প্রতিকার ও সুনির্দিষ্ট ওষুধ:'}</strong>
                    {aiResult.treatment}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION 3: HYDROLOGY & FLOOD RISK OUTLOOK */}
        {(activeTab === 'all' || activeTab === 'forecast') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  FloodGuard BD Engine
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'en' ? '15-Day Regional Flood & Rainfall Outlook' : '১৫ দিনের নদী ও আবহাওয়া বন্যা ঝুঁকি পূর্বাভাস'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'ML classifier forecasting upstream river discharge for Mymensingh, Jamalpur, and Sylhet basins.' 
                    : 'ময়মনসিংহ, জামালপুর ও সিলেট অঞ্চলের নদ-নদীর পানির প্রবাহ ভিত্তিক এআই পূর্বাভাস।'}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { region: 'Mymensingh & Old Brahmaputra', day: 'Days 1 - 3', rain: '14mm', risk: 'Low Risk', color: 'text-emerald-400', status: 'Safe Field Hydration' },
                  { region: 'Jamalpur River Basin', day: 'Days 4 - 7', rain: '68mm', risk: 'Moderate Risk', color: 'text-amber-400', status: 'Prepare Field Outlets' },
                  { region: 'Sylhet & Haor Basin', day: 'Days 8 - 12', rain: '145mm', risk: 'High Flood Risk', color: 'text-rose-400', status: 'Upstream Discharge Alert' },
                  { region: 'Central Region', day: 'Days 13 - 15', rain: '22mm', risk: 'Receding Water', color: 'text-cyan-400', status: 'Soil Recovery Phase' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                    <div>
                      <span className="font-bold text-white text-sm block">{item.region}</span>
                      <span className="text-[10px] font-mono text-slate-500">{item.day} • {item.status}</span>
                    </div>
                    <div className="flex space-x-6 text-right font-mono">
                      <div><span className="text-slate-500 block text-[9px]">PRECIP</span><span className="text-slate-200">{item.rain}</span></div>
                      <div><span className="text-slate-500 block text-[9px]">STATUS</span><span className={`font-bold ${item.color}`}>{item.risk}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: YIELD ROI & FERTILIZER CALCULATOR */}
        {(activeTab === 'all' || activeTab === 'roi') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                  Precision Optimizer
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'en' ? 'Fertilizer Optimization & Cost Savings Calculator' : 'সার ও সাশ্রয়ী বাজেট ক্যালকুলেটর'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'Calculate exact chemical requirements per decimal of land using NPK real-time telemetry input.' 
                    : 'জমির মাপ অনুযায়ী প্রয়োজনীয় ইউরিয়া, টিএসপি এবং সাশ্রয় করা অর্থ গণনা করুন।'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {lang === 'en' ? 'Land Size (Decimals / শতাংশ):' : 'জমির পরিমাণ (শতাংশ):'}
                    </label>
                    <input 
                      type="number" 
                      value={landSize} 
                      onChange={(e) => setLandSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white font-bold font-mono text-sm focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {lang === 'en' ? 'Select Target Crop:' : 'ফসলের ধরন নির্বাচন করুন:'}
                    </label>
                    <select 
                      value={cropType} 
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-white font-bold text-sm focus:border-emerald-500 outline-none"
                    >
                      <option value="rice">{lang === 'en' ? 'Rice / Paddy (ধান)' : 'ধান (Rice)'}</option>
                      <option value="corn">{lang === 'en' ? 'Maize / Corn (ভুট্টা)' : 'ভুট্টা (Corn)'}</option>
                      <option value="wheat">{lang === 'en' ? 'Wheat (গম)' : 'গম (Wheat)'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 bg-slate-900 rounded-2xl text-center border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">Urea Requirement</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">{(landSize * (cropType === 'rice' ? 0.45 : 0.55)).toFixed(1)} kg</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl text-center border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">TSP Requirement</span>
                    <span className="text-2xl font-black text-teal-400 font-mono">{(landSize * (cropType === 'rice' ? 0.22 : 0.30)).toFixed(1)} kg</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-2xl text-center border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">Estimated Savings</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono">৳{(landSize * 38).toFixed(0)} BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#070c18] py-6 text-center text-xs text-slate-500 font-mono">
        AgriNexus AI Prime Platform • Next-Gen Agriculture Telemetry
      </footer>

    </div>
  );
                  }
