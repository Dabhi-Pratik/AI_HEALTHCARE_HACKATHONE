// Patient Documents Backend Service
// Mock implementation - ready for real API integration

import type { PatientDocument } from '../types/patientDocuments';

const DOCUMENTS_STORAGE_KEY = 'patient_documents_v1';

/**
 * Initialize sample patient documents for demo
 */
const initializeSampleDocuments = (): PatientDocument[] => {
    return [
        // John Doe's Documents (patient@demo.com)
        {
            id: 'doc-001',
            patientId: 'patient@demo.com',
            fileName: 'Hypertension_Prescription_Jan2026.pdf',
            fileType: 'application/pdf',
            recordType: 'prescription',
            uploadDate: new Date('2026-01-20'),
            fileUrl: 'data:application/pdf;base64,sample', // Placeholder
            fileSize: 245000,
            uploadedBy: 'Dr. Sarah Johnson',
            description: 'Monthly prescription for blood pressure medication',
        },
        {
            id: 'doc-002',
            patientId: 'patient@demo.com',
            fileName: 'Blood_Test_Results_Jan2026.pdf',
            fileType: 'application/pdf',
            recordType: 'lab-report',
            uploadDate: new Date('2026-01-15'),
            fileUrl: 'data:application/pdf;base64,sample',
            fileSize: 189000,
            uploadedBy: 'LabCorp',
            description: 'Complete blood count and lipid panel results',
        },
        {
            id: 'doc-003',
            patientId: 'patient@demo.com',
            fileName: 'Chest_Xray_Dec2025.pdf',
            fileType: 'application/pdf',
            recordType: 'x-ray',
            uploadDate: new Date('2025-12-28'),
            fileUrl: 'data:application/pdf;base64,sample',
            fileSize: 1240000,
            uploadedBy: 'Radiology Dept',
            description: 'Routine chest X-ray examination',
        },

        // Sarah Smith's Documents (sarah.smith@demo.com)
        {
            id: 'doc-004',
            patientId: 'sarah.smith@demo.com',
            fileName: 'Diabetes_Prescription_Jan2026.pdf',
            fileType: 'application/pdf',
            recordType: 'prescription',
            uploadDate: new Date('2026-01-18'),
            fileUrl: 'data:application/pdf;base64,sample',
            fileSize: 198000,
            uploadedBy: 'Dr. Emily Chen',
            description: 'Insulin and metformin prescription',
        },
        {
            id: 'doc-005',
            patientId: 'sarah.smith@demo.com',
            fileName: 'MRI_Scan_Jan2026.pdf',
            fileType: 'application/pdf',
            recordType: 'scan',
            uploadDate: new Date('2026-01-10'),
            fileUrl: 'data:application/pdf;base64,sample',
            fileSize: 2150000,
            uploadedBy: 'Imaging Center',
            description: 'Brain MRI scan',
        },

        // Michael Johnson's Documents (michael.johnson@demo.com)
        {
            id: 'doc-006',
            patientId: 'michael.johnson@demo.com',
            fileName: 'Allergy_Test_Results.pdf',
            fileType: 'application/pdf',
            recordType: 'lab-report',
            uploadDate: new Date('2026-01-12'),
            fileUrl: 'data:application/pdf;base64,sample',
            fileSize: 156000,
            uploadedBy: 'Allergy Clinic',
            description: 'Comprehensive allergy panel test',
        },
    ];
};

/**
 * Get all documents from storage or initialize
 */
const getAllDocuments = (): PatientDocument[] => {
    const stored = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (!stored) {
        const initial = initializeSampleDocuments();
        localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(stored).map((doc: any) => ({
        ...doc,
        uploadDate: new Date(doc.uploadDate),
    }));
};

/**
 * Save documents to storage (for future use)
 */
// const saveDocuments = (documents: PatientDocument[]): void => {
//     localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
// };

/**
 * Fetch all medical documents for a specific patient
 * @param patientId - Patient identifier (email in this demo)
 * @param doctorId - Doctor making the request (for authorization)
 * @returns Promise<PatientDocument[]>
 */
export const fetchPatientDocuments = async (
    patientId: string,
    doctorId?: string
): Promise<PatientDocument[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: In production, verify doctor has access to this patient
    if (doctorId) {
        console.log(`[Audit Log] Doctor ${doctorId} accessing documents for patient ${patientId}`);
    }

    const allDocuments = getAllDocuments();
    const patientDocs = allDocuments.filter(doc => doc.patientId === patientId);

    // Sort by upload date (newest first)
    patientDocs.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());

    return patientDocs;
};

/**
 * Get a specific document by ID
 * @param documentId - Document identifier
 * @param doctorId - Doctor making the request
 * @returns Promise<PatientDocument | null>
 */
export const fetchDocument = async (
    documentId: string,
    doctorId?: string
): Promise<PatientDocument | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    if (doctorId) {
        console.log(`[Audit Log] Doctor ${doctorId} viewing document ${documentId}`);
    }

    const allDocuments = getAllDocuments();
    return allDocuments.find(doc => doc.id === documentId) || null;
};

/**
 * Get viewable URL for a document (for PDF/image preview)
 * @param documentId - Document identifier
 * @returns Promise<string>
 */
export const getDocumentViewUrl = async (documentId: string): Promise<string> => {
    const document = await fetchDocument(documentId);
    if (!document) {
        throw new Error('Document not found');
    }

    // In production, this would return a signed URL or proxy URL
    // For now, return the base64 or stored URL
    return document.fileUrl;
};

/**
 * Download a patient document
 * Triggers browser download
 * @param doc - Document to download
 */
export const downloadPatientDocument = (doc: PatientDocument): void => {
    console.log(`[Audit Log] Downloading document ${doc.id}: ${doc.fileName}`);

    try {
        // Create download link
        const link = window.document.createElement('a');
        link.href = doc.fileUrl;
        link.download = doc.fileName;
        link.style.display = 'none';

        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
    } catch (error) {
        console.error('Download failed:', error);
        throw new Error('Failed to download document');
    }
};

/**
 * Download the most recent document for a patient (quick download)
 * @param patientId - Patient identifier
 * @param doctorId - Doctor making the request
 * @returns Promise<PatientDocument | null>
 */
export const downloadLatestDocument = async (
    patientId: string,
    doctorId?: string
): Promise<PatientDocument | null> => {
    const documents = await fetchPatientDocuments(patientId, doctorId);

    if (documents.length === 0) {
        return null;
    }

    const latestDoc = documents[0]; // Already sorted by date
    downloadPatientDocument(latestDoc);

    return latestDoc;
};

/**
 * Get document type icon color
 * @param recordType - Type of medical record
 * @returns CSS classes for icon color
 */
export const getDocumentTypeColor = (recordType: string): string => {
    const colors: Record<string, string> = {
        prescription: 'text-blue-600 bg-blue-100',
        'lab-report': 'text-green-600 bg-green-100',
        scan: 'text-purple-600 bg-purple-100',
        'x-ray': 'text-orange-600 bg-orange-100',
        diagnosis: 'text-red-600 bg-red-100',
        other: 'text-gray-600 bg-gray-100',
    };
    return colors[recordType] || colors.other;
};

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.2 MB")
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Check if file type supports preview
 * @param fileType - MIME type
 * @returns boolean
 */
export const canPreviewFile = (fileType: string): boolean => {
    const previewableTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
    ];
    return previewableTypes.includes(fileType);
};
