import type { User, Appointment, MedicalRecord, Notification } from '../types';

const STORAGE_KEYS = {
    USER: 'hms_current_user',
    APPOINTMENTS: 'hms_appointments',
    MEDICAL_RECORDS: 'hms_medical_records',
    NOTIFICATIONS: 'hms_notifications',
} as const;

// User Authentication
export const saveCurrentUser = (user: User | null): void => {
    if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

// Appointments
export const saveAppointments = (appointments: Appointment[]): void => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
};

export const getAppointments = (): Appointment[] => {
    const appointmentsStr = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!appointmentsStr) return [];

    try {
        const appointments = JSON.parse(appointmentsStr);
        // Convert date strings back to Date objects
        return appointments.map((apt: any) => ({
            ...apt,
            dateTime: new Date(apt.dateTime),
            createdAt: new Date(apt.createdAt),
            updatedAt: new Date(apt.updatedAt),
            leaveHomeAt: apt.leaveHomeAt ? new Date(apt.leaveHomeAt) : undefined,
        }));
    } catch {
        return [];
    }
};

export const addAppointment = (appointment: Appointment): void => {
    const appointments = getAppointments();
    appointments.push(appointment);
    saveAppointments(appointments);
};

export const updateAppointment = (id: string, updates: Partial<Appointment>): void => {
    const appointments = getAppointments();
    const index = appointments.findIndex(apt => apt.id === id);

    if (index !== -1) {
        appointments[index] = { ...appointments[index], ...updates, updatedAt: new Date() };
        saveAppointments(appointments);
    }
};

export const deleteAppointment = (id: string): void => {
    const appointments = getAppointments();
    const filtered = appointments.filter(apt => apt.id !== id);
    saveAppointments(filtered);
};

// Medical Records
export const saveMedicalRecords = (records: MedicalRecord[]): void => {
    localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(records));
};

export const getMedicalRecords = (): MedicalRecord[] => {
    const recordsStr = localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS);
    if (!recordsStr) return [];

    try {
        const records = JSON.parse(recordsStr);
        return records.map((record: any) => ({
            ...record,
            uploadedAt: new Date(record.uploadedAt),
        }));
    } catch {
        return [];
    }
};

export const addMedicalRecord = (record: MedicalRecord): void => {
    const records = getMedicalRecords();
    records.push(record);
    saveMedicalRecords(records);
};

// Notifications
export const saveNotifications = (notifications: Notification[]): void => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const getNotifications = (): Notification[] => {
    const notificationsStr = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!notificationsStr) return [];

    try {
        const notifications = JSON.parse(notificationsStr);
        return notifications.map((notif: any) => ({
            ...notif,
            createdAt: new Date(notif.createdAt),
        }));
    } catch {
        return [];
    }
};

export const addNotification = (notification: Notification): void => {
    const notifications = getNotifications();
    notifications.unshift(notification); // Add to beginning
    saveNotifications(notifications);
};

export const markNotificationAsRead = (id: string): void => {
    const notifications = getNotifications();
    const notification = notifications.find(n => n.id === id);

    if (notification) {
        notification.read = true;
        saveNotifications(notifications);
    }
};

export const markAllNotificationsAsRead = (userId: string): void => {
    const notifications = getNotifications();
    notifications.forEach(n => {
        if (n.userId === userId) {
            n.read = true;
        }
    });
    saveNotifications(notifications);
};

// Clear all data (logout)
export const clearAllData = (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
};

// Initialize with mock data if empty
export const initializeStorage = (mockAppointments: Appointment[], mockRecords: MedicalRecord[], mockNotifications: Notification[]): void => {
    if (getAppointments().length === 0) {
        saveAppointments(mockAppointments);
    }
    if (getMedicalRecords().length === 0) {
        saveMedicalRecords(mockRecords);
    }
    if (getNotifications().length === 0) {
        saveNotifications(mockNotifications);
    }
};
