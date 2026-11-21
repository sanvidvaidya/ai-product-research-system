import React from 'react';
import { Target, Users, Compass, Sliders, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'problem', label: '1. Problem & TAM', icon: Target, desc: 'Problem framing & market size' },
  { id: 'competitors', label: '2. Competitors & Map', icon: Compass, desc: 'Landscape & positioning map' },
  { id: 'personas', label: '3. User Personas', icon: Users, desc: 'Empathy maps & workflows' },
  { id: 'features', label: '4. RICE Features', icon: Sliders, desc: '2x2 Prioritization matrix' },
  { id: 'prd', label: '5. PRD Studio', icon: FileText, desc: 'Full engineering specification' },
  { id: 'decision', label: '6. Decision Scorecard', icon: CheckCircle2, desc: 'Build / Pivot / Abandon verdict' },
];

export default function StepNavigation({ currentStep, onSelectStep }) {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
