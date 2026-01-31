import React from 'react';
import type { QuickAction } from '../../types/chatbot';
import { useChatbot } from '../../contexts/ChatbotContext';

const QUICK_ACTIONS: QuickAction[] = [
    {
        id: 'book_appointment',
        label: 'Book Appointment',
        icon: '📅',
        message: 'I would like to book an appointment',
        intent: 'book_appointment',
    },
    {
        id: 'check_symptoms',
        label: 'Check Symptoms',
        icon: '🩺',
        message: 'I need help checking my symptoms',
        intent: 'check_symptoms',
    },
    {
        id: 'view_queue',
        label: 'View Queue',
        icon: '👁️',
        message: 'What is the current queue status?',
        intent: 'view_queue',
    },
    {
        id: 'emergency',
        label: 'Emergency',
        icon: '🚨',
        message: 'This is an emergency, I need immediate help',
        intent: 'emergency',
    },
];

export const QuickActions: React.FC = () => {
    const { sendMessage } = useChatbot();

    const handleQuickAction = (action: QuickAction) => {
        sendMessage(action.message);
    };

    return (
        <div className="quick-actions" role="toolbar" aria-label="Quick action buttons">
            {QUICK_ACTIONS.map((action) => (
                <button
                    key={action.id}
                    className="quick-action-button"
                    onClick={() => handleQuickAction(action)}
                    aria-label={`Quick action: ${action.label}`}
                >
                    <span role="img" aria-hidden="true">{action.icon}</span>
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
};
