# MediGuide AI 🌿 – Intelligent Medication Safety & Health Assistant

MediGuide AI is a full-stack health education and medication safety web application powered by **Groq API (Llama 3.3 70B)** and **Google Gemini AI**. Designed with a soothing **Natural Tones** aesthetic (organic teal and emerald palette), MediGuide AI provides instant, reliable, and clinical-grade educational dossiers for drugs, multi-drug interaction safety matrix analysis, symptom & side-effect evaluations, first aid guidance, and local browser pill reminders.

---

## 🌟 Key Features

### 1. 🤖 ChatGPT-Style AI Medication Assistant
* **Interactive Chat Experience**: Full-screen AI chat room as well as a ubiquitous floating AI assistant widget available on every view.
* **Dual AI Backend Pipeline**: Primary fast inference via Groq Llama 3.3 70B Versatile with automatic fallback to Google Gemini AI.
* **Clinical Safety Prompting**: Contextually formatted, easy-to-read structured guidance on pharmacology, contraindications, food-drug interactions, and patient safety.

### 2. 🔍 Medication Search & Deep Safety Dossier
* **Instant Database Lookup**: Preset drug reference library covering widely used analgesics, NSAIDs, antibiotics, antidiabetics, antihistamines, and antiplatelets.
* **AI Deep Search**: Instant AI report generator for any drug brand or generic name not found in the preset database.
* **Detailed Clinical Profile**: Generic & brand names, primary medical indications, adult & pediatric dosage, common vs. serious side effects, pregnancy categories, breastfeeding advice, elderly care, missed dose instructions, and overdose warnings.

### 3. ⚡ Multi-Drug Interaction Safety Matrix
* **Multi-Medication Analysis**: Enter two or more prescription or over-the-counter drugs to evaluate potential interactions.
* **Severity Classification**: Clear visual risk badges (`Safe`, `Minor`, `Moderate`, `High/Critical`).
* **Physiological Mechanisms & Precautions**: Detailed clinical mechanism explanations, specific symptoms to watch for, and physician consultation guidance.

### 4. 🩺 Symptom & Side Effect Analyzer
* **Adverse Reaction Evaluation**: Check if symptoms experienced match common or serious adverse drug reactions.
* **Emergency Alert Triggers**: Immediate visual banners and emergency service call triggers if symptoms indicate critical toxicities or anaphylaxis.
* **Self-Care & Self-Monitoring Advice**: Actionable home management steps and guidance on when to contact a healthcare provider.

### 5. 💊 Dosage & Posology Reference Guide
* **Standard Dosing Guidance**: Clear adult and pediatric dosage instructions.
* **Missed Dose Protocols**: Step-by-step advice on how to recover from missed doses safely without doubling up.
* **Storage & Handling**: Temperature, moisture, and light protection instructions.

### 6. 🚑 First Aid AI Assistant
* **Immediate Response Steps**: Step-by-step guidance for common acute conditions (Fever, Headache/Migraine, Minor Burns, Cuts & Scrapes) and custom conditions.
* **Mistakes to Avoid**: Key warnings on dangerous unverified first-aid practices.
* **Red-Flag ER Triggers**: Clear indicators for when emergency room evaluation is required.

### 7. 🛡️ Medication Safety Rules & Disposal
* **8 Cardinal Safety Rules**: Guidelines covering antibiotic completion, avoiding self-medication, food/alcohol interactions, and child safety.
* **FDA/Pharmacy Disposal Guide**: Best practices for safely disposing of unused or expired medications.

### 8. ⏰ Browser-Local Medication Reminders
* **Privacy-First Daily Schedule**: Manage pill schedules with dose times, frequencies, and completion checkmarks.
* **Client-Side Persistence**: Saved exclusively in browser `localStorage` without transmitting personal health schedules to any server.

---

## 🎨 Design Theme – Natural Tones

MediGuide AI adheres to a calming, health-focused **Natural Tones** visual design:
* **Color Palette**: Deep teal (`#0d9488`), organic emerald (`#10b981`), warm slate backgrounds (`#f8fafc` / `#0f172a`), and high-contrast typography.
* **Dark Mode Support**: Seamless light/dark theme toggle persisted in `localStorage`.
* **Responsive Layout**: Desktop-first precision with mobile-first adaptive navigation bars, floating quick-chat launcher, and bento-grid feature tiles.

---

## 🏗️ Tech Stack & Architecture

* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React Icons, Motion (Framer Motion).
* **Backend**: Express.js server on Node.js proxying requests to Groq AI (`@groq/sdk` / Llama 3.3 70B) and Google Gemini AI (`@google/genai`).
* **Storage**: Browser `localStorage` for user preferences, dark mode setting, and medication reminders.

---

## 🚀 Getting Started & Local Development

### Prerequisites
* Node.js 18+
* NPM / PNPM

### Installation & Execution

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file (refer to `.env.example`):
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## ⚠️ Important Medical Disclaimer

> **MediGuide AI provides educational information only and does not diagnose diseases or replace licensed healthcare professionals. Always consult a qualified doctor or pharmacist before starting, stopping, or changing any medication. In emergencies, contact your local emergency services (911 / 112) immediately.**
