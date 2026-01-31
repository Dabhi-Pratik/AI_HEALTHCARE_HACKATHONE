import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Send } from 'lucide-react';
import { VoiceInputButton } from './VoiceInputButton';
import { useChatbot } from '../../contexts/ChatbotContext';

const MAX_CHARS = 500;

export const ChatInput: React.FC = () => {
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { sendMessage } = useChatbot();

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setInput(value);

            // Auto-resize textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isSending) return;

        const messageToSend = input.trim();
        setInput('');
        setIsSending(true);

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        try {
            await sendMessage(messageToSend);
        } finally {
            setIsSending(false);
            textareaRef.current?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleVoiceTranscript = (transcript: string) => {
        setInput(transcript);
        // Auto-send voice input
        setTimeout(() => {
            sendMessage(transcript);
        }, 100);
    };

    const charCount = input.length;
    const isNearLimit = charCount > MAX_CHARS * 0.9;

    return (
        <div className="chatbot-input-area">
            <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    className="chatbot-input"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={1}
                    disabled={isSending}
                    aria-label="Chat message input"
                    aria-describedby="char-counter"
                />

                {charCount > 0 && (
                    <div
                        id="char-counter"
                        className={`absolute bottom-2 right-3 text-xs ${isNearLimit ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                            }`}
                        aria-live="polite"
                    >
                        {charCount}/{MAX_CHARS}
                    </div>
                )}
            </div>

            <div className="relative">
                <VoiceInputButton
                    onTranscript={handleVoiceTranscript}
                    disabled={isSending}
                />
            </div>

            <button
                type="button"
                className="chatbot-input-button"
                onClick={handleSend}
                disabled={!input.trim() || isSending}
                aria-label="Send message"
                title="Send (Enter)"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    );
};
