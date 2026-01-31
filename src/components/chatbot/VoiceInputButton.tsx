import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

interface VoiceInputButtonProps {
    onTranscript: (text: string) => void;
    disabled?: boolean;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, disabled }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onstart = () => {
                setIsRecording(true);
                setError(null);
            };

            recognitionInstance.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onTranscript(transcript);
                setIsRecording(false);
            };

            recognitionInstance.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setError('Could not recognize speech. Please try again.');
                setIsRecording(false);
                setIsProcessing(false);
            };

            recognitionInstance.onend = () => {
                setIsRecording(false);
                setIsProcessing(false);
            };

            setRecognition(recognitionInstance);
        }
    }, [onTranscript]);

    const handleVoiceInput = () => {
        if (!recognition) {
            setError('Voice input is not supported in your browser.');
            return;
        }

        if (isRecording) {
            recognition.stop();
        } else {
            try {
                setIsProcessing(true);
                recognition.start();
            } catch (err) {
                console.error('Failed to start recognition:', err);
                setError('Failed to start voice input.');
                setIsProcessing(false);
            }
        }
    };

    const getButtonContent = () => {
        if (isProcessing || isRecording) {
            return <Loader className="w-5 h-5 animate-spin" />;
        }
        return isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />;
    };

    const getAriaLabel = () => {
        if (isRecording) return 'Stop recording';
        if (isProcessing) return 'Processing voice input';
        return 'Start voice input';
    };

    return (
        <>
            <button
                type="button"
                className={`chatbot-input-button ${isRecording ? 'recording' : ''}`}
                onClick={handleVoiceInput}
                disabled={disabled || isProcessing}
                aria-label={getAriaLabel()}
                title="Voice Input"
            >
                {getButtonContent()}
            </button>

            {error && (
                <div className="absolute bottom-full mb-2 right-0 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-xs">
                    {error}
                </div>
            )}
        </>
    );
};
