import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { FloatingAiChat } from './components/FloatingAiChat';

import { HomeView } from './views/HomeView';
import { AiChatView } from './views/AiChatView';
import { MedicationSearchView } from './views/MedicationSearchView';
import { DrugInteractionView } from './views/DrugInteractionView';
import { SideEffectView } from './views/SideEffectView';
import { DosageView } from './views/DosageView';
import { SafetyTipsView } from './views/SafetyTipsView';
import { FirstAidView } from './views/FirstAidView';
import { RemindersView } from './views/RemindersView';
import { MedicalDisclaimerView } from './views/MedicalDisclaimerView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Apply dark mode class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (view: ViewMode, query?: string) => {
    if (query !== undefined) {
      setSearchInitialQuery(query);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'chat':
        return <AiChatView />;
      case 'search':
        return <MedicationSearchView initialQuery={searchInitialQuery} />;
      case 'interactions':
        return <DrugInteractionView />;
      case 'side-effects':
        return <SideEffectView />;
      case 'dosage':
        return <DosageView />;
      case 'safety':
        return <SafetyTipsView />;
      case 'first-aid':
        return <FirstAidView />;
      case 'reminders':
        return <RemindersView />;
      case 'disclaimer':
        return <MedicalDisclaimerView />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Medical Disclaimer Banner */}
      <DisclaimerBanner onOpenFullDisclaimer={() => handleNavigate('disclaimer')} />

      {/* Main Header Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      {/* Floating AI Assistant Modal / Trigger */}
      <FloatingAiChat />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
