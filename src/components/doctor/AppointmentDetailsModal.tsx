/**
 * AppointmentDetailsModal Component
 * Displays comprehensive appointment and patient information in a modal
 * Features: Patient vitals, medical history, allergies, symptoms
 * Supports ESC key and click-outside to close
 */

import React, { useEffect } from 'react';
import { X, User, Calendar, Clock, AlertCircle, Activity, Thermometer, Heart, Droplet } from 'lucide-react';
import { format } from 'date-fns';
import type { Appointment } from '../../types';

interface PatientDetails {
    name: string;
    age: number | string;
    gender: string;
    bloodGroup: string;
    allergies: string[];
    chronicConditions: string[];
    vitals: {
        bp: string;
        pulse: number | string;
        temp: number | string;
        spo2: number | string;
    };
    previousVisits: number;
}

interface AppointmentDetailsModalProps {
    appointment: Appointment;
    patientDetails: PatientDetails;
    onClose: () => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
    appointment,
    patientDetails,
    onClose,
}) => {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'in-progress': return 'bg-blue-100 text-blue-700';
            case 'scheduled': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'emergency': return 'bg-red-100 text-red-700 border-red-300';
            case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-300';
            default: return 'bg-blue-100 text-blue-700 border-blue-300';
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                        <p className="text-sm text-gray-600 mt-1">Complete patient and appointment information</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Patient Information */}
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {appointment.patientName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">{patientDetails.name}</h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                    <span>{patientDetails.age} years</span>
                                    <span>•</span>
                                    <span>{patientDetails.gender}</span>
                                    <span>•</span>
                                    <span className="font-medium text-red-600">{patientDetails.bloodGroup}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status.toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {/* Previous Visits */}
                        <div className="bg-white rounded-lg px-4 py-2 inline-block">
                            <span className="text-sm text-gray-600">Previous Visits: </span>
                            <span className="text-sm font-bold text-primary-600">{patientDetails.previousVisits}</span>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-primary-600" />
                                <span className="font-semibold text-gray-900">Date & Time</span>
                            </div>
                            <p className="text-gray-700">{format(appointment.dateTime, 'EEEE, MMMM d, yyyy')}</p>
                            <p className="text-lg font-bold text-primary-600">{format(appointment.dateTime, 'h:mm a')}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-primary-600" />
                                <span className="font-semibold text-gray-900">Duration</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{appointment.duration}</p>
                            <p className="text-sm text-gray-600">minutes</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <User className="w-5 h-5 text-primary-600" />
                                <span className="font-semibold text-gray-900">Queue Position</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">#{appointment.queuePosition || 'N/A'}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-5 h-5 text-primary-600" />
                                <span className="font-semibold text-gray-900">Priority</span>
                            </div>
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(appointment.priority)}`}>
                                {appointment.priority === 'emergency' && '🚨 '}
                                {appointment.priority.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Symptoms */}
                    <div className="border-l-4 border-primary-500 bg-primary-50 rounded-r-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Chief Complaints / Symptoms</h4>
                        <p className="text-gray-700">{appointment.symptoms || 'No symptoms recorded'}</p>
                    </div>

                    {/* Vitals */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary-600" />
                            Vital Signs
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Heart className="w-4 h-4 text-red-600" />
                                    <span className="text-xs text-red-700 font-medium">Blood Pressure</span>
                                </div>
                                <p className="text-lg font-bold text-red-900">{patientDetails.vitals.bp}</p>
                                <p className="text-xs text-red-600">mmHg</p>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 border border-pink-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="w-4 h-4 text-pink-600" />
                                    <span className="text-xs text-pink-700 font-medium">Pulse Rate</span>
                                </div>
                                <p className="text-lg font-bold text-pink-900">{patientDetails.vitals.pulse}</p>
                                <p className="text-xs text-pink-600">bpm</p>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Thermometer className="w-4 h-4 text-orange-600" />
                                    <span className="text-xs text-orange-700 font-medium">Temperature</span>
                                </div>
                                <p className="text-lg font-bold text-orange-900">{patientDetails.vitals.temp}</p>
                                <p className="text-xs text-orange-600">°F</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Droplet className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-blue-700 font-medium">SpO2</span>
                                </div>
                                <p className="text-lg font-bold text-blue-900">{patientDetails.vitals.spo2}</p>
                                <p className="text-xs text-blue-600">%</p>
                            </div>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Allergies</h4>
                            {patientDetails.allergies.length > 0 ? (
                                <div className="space-y-2">
                                    {patientDetails.allergies.map((allergy, index) => (
                                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                            <span className="text-sm text-red-700 font-medium">⚠️ {allergy}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">No known allergies</p>
                            )}
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Chronic Conditions</h4>
                            {patientDetails.chronicConditions.length > 0 ? (
                                <div className="space-y-2">
                                    {patientDetails.chronicConditions.map((condition, index) => (
                                        <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                                            <span className="text-sm text-yellow-700 font-medium">{condition}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">No chronic conditions</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
