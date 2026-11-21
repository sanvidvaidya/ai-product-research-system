import React from 'react';
import { Users, HeartCrack, Layers, ArrowRight, Quote } from 'lucide-react';

export default function PersonasStep({ state, onNext }) {
  const personas = state.personas || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Step 3: User Persona & Empathy Mapping</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Target User Archetypes & Pain Vectors
          </h2>
          <p className="text-sm text-slate-300">
            Understand emotional triggers, workflow blockers, and current workarounds.
          </p>
        </div>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Profile Header */}
              <div className="flex items-center space-x-4">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-sky-500/40 shadow-md"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs font-semibold text-sky-400">{p.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.demographics}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 relative text-xs text-slate-300 italic flex items-start space-x-2">
                <Quote className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <span>"{p.quote}"</span>
              </div>

              {/* Daily Workflow */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Day in the Life & Workflow
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                  {p.daily_workflow}
                </p>
              </div>

              {/* Critical Pain Points */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400">
                  <HeartCrack className="w-3.5 h-3.5" />
                  <span>Primary Pain Points & Friction</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {p.pain_points.map((pt, i) => (
                    <li key={i} className="flex items-start space-x-2 bg-rose-500/5 border border-rose-500/10 rounded-md p-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Everyday Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech_stack.map((t, i) => (
                    <span
                      key={i}
                      className="bg-slate-800 border border-slate-700/80 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-sky-500/20 transition"
        >
          <span>Proceed to RICE Prioritization</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
