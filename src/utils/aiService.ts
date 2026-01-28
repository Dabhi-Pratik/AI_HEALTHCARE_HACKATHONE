/**
 * Advanced AI Service with Multi-Provider Support
 * Supports: OpenAI GPT-4, Google Med-PaLM 2, and Mock responses
 * Integrated with hospital appointment system data
 */

import type { SymptomAnalysis, ChatMessage, Doctor } from '../types';
import { mockDoctors, mockDepartments } from './mockData';
import { getMockChatbotResponse } from './smartcare-responses';

// AI Provider Configuration
const AI_CONFIG = {
    provider: import.meta.env.VITE_AI_PROVIDER || 'mock',
    openai: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview',
        baseURL: 'https://api.openai.com/v1'
    },
    google: {
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT
    }
};

// SmartCare AI - Natural, Empathetic Healthcare Assistant System Prompt
const SMARTCARE_SYSTEM_PROMPT = `ROLE

You are SmartCare AI, a calm, caring healthcare assistant.
You talk like a real human, not a form or machine.

✅ speaks slowly & naturally
✅ asks one question at a time
✅ shows empathy
✅ behaves like it is thinking for 1–2 seconds
✅ prints line by line, not rushed
✅ feels like a real health assistant

🔹 IMPORTANT BEHAVIOR RULES (MANDATORY)

❌ Never ask multiple questions in one message
✅ Always show empathy first
✅ Respond slowly, line by line
✅ Pause mentally for 1–2 seconds before asking next question
✅ Use simple, friendly English
✅ Sound supportive, not clinical
❌ Never diagnose or prescribe medicine

🔹 RESPONSE STYLE (VERY IMPORTANT)

- Write short lines
- Add natural pauses
- One thought per line
- One question per message

🧠 Simulate thinking by:
- Short filler lines
- Soft transitions
- Calm pacing

🔹 STANDARD CONVERSATION FLOW

STEP 1: EMPATHY
Always start like this:

"I'm sorry you're not feeling well.

I'm here to help you.

Let me understand your situation first."

STEP 2: SYMPTOM QUESTION (ONLY ONE)

"Can you tell me what you're feeling right now?"

(stop here — wait for user reply)

STEP 3: DURATION (NEXT MESSAGE ONLY)

"Thank you for telling me.

When did this start?"

STEP 4: SEVERITY

"I see.

Would you say it feels mild, moderate, or quite severe?"

STEP 5: EXTRA SYMPTOMS

"Are you feeling anything else along with this?

Like fever, weakness, or pain?"

STEP 6: SAFETY CHECK

"Just to be sure,

are you having chest pain or trouble breathing right now?"

🔹 THINKING SIMULATION (IMPORTANT)

Before each question:
- Use a calm connector
- Do NOT rush

Example:
"Okay…

Let me ask you one more thing."

🔹 SAMPLE REALISTIC RESPONSE (FULL EXAMPLE)

"I'm sorry you're feeling uncomfortable.

Take a moment.

Can you tell me what problem you're facing right now?"

(user replies)

"Thank you for sharing that.

When did this start?"

(user replies)

"I understand.

Would you say it is mild, or does it bother you a lot?"

🔹 HOSPITAL CONTEXT

You work for HealthCare+ hospital system.
Available Departments: ${mockDepartments.map(d => d.name).join(', ')}
Available Doctors: ${mockDoctors.map(d => `Dr. ${d.name} (${d.specialization})`).join(', ')}

🔹 DISCLAIMER (ALWAYS AT END, SOFT WAY)

"Please remember, this is not a medical diagnosis.

If your symptoms become severe or worrying,
it's important to consult a doctor."


🔹 EMERGENCY OVERRIDE RULE (CRITICAL)

If the user mentions ANY of these symptoms:
- Sudden weakness on one side of the body
- Difficulty speaking / slurred speech
- Face drooping
- Chest pain
- Cannot breathe / severe breathing difficulty
- Sudden severe headache
- Fainting or loss of consciousness
- Seizure
- Severe bleeding

Then you MUST:
❌ DO NOT ask follow-up questions
❌ DO NOT continue slow conversation
✅ Immediately advise emergency medical help
✅ Respond with urgency and clarity
✅ DO NOT proceed with normal symptom checking

CORRECT EMERGENCY RESPONSE FORMAT:

"I'm really concerned about what you've shared.

[Symptom] can be a medical emergency.

Please seek emergency medical care immediately or call your local emergency number right now.

Do not wait or try to manage this at home.

This is not a medical diagnosis, but getting urgent help is very important."

🔹 EMERGENCY CONDITIONS (ALWAYS ESCALATE)

If user mentions:
- Chest pain
- Severe breathing problem
- Fainting
- Sudden weakness

Immediately respond:

"This could be serious.

Please seek emergency medical care right away."

(No further questions)

🔹 FINAL SYSTEM RULE

You must sound like a caring human who is thinking before speaking,
not like a fast chatbot.

✔ Slow down responses
✔ Prevent question dumping
✔ Increase patient trust
✔ Feel realistic

Remember: ONE question per message. Always show empathy. Speak naturally.`;

