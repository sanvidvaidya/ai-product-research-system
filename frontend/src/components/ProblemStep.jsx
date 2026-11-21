import React from 'react';
import { Target, DollarSign, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export default function ProblemStep({ state, onChange, onNext }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Step 1: Strategic Problem Framing & Market Sizing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            {state.title}
          </h2>
          <p className="text-sm text-slate-300">
            {state.tagline}
          </p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Problem & Audience */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Core Problem Statement
            </label>
            <textarea
              rows={4}
              value={state.problem_statement}
              onChange={(e) => onChange('problem_statement', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 leading-relaxed"
            />
            <p className="text-xs text-slate-500 mt-2">
              Articulate the acute friction, quantifiable time/revenue lost, and downstream organizational impact.
            </p>
          </div>

          {/* Target Audience & Segments */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Target Customer Archetypes
            </label>
            <div className="flex flex-wrap gap-2">
              {state.target_users.map((user, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 border border-slate-700/80 text-sky-300 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center space-x-2"
                >
                  <span>{user}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Key Constraints */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>Architectural, Regulatory & Privacy Constraints</span>
            </div>
            <ul className="space-y-2">
              {state.constraints.map((c, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Market Sizing & North Star */}
        <div className="space-y-6">
          {/* Market Sizing (TAM/SAM/SOM) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              <DollarSign className="w-4 h-4" />
              <span>Market Sizing Estimates (USD)</span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400 font-medium">TAM (Total Addressable)</span>
                  <span className="text-emerald-400 font-bold">${state.tam_usd_billions}B</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full" />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400 font-medium">SAM (Serviceable)</span>
                  <span className="text-sky-400 font-bold">${state.sam_usd_billions}B</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full"
                    style={{ width: `${(state.sam_usd_billions / state.tam_usd_billions) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-400 font-medium">SOM (Obtainable, Year 1-3)</span>
                  <span className="text-indigo-400 font-bold">${state.som_usd_billions}B</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full"
                    style={{ width: `${(state.som_usd_billions / state.tam_usd_billions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
              <Award className="w-4 h-4" />
              <span>Target Success Metrics & KPIs</span>
            </div>
            <div className="space-y-3">
              {Object.entries(state.success_metrics).map(([k, v], idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-lg p-2.5">
                  <div className="text-[11px] font-semibold text-slate-400">{k}</div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-sky-500/20 transition"
          >
            <span>Proceed to Competitive Landscape</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
