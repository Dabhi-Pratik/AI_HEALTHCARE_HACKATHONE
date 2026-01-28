import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpeechBubble } from './SpeechBubble';
import type { AvatarState } from './AvatarStates';

interface AIAvatarProps {
    state: AvatarState;
    message?: string;
    onInteraction?: () => void;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({
    state,
    message = '',
    onInteraction
}) => {
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        if (message) {
            setCurrentMessage(message);
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <SpeechBubble message={currentMessage} isVisible={showMessage} />

            <motion.div
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-24 h-24 md:w-28 md:w-28 cursor-pointer"
                onClick={onInteraction}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <circle cx="100" cy="100" r="95" fill="#87CEEB" opacity="0.2" />
                    <circle cx="100" cy="80" r="40" fill="#FFD4A3" />

                    <path
                        d="M 60 70 Q 60 40, 100 35 Q 140 40, 140 70"
                        fill="#E0E0E0"
                    />

                    <circle cx="85" cy="75" r="4" fill="#333" />
                    <circle cx="115" cy="75" r="4" fill="#333" />

                    <path
                        d="M 80 90 Q 100 100, 120 90"
                        stroke="#333"
                        strokeWidth="2"
                        fill="none"
                    />

                    <rect x="70" y="115" width="60" height="70" fill="#FFFFFF" rx="5" />
                    <rect x="70" y="115" width="60" height="10" fill="#87CEEB" />

                    <circle cx="90" cy="140" r="8" fill="#333" opacity="0.3" />
                    <path
                        d="M 90 140 Q 95 150, 100 160"
                        stroke="#333"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.3"
                    />

                    {state === 'thumbsUp' && (
                        <>
                            <rect x="45" y="120" width="15" height="25" fill="#FFD4A3" rx="7" />
                            <rect x="40" y="110" width="8" height="15" fill="#FFD4A3" rx="4" />
                        </>
                    )}

                    {state === 'pointLeft' && (
                        <>
                            <rect x="130" y="90" width="30" height="8" fill="#FFD4A3" rx="4" />
                            <path d="M 160 94 L 170 94 L 168 90 L 170 94 L 168 98 Z" fill="#FFD4A3" />
                        </>
                    )}
                </svg>

                <div className="absolute inset-0 rounded-full bg-primary-400 opacity-20 blur-xl animate-pulse" />
            </motion.div>
        </div>
    );
};
