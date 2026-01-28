import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    MessageSquare,
    FileText,
    Clock,
    Activity,
    TrendingUp,
    ArrowRight,
} from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getAppointments } from '../../utils/localStorage';
import { format, isToday, isFuture } from 'date-fns';

export const PatientDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const appointments = getAppointments().filter(apt => apt.patientId === user?.id);
    const upcomingAppointments = appointments.filter(apt =>
        isFuture(apt.dateTime) || isToday(apt.dateTime)
    ).sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    const nextAppointment = upcomingAppointments[0];

    const quickActions = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: 'AI Symptom Checker',
            description: 'Describe your symptoms and get instant recommendations',
            color: 'bg-blue-500',
            path: '/patient/symptom-checker',
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: 'Book Appointment',
            description: 'Schedule a visit with our specialist doctors',
            color: 'bg-green-500',
            path: '/patient/book-appointment',
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Medical Records',
            description: 'View and manage your health documents',
            color: 'bg-purple-500',
            path: '/patient/records',
        },
    ];

    const healthMetrics = [
        { label: 'Total Appointments', value: appointments.length, icon: <Calendar className="w-5 h-5" />, color: 'text-blue-600' },
        { label: 'Upcoming', value: upcomingAppointments.length, icon: <Clock className="w-5 h-5" />, color: 'text-green-600' },
        { label: 'Health Score', value: '85%', icon: <Activity className="w-5 h-5" />, color: 'text-purple-600' },
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-gray-600">
                        Here's your health dashboard. Let's keep you healthy today.
                    </p>
                </div>

                {/* Health Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {healthMetrics.map((metric, index) => (
                        <Card key={index} className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-gray-100 ${metric.color}`}>
                                {metric.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{metric.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Next Appointment Banner */}
                {nextAppointment && (
                    <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <p className="text-primary-100 text-sm font-medium mb-1">Next Appointment</p>
                                <h3 className="text-2xl font-bold mb-2">{nextAppointment.doctorName}</h3>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{format(nextAppointment.dateTime, 'EEEE, MMMM d, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{format(nextAppointment.dateTime, 'h:mm a')}</span>
                                    </div>
                                </div>
                                {nextAppointment.queuePosition && (
                                    <div className="mt-3 inline-flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                                        <span>Queue Position: {nextAppointment.queuePosition}</span>
                                        <span>•</span>
                                        <span>~{nextAppointment.estimatedWaitTime} min wait</span>
                                    </div>
                                )}
                            </div>
                            <Button
                                variant="secondary"
                                className="bg-white text-black hover:bg-primary-600 hover:text-white hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
                                onClick={() => navigate('/patient/appointments')}
                            >
                                View Details
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickActions.map((action, index) => (
                            <Card
                                key={index}
                                hover
                                className="cursor-pointer group"
                                onClick={() => navigate(action.path)}
                            >
                                <div className={`${action.color} text-white w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                                    {action.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {action.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                                <div className="flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
                                    <span>Get Started</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/patient/appointments')}
                        >
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>

                    {appointments.length === 0 ? (
                        <Card className="text-center py-12">
                            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No appointments yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Book your first appointment to get started with your healthcare journey
                            </p>
                            <Button onClick={() => navigate('/patient/book-appointment')}>
                                Book Appointment
                            </Button>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {appointments.slice(0, 3).map((apt) => (
                                <Card key={apt.id} hover className="cursor-pointer" onClick={() => navigate('/patient/appointments')}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{apt.doctorName}</h3>
                                            <p className="text-sm text-gray-600">{apt.doctorSpecialization}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {format(apt.dateTime, 'MMM d, yyyy • h:mm a')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {apt.status}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Health Tips */}
                <Card className="bg-primary-50 border-primary-200">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary-500 text-white rounded-lg">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">Health Tip of the Day</h3>
                            <p className="text-gray-700">
                                Stay hydrated! Aim for 8 glasses of water daily to keep your body functioning optimally. Regular hydration supports digestion, skin health, and energy levels.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
