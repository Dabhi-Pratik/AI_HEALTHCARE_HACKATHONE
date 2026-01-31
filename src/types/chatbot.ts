// Chatbot Types
export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  intent?: string;
  sentiment?: SentimentData;
  metadata?: Record<string, any>;
}

export interface SentimentData {
  score: number; // -1.00 to 1.00
  label: 'positive' | 'neutral' | 'negative' | 'anxious' | 'urgent' | 'calm';
  emoji?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  channel: 'app' | 'whatsapp' | 'ivr' | 'kiosk';
  status: 'active' | 'closed' | 'escalated';
  language: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  message: string;
  intent: string;
}

export interface ChatbotPreferences {
  zoomLevel: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  language: string;
  notificationsEnabled: boolean;
}

export interface VoiceInputState {
  isRecording: boolean;
  isProcessing: boolean;
  error?: string;
}

export type ChatIntent = 
  | 'book_appointment' 
  | 'check_symptoms' 
  | 'view_queue' 
  | 'emergency' 
  | 'general_query'
  | 'reschedule_appointment'
  | 'cancel_appointment'
  | 'medication_info'
  | 'test_results';
