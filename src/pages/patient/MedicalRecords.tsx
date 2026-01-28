// Medical Records Page - Fully Functional Production-Ready Component
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Download, Eye, Filter as FilterIcon } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { UploadModal } from '../../components/medical-records/UploadModal';
import { PreviewModal } from '../../components/medical-records/PreviewModal';
import {
    fetchMedicalRecords,
    uploadMedicalRecord,
    downloadMedicalRecord,
    filterRecordsByType,
} from '../../services/medicalRecordsService';
import type { MedicalRecord, UploadFormData } from '../../types/medicalRecords';
import { format } from 'date-fns';

export const MedicalRecords: React.FC = () => {
    const { user } = useAuth();
    const { showToast } = useToast();

    // State Management
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

    // Fetch records on mount
    useEffect(() => {
        loadRecords();
    }, [user]);

    // Update filtered records when filter or records change
    useEffect(() => {
        const filtered = filterRecordsByType(records, selectedFilter);
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setFilteredRecords(filtered);
    }, [records, selectedFilter]);

    /**
     * Load all medical records for the current patient
     */
    const loadRecords = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            const data = await fetchMedicalRecords(user.id);
            setRecords(data);
        } catch (error) {
            showToast('Failed to load records. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle file upload from modal
     */
    const handleUpload = async (formData: UploadFormData) => {
        if (!user || !formData.file) return;

        try {
            const newRecord = await uploadMedicalRecord(
                formData.file,
                {
                    type: formData.type,
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                },
                user.id
            );

            // Add new record to state
            setRecords(prev => [newRecord, ...prev]);

            showToast('Record uploaded successfully!', 'success');
        } catch (error) {
            showToast('Upload failed. Please try again.', 'error');
            throw error; // Re-throw to let modal handle it
        }
    };

    /**
     * Handle view/preview button click
     */
    const handleView = (record: MedicalRecord) => {
        setSelectedRecord(record);
        setIsPreviewModalOpen(true);
    };

    /**
     * Handle download button click
     */
    const handleDownload = (record: MedicalRecord) => {
        try {
            downloadMedicalRecord(record);
            showToast('Download started', 'success');
        } catch (error) {
            showToast('Download failed. Please try again.', 'error');
        }
    };

    /**
     * Handle filter change
     */
    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
    };

    /**
     * Get icon background color based on record type
     */
    const getRecordIconColor = (type: string): string => {
        const colors: Record<string, string> = {
            prescription: 'bg-blue-100 text-blue-600',
            'lab-report': 'bg-green-100 text-green-600',
            scan: 'bg-purple-100 text-purple-600',
            'x-ray': 'bg-orange-100 text-orange-600',
            other: 'bg-gray-100 text-gray-600',
        };
        return colors[type] || colors.other;
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Medical Records
                        </h1>
                        <p className="text-gray-600">
                            Securely store and access your health documents
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => setIsUploadModalOpen(true)}
                        aria-label="Upload new medical record"
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload
                    </Button>
                </div>

                {/* Stats Card */}
                <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Records</p>
                            <p className="text-3xl font-bold text-gray-900">{records.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Latest Upload</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {records.length > 0
                                    ? format(new Date(records[0].uploadedAt), 'MMM d, yyyy')
                                    : 'No records'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {(records.reduce((sum, rec) => sum + rec.fileSize, 0) / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Filter */}
                <Card>
                    <div className="flex items-center gap-3">
                        <FilterIcon className="w-5 h-5 text-gray-600" />
                        <label htmlFor="record-filter" className="text-sm font-medium text-gray-700">
                            Filter by type:
                        </label>
                        <select
                            id="record-filter"
                            value={selectedFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            aria-label="Filter medical records by type"
                        >
                            <option value="all">All Records ({records.length})</option>
                            <option value="prescription">
                                Prescriptions ({records.filter(r => r.type === 'prescription').length})
                            </option>
                            <option value="lab-report">
                                Lab Reports ({records.filter(r => r.type === 'lab-report').length})
                            </option>
                            <option value="scan">
                                Scans ({records.filter(r => r.type === 'scan').length})
                            </option>
                            <option value="x-ray">
                                X-Rays ({records.filter(r => r.type === 'x-ray').length})
                            </option>
                            <option value="other">
                                Other ({records.filter(r => r.type === 'other').length})
                            </option>
                        </select>
                    </div>
                </Card>

                {/* Loading State */}
                {isLoading && (
                    <Card className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Loading your records...</p>
                    </Card>
                )}

                {/* Empty State */}
                {!isLoading && filteredRecords.length === 0 && (
                    <Card className="text-center py-16">
                        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {selectedFilter === 'all' ? 'No records found' : `No ${selectedFilter.replace('-', ' ')}s found`}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {selectedFilter === 'all'
                                ? 'Upload your first medical document to get started'
                                : 'Try selecting a different filter or upload a new record'}
                        </p>
                        {selectedFilter === 'all' && (
                            <Button
                                variant="primary"
                                onClick={() => setIsUploadModalOpen(true)}
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                Upload Your First Record
                            </Button>
                        )}
                    </Card>
                )}

                {/* Records List */}
                {!isLoading && filteredRecords.length > 0 && (
                    <div className="space-y-3">
                        {filteredRecords.map(record => (
                            <Card
                                key={record.id}
                                hover
                                className="flex items-center justify-between gap-4 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${getRecordIconColor(record.type)}`}>
                                        <FileText className="w-7 h-7" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">
                                            {record.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                            <span className="capitalize">{record.type.replace('-', ' ')}</span>
                                            <span>•</span>
                                            <span>{format(new Date(record.uploadedAt), 'MMM d, yyyy')}</span>
                                            <span>•</span>
                                            <span>{(record.fileSize / 1024).toFixed(1)} KB</span>
                                        </div>
                                        {record.description && (
                                            <p className="text-sm text-gray-500 mt-1 truncate">
                                                {record.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleView(record)}
                                        aria-label={`View ${record.title}`}
                                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDownload(record)}
                                        aria-label={`Download ${record.title}`}
                                        className="hover:bg-green-50 hover:text-green-600 transition-colors"
                                    >
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Helpful Info */}
                <Card className="bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                                Keep Your Records Organized
                            </h4>
                            <p className="text-sm text-gray-700">
                                Upload prescriptions, lab reports, scans, and other medical documents.
                                All files are securely stored and accessible anytime.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleUpload}
            />

            {/* Preview Modal */}
            <PreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => {
                    setIsPreviewModalOpen(false);
                    setSelectedRecord(null);
                }}
                record={selectedRecord}
                onDownload={() => selectedRecord && handleDownload(selectedRecord)}
            />
        </Layout>
    );
};
