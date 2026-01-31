import React, { useEffect } from 'react';
import { MessageSquare, Stethoscope, Activity, Brain, Sparkles } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { useChatbot } from '../../contexts/ChatbotContext';

export const SymptomChecker: React.FC = () => {
    const { openChat, isOpen } = useChatbot();

    // Auto-open chatbot when page loads
    useEffect(() => {
        if (!isOpen) {
            // Small delay to ensure smooth transition
            const timer = setTimeout(() => {
                openChat();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [openChat, isOpen]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg mb-4">
                        <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
                    <p className="text-lg text-gray-600">
                        Get instant health insights powered by advanced AI
                    </p>
                </div>

                {/* Info Card */}
                <Card className="p-8 bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-200">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                Chat with Our AI Health Assistant
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our AI Health Assistant is now available as a <strong>floating chatbot</strong> at the bottom-right corner of your screen.
                                Click the chat button to start a conversation anytime, from any page!
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-medium">AI Assistant is online and ready to help</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-teal-500">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                                <Stethoscope className="w-7 h-7 text-teal-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Symptom Analysis</h3>
                            <p className="text-sm text-gray-600">
                                Describe your symptoms and get AI-powered health insights
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-cyan-500">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center">
                                <Activity className="w-7 h-7 text-cyan-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Smart Triage</h3>
                            <p className="text-sm text-gray-600">
                                Get recommendations on urgency level and next steps
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-sky-500">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">
                                <Brain className="w-7 h-7 text-sky-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">24/7 Available</h3>
                            <p className="text-sm text-gray-600">
                                Chat anytime, anywhere - your AI health companion is always ready
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Quick Help */}
                <Card className="p-6 bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-6 h-6 text-amber-600 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">How to Get Started</h3>
                            <ol className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-amber-600">1.</span>
                                    <span>Look for the <strong>floating chat button</strong> at the bottom-right corner</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-amber-600">2.</span>
                                    <span>Click it to open the AI Health Assistant chat window</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-amber-600">3.</span>
                                    <span>Describe your symptoms in natural language</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-amber-600">4.</span>
                                    <span>Get instant AI-powered health insights and recommendations</span>
                                </li>
                            </ol>
                            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
                                <p className="text-xs text-gray-600">
                                    <strong className="text-amber-700">Medical Disclaimer:</strong> This AI assistant provides general health information only.
                                    It is not a substitute for professional medical advice, diagnosis, or treatment.
                                    Always seek the advice of your physician for any medical concerns.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* CTA Button */}
                <div className="text-center pt-4">
                    <button
                        onClick={() => openChat()}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
                    >
                        <MessageSquare className="w-6 h-6" />
                        Open AI Health Assistant
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                        Or click the floating chat button at the bottom-right anytime
                    </p>
                </div>
            </div>
        </Layout>
    );
};
