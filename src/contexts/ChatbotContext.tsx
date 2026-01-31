import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { ChatMessage, ChatbotPreferences } from '../types/chatbot';
import { intentMatcher } from '../chatbot/services/intentMatcher';
import { analyzeSentiment as analyzeEnhancedSentiment, adjustResponseForSentiment } from '../chatbot/services/sentimentAnalyzer';

// Legacy SentimentData type for compatibility
type SentimentData = { score: number; label: string; emoji: string };

interface ChatbotContextType {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    sessionId: string | null;
    preferences: ChatbotPreferences;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;
    updatePreferences: (prefs: Partial<ChatbotPreferences>) => void;
    setZoomLevel: (level: number) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: ChatbotPreferences = {
    zoomLevel: 100,
    voiceEnabled: true,
    darkMode: false,
    language: 'en',
    notificationsEnabled: true,
};

const QUICK_RESPONSES = {
    greeting: "😊 Hello! 👋 I'm your AI Health Assistant. How can I help you today?\n\n📋 *Medical Disclaimer: This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician for any medical concerns.*",
    appointment: "I can help you book an appointment. Which department would you like to visit?",
    symptoms: "I'll help you analyze your symptoms. Please describe what you're experiencing.",
    queue: "Let me check the current queue status for you...",
    emergency: "🚨 This seems urgent. I'm connecting you to emergency services immediately.",
};

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [preferences, setPreferences] = useState<ChatbotPreferences>(() => {
        // Load preferences from localStorage
        const stored = localStorage.getItem('chatbot_preferences');
        return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    });

    // Initialize session on mount
    useEffect(() => {
        const existingSession = localStorage.getItem('chatbot_session_id');
        if (existingSession) {
            setSessionId(existingSession);
            loadChatHistory(existingSession);
        }
    }, []);

    // Save preferences to localStorage
    useEffect(() => {
        localStorage.setItem('chatbot_preferences', JSON.stringify(preferences));
    }, [preferences]);

    const loadChatHistory = async (sessionId: string) => {
        try {
            // TODO: Replace with actual API call
            const storedMessages = localStorage.getItem(`chatbot_history_${sessionId} `);
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages, (key, value) => {
                    if (key === 'timestamp') return new Date(value);
                    return value;
                }));
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
    };

    const openChat = useCallback(() => {
        setIsOpen(true);

        // Create new session if none exists
        if (!sessionId) {
            const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)} `;
            setSessionId(newSessionId);
            localStorage.setItem('chatbot_session_id', newSessionId);

            // Send welcome message
            const welcomeMessage: ChatMessage = {
                id: `msg_${Date.now()}`,
                sessionId: newSessionId,
                sender: 'bot',
                content: "Hello! 👋 I'm your AI Health Assistant. I can help you with:\n\n• Checking symptoms\n• Booking appointments\n• Finding doctors\n• Emergency guidance\n\nHow can I assist you today?\n\n⚕️ **Medical Disclaimer:** This AI provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider.",
                timestamp: new Date(),
                sentiment: { score: 1.0, label: 'positive', emoji: '😊' },
            };
            setMessages([welcomeMessage]);
        }
    }, [sessionId]);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleChat = useCallback(() => {
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }, [isOpen, openChat, closeChat]);

    // Use enhanced sentiment analyzer
    const analyzeSentiment = (content: string): SentimentData => {
        const enhanced = analyzeEnhancedSentiment(content);
        return {
            score: enhanced.score,
            label: enhanced.label,
            emoji: enhanced.emoji
        };
    };

    // Use trained intent matcher and generate response
    const processUserMessage = (userMessage: string) => {
        // Match intent using trained model
        const matchedIntent = intentMatcher.matchIntent(userMessage);

        // Get sentiment for tone adjustment
        const sentimentResult = analyzeEnhancedSentiment(userMessage);

        // Adjust response based on sentiment/emotion
        let finalResponse = matchedIntent.response;
        if (sentimentResult.emotion) {
            finalResponse = adjustResponseForSentiment(finalResponse, sentimentResult);
        }

        // Add department recommendations if available
        if (matchedIntent.departments && matchedIntent.departments.length > 0) {
            finalResponse += `\n\n ** Recommended Department(s):** ${matchedIntent.departments.join(', ')} `;
        }

        return {
            intent: matchedIntent.tag,
            response: finalResponse,
            isEmergency: matchedIntent.isEmergency,
            confidence: matchedIntent.confidence,
            sentiment: sentimentResult
        };
    };

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || !sessionId) return;

        const userMessage: ChatMessage = {
            id: `msg_${Date.now()} _user`,
            sessionId,
            sender: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // Process message with trained chatbot
            const result = processUserMessage(content);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

            // Use trained response
            const botResponse = result.response;

            const botMessage: ChatMessage = {
                id: `msg_${Date.now()} _bot`,
                sessionId,
                sender: 'bot',
                content: botResponse,
                timestamp: new Date(),
                intent: result.intent,
                sentiment: { score: result.sentiment.score, label: result.sentiment.label, emoji: result.sentiment.emoji },
            };

            setMessages(prev => {
                const updated = [...prev, botMessage];
                // Save to localStorage
                localStorage.setItem(`chatbot_history_${sessionId} `, JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            console.error('Failed to send message:', error);

            const errorMessage: ChatMessage = {
                id: `msg_${Date.now()} _error`,
                sessionId,
                sender: 'system',
                content: "I'm having trouble connecting right now. Please try again in a moment.",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [sessionId]);

    const clearChat = useCallback(() => {
        setMessages([]);
        if (sessionId) {
            localStorage.removeItem(`chatbot_history_${sessionId} `);
            const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)} `;
            setSessionId(newSessionId);
            localStorage.setItem('chatbot_session_id', newSessionId);

            // Send new welcome message
            const welcomeMessage: ChatMessage = {
                id: `msg_${Date.now()} `,
                sessionId: newSessionId,
                sender: 'bot',
                content: QUICK_RESPONSES.greeting,
                timestamp: new Date(),
                sentiment: { score: 1.0, label: 'positive', emoji: '😊' },
            };
            setMessages([welcomeMessage]);
        }
    }, [sessionId]);

    const updatePreferences = useCallback((prefs: Partial<ChatbotPreferences>) => {
        setPreferences(prev => ({ ...prev, ...prefs }));
    }, []);

    const setZoomLevel = useCallback((level: number) => {
        const clampedLevel = Math.max(80, Math.min(150, level));
        updatePreferences({ zoomLevel: clampedLevel });
        localStorage.setItem('chatbot_zoom_level', clampedLevel.toString());
    }, [updatePreferences]);

    const value: ChatbotContextType = {
        isOpen,
        messages,
        isTyping,
        sessionId,
        preferences,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        clearChat,
        updatePreferences,
        setZoomLevel,
    };

    return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = () => {
    const context = useContext(ChatbotContext);
    if (!context) {
        throw new Error('useChatbot must be used within a ChatbotProvider');
    }
    return context;
};
