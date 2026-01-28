import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Eye, FileText, Download } from 'lucide-react';
import { mockPatients, mockAppointments } from '../../utils/mockData';
import { useToast } from '../../contexts/ToastContext';
import { PatientDocumentsModal } from '../../components/doctor/PatientDocumentsModal';
import { downloadLatestDocument } from '../../services/patientDocumentsService';

export const DoctorPatients: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [selectedPatientName, setSelectedPatientName] = useState<string>('');
    const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState<string | null>(null);
    const { showToast } = useToast();

    // Get doctor's patients (simplified - in real app would filter by doctor ID)
    const myPatients = mockPatients.slice(0, 10);

    const filteredPatients = myPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPatientStats = (patientId: string) => {
        const appointments = mockAppointments.filter(apt => apt.patientId === patientId);
        return {
            total: appointments.length,
            lastVisit: appointments.length > 0 ? appointments[appointments.length - 1].dateTime : null,
        };
    };

    /**
     * Handle viewing patient documents
     */
    const handleViewDocuments = (patient: any) => {
        setSelectedPatientId(patient.email); // Using email as patient ID
        setSelectedPatientName(patient.name);
        setIsDocumentsModalOpen(true);
    };

    /**
     * Handle quick download of latest document
     */
    const handleQuickDownload = async (patient: any) => {
        setIsDownloading(patient.email);
        try {
            const downloaded = await downloadLatestDocument(patient.email, 'current-doctor-id');
            if (downloaded) {
                showToast('Download started successfully', 'success');
            } else {
                showToast('No documents available for this patient', 'info');
            }
        } catch (error) {
            showToast('Download failed. Please try again.', 'error');
        } finally {
            setIsDownloading(null);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Patients</h1>
                    <p className="text-gray-600">View and manage your patient records</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-3xl font-bold text-gray-900">{myPatients.length}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Seen This Week</p>
                        <p className="text-3xl font-bold text-green-600">28</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Follow-ups Due</p>
                        <p className="text-3xl font-bold text-yellow-600">12</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Critical Cases</p>
                        <p className="text-3xl font-bold text-red-600">3</p>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search patients by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </Card>

                {/* Patients List */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredPatients.map((patient) => {
                        const stats = getPatientStats(patient.id);
                        return (
                            <Card key={patient.id} hover>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
                                            {patient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <span>{patient.email}</span>
                                                <span>•</span>
                                                <span>{patient.phone}</span>
                                                <span>•</span>
                                                <span>{(patient as any).age || 'N/A'} years</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Total Visits</p>
                                            <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Last Visit</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {stats.lastVisit ? stats.lastVisit.toLocaleDateString() : 'Never'}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDocuments(patient)}
                                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="View Patient Documents"
                                                aria-label={`View documents for ${patient.name}`}
                                            >
                                                <Eye className="w-5 h-5 text-blue-600" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                                                title="View Medical History"
                                                aria-label={`View history for ${patient.name}`}
                                            >
                                                <FileText className="w-5 h-5 text-purple-600" />
                                            </button>
                                            <button
                                                onClick={() => handleQuickDownload(patient)}
                                                disabled={isDownloading === patient.email}
                                                className="p-2 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Download Latest Document"
                                                aria-label={`Download latest document for ${patient.name}`}
                                            >
                                                {isDownloading === patient.email ? (
                                                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Download className="w-5 h-5 text-green-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Patient Details */}
                                {(patient as any).chronicConditions && (patient as any).chronicConditions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">Chronic Conditions:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {(patient as any).chronicConditions.map((condition: string, idx: number) => (
                                                    <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                                        {condition}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Patient Documents Modal */}
            <PatientDocumentsModal
                isOpen={isDocumentsModalOpen}
                onClose={() => {
                    setIsDocumentsModalOpen(false);
                    setSelectedPatientId(null);
                    setSelectedPatientName('');
                }}
                patientId={selectedPatientId}
                patientName={selectedPatientName}
            />
        </Layout>
    );
};
