import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
    Calendar,
    Users,
    Clock,
    AlertTriangle,
    Activity,
    PhoneCall,
    Pause,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    User,
} from 'lucide-react';
import { doctorStats, todayQueue, doctorNotifications, patientDetails } from '../../utils/mockDoctorData';
import { format } from 'date-fns';

export const DoctorDashboard: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [showTriageModal, setShowTriageModal] = useState(false);
    const [queue, setQueue] = useState(todayQueue);

    const handleCallPatient = (patientId: string) => {
        setSelectedPatient(patientId);
        setShowTriageModal(true);
    };

    const handleCompleteVisit = (queueId: string) => {
        setQueue(queue.map(p => p.id === queueId ? { ...p, status: 'completed' as const } : p));
        setShowTriageModal(false);
    };

    const handleDelayPatient = (queueId: string, minutes: number) => {
        setQueue(queue.map(p => p.id === queueId ? { ...p, waitingTime: p.waitingTime + minutes } : p));
    };

    const currentPatient = selectedPatient ? queue.find(p => p.patientId === selectedPatient) : null;
    const patientInfo = selectedPatient ? patientDetails[selectedPatient] : null;
    const unreadNotifications = doctorNotifications.filter(n => !n.isRead);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return '🔴';
            case 'medium': return '🟡';
            case 'low': return '🟢';
            default: return '⚪';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
                    <p className="text-gray-600">Manage your patients and appointments efficiently</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Today's Appointments</p>
                                <p className="text-2xl font-bold text-gray-900">{doctorStats.todayAppointments}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Patients Waiting</p>
                                <p className="text-2xl font-bold text-purple-600">{doctorStats.patientsWaiting}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Consult Time</p>
                                <p className="text-2xl font-bold text-green-600">{doctorStats.avgConsultationTime} min</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">No-Show Risk</p>
                                <p className="text-2xl font-bold text-yellow-600">{doctorStats.noShowPrediction}%</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <Activity className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Emergency Cases</p>
                                <p className="text-2xl font-bold text-red-600">{doctorStats.emergencyPatients}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content - Queue and Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Live Patient Queue */}
                    <div className="lg:col-span-2">
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary-600" />
                                    Live Patient Queue
                                </h3>
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                    {queue.filter(p => p.status === 'waiting').length} Waiting
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Queue</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Patient</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Symptoms</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Priority</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Waiting</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {queue.filter(p => p.status === 'waiting').map((patient) => (
                                            <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <span className="font-bold text-gray-900 text-lg">#{patient.queueNumber}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                                                            {patient.patientName.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{patient.patientName}</p>
                                                            {patient.noShowRisk > 50 && (
                                                                <p className="text-xs text-red-600">⚠️ High no-show risk</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="text-sm text-gray-700 max-w-xs truncate">{patient.symptoms}</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.aiPriority)}`}>
                                                        {getPriorityIcon(patient.aiPriority)} {patient.aiPriority.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="text-sm font-medium text-gray-900">{patient.waitingTime} min</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleCallPatient(patient.patientId)}
                                                            className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                                                            title="Call Patient"
                                                        >
                                                            <PhoneCall className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelayPatient(patient.id, 10)}
                                                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                                            title="Delay 10 min"
                                                        >
                                                            <Pause className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Notifications & Alerts */}
                    <div>
                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                    Alerts
                                </h3>
                                {unreadNotifications.length > 0 && (
                                    <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                                        {unreadNotifications.length} New
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {doctorNotifications.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`p-3 rounded-lg border-l-4 ${alert.type === 'error' ? 'border-red-500 bg-red-50' :
                                            alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                                                alert.type === 'success' ? 'border-green-500 bg-green-50' :
                                                    'border-blue-500 bg-blue-50'
                                            } ${!alert.isRead ? 'ring-2 ring-gray-200' : ''}`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 text-sm">{alert.title}</h4>
                                                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {format(alert.timestamp, 'h:mm a')}
                                                </p>
                                            </div>
                                            {!alert.isRead && (
                                                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-800 mb-1">Completed Today</p>
                                <p className="text-3xl font-bold text-blue-900">{doctorStats.completedToday}</p>
                            </div>
                            <CheckCircle className="w-12 h-12 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-800 mb-1">Total Patients</p>
                                <p className="text-3xl font-bold text-green-900">{doctorStats.totalPatients}</p>
                            </div>
                            <User className="w-12 h-12 text-green-600" />
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-yellow-800 mb-1">Your Rating</p>
                                <p className="text-3xl font-bold text-yellow-900">{doctorStats.avgRating}/5</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-yellow-600" />
                        </div>
                    </Card>
                </div>

                {/* AI Triage Modal */}
                <Modal
                    isOpen={showTriageModal}
                    onClose={() => setShowTriageModal(false)}
                    title="AI Triage Summary"
                    size="lg"
                >
                    {currentPatient && patientInfo && (
                        <div className="space-y-4">
                            {/* Patient Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">Name:</span>
                                        <span className="ml-2 font-medium">{patientInfo.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Age:</span>
                                        <span className="ml-2 font-medium">{patientInfo.age} years</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Gender:</span>
                                        <span className="ml-2 font-medium">{patientInfo.gender}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Blood Group:</span>
                                        <span className="ml-2 font-medium">{patientInfo.bloodGroup}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Symptoms */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Symptoms</h4>
                                <p className="text-gray-700">{currentPatient.symptoms}</p>
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                    🤖 AI Analysis
                                </h4>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-purple-800">Severity:</span>
                                        <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${currentPatient.aiSeverity === 'critical' ? 'bg-red-200 text-red-800' :
                                            currentPatient.aiSeverity === 'severe' ? 'bg-orange-200 text-orange-800' :
                                                currentPatient.aiSeverity === 'moderate' ? 'bg-yellow-200 text-yellow-800' :
                                                    'bg-green-200 text-green-800'
                                            }`}>
                                            {currentPatient.aiSeverity.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-purple-800">Suggested Diagnosis:</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {currentPatient.suggestedDiagnosis.map((diag, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                                                    {diag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-purple-800">Estimated Duration:</span>
                                        <span className="ml-2 text-purple-700">{currentPatient.estimatedDuration} minutes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vitals */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Vitals</h4>
                                <div className="grid grid-cols-4 gap-3">
                                    <div className="bg-gray-50 p-3 rounded text-center">
                                        <p className="text-xs text-gray-600 mb-1">BP</p>
                                        <p className="font-semibold text-gray-900">{patientInfo.vitals.bp}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded text-center">
                                        <p className="text-xs text-gray-600 mb-1">Pulse</p>
                                        <p className="font-semibold text-gray-900">{patientInfo.vitals.pulse} bpm</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded text-center">
                                        <p className="text-xs text-gray-600 mb-1">Temp</p>
                                        <p className="font-semibold text-gray-900">{patientInfo.vitals.temp}°F</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded text-center">
                                        <p className="text-xs text-gray-600 mb-1">SpO2</p>
                                        <p className="font-semibold text-gray-900">{patientInfo.vitals.spo2}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical History */}
                            {patientInfo.chronicConditions.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Chronic Conditions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {patientInfo.chronicConditions.map((condition: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                                {condition}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    fullWidth
                                    onClick={() => handleCompleteVisit(currentPatient.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Complete Visit
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outline"
                                    onClick={() => setShowTriageModal(false)}
                                >
                                    Close
                                </Button>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-xs text-gray-500 text-center italic">
                                ⚠️ AI suggestions are assistive only. Doctor has final clinical decision.
                            </p>
                        </div>
                    )}
                </Modal>
            </div>
        </Layout>
    );
};
