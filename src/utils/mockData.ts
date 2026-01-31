import type { Patient, Doctor, Admin, Department, Appointment, MedicalRecord, Notification } from '../types';

// Mock Patients
export const mockPatients: Patient[] = [
    {
        id: 'pat-1',
        email: 'patient@demo.com',
        name: 'John Doe',
        role: 'patient',
        phone: '+1234567890',
        dateOfBirth: '1985-05-15',
        gender: 'male',
        bloodGroup: 'O+',
        allergies: ['Penicillin', 'Pollen'],
        chronicConditions: ['Hypertension'],
        emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phone: '+1234567891',
        },
        address: '123 Main St, City, State 12345',
        createdAt: new Date('2024-01-15'),
    },
    {
        id: 'pat-2',
        email: 'sarah.smith@demo.com',
        name: 'Sarah Smith',
        role: 'patient',
        phone: '+1234567892',
        dateOfBirth: '1990-08-22',
        gender: 'female',
        bloodGroup: 'A+',
        allergies: [],
        chronicConditions: ['Diabetes Type 2'],
        emergencyContact: {
            name: 'Michael Smith',
            relationship: 'Brother',
            phone: '+1234567893',
        },
        createdAt: new Date('2024-02-20'),
    },
];

// Mock Departments
export const mockDepartments: Department[] = [
    {
        id: 'dept-1',
        name: 'Cardiology',
        description: 'Heart and cardiovascular system care',
        icon: 'Heart',
        facilities: ['ECG', 'Echocardiography', 'Cardiac Catheterization'],
        doctorCount: 5,
        floorNumber: 2,
    },
    {
        id: 'dept-2',
        name: 'Neurology',
        description: 'Brain and nervous system disorders',
        icon: 'Brain',
        facilities: ['MRI', 'CT Scan', 'EEG'],
        doctorCount: 3,
        floorNumber: 3,
    },
    {
        id: 'dept-3',
        name: 'Pediatrics',
        description: 'Medical care for infants, children, and adolescents',
        icon: 'Baby',
        facilities: ['Vaccination', 'Growth Monitoring', 'Emergency Care'],
        doctorCount: 6,
        floorNumber: 1,
    },
    {
        id: 'dept-4',
        name: 'Orthopedics',
        description: 'Bone, joint, and muscle care',
        icon: 'Bone',
        facilities: ['X-Ray', 'Physiotherapy', 'Surgery'],
        doctorCount: 4,
        floorNumber: 2,
    },
    {
        id: 'dept-5',
        name: 'General Medicine',
        description: 'Primary care and general health',
        icon: 'Stethoscope',
        facilities: ['General Consultation', 'Health Checkup'],
        doctorCount: 8,
        floorNumber: 1,
    },
    {
        id: 'dept-6',
        name: 'Emergency',
        description: '24/7 emergency medical services',
        icon: 'Ambulance',
        facilities: ['Trauma Care', 'Intensive Care', 'Ambulance'],
        doctorCount: 10,
        floorNumber: 0,
    },
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
    {
        id: 'doc-1',
        email: 'doctor@demo.com',
        name: 'Dr. Emily Chen',
        role: 'doctor',
        phone: '+1234567894',
        specialization: 'Cardiology',
        department: 'Cardiology',
        qualification: 'MD, FACC',
        experience: 15,
        rating: 4.8,
        consultationFee: 1500,
        languages: ['English', 'Mandarin'],
        bio: 'Experienced cardiologist with expertise in interventional cardiology and heart failure management.',
        availability: [
            { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 5, startTime: '09:00', endTime: '14:00', isAvailable: true },
        ],
        createdAt: new Date('2023-01-10'),
    },
    {
        id: 'doc-2',
        email: 'robert.johnson@demo.com',
        name: 'Dr. Robert Johnson',
        role: 'doctor',
        phone: '+1234567895',
        specialization: 'Neurology',
        department: 'Neurology',
        qualification: 'MD, DNB (Neurology)',
        experience: 12,
        rating: 4.6,
        consultationFee: 1400,
        languages: ['English', 'Spanish'],
        bio: 'Neurologist specializing in stroke management and movement disorders.',
        availability: [
            { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
            { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
            { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
            { dayOfWeek: 5, startTime: '10:00', endTime: '18:00', isAvailable: true },
        ],
        createdAt: new Date('2023-03-15'),
    },
    {
        id: 'doc-3',
        email: 'maria.garcia@demo.com',
        name: 'Dr. Maria Garcia',
        role: 'doctor',
        phone: '+1234567896',
        specialization: 'Pediatrics',
        department: 'Pediatrics',
        qualification: 'MD, Pediatrics',
        experience: 10,
        rating: 4.9,
        consultationFee: 1200,
        languages: ['English', 'Spanish', 'Portuguese'],
        bio: 'Dedicated pediatrician with a focus on preventive care and childhood development.',
        availability: [
            { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isAvailable: true },
        ],
        createdAt: new Date('2023-05-20'),
    },
    {
        id: 'doc-4',
        email: 'david.patel@demo.com',
        name: 'Dr. David Patel',
        role: 'doctor',
        phone: '+1234567897',
        specialization: 'Orthopedics',
        department: 'Orthopedics',
        qualification: 'MS (Ortho), FICS',
        experience: 18,
        rating: 4.7,
        consultationFee: 1600,
        languages: ['English', 'Hindi', 'Gujarati'],
        bio: 'Expert in joint replacement surgery and sports medicine.',
        availability: [
            { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
            { dayOfWeek: 5, startTime: '09:00', endTime: '13:00', isAvailable: true },
        ],
        createdAt: new Date('2023-02-10'),
    },
    {
        id: 'doc-5',
        email: 'lisa.anderson@demo.com',
        name: 'Dr. Lisa Anderson',
        role: 'doctor',
        phone: '+1234567898',
        specialization: 'General Medicine',
        department: 'General Medicine',
        qualification: 'MBBS, MD (Medicine)',
        experience: 8,
        rating: 4.5,
        consultationFee: 1000,
        languages: ['English'],
        bio: 'General physician providing comprehensive primary care services.',
        availability: [
            { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
            { dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isAvailable: true },
        ],
        createdAt: new Date('2023-07-01'),
    },
];

// Mock Admin
export const mockAdmin: Admin = {
    id: 'admin-1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    phone: '+1234567899',
    permissions: ['all'],
    createdAt: new Date('2023-01-01'),
};

// Mock Appointments
export const mockAppointments: Appointment[] = [
    {
        id: 'apt-1',
        patientId: 'pat-1',
        patientName: 'John Doe',
        doctorId: 'doc-1',
        doctorName: 'Dr. Emily Chen',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 30,
        status: 'scheduled',
        priority: 'normal',
        symptoms: 'Chest pain and shortness of breath',
        queuePosition: 3,
        estimatedWaitTime: 45,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
        id: 'apt-2',
        patientId: 'pat-1',
        patientName: 'John Doe',
        doctorId: 'doc-1',
        doctorName: 'Dr. Emily Chen',
        doctorSpecialization: 'Cardiology',
        department: 'Cardiology',
        dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        duration: 30,
        status: 'completed',
        priority: 'normal',
        symptoms: 'Regular checkup',
        notes: 'Blood pressure stable. Continue medication.',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
    {
        id: 'rec-1',
        patientId: 'pat-1',
        type: 'prescription',
        title: 'Hypertension Medication',
        description: 'Prescription for blood pressure management',
        uploadedBy: 'doc-1',
        uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        appointmentId: 'apt-2',
        doctorId: 'doc-1',
    },
    {
        id: 'rec-2',
        patientId: 'pat-1',
        type: 'lab-report',
        title: 'Blood Test Results',
        description: 'Complete blood count and lipid profile',
        uploadedBy: 'doc-1',
        uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        userId: 'pat-1',
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your appointment with Dr. Emily Chen is in 2 hours',
        read: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
        id: 'notif-2',
        userId: 'pat-1',
        type: 'test-result',
        title: 'Test Results Available',
        message: 'Your blood test results are now available',
        read: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
];

// Default password for all demo accounts
export const DEMO_PASSWORD = 'demo123';

// Helper function to get user by credentials
export const getUserByCredentials = (email: string, password: string) => {
    if (password !== DEMO_PASSWORD) return null;

    const allUsers = [
        ...mockPatients,
        ...mockDoctors,
        mockAdmin,
    ];

    return allUsers.find(user => user.email === email) || null;
};
