// Mock data for Doctor Dashboard

import type { Appointment } from '../types';

// Queue Entry with AI Triage
export interface QueuePatient {
    id: string;
    queueNumber: number;
    patientName: string;
    patientId: string;
    symptoms: string;
    aiPriority: 'high' | 'medium' | 'low';
    aiSeverity: 'critical' | 'severe' | 'moderate' | 'mild';
    suggestedDiagnosis: string[];
    estimatedDuration: number; // minutes
    waitingTime: number; // minutes
    arrivedAt: Date;
    status: 'waiting' | 'in-consultation' | 'completed';
    noShowRisk: number; // percentage
}

export const todayQueue: QueuePatient[] = [
    {
        id: 'q1',
        queueNumber: 1,
        patientName: 'Raj Patel',
        patientId: 'p001',
        symptoms: 'Chest pain, shortness of breath',
        aiPriority: 'high',
        aiSeverity: 'severe',
        suggestedDiagnosis: ['Angina', 'Cardiac Arrhythmia', 'Anxiety'],
        estimatedDuration: 20,
        waitingTime: 5,
        arrivedAt: new Date(Date.now() - 5 * 60 * 1000),
        status: 'waiting',
        noShowRisk: 12,
    },
    {
        id: 'q2',
        queueNumber: 2,
        patientName: 'Neha Shah',
        patientId: 'p002',
        symptoms: 'High fever (102°F), body aches, fatigue',
        aiPriority: 'medium',
        aiSeverity: 'moderate',
        suggestedDiagnosis: ['Viral Infection', 'Flu', 'Dengue'],
        estimatedDuration: 15,
        waitingTime: 12,
        arrivedAt: new Date(Date.now() - 12 * 60 * 1000),
        status: 'waiting',
        noShowRisk: 25,
    },
    {
        id: 'q3',
        queueNumber: 3,
        patientName: 'Aman Desai',
        patientId: 'p003',
        symptoms: 'Mild headache, slight dizziness',
        aiPriority: 'low',
        aiSeverity: 'mild',
        suggestedDiagnosis: ['Tension Headache', 'Dehydration', 'Migraine'],
        estimatedDuration: 10,
        waitingTime: 20,
        arrivedAt: new Date(Date.now() - 20 * 60 * 1000),
        status: 'waiting',
        noShowRisk: 8,
    },
    {
        id: 'q4',
        queueNumber: 4,
        patientName: 'Priya Kumar',
        patientId: 'p004',
        symptoms: 'Persistent cough, sore throat',
        aiPriority: 'low',
        aiSeverity: 'mild',
        suggestedDiagnosis: ['Upper Respiratory Infection', 'Bronchitis'],
        estimatedDuration: 12,
        waitingTime: 28,
        arrivedAt: new Date(Date.now() - 28 * 60 * 1000),
        status: 'waiting',
        noShowRisk: 15,
    },
    {
        id: 'q5',
        queueNumber: 5,
        patientName: 'Vikram Singh',
        patientId: 'p005',
        symptoms: 'Back pain, muscle stiffness',
        aiPriority: 'medium',
        aiSeverity: 'moderate',
        suggestedDiagnosis: ['Muscle Strain', 'Lumbar Pain', 'Sciatica'],
        estimatedDuration: 15,
        waitingTime: 35,
        arrivedAt: new Date(Date.now() - 35 * 60 * 1000),
        status: 'waiting',
        noShowRisk: 20,
    },
];

// Doctor Statistics
export const doctorStats = {
    todayAppointments: 24,
    patientsWaiting: 5,
    avgConsultationTime: 12, // minutes
    noShowPrediction: 8, // percentage
    emergencyPatients: 2,
    completedToday: 15,
    totalPatients: 248,
    avgRating: 4.8,
};

