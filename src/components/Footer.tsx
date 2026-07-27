import React from 'react';
import { ViewMode } from '../types';
import { Pill, Shield, HeartPulse, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <Pill className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                MediGuide<span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intelligent Medication Information & Safety Assistant powering educational drug searches, side effect checking, interaction analysis, and first-aid guidance.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Powered by Groq API & Llama 3.3 70B</span>
            </div>
          </div>

          {/* Column 2: Quick Features */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              AI Safety Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-teal-400 transition-colors"
                >
                  ChatGPT-Style Medication Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('search')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Instant Medication Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('interactions')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Multi-Drug Interaction Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('side-effects')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Symptom & Side Effect Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dosage')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Dosage & Administration Info
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & First Aid */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Health & Emergency
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Medication Safety Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('first-aid')}
                  className="hover:text-teal-400 transition-colors"
                >
                  First Aid AI Guidance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reminders')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Browser Local Medication Reminders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Full Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              In Emergency
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <PhoneCall className="w-4 h-4" />
                <span>Emergency Services</span>
              </div>
              <p className="text-slate-300">
                Call <strong className="text-white font-bold">911</strong> (US), <strong className="text-white font-bold">112</strong> (EU/Universal), or your local emergency response immediately for acute life-threatening situations.
              </p>
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 text-xs">
              <span className="text-amber-400 font-semibold block mb-0.5">Poison Control Center:</span>
              <span className="text-white font-mono font-bold">1-800-222-1222</span> (US)
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediGuide AI. Built for ACT AI Project. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('disclaimer')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('disclaimer')}
              className="hover:text-slate-300 transition-colors"
            >
              Medical Disclaimer
            </button>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" /> Educational Only
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
