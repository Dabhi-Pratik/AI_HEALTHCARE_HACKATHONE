import React from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar as CalendarIcon, CheckCircle, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAppointments } from '../../hooks/useAppointments';
import { AppointmentDetailsModal } from '../../components/doctor/AppointmentDetailsModal';

export const DoctorAppointments: React.FC = () => {
    const {
        appointments,
        selectedAppointment,
        loading,
        actionLoading,
        stats,
        viewDetails,
        closeDetails,
        startAppointment,
        completeAppointment,
    } = useAppointments();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-gray-100 text-gray-700 border-gray-300';
            case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'scheduled': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-5 h-5" />;
            case 'in-progress': return <Clock className="w-5 h-5" />;
            case 'scheduled': return <CalendarIcon className="w-5 h-5" />;
            case 'cancelled': return <XCircle className="w-5 h-5" />;
            default: return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
                    <p className="text-gray-600">Manage your daily appointments and schedule</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Today</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">In Progress</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Scheduled</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.scheduled}</p>
                    </Card>
                </div>

                {/* Calendar View */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                            <span className="ml-3 text-gray-600">Loading appointments...</span>
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>No appointments scheduled for today</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {appointments.map((appointment) => {
                                const isLoading = actionLoading === appointment.id;
                                const isAnyActionLoading = actionLoading !== null;

                                return (
                                    <div
                                        key={appointment.id}
                                        className={`p-4 rounded-lg border-l-4 ${getStatusColor(appointment.status)} transition-all duration-300`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-center">
                                                    {getStatusIcon(appointment.status)}
                                                    <span className="text-xs mt-1">{format(appointment.dateTime, 'h:mm a')}</span>
                                                </div>
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                                                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                                                    <p className="text-sm text-gray-600">{appointment.symptoms || 'Regular checkup'}</p>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                        <span>{appointment.duration} minutes</span>
                                                        {appointment.priority === 'emergency' && (
                                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                                                🚨 Emergency
                                                            </span>
                                                        )}
                                                        {appointment.queuePosition && (
                                                            <span>Queue #{appointment.queuePosition}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {/* View Details Button - Always visible */}
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => viewDetails(appointment.id)}
                                                    disabled={isLoading || isAnyActionLoading}
                                                >
                                                    {isLoading && actionLoading === appointment.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        'View Details'
                                                    )}
                                                </Button>

                                                {/* Start Button - Only for scheduled */}
                                                {appointment.status === 'scheduled' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => startAppointment(appointment.id)}
                                                        disabled={isAnyActionLoading}
                                                        className="relative"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                                Starting...
                                                            </>
                                                        ) : (
                                                            'Start'
                                                        )}
                                                    </Button>
                                                )}

                                                {/* Complete Button - Only for in-progress */}
                                                {appointment.status === 'in-progress' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => completeAppointment(appointment.id)}
                                                        disabled={isAnyActionLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                                Completing...
                                                            </>
                                                        ) : (
                                                            'Complete'
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="text-center py-4">
                            <CalendarIcon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-blue-900">Add Emergency Slot</h4>
                            <p className="text-sm text-blue-700 mt-1">Insert urgent appointment</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="text-center py-4">
                            <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-yellow-900">Add Buffer Time</h4>
                            <p className="text-sm text-yellow-700 mt-1">Extend consultation time</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="text-center py-4">
                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-green-900">Mark Break</h4>
                            <p className="text-sm text-green-700 mt-1">Schedule a break period</p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Appointment Details Modal */}
            {selectedAppointment && (
                <AppointmentDetailsModal
                    appointment={selectedAppointment.appointment}
                    patientDetails={selectedAppointment.patientDetails}
                    onClose={closeDetails}
                />
            )}
        </Layout>
    );
};
