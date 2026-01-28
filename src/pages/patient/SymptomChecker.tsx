import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User as UserIcon, Loader, AlertCircle, Calendar } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import type { ChatMessage, SymptomAnalysis } from '../../types';
import { getChatbotResponse, analyzeSymptoms } from '../../utils/aiService';
import { mockDoctors } from '../../utils/mockData';

export const SymptomChecker: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI health assistant. I can help you understand your symptoms and recommend suitable doctors. Please describe what you're experiencing.",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Check if message contains medical symptoms
        const hasSymptoms = /pain|ache|fever|cough|dizzy|nausea|vomit|bleed|swell/i.test(input);

        try {
            if (hasSymptoms && input.length > 20) {
                // Get symptom analysis
                const symptomAnalysis = await analyzeSymptoms(input);
                setAnalysis(symptomAnalysis);

                const responseMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: `Based on your symptoms, I've analyzed the following:\n\n**Severity:** ${symptomAnalysis.severity.toUpperCase()}\n**Recommended Department:** ${symptomAnalysis.recommendedDepartment}\n**Possible Conditions:** ${symptomAnalysis.possibleConditions.join(', ')}\n\n${symptomAnalysis.disclaimer}\n\nWould you like to book an appointment with one of our recommended doctors?`,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, responseMessage]);
            } else {
                // Get regular chatbot response
                const response = await getChatbotResponse(input, messages);
                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: response,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const recommendedDoctors = analysis
        ? mockDoctors.filter(doc => analysis.recommendedDoctors.includes(doc.id))
        : [];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-4">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
                    <p className="text-gray-600">
                        Describe your symptoms and get instant AI-powered health recommendations
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                        <strong>Important:</strong> This AI assistant provides general health information only and is not a substitute for professional medical advice. For emergencies, call 911 or use the emergency button.
                    </div>
                </div>

                {/* Chat Interface */}
                <Card className="h-[500px] flex flex-col" noPadding>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    {message.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                                    <div className={`rounded-lg px-4 py-3 ${message.role === 'user'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                        }`}>
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 px-1">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-gray-700" />
                                </div>
                                <div className="bg-gray-100 rounded-lg px-4 py-3">
                                    <Loader className="w-5 h-5 text-gray-600 animate-spin" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe your symptoms in detail..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                                disabled={loading}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className="px-6"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Recommended Doctors */}
                {recommendedDoctors.length > 0 && (
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Doctors</h3>
                        <div className="space-y-3">
                            {recommendedDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-lg">
                                            {doctor.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                                            <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="text-sm text-gray-700">{doctor.rating.toFixed(1)}</span>
                                                <span className="text-sm text-gray-500">• {doctor.experience} years exp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => navigate('/patient/book-appointment', { state: { doctorId: doctor.id } })}
                                    >
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Book
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};
