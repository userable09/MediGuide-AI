import React, { useState, useEffect } from 'react';
import { MedicationData } from '../types';
import { PRESET_MEDICATIONS } from '../data/medications';
import { apiFetch } from '../lib/api';
import {
  Search,
  Pill,
  ShieldAlert,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Baby,
  Heart,
  FileSpreadsheet
} from 'lucide-react';

interface Props {
  initialQuery?: string;
}

export const MedicationSearchView: React.FC<Props> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [medications, setMedications] = useState<MedicationData[]>(PRESET_MEDICATIONS);
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(PRESET_MEDICATIONS[0]?.id || null);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchResult, setAiSearchResult] = useState<MedicationData | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      // If query matches preset drug id or name, expand it
      const found = PRESET_MEDICATIONS.find(
        (m) =>
          m.id.toLowerCase().includes(initialQuery.toLowerCase()) ||
          m.genericName.toLowerCase().includes(initialQuery.toLowerCase()) ||
          m.brandName.toLowerCase().includes(initialQuery.toLowerCase())
      );
      if (found) {
        setExpandedDrugId(found.id);
      } else {
        // Auto trigger AI Deep Lookup for query
        handleAiDeepLookup(initialQuery);
      }
    }
  }, [initialQuery]);

  const categories = [
    'All',
    'Analgesic',
    'NSAID',
    'Antibiotic',
    'Antidiabetic',
    'Antihistamine',
    'Antiplatelet'
  ];

  const filteredMedications = medications.filter((med) => {
    const matchesQuery =
      med.genericName.toLowerCase().includes(query.toLowerCase()) ||
      med.brandName.toLowerCase().includes(query.toLowerCase()) ||
      med.category.toLowerCase().includes(query.toLowerCase()) ||
      med.uses.some((u) => u.toLowerCase().includes(query.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' ||
      med.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesQuery && matchesCat;
  });

  const handleAiDeepLookup = async (drugNameToSearch?: string) => {
    const searchTerm = drugNameToSearch || query;
    if (!searchTerm.trim()) return;

    setIsAiSearching(true);
    setAiError(null);
    setAiSearchResult(null);

    try {
      const data = await apiFetch<{ data?: any; rawContent?: string; error?: string }>('/api/medication-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugName: searchTerm })
      });

      if (data.data) {
        const customMed: MedicationData = {
          id: `ai-${Date.now()}`,
          genericName: data.data.genericName || searchTerm,
          brandName: data.data.brandName || 'Various Brands',
          category: data.data.category || 'General Medication',
          uses: Array.isArray(data.data.uses) ? data.data.uses : [data.data.uses || 'General Medical Use'],
          adultDosage: data.data.adultDosage || 'Consult doctor or prescription label',
          pediatricDosage: data.data.pediatricDosage || 'Use as directed by pediatrician',
          sideEffects: {
            common: data.data.sideEffects?.common || ['Mild nausea', 'Dizziness'],
            serious: data.data.sideEffects?.serious || ['Severe allergic response', 'Unusual rash']
          },
          warnings: Array.isArray(data.data.warnings) ? data.data.warnings : [data.data.warnings || 'Take as prescribed'],
          contraindications: Array.isArray(data.data.contraindications) ? data.data.contraindications : ['Hypersensitivity'],
          drugInteractions: Array.isArray(data.data.drugInteractions) ? data.data.drugInteractions : ['Consult pharmacist'],
          storageInstructions: data.data.storageInstructions || 'Store in a cool, dry place',
          pregnancyCategory: data.data.pregnancyCategory || 'Consult physician during pregnancy',
          breastfeedingInfo: data.data.breastfeedingInfo || 'Passes into breast milk; consult doctor',
          elderlyPrecautions: data.data.elderlyPrecautions || 'Dose adjustment may be needed',
          missedDoseGuidance: data.data.missedDoseGuidance || 'Take as soon as remembered unless close to next dose',
          overdoseWarning: data.data.overdoseWarning || 'Seek immediate emergency medical evaluation'
        };

        setAiSearchResult(customMed);
        setMedications((prev) => [customMed, ...prev.filter((m) => !m.id.startsWith('ai-'))]);
        setExpandedDrugId(customMed.id);
      }
    } catch (err: any) {
      setAiError(err.message || 'Unable to generate deep medication report');
    } finally {
      setIsAiSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <Pill className="w-3.5 h-3.5" />
          <span>Comprehensive Drug Database & AI Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Medication Search & Safety Dossier
        </h1>
        <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
          Instantly look up generic names, brand names, indication uses, dosages, side effects, drug interactions, and precautions.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medication name (e.g. Paracetamol, Ibuprofen, Metformin, Amoxicillin)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent dark:border-slate-700"
            />
          </div>

          <button
            onClick={() => handleAiDeepLookup()}
            disabled={isAiSearching || !query.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            {isAiSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>AI Deep Search</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">Filter Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AI Error Notification */}
      {aiError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{aiError}</span>
        </div>
      )}

      {/* Search No Match Banner */}
      {filteredMedications.length === 0 && !isAiSearching && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-4">
          <Pill className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">
            No preset medication matched "{query}"
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Click "AI Deep Search" to query Groq & Gemini AI for an instant clinical safety dossier for <strong>{query}</strong>!
          </p>
          <button
            onClick={() => handleAiDeepLookup()}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            Generate AI Report for "{query}"
          </button>
        </div>
      )}

      {/* Medications List */}
      <div className="space-y-4">
        {filteredMedications.map((med) => {
          const isExpanded = expandedDrugId === med.id;

          return (
            <div
              key={med.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-sky-500 dark:border-sky-500 shadow-md'
                  : 'border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedDrugId(isExpanded ? null : med.id)}
                className="p-5 cursor-pointer flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {med.genericName}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      {med.category}
                    </span>
                    {med.id.startsWith('ai-') && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        AI Generated Report
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>Popular Brands:</strong> {med.brandName}
                  </p>
                </div>

                <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Expanded Drug Dossier Details */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 space-y-6 text-xs text-slate-700 dark:text-slate-300 bg-slate-50/30 dark:bg-slate-900/30">
                  {/* Indications / Uses */}
                  <div className="space-y-2 pt-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                      <span>Primary Medical Indications & Uses</span>
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                      {med.uses.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dosages Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs mb-1">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>Adult Dosage (General)</span>
                      </div>
                      <p className="leading-relaxed">{med.adultDosage}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs mb-1">
                        <Baby className="w-4 h-4 text-amber-600" />
                        <span>Pediatric Dosage</span>
                      </div>
                      <p className="leading-relaxed">{med.pediatricDosage}</p>
                    </div>
                  </div>

                  {/* Side Effects (Common vs Serious) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/60 space-y-2">
                      <h5 className="font-bold text-amber-900 dark:text-amber-200 text-xs">
                        Common Side Effects
                      </h5>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {med.sideEffects.common.map((se, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-600">•</span>
                            <span>{se}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/60 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-200/60 dark:border-rose-900/60 space-y-2">
                      <h5 className="font-bold text-rose-900 dark:text-rose-200 text-xs flex items-center gap-1">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>Serious Side Effects (Seek Medical Care)</span>
                      </h5>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {med.sideEffects.serious.map((se, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{se}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Warnings & Contraindications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <h5 className="font-bold text-slate-900 dark:text-white">Warnings & Precautions</h5>
                      <ul className="space-y-1">
                        {med.warnings.map((w, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-sky-600">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <h5 className="font-bold text-slate-900 dark:text-white">Drug Interactions</h5>
                      <ul className="space-y-1">
                        {med.drugInteractions.map((di, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-600">•</span>
                            <span>{di}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Special Population Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Pregnancy Category</span>
                      <p>{med.pregnancyCategory}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Breastfeeding</span>
                      <p>{med.breastfeedingInfo}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Elderly Care</span>
                      <p>{med.elderlyPrecautions}</p>
                    </div>
                  </div>

                  {/* Missed Dose & Storage */}
                  <div className="p-4 bg-sky-50/50 dark:bg-sky-950/30 rounded-xl border border-sky-200/50 dark:border-sky-900/50 space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <span className="font-bold text-sky-900 dark:text-sky-200 block">Missed Dose Advice:</span>
                        <p>{med.missedDoseGuidance}</p>
                      </div>
                      <div>
                        <span className="font-bold text-sky-900 dark:text-sky-200 block">Storage:</span>
                        <p>{med.storageInstructions}</p>
                      </div>
                    </div>
                    {med.overdoseWarning && (
                      <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/60 text-rose-700 dark:text-rose-300 font-semibold">
                        ⚠️ Overdose Notice: {med.overdoseWarning}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
