// Mock data for Admin Dashboard

export const adminAnalytics = {
    overview: {
        totalPatients: 1245,
        totalDoctors: 52,
        totalClinics: 6,
        todayAppointments: 89,
        activeQueues: 12,
        missedAppointments: 7,
        avgWaitTime: 18, // minutes
        patientSatisfaction: 4.6,
        systemUptime: 99.9,
    },
    trends: {
        patientsGrowth: 12.5,
        doctorsGrowth: 8.3,
        appointmentsGrowth: 15.7,
        satisfactionGrowth: 3.2,
    },
    dailyAppointments: [
        { date: 'Mon', appointments: 75, completed: 68, cancelled: 7 },
        { date: 'Tue', appointments: 82, completed: 74, cancelled: 8 },
        { date: 'Wed', appointments: 78, completed: 71, cancelled: 7 },
        { date: 'Thu', appointments: 91, completed: 83, cancelled: 8 },
        { date: 'Fri', appointments: 89, completed: 81, cancelled: 8 },
        { date: 'Sat', appointments: 64, completed: 58, cancelled: 6 },
        { date: 'Sun', appointments: 45, completed: 42, cancelled: 3 },
    ],
    departmentDistribution: [
        { name: 'Cardiology', value: 245 },
        { name: 'Neurology', value: 198 },
        { name: 'Pediatrics', value: 223 },
        { name: 'Orthopedics', value: 181 },
        { name: 'General Medicine', value: 289 },
        { name: 'Emergency', value: 109 },
    ],
    weeklyPerformance: [
        { week: 'Week 1', appointments: 380, satisfaction: 4.5 },
        { week: 'Week 2', appointments: 420, satisfaction: 4.6 },
        { week: 'Week 3', appointments: 395, satisfaction: 4.4 },
        { week: 'Week 4', appointments: 445, satisfaction: 4.7 },
    ],
};

export const systemAlerts = [
    {
        id: '1',
        type: 'warning' as const,
        title: 'High Queue Wait Time',
        message: 'Cardiology department has 15+ minutes average wait time',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isRead: false,
    },
    {
        id: '2',
        type: 'info' as const,
        title: 'New Doctor Registered',
        message: 'Dr. Sarah Williams joined Pediatrics department',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isRead: false,
    },
    {
        id: '3',
        type: 'success' as const,
        title: 'System Backup Completed',
        message: 'Daily backup completed successfully at 2:00 AM',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isRead: true,
    },
    {
        id: '4',
        type: 'error' as const,
        title: 'AI Model Update Required',
        message: 'Symptom checker model version 2.1 available',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
        isRead: true,
    },
];

export const recentActivity = [
    { id: '1', action: 'Patient registered', user: 'John Doe', time: '2 minutes ago' },
    { id: '2', action: 'Appointment scheduled', user: 'Dr. Smith', time: '5 minutes ago' },
    { id: '3', action: 'Prescription created', user: 'Dr. Johnson', time: '12 minutes ago' },
    { id: '4', action: 'Medical record uploaded', user: 'Jane Smith', time: '18 minutes ago' },
    { id: '5', action: 'AI symptom check completed', user: 'Mike Brown', time: '25 minutes ago' },
];

