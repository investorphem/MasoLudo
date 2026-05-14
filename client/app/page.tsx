"use client";
import React, { useState } from 'react';

export default function MasoLudoApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-5 font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-xl font-black tracking-tighter text-emerald-400">MASOLUDO</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Premium Duel</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2">
          <span className="text-xs text-slate-400 block">Balance</span>
          <span className="font-mono text-emerald-400 font-bold">24.50 cUSD</span>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800">
          <span className="text-2xl">🏆</span>
          <h3 className="text-xl font-bold mt-2">12</h3>
          <p className="text-xs text-slate-500">Wins</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800">
          <span className="text-2xl">🔥</span>
          <h3 className="text-xl font-bold mt-2">4</h3>
          <p className="text-xs text-slate-500">Streak</p>
        </div>
      </div>

      {/* Action Area */}
      <div className="space-y-4">
        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-3xl shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all flex justify-between px-8 items-center">
          CREATE NEW DUEL
          <span className="bg-slate-950 text-emerald-400 text-xs px-3 py-1 rounded-full">+$</span>
        </button>

        {/* Active Lobby List */}
        <div className="pt-4">
          <h2 className="text-sm font-bold text-slate-400 mb-4 px-2 uppercase tracking-widest">Available Duels</h2>
          
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex justify-between items-center mb-3">
            <div>
              <h4 className="font-bold">LudoKing_99</h4>
              <p className="text-xs text-slate-500 font-mono">Wager: 5.00 cUSD</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-slate-800 text-xs px-4 py-2 rounded-xl hover:bg-slate-700">HAGGLE</button>
              <button className="bg-white text-slate-950 text-xs font-bold px-4 py-2 rounded-xl">JOIN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
