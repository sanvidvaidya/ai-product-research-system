import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StepNavigation from './components/StepNavigation';
import ProblemStep from './components/ProblemStep';
import CompetitorsStep from './components/CompetitorsStep';
import PersonasStep from './components/PersonasStep';
import FeaturesStep from './components/FeaturesStep';
import PRDStep from './components/PRDStep';
import DecisionStep from './components/DecisionStep';
import ApiKeyModal from './components/ApiKeyModal';
import { PRESET_DOMAINS, buildMarkdownPRD } from './engine/researchEngine';

export default function App() {
  const [currentDomainId, setCurrentDomainId] = useState('ai-meeting-insights');
  const [currentStep, setCurrentStep] = useState('problem');
  const [domainState, setDomainState] = useState(() => JSON.parse(JSON.stringify(PRESET_DOMAINS['ai-meeting-insights'])));
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('byok_api_key') || '');

  // Switch domain
  const handleSelectDomain = (domainId) => {
    if (PRESET_DOMAINS[domainId]) {
      setCurrentDomainId(domainId);
      setDomainState(JSON.parse(JSON.stringify(PRESET_DOMAINS[domainId])));
      setCurrentStep('problem');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset current research project back to original defaults?')) {
      setDomainState(JSON.parse(JSON.stringify(PRESET_DOMAINS[currentDomainId])));
    }
  };

  const handleFieldChange = (field, value) => {
    setDomainState((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateFeatures = (updatedFeatures) => {
    setDomainState((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleExportMarkdown = () => {
    const md = buildMarkdownPRD(domainState);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PRD-${domainState.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(domainState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ProductResearch-${domainState.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('byok_api_key', key);
    } else {
      localStorage.removeItem('byok_api_key');
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem('byok_api_key');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Header */}
      <Header
        currentDomainId={currentDomainId}
        onSelectDomain={handleSelectDomain}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        hasCustomKey={Boolean(apiKey)}
        onExportMarkdown={handleExportMarkdown}
        onExportJson={handleExportJson}
        onReset={handleReset}
      />

      {/* Step Navigation Bar */}
      <StepNavigation currentStep={currentStep} onSelectStep={setCurrentStep} />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'problem' && (
          <ProblemStep
            state={domainState}
            onChange={handleFieldChange}
            onNext={() => setCurrentStep('competitors')}
          />
        )}

        {currentStep === 'competitors' && (
          <CompetitorsStep
            state={domainState}
            onNext={() => setCurrentStep('personas')}
          />
        )}

        {currentStep === 'personas' && (
          <PersonasStep
            state={domainState}
            onNext={() => setCurrentStep('features')}
          />
        )}

        {currentStep === 'features' && (
          <FeaturesStep
            state={domainState}
            onUpdateFeature={handleUpdateFeatures}
            onAddFeature={handleUpdateFeatures}
            onNext={() => setCurrentStep('prd')}
          />
        )}

        {currentStep === 'prd' && (
          <PRDStep
            state={domainState}
            onNext={() => setCurrentStep('decision')}
          />
        )}

        {currentStep === 'decision' && (
          <DecisionStep
            state={domainState}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Product Research System & PRD Studio • Developed by Sanvid Vaidya</span>
          <span className="text-slate-600">Deterministic RICE calculations & Markdown document generation</span>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveKey}
        onClearKey={handleClearKey}
      />
    </div>
  );
}
