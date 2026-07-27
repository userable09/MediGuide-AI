import React, { useState, useEffect } from 'react';
import { MedicationReminder } from '../types';
import {
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Bell,
  Calendar,
  Pill,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const RemindersView: React.FC = () => {
  const LOCAL_STORAGE_KEY = 'mediguide_reminders_v1';

  const [reminders, setReminders] = useState<MedicationReminder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load reminders from localStorage:', e);
    }
    return [
      {
        id: 'rem-1',
        medicineName: 'Paracetamol 500mg',
        dosage: '1 tablet after breakfast',
        time: '08:00',
        frequency: 'Once Daily',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'rem-2',
        medicineName: 'Metformin 500mg',
        dosage: '1 tablet with dinner',
        time: '19:30',
        frequency: 'Twice Daily',
        completed: true,
        lastTakenDate: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('09:00');
  const [frequency, setFrequency] = useState<MedicationReminder['frequency']>('Once Daily');
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reminders));
    } catch (e) {
      console.error('Failed to save reminders to localStorage:', e);
    }
  }, [reminders]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    const newReminder: MedicationReminder = {
      id: Date.now().toString(),
      medicineName: medicineName.trim(),
      dosage: dosage.trim() || '1 Dose',
      time,
      frequency,
      notes: notes.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setReminders([newReminder, ...reminders]);
    setMedicineName('');
    setDosage('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleToggleCompleted = (id: string) => {
    setReminders(
      reminders.map((rem) => {
        if (rem.id === id) {
          const nextCompleted = !rem.completed;
          return {
            ...rem,
            completed: nextCompleted,
            lastTakenDate: nextCompleted ? new Date().toLocaleDateString() : undefined
          };
        }
        return rem;
      })
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((rem) => rem.id !== id));
  };

  const completedCount = reminders.filter((r) => r.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-md">
          <Clock className="w-3.5 h-3.5" />
          <span>Browser Local Storage Medication Schedule</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Medication Reminders
        </h1>
        <p className="text-xs sm:text-sm text-cyan-100 max-w-xl">
          Set up personal pill reminders, dosage times, and daily completed status directly in your browser without any account required.
        </p>
      </div>

      {/* Action Header & Summary */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Today's Schedule Progress
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {completedCount} of {reminders.length} doses taken today
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'Add Medication Reminder'}</span>
        </button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddReminder}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-4 animate-in slide-in-from-top-3 duration-200"
        >
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Pill className="w-4 h-4 text-cyan-600" />
            <span>New Medication Schedule</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700 dark:text-slate-200">
                Medication Name *
              </label>
              <input
                type="text"
                required
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="e.g. Paracetamol 500mg, Vitamin D3"
                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-transparent dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700 dark:text-slate-200">
                Dosage & Instructions
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 1 tablet after food"
                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-transparent dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700 dark:text-slate-200">
                Reminder Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-transparent dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700 dark:text-slate-200">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-transparent dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Once Daily">Once Daily</option>
                <option value="Twice Daily">Twice Daily</option>
                <option value="3 Times Daily">3 Times Daily</option>
                <option value="Every 8 Hours">Every 8 Hours</option>
                <option value="As Needed">As Needed</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-200">
              Optional Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Take with a full glass of water"
              className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl border border-transparent dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Save Medication Reminder
          </button>
        </form>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 space-y-3">
            <Clock className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-white">
              No Reminders Set
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click "Add Medication Reminder" to create custom schedules for daily doses.
            </p>
          </div>
        ) : (
          reminders.map((rem) => (
            <div
              key={rem.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                rem.completed
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 opacity-75'
                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => handleToggleCompleted(rem.id)}
                  className={`p-1 rounded-full transition-colors ${
                    rem.completed
                      ? 'text-emerald-500 hover:text-emerald-600'
                      : 'text-slate-300 dark:text-slate-600 hover:text-sky-500'
                  }`}
                  title={rem.completed ? 'Mark as pending' : 'Mark as taken'}
                >
                  {rem.completed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-bold text-sm ${
                        rem.completed
                          ? 'line-through text-slate-500 dark:text-slate-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {rem.medicineName}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {rem.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {rem.dosage} {rem.notes ? `• ${rem.notes}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right text-xs">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">
                    {rem.time}
                  </span>
                  {rem.completed && rem.lastTakenDate && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      Taken {rem.lastTakenDate}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteReminder(rem.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-xs text-sky-900 dark:text-sky-200 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
        <span>
          <strong>Privacy Note:</strong> All reminders are stored exclusively in your local browser storage (`localStorage`). No private health schedule data is ever transmitted to an external server.
        </span>
      </div>
    </div>
  );
};
