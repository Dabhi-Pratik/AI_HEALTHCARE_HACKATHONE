// Patient Document Types and Interfaces

export type DocumentType = 'prescription' | 'lab-report' | 'scan' | 'x-ray' | 'diagnosis' | 'other';

export interface PatientDocument {
    id: string;
    patientId: string;
    fileName: string;
    fileType: string; // MIME type: application/pdf, image/jpeg, etc.
    recordType: DocumentType;
    uploadDate: Date;
    fileUrl: string; // Base64 or cloud URL
    fileSize: number;
    uploadedBy: string;
    description?: string;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    chronicConditions?: string[];
    lastVisit?: Date;
    totalVisits: number;
}

export interface PatientDocumentsResponse {
    patient: Patient;
    documents: PatientDocument[];
}