// AI Analytics Data
export const aiAnalytics = {
    symptomChecker: {
        totalChecks: 3847,
        accuracyRate: 87.3,
        commonSymptoms: [
            { symptom: 'Headache', count: 523 },
            { symptom: 'Fever', count: 487 },
            { symptom: 'Cough', count: 412 },
            { symptom: 'Fatigue', count: 391 },
            { symptom: 'Nausea', count: 289 },
        ],
        severityDistribution: [
            { name: 'Mild', value: 1823 },
            { name: 'Moderate', value: 1456 },
            { name: 'Severe', value: 423 },
            { name: 'Critical', value: 145 },
        ],
    },
    doctorRecommendations: {
        successRate: 92.5,
        totalRecommendations: 2945,
        topSpecializations: [
            { name: 'General Medicine', count: 892, successRate: 94.2 },
            { name: 'Cardiology', count: 645, successRate: 91.8 },
            { name: 'Neurology', count: 487, successRate: 89.3 },
            { name: 'Pediatrics', count: 521, successRate: 95.1 },
            { name: 'Orthopedics', count: 400, successRate: 90.5 },
        ],
    },
    performanceMetrics: {
        avgWaitTimeWeekly: [
            { week: 'W1', waitTime: 15 },
            { week: 'W2', waitTime: 18 },
            { week: 'W3', waitTime: 16 },
            { week: 'W4', waitTime: 14 },
        ],
        noShowPrediction: {
            accuracy: 84.7,
            totalPredictions: 1247,
            truePositives: 1056,
        },
        patientSatisfactionTrend: [
            { month: 'Jan', score: 4.3 },
            { month: 'Feb', score: 4.4 },
            { month: 'Mar', score: 4.5 },
            { month: 'Apr', score: 4.6 },
        ],
    },
};

// Channel Monitoring Data
export const channelStats = {
    overall: {
        totalInteractions: 15847,
        activeUsers: 1245,
        avgResponseTime: 2.3, // seconds
        successRate: 94.2,
    },
    byChannel: [
        { name: 'Mobile App', value: 6789, percentage: 42.8 },
        { name: 'WhatsApp', value: 4523, percentage: 28.5 },
        { name: 'IVR Calls', value: 2845, percentage: 17.9 },
        { name: 'Kiosk', value: 1690, percentage: 10.8 },
    ],
    hourlyUsage: [
        { hour: '9 AM', app: 120, whatsapp: 85, ivr: 45, kiosk: 30 },
        { hour: '11 AM', app: 180, whatsapp: 120, ivr: 60, kiosk: 45 },
        { hour: '1 PM', app: 150, whatsapp: 110, ivr: 55, kiosk: 40 },
        { hour: '3 PM', app: 200, whatsapp: 140, ivr: 70, kiosk: 50 },
        { hour: '5 PM', app: 160, whatsapp: 100, ivr: 50, kiosk: 35 },
    ],
    channelPerformance: {
        app: { bookingSuccessRate: 96.5, satisfaction: 4.7, avgTime: 1.8 },
        whatsapp: { bookingSuccessRate: 93.2, satisfaction: 4.5, avgTime: 2.5 },
        ivr: { bookingSuccessRate: 88.7, satisfaction: 4.2, avgTime: 3.2 },
        kiosk: { bookingSuccessRate: 94.8, satisfaction: 4.6, avgTime: 2.1 },
    },
};

// Notification Templates
export const notificationTemplates = [
    {
        id: '1',
        name: 'Appointment Reminder',
        type: 'sms' as const,
        content: 'Hello {name}, this is a reminder for your appointment with Dr. {doctor} on {date} at {time}.',
        active: true,
    },
    {
        id: '2',
        name: 'Appointment Confirmation',
        type: 'email' as const,
        content: 'Dear {name}, your appointment has been confirmed for {date} at {time} with Dr. {doctor}.',
        active: true,
    },
    {
        id: '3',
        name: 'Queue Update',
        type: 'whatsapp' as const,
        content: 'Hi {name}, you are now #{position} in queue. Estimated wait time: {time} minutes.',
        active: true,
    },
    {
        id: '4',
        name: 'Prescription Ready',
        type: 'sms' as const,
        content: 'Hello {name}, your prescription is ready for pickup at the pharmacy.',
        active: false,
    },
];

export const notificationStats = {
    sent: 8945,
    delivered: 8523,
    failed: 422,
    openRate: 76.3, // for emails
    responseRate: 42.8,
    byType: [
        { name: 'SMS', sent: 4523, delivered: 4389, failed: 134 },
        { name: 'Email', sent: 3245, delivered: 3089, failed: 156 },
        { name: 'WhatsApp', sent: 1177, delivered: 1045, failed: 132 },
    ],
};
