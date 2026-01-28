// Upload Medical Record Modal Component
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import type { RecordType, UploadFormData } from '../../types/medicalRecords';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (formData: UploadFormData) => Promise<void>;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
    const [formData, setFormData] = useState<UploadFormData>({
        file: null,
        type: 'other',
        title: '',
        date: new Date(),
        description: '',
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    if (!isOpen) return null;

    const handleFileSelect = (file: File) => {
        setError('');

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Please upload PDF, JPG, or PNG files only.');
            return;
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('File size exceeds 10MB limit.');
            return;
        }

        setFormData(prev => ({
            ...prev,
            file,
            title: prev.title || file.name.replace(/\.[^/.]+$/, ''), // Set default title from filename
        }));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.file) {
            setError('Please select a file to upload.');
            return;
        }

        if (!formData.title.trim()) {
            setError('Please enter a title for this record.');
            return;
        }

        setIsUploading(true);

        try {
            await onUpload(formData);

            // Reset form
            setFormData({
                file: null,
                type: 'other',
                title: '',
                date: new Date(),
                description: '',
            });

            onClose();
        } catch (err) {
            setError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="upload-modal-title"
                tabIndex={-1}
            >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 id="upload-modal-title" className="text-2xl font-bold text-gray-900">
                                Upload Medical Record
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Add a new document to your medical records
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* File Upload Area */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Document File *
                            </label>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`
                  border-2 border-dashed rounded-xl p-8 text-center transition-all
                  ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
                  ${formData.file ? 'bg-green-50 border-green-400' : ''}
                `}
                            >
                                {formData.file ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <FileText className="w-8 h-8 text-green-600" />
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">{formData.file.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {(formData.file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                                            className="ml-auto text-red-600 hover:text-red-700"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-700 font-medium mb-1">
                                            Drag and drop your file here
                                        </p>
                                        <p className="text-sm text-gray-500 mb-4">or</p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            Browse Files
                                        </Button>
                                        <p className="text-xs text-gray-500 mt-3">
                                            Supported formats: PDF, JPG, PNG (Max 10MB)
                                        </p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileSelect(file);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="record-title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Record Title *
                            </label>
                            <input
                                id="record-title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="e.g., Blood Test Results January 2026"
                                required
                            />
                        </div>

                        {/* Record Type */}
                        <div>
                            <label htmlFor="record-type" className="block text-sm font-semibold text-gray-700 mb-2">
                                Record Type *
                            </label>
                            <select
                                id="record-type"
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as RecordType }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            >
                                <option value="prescription">Prescription</option>
                                <option value="lab-report">Lab Report</option>
                                <option value="scan">Scan</option>
                                <option value="x-ray">X-Ray</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="record-date" className="block text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Record Date
                            </label>
                            <input
                                id="record-date"
                                type="date"
                                value={formData.date.toISOString().split('T')[0]}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="record-description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                id="record-description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                rows={3}
                                placeholder="Add any notes or details about this record..."
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isUploading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isUploading || !formData.file}
                                className="flex-1"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5 mr-2" />
                                        Upload Record
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
