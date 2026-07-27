import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const MEDIGUIDE_SYSTEM_PROMPT = `You are MediGuide AI, a professional medication information assistant.
Your purpose is to provide educational medication information only.
Never diagnose diseases.
Never prescribe medications.
Never recommend prescription drugs as treatment.
Always encourage users to consult a qualified healthcare professional for diagnosis, prescriptions, or emergencies.

For each medication, provide:
• Generic Name
• Common Uses
• Typical Adult Dosage (general information)
• Common Side Effects
• Serious Side Effects
• Drug Interactions
• Warnings
• Storage Instructions
• Missed Dose Advice
• Overdose Warning
• Safety Precautions

If information is uncertain, clearly state that instead of guessing.
Keep responses clear, structured, and easy to understand.
Always include an appropriate medical disclaimer statement.`;

function cleanKey(val?: string): string | undefined {
  if (!val) return undefined;
  let key = val.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }
  return key || undefined;
}

// Helper function to query Groq API
async function queryAI(prompt: string, systemPrompt: string = MEDIGUIDE_SYSTEM_PROMPT, jsonMode: boolean = false) {
  const groqApiKey = cleanKey(process.env.GROQ_API_KEY);

  let groqErrorDetail = '';

  if (groqApiKey && groqApiKey !== 'MY_GROQ_API_KEY') {
    const model = 'llama-3.3-70b-versatile';
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          response_format: jsonMode ? { type: 'json_object' } : undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return { content, provider: `Groq (${model})` };
        }
      } else {
        const errText = await response.text();
        groqErrorDetail = `Groq API (${model}) HTTP ${response.status}: ${errText}`;
        console.warn(`Groq API error response for ${model}:`, groqErrorDetail);
      }
    } catch (err: any) {
      groqErrorDetail = `Groq connection failed for ${model}: ${err.message || String(err)}`;
      console.warn(`Groq API call failed for ${model}:`, err);
    }
  }

  if (groqErrorDetail) {
    throw new Error(`Groq API Error: ${groqErrorDetail}`);
  }

  if (!groqApiKey) {
    throw new Error('No GROQ_API_KEY found. If on Vercel: 1) Go to Project Settings -> Environment Variables, 2) Add GROQ_API_KEY, 3) Click Deployments -> Redeploy for changes to take effect.');
  }

  throw new Error('No valid API Key configured. Please verify GROQ_API_KEY in process.env.');
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    groqConfigured: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'MY_GROQ_API_KEY'),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message, systemInstruction } = req.body;
    
    // Construct user prompt from chat history or single message
    let prompt = '';
    if (Array.isArray(messages) && messages.length > 0) {
      prompt = messages.map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    } else if (typeof message === 'string') {
      prompt = message;
    } else {
      return res.status(400).json({ error: 'Missing message or messages array' });
    }

    const sysPrompt = systemInstruction || MEDIGUIDE_SYSTEM_PROMPT;
    const result = await queryAI(prompt, sysPrompt, false);
    
    res.json({
      reply: result.content,
      provider: result.provider
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
  }
});

