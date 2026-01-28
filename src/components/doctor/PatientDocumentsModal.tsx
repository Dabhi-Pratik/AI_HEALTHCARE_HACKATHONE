// Patient Documents Modal Component for Doctor Dashboard
import React, { useState, useEffect, useRef } from 'react';
import { X, Download, FileText, Calendar, User, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../contexts/ToastContext';
import {
    fetchPatientDocuments,
    downloadPatientDocument,
    getDocumentTypeColor,
    formatFileSize,
    canPreviewFile,
} from '../../services/patientDocumentsService';
import type { PatientDocument } from '../../types/patientDocuments';
import { format } from 'date-fns';

interface PatientDocumentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string | null;
    patientName?: string;
}

export const PatientDocumentsModal: React.FC<PatientDocumentsModalProps> = ({
    isOpen,
    onClose,
    patientId,
    patientName,
}) => {
    const [documents, setDocuments] = useState<PatientDocument[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<PatientDocument | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const modalRef = useRef<HTMLDivElement>(null);
    const { showToast } = useToast();

    // Load documents when modal opens
    useEffect(() => {
        if (isOpen && patientId) {
            loadDocuments();
        } else {
            // Reset state when modal closes
            setDocuments([]);
            setSelectedDocument(null);
            setError('');
        }
    }, [isOpen, patientId]);

    // Handle ESC key and focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);
        modalRef.current?.focus();

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    /**
     * Load patient documents from backend
     */
    const loadDocuments = async () => {
        if (!patientId) return;

        setIsLoading(true);
        setError('');

        try {
            const docs = await fetchPatientDocuments(patientId, 'current-doctor-id');
            setDocuments(docs);

            // Auto-select first document if available
            if (docs.length > 0) {
                setSelectedDocument(docs[0]);
            }
        } catch (err) {
            setError('Failed to load patient documents. Please try again.');
            showToast('Failed to load documents', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle document download
     */
    const handleDownload = (document: PatientDocument) => {
        try {
            downloadPatientDocument(document);
            showToast('Download started successfully', 'success');
        } catch (err) {
            showToast('Download failed. Please try again.', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="documents-modal-title"
                tabIndex={-1}
            >
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 id="documents-modal-title" className="text-2xl font-bold text-gray-900">
                                Patient Documents
                            </h2>
                            {patientName && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Patient: <span className="font-medium">{patientName}</span>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden flex">
                        {/* Documents List (Left Panel) */}
                        <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                All Documents ({documents.length})
                            </h3>

                            {isLoading && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-gray-600">Loading documents...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-800">{error}</p>
                                    </div>
                                </div>
                            )}

                            {!isLoading && !error && documents.length === 0 && (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-600 font-medium mb-1">No documents available</p>
                                    <p className="text-sm text-gray-500">
                                        This patient has no uploaded documents yet.
                                    </p>
                                </div>
                            )}

                            {!isLoading && documents.length > 0 && (
                                <div className="space-y-2">
                                    {documents.map((doc) => (
                                        <button
                                            key={doc.id}
                                            onClick={() => setSelectedDocument(doc)}
                                            className={`
                        w-full text-left p-3 rounded-lg transition-all
                        ${selectedDocument?.id === doc.id
                                                    ? 'bg-primary-100 border-2 border-primary-500'
                                                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                                }
                      `}
                                            aria-label={`View ${doc.fileName}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${getDocumentTypeColor(doc.recordType)}`}>
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 text-sm truncate">
                                                        {doc.fileName}
                                                    </p>
                                                    <p className="text-xs text-gray-600 capitalize mt-0.5">
                                                        {doc.recordType.replace('-', ' ')}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {format(new Date(doc.uploadDate), 'MMM d, yyyy')}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Preview Panel (Right Panel) */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {selectedDocument ? (
                                <div className="space-y-4">
                                    {/* Document Info */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 text-lg mb-3">
                                            {selectedDocument.fileName}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FileText className="w-4 h-4" />
                                                <span className="capitalize">{selectedDocument.recordType.replace('-', ' ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span>{format(new Date(selectedDocument.uploadDate), 'MMM d, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <User className="w-4 h-4" />
                                                <span>{selectedDocument.uploadedBy}</span>
                                            </div>
                                            <div className="text-gray-600">
                                                Size: {formatFileSize(selectedDocument.fileSize)}
                                            </div>
                                        </div>
                                        {selectedDocument.description && (
                                            <p className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-200">
                                                {selectedDocument.description}
                                            </p>
                                        )}
                                        <div className="mt-4">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleDownload(selectedDocument)}
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Document
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                                        {canPreviewFile(selectedDocument.fileType) ? (
                                            <>
                                                {selectedDocument.fileType === 'application/pdf' && (
                                                    <iframe
                                                        src={selectedDocument.fileUrl}
                                                        className="w-full h-[600px]"
                                                        title={`Preview of ${selectedDocument.fileName}`}
                                                    />
                                                )}
                                                {selectedDocument.fileType.startsWith('image/') && (
                                                    <div className="p-8 flex items-center justify-center bg-gray-50">
                                                        <img
                                                            src={selectedDocument.fileUrl}
                                                            alt={selectedDocument.fileName}
                                                            className="max-w-full max-h-[600px] rounded shadow-lg"
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-16">
                                                <FileText className="w-20 h-20 text-gray-300 mb-4" />
                                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                    Preview Not Available
                                                </h4>
                                                <p className="text-gray-600 text-center max-w-md mb-6">
                                                    This file type cannot be previewed in the browser. Please download the file to view it.
                                                </p>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleDownload(selectedDocument)}
                                                >
                                                    <Download className="w-5 h-5 mr-2" />
                                                    Download to View
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                !isLoading && documents.length > 0 && (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <p>Select a document from the list to preview</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
