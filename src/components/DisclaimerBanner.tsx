import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X } from 'lucide-react';

interface Props {
  onOpenFullDisclaimer?: () => void;
}

export const DisclaimerBanner: React.FC<Props> = ({ onOpenFullDisclaimer }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setDismissed(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium backdrop-blur-md shadow-sm transition-all"
          title="View Medical Disclaimer"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span>Medical Disclaimer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200 px-4 py-2.5 text-xs sm:text-sm relative backdrop-blur-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="leading-tight">
            <strong className="font-semibold text-amber-950 dark:text-amber-100">Educational Information Only:</strong>{' '}
            MediGuide AI does not diagnose, prescribe, or substitute professional medical advice. Always consult a qualified doctor or pharmacist. In emergencies, call your local emergency service.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenFullDisclaimer && (
            <button
              onClick={onOpenFullDisclaimer}
              className="hidden sm:inline-block underline font-medium hover:text-amber-700 dark:hover:text-amber-100 transition-colors whitespace-nowrap"
            >
              Read Full Policy
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-500/20 rounded-lg text-amber-700 dark:text-amber-300 transition-colors"
            aria-label="Dismiss disclaimer banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
