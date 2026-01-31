import React, { useEffect } from 'react';
import { X, RefreshCw, MessageCircle, Sparkles } from 'lucide-react';
import { useChatbot } from '../../contexts/ChatbotContext';
import { MessageList } from './MessageList';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';
import { ZoomControls } from './ZoomControls';
import '../../styles/chatbot.css';

export const ChatWidget: React.FC = () => {
    const {
        isOpen,
        messages,
        isTyping,
        openChat,
        closeChat,
        clearChat,
        preferences
    } = useChatbot();

    const { zoomLevel, darkMode } = preferences;

    // Apply zoom level
    const zoomScale = zoomLevel / 100;
    const fontSize = 14 * zoomScale;

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Escape to close
            if (e.key === 'Escape' && isOpen) {
                closeChat();
            }

            // Ctrl/Cmd + Plus to zoom in
            if ((e.ctrlKey || e.metaKey) && e.key === '=') {
                e.preventDefault();
                // Zoom handled by ZoomControls
            }

            // Ctrl/Cmd + Minus to zoom out
            if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                e.preventDefault();
                // Zoom handled by ZoomControls
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeChat, zoomLevel]);

    // Apply dark mode to root
    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [darkMode]);

    return (
        <div className="chatbot-container">
            {/* Zoom Controls */}
            {isOpen && <ZoomControls />}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`chatbot-window ${isOpen ? 'opening' : 'closing'}`}
                    style={{
                        transform: `scale(${zoomScale})`,
                        fontSize: `${fontSize}px`,
                        transformOrigin: 'bottom right'
                    }}
                    role="dialog"
                    aria-label="AI Health Assistant Chat"
                    aria-modal="true"
                >
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-content">
                            <div className="chatbot-avatar">
                                <Sparkles className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                                <h2 className="chatbot-title">AI Health Assistant</h2>
                                <div className="chatbot-status">
                                    <span className="status-dot"></span>
                                    <span>Online</span>
                                </div>
                            </div>
                        </div>

                        <div className="chatbot-header-actions">
                            <button
                                className="chatbot-header-button"
                                onClick={clearChat}
                                aria-label="Start new conversation"
                                title="New Conversation"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                className="chatbot-header-button"
                                onClick={closeChat}
                                aria-label="Close chat"
                                title="Close (Esc)"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <MessageList messages={messages} isTyping={isTyping} />

                    {/* Quick Actions */}
                    {messages.length <= 1 && <QuickActions />}

                    {/* Input */}
                    <ChatInput />
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    className="chatbot-float-button"
                    onClick={openChat}
                    aria-label="Open AI Health Assistant Chat"
                    title="Chat with AI Health Assistant"
                >
                    <MessageCircle className="w-7 h-7" />
                </button>
            )}
        </div>
    );
};
