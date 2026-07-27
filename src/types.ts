export type ViewMode = 
  | 'home'
  | 'chat'
  | 'search'
  | 'interactions'
  | 'side-effects'
  | 'dosage'
  | 'safety'
  | 'first-aid'
  | 'reminders'
  | 'disclaimer';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  provider?: string;
}

export interface MedicationData {
  id: string;
  genericName: string;
  brandName: string;
  category: string;
  uses: string[];
  adultDosage: string;
  pediatricDosage: string;
  sideEffects: {
    common: string[];
    serious: string[];
  };
  warnings: string[];
  contraindications: string[];
  drugInteractions: string[];
  storageInstructions: string;
  pregnancyCategory: string;
  breastfeedingInfo: string;
  elderlyPrecautions: string;
  missedDoseGuidance?: string;
  overdoseWarning?: string;
}

export interface DrugInteractionResult {
  medications: string[];
  overallSeverity: 'Safe' | 'Minor' | 'Moderate' | 'High' | 'Critical';
  summary: string;
  possibleInteractions: Array<{
    drugs: string;
    severity: 'Minor' | 'Moderate' | 'High';
    mechanism: string;
    symptomsToWatch: string;
  }>;
  precautions: string[];
  doctorConsultationRecommended: boolean;
  emergencyAdvice?: string;
}

export interface SideEffectAnalysis {
  medicine: string;
  symptomsReported: string;
  isLikelySideEffect: boolean;
  sideEffectType: 'Common' | 'Less Common' | 'Rare / Serious' | 'Unlikely Related';
  commonSideEffects: string[];
  seriousSideEffects: string[];
  emergencyCareNeeded: boolean;
  emergencyCareReason?: string;
  selfCareAdvice: string[];
  consultDoctorNotice: string;
}

export interface FirstAidGuide {
  condition: string;
  iconName?: string;
  summary?: string;
  immediateSteps: string[];
  whatToAvoid: string[];
  whenToSeekEmergency: string[];
  generalHomeCare: string[];
  disclaimer: string;
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string; // HH:MM (24h or 12h)
  frequency: 'Once Daily' | 'Twice Daily' | '3 Times Daily' | 'Every 8 Hours' | 'As Needed';
  completed: boolean;
  lastTakenDate?: string;
  notes?: string;
  createdAt: string;
}
