import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('bn');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Real-time IoT Metrics
  const [moisture, setMoisture] = useState(48.2);
  const [temp, setTemp] = useState(28.5);
  const [ph, setPh] = useState(6.8);
  const [npk, setNpk] = useState({ n: 142, p: 58, k: 215 });
  
  // Control States
  const [pumpActive, setPumpActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [weather, setWeather] = useState(null);

  // AI Upload State
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Calculator State
  const [landSize, setLandSize] = useState(33);

  // Live IoT Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.2 - 0.6)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Weather API
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
        disease: lang === 'bn' ? 'ব্যাকটেরিয়াল লিফ ব্লাইট (Bacterial Leaf Blight)' : 'Bacterial Leaf Blight',
        confidence: '98.6%',
        severity: lang === 'bn' ? 'দ্বিতীয় পর্যায় - মাঝারি সংক্রমণ' : 'Stage 2 - Moderate Infection',
        symptoms: lang === 'bn' ? 'পাতার কিনারা হলুদ-কমলা হওয়া, ঢলে পড়া ও সালোকসংশ্লেষণ হ্রাস।' : 'Yellow-orange stripes along leaf margins.',
        treatment: lang === 'bn' ? 'কপার হাইড্রক্সাইড (২ গ্রাম/লিটার) প্রয়োগ করুন।' : 'Apply Copper Hydroxide (2g/L water).',
        economicImpact: lang === 'bn' ? '৭২ ঘণ্টার মধ্যে ব্যবস্থা না নিলে ১৫%-২৫% ফলন কমে যাওয়ার ঝুঁকি।' : 'Risk of 15%-25% yield degradation.'
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <h1 className="font-bold text-emerald-400 text-lg">AgriSmart AI Pro</h1>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'dashboard', name: lang === 'bn' ? 'মনিটরিং' : 'Telemetry' },
                { id: 'ailab', name: lang === 'bn' ? 'এআই ল্যাব' : 'AI Lab' },
                { id: 'forecast', name: lang === 'bn' ? 'পূর্বাভাস' : 'Forecast' },
                { id: 'calculator', name: lang === 'bn' ? 'হিসাবক' : 'Calculator' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-emerald-400 border border-slate-700"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">● IoT Node Alpha-1</span>
                <h2 className="text-xl font-bold text-white">{lang === 'bn' ? 'স্মার্ট কৃষি ড্যাশবোর্ড' : 'Precision Agriculture Panel'}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                    autoMode ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {lang === 'bn' ? `অটো মোড: ${autoMode ? 'চালু' : 'বন্ধ'}` : `Auto Mode: ${autoMode ? 'ON' : 'OFF'}`}
                </button>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={autoMode}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                    pumpActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  } ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {pumpActive ? '🔴 Stop Pump' : '⚡ Start Pump'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'bn' ? 'মাটির আর্দ্রতা' : 'Moisture'}</span>
                <div className="text-3xl font-black text-emerald-400 mt-2">{moisture}%</div>
                <p className="text-[10px] text-emerald-400 font-mono mt-2">✓ Optimal Level</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'bn' ? 'তাপমাত্রা' : 'Temperature'}</span>
                <div className="text-3xl font-black text-amber-400 mt-2">{temp}°C</div>
                <p className="text-[10px] text-amber-400 font-mono mt-2">✓ Normal Range</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">{lang === 'bn' ? 'পিএইচ (pH)' : 'Soil pH'}</span>
                <div className="text-3xl font-black text-purple-400 mt-2">{ph}</div>
                <p className="text-[10px] text-purple-300 font-mono mt-2">Slightly Acidic</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase">NPK Levels</span>
                <div className="text-xs space-y-1 mt-2 text-slate-300">
                  <div className="flex justify-between"><span>N:</span><span className="font-bold text-emerald-400">{npk.n} mg/kg</span></div>
                  <div className="flex justify-between"><span>P:</span><span className="font-bold text-teal-400">{npk.p} mg/kg</span></div>
                  <div className="flex justify-between"><span>K:</span><span className="font-bold text-cyan-400">{npk.k} mg/kg</span></div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase">📡 Weather Telemetry</h3>
              {weather ? (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div><span className="text-slate-500 block">TEMP</span><span className="font-bold text-white">{weather.temperature}°C</span></div>
                  <div><span className="text-slate-500 block">WIND</span><span className="font-bold text-white">{weather.windspeed} km/h</span></div>
                  <div><span className="text-slate-500 block">CODE</span><span className="font-bold text-teal-400">#{weather.weathercode}</span></div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Fetching Weather Data...</p>
              )}
            </div>
          </div>
        )}

        {/* AI DISEASE LAB TAB */}
        {activeTab === 'ailab' && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">{lang === 'bn' ? 'রোগ নির্ণয় ল্যাব' : 'AI Disease Classifier'}</h2>
                <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'আক্রান্ত পাতার ছবি আপলোড করুন।' : 'Upload leaf image for computer vision analysis.'}</p>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center bg-slate-950 space-y-4">
                {selectedImage ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-800">
                    <img src={selectedImage} alt="Uploaded Leaf" className="w-full h-full object-cover" />
                    <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-slate-900/80 text-white rounded-full p-1 text-xs">✕</button>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl block mb-2">📸</span>
                    <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer inline-block border border-slate-700">
                      {lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Image'}
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                )}

                <button onClick={runAiDiagnostics} disabled={aiLoading} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all uppercase">
                  {aiLoading ? 'Processing Image...' : (lang === 'bn' ? '🚀 রোগ নির্ণয় করুন' : '🚀 Analyze Image')}
                </button>
              </div>

              {aiResult && (
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="font-bold text-white">{aiResult.disease}</h4>
                    <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">{aiResult.confidence}</span>
                  </div>
                  <p className="text-xs text-rose-400 font-semibold">{aiResult.severity}</p>
                  <p className="text-xs text-slate-300">{aiResult.symptoms}</p>
                  <p className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30"><strong>Remedy:</strong> {aiResult.treatment}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FORECAST TAB */}
        {activeTab === 'forecast' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white">{lang === 'bn' ? '১৫ দিনের বন্যা ঝুঁকি পূর্বাবাস' : '15-Day Flood Risk Outlook'}</h2>
              <div className="space-y-2">
                {[
                  { day: 'Day 1 - 3', rain: '12mm', risk: 'Low Risk', color: 'text-emerald-400' },
                  { day: 'Day 4 - 7', rain: '65mm', risk: 'Moderate Risk', color: 'text-amber-400' },
                  { day: 'Day 8 - 12', rain: '140mm', risk: 'High Risk', color: 'text-rose-400' },
                  { day: 'Day 13 - 15', rain: '20mm', risk: 'Receding', color: 'text-cyan-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between text-xs">
                    <span className="font-bold text-white">{item.day}</span>
                    <span className="text-slate-400 font-mono">Rain: {item.rain}</span>
                    <span className={`font-bold ${item.color}`}>{item.risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white">{lang === 'bn' ? 'সার হিসাবক' : 'Fertilizer Calculator'}</h2>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300">{lang === 'bn' ? 'জমির পরিমাণ (শতাংশ):' : 'Land Size (Decimals):'}</label>
                <input 
                  type="number" 
                  value={landSize} 
                  onChange={(e) => setLandSize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-sm outline-none"
                />
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="p-3 bg-slate-950 rounded-xl text-center"><span className="text-[10px] text-slate-500 block">Urea</span><span className="text-lg font-bold text-emerald-400">{(landSize * 0.45).toFixed(1)} kg</span></div>
                  <div className="p-3 bg-slate-950 rounded-xl text-center"><span className="text-[10px] text-slate-500 block">TSP</span><span className="text-lg font-bold text-teal-400">{(landSize * 0.22).toFixed(1)} kg</span></div>
                  <div className="p-3 bg-slate-950 rounded-xl text-center"><span className="text-[10px] text-slate-500 block">Saved</span><span className="text-lg font-bold text-cyan-400">৳{(landSize * 35).toFixed(0)}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        AgriSmart AI Pro • Precision Agriculture Platform
      </footer>
    </div>
  );
                 }
      
