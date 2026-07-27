import React, { useState } from 'react';
import { ViewMode } from '../types';
import { PRESET_MEDICATIONS } from '../data/medications';
import {
  Pill,
  MessageSquare,
  Search,
  Zap,
  Activity,
  Calculator,
  ShieldCheck,
  HeartPulse,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Search as SearchIcon
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (view: ViewMode, initialQuery?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      onNavigate('search', quickQuery.trim());
    }
  };

  const featureCards = [
    {
      id: 'chat' as ViewMode,
      title: 'AI Medication Chat',
      description: 'ChatGPT-style conversational assistant powered by Groq Llama 3.3 70B for instant medication Q&A.',
      icon: <MessageSquare className="w-6 h-6 text-sky-500" />,
      color: 'from-sky-500/10 to-blue-500/10 border-sky-500/20'
    },
    {
      id: 'search' as ViewMode,
      title: 'Drug Information Search',
      description: 'Comprehensive generic and brand name database with adult & pediatric dosages, uses, and warnings.',
      icon: <Search className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
    },
    {
      id: 'interactions' as ViewMode,
      title: 'Drug Interaction Checker',
      description: 'Analyze combinations of two or more medications to prevent adverse drug-drug interactions.',
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
    },
    {
      id: 'side-effects' as ViewMode,
      title: 'Side Effect Checker',
      description: 'Evaluate symptoms against medication profiles to differentiate common vs serious emergency warnings.',
      icon: <Activity className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20'
    },
    {
      id: 'dosage' as ViewMode,
      title: 'Dosage Guidance',
      description: 'Adult, pediatric, and daily maximum dosage instructions with missed dose and overdose guidance.',
      icon: <Calculator className="w-6 h-6 text-indigo-500" />,
      color: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/20'
    },
    {
      id: 'safety' as ViewMode,
      title: 'Medication Safety Tips',
      description: 'Educational cards on prescription labels, food/alcohol interactions, expiry dates, and proper storage.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      color: 'from-emerald-600/10 to-green-500/10 border-emerald-600/20'
    },
    {
      id: 'first-aid' as ViewMode,
      title: 'First Aid AI Assistant',
      description: 'Step-by-step first-aid guidance for fevers, burns, allergic reactions, cuts, and cold/flu care.',
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/10 to-pink-500/10 border-rose-500/20'
    },
    {
      id: 'reminders' as ViewMode,
      title: 'Medication Reminders',
      description: 'Private, browser local-storage tool to track daily pill schedules and mark doses completed.',
      icon: <Clock className="w-6 h-6 text-cyan-500" />,
      color: 'from-cyan-500/10 to-sky-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl bg-gradient-to-b from-teal-50/80 via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Text & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Powered by Groq API (Llama 3.3 70B) & Gemini 3.6</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                MediGuide AI – <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  Intelligent Medication Information
                </span>{' '}
                  & Safety Assistant
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Understand medications, proper dosages, potential side effects, dangerous drug interactions, and emergency first-aid guidelines with verified educational AI insights.
              </p>

              {/* Quick Search Form inside Hero */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0 relative">
                <div className="relative flex items-center shadow-lg rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5">
                  <SearchIcon className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={quickQuery}
                    onChange={(e) => setQuickQuery(e.target.value)}
                    placeholder="Search Paracetamol, Ibuprofen, Amoxicillin..."
                    className="w-full px-3 py-2.5 bg-transparent text-slate-900 dark:text-white text-sm focus:outline-none placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Popular Pills shortcuts */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Popular:</span>
                  {PRESET_MEDICATIONS.map((med) => (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => onNavigate('search', med.id)}
                      className="px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      {med.genericName.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </form>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('search')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Medication</span>
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Chat with AI</span>
                </button>
              </div>
            </motion.div>

            {/* Hero Right Visual Glassmorphism Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live AI Safety Monitor</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Real-time educational check</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Verified AI Mode
                  </span>
                </div>

                {/* Example Interaction Result Preview */}
                <div className="space-y-3 text-xs">
                  <div className="bg-teal-50/80 dark:bg-teal-950/50 p-3 rounded-2xl border border-teal-100 dark:border-teal-900">
                    <div className="flex items-center justify-between font-semibold text-teal-900 dark:text-teal-200 mb-1">
                      <span>Checked: Paracetamol + Ibuprofen</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Safe Dual Therapy</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">
                      Often combined for severe pain under pharmacist guidance because they belong to different drug classes.
                    </p>
                  </div>

                  <div className="bg-amber-50/80 dark:bg-amber-950/50 p-3 rounded-2xl border border-amber-100 dark:border-amber-900">
                    <div className="flex items-center justify-between font-semibold text-amber-900 dark:text-amber-200 mb-1">
                      <span>Checked: Aspirin + Ibuprofen</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">Moderate Warning</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">
                      Ibuprofen may diminish cardioprotective effect of low-dose aspirin and increase stomach bleeding risk.
                    </p>
                  </div>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] border-t border-slate-200/60 dark:border-slate-700/60">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">100%</span>
                    <span className="text-slate-500 dark:text-slate-400">Educational</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">0</span>
                    <span className="text-slate-500 dark:text-slate-400">Auth Needed</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">Local</span>
                    <span className="text-slate-500 dark:text-slate-400">Reminders</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Medication AI Suite
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Designed for patient safety, prescription literacy, and immediate first-aid guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onNavigate(card.id)}
              className={`group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
                <span>Explore Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Simple 3-Step Safety Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How MediGuide AI Delivers Reliable Guidance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Powered by Groq's high-speed inference for Llama 3.3 70B and structured clinical safety prompts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xl flex items-center justify-center mx-auto border border-sky-500/30">
              1
            </div>
            <h3 className="font-bold text-base text-white">1. Ask & Search</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter any drug name, select multiple medications for interaction checks, or type health questions into the chat.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 font-bold text-xl flex items-center justify-center mx-auto border border-teal-500/30">
              2
            </div>
            <h3 className="font-bold text-base text-white">2. AI Safety Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The AI evaluates dosages, drug-drug interaction risks, contraindications, and emergency side effects.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xl flex items-center justify-center mx-auto border border-emerald-500/30">
              3
            </div>
            <h3 className="font-bold text-base text-white">3. Clear Educational Info</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive structured, clear reports with warnings, missed dose instructions, storage guidelines, and doctor consult advice.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK SAFETY TIPS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border border-teal-200/80 dark:border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Essential Medication Safety Rule</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Always finish your antibiotic course and check expiry dates!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Stopping antibiotics early leads to drug resistance. Never mix prescription drugs with alcohol without checking interaction warnings.
            </p>
          </div>

          <button
            onClick={() => onNavigate('safety')}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            Read All 8 Safety Rules
          </button>
        </div>
      </section>
    </div>
  );
};
