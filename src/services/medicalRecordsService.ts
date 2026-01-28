// Medical Records Backend Service
// Mock implementation - ready for real API integration

import type { MedicalRecord, RecordType } from '../types/medicalRecords';

// Simulated database
const RECORD_STORAGE_KEY = 'medical_records_v2';

// Initialize with sample data
const initializeSampleData = (): MedicalRecord[] => {
    return [
        {
            id: 'rec-001',
            patientId: 'patient@demo.com',
            type: 'prescription',
            title: 'Hypertension Medication',
            description: 'Prescription for blood pressure medication',
            fileName: 'hypertension_prescription.pdf',
            fileSize: 245000,
            fileUrl: 'data:application/pdf;base64,sample', // Placeholder
            fileType: 'application/pdf',
            uploadedBy: 'Dr. Sarah Johnson',
            uploadedAt: new Date('2026-01-13'),
        },
        {
            id: 'rec-002',
            patientId: 'patient@demo.com',
            type: 'lab-report',
            title: 'Blood Test Results',
            description: 'Complete blood count and lipid panel',
            fileName: 'blood_test_jan_2026.pdf',
            fileSize: 189000,
            fileUrl: 'data:application/pdf;base64,sample', // Placeholder
            fileType: 'application/pdf',
            uploadedBy: 'LabCorp',
            uploadedAt: new Date('2026-01-06'),
        },
    ];
};

// Get all records from localStorage or initialize
const getAllRecords = (): MedicalRecord[] => {
    const stored = localStorage.getItem(RECORD_STORAGE_KEY);
    if (!stored) {
        const initial = initializeSampleData();
        localStorage.setItem(RECORD_STORAGE_KEY, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(stored).map((rec: any) => ({
        ...rec,
        uploadedAt: new Date(rec.uploadedAt),
    }));
};

// Save records to localStorage
const saveRecords = (records: MedicalRecord[]): void => {
    localStorage.setItem(RECORD_STORAGE_KEY, JSON.stringify(records));
};

/**
 * Get all medical records for a specific patient
 * @param patientId - Patient identifier
 * @returns Promise<MedicalRecord[]>
 */
export const fetchMedicalRecords = async (patientId: string): Promise<MedicalRecord[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const allRecords = getAllRecords();
    return allRecords.filter(rec => rec.patientId === patientId);
};

/**
 * Upload a new medical record
 * @param file - File object to upload
 * @param metadata - Record metadata
 * @param patientId - Patient identifier
 * @returns Promise<MedicalRecord>
 */
export const uploadMedicalRecord = async (
    file: File,
    metadata: {
        type: RecordType;
        title: string;
        description?: string;
        date?: Date;
    },
    patientId: string
): Promise<MedicalRecord> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Convert file to base64 for storage (in real app, upload to cloud)
    const fileUrl = await fileToBase64(file);

    const newRecord: MedicalRecord = {
        id: `rec-${Date.now()}`,
        patientId,
        type: metadata.type,
        title: metadata.title,
        description: metadata.description,
        fileName: file.name,
        fileSize: file.size,
        fileUrl,
        fileType: file.type,
        uploadedBy: patientId,
        uploadedAt: metadata.date || new Date(),
    };

    const allRecords = getAllRecords();
    allRecords.push(newRecord);
    saveRecords(allRecords);

    return newRecord;
};

/**
 * Delete a medical record
 * @param recordId - Record identifier
 * @returns Promise<boolean>
 */
export const deleteMedicalRecord = async (recordId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const allRecords = getAllRecords();
    const filtered = allRecords.filter(rec => rec.id !== recordId);
    saveRecords(filtered);

    return true;
};

/**
 * Download a medical record file
 * @param record - Medical record to download
 */
export const downloadMedicalRecord = (record: MedicalRecord): void => {
    // Create a blob from the base64 data
    const link = document.createElement('a');
    link.href = record.fileUrl;
    link.download = record.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Helper: Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Filter records by type
 * @param records - All records
 * @param type - Record type or 'all'
 * @returns Filtered records
 */
export const filterRecordsByType = (
    records: MedicalRecord[],
    type: string
): MedicalRecord[] => {
    if (type === 'all') return records;
    return records.filter(rec => rec.type === type);
};

/**
 * Validate file type and size
 * @param file - File to validate
 * @returns Validation result
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload PDF, JPG, or PNG files only.',
        };
    }

    if (file.size > MAX_SIZE) {
        return {
            valid: false,
            error: 'File size exceeds 10MB limit.',
        };
    }

    return { valid: true };
};
