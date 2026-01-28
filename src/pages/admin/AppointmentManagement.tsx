import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { mockAppointments } from '../../utils/mockData';
import { format } from 'date-fns';

export const AppointmentManagement: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');

    const appointments = mockAppointments;
    const filteredAppointments = selectedStatus === 'all'
        ? appointments
        : appointments.filter(apt => apt.status === selectedStatus);

    const stats = {
        total: appointments.length,
        scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
        completed: appointments.filter(apt => apt.status === 'completed').length,
        cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Management</h1>
                    <p className="text-gray-600">Manage all appointments and queues</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Appointments</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Scheduled</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">{stats.scheduled}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Cancelled</p>
                        <p className="text-3xl font-bold text-red-600 mt-1">{stats.cancelled}</p>
                    </Card>
                </div>

                {/* Filter */}
                <Card>
                    <div className="flex gap-2">
                        {(['all', 'scheduled', 'completed', 'cancelled'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded-lg capitalize ${selectedStatus === status
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Appointments List */}
                <div className="space-y-3">
                    {filteredAppointments.map((apt) => (
                        <Card key={apt.id} hover>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${apt.status === 'completed' ? 'bg-green-100' :
                                        apt.status === 'scheduled' ? 'bg-blue-100' :
                                            'bg-red-100'
                                        }`}>
                                        {apt.status === 'completed' ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                                            apt.status === 'scheduled' ? <CalendarIcon className="w-6 h-6 text-blue-600" /> :
                                                <XCircle className="w-6 h-6 text-red-600" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{apt.patientName}</h3>
                                        <p className="text-sm text-gray-600">with {apt.doctorName}</p>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <span>{format(apt.dateTime, 'MMM d, yyyy')}</span>
                                            <span>{format(apt.dateTime, 'h:mm a')}</span>
                                            <span className="capitalize">{apt.department}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                        apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {apt.status}
                                    </span>
                                    {apt.queuePosition && (
                                        <span className="text-sm text-gray-600">
                                            Queue: #{apt.queuePosition}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