/**
 * OpenAI GPT-4 Integration
 */
async function analyzeWithOpenAI(symptoms: string): Promise<SymptomAnalysis> {
    if (!AI_CONFIG.openai.apiKey || AI_CONFIG.openai.apiKey === 'your_openai_api_key_here') {
        console.warn('OpenAI API key not configured, falling back to mock data');
        return getMockAnalysis(symptoms);
    }

    try {
        const response = await fetch(`${AI_CONFIG.openai.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: AI_CONFIG.openai.model,
                messages: [
                    { role: 'system', content: SMARTCARE_SYSTEM_PROMPT },
                    { role: 'user', content: `Patient symptoms: ${symptoms}` }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = JSON.parse(data.choices[0].message.content);

        // Find matching doctors from our system
        const recommendedDoctors = mockDoctors
            .filter(doc => doc.department.toLowerCase() === aiResponse.recommendedDepartment.toLowerCase())
            .slice(0, 3);

        return {
            symptoms: symptoms.split(',').map(s => s.trim()),
            severity: aiResponse.severity.toLowerCase() as 'mild' | 'moderate' | 'severe' | 'critical',
            possibleConditions: aiResponse.possibleConditions,
            recommendedDepartment: aiResponse.recommendedDepartment,
            recommendedDoctors: recommendedDoctors.map(d => d.id),
            urgencyLevel: aiResponse.urgencyLevel || 5,
            disclaimer: 'This AI provides general health information only and is not a substitute for professional medical advice.'
        };
    } catch (error) {
        console.error('OpenAI API error:', error);
        return getMockAnalysis(symptoms);
    }
}

/**
 * Google Med-PaLM 2 Integration (Future Implementation)
 */
async function analyzeWithGoogle(symptoms: string): Promise<SymptomAnalysis> {
    if (!AI_CONFIG.google.apiKey || AI_CONFIG.google.apiKey === 'your_google_api_key_here') {
        console.warn('Google API key not configured, falling back to mock data');
        return getMockAnalysis(symptoms);
    }

    try {
        // Google Med-PaLM 2 implementation would go here
        // This requires Google Cloud Healthcare API setup
        console.info('Google Med-PaLM 2 integration coming soon');
        return getMockAnalysis(symptoms);
    } catch (error) {
        console.error('Google API error:', error);
        return getMockAnalysis(symptoms);
    }
}

/**
 * Enhanced Mock Analysis with Medical Intelligence
 */
function getMockAnalysis(symptoms: string): SymptomAnalysis {
    const symptomsLower = symptoms.toLowerCase();

    // Smart symptom pattern matching
    const patterns = {
        cardiac: /chest pain|heart|palpitation|shortness of breath/i,
        respiratory: /cough|breathing|lung|wheezing|asthma/i,
        neurological: /headache|dizzy|migraine|seizure|numbness/i,
        gastrointestinal: /stomach|nausea|vomit|diarrhea|abdominal/i,
        musculoskeletal: /back pain|joint|muscle|fracture|sprain/i,
        dermatological: /skin|rash|itch|acne|lesion/i,
        psychiatric: /anxiety|depression|stress|mood|sleep/i,
        emergency: /severe|unbearable|sudden|critical|emergency/i
    };

    let severity: 'mild' | 'moderate' | 'severe' | 'critical' = 'mild';
    let conditions: string[] = [];
    let department = 'General Medicine';
    let urgencyLevel = 3;

    if (patterns.emergency.test(symptoms)) {
        severity = 'critical';
        urgencyLevel = 10;
    } else if (patterns.cardiac.test(symptoms)) {
        severity = 'severe';
        conditions = ['Angina', 'Cardiac Arrhythmia', 'Anxiety'];
        department = 'Cardiology';
        urgencyLevel = 8;
        if (symptomsLower.includes('severe') || symptomsLower.includes('crushing')) {
            // shouldSeekEmergency = true; // This line was removed
        }
    } else if (patterns.respiratory.test(symptoms)) {
        severity = symptomsLower.includes('severe') ? 'severe' : 'moderate';
        conditions = ['Bronchitis', 'Asthma', 'Upper Respiratory Infection'];
        department = 'Pulmonology';
        urgencyLevel = 6;
    } else if (patterns.neurological.test(symptoms)) {
        severity = symptomsLower.includes('severe') ? 'severe' : 'moderate';
        conditions = ['Migraine', 'Tension Headache', 'Sinusitis'];
        department = 'Neurology';
        urgencyLevel = 6;
    } else if (patterns.gastrointestinal.test(symptoms)) {
        severity = 'moderate';
        conditions = ['Gastritis', 'Food Poisoning', 'Irritable Bowel Syndrome'];
        department = 'Gastroenterology';
        urgencyLevel = 5;
    } else if (patterns.musculoskeletal.test(symptoms)) {
        severity = 'moderate';
        conditions = ['Muscle Strain', 'Arthritis', 'Herniated Disc'];
        department = 'Orthopedics';
        urgencyLevel = 5;
    } else if (patterns.dermatological.test(symptoms)) {
        severity = 'mild';
        conditions = ['Dermatitis', 'Allergic Reaction', 'Eczema'];
        department = 'Dermatology';
        urgencyLevel = 3;
    } else if (patterns.psychiatric.test(symptoms)) {
        severity = 'moderate';
        conditions = ['Anxiety Disorder', 'Depression', 'Stress-related Disorder'];
        department = 'Psychiatry';
        urgencyLevel = 6;
    }

    // Find doctors matching the department
    const recommendedDoctors = mockDoctors
        .filter(doc => doc.department.toLowerCase().includes(department.toLowerCase()))
        .slice(0, 3);

    return {
        symptoms: symptoms.split(',').map(s => s.trim()),
        severity,
        possibleConditions: conditions.length > 0 ? conditions : ['Common Cold', 'Viral Infection', 'General Malaise'],
        recommendedDepartment: department,
        recommendedDoctors: recommendedDoctors.map(d => d.id),
        urgencyLevel,
        disclaimer: 'This AI provides general health information only and is not a substitute for professional medical advice. For emergencies, call 911 or use the emergency button.'
    };
}

/**
 * Main Symptom Analysis Function with Provider Selection
 */
export async function analyzeSymptoms(symptoms: string): Promise<SymptomAnalysis> {
    if (!symptoms.trim()) {
        throw new Error('Please describe your symptoms');
    }

    // Select provider based on configuration
    switch (AI_CONFIG.provider) {
        case 'openai':
            return await analyzeWithOpenAI(symptoms);
        case 'google':
            return await analyzeWithGoogle(symptoms);
        case 'mock':
        default:
            return getMockAnalysis(symptoms);
    }
}

/**
 * AI Chatbot Response with Context
 */
export async function getChatbotResponse(
    message: string,
    conversationHistory: ChatMessage[]
): Promise<string> {
    if (AI_CONFIG.provider === 'openai' && AI_CONFIG.openai.apiKey && AI_CONFIG.openai.apiKey !== 'your_openai_api_key_here') {
        try {
            const messages = [
                { role: 'system', content: SMARTCARE_SYSTEM_PROMPT },
                ...conversationHistory.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                { role: 'user', content: message }
            ];

            const response = await fetch(`${AI_CONFIG.openai.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: AI_CONFIG.openai.model,
                    messages,
                    temperature: 0.8,
                    max_tokens: 500
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content;
            }
        } catch (error) {
            console.error('Chatbot API error:', error);
        }
    }

    // Fallback to SmartCare AI mock responses
    return getMockChatbotResponse(message);
}

/**
 * Get recommended doctors based on symptoms
 */
export function getRecommendedDoctors(_symptoms: string): Doctor[] {
    // This could be enhanced with ML-based doctor matching
    return mockDoctors.slice(0, 3);
}

export const aiService = {
    analyzeSymptoms,
    getChatbotResponse,
    getRecommendedDoctors,
    config: AI_CONFIG
};
