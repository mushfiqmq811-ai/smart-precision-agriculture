import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('bn');
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

  // Voice Assistant State
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceReply, setVoiceReply] = useState('');

  // Market Prices Data
  const marketPrices = [
    { crop: 'ধান (BR-28)', price: '৳১২৫০ / মন', trend: '+২.৪%', location: 'গাজীপুর' },
    { crop: 'ভুট্টা (হাইব্রিড)', price: '৳১০৫০ / মন', trend: '+১.১%', location: 'ময়মনসিংহ' },
    { crop: 'গম (শতাব্দী)', price: '৳১৩৮০ / মন', trend: '-০.৫%', location: 'ঢাকা' },
    { crop: 'আলু (কার্ডিনাল)', price: '৳২৮ / কেজি', trend: '+৩.০%', location: 'বগুড়া' },
  ];

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
      alert(lang === 'en' ? "Please upload a leaf sample first!" : "অনুগ্রহ করে একটি পাতার ছবি দিন!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'en' ? 'Bacterial Leaf Blight' : 'ব্যাকটেরিয়াল লিফ ব্লাইট',
        confidence: '99.6% Match',
        severity: lang === 'en' ? 'Stage 2 — Moderate' : 'দ্বিতীয় পর্যায় — মাঝারি ঝুঁকি',
        treatment: lang === 'en' ? 'Apply Copper Hydroxide (2g/L water) and drain excess water.' : 'কপার হাইড্রক্সাইড স্প্রে করুন এবং ক্ষেতের অতিরিক্ত পানি নিষ্কাশন করুন।',
        roiProtection: '৳২২,৫০০',
      });
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setVoiceQuery('আজকে সেচ দেওয়ার দরকার আছে?');
    setVoiceReply('');

    setTimeout(() => {
      setIsListening(false);
      setVoiceReply('মাটির আর্দ্রতা বর্তমানে ৫২.৪% যা আদর্শ। আগামী ২৪ ঘণ্টায় সেচের প্রয়োজন নেই।');
    }, 2500);
  };

  const printReport = () => {
    window.print();
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
                  AgriNexus <span className="text-white text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono">v5.0 PRO</span>
                </h1>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">AI & Autonomous Agritech Platform</p>
              </div>
            </div>

            <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="md:hidden px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-cyan-400 border border-slate-800">
              🌐 {lang === 'en' ? 'BN' : 'BNG'}
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: '⚡ ওভারভিউ' },
              { id: 'voice', label: '🎙️ ভয়েস এআই' },
              { id: 'market', label: '📈 বাজারদর' },
              { id: 'ailab', label: '🧬 রোগ নির্ণয়' },
              { id: 'drone', label: '🛸 রাডার ও ড্রোন' },
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

            <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="hidden md:block px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800">
              🌐 {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">

        {/* FEATURE: VOICE-GUIDED AI ASSISTANT */}
        {(activeTab === 'all' || activeTab === 'voice') && (
          <section className="p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                  Voice-Guided Neural Assistant
                </span>
                <h2 className="text-2xl font-black text-white">কৃষি ভয়েস সহকারী (Voice Assistant)</h2>
                <p className="text-xs text-slate-400">মাইক্রোফোনে চেপে সরাসরি আপনার ক্ষেতের বা ফসলের যেকোনো প্রশ্ন করুন।</p>
                
                {voiceQuery && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <p className="text-xs text-cyan-400 font-mono">🗣️ আপনি বলেছেন: "{voiceQuery}"</p>
                    {voiceReply && <p className="text-xs text-emerald-400 font-bold">🤖 এআই উত্তর: {voiceReply}</p>}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handleVoiceInput}
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all duration-300 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/50 scale-110'
                      : 'bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 text-slate-950 hover:scale-105 shadow-cyan-500/30'
                  }`}
                >
                  🎙️
                </button>
                <span className="text-[10px] font-mono text-slate-400 mt-3">
                  {isListening ? 'শুনছি... কথা বলুন' : 'কথা বলতে বোতামে চাপুন'}
                </span>
              </div>
            </div>
          </section>
        )}
        
        {/* FEATURE: LIVE MANDI / MARKET PRICES */}
        {(activeTab === 'all' || activeTab === 'market') && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  Real-time Mandi Feed
                </span>
                <h2 className="text-2xl font-black text-white mt-1">দেশের লাইভ পাইকারি বাজারদর</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketPrices.map((item, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all backdrop-blur-md">
                  <div className="flex justify-between items-start text-xs text-slate-400">
                    <span className="font-mono bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">{item.location}</span>
                    <span className="text-emerald-400 font-bold">{item.trend}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white mt-3">{item.crop}</h3>
                  <p className="text-2xl font-black text-cyan-400 font-mono mt-1">{item.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FEATURE: DIAGNOSTIC LAB WITH PRINT/EXPORT */}
        {(activeTab === 'all' || activeTab === 'ailab') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Computer Vision Diagnostics
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">নিউরাল রোগ নির্ণয় ল্যাব</h2>
                </div>
                {aiResult && (
                  <button onClick={printReport} className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all">
                    📄 ডাউনলোড/প্রিন্ট রিপোর্ট
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-3xl p-6 text-center bg-slate-950/70 transition-all flex flex-col items-center justify-center min-h-[200px]">
                  {selectedImage ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Sample" className="w-full h-full object-cover" />
                      <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-2 text-xs">✕</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl block mb-2">📸</span>
                      <p className="text-xs text-slate-300 font-bold">আক্রান্ত পাতার ছবি আপলোড করুন</p>
                      <label className="mt-4 px-5 py-2 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl cursor-pointer border border-slate-700">
                        ফাইল বাছুন
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-300">ডেমো নমুনা দিয়ে পরীক্ষা করুন:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50">
                      <span className="block font-bold text-xs text-white">ধানের পাতা</span>
                      <span className="text-[9px] text-slate-500 font-mono">লিফ ব্লাইট</span>
                    </button>
                    <button onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-left hover:border-cyan-500/50">
                      <span className="block font-bold text-xs text-white">ভুট্টার পাতা</span>
                      <span className="text-[9px] text-slate-500 font-mono">কমন রাস্ট</span>
                    </button>
                  </div>

                  <button onClick={runAiDiagnostics} disabled={aiLoading} className="w-full py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl uppercase tracking-wider">
                    {aiLoading ? 'এআই বিশ্লেষণ চলছে...' : '🚀 এআই ডায়াগনস্টিক চালান'}
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
                    <p><strong className="text-rose-400">ঝুঁকির মাত্রা:</strong> {aiResult.severity}</p>
                    <p><strong className="text-emerald-400">সংরক্ষিত সম্ভাব্য ফসল:</strong> {aiResult.roiProtection}</p>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <strong>প্রতিকার:</strong> {aiResult.treatment}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FEATURE: DRONE RADAR */}
        {(activeTab === 'all' || activeTab === 'drone') && (
          <section className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                  Autonomous Drone System
                </span>
                <h2 className="text-2xl font-black text-white">লাইভ ড্রোন থার্মাল সার্ভেইল্যান্স</h2>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">STATUS</span>
                    <span className="text-emerald-400 font-bold">{droneStatus}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">FIELD HEAT</span>
                    <span className="text-cyan-400 font-bold">{droneThermal}</span>
                  </div>
                </div>
              </div>

              <div className="w-64 h-64 bg-slate-950 rounded-3xl border border-cyan-500/40 relative flex items-center justify-center overflow-hidden">
                <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20"></div>
                <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30"></div>
                <div className="absolute w-24 h-24 top-8 right-8 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-tl-full animate-radar origin-bottom-left"></div>
                <div className="absolute top-16 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <span className="absolute bottom-3 text-[9px] font-mono text-cyan-400 font-bold">RADAR ACTIVE</span>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="border-t border-slate-900 bg-[#060a17] py-6 text-center text-xs text-slate-500 font-mono">
        AgriNexus AI Prime v5.0 • Enterprise Agritech Platform
      </footer>

    </div>
  );
        }