// Doctor Analytics Data
export const doctorAnalytics = {
    patientsPerDay: [
        { day: 'Mon', patients: 22 },
        { day: 'Tue', patients: 28 },
        { day: 'Wed', patients: 24 },
        { day: 'Thu', patients: 26 },
        { day: 'Fri', patients: 24 },
        { day: 'Sat', patients: 18 },
        { day: 'Sun', patients: 12 },
    ],
    consultationTime: [
        { week: 'W1', time: 14 },
        { week: 'W2', time: 12 },
        { week: 'W3', time: 13 },
        { week: 'W4', time: 12 },
    ],
    noShowRate: [
        { month: 'Jan', rate: 12 },
        { month: 'Feb', rate: 10 },
        { month: 'Mar', rate: 8 },
        { month: 'Apr', rate: 7 },
    ],
    peakHours: [
        { hour: '9 AM', patients: 8 },
        { hour: '11 AM', patients: 12 },
        { hour: '1 PM', patients: 10 },
        { hour: '3 PM', patients: 15 },
        { hour: '5 PM', patients: 9 },
    ],
};

// Doctor Notifications
export const doctorNotifications = [
    {
        id: 'n1',
        type: 'warning' as const,
        title: 'High No-Show Risk',
        message: 'Neha Shah may not arrive (AI Prediction: 72%)',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: false,
    },
    {
        id: 'n2',
        type: 'info' as const,
        title: 'Patient Arrived Early',
        message: 'Vikram Singh arrived 15 minutes early',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: false,
    },
    {
        id: 'n3',
        type: 'error' as const,
        title: 'Emergency Case Assigned',
        message: 'New emergency patient: Raj Patel - Chest pain',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
    },
    {
        id: 'n4',
        type: 'success' as const,
        title: 'Appointment Confirmed',
        message: 'Aman Desai confirmed appointment for 2:00 PM',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: true,
    },
];

// Today's Appointments (Calendar View)
export const todayAppointments: Appointment[] = [
    {
        id: 'apt1',
        patientId: 'p001',
        patientName: 'Raj Patel',
        doctorId: 'd001',
        doctorName: 'Dr. Robert Johnson',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(new Date().setHours(9, 0, 0, 0)),
        duration: 20,
        status: 'completed' as const,
        priority: 'emergency' as const,
        symptoms: 'Chest pain, shortness of breath',
        queuePosition: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'apt2',
        patientId: 'p002',
        patientName: 'Neha Shah',
        doctorId: 'd001',
        doctorName: 'Dr. Robert Johnson',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(new Date().setHours(10, 0, 0, 0)),
        duration: 15,
        status: 'in-progress' as const,
        priority: 'normal' as const,
        symptoms: 'High fever, body aches',
        queuePosition: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'apt3',
        patientId: 'p003',
        patientName: 'Aman Desai',
        doctorId: 'd001',
        doctorName: 'Dr. Robert Johnson',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(new Date().setHours(11, 30, 0, 0)),
        duration: 10,
        status: 'scheduled' as const,
        priority: 'normal' as const,
        symptoms: 'Mild headache',
        queuePosition: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'apt4',
        patientId: 'p004',
        patientName: 'Priya Kumar',
        doctorId: 'd001',
        doctorName: 'Dr. Robert Johnson',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(new Date().setHours(14, 0, 0, 0)),
        duration: 12,
        status: 'scheduled' as const,
        priority: 'normal' as const,
        symptoms: 'Persistent cough',
        queuePosition: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// Patient Details for Triage Panel
export const patientDetails: Record<string, any> = {
    p001: {
        name: 'Raj Patel',
        age: 58,
        gender: 'Male',
        bloodGroup: 'O+',
        allergies: ['Penicillin'],
        chronicConditions: ['Hypertension'],
        lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        vitals: {
            bp: '145/95',
            pulse: 88,
            temp: 98.6,
            spo2: 95,
        },
    },
    p002: {
        name: 'Neha Shah',
        age: 32,
        gender: 'Female',
        bloodGroup: 'A+',
        allergies: [],
        chronicConditions: [],
        lastVisit: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        vitals: {
            bp: '120/80',
            pulse: 92,
            temp: 102,
            spo2: 97,
        },
    },
    p003: {
        name: 'Aman Desai',
        age: 28,
        gender: 'Male',
        bloodGroup: 'B+',
        allergies: [],
        chronicConditions: [],
        lastVisit: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        vitals: {
            bp: '118/78',
            pulse: 72,
            temp: 98.4,
            spo2: 99,
        },
    },
};
