import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeechBubbleProps {
    message: string;
    isVisible: boolean;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute bottom-full right-0 mb-4 max-w-xs"
                >
                    {/* Speech bubble container */}
                    <div className="relative bg-white rounded-2xl shadow-2xl p-4 border-2 border-primary-200">
                        {/* Message text */}
                        <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                            {message}
                        </p>

                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-primary-200 transform rotate-45" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
