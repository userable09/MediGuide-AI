import React, { useState } from 'react';
import { PRESET_MEDICATIONS } from '../data/medications';
import { apiFetch } from '../lib/api';
import { Calculator, Search, Clock, Baby, AlertOctagon, CheckCircle, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';

export const DosageView: React.FC = () => {
  const [selectedMedId, setSelectedMedId] = useState(PRESET_MEDICATIONS[0].id);
  const [customSearch, setCustomSearch] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [customDosageData, setCustomDosageData] = useState<any | null>(null);

  const selectedMed = PRESET_MEDICATIONS.find((m) => m.id === selectedMedId) || PRESET_MEDICATIONS[0];
  const activeMed = customDosageData || selectedMed;

  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;

    setIsAiLoading(true);
    setCustomDosageData(null);

    try {
      const data = await apiFetch<{ data?: any }>('/api/medication-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugName: customSearch })
      });

      if (data.data) {
        setCustomDosageData({
          genericName: data.data.genericName || customSearch,
          brandName: data.data.brandName || 'Various Brands',
          category: data.data.category || 'General Medication',
          adultDosage: data.data.adultDosage || 'Consult doctor or product label for precise dosing',
          pediatricDosage: data.data.pediatricDosage || 'Use only as directed by pediatrician',
          missedDoseGuidance: data.data.missedDoseGuidance || 'Take as soon as remembered unless close to next dose',
          overdoseWarning: data.data.overdoseWarning || 'Seek immediate emergency medical evaluation',
          storageInstructions: data.data.storageInstructions || 'Store in cool dry place'
        });
      }
    } catch (err) {
      console.error('Dosage lookup error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <Calculator className="w-3.5 h-3.5" />
          <span>Posology & Dosage Reference Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Medication Dosage & Administration
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
          Quickly review adult dosages, pediatric guidelines, daily limits, administration instructions, missed dose recovery, and overdose warnings.
        </p>
      </div>

      {/* Medication Selector & Custom Search */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Select Preset Medication:
            </label>
            <select
              value={selectedMedId}
              onChange={(e) => {
                setSelectedMedId(e.target.value);
                setCustomDosageData(null);
              }}
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent dark:border-slate-700"
            >
              {PRESET_MEDICATIONS.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.genericName} ({med.brandName.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* AI Search input */}
          <form onSubmit={handleCustomSearch} className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Or Lookup Custom Medicine via AI:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                placeholder="Type drug name (e.g., Lisinopril, Omeprazole)..."
                className="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent dark:border-slate-700"
              />
              <button
                type="submit"
                disabled={isAiLoading || !customSearch.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition-all shrink-0"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Fetch</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Dosage Card Display */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeMed.genericName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Brands: {activeMed.brandName} • Category: {activeMed.category}
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold text-xs rounded-full border border-indigo-500/20">
            Dosage Protocol
          </span>
        </div>

        {/* Dosage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Adult Dosage Guidance</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeMed.adultDosage}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Baby className="w-4 h-4 text-amber-600" />
              <span>Pediatric Dosage Guidance</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeMed.pediatricDosage}
            </p>
          </div>
        </div>

        {/* Administration & Missed Dose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-sky-50/50 dark:bg-sky-950/30 rounded-xl border border-sky-200/50 dark:border-sky-900/50 space-y-2">
            <h4 className="font-bold text-sky-900 dark:text-sky-200 text-sm flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-sky-600" />
              <span>Missed Dose Recovery Protocol</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeMed.missedDoseGuidance || 'Take as soon as remembered. If close to the next scheduled dose, skip the missed dose and resume your regular schedule. Never take double doses.'}
            </p>
          </div>

          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-900/50 space-y-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Storage Instructions</span>
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeMed.storageInstructions}
            </p>
          </div>
        </div>

        {/* Overdose Warning Box */}
        {activeMed.overdoseWarning && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-950 dark:text-rose-100 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1 text-sm">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Overdose Warning & Emergency Procedure</span>
            </span>
            <p className="leading-relaxed">{activeMed.overdoseWarning}</p>
          </div>
        )}
      </div>
    </div>
  );
};
