import React, { useState } from 'react';
import { FileText, Copy, Download, Check, Code, Eye, ArrowRight } from 'lucide-react';
import { buildMarkdownPRD } from '../engine/researchEngine';

export default function PRDStep({ state, onNext }) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('formatted'); // 'formatted' | 'raw'

  const markdownContent = buildMarkdownPRD(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PRD-${state.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ProductResearch-${state.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Step 5: Executive PRD Document & Engineering Specification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Generated Product Requirement Document
          </h2>
          <p className="text-sm text-slate-300">
            Complete GitHub-flavored markdown PRD incorporating problem validation, personas, RICE rankings, and telemetry schemas.
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('formatted')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'formatted'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Formatted Spec</span>
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'raw'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handleDownloadMd}
            className="flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition shadow shadow-sky-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Document Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {viewMode === 'raw' ? (
          <textarea
            readOnly
            value={markdownContent}
            rows={28}
            className="w-full bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-800 leading-relaxed focus:outline-none"
          />
        ) : (
          <div className="prose prose-invert max-w-none space-y-6 text-slate-200 text-sm leading-relaxed">
            {/* Title Block */}
            <div className="border-b border-slate-800 pb-6">
              <span className="text-xs font-semibold text-sky-400 tracking-wider uppercase">Product Requirement Document</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">{state.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span><strong>Version:</strong> 1.0.0</span>
                <span><strong>Author:</strong> Sanvid Vaidya</span>
                <span><strong>Date:</strong> {new Date().toISOString().split('T')[0]}</span>
                <span className="text-emerald-400"><strong>Status:</strong> Approved / MVP Stage</span>
              </div>
            </div>

            {/* Section 1 */}
            <div>
              <h3 className="text-base font-bold text-white border-l-4 border-sky-500 pl-3">
                1. Executive Summary & Problem Framing
              </h3>
              <p className="text-slate-300 mt-2">{state.problem_statement}</p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-base font-bold text-white border-l-4 border-sky-500 pl-3">
                2. Market Sizing & North Star Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <span className="text-xs text-slate-400">TAM</span>
                  <p className="text-lg font-bold text-emerald-400">${state.tam_usd_billions}B</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <span className="text-xs text-slate-400">SAM</span>
                  <p className="text-lg font-bold text-sky-400">${state.sam_usd_billions}B</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <span className="text-xs text-slate-400">SOM (Years 1-3)</span>
                  <p className="text-lg font-bold text-indigo-400">${state.som_usd_billions}B</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-base font-bold text-white border-l-4 border-sky-500 pl-3">
                3. Functional Requirements & User Stories
              </h3>
              <div className="space-y-4 mt-3">
                {state.user_stories.map((us) => (
                  <div key={us.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-sky-500/10 text-sky-400 text-xs font-mono font-bold px-2 py-0.5 rounded border border-sky-500/20">
                        {us.id}
                      </span>
                      <h4 className="text-sm font-bold text-white">{us.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>As a</strong> {us.as_a}, <strong>I want to</strong> {us.i_want_to}, <strong>So that</strong> {us.so_that}.
                    </p>
                    <div className="pt-2 text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Acceptance Criteria (Gherkin):</span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1">
                        {us.acceptance_criteria.map((ac, i) => (
                          <li key={i}>{ac}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-base font-bold text-white border-l-4 border-sky-500 pl-3">
                4. Technical Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {Object.entries(state.technical_architecture).map(([k, v]) => (
                  <div key={k} className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                    <span className="text-xs font-bold text-sky-400">{k}</span>
                    <p className="text-xs text-slate-300 mt-1">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-base font-bold text-white border-l-4 border-sky-500 pl-3">
                5. Telemetry & Product Analytics Plan
              </h3>
              <div className="border border-slate-800 rounded-xl overflow-hidden mt-3">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3 font-semibold">Event Name</th>
                      <th className="p-3 font-semibold">Payload Parameters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {state.telemetry_plan.map((t, i) => (
                      <tr key={i}>
                        <td className="p-3 font-mono font-medium text-sky-300">{t.event}</td>
                        <td className="p-3 font-mono text-slate-400">{t.properties}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-sky-500/20 transition"
        >
          <span>Evaluate Decision Scorecard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
