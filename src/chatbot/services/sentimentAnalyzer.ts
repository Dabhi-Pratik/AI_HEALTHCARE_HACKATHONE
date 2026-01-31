/**
 * Enhanced Sentiment Analyzer
 * Detects emotions and sentiment from user messages
 */

import trainingData from '../training/intents.json';

export type SentimentLabel = 'positive' | 'negative' | 'neutral' | 'urgent' | 'anxious';
export type EmotionType = 'anxious' | 'angry' | 'grateful' | 'confused' | 'pain' | 'neutral';

export interface SentimentResult {
    score: number; // -1 to 1
    label: SentimentLabel;
    emoji: string;
    emotion?: EmotionType;
    intensity: number; // 0 to 1
}

const sentimentKeywords = trainingData.sentiment_keywords as Record<string, string[]>;

/**
 * Analyze sentiment and emotion from message
 */
export const analyzeSentiment = (message: string): SentimentResult => {
    const lowerMessage = message.toLowerCase();

    // Check for emergency keywords first
    const emergencyKeywords = trainingData.emergency_keywords;
    for (const keyword of emergencyKeywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
            return {
                score: -0.9,
                label: 'urgent',
                emoji: '🚨',
                emotion: 'pain',
                intensity: 1.0,
            };
        }
    }

    // Check for specific emotions
    // The `detectedEmotion` variable was unused as each branch returns immediately.
    // `emotionCount` is now declared as `const` within each relevant block.

    // Anxious
    if (sentimentKeywords.anxious.some(kw => lowerMessage.includes(kw))) {
        const emotionCount = sentimentKeywords.anxious.filter(kw => lowerMessage.includes(kw)).length;
        return {
            score: -0.4,
            label: 'anxious',
            emoji: '😰',
            emotion: 'anxious',
            intensity: Math.min(emotionCount / 3, 1.0),
        };
    }

    // Pain/distress
    if (sentimentKeywords.pain.some(kw => lowerMessage.includes(kw))) {
        const emotionCount = sentimentKeywords.pain.filter(kw => lowerMessage.includes(kw)).length;
        return {
            score: -0.6,
            label: 'negative',
            emoji: '😣',
            emotion: 'pain',
            intensity: Math.min(emotionCount / 2, 1.0),
        };
    }

    // Angry/frustrated
    if (sentimentKeywords.angry.some(kw => lowerMessage.includes(kw))) {
        const emotionCount = sentimentKeywords.angry.filter(kw => lowerMessage.includes(kw)).length;
        return {
            score: -0.5,
            label: 'negative',
            emoji: '😠',
            emotion: 'angry',
            intensity: Math.min(emotionCount / 2, 1.0),
        };
    }

    // Confused
    if (sentimentKeywords.confused.some(kw => lowerMessage.includes(kw))) {
        return {
            score: -0.2,
            label: 'neutral',
            emoji: '😕',
            emotion: 'confused',
            intensity: 0.5,
        };
    }

    // Grateful/positive
    if (sentimentKeywords.grateful.some(kw => lowerMessage.includes(kw))) {
        const emotionCount = sentimentKeywords.grateful.filter(kw => lowerMessage.includes(kw)).length;
        return {
            score: 0.8,
            label: 'positive',
            emoji: '😊',
            emotion: 'grateful',
            intensity: Math.min(emotionCount / 2, 1.0),
        };
    }

    // Neutral default
    return {
        score: 0.0,
        label: 'neutral',
        emoji: '💙',
        emotion: 'neutral',
        intensity: 0.3,
    };
};

/**
 * Get appropriate response tone based on emotion
 */
export const getResponseTone = (emotion: EmotionType): string => {
    const tones: Record<EmotionType, string> = {
        anxious: 'calm, reassuring, empathetic',
        angry: 'apologetic, solution-focused',
        grateful: 'warm, genuine, caring',
        confused: 'patient, clear, supportive',
        pain: 'urgent, compassionate, action-oriented',
        neutral: 'helpful, professional, friendly',
    };

    return tones[emotion] || tones.neutral;
};

/**
 * Adjust response based on sentiment
 */
export const adjustResponseForSentiment = (
    response: string,
    sentiment: SentimentResult
): string => {
    // Add empathy prefix for negative emotions
    if (sentiment.emotion === 'anxious') {
        return `I understand you're feeling anxious. ${response}`;
    }

    if (sentiment.emotion === 'pain') {
        return `I'm sorry you're in pain. ${response}`;
    }

    if (sentiment.emotion === 'angry') {
        return `I apologize for any frustration. ${response}`;
    }

    if (sentiment.emotion === 'confused') {
        return `Let me clarify that for you. ${response}`;
    }

    return response;
};
