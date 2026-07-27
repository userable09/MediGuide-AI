import React from 'react';
import {
  ShieldCheck,
  FileCheck,
  Ban,
  Wine,
  CheckCircle2,
  Lock,
  CalendarX,
  Baby,
  AlertTriangle,
  HeartPulse
} from 'lucide-react';

export const SafetyTipsView: React.FC = () => {
  const safetyCards = [
    {
      title: '1. Read Prescription Labels Thoroughly',
      description: 'Always double-check the patient name, medication name, strength, expiration date, and specific dosing instructions on the pharmacy label before taking any medication.',
      icon: <FileCheck className="w-6 h-6 text-sky-600" />,
      color: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900'
    },
    {
      title: '2. Never Self-Medicate with Prescription Drugs',
      description: 'Prescription medicines (especially antibiotics, steroids, and psychiatric drugs) are tailored strictly to individual diagnoses. Sharing or taking leftover prescriptions can lead to severe harm.',
      icon: <Ban className="w-6 h-6 text-rose-600" />,
      color: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900'
    },
    {
      title: '3. Avoid Mixing Alcohol with Medications',
      description: 'Alcohol can dangerous interaction with NSAIDs (stomach bleeding), Acetaminophen (liver toxicity), Sedatives/Antihistamines (extreme drowsiness), and Metformin (lactic acidosis).',
      icon: <Wine className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900'
    },
    {
      title: '4. Complete Your Full Antibiotic Course',
      description: 'Even if your symptoms vanish after 3 days, complete the entire prescribed length of antibiotics. Stopping prematurely breeds antibiotic-resistant superbug strains.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900'
    },
    {
      title: '5. Store Medicines Properly',
      description: 'Store medications in a cool, dry place away from direct heat, sunlight, and moisture. Avoid storing pills in bathroom medicine cabinets due to shower steam.',
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900'
    },
    {
      title: '6. Always Inspect Expiration Dates',
      description: 'Expired medications lose potency and may chemically decompose into toxic byproducts. Regularly audit your household medicine cabinet and safely dispose of expired items.',
      icon: <CalendarX className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900'
    },
    {
      title: '7. Keep Out of Reach of Children & Pets',
      description: 'Store all medicines in child-resistant containers high above floor level or in locked cabinets. Never refer to medicine as "candy" when speaking to young children.',
      icon: <Baby className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900'
    },
    {
      title: '8. Monitor Food & Supplement Interactions',
      description: 'Grapefruit juice, dairy products, vitamin K, and high-fiber foods can interfere with drug absorption (e.g., statins, thyroid medication, or blood thinners). Consult your pharmacist.',
      icon: <HeartPulse className="w-6 h-6 text-cyan-600" />,
      color: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Patient Education & Harm Reduction</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Essential Medication Safety Rules
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
          Follow these 8 cardinal medical safety practices to prevent accidental overdose, adverse reactions, and antibiotic resistance.
        </p>
      </div>

      {/* Safety Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {safetyCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border ${card.color} space-y-3 shadow-xs hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                {card.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {card.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Disposal Tip Banner */}
      <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm mb-1 text-amber-950 dark:text-amber-100">
            Safe Unused Medicine Disposal Guidance:
          </strong>
          Do not flush unused medicines down the sink or toilet unless explicitly instructed on the package label. Use designated hospital/pharmacy drug take-back kiosks or mix pills with coffee grounds in a sealed plastic bag before discarding in trash.
        </div>
      </div>
    </div>
  );
};
