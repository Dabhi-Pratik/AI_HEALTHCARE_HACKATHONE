// Medical Records Types and Interfaces

export type RecordType = 'prescription' | 'lab-report' | 'scan' | 'x-ray' | 'other';

export interface MedicalRecord {
    id: string;
    patientId: string;
    type: RecordType;
    title: string;
    description?: string;
    fileName: string;
    fileSize: number;
    fileUrl: string; // Base64 or blob URL for now, will be cloud URL later
    fileType: string; // MIME type
    uploadedBy: string;
    uploadedAt: Date;
    category?: string;
}

export interface UploadFormData {
    file: File | null;
    type: RecordType;
    title: string;
    date: Date;
    description?: string;
}
