import React from 'react';
import { Sparkles, Download, Copy, Key, RotateCcw, FileText } from 'lucide-react';
import { PRESET_DOMAINS } from '../engine/researchEngine';

export default function Header({ currentDomainId, onSelectDomain, onOpenKeyModal, hasCustomKey, onExportMarkdown, onExportJson, onReset }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-black text-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-tight">AI Product Research System</h1>
              <span className="text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">PRD Studio v1.0</span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Automated market intelligence, RICE feature matrices, and executive decision scorecards</p>
          </div>
        </div>

        {/* Domain Presets & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <select
              value={currentDomainId}
              onChange={(e) => onSelectDomain(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="ai-meeting-insights">🎙️ AI Meeting Insights Studio</option>
              <option value="fintech-lending">💳 SME Credit & Underwriting</option>
            </select>
          </div>

          <button
            onClick={onOpenKeyModal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              hasCustomKey
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Configure BYOK LLM Key (OpenAI / Claude)"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{hasCustomKey ? 'LLM Active' : 'BYOK Key'}</span>
          </button>

          <button
            onClick={onExportMarkdown}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition shadow shadow-sky-600/30"
            title="Download PRD as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PRD</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
            title="Reset to default preset values"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
