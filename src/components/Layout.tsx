import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Heart,
    LayoutDashboard,
    Calendar,
    FileText,
    User,
    LogOut,
    Menu,
    X,
    Bell,
    MessageSquare,
    Users,
    UserCheck,
    Activity,
    Smartphone,
    Settings,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { EmergencyButton } from './EmergencyButton';
import { ChatbotButton } from './ChatbotButton';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) return null;

    const patientNavItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/patient/dashboard' },
        { icon: <MessageSquare className="w-5 h-5" />, label: 'AI Symptom Checker', path: '/patient/symptom-checker' },
        { icon: <Calendar className="w-5 h-5" />, label: 'Book Appointment', path: '/patient/book-appointment' },
        { icon: <Calendar className="w-5 h-5" />, label: 'My Appointments', path: '/patient/appointments' },
        { icon: <FileText className="w-5 h-5" />, label: 'Medical Records', path: '/patient/records' },
        { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/patient/profile' },
    ];

    const adminNavItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Patient Management', path: '/admin/patients' },
        { icon: <UserCheck className="w-5 h-5" />, label: 'Doctor Management', path: '/admin/doctors' },
        { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', path: '/admin/appointments' },
        { icon: <Activity className="w-5 h-5" />, label: 'AI Analytics', path: '/admin/ai-analytics' },
        { icon: <Smartphone className="w-5 h-5" />, label: 'Channel Monitoring', path: '/admin/channels' },
        { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/admin/notifications' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
    ];

    const doctorNavItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'My Patients', path: '/doctor/patients' },
        { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', path: '/doctor/appointments' },
        { icon: <Activity className="w-5 h-5" />, label: 'Analytics', path: '/doctor/analytics' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/doctor/settings' },
    ];

    const navItems = user.role === 'patient' ? patientNavItems :
        user.role === 'admin' ? adminNavItems :
            user.role === 'doctor' ? doctorNavItems : [];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <div className="flex items-center gap-2">
                            <Heart className="w-7 h-7 text-primary-500" />
                            <h1 className="text-xl font-bold text-gray-900">HealthCare+</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`
            fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-white border-r border-gray-200 z-20
            transition-transform duration-300 ease-in-out w-64
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
                >
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setSidebarOpen(false);
                                    }}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                                            ? 'bg-primary-500 text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 mt-4"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>

            {/* Emergency Button */}
            <EmergencyButton />

            {/* AI Chatbot Button */}
            <ChatbotButton />

            {/* Backdrop for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};