// Medication Details JSON API
app.post('/api/medication-search', async (req, res) => {
  try {
    const { drugName } = req.body;
    if (!drugName) {
      return res.status(400).json({ error: 'Drug name is required' });
    }

    const prompt = `Provide detailed educational medication data for "${drugName}".
Respond strictly in JSON format matching this schema:
{
  "genericName": "string",
  "brandName": "string (comma separated list of popular brands)",
  "category": "string (e.g. Analgesic, Antibiotic, Antihistamine)",
  "uses": ["string"],
  "adultDosage": "string",
  "pediatricDosage": "string (or 'Not recommended for pediatric use without doctor supervision')",
  "sideEffects": {
    "common": ["string"],
    "serious": ["string"]
  },
  "warnings": ["string"],
  "contraindications": ["string"],
  "drugInteractions": ["string"],
  "storageInstructions": "string",
  "pregnancyCategory": "string (e.g. Category B, or safe/caution details)",
  "breastfeedingInfo": "string",
  "elderlyPrecautions": "string",
  "missedDoseGuidance": "string",
  "overdoseWarning": "string"
}`;

    const sysPrompt = `${MEDIGUIDE_SYSTEM_PROMPT} Always output valid structured JSON.`;
    const result = await queryAI(prompt, sysPrompt, true);

    try {
      const parsedData = JSON.parse(result.content);
      res.json({ data: parsedData, provider: result.provider });
    } catch {
      res.json({ rawContent: result.content, provider: result.provider });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to retrieve medication details.' });
  }
});

// Drug Interaction Checker API
app.post('/api/check-interactions', async (req, res) => {
  try {
    const { medications } = req.body;
    if (!Array.isArray(medications) || medications.length < 2) {
      return res.status(400).json({ error: 'Please enter at least two medication names to check interactions.' });
    }

    const prompt = `Analyze potential interactions between these medications: ${medications.join(', ')}.
Respond strictly in JSON format matching this schema:
{
  "medications": ["string"],
  "overallSeverity": "Safe | Minor | Moderate | High | Critical",
  "summary": "string summary of analysis",
  "possibleInteractions": [
    {
      "drugs": "Drug A + Drug B",
      "severity": "Minor | Moderate | High",
      "mechanism": "string explaining how they interact",
      "symptomsToWatch": "string"
    }
  ],
  "precautions": ["string"],
  "doctorConsultationRecommended": boolean,
  "emergencyAdvice": "string"
}`;

    const sysPrompt = `${MEDIGUIDE_SYSTEM_PROMPT} Provide educational drug interaction insights in JSON.`;
    const result = await queryAI(prompt, sysPrompt, true);

    try {
      const parsedData = JSON.parse(result.content);
      res.json({ data: parsedData, provider: result.provider });
    } catch {
      res.json({ rawContent: result.content, provider: result.provider });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to analyze drug interactions.' });
  }
});

// Side Effect Checker API
app.post('/api/check-side-effects', async (req, res) => {
  try {
    const { medicine, symptoms } = req.body;
    if (!medicine || !symptoms) {
      return res.status(400).json({ error: 'Medicine name and symptoms are required.' });
    }

    const prompt = `Analyze if the reported symptoms ("${symptoms}") are known side effects of "${medicine}".
Respond strictly in JSON format matching this schema:
{
  "medicine": "string",
  "symptomsReported": "string",
  "isLikelySideEffect": boolean,
  "sideEffectType": "Common | Less Common | Rare / Serious | Unlikely Related",
  "commonSideEffects": ["string"],
  "seriousSideEffects": ["string"],
  "emergencyCareNeeded": boolean,
  "emergencyCareReason": "string (when emergency care is needed)",
  "selfCareAdvice": ["string"],
  "consultDoctorNotice": "string"
}`;

    const sysPrompt = `${MEDIGUIDE_SYSTEM_PROMPT} Provide educational side effect evaluation in JSON format.`;
    const result = await queryAI(prompt, sysPrompt, true);

    try {
      const parsedData = JSON.parse(result.content);
      res.json({ data: parsedData, provider: result.provider });
    } catch {
      res.json({ rawContent: result.content, provider: result.provider });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to check side effects.' });
  }
});

// First Aid AI Assistant API
app.post('/api/first-aid', async (req, res) => {
  try {
    const { condition, userQuery } = req.body;
    const prompt = `Provide educational first aid steps and safety guidance for: ${condition || userQuery}.
Respond strictly in JSON format matching this schema:
{
  "condition": "string",
  "immediateSteps": ["string"],
  "whatToAvoid": ["string"],
  "whenToSeekEmergency": ["string"],
  "generalHomeCare": ["string"],
  "disclaimer": "string"
}`;

    const sysPrompt = `${MEDIGUIDE_SYSTEM_PROMPT} Provide first-aid educational guidance in JSON. Always emphasize seeking emergency care for severe symptoms.`;
    const result = await queryAI(prompt, sysPrompt, true);

    try {
      const parsedData = JSON.parse(result.content);
      res.json({ data: parsedData, provider: result.provider });
    } catch {
      res.json({ rawContent: result.content, provider: result.provider });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to get first aid guidance.' });
  }
});

export default app;
