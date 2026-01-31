import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../types/chatbot';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
    messages: ChatMessage[];
    isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Group messages by date
    const groupMessagesByDate = (messages: ChatMessage[]) => {
        const groups: { [key: string]: ChatMessage[] } = {};

        messages.forEach((message) => {
            const date = new Date(message.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate(messages);
    const today = new Date().toDateString();

    const formatDateHeader = (dateString: string) => {
        if (dateString === today) return 'Today';

        const date = new Date(dateString);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateString === yesterday.toDateString()) return 'Yesterday';

        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div
            ref={containerRef}
            className="chatbot-messages"
            role="log"
            aria-live="polite"
            aria-label="Chat conversation"
        >
            {Object.entries(messageGroups).map(([date, groupMessages]) => (
                <div key={date}>
                    {/* Date separator */}
                    <div className="flex items-center justify-center my-4">
                        <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                            {formatDateHeader(date)}
                        </div>
                    </div>

                    {/* Messages for this date */}
                    {groupMessages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                </div>
            ))}

            {isTyping && <TypingIndicator />}

            {/* Empty state */}
            {messages.length === 0 && !isTyping && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                        <span className="text-3xl">🤖</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Welcome to AI Health Assistant!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        How can I help you today? Try asking about appointments, symptoms, or queue status.
                    </p>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};
