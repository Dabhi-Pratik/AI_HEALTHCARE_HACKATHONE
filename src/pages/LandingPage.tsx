import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, FileText, Brain, Clock, Shield, Sparkles, Zap, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'AI Symptom Checker',
            description: 'Get instant symptom analysis and doctor recommendations powered by AI',
            gradient: 'from-purple-400 to-pink-500'
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: 'Smart Appointments',
            description: 'Book appointments easily with real-time availability and queue tracking',
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Digital Records',
            description: 'Access all your medical records, prescriptions, and reports in one place',
            gradient: 'from-green-400 to-emerald-500'
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: 'Real-Time Updates',
            description: 'Stay informed with appointment reminders and queue position tracking',
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: '24/7 Emergency Care',
            description: 'Quick access to emergency services with priority scheduling',
            gradient: 'from-red-400 to-pink-500'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Secure & Private',
            description: 'Your health data is protected with industry-standard security',
            gradient: 'from-indigo-400 to-purple-500'
        },
    ];

    const stats = [
        { icon: <Users className="w-6 h-6" />, value: '10,000+', label: 'Happy Patients' },
        { icon: <Zap className="w-6 h-6" />, value: '50,000+', label: 'Appointments' },
        { icon: <Sparkles className="w-6 h-6" />, value: '99.9%', label: 'Uptime' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="relative glass border-b border-white/20 backdrop-blur-md sticky top-0 z-50 animate-slide-up">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 bg-gradient-to-br from-primary-400 to-blue-500 rounded-xl shadow-lg group-hover:shadow-glow transition-all">
                            <Heart className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold gradient-text">HealthCare+</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate('/signin')} className="bg-white text-gray-900">
                            Sign In
                        </Button>
                        <Button variant="primary" onClick={() => navigate('/signup')} className="text-gray-900">
                            Get Started
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center animate-scale-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Healthcare Platform
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                        Your Health,{' '}
                        <span className="gradient-text">Simplified</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Experience modern healthcare with AI-powered symptom checking, smart appointment booking, and comprehensive medical record management.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            size="lg"
                            variant="primary"
                            onClick={() => navigate('/signup')}
                            className="text-lg px-10 py-4 text-gray-900"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/signin')}
                            className="text-lg px-10 py-4"
                        >
                            Sign In
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto mb-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-400 to-blue-500 rounded-xl mb-2 text-white shadow-lg">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Demo Info */}
                    <Card glass className="max-w-2xl mx-auto border-2 border-primary-200">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-primary-500" />
                            <p className="font-semibold text-primary-900">Demo Credentials</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                            <div className="px-3 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                                <strong className="text-blue-900">Patient:</strong>
                                <div className="text-blue-700 mt-1">patient@demo.com</div>
                            </div>
                            <div className="px-3 py-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                                <strong className="text-purple-900">Doctor:</strong>
                                <div className="text-purple-700 mt-1">doctor@demo.com</div>
                            </div>
                            <div className="px-3 py-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                                <strong className="text-green-900">Admin:</strong>
                                <div className="text-green-700 mt-1">admin@demo.com</div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                            Password for all accounts: <strong className="text-primary-700">demo123</strong>
                        </p>
                    </Card>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">
                        Everything You Need for
                        <span className="gradient-text"> Better Healthcare</span>
                    </h3>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive features designed to make your healthcare journey smooth and efficient
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Card hover className="h-full group">
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} text-white rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-br from-primary-400 via-primary-500 to-blue-500 rounded-3xl shadow-2xl p-12 md:p-16 text-center max-w-4xl mx-auto">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h3>
                    <p className="text-xl md:text-2xl text-white mb-4 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of patients who trust us with their healthcare needs
                    </p>
                    <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
                        Experience modern, AI-powered healthcare with smart appointments, digital records, and 24/7 support
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => navigate('/signup')}
                        className="bg-dark text-gray-900 hover:bg-gray-50 px-12 py-4 text-xl font-semibold shadow-xl hover:-translate-y-1 transition-all rounded-xl"
                    >
                        Create Your Account →
                    </Button>
                    <p className="text-sm text-white/80 mt-6">
                        ✓ Free to start • ✓ No credit card required • ✓ Instant access
                    </p>
                </div>
            </section>


            {/* Footer */}
            <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-primary-400 to-blue-500 rounded-xl">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">HealthCare+</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        © 2026 HealthCare+. All rights reserved. | Designed for accessibility and ease of use.
                    </p>
                </div>
            </footer>
        </div>
    );
};
