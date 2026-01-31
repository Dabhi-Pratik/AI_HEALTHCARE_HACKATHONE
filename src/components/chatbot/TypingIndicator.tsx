import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="typing-indicator" role="status" aria-live="polite" aria-label="AI Assistant is typing">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">🤖</span>
            </div>
            <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
            </div>
            <span className="sr-only">AI Assistant is typing...</span>
        </div>
    );
};
