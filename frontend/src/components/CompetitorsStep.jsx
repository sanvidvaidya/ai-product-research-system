import React from 'react';
import { Compass, Shield, Zap, ArrowRight } from 'lucide-react';

export default function CompetitorsStep({ state, onNext }) {
  const competitors = state.competitors || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Step 2: Competitive Intelligence & 2D Positioning Map</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Market Landscape & Strategic Moat
          </h2>
          <p className="text-sm text-slate-300">
            Map direct and adjacent alternatives across automation depth and ecosystem integration.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Competitors List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Key Competitor Breakdown ({competitors.length})
          </h3>

          <div className="space-y-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-sky-400">
                      {comp.name.substring(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                      <span className="text-[11px] text-slate-400">{comp.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="bg-slate-800/80 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-md font-medium">
                      {comp.pricing}
                    </span>
                    <span className="text-indigo-400 font-semibold">
                      {comp.market_share}% Share
                    </span>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                    <div className="font-semibold text-emerald-400 mb-1.5 flex items-center space-x-1">
                      <span>✓ Key Strengths</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {comp.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                    <div className="font-semibold text-rose-400 mb-1.5 flex items-center space-x-1">
                      <span>✕ Critical Weaknesses</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {comp.weaknesses.map((w, i) => (
                        <li key={i}>• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Differentiation Wedge */}
                <div className="bg-sky-500/5 border border-sky-500/20 rounded-lg p-2.5 text-xs">
                  <span className="font-semibold text-sky-400">Our Strategic Wedge: </span>
                  <span className="text-slate-300">{comp.differentiation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: 2D Positioning Map & Moat */}
        <div className="space-y-6">
          {/* 2D Positioning Canvas */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Strategic Positioning Map
            </h3>
            <div className="relative w-full aspect-square bg-slate-950 rounded-lg border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
              {/* Axes */}
              <div className="absolute inset-x-4 top-1/2 h-px bg-slate-800" />
              <div className="absolute inset-y-4 left-1/2 w-px bg-slate-800" />

              {/* Labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-sky-400 tracking-wider">
                Autonomous Action ↑
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                Passive / Manual ↓
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] uppercase font-bold text-slate-500 tracking-wider -rotate-90">
                Point Tool
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] uppercase font-bold text-sky-400 tracking-wider rotate-90">
                Ecosystem
              </span>

              {/* Competitor Dots */}
              {competitors.map((c, i) => {
                const leftPct = 50 + c.x * 38;
                const topPct = 50 - c.y * 38;
                return (
                  <div
                    key={i}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-400 group-hover:scale-125 transition shadow" />
                    <span className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 text-[10px] text-slate-200 px-1.5 py-0.5 rounded whitespace-nowrap shadow pointer-events-none">
                      {c.name}
                    </span>
                  </div>
                );
              })}

              {/* Our Product Dot */}
              <div
                style={{ left: '78%', top: '22%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-pulse"
              >
                <div className="w-5 h-5 rounded-full bg-sky-500 border-2 border-white shadow-lg shadow-sky-500/50 flex items-center justify-center text-[9px] text-white font-black" />
                <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-sky-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
                  ★ Our PRD Spec
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Positioned in High Automation + Broad Workflow Integration quadrant.
            </p>
          </div>

          {/* Primary Moat */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Shield className="w-4 h-4" />
              <span>Sustainable Competitive Moat</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
              {state.moat}
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-sky-500/20 transition"
          >
            <span>Proceed to User Personas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
