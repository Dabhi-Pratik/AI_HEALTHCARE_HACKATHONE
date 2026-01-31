/**
 * Intent Matcher Service
 * Matches user input to predefined intents using pattern matching
 */

import trainingData from '../training/intents.json';
import { findBestMatch, containsEmergencyKeywords, extractEntities } from '../utils/patternMatcher';

export interface Intent {
    tag: string;
    patterns: string[];
    responses: string[];
    severity?: string;
    recommended_departments?: string[];
    emergency?: boolean;
    priority?: string;
}

export interface MatchedIntent {
    tag: string;
    confidence: number;
    response: string;
    severity?: string;
    departments?: string[];
    isEmergency: boolean;
    entities?: Record<string, string[]>;
}

export class IntentMatcher {
    private intents: Intent[];
    private emergencyKeywords: string[];
    private entityLists: Record<string, string[]>;

    constructor() {
        this.intents = trainingData.intents as Intent[];
        this.emergencyKeywords = trainingData.emergency_keywords;
        this.entityLists = trainingData.entities;
    }

    /**
     * Match user input to the best intent
     */
    public matchIntent(userInput: string): MatchedIntent {
        const normalizedInput = userInput.toLowerCase().trim();

        // PRIORITY 1: Check for emergency keywords first
        if (containsEmergencyKeywords(normalizedInput, this.emergencyKeywords)) {
            const emergencyIntent = this.intents.find(intent => intent.emergency === true);
            if (emergencyIntent) {
                return this.createMatchedIntent(emergencyIntent, 1.0, userInput, true);
            }
        }

        // PRIORITY 2: Match against intent patterns
        let bestMatch: { intent: Intent; score: number } | null = null;

        for (const intent of this.intents) {
            const match = findBestMatch(normalizedInput, intent.patterns);
            if (match && (!bestMatch || match.score > bestMatch.score)) {
                bestMatch = { intent, score: match.score };
            }
        }

        // Return best match or fallback
        if (bestMatch && bestMatch.score >= 0.5) {
            return this.createMatchedIntent(
                bestMatch.intent,
                bestMatch.score,
                userInput,
                bestMatch.intent.emergency || false
            );
        }

        // Fallback: no match found
        return this.createNoMatchIntent();
    }

    /**
     * Create a matched intent response
     */
    private createMatchedIntent(
        intent: Intent,
        confidence: number,
        userInput: string,
        isEmergency: boolean
    ): MatchedIntent {
        // Select random response from available responses
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

        // Extract entities from user input
        const entities = extractEntities(userInput, this.entityLists);

        return {
            tag: intent.tag,
            confidence,
            response,
            severity: intent.severity,
            departments: intent.recommended_departments,
            isEmergency,
            entities,
        };
    }

    /**
     * Create a fallback response when no intent matches
     */
    private createNoMatchIntent(): MatchedIntent {
        return {
            tag: 'no_match',
            confidence: 0,
            response:
                "I'm not sure I understood that correctly. Could you please rephrase? I can help you with: booking appointments, checking symptoms, finding doctors, viewing medical records, or answering general health questions.",
            isEmergency: false,
        };
    }

    /**
     * Get all available intents
     */
    public getAllIntents(): Intent[] {
        return this.intents;
    }

    /**
     * Get intent by tag
     */
    public getIntentByTag(tag: string): Intent | undefined {
        return this.intents.find(intent => intent.tag === tag);
    }
}

// Export singleton instance
export const intentMatcher = new IntentMatcher();
