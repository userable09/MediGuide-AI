import React, { useState } from 'react';
import { ViewMode } from '../types';
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
  Sun,
  Moon,
  Menu,
  X,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ViewMode; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Pill className="w-4 h-4" /> },
    { id: 'chat', label: 'AI Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-4 h-4" /> },
    { id: 'interactions', label: 'Interactions', icon: <Zap className="w-4 h-4" /> },
    { id: 'side-effects', label: 'Side Effects', icon: <Activity className="w-4 h-4" /> },
    { id: 'dosage', label: 'Dosage', icon: <Calculator className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety Tips', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'first-aid', label: 'First Aid', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'reminders', label: 'Reminders', icon: <Clock className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5 transform -rotate-45" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  MediGuide<span className="text-teal-600 dark:text-teal-400">AI</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 rounded border border-teal-200 dark:border-teal-800">
                  Groq & Gemini
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block leading-none mt-0.5">
                Medication Safety Assistant
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 shadow-xs border border-teal-200/80 dark:border-teal-800/80'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Dark mode, Disclaimer shortcut, Mobile trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('disclaimer')}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'disclaimer'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Medical Disclaimer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Disclaimer</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors"
              aria-label="Toggle color theme"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                    active
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('disclaimer')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/50"
            >
              <FileText className="w-4 h-4" />
              <span>Full Medical Disclaimer & Legal Policy</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
