import React from 'react';
import type { ChatMessage } from '../../types/chatbot';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
    message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';

    const formatTime = (date: Date) => {
        return format(new Date(date), 'HH:mm');
    };

    const getSentimentEmoji = () => {
        if (!message.sentiment) return null;
        return message.sentiment.emoji;
    };

    return (
        <div
            className={`message-bubble ${isUser ? 'user' : 'bot'} ${isSystem ? 'system' : ''}`}
            role="article"
            aria-label={`${isUser ? 'You' : 'AI Assistant'} said: ${message.content}`}
        >
            {!isUser && (
                <div className="chatbot-avatar">
                    <Bot className="w-5 h-5 text-teal-600" />
                </div>
            )}

            <div className="flex flex-col gap-1">
                <div className="message-content">
                    {!isUser && message.sentiment && (
                        <span className="sentiment-indicator" aria-label={`Mood: ${message.sentiment.label}`}>
                            {getSentimentEmoji()}
                        </span>
                    )}
                    <span>{message.content}</span>
                </div>
                <div className="message-timestamp">
                    {formatTime(message.timestamp)}
                </div>
            </div>

            {isUser && (
                <div className="chatbot-avatar">
                    <User className="w-5 h-5 text-blue-600" />
                </div>
            )}
        </div>
    );
};
