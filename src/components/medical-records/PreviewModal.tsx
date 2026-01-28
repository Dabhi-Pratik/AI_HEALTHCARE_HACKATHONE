// Preview Medical Record Modal Component
import React, { useRef, useEffect } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import type { MedicalRecord } from '../../types/medicalRecords';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    record: MedicalRecord | null;
    onDownload: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    record,
    onDownload,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus trap and escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Disable background scroll
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);

        // Focus modal on open
        modalRef.current?.focus();

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !record) return null;

    const isPDF = record.fileType === 'application/pdf';
    const isImage = record.fileType.startsWith('image/');
    const canPreview = isPDF || isImage;

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
                aria-labelledby="preview-modal-title"
                tabIndex={-1}
            >
                <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex-1">
                            <h2 id="preview-modal-title" className="text-2xl font-bold text-gray-900">
                                {record.title}
                            </h2>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span className="capitalize">{record.type.replace('-', ' ')}</span>
                                <span>•</span>
                                <span>{new Date(record.uploadedAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{(record.fileSize / 1024).toFixed(1)} KB</span>
                            </div>
                            {record.description && (
                                <p className="text-sm text-gray-600 mt-2">{record.description}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onDownload}
                                aria-label="Download file"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 overflow-auto p-6 bg-gray-50">
                        {canPreview ? (
                            <div className="w-full h-full min-h-[500px] bg-white rounded-lg shadow-inner">
                                {isPDF && (
                                    <iframe
                                        src={record.fileUrl}
                                        className="w-full h-full min-h-[500px] rounded-lg"
                                        title={`Preview of ${record.title}`}
                                    />
                                )}
                                {isImage && (
                                    <div className="flex items-center justify-center p-8">
                                        <img
                                            src={record.fileUrl}
                                            alt={record.title}
                                            className="max-w-full max-h-[600px] rounded-lg shadow-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <FileText className="w-20 h-20 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Preview Not Available
                                </h3>
                                <p className="text-gray-600 mb-6 text-center max-w-md">
                                    This file type cannot be previewed in the browser. Please download the file to view it.
                                </p>
                                <Button variant="primary" onClick={onDownload}>
                                    <Download className="w-5 h-5 mr-2" />
                                    Download File
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>File: {record.fileName}</span>
                            <span>Uploaded by: {record.uploadedBy}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
