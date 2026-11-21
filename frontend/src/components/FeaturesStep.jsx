import React, { useState } from 'react';
import { Sliders, Plus, ArrowRight, Grid, Sparkles } from 'lucide-react';
import { calculateRiceScore, determineQuadrant } from '../engine/researchEngine';

export default function FeaturesStep({ state, onUpdateFeature, onAddFeature, onNext }) {
  const [selectedQuadrant, setSelectedQuadrant] = useState('ALL');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Core Feature');
  const [showAddForm, setShowAddForm] = useState(false);

  const features = (state.features || []).map((f) => {
    const score = calculateRiceScore(f.reach, f.impact, f.confidence, f.effort);
    const quadrant = determineQuadrant(f.impact, f.effort);
    return { ...f, rice_score: score, quadrant };
  });

  const filteredFeatures = selectedQuadrant === 'ALL'
    ? features
    : features.filter((f) => f.quadrant === selectedQuadrant);

  const handleSliderChange = (featureId, field, value) => {
    const updated = features.map((f) => {
      if (f.id === featureId) {
        const next = { ...f, [field]: Number(value) };
        next.rice_score = calculateRiceScore(next.reach, next.impact, next.confidence, next.effort);
        next.quadrant = determineQuadrant(next.impact, next.effort);
        return next;
      }
      return f;
    });
    onUpdateFeature(updated);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newFeat = {
      id: `feat-${Date.now()}`,
      title: newTitle.trim(),
      description: 'Custom user defined feature backlog item.',
      category: newCategory,
      reach: 10000,
      impact: 2.0,
      confidence: 0.8,
      effort: 2.0,
      moscow: 'Must Have',
      rice_score: calculateRiceScore(10000, 2.0, 0.8, 2.0),
      quadrant: determineQuadrant(2.0, 2.0)
    };
    onAddFeature([...features, newFeat]);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Step 4: RICE Scoring & 2x2 Impact-Effort Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Quantitative Feature Prioritization
          </h2>
          <p className="text-sm text-slate-300">
            Tune Reach, Impact, Confidence, and Effort sliders in real time to calculate deterministic RICE ranks.
          </p>
        </div>
      </div>

      {/* 2x2 Impact vs Effort Matrix Visual Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Grid className="w-4 h-4 text-sky-400" />
            <span>2x2 Value-to-Effort Matrix</span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {['ALL', 'Quick Win', 'Strategic Bet', 'Fill-in', 'Money Pit'].map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuadrant(q)}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  selectedQuadrant === q
                    ? 'bg-sky-500 text-white font-bold shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quick Wins */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">⚡ Quick Wins (High Impact, Low Effort)</span>
              <span className="text-xs font-bold text-emerald-500">
                {features.filter((f) => f.quadrant === 'Quick Win').length}
              </span>
            </div>
            <div className="space-y-1.5 min-h-[60px]">
              {features
                .filter((f) => f.quadrant === 'Quick Win')
                .map((f) => (
                  <div key={f.id} className="text-xs text-slate-200 bg-slate-900/80 border border-slate-800 rounded p-2 flex justify-between items-center">
                    <span className="font-medium truncate mr-2">{f.title}</span>
                    <span className="text-emerald-400 font-bold font-mono">RICE: {f.rice_score.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Strategic Bets */}
          <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">🎯 Strategic Bets (High Impact, High Effort)</span>
              <span className="text-xs font-bold text-sky-500">
                {features.filter((f) => f.quadrant === 'Strategic Bet').length}
              </span>
            </div>
            <div className="space-y-1.5 min-h-[60px]">
              {features
                .filter((f) => f.quadrant === 'Strategic Bet')
                .map((f) => (
                  <div key={f.id} className="text-xs text-slate-200 bg-slate-900/80 border border-slate-800 rounded p-2 flex justify-between items-center">
                    <span className="font-medium truncate mr-2">{f.title}</span>
                    <span className="text-sky-400 font-bold font-mono">RICE: {f.rice_score.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Fill-ins */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">⏳ Fill-ins (Low Impact, Low Effort)</span>
              <span className="text-xs font-bold text-amber-500">
                {features.filter((f) => f.quadrant === 'Fill-in').length}
              </span>
            </div>
            <div className="space-y-1.5 min-h-[60px]">
              {features
                .filter((f) => f.quadrant === 'Fill-in')
                .map((f) => (
                  <div key={f.id} className="text-xs text-slate-200 bg-slate-900/80 border border-slate-800 rounded p-2 flex justify-between items-center">
                    <span className="font-medium truncate mr-2">{f.title}</span>
                    <span className="text-amber-400 font-bold font-mono">RICE: {f.rice_score.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Money Pits */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">⚠️ Money Pits (Low Impact, High Effort)</span>
              <span className="text-xs font-bold text-rose-500">
                {features.filter((f) => f.quadrant === 'Money Pit').length}
              </span>
            </div>
            <div className="space-y-1.5 min-h-[60px]">
              {features
                .filter((f) => f.quadrant === 'Money Pit')
                .map((f) => (
                  <div key={f.id} className="text-xs text-slate-200 bg-slate-900/80 border border-slate-800 rounded p-2 flex justify-between items-center">
                    <span className="font-medium truncate mr-2">{f.title}</span>
                    <span className="text-rose-400 font-bold font-mono">RICE: {f.rice_score.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sliders Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Prioritized Features Backlog ({filteredFeatures.length})
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Feature</span>
          </button>
        </div>

        {/* Add Feature Form */}
        {showAddForm && (
          <form onSubmit={handleAddSubmit} className="bg-slate-950 border border-sky-500/30 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">New Feature Item</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Feature name / title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category (e.g. Core, Platform)..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition"
              >
                Add to Backlog
              </button>
            </div>
          </form>
        )}

        {/* Feature Cards with Live Sliders */}
        <div className="space-y-4">
          {filteredFeatures
            .sort((a, b) => b.rice_score - a.rice_score)
            .map((feat) => (
              <div
                key={feat.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {feat.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{feat.description}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold px-3 py-1 rounded-lg">
                      RICE: {feat.rice_score.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      {feat.quadrant}
                    </span>
                  </div>
                </div>

                {/* 4 Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-800/60">
                  {/* Reach */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Reach (users/mo)</span>
                      <span className="text-white font-mono">{feat.reach.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={feat.reach}
                      onChange={(e) => handleSliderChange(feat.id, 'reach', e.target.value)}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  {/* Impact */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Impact (0.5x - 3.0x)</span>
                      <span className="text-white font-mono">{feat.impact}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.5"
                      value={feat.impact}
                      onChange={(e) => handleSliderChange(feat.id, 'impact', e.target.value)}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Confidence */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Confidence (50% - 100%)</span>
                      <span className="text-white font-mono">{Math.round(feat.confidence * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.0"
                      step="0.05"
                      value={feat.confidence}
                      onChange={(e) => handleSliderChange(feat.id, 'confidence', e.target.value)}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Effort */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Effort (weeks: 0.5 - 6)</span>
                      <span className="text-white font-mono">{feat.effort}w</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="6.0"
                      step="0.5"
                      value={feat.effort}
                      onChange={(e) => handleSliderChange(feat.id, 'effort', e.target.value)}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-sky-500/20 transition"
        >
          <span>Generate Full PRD Specification</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
