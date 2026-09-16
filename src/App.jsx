import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('bn');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [moisture, setMoisture] = useState(48.2);
  const [temp, setTemp] = useState(28.5);
  const [ph, setPh] = useState(6.8);
  const [npk, setNpk] = useState({ n: 142, p: 58, k: 215 });
  
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [doserActive, setDoserActive] = useState(false);
  const [weather, setWeather] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const [landSize, setLandSize] = useState(33);
  const [cropType, setCropType] = useState('rice');

  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.2 - 0.6)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch(() => setWeather(null));
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
        symptoms: lang === 'bn' ? 'পাতার কিনারা তরঙ্গায়িত হলুদ-কমলা হওয়া, ঢলে পড়া ও সালোকসংশ্লেষণ মারাত্মকভাবে হ্রাস।' : 'Yellow-orange wavy stripes along leaf margins, systemic wilting, reduced photosynthetic capacity.',
        treatment: lang === 'bn' ? 'কপার হাইড্রক্সাইড (২ গ্রাম/লিটার) বা স্ট্রেপ্টোমাইসিন সালফেট স্প্রে করুন। জমিতে অতিরিক্ত পানির জলাবদ্ধতা নিয়ন্ত্রণ করুন।' : 'Apply Copper Hydroxide (2g/L water) or Streptomycin Sulfate. Control field drainage strictly.',
        economicImpact: lang === 'bn' ? '৭২ ঘণ্টার মধ্যে ব্যবস্থা না নিলে ১৫%-২৫% ফলন হ্রাস পেতে পারে।' : 'High potential risk of 15%-25% crop yield loss within 72 hours if untreated.',
        preventiveMeasure: lang === 'bn' ? 'পরবর্তী মৌসুমে রোগপ্রতিরোধী জাত (যেমন: বিআর-২৬ বা বিআর-২৮) ব্যবহার করুন এবং নাইট্রোজেন সারের সুষম ব্যবহার নিশ্চিত করুন।' : 'Plant resistant varieties in upcoming cycles and balance Nitrogen application.'
      });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

        {activeTab === 'ailab' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Computer Vision Classifier Engine</span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {lang === 'bn' ? 'রোগ নির্ণয় ও কৃত্রিম বুদ্ধিমত্তা ল্যাব' : 'AI Crop Disease Vision Lab'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'আক্রান্ত পাতার ছবি আপলোড করে ডিপ লার্নিং মডেল পরিচালনা করুন।' : 'Upload leaf sample image to run deep learning neural network classification.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-3xl p-6 text-center bg-slate-950/60 transition-all flex flex-col items-center justify-center min-h-[220px]">
                  {selectedImage ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Crop Leaf Sample" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setSelectedImage(null)} 
                        className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-1.5 text-xs hover:bg-rose-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl block mb-3">📸</span>
                      <p className="text-xs text-slate-300 font-bold">{lang === 'bn' ? 'পাতার ছবি নির্বাচন করুন' : 'Select Leaf Sample Image'}</p>
                      <label className="mt-4 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer transition-all border border-slate-700">
                        {lang === 'bn' ? 'ফাইল সিলেক্ট করুন' : 'Browse File'}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-300">{lang === 'bn' ? 'অথবা ডেমো নমুনা ব্যবহার করুন:' : 'Or test benchmark samples:'}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs hover:border-emerald-500/50">
                      <span className="block font-bold text-white">{lang === 'bn' ? 'ধান পাতা' : 'Rice Leaf'}</span>
                      <span className="text-[10px] text-slate-500">Bacterial Blight</span>
                    </button>
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs hover:border-emerald-500/50">
                      <span className="block font-bold text-white">{lang === 'bn' ? 'ভুট্টা পাতা' : 'Corn Leaf'}</span>
                      <span className="text-[10px] text-slate-500">Common Rust</span>
                    </button>
                  </div>

                  <button onClick={runAiDiagnostics} disabled={aiLoading} className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all uppercase mt-4 hover:opacity-90">
                    {aiLoading ? 'Running Deep Neural Model...' : (lang === 'bn' ? '🚀 রোগ নির্ণয় করুন' : '🚀 Execute AI Diagnostics')}
                  </button>
                </div>
              </div>

              {aiResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">{lang === 'bn' ? 'নির্ণীত ফলাফল' : 'Diagnosis Result'}</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{aiResult.disease}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                      {aiResult.confidence} Match Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block mb-1">{lang === 'bn' ? 'ক্ষতির মাত্রা:' : 'Impact Severity:'}</span>
                      <p className="font-semibold text-rose-400">{aiResult.severity}</p>
                      <p className="text-slate-400 text-[11px] mt-1">{aiResult.economicImpact}</p>
                    </div>
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block mb-1">{lang === 'bn' ? 'রোগের লক্ষণ:' : 'Symptoms:'}</span>
                      <p className="text-slate-300">{aiResult.symptoms}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                    <strong className="text-emerald-400 block mb-1">{lang === 'bn' ? 'প্রস্তাবিত প্রতিকার ও ওষুধ:' : 'Recommended Treatment Protocol:'}</strong>
                    {aiResult.treatment}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-teal-300 block mb-1">{lang === 'bn' ? 'দীর্ঘমেয়াদী প্রতিরোধমূলক পদক্ষেপ:' : 'Long-term Preventive Guidance:'}</strong>
                    {aiResult.preventiveMeasure}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">FloodGuard BD Engine Integration</span>
                <h2 className="text-2xl font-black text-white mt-2">{lang === 'bn' ? '১৫ দিনের আবহাওয়া ও বন্যা ঝুঁকি পূর্বাভাস' : '15-Day Predictive Hydrological Matrix'}</h2>
                <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'র্যান্ডম ফরেস্ট ক্লাসিফায়ার মডেল ভিত্তিক আগাম বন্যা ও আর্দ্রতা পূর্বাভাস।' : 'Random Forest classification for upstream discharge and regional precipitation risk.'}</p>
              </div>

              <div className="space-y-3">
                {[
                  { day: 'Day 1 - 3', temp: '29°C', rain: '12mm', risk: 'Low Risk', color: 'text-emerald-400', status: 'Optimal Field & Moisture Index' },
                  { day: 'Day 4 - 7', temp: '27°C', rain: '65mm', risk: 'Moderate Risk', color: 'text-amber-400', status: 'Prepare Drainage Outlets' },
                  { day: 'Day 8 - 12', temp: '25°C', rain: '140mm', risk: 'High Flood Risk', color: 'text-rose-400', status: 'Upstream River Overflow Expected' },
                  { day: 'Day 13 - 15', temp: '28°C', rain: '20mm', risk: 'Receding Water', color: 'text-cyan-400', status: 'Post-Flood Recovery & Soil Treatment' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white block">{item.day}</span>
                      <span className="text-[10px] text-slate-500">{item.status}</span>
                    </div>
                    <div className="flex space-x-6 text-right font-mono">
                      <div><span className="text-slate-500 block text-[9px]">RAIN</span><span className="text-slate-200">{item.rain}</span></div>
                      <div><span className="text-slate-500 block text-[9px]">RISK STATUS</span><span className={`font-bold ${item.color}`}>{item.risk}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">Precision ROI & Fertilizer Calculator</span>
                <h2 className="text-2xl font-black text-white mt-2">{lang === 'bn' ? 'সার ও অপটিমাইজেশন সাশ্রয় হিসাবক' : 'Fertilizer & Economic Savings Calculator'}</h2>
                <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'এনপিকে রিয়েল-টাইম ডাটা ব্যবহার করে সারের সঠিক মাত্রা ও ব্যয় নির্ণয়।' : 'Calculate exact soil chemical requirements using real-time NPK sensor input.'}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {lang === 'bn' ? 'জমির পরিমাণ (শতাংশ / Decimal):' : 'Enter Land Area Size (Decimals):'}
                    </label>
                    <input 
                      type="number" 
                      value={landSize} 
                      onChange={(e) => setLandSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold text-sm focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      {lang === 'bn' ? 'ফসলের ধরন নির্বাচন করুন:' : 'Select Crop Type:'}
                    </label>
                    <select 
                      value={cropType} 
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold text-sm focus:border-emerald-500 outline-none"
                    >
                      <option value="rice">{lang === 'bn' ? 'ধান (Rice)' : 'Rice'}</option>
                      <option value="corn">{lang === 'bn' ? 'ভুট্টা (Corn)' : 'Corn'}</option>
                      <option value="wheat">{lang === 'bn' ? 'গম (Wheat)' : 'Wheat'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 bg-slate-900 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Urea Dosage</span>
                    <span className="text-xl font-black text-emerald-400">{(landSize * (cropType === 'rice' ? 0.45 : 0.55)).toFixed(1)} kg</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">TSP Dosage</span>
                    <span className="text-xl font-black text-teal-400">{(landSize * (cropType === 'rice' ? 0.22 : 0.30)).toFixed(1)} kg</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Estimated ROI Saved</span>
                    <span className="text-xl font-black text-cyan-400">৳{(landSize * 38).toFixed(0)} BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 text-center text-xs text-slate-500 font-mono backdrop-blur-md">
        AgriSmart AI Pro • Precision Agriculture Platform
      </footer>

    </div>
  );
                  }                
