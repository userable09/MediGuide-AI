import React, { useState } from 'react';
import { SideEffectAnalysis } from '../types';
import { apiFetch } from '../lib/api';
import {
  Activity,
  Sparkles,
  Loader2,
  AlertCircle,
  ShieldAlert,
  Heart,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const SideEffectView: React.FC = () => {
  const [medicine, setMedicine] = useState('Ibuprofen');
  const [symptoms, setSymptoms] = useState('Mild heartburn and stomach upset');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SideEffectAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckSideEffects = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicine.trim() || !symptoms.trim()) {
      setError('Please provide both the medication name and the symptoms experienced.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiFetch<{ data?: SideEffectAnalysis }>('/api/check-side-effects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicine, symptoms })
      });

      if (data.data) {
        setResult(data.data);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to complete side effect evaluation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <Activity className="w-3.5 h-3.5" />
          <span>Symptom & Medication Safety Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Side Effect Checker
        </h1>
        <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
          Evaluate whether symptoms you or a loved one are experiencing match known common or serious adverse drug reactions.
        </p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleCheckSideEffects} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Medication Name:
            </label>
            <input
              type="text"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="e.g., Metformin, Amoxicillin, Ibuprofen..."
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent dark:border-slate-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Symptoms Experienced:
            </label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., Stomach cramps, dizziness, skin rash..."
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent dark:border-slate-700"
            />
          </div>
        </div>

        {/* Quick Example Presets */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">Sample Presets:</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { med: 'Metformin', sym: 'Nausea and metallic taste' },
              { med: 'Amoxicillin', sym: 'Mild skin rash and hives' },
              { med: 'Ibuprofen', sym: 'Dark tarry stools and stomach pain' }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMedicine(preset.med);
                  setSymptoms(preset.sym);
                }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] shrink-0 transition-colors"
              >
                {preset.med} + {preset.sym.split(' ')[0]}...
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !medicine.trim() || !symptoms.trim()}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/20 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Symptoms via Groq AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Side Effects</span>
            </>
          )}
        </button>
      </form>

      {/* Error Output */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Output */}
      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-6 shadow-xl animate-in fade-in-50 duration-300">
          {/* Header & Classification Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Side Effect Analysis Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluation for <strong>{result.medicine}</strong> regarding "{result.symptomsReported}"
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              result.sideEffectType.includes('Serious') || result.emergencyCareNeeded
                ? 'bg-rose-500/10 text-rose-600 border-rose-500/30 animate-pulse'
                : 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30'
            }`}>
              Classification: {result.sideEffectType}
            </span>
          </div>

          {/* Emergency Alert Banner if needed */}
          {result.emergencyCareNeeded && (
            <div className="p-4 bg-rose-500/15 border-2 border-rose-500/40 text-rose-950 dark:text-rose-100 rounded-2xl space-y-2 animate-pulse">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Urgently Seek Emergency Medical Attention!</span>
              </div>
              <p className="text-xs leading-relaxed">
                {result.emergencyCareReason || 'The symptoms reported may indicate a serious adverse reaction or toxic effect. Please go to an emergency room or contact your local emergency service immediately.'}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-300 pt-1">
                <PhoneCall className="w-4 h-4" />
                <span>Emergency Services: 911 / 112 / Local Poison Hotline</span>
              </div>
            </div>
          )}

          {/* Common vs Serious Side Effects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-200/60 dark:border-purple-900/50 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm">
                Common Recognized Side Effects:
              </h4>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {result.commonSideEffects?.map((se, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-purple-600">•</span>
                    <span>{se}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200/60 dark:border-rose-900/50 space-y-2">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm">
                Serious Side Effects to Monitor:
              </h4>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {result.seriousSideEffects?.map((se, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{se}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Self-Care & Doctor Notice */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-3 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span>General Self-Care Advice:</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {result.selfCareAdvice?.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 italic">
              {result.consultDoctorNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
