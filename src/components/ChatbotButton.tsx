import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const ChatbotButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSymptomChecker = () => {
        setIsOpen(false);
        if (user?.role === 'patient') {
            navigate('/patient/symptom-checker');
        } else {
            navigate('/signin');
        }
    };

    return (
        <>
            {/* Professional AI Healthcare Avatar Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-40 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 flex items-center justify-center group chatbot-pulse"
                aria-label="AI Health Assistant"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Professional Avatar Image - Welcome State */}
                <motion.img
                    src="/assets/healthcare_chatbot_wave.png"
                    alt="AI Health Assistant"
                    className="w-20 h-20 object-contain"
                    animate={{
                        y: [0, -5, 0],
                        rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Sparkle effect */}
                <Sparkles className="w-4 h-4 absolute top-1 right-1 text-yellow-300 animate-pulse" />

                {/* Tooltip */}
                <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    AI Health Assistant 🤖
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
            </motion.button>

            {/* Chatbot Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
                <div className="text-center py-6">
                    {/* Professional Avatar in Modal */}
                    <motion.div
                        className="inline-flex items-center justify-center w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6 shadow-xl overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <img
                            src="/assets/healthcare_chatbot_wave.png"
                            alt="AI Health Assistant Robot"
                            className="w-36 h-36 object-contain"
                        />
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-3"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        🤖 AI Health Assistant
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 mb-6"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Get instant AI-powered health recommendations
                    </motion.p>

                    <motion.div
                        className="bg-teal-50 rounded-xl p-6 mb-6 text-left"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-teal-600" />
                            How can I help you?
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Analyze your symptoms with AI</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Get doctor recommendations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>Receive instant health advice</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">✓</span>
                                <span>24/7 available assistance</span>
                            </li>
                        </ul>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={handleSymptomChecker}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Start AI Symptom Checker
                        </Button>
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Close
                        </Button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                        ℹ️ This AI provides general health information only and is not a substitute for professional medical advice.
                    </p>
                </div>
            </Modal>

            <style>{`
        @keyframes chatbot-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(45, 212, 191, 0);
          }
        }

        .chatbot-pulse {
          animation: chatbot-pulse 2.5s infinite;
        }
      `}</style>
        </>
    );
};
