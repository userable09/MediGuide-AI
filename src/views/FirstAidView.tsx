import React, { useState } from 'react';
import { PRESET_FIRST_AID } from '../data/medications';
import { apiFetch } from '../lib/api';
import {
  HeartPulse,
  Flame,
  Brain,
  Scissors,
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  Thermometer,
  Sparkles,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

export const FirstAidView: React.FC = () => {
  const [activeConditionKey, setActiveConditionKey] = useState<string>('fever');
  const [customCondition, setCustomCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiFirstAidData, setAiFirstAidData] = useState<any | null>(null);

  const activeGuide = aiFirstAidData || PRESET_FIRST_AID[activeConditionKey] || PRESET_FIRST_AID['fever'];

  const presetTopics = [
    { key: 'fever', label: 'Fever', icon: <Thermometer className="w-4 h-4 text-rose-500" /> },
    { key: 'headache', label: 'Headache / Migraine', icon: <Brain className="w-4 h-4 text-purple-500" /> },
    { key: 'burns', label: 'Minor Burns', icon: <Flame className="w-4 h-4 text-amber-500" /> },
    { key: 'cuts', label: 'Cuts & Scrapes', icon: <Scissors className="w-4 h-4 text-emerald-500" /> },
  ];

  const handleCustomFirstAid = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customCondition.trim()) return;

    setIsLoading(true);
    setAiFirstAidData(null);

    try {
      const data = await apiFetch<{ data?: any }>('/api/first-aid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: customCondition })
      });

      if (data.data) {
        setAiFirstAidData(data.data);
      }
    } catch (err) {
      console.error('First aid AI error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Educational Emergency First Response</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          First Aid AI Assistant
        </h1>
        <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
          Get immediate step-by-step first-aid care, things to avoid, home remedies, and emergency call triggers for common injuries & acute symptoms.
        </p>
      </div>

      {/* Emergency Call Box */}
      <div className="p-4 bg-rose-500/15 border-2 border-rose-500/40 text-rose-950 dark:text-rose-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
          <div className="text-xs">
            <strong className="font-bold text-sm block text-rose-700 dark:text-rose-300">
              Is this a severe medical emergency?
            </strong>
            <p>
              If the victim is unresponsive, experiencing chest pain, difficulty breathing, profuse bleeding, or severe anaphylaxis, call emergency services immediately!
            </p>
          </div>
        </div>

        <a
          href="tel:911"
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 shrink-0 transition-all"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 911 / 112</span>
        </a>
      </div>

      {/* Topics Tabs & AI Custom Query Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 uppercase tracking-wider">
            Common Topics:
          </span>
          {presetTopics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => {
                setActiveConditionKey(topic.key);
                setAiFirstAidData(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeConditionKey === topic.key && !aiFirstAidData
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {topic.icon}
              <span>{topic.label}</span>
            </button>
          ))}
        </div>

        {/* AI Custom Search Form */}
        <form onSubmit={handleCustomFirstAid} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <input
            type="text"
            value={customCondition}
            onChange={(e) => setCustomCondition(e.target.value)}
            placeholder="Ask AI First Aid for other situations (e.g., Food Poisoning, Allergic reaction, Cold & Flu)..."
            className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 border border-transparent dark:border-slate-700"
          />
          <button
            type="submit"
            disabled={isLoading || !customCondition.trim()}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Ask First Aid AI</span>
          </button>
        </form>
      </div>

      {/* Guide Details Display */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeGuide.condition}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeGuide.summary || 'Educational first response instructions'}
            </p>
          </div>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-full border border-rose-500/20">
            First Aid Protocol
          </span>
        </div>

        {/* 4 Cards Grid: Steps, Avoid, When to seek ER, Home Care */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Immediate Steps */}
          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Immediate First Response Steps:</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {activeGuide.immediateSteps?.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Avoid */}
          <div className="p-5 bg-rose-50/50 dark:bg-rose-950/30 rounded-2xl border border-rose-200/60 dark:border-rose-900/50 space-y-2">
            <h3 className="font-bold text-rose-900 dark:text-rose-200 text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>What NOT to Do (Dangerous Mistakes):</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {activeGuide.whatToAvoid?.map((avoid: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span className="leading-relaxed">{avoid}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Seek Emergency */}
          <div className="p-5 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/50 space-y-2">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Red-Flag Emergency Triggers (ER Visit Needed):</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {activeGuide.whenToSeekEmergency?.map((er: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span className="leading-relaxed">{er}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Home Care */}
          <div className="p-5 bg-sky-50/50 dark:bg-sky-950/30 rounded-2xl border border-sky-200/60 dark:border-sky-900/50 space-y-2">
            <h3 className="font-bold text-sky-900 dark:text-sky-200 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>General Recovery & Home Care:</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              {activeGuide.generalHomeCare?.map((care: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-600">•</span>
                  <span className="leading-relaxed">{care}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
