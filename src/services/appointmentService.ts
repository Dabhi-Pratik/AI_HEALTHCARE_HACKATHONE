/**
 * Appointment Service Layer
 * Simulates backend APIs using LocalStorage as persistent database
 * All functions use async/await to simulate network delays
 * Ready to swap with real API calls when backend is available
 */

import type { Appointment, AppointmentStatus } from '../types';
import { todayAppointments, patientDetails } from '../utils/mockDoctorData';

const STORAGE_KEY = 'healthcare_appointments';
const NETWORK_DELAY = 300; // ms - simulates API response time

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Initialize appointments in LocalStorage if not present
 */
const initializeAppointments = (): void => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todayAppointments));
    }
};

/**
 * Get all appointments from storage
 */
const getStoredAppointments = (): Appointment[] => {
    initializeAppointments();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const appointments = JSON.parse(stored);
    // Convert date strings back to Date objects
    return appointments.map((apt: any) => ({
        ...apt,
        dateTime: new Date(apt.dateTime),
        createdAt: new Date(apt.createdAt),
        updatedAt: new Date(apt.updatedAt),
    }));
};

/**
 * Save appointments to storage
 */
const saveAppointments = (appointments: Appointment[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

/**
 * GET /api/doctor/appointments
 * Get today's appointments for the logged-in doctor
 * Sorted by priority (emergency first) then by time
 */
export const getTodaysAppointments = async (doctorId: string = 'd001'): Promise<Appointment[]> => {
    await delay(NETWORK_DELAY);
    
    try {
        const appointments = getStoredAppointments();
        
        // Filter by doctor and today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todaysAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.dateTime);
            aptDate.setHours(0, 0, 0, 0);
            return apt.doctorId === doctorId && aptDate.getTime() === today.getTime();
        });
        
        // Sort: Emergency first, then by time
        return todaysAppointments.sort((a, b) => {
            // Emergency priority first
            if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
            if (a.priority !== 'emergency' && b.priority === 'emergency') return 1;
            
            // Then sort by time
            return a.dateTime.getTime() - b.dateTime.getTime();
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw new Error('Failed to fetch appointments');
    }
};

/**
 * GET /api/appointments/:id
 * Get detailed information about a specific appointment
 * Including patient details, vitals, and history
 */
export const getAppointmentDetails = async (appointmentId: string): Promise<{
    appointment: Appointment;
    patientDetails: any;
}> => {
    await delay(NETWORK_DELAY);
    
    try {
        const appointments = getStoredAppointments();
        const appointment = appointments.find(apt => apt.id === appointmentId);
        
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        
        // Get patient details from mock data
        const patient = patientDetails[appointment.patientId] || {
            name: appointment.patientName,
            age: 'N/A',
            gender: 'N/A',
            bloodGroup: 'N/A',
            allergies: [],
            chronicConditions: [],
            vitals: {
                bp: 'N/A',
                pulse: 'N/A',
                temp: 'N/A',
                spo2: 'N/A',
            },
        };
        
        // Calculate previous visit count (mock)
        const previousVisits = appointments.filter(
            apt => apt.patientId === appointment.patientId && apt.status === 'completed'
        ).length;
        
        return {
            appointment,
            patientDetails: {
                ...patient,
                previousVisits,
            },
        };
    } catch (error) {
        console.error('Error fetching appointment details:', error);
        throw error;
    }
};

/**
 * PATCH /api/appointments/:id/start
 * Start an appointment - change status from scheduled to in-progress
 * 
 * Business Rules:
 * - Only scheduled appointments can be started
 * - Only ONE appointment can be in-progress at a time (except emergency)
 * - Emergency appointments can interrupt current session
 */
export const startAppointment = async (appointmentId: string): Promise<Appointment> => {
    await delay(NETWORK_DELAY);
    
    try {
        const appointments = getStoredAppointments();
        const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);
        
        if (appointmentIndex === -1) {
            throw new Error('Appointment not found');
        }
        
        const appointment = appointments[appointmentIndex];
        
        // Validate status
        if (appointment.status !== 'scheduled') {
            throw new Error(`Cannot start appointment with status: ${appointment.status}`);
        }
        
        // Check if another appointment is already in progress
        const inProgressAppointment = appointments.find(
            apt => apt.id !== appointmentId && apt.status === 'in-progress'
        );
        
        if (inProgressAppointment) {
            // If this is an emergency, pause the current appointment
            if (appointment.priority === 'emergency') {
                // In a real system, you might notify or create a workflow
                // For now, we allow it
                console.log('Emergency appointment started, pausing current session');
            } else {
                throw new Error('Another appointment is already in progress. Please complete it first.');
            }
        }
        
        // Update appointment status
        appointments[appointmentIndex] = {
            ...appointment,
            status: 'in-progress' as AppointmentStatus,
            updatedAt: new Date(),
        };
        
        saveAppointments(appointments);
        return appointments[appointmentIndex];
    } catch (error) {
        console.error('Error starting appointment:', error);
        throw error;
    }
};

/**
 * PATCH /api/appointments/:id/complete
 * Complete an appointment - change status from in-progress to completed
 * 
 * Business Rules:
 * - Only in-progress appointments can be completed
 * - Saves completion timestamp
 */
export const completeAppointment = async (appointmentId: string): Promise<Appointment> => {
    await delay(NETWORK_DELAY);
    
    try {
        const appointments = getStoredAppointments();
        const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);
        
        if (appointmentIndex === -1) {
            throw new Error('Appointment not found');
        }
        
        const appointment = appointments[appointmentIndex];
        
        // Validate status
        if (appointment.status !== 'in-progress') {
            throw new Error(`Cannot complete appointment with status: ${appointment.status}`);
        }
        
        // Update appointment status
        appointments[appointmentIndex] = {
            ...appointment,
            status: 'completed' as AppointmentStatus,
            updatedAt: new Date(),
        };
        
        saveAppointments(appointments);
        return appointments[appointmentIndex];
    } catch (error) {
        console.error('Error completing appointment:', error);
        throw error;
    }
};

/**
 * Reset appointments to initial state (for testing)
 */
export const resetAppointments = (): void => {
    localStorage.removeItem(STORAGE_KEY);
    initializeAppointments();
};
