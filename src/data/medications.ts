import { MedicationData, FirstAidGuide } from '../types';

export const PRESET_MEDICATIONS: MedicationData[] = [
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandName: 'Tylenol, Panadol, Calpol, Dolo 650',
    category: 'Analgesic & Antipyretic (Pain & Fever Reliever)',
    uses: [
      'Relief of mild to moderate pain (headaches, muscle aches, toothaches)',
      'Reduction of fever in adults and children',
      'Mild arthritis discomfort management'
    ],
    adultDosage: '500 mg to 1000 mg every 4–6 hours as needed. Maximum 4000 mg (4 grams) in 24 hours.',
    pediatricDosage: '10–15 mg/kg body weight per dose every 4–6 hours. Do not exceed 5 doses in 24 hours.',
    sideEffects: {
      common: ['Nausea or mild stomach upset (rare at normal doses)', 'Drowsiness (infrequent)'],
      serious: ['Liver toxicity or damage (if overdosed)', 'Severe allergic reaction (rash, swelling, trouble breathing)', 'Dark urine, yellowing eyes/skin (jaundice)']
    },
    warnings: [
      'Never exceed maximum daily dose (4g/day for adults) due to severe risk of irreversible liver damage.',
      'Check all other cold/flu medications to avoid hidden duplicate acetaminophen intake.',
      'Avoid chronic heavy alcohol use while taking paracetamol.'
    ],
    contraindications: [
      'Severe hepatic impairment or active liver disease',
      'Known hypersensitivity to acetaminophen or paracetamol'
    ],
    drugInteractions: [
      'Warfarin (long-term high dose paracetamol may increase bleeding risk)',
      'Alcohol (increases liver toxicity risk)',
      'Isoniazid & Anticonvulsants (carbamazepine, phenytoin)'
    ],
    storageInstructions: 'Store below 25°C (77°F) in a cool, dry place away from direct sunlight and humidity. Keep tightly closed.',
    pregnancyCategory: 'Category B (Generally considered safe when used as directed under medical advice)',
    breastfeedingInfo: 'Excreted in breast milk in small amounts. Considered compatible with breastfeeding at normal recommended doses.',
    elderlyPrecautions: 'Lower total daily limit (2000–3000 mg/day) may be advised for frail elderly patients or those with mild liver/renal decline.',
    missedDoseGuidance: 'If taken on a regular schedule, take the missed dose as soon as remembered. Skip if near next dose. Never double doses.',
    overdoseWarning: 'EMERGENCY: Acetaminophen overdose is a medical emergency. N-acetylcysteine antidote is most effective within 8 hours. Seek immediate emergency room care.'
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandName: 'Advil, Motrin, Nurofen, Brufen',
    category: 'NSAID (Nonsteroidal Anti-inflammatory Drug)',
    uses: [
      'Reduction of inflammatory pain, dysmenorrhea (menstrual cramps), and joint pain',
      'Fever reduction',
      'Dental pain, sprains, headache, and rheumatoid arthritis'
    ],
    adultDosage: '200 mg to 400 mg every 4–6 hours with food or milk. Maximum OTC limit is 1200 mg/day (up to 3200 mg/day under medical prescription).',
    pediatricDosage: '5–10 mg/kg every 6–8 hours as directed by a pediatrician. Not recommended for infants under 6 months without medical guidance.',
    sideEffects: {
      common: ['Heartburn, stomach upset, nausea, mild indigestion', 'Dizziness or mild headache'],
      serious: ['Gastrointestinal ulceration or stomach bleeding (black/tarry stools, coughing blood)', 'Kidney damage/dysfunction', 'Increased cardiovascular risk with long-term high doses']
    },
    warnings: [
      'Take with food or milk to reduce stomach irritation.',
      'Avoid during the third trimester of pregnancy due to premature closure of ductus arteriosus.',
      'Avoid if you have active stomach ulcers, uncontrolled asthma, or severe heart/kidney disease.'
    ],
    contraindications: [
      'Active peptic ulcer disease or GI hemorrhage',
      'History of aspirin-induced asthma or anaphylaxis',
      'Third trimester of pregnancy'
    ],
    drugInteractions: [
      'Aspirin & other NSAIDs (increases bleeding and ulcer risk)',
      'Anticoagulants like Warfarin or Eliquis',
      'ACE Inhibitors & Diuretics (reduces antihypertensive effect and increases kidney toxicity risk)'
    ],
    storageInstructions: 'Store at room temperature 15°–30°C (59°–86°F). Avoid excessive heat and moisture.',
    pregnancyCategory: 'Category C (1st & 2nd Trimester) / Category D (3rd Trimester - Avoid completely)',
    breastfeedingInfo: 'Appears in breast milk in very low concentrations. Generally safe for short-term use, but consult doctor.',
    elderlyPrecautions: 'Higher risk of GI bleeding and kidney impairment. Use lowest effective dose for shortest duration possible.',
    missedDoseGuidance: 'Take as soon as remembered with food. Skip if close to next scheduled dose. Do not double doses.',
    overdoseWarning: 'Overdose symptoms include severe stomach pain, vomiting, lethargy, respiratory depression, and metabolic acidosis. Seek urgent care.'
  },
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    brandName: 'Amoxil, Trimox, Moxatag',
    category: 'Penicillin Antibiotic',
    uses: [
      'Treatment of bacterial infections (middle ear infections, strep throat, pneumonia, urinary tract infections)',
      'Helicobacter pylori bacterial eradication (in combination therapy)',
      'Dental infection treatment'
    ],
    adultDosage: '250 mg to 500 mg every 8 hours OR 500 mg to 875 mg every 12 hours depending on infection severity.',
    pediatricDosage: '20–45 mg/kg/day in divided doses every 8–12 hours based on child weight and infection type.',
    sideEffects: {
      common: ['Diarrhea, mild stomach discomfort', 'Nausea and vomiting', 'Mild allergic skin rash'],
      serious: ['Severe allergic reaction (Anaphylaxis, hives, facial swelling)', 'Clostridioides difficile severe persistent watery diarrhea', 'Blistering skin lesions (Stevens-Johnson syndrome)']
    },
    warnings: [
      'Must complete the entire prescribed course even if symptoms disappear early to prevent antibiotic resistance.',
      'Inform doctor immediately if you develop severe watery diarrhea or unexplained fever during or after treatment.',
      'Not effective against viral infections like colds, flu, or COVID-19.'
    ],
    contraindications: [
      'Known severe allergy to penicillins or cephalosporins'
    ],
    drugInteractions: [
      'Methotrexate (amoxicillin decreases clearance, increasing toxicity)',
      'Probenecid (increases amoxicillin blood levels)',
      'Oral typhoid vaccine (inactivates vaccine potency)'
    ],
    storageInstructions: 'Store capsules/tablets at room temperature. Liquid suspensions should ideally be refrigerated after reconstitution and discarded after 14 days.',
    pregnancyCategory: 'Category B (Considered safe in pregnancy when required and prescribed)',
    breastfeedingInfo: 'Compatible with breastfeeding; monitor infant for mild diarrhea or thrush.',
    elderlyPrecautions: 'Dose adjustments may be needed if kidney function is significantly impaired (renal clearance).',
    missedDoseGuidance: 'Take as soon as you remember. If it is almost time for your next dose, skip the missed dose and resume normal schedule.',
    overdoseWarning: 'Overdose may cause severe nausea, vomiting, diarrhea, and kidney crystal formation. Seek medical evaluation.'
  },
  {
    id: 'metformin',
    genericName: 'Metformin Hydrochloride',
    brandName: 'Glucophage, Fortamet, Riomet, Glumetza',
    category: 'Biguanide Antidiabetic Agent',
    uses: [
      'First-line treatment for Type 2 Diabetes Mellitus to improve blood glucose control',
      'Polycystic Ovary Syndrome (PCOS) insulin resistance management',
      'Prediabetes progression delay'
    ],
    adultDosage: 'Initial 500 mg twice daily or 850 mg once daily with meals. Gradually increased up to a maximum of 2000–2550 mg daily.',
    pediatricDosage: 'For children ≥10 years: Initial 500 mg twice daily, max 2000 mg/day in divided doses.',
    sideEffects: {
      common: ['Diarrhea, nausea, gas, abdominal bloating, metallic taste in mouth', 'Vitamin B12 deficiency with long-term use'],
      serious: ['Lactic Acidosis (rare but life-threatening metabolic emergency characterized by severe muscle pain, hypothermia, trouble breathing, drowsiness)']
    },
    warnings: [
      'Take with meals to minimize stomach upset and diarrhea.',
      'Temporarily stop taking metformin before undergoing radiological procedures using iodinated contrast dyes.',
      'Avoid excessive acute or chronic alcohol consumption.'
    ],
    contraindications: [
      'Severe renal impairment (eGFR < 30 mL/min/1.73m²)',
      'Acute or chronic metabolic acidosis (including diabetic ketoacidosis)',
      'Severe hypoxia, sepsis, or heart failure'
    ],
    drugInteractions: [
      'Iodinated Contrast Dyes (increases lactic acidosis risk)',
      'Cimetidine, Dolutegravir (increases metformin concentration)',
      'Alcohol (significantly potentiates lactic acidosis hazard)'
    ],
    storageInstructions: 'Store at 20°–25°C (68°–77°F). Protect from moisture and keep container tightly closed.',
    pregnancyCategory: 'Category B (Frequently used in pregnancy under specialist diabetes care)',
    breastfeedingInfo: 'Passes into breast milk in low levels. Discuss with endocrinologist.',
    elderlyPrecautions: 'Regular monitoring of kidney function (eGFR) is crucial before and during treatment.',
    missedDoseGuidance: 'Take the missed dose with your next meal. If it is close to the following meal, skip the missed dose.',
    overdoseWarning: 'Hypoglycemia is rare with metformin alone, but Lactic Acidosis can occur with significant overdose. Immediate emergency hospitalization required.'
  },
  {
    id: 'cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    brandName: 'Zyrtec, Reactine, Cetzine',
    category: 'Second-Generation Antihistamine',
    uses: [
      'Relief of allergic rhinitis symptoms (sneezing, runny nose, itchy watery eyes, nasal congestion)',
      'Treatment of chronic idiopathic urticaria (hives & allergic skin itching)'
    ],
    adultDosage: '5 mg to 10 mg once daily depending on symptom severity.',
    pediatricDosage: 'Children 2–5 years: 2.5 mg to 5 mg once daily. Children 6+ years: 5 mg to 10 mg once daily.',
    sideEffects: {
      common: ['Mild drowsiness or sedation (less than 1st generation antihistamines)', 'Dry mouth, fatigue, headache'],
      serious: ['Severe allergic response', 'Urinary retention or extreme sedation when combined with central depressants']
    },
    warnings: [
      'May cause mild drowsiness; exercise caution when operating heavy machinery or driving.',
      'Avoid taking with alcohol or sedative medications.'
    ],
    contraindications: [
      'End-stage renal disease (eGFR < 10 mL/min) without dose adjustment',
      'Hypersensitivity to cetirizine or hydroxyzine'
    ],
    drugInteractions: [
      'Alcohol & CNS Depressants (enhances drowsiness and psychomotor impairment)',
      'Theophylline (may slightly decrease cetirizine clearance)'
    ],
    storageInstructions: 'Store at room temperature away from excessive heat and direct moisture.',
    pregnancyCategory: 'Category B (Considered low risk; consult obstetrician for allergy management during pregnancy)',
    breastfeedingInfo: 'Excreted in human milk; may cause mild sedation in nursing infants. Low dose short-term use acceptable.',
    elderlyPrecautions: 'Start with 5 mg once daily due to age-related decline in renal excretion.',
    missedDoseGuidance: 'Take as soon as remembered. If near next daily dose, skip it and continue normal single dose schedule.',
    overdoseWarning: 'Symptoms include extreme somnolence, confusion, restlessness, and tachycardia. Contact poison control.'
  },
  {
    id: 'aspirin',
    genericName: 'Aspirin (Acetylsalicylic Acid)',
    brandName: 'Bayer Aspirin, Ecotrin, Disprin, Aspirin Low Dose',
    category: 'Antiplatelet & NSAID',
    uses: [
      'Secondary prevention of cardiovascular events (heart attack, ischemic stroke, angina)',
      'Pain, fever, and acute inflammation reduction'
    ],
    adultDosage: 'Cardiovascular prevention: 75 mg to 100 mg once daily. Acute pain/fever: 325 mg to 650 mg every 4 hours (max 4000 mg/day).',
    pediatricDosage: 'STRICTLY CONTRAINDICATED in children/teenagers with viral infections (fever, flu, chickenpox) due to Reye Syndrome risk.',
    sideEffects: {
      common: ['Stomach pain, heartburn, mild nausea, increased bleeding tendency (easy bruising)'],
      serious: ['Gastrointestinal hemorrhage, black bloody stools', 'Tinnitus or hearing loss (sign of high salicylate toxicity)', 'Reye Syndrome in pediatric patients']
    },
    warnings: [
      'NEVER give aspirin to children or teenagers recovering from viral illness (chickenpox/flu) due to fatal Reye Syndrome risk.',
      'Discontinue or consult surgeon before scheduled elective surgery due to prolonged bleeding time.'
    ],
    contraindications: [
      'Children/adolescents with viral fevers',
      'Active peptic ulcers or bleeding disorders (hemophilia)',
      'Aspirin-triad asthma'
    ],
    drugInteractions: [
      'Warfarin, Clopidogrel, Direct Anticoagulants (severe hemorrhage risk)',
      'Ibuprofen (may interfere with cardioprotective antiplatelet effect of low-dose aspirin)',
      'Alcohol (significantly raises gastric mucosal bleeding risk)'
    ],
    storageInstructions: 'Keep in dry room temperature container. Do not use if tablets smell strongly of vinegar (degraded aspirin).',
    pregnancyCategory: 'Category D in 3rd trimester (High dose should be avoided; low dose 81mg is strictly prescribed in specific preeclampsia protocols by OBGYN).',
    breastfeedingInfo: 'High doses excreted in milk; avoid prolonged high-dose aspirin while nursing.',
    elderlyPrecautions: 'Increased baseline bleeding risk; routine gastroprotection (PPI) often prescribed concurrently.',
    missedDoseGuidance: 'Take low-dose aspirin as soon as remembered. If close to next daily dose, skip the missed one.',
    overdoseWarning: 'Salicylate poisoning causes rapid breathing (hyperventilation), ringing in ears, confusion, vomiting, and metabolic acidosis. Seek immediate emergency care.'
  }
];

