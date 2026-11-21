import React, { useState } from 'react';
import { Award, CheckCircle2, AlertTriangle, XCircle, Sparkles, RefreshCw } from 'lucide-react';
import { evaluateDecisionScorecard } from '../engine/researchEngine';

export default function DecisionStep({ state, onReset }) {
  const initialScores = state.scorecard ? {
    market_demand: state.scorecard.market_demand,
    technical_feasibility: state.scorecard.technical_feasibility,
    competitive_defensibility: state.scorecard.competitive_defensibility,
    monetization_potential: state.scorecard.monetization_potential,
    strategic_fit: state.scorecard.strategic_fit,
  } : {
    market_demand: 9.0,
    technical_feasibility: 8.5,
    competitive_defensibility: 8.0,
    monetization_potential: 8.8,
    strategic_fit: 9.2,
  };

  const [scores, setScores] = useState(initialScores);

  const evaluation = evaluateDecisionScorecard(scores);

  const handleScoreChange = (pillar, value) => {
    setScores((prev) => ({ ...prev, [pillar]: Number(value) }));
  };

  const getBadgeStyle = (rec) => {
    if (rec.includes('BUILD')) {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        icon: CheckCircle2,
        ring: 'border-emerald-500',
        text: 'text-emerald-400'
      };
    }
    if (rec.includes('PIVOT')) {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        icon: AlertTriangle,
        ring: 'border-amber-500',
        text: 'text-amber-400'
      };
    }
    return {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      icon: XCircle,
      ring: 'border-rose-500',
      text: 'text-rose-400'
    };
  };

  const badge = getBadgeStyle(evaluation.recommendation);
  const VerdictIcon = badge.icon;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Step 6: Executive Decision Scorecard & Go / No-Go Verdict</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Weighted Decision Matrix
          </h2>
          <p className="text-sm text-slate-300">
            Adjust strategic pillar scores to dynamically evaluate whether to Build, Pivot, or Abandon.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Strategic Evaluation Pillars (1 - 10)
          </h3>

          <div className="space-y-5">
            {/* Market Demand */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Market Demand & Customer Urgency (25% weight)</span>
                <span className="font-bold text-sky-400 font-mono">{scores.market_demand.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={scores.market_demand}
                onChange={(e) => handleScoreChange('market_demand', e.target.value)}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Technical Feasibility */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Technical Feasibility & Architecture Risk (20% weight)</span>
                <span className="font-bold text-indigo-400 font-mono">{scores.technical_feasibility.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={scores.technical_feasibility}
                onChange={(e) => handleScoreChange('technical_feasibility', e.target.value)}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Competitive Defensibility */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Competitive Defensibility & Moat (20% weight)</span>
                <span className="font-bold text-emerald-400 font-mono">{scores.competitive_defensibility.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={scores.competitive_defensibility}
                onChange={(e) => handleScoreChange('competitive_defensibility', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Monetization Potential */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Monetization Potential & Unit Economics (20% weight)</span>
                <span className="font-bold text-amber-400 font-mono">{scores.monetization_potential.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={scores.monetization_potential}
                onChange={(e) => handleScoreChange('monetization_potential', e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Strategic Fit */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Team Competence & Strategic Fit (15% weight)</span>
                <span className="font-bold text-purple-400 font-mono">{scores.strategic_fit.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={scores.strategic_fit}
                onChange={(e) => handleScoreChange('strategic_fit', e.target.value)}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Score Dial & Executive Verdict */}
        <div className="space-y-6">
          {/* Dial Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Composite Strategic Score
            </span>

            <div className="relative inline-flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full border-4 ${badge.ring} flex flex-col items-center justify-center bg-slate-950 shadow-inner`}>
                <span className={`text-4xl font-black font-mono ${badge.text}`}>
                  {evaluation.overall_score}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold mt-0.5">OUT OF 100</span>
              </div>
            </div>

            {/* Recommendation Tag */}
            <div>
              <div className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border text-xs font-bold ${badge.bg}`}>
                <VerdictIcon className="w-4 h-4" />
                <span>{evaluation.recommendation}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Confidence Level: <strong className="text-white">{evaluation.confidence}</strong>
              </p>
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Executive Evaluation Memo
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 border border-slate-800/80 rounded-lg p-3">
              {evaluation.summary}
            </p>

            {/* Strengths */}
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-emerald-400 text-[11px] uppercase">Identified Strengths:</span>
              <ul className="space-y-1 text-slate-300">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="space-y-1 text-xs pt-1">
              <span className="font-semibold text-rose-400 text-[11px] uppercase">Key Execution Risks:</span>
              <ul className="space-y-1 text-slate-300">
                {evaluation.risks.map((r, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
