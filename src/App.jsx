import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AILab from './pages/AILab';
import Architecture from './pages/Architecture';

export default function App() {
  const location = useLocation();

  const navItems = [
    { name: 'Live Dashboard', path: '/' },
    { name: 'AI Disease & Soil Lab', path: '/ai-lab' },
    { name: 'Architecture & Hardware', path: '/architecture' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-lg sm:text-xl">
                AgriSmart AI Pro
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">PRECISION IOT & ML PLATFORM</p>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  location.pathname === item.path
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai-lab" element={<AILab />} />
          <Route path="/architecture" element={<Architecture />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Smart Precision Agriculture System • Enterprise IoT & Random Forest ML Demonstration
      </footer>
    </div>
  );
      }
