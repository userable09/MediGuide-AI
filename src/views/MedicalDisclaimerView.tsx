import React from 'react';
import { ShieldAlert, AlertTriangle, PhoneCall, CheckCircle2, HeartPulse, FileText } from 'lucide-react';

export const MedicalDisclaimerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full w-fit border border-amber-500/30">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Legal & Clinical Policy Statement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Medical Disclaimer & Terms of Use
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Please read this important information regarding the educational scope and limitations of MediGuide AI.
        </p>
      </div>

      {/* Prominent Mandatory Statement Card */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 text-amber-950 dark:text-amber-100 p-6 rounded-3xl space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-base sm:text-lg">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <span>Official MediGuide AI Medical Disclaimer</span>
        </div>
        <blockquote className="text-sm sm:text-base leading-relaxed font-medium italic border-l-4 border-amber-500 pl-4 py-1 text-slate-800 dark:text-slate-100">
          "MediGuide AI provides educational information only and does not diagnose diseases or replace licensed healthcare professionals. Always consult a qualified doctor or pharmacist before starting, stopping, or changing any medication. In emergencies, contact your local emergency services immediately."
        </blockquote>
      </div>

      {/* Detailed Policy Sections */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-sm text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>1. Educational Purpose & Non-Diagnostic Scope</span>
          </h2>
          <p>
            All content on MediGuide AI—including AI generated chat responses, medication search reports, drug interaction matrix evaluations, side effect analysis, and first aid tips—is provided strictly for general informational and educational purposes. No content is intended to constitute medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <span>2. No Doctor-Patient Relationship</span>
          </h2>
          <p>
            Use of MediGuide AI does not establish a doctor-patient relationship, pharmacist-patient relationship, or clinical consult context. Never disregard professional medical advice or delay seeking care because of something you read or generated on this application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>3. Emergency Situations</span>
          </h2>
          <p>
            If you think you or someone else may have a medical emergency, call your doctor, visit the nearest hospital emergency room, or call your local emergency response service (e.g. 911 / 112) immediately.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <h2 className="font-bold text-base text-slate-900 dark:text-white">
            4. Accuracy & Limitations of Artificial Intelligence
          </h2>
          <p>
            While MediGuide AI utilizes advanced AI technology (Groq API Llama 3.3 70B & Gemini 3.6 Flash) guided by clinical safety system prompts, AI models can occasionally produce errors or incomplete information. Always verify medication details with your official prescription packaging and licensed medical provider.
          </p>
        </section>
      </div>
    </div>
  );
};
