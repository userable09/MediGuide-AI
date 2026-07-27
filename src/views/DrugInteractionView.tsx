import React, { useState } from 'react';
import { DrugInteractionResult } from '../types';
import { apiFetch } from '../lib/api';
import {
  Zap,
  Plus,
  X,
  Sparkles,
  Loader2,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  UserCheck
} from 'lucide-react';

export const DrugInteractionView: React.FC = () => {
  const [medications, setMedications] = useState<string[]>(['Paracetamol', 'Ibuprofen']);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DrugInteractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddMedication = () => {
    if (currentInput.trim() && !medications.some((m) => m.toLowerCase() === currentInput.trim().toLowerCase())) {
      setMedications([...medications, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleCheckInteractions = async () => {
    if (medications.length < 2) {
      setError('Please add at least two medications to analyze potential interactions.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiFetch<{ data?: DrugInteractionResult }>('/api/check-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medications })
      });

      if (data.data) {
        setResult(data.data);
      } else {
        throw new Error('Unexpected server response format');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to check drug interactions at this moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'safe':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Safe Combination</span>
          </span>
        );
      case 'minor':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Minor Interaction</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Moderate Interaction Risk</span>
          </span>
        );
      case 'high':
      case 'critical':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>High Risk / Critical Interaction</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/30">
            {severity}
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <Zap className="w-3.5 h-3.5" />
          <span>Multi-Drug Interaction Safety Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Drug Interaction Checker
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
          Enter two or more prescription or over-the-counter medications to evaluate interaction risks, physiological mechanisms, and clinical precautions.
        </p>
      </div>

      {/* Input Box for Medication List */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
          Add Medications to Check:
        </label>

        {/* Input & Add Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddMedication();
              }
            }}
            placeholder="Type drug name (e.g., Aspirin, Ibuprofen, Warfarin, Metformin)..."
            className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-transparent dark:border-slate-700"
          />
          <button
            type="button"
            onClick={handleAddMedication}
            disabled={!currentInput.trim()}
            className="flex items-center gap-1 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Added Medication Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {medications.map((med, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-medium shadow-2xs"
            >
              <span>{med}</span>
              <button
                type="button"
                onClick={() => handleRemoveMedication(index)}
                className="p-0.5 hover:bg-amber-200 dark:hover:bg-amber-800 rounded-md transition-colors text-amber-700 dark:text-amber-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {medications.length === 0 && (
            <span className="text-xs text-slate-400 italic">No medications added yet.</span>
          )}
        </div>

        {/* Quick Suggestion Combos */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">Try Example Pairings:</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              ['Paracetamol', 'Ibuprofen'],
              ['Aspirin', 'Ibuprofen'],
              ['Metformin', 'Alcohol'],
              ['Warfarin', 'Aspirin']
            ].map((combo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMedications(combo)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] shrink-0 transition-colors"
              >
                {combo.join(' + ')}
              </button>
            ))}
          </div>
        </div>

        {/* Check Action Button */}
        <button
          type="button"
          onClick={handleCheckInteractions}
          disabled={isLoading || medications.length < 2}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-600/20 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Interactions via Groq Llama 3.3 70B...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Interaction Safety</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-6 shadow-xl animate-in fade-in-50 duration-300">
          {/* Summary Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Interaction Analysis Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluated: {result.medications.join(', ')}
              </p>
            </div>
            {getSeverityBadge(result.overallSeverity)}
          </div>

          {/* Overview Summary Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="font-bold text-xs text-slate-900 dark:text-white block uppercase tracking-wider">
              Clinical Assessment Summary:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Specific Pairwise Interactions Breakdown */}
          {result.possibleInteractions && result.possibleInteractions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Specific Drug Pairings & Mechanism:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {result.possibleInteractions.map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                      <span>{pair.drugs}</span>
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded text-[11px]">
                        Severity: {pair.severity}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong>Mechanism:</strong> {pair.mechanism}
                    </p>
                    {pair.symptomsToWatch && (
                      <p className="text-amber-800 dark:text-amber-300 font-medium">
                        <strong>Watch for symptoms:</strong> {pair.symptomsToWatch}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Precautions & Doctor Consultation Badge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Recommended Precautions</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {result.precautions.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-3 text-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5 mb-2">
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  <span>Physician Consultation</span>
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.doctorConsultationRecommended
                    ? 'Consultation with your doctor or pharmacist is strongly recommended before taking these medications together.'
                    : 'These medications are generally safe to combine when taken as directed.'}
                </p>
              </div>

              {result.emergencyAdvice && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-200 rounded-lg flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-medium">{result.emergencyAdvice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
