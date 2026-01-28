// User and Authentication Types
export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    createdAt: Date;
}

export interface Patient extends User {
    role: 'patient';
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodGroup?: string;
    allergies?: string[];
    chronicConditions?: string[];
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
    address?: string;
}

export interface Doctor extends User {
    role: 'doctor';
    specialization: string;
    department: string;
    qualification: string;
    experience: number; // years
    rating: number; // 0-5
    consultationFee: number;
    languages: string[];
    availability: DoctorAvailability[];
    bio?: string;
}

export interface Admin extends User {
    role: 'admin';
    permissions: string[];
}

// Appointment Types
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'in-progress';
export type AppointmentPriority = 'normal' | 'urgent' | 'emergency';

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    patientAvatar?: string;
    doctorId: string;
    doctorName: string;
    doctorSpecialization: string;
    department: string;
    dateTime: Date;
    duration: number; // minutes
    status: AppointmentStatus;
    priority: AppointmentPriority;
    symptoms?: string;
    notes?: string;
    queuePosition?: number;
    estimatedWaitTime?: number; // minutes
    leaveHomeAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Doctor Availability
export interface DoctorAvailability {
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    isAvailable: boolean;
}

// Medical Records
export type MedicalRecordType = 'prescription' | 'lab-report' | 'x-ray' | 'scan' | 'discharge-summary' | 'other';

export interface MedicalRecord {
    id: string;
    patientId: string;
    type: MedicalRecordType;
    title: string;
    description?: string;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    uploadedBy: string; // User ID
    uploadedAt: Date;
    appointmentId?: string;
    doctorId?: string;
}

// Prescription
export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
}

export interface Prescription {
    id: string;
    appointmentId: string;
    patientId: string;
    doctorId: string;
    doctorName: string;
    medications: Medication[];
    diagnosis: string;
    instructions?: string;
    followUpDate?: Date;
    createdAt: Date;
}

// Department
export interface Department {
    id: string;
    name: string;
    description: string;
    icon?: string;
    facilities: string[];
    doctorCount: number;
    floorNumber?: number;
}

// Notification
export type NotificationType = 'appointment' | 'prescription' | 'test-result' | 'reminder' | 'announcement' | 'emergency';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    actionUrl?: string;
    createdAt: Date;
}

// Queue Management
export interface QueueEntry {
    id: string;
    appointmentId: string;
    patientId: string;
    patientName: string;
    position: number;
    estimatedWaitTime: number; // minutes
    checkedInAt: Date;
}

export interface Queue {
    id: string;
    doctorId: string;
    department: string;
    entries: QueueEntry[];
    currentPatient?: QueueEntry;
    averageConsultationTime: number; // minutes
}

// AI Symptom Analysis
export interface SymptomAnalysis {
    symptoms: string[];
    severity: 'mild' | 'moderate' | 'severe' | 'critical';
    possibleConditions: string[];
    recommendedDepartment: string;
    recommendedDoctors: string[]; // Doctor IDs
    urgencyLevel: number; // 1-10
    disclaimer: string;
}

// Chat Message
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Analytics Data
export interface AnalyticsData {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    noShowAppointments: number;
    activePatients: number;
    averageWaitTime: number;
    revenueToday: number;
    revenueMonth: number;
    departmentDistribution: { department: string; count: number }[];
    appointmentTrends: { date: string; count: number }[];
    peakHours: { hour: number; count: number }[];
    doctorUtilization: { doctorName: string; utilization: number }[];
}

// Form Data Types
export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    role: UserRole;
    // Patient-specific
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    bloodGroup?: string;
    // Doctor-specific
    specialization?: string;
    qualification?: string;
    experience?: number;
}

export interface SignInFormData {
    email: string;
    password: string;
}

// Emergency Request
export interface EmergencyRequest {
    id: string;
    patientId: string;
    patientName: string;
    symptoms: string;
    severity: 'critical' | 'urgent';
    location?: string;
    assignedDoctorId?: string;
    status: 'pending' | 'assigned' | 'in-progress' | 'completed';
    createdAt: Date;
    responseTime?: number; // minutes
}

// Admin Dashboard Types
export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface SystemAlert {
    id: string;
    type: AlertType;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    actionUrl?: string;
}

export interface ChannelStats {
    name: string;
    value: number;
    percentage: number;
    successRate?: number;
    avgResponseTime?: number;
}

export interface NotificationTemplate {
    id: string;
    name: string;
    type: 'sms' | 'email' | 'whatsapp';
    content: string;
    active: boolean;
    variables?: string[];
}

export interface SystemSettings {
    hospital: {
        name: string;
        address: string;
        phone: string;
        email: string;
        operatingHours: {
            weekday: { start: string; end: string };
            weekend: { start: string; end: string };
        };
    };
    ai: {
        enabled: boolean;
        confidenceThreshold: number;
        modelVersion: string;
    };
    notifications: {
        smsProvider: string;
        emailProvider: string;
        whatsappEnabled: boolean;
    };
    security: {
        sessionTimeout: number;
        twoFactorAuth: boolean;
        passwordMinLength: number;
    };
}

export interface AdminAnalytics {
    overview: {
        totalPatients: number;
        totalDoctors: number;
        totalClinics: number;
        todayAppointments: number;
        activeQueues: number;
        missedAppointments: number;
        avgWaitTime: number;
        patientSatisfaction: number;
        systemUptime: number;
    };
    trends: {
        patientsGrowth: number;
        doctorsGrowth: number;
        appointmentsGrowth: number;
        satisfactionGrowth: number;
    };
}