export const PRESET_FIRST_AID: Record<string, FirstAidGuide> = {
  fever: {
    condition: 'Fever (Elevated Body Temperature)',
    summary: 'Educational guide for managing mild to moderate fever in adults and older children.',
    immediateSteps: [
      'Rest in a comfortable, well-ventilated room.',
      'Stay hydrated with water, electrolyte solutions, clear broths, or oral rehydration fluids.',
      'Dress in lightweight, breathable clothing and use light blankets.',
      'Over-the-counter fever reducers (like Paracetamol or Ibuprofen) may be considered according to age and package directions.'
    ],
    whatToAvoid: [
      'Do NOT use cold bath ice soaks or alcohol rubs (can cause shivering and core temperature spikes).',
      'Never give Aspirin to children or teenagers.',
      'Do not bundle up in heavy blankets.'
    ],
    whenToSeekEmergency: [
      'Fever over 39.4°C (103°F) in adults that does not drop with fever medication.',
      'Infants under 3 months with temperature of 38°C (100.4°F) or higher (immediate ER visit needed).',
      'Fever accompanied by stiff neck, severe headache, confusion, difficulty breathing, or unexplained rash.'
    ],
    generalHomeCare: [
      'Monitor body temperature using a digital thermometer every 4 hours.',
      'Ensure adequate fluid intake to replace fluids lost through sweating.'
    ],
    disclaimer: 'Educational first-aid information only. Consult a doctor for persistent fevers or infants.'
  },
  headache: {
    condition: 'Tension or Mild Migraine Headache',
    summary: 'Educational advice for easing common non-emergency headaches.',
    immediateSteps: [
      'Rest in a quiet, dark, well-ventilated room.',
      'Apply a cold compress or cool ice pack to forehead or back of neck for 15 minutes.',
      'Drink 1–2 glasses of water (dehydration is a primary headache trigger).',
      'Gently massage temple muscles and shoulders.'
    ],
    whatToAvoid: [
      'Avoid bright screens, loud noises, or strong fluorescent lights.',
      'Do not overuse OTC painkillers daily (can trigger rebound medication-overuse headaches).'
    ],
    whenToSeekEmergency: [
      'Sudden, explosive "thunderclap" headache (worst headache of your life).',
      'Headache following a head injury or trauma.',
      'Headache accompanied by fever, stiff neck, slurred speech, vision loss, or facial numbness.'
    ],
    generalHomeCare: [
      'Maintain regular sleep schedules, proper hydration, and stress reduction techniques.'
    ],
    disclaimer: 'Seek immediate emergency services if a headache is accompanied by neurological symptoms.'
  },
  burns: {
    condition: 'Minor First-Degree Burns & Scalds',
    summary: 'First response for minor thermal skin burns (redness, small non-blistered area).',
    immediateSteps: [
      'Cool the burn immediately under cool running tap water for at least 10–20 minutes.',
      'Remove jewelry or tight clothing near the burned area before swelling starts.',
      'Apply pure aloe vera gel or clean moisturizers after cooling.',
      'Cover loosely with a clean, sterile non-stick bandage.'
    ],
    whatToAvoid: [
      'NEVER put ice, ice water, butter, oil, or toothpaste on a burn (traps heat and damages skin tissue).',
      'Do NOT pop blisters if second-degree blisters form.',
      'Do not use adhesive bandage directly on broken burn skin.'
    ],
    whenToSeekEmergency: [
      'Burns involving the face, hands, major joints, groin, or encircling an entire limb.',
      'Chemical or electrical burns (require immediate emergency room evaluation).',
      'Third-degree burns (charred black or white painless skin) or large blistered burns.'
    ],
    generalHomeCare: [
      'Keep the burn clean, dry, and protected. Take OTC pain relievers if necessary.'
    ],
    disclaimer: 'Chemical, electrical, and widespread thermal burns require urgent hospital care.'
  },
  cuts: {
    condition: 'Minor Cuts, Scrapes & Abrasion',
    summary: 'First-aid care for small superficial skin cuts.',
    immediateSteps: [
      'Wash hands thoroughly before touching the wound.',
      'Apply gentle, direct pressure using a clean cloth or sterile gauze for 3–5 minutes until bleeding stops.',
      'Rinse the cut gently under clean running water. Clean around the wound with mild soap.',
      'Apply a thin layer of petroleum jelly or antibiotic ointment and cover with a sterile bandage.'
    ],
    whatToAvoid: [
      'Do not pour harsh hydrogen peroxide or rubbing alcohol directly into open deep wounds.',
      'Do not pick at scabs as they form.'
    ],
    whenToSeekEmergency: [
      'Deep cut where bleeding does not stop after 10 minutes of direct pressure.',
      'Deep gaping wound that may require surgical stitches or butterfly closures.',
      'Cut caused by rusty metal, animal bites, or dirty soil (tetanus risk).'
    ],
    generalHomeCare: [
      'Change bandage daily or whenever it gets wet or dirty. Monitor for signs of infection (redness, warmth, pus).'
    ],
    disclaimer: 'Deep cuts or animal bites require medical evaluation and tetanus booster check.'
  }
};
