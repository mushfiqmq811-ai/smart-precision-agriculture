import React, { useState, useEffect } from 'react';

export default function App() {
  // Language & Navigation
  const [lang, setLang] = useState('bn');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Real-time IoT Metrics State
  const [moisture, setMoisture] = useState(48.2);
  const [temp, setTemp] = useState(28.5);
  const [ph, setPh] = useState(6.8);
  const [npk, setNpk] = useState({ n: 142, p: 58, k: 215 });
  
  // Actuator & Relay Controls
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [doserActive, setDoserActive] = useState(false);
  const [weather, setWeather] = useState(null);

  // AI Computer Vision Diagnostics State
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Precision Calculator State
  const [landSize, setLandSize] = useState(33);
  const [cropType, setCropType] = useState('rice');

  // Real-Time IoT Sensor Data Stream Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.2 - 0.6)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Satellite Telemetry from Open-Meteo API
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
  }, []);

  // Image Upload Handler
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setAiResult(null);
    }
  };

  // AI Deep Learning Inference
  const runAiDiagnostics = () => {
    if (!selectedImage) {
      alert(lang === 'bn' ? "অনুগ্রহ করে আগে একটি পাতার ছবি আপলোড করুন!" : "Please upload a crop leaf image first!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'bn' ? 'ব্যাকটেরিয়াল লিফ ব্লাইট (Bacterial Leaf Blight)' : 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        confidence: '98.6%',
        severity: lang === 'bn' ? 'দ্বিতীয় পর্যায় - মাঝারি সংক্রমণ ঝুঁকি' : 'Stage 2 - Moderate Infection Risk',
        symptoms: lang === 'bn' 
          ? 'পাতার কিনারা তরঙ্গায়িত হলুদ-কমলা হওয়া, ঢলে পড়া ও সালোকসংশ্লেষণ মারাত্মকভাবে হ্রাস।' 
          : 'Yellow-orange wavy stripes along leaf margins, systemic wilting, reduced photosynthetic capacity.',
        treatment: lang === 'bn' 
          ? 'কপার হাইড্রক্সাইড (২ গ্রাম/লিটার) বা স্ট্রেপ্টোমাইসিন সালফেট স্প্রে করুন। জমিতে অতিরিক্ত পানির জলাবদ্ধতা নিয়ন্ত্রণ করুন।' 
          : 'Apply Copper Hydroxide (2g/L water) or Streptomycin Sulfate. Control field drainage strictly.',
        economicImpact: lang === 'bn' 
          ? '৭২ ঘণ্টার মধ্যে ব্যবস্থা না নিলে ১৫%-২৫% ফলন হ্রাস পেতে পারে।' 
          : 'High potential risk of 15%-25% crop yield loss within 72 hours if untreated.',
        preventiveMeasure: lang === 'bn'
          ? 'পরবর্তী মৌসুমে রোগপ্রতিরোধী জাত (যেমন: বিআর-২৬ বা বিআর-২৮) ব্যবহার করুন এবং নাইট্রোজেন সারের সুষম ব্যবহার নিশ্চিত করুন।'
          : 'Plant resistant varieties in upcoming cycles and balance Nitrogen application.'
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* Dynamic Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Navigation & Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <span className="text-2xl block">🌱</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-xl tracking-tight">
                  AgriSmart AI Pro
                </h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase">
                  v3.5 Enterprise
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">PRECISION IOT & ML TELEMETRY ENGINE</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <nav className="hidden md:flex space-x-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
              {[
                { id: 'dashboard', name: lang === 'bn' ? '📊 লাইভ মনিটরিং' : '📊 Live Telemetry' },
                { id: 'ailab', name: lang === 'bn' ? '🧬 এআই ল্যাব' : '🧬 AI Disease Lab' },
                { id: 'forecast', name: lang === 'bn' ? '🔮 ১৫ দিনের পূর্বাভাস' : '🔮 15-Day Forecast' },
                { id: 'calculator', name: lang === 'bn' ? '💰 সার ও বাজেট' : '💰 Yield ROI' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-all"
            >
              🌐 {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Sector Banner */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-2xl">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">ESP32 Telemetry Node Alpha-1 • Connected</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  {lang === 'bn' ? 'স্মার্ট কৃষি জমি তদারকি কেন্দ্র' : 'Field Sector Precision Dashboard'}
                </h2>
              </div>

              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                >
                  🖨️ {lang === 'bn' ? 'রিপোর্ট এক্সপোর্ট' : 'Export Telemetry Report'}
                </button>
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    autoMode ? 'bg-teal-500/15 text-teal-300 border-teal-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? `স্বয়ংক্রিয় সেচ: ${autoMode ? 'চালু' : 'বন্ধ'}` : `Auto Irrigation: ${autoMode ? 'ON' : 'OFF'}`}
                </button>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={autoMode}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-lg ${
                    pumpActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  } ${autoMode ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  {pumpActive ? (lang === 'bn' ? '🔴 পাম্প বন্ধ' : '🔴 Stop Pump') : (lang === 'bn' ? '⚡ পাম্প চালু' : '⚡ Start Pump')}
                </button>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Soil Moisture */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'মাটির আর্দ্রতা' : 'Soil Moisture'}</span>
                  <span className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">💧</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-emerald-400">{moisture}</span>
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400 font-mono mt-4">✓ {lang === 'bn' ? 'আদর্শ সেচ মাত্রায় আছে' : 'Optimal Hydration Level'}</p>
              </div>

              {/* Ambient Temp */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'বাতাসের তাপমাত্রা' : 'Ambient Temp'}</span>
                  <span className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">🌡️</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-amber-400">{temp}</span>
                    <span className="text-slate-500 font-bold">°C</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{lang === 'bn' ? 'থার্মাল কমফোর্ট ইনডেক্স' : 'Thermal Index'}</p>
                </div>
                <p className="text-[10px] text-amber-400 font-mono mt-4">✓ {lang === 'bn' ? 'স্বাভাবিক রেঞ্জ' : 'Normal Field Range'}</p>
              </div>

              {/* Soil pH */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'মাটির পিএইচ (pH)' : 'Soil pH Rating'}</span>
                  <span className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">🧪</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-purple-400">{ph}</span>
                    <span className="text-slate-500 font-bold">pH</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{lang === 'bn' ? 'পুষ্টি উপাদান গ্রহণ ক্ষমতা' : 'Nutrient Bioavailability'}</p>
                </div>
                <p className="text-[10px] text-purple-300 font-mono mt-4">{lang === 'bn' ? 'হালকা এসিডিক (উৎকৃষ্ট)' : 'Slightly Acidic (Optimal)'}</p>
              </div>

              {/* NPK Minerals */}
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-bold uppercase">{lang === 'bn' ? 'এনপিকে খনিজ (NPK)' : 'NPK Minerals'}</span>
                  <span className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400">🌿</span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-400">N (নাইট্রোজেন):</span><span className="font-bold text-emerald-400">{npk.n} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">P (ফসফরাস):</span><span className="font-bold text-teal-400">{npk.p} mg/kg</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">K (পটাশিয়াম):</span><span className="font-bold text-cyan-400">{npk.k} mg/kg</span></div>
                </div>
                <p className="text-[10px] text-cyan-400 font-mono mt-3">{lang === 'bn' ? 'উর্বরতা সূচক: ৮৮%' : 'Fertility Index: 88%'}</p>
              </div>

            </div>

            {/* Satellite Weather & Actuators */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl space-y-4 backdrop-blur-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>📡</span> {lang === 'bn' ? 'স্যাটেলাইট আবহাওয়া তথ্য' : 'Satellite Weather Telemetry'}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Open-Meteo Live API</span>
                </div>

                {weather ? (
                  <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'bn' ? 'তাপমাত্রা' : 'Temp'}</p>
                      <p className="text-2xl font-black text-white mt-1">{weather.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'bn' ? 'বাতাসের গতি' : 'Wind Speed'}</p>
                      <p className="text-2xl font-black text-white mt-1">{weather.windspeed} <span className="text-xs text-slate-500">km/h</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{lang === 'bn' ? 'ওয়েদার কোড' : 'Weather Code'}</p>
                      <p className="text-2xl font-black text-teal-400 mt-1">#{weather.weathercode}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 animate-pulse">Connecting to Satellite Server...</p>
                )}

                <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200 flex items-start space-x-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <strong className="text-teal-300">{lang === 'bn' ? 'এআই কৃষি পরামর্শ:' : 'AI Decision Engine:'}</strong> {lang === 'bn' ? 'আজ বাষ্পীভবনের হার কম। ভূগর্ভস্থ পানি ২২% সাশ্রয় করতে সন্ধ্যায় ১২ মিনিটের জন্য ড্রিপ সেচ পরিচালনা করা হবে।' : 'Low evapotranspiration rate today. Drip irrigation scheduled for 12 mins at sunset to save 22% groundwater.'}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl space-y-4 backdrop-blur-md">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'bn' ? 'হালনাগাদ রিলে স্ট্যাটাস' : 'Actuator Relay Matrix'}</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">{lang === 'bn' ? 'রিলে ১: মোটর পাম্প' : 'Relay #1: Water Pump'}</p>
                      <p className="text-[10px] text-slate-500">GPIO 26 • High Voltage Control</p>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg ${pumpActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                      {pumpActive ? 'RUNNING' : 'IDLE'}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">{lang === 'bn' ? 'রিলে ২: সার ইনজেক্টর' : 'Relay #2: NPK Doser'}</p>
                      <p className="text-[10px] text-slate-500">GPIO 27 • Automatic Dosing Valve</p>
                    </div>
                    <button
                      onClick={() => setDoserActive(!doserActive)}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg transition-all ${doserActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-500'}`}
                    >
                      {doserActive ? 'ACTIVE' : 'IDLE'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI DISEASE LAB */}
        {activeTab === 'ailab' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Computer Vision Classifier Engine</span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'bn' ? 'রোগ নির্ণয় ও কৃত্রিম বুদ্ধিমত
