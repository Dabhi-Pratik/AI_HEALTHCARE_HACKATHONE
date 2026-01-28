import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { getAppointments, updateAppointment } from '../../utils/localStorage';
import { format } from 'date-fns';

export const MyAppointments: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
    const appointments = getAppointments().filter(apt => apt.patientId === user?.id);

    const upcomingAppointments = appointments.filter(apt =>
        apt.status === 'scheduled' && new Date(apt.dateTime) >= new Date()
    );
    const pastAppointments = appointments.filter(apt =>
        apt.status === 'completed' || (apt.status === 'scheduled' && new Date(apt.dateTime) < new Date())
    );
    const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

    const displayedAppointments =
        activeTab === 'upcoming' ? upcomingAppointments :
            activeTab === 'past' ? pastAppointments :
                cancelledAppointments;

    const handleCancelAppointment = (id: string) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            updateAppointment(id, { status: 'cancelled' });
            window.location.reload();
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
                    <p className="text-gray-600">Manage and track your appointments</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    {(['upcoming', 'past', 'cancelled'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-medium capitalize transition-all duration-200 border-b-2 ${activeTab === tab
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab} ({
                                tab === 'upcoming' ? upcomingAppointments.length :
                                    tab === 'past' ? pastAppointments.length :
                                        cancelledAppointments.length
                            })
                        </button>
                    ))}
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                    {displayedAppointments.length === 0 ? (
                        <Card className="text-center py-12">
                            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No {activeTab} appointments
                            </h3>
                            <p className="text-gray-600">
                                {activeTab === 'upcoming' && 'Book an appointment to get started'}
                                {activeTab === 'past' && 'Your completed appointments will appear here'}
                                {activeTab === 'cancelled' && 'Cancelled appointments will appear here'}
                            </p>
                        </Card>
                    ) : (
                        displayedAppointments.map(apt => (
                            <Card key={apt.id} hover>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-lg">{apt.doctorName}</h3>
                                                <p className="text-sm text-gray-600">{apt.doctorSpecialization}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{format(new Date(apt.dateTime), 'EEEE, MMMM d, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{format(new Date(apt.dateTime), 'h:mm a')}</span>
                                            </div>
                                        </div>

                                        {apt.symptoms && (
                                            <p className="text-sm text-gray-600 mt-2">
                                                <strong>Symptoms:</strong> {apt.symptoms}
                                            </p>
                                        )}

                                        {apt.queuePosition && activeTab === 'upcoming' && (
                                            <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
                                                Queue: #{apt.queuePosition} • Wait: ~{apt.estimatedWaitTime} min
                                            </div>
                                        )}
                                    </div>

                                    {activeTab === 'upcoming' && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleCancelAppointment(apt.id)}
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};
