import React, { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState('bn');
  const [theme, setTheme] = useState('dark');
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

  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceReply, setVoiceReply] = useState('');

  // Market Prices
  const marketPrices = [
    { crop: 'ধান (BR-28)', price: '৳১২৫০ / মন', trend: '+২.৪%', location: 'গাজীপুর' },
    { crop: 'ভুট্টা (হাইব্রিড)', price: '৳১০৫০ / মন', trend: '+১.১%', location: 'ময়মনসিংহ' },
    { crop: 'গম (শতাব্দী)', price: '৳১৩৮০ / মন', trend: '-০.৫%', location: 'ঢাকা' },
    { crop: 'আলু (কার্ডিনাল)', price: '৳২৮ / কেজি', trend: '+৩.০%', location: 'বগুড়া' },
  ];

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => +(prev + (Math.random() * 1.6 - 0.8)).toFixed(1));
      setTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Real Web Speech API Handler
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই। অনুগ্রহ করে Chrome বা Edge ব্রাউজার ব্যবহার করুন।");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    setVoiceTranscript('');
    setVoiceReply('');

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setVoiceTranscript(text);
      setIsListening(false);
      generateVoiceResponse(text);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceReply(lang === 'bn' ? "দুঃখিত, কোনো শব্দ শুনতে পাওয়া যায়নি।" : "Sorry, could not process voice input.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const generateVoiceResponse = (query) => {
    let reply = "";
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('সেচ') || lowerQuery.includes('পানি') || lowerQuery.includes('water') || lowerQuery.includes('irrigation')) {
      reply = `মাটির আর্দ্রতা বর্তমানে ${moisture}%। পাম্প চালু করার কোনো প্রয়োজন নেই।`;
    } else if (lowerQuery.includes('তাপমাত্রা') || lowerQuery.includes('temp') || lowerQuery.includes('weather')) {
      reply = `বর্তমান তাপমাত্রা ${temp} ডিগ্রি সেলসিয়াস। আবহাওয়া স্বাভাবিক রয়েছে।`;
    } else if (lowerQuery.includes('রোগ') || lowerQuery.includes('disease') || lowerQuery.includes('পাতা')) {
      reply = "অনুগ্রহ করে রোগ নির্ণয় সেকশনে পাতার ছবি আপলোড করুন, এআই তা স্ক্যান করে বলবে।";
    } else {
      reply = `আপনার প্রশ্ন: "${query}"। সিস্টেম ডাটা বিশ্লেষণ করে কাজ করছে।`;
    }

    setVoiceReply(reply);

    // Text to Speech output
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setAiResult(null);
    }
  };

  const runAiDiagnostics = () => {
    if (!selectedImage) {
      alert(lang === 'en' ? "Please select a leaf sample first!" : "অনুগ্রহ করে একটি পাতার ছবি নির্বাচন করুন!");
      return;
    }
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      setAiResult({
        disease: lang === 'en' ? 'Bacterial Leaf Blight' : 'ব্যাকটেরিয়াল লিফ ব্লাইট',
        confidence: '99.6% Match',
        severity: lang === 'en' ? 'Stage 2 — Moderate Threat' : 'দ্বিতীয় পর্যায় — মাঝারি ঝুঁকি',
        treatment: lang === 'en' ? 'Apply Copper Hydroxide (2g/L water) and drain excess field water.' : 'কপার হাইড্রক্সাইড স্প্রে করুন এবং ক্ষেতের অতিরিক্ত পানি নিষ্কাশন করুন।',
        roiProtection: lang === 'en' ? '$2,450 / Acre Saved' : '৳২২,৫০০ / একর সংরক্ষিত',
      });
    }, 1800);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col w-full overflow-x-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Dynamic Background Glows */}
      {theme === 'dark' && (
        <>
          <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none animate-float"></div>
          <div className="fixed top-1/3 -right-40 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[190px] pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>
        </>
      )}

      {/* Header */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-2xl transition-colors duration-300 ${
        theme === 'dark' ? 'border-slate-800/80 bg-[#060a17]/90' : 'border-slate-200 bg-white/90 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                <span className="text-xl block">🛸</span>
              </div>
              <div>
                <h1 className={`font-black text-xl tracking-tight ${
                  theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400' : 'text-slate-900'
                }`}>
                  AgriNexus <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 font-mono">v5.0 ULTRA</span>
                </h1>
                <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Autonomous Agritech Command Hub</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-xl bg-slate-800 text-amber-400">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {lang === 'en' ? 'BN' : 'EN'}
              </button>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: lang === 'en' ? '⚡ All Overview' : '⚡ ওভারভিউ' },
              { id: 'iot', label: lang === 'en' ? '📡 IoT Telemetry' : '📡 টেলিমোট্রি' },
              { id: 'voice', label: lang === 'en' ? '🎙️ Voice AI' : '🎙️ ভয়েস এআই' },
              { id: 'market', label: lang === 'en' ? '📈 Live Market' : '📈 লাইভ বাজার' },
              { id: 'ailab', label: lang === 'en' ? '🧬 AI Lab' : '🧬 রোগ নির্ণয়' },
              { id: 'drone', label: lang === 'en' ? '🛸 Drone Patrol' : '🛸 ড্রোন রাডার' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20 scale-105'
                    : theme === 'dark' ? 'text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800' : 'text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`hidden md:flex items-center justify-center p-2.5 rounded-2xl border transition-all ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Language Swapper */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className={`hidden md:block px-3.5 py-2 rounded-2xl text-xs font-mono font-bold border transition-all ${
                theme === 'dark' ? 'bg-slate-900 text-cyan-400 border-slate-800 hover:bg-slate-800' : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
              }`}
            >
              🌐 {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">

        {/* SECTION 1: LIVE VOICE AI ASSISTANT */}
        {(activeTab === 'all' || activeTab === 'voice') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden transition-all ${
            theme === 'dark' ? 'bg-slate-900/70 border-cyan-500/30' : 'bg-white border-cyan-200 shadow-cyan-500/5'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-500">
                  Interactive Neural Voice Engine
                </span>
                <h2 className="text-2xl font-black">
                  {lang === 'en' ? 'Voice Assistant Command' : 'কৃষি ভয়েস সহকারী (বাংলা ও ইংরেজি)'}
                </h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'en' ? 'Click microphone and speak naturally (e.g. "Do I need to irrigate today?")' : 'মাইক্রোফোন চেপে ভয়েসে সরাসরি প্রশ্ন করুন (যেমন: "আজকে সেচ দেওয়ার দরকার আছে?")'}
                </p>
                
                {(voiceTranscript || voiceReply) && (
                  <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {voiceTranscript && <p className="font-mono text-cyan-500">🗣️ {lang === 'en' ? 'You said:' : 'আপনি বলেছেন:'} "{voiceTranscript}"</p>}
                    {voiceReply && <p className="font-bold text-emerald-500">🤖 {lang === 'en' ? 'AI Answer:' : 'এআই উত্তর:'} {voiceReply}</p>}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={startVoiceRecognition}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all duration-300 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/50 scale-110'
                      : 'bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 text-slate-950 hover:scale-105 shadow-cyan-500/30'
                  }`}
                >
                  🎙️
                </button>
                <span className="text-[10px] font-mono text-slate-400 mt-3 font-bold">
                  {isListening ? (lang === 'en' ? 'Listening... Speak now' : 'শুনছি... বলুন') : (lang === 'en' ? 'Tap Mic to Speak' : 'কথা বলতে চাপুন')}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: IOT TELEMETRY & METRICS */}
        {(activeTab === 'all' || activeTab === 'iot') && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  Live Sensor Telemetry Stream
                </span>
                <h2 className="text-2xl font-black mt-1">
                  {lang === 'en' ? 'Soil Health & Live Sensors' : 'মাঠের তাপমাত্রা ও মৃত্তিকা স্বাস্থ্য'}
                </h2>
              </div>
              <span className="flex items-center space-x-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SYSTEM LIVE</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Moisture */}
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-md transition-all ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>SOIL MOISTURE</span>
                  <span className="text-cyan-500 font-bold">OPTIMAL</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black font-mono">{moisture}%</span>
                </div>
                <div className="w-full bg-slate-800/20 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${moisture}%` }}></div>
                </div>
              </div>

              {/* Temperature */}
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-md transition-all ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>AMBIENT TEMP</span>
                  <span className="text-amber-500 font-bold">NORMAL</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black font-mono">{temp}°C</span>
                </div>
                <div className="w-full bg-slate-800/20 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-400 h-full transition-all duration-500" style={{ width: `${(temp / 40) * 100}%` }}></div>
                </div>
              </div>

              {/* Soil pH */}
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-md transition-all ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>SOIL pH LEVEL</span>
                  <span className="text-emerald-500 font-bold">BALANCED</span>
                </div>
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-4xl font-black font-mono">{ph}</span>
                </div>
                <div className="w-full bg-slate-800/20 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" style={{ width: `${(ph / 14) * 100}%` }}></div>
                </div>
              </div>

              {/* N-P-K Levels */}
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-md transition-all ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>NPK NUTRIENTS</span>
                  <span className="text-purple-500 font-bold">PPM</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-center font-mono">
                  <div className={`p-1.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] text-slate-400 block">N</span>
                    <span className="text-xs font-bold text-emerald-500">{npk.n}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] text-slate-400 block">P</span>
                    <span className="text-xs font-bold text-cyan-500">{npk.p}</span>
                  </div>
                  <div className={`p-1.5 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[9px] text-slate-400 block">K</span>
                    <span className="text-xs font-bold text-purple-500">{npk.k}</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}
        
        {/* SECTION 3: LIVE MANDI / MARKET PRICES */}
        {(activeTab === 'all' || activeTab === 'market') && (
          <section className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-500 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                BD Mandi Live Tracker
              </span>
              <h2 className="text-2xl font-black mt-1">
                {lang === 'en' ? 'Live Local Market Prices' : 'বাংলাদেশের স্থানীয় পাইকারি বাজারদর'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketPrices.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-3xl border transition-all backdrop-blur-md ${
                  theme === 'dark' ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-slate-200 hover:border-emerald-400 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start text-xs text-slate-400">
                    <span className={`font-mono px-2 py-0.5 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>{item.location}</span>
                    <span className="text-emerald-500 font-bold">{item.trend}</span>
                  </div>
                  <h3 className="text-lg font-extrabold mt-3">{item.crop}</h3>
                  <p className="text-2xl font-black text-cyan-500 font-mono mt-1">{item.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: AI DIAGNOSTICS LAB WITH REPORT DOWNLOAD */}
        {(activeTab === 'all' || activeTab === 'ailab') && (
          <section className="max-w-4xl mx-auto space-y-6">
            <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 backdrop-blur-md transition-all ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="text-xs font-mono text-purple-500 font-bold uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Computer Vision Diagnostics
                  </span>
                  <h2 className="text-2xl font-black mt-1">
                    {lang === 'en' ? 'AI Disease Neural Diagnostics' : 'কৃত্রিম বুদ্ধিমত্তা দিয়ে রোগ নির্ণয়'}
                  </h2>
                </div>
                {aiResult && (
                  <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-all">
                    📄 {lang === 'en' ? 'Print / Export PDF' : 'ডাউনলোড / প্রিন্ট রিপোর্ট'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Image Upload Box */}
                <div className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[200px] ${
                  theme === 'dark' ? 'border-slate-700 bg-slate-950/70 hover:border-cyan-500/60' : 'border-slate-300 bg-slate-50 hover:border-cyan-400'
                }`}>
                  {selectedImage ? (
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Sample" className="w-full h-full object-cover" />
                      <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-slate-900/90 text-white rounded-full p-2 text-xs">✕</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl block mb-2">📸</span>
                      <p className="text-xs font-bold">{lang === 'en' ? 'Upload leaf sample image' : 'আক্রান্ত পাতার ছবি আপলোড করুন'}</p>
                      <label className="mt-4 px-5 py-2 bg-slate-800 text-slate-100 font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-700 transition-all">
                        {lang === 'en' ? 'Choose File' : 'ফাইল বাছুন'}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>

                {/* Presets and Action */}
                <div className="space-y-4">
                  <p className="text-xs font-bold">{lang === 'en' ? 'Or try with sample presets:' : 'ডেমো স্যাম্পল বেছে নিয়ে পরীক্ষা করুন:'}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }}
                      className={`p-3 rounded-2xl border text-left transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-cyan-400'}`}
                    >
                      <span className="block font-bold text-xs">Rice Leaf Sample</span>
                      <span className="text-[9px] text-slate-400 font-mono">Bacterial Blight</span>
                    </button>

                    <button
                      onClick={() => { setSelectedImage('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'); setAiResult(null); }}
                      className={`p-3 rounded-2xl border text-left transition-all ${theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-cyan-400'}`}
                    >
                      <span className="block font-bold text-xs">Corn Leaf Sample</span>
                      <span className="text-[9px] text-slate-400 font-mono">Common Rust</span>
                    </button>
                  </div>

                  <button
                    onClick={runAiDiagnostics}
                    disabled={aiLoading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
                  >
                    {aiLoading ? (lang === 'en' ? 'Analyzing Patterns...' : 'এআই বিশ্লেষণ চলছে...') : (lang === 'en' ? '🚀 Run AI Diagnostic' : '🚀 এআই ডায়াগনস্টিক চালান')}
                  </button>
                </div>

              </div>

              {/* AI Result View */}
              {aiResult && (
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  theme === 'dark' ? 'bg-slate-950 border-cyan-500/50' : 'bg-slate-50 border-cyan-400 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                    <h4 className="text-base font-bold">{aiResult.disease}</h4>
                    <span className="text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">{aiResult.confidence}</span>
                  </div>
                  <div className="text-xs space-y-2">
                    <p><strong className="text-rose-400">{lang === 'en' ? 'Threat Level:' : 'ঝুঁকির মাত্রা:'}</strong> {aiResult.severity}</p>
                    <p><strong className="text-emerald-400">{lang === 'en' ? 'Protected Value:' : 'সংরক্ষিত ফসল:'}</strong> {aiResult.roiProtection}</p>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <strong>{lang === 'en' ? 'Prescription:' : 'প্রতিকার:'}</strong> {aiResult.treatment}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* SECTION 5: DRONE RADAR & CONTROL */}
        {(activeTab === 'all' || activeTab === 'drone') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-xl backdrop-blur-xl transition-all ${
            theme === 'dark' ? 'bg-slate-900/60 border-cyan-500/30' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-cyan-500 font-extrabold uppercase tracking-widest bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30">
                  Autonomous Drone Patrol
                </span>
                <h2 className="text-2xl font-black">
                  {lang === 'en' ? 'Drone Telemetry & Irrigation Controls' : 'ড্রোন রাডার ও অটো সেচ নিয়ন্ত্রণ'}
                </h2>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className={`p-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-slate-400 block text-[9px]">STATUS</span>
                    <span className="text-emerald-500 font-bold">{droneStatus}</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-slate-400 block text-[9px]">FIELD TEMP</span>
                    <span className="text-cyan-500 font-bold">{droneThermal}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <button
                    onClick={() => setPumpActive(!pumpActive)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      pumpActive ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                    }`}
                  >
                    {pumpActive ? (lang === 'en' ? '🔴 Stop Water Pump' : '🔴 পানির পাম্প বন্ধ করুন') : (lang === 'en' ? '💧 Start Water Pump' : '💧 পানির পাম্প চালু করুন')}
                  </button>

                  <button
                    onClick={() => setAutoMode(!autoMode)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border ${theme === 'dark' ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'}`}
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
      <footer className={`border-t py-6 text-center text-xs font-mono ${
        theme === 'dark' ? 'border-slate-900 bg-[#060a17] text-slate-500' : 'border-slate-200 bg-white text-slate-400'
      }`}>
        AgriNexus AI Prime v5.0 • Enterprise Agritech Platform
      </footer>

    </div>
  );
}
    
