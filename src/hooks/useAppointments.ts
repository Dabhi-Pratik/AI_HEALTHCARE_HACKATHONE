/**
 * useAppointments Hook
 * Custom hook for managing appointment state and operations
 * Provides functions for viewing, starting, and completing appointments
 * Integrates with toast notifications and handles loading/error states
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import type { Appointment } from '../types';
import {
    getTodaysAppointments,
    getAppointmentDetails,
    startAppointment as startAppointmentAPI,
    completeAppointment as completeAppointmentAPI,
} from '../services/appointmentService';

interface AppointmentDetails {
    appointment: Appointment;
    patientDetails: {
        name: string;
        age: number | string;
        gender: string;
        bloodGroup: string;
        allergies: string[];
        chronicConditions: string[];
        vitals: {
            bp: string;
            pulse: number | string;
            temp: number | string;
            spo2: number | string;
        };
        previousVisits: number;
    };
}

export const useAppointments = (doctorId: string = 'd001') => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // Track which appointment is being acted upon
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    /**
     * Load today's appointments
     */
    const loadAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTodaysAppointments(doctorId);
            setAppointments(data);
        } catch (err: any) {
            const message = err.message || 'Failed to load appointments';
            setError(message);
            showToast(message, 'error');
        } finally {
            setLoading(false);
        }
    }, [doctorId, showToast]);

    /**
     * Load appointments on mount
     */
    useEffect(() => {
        loadAppointments();
    }, [loadAppointments]);

    /**
     * View appointment details
     * Opens modal with full patient and appointment information
     */
    const viewDetails = useCallback(async (appointmentId: string) => {
        setActionLoading(appointmentId);
        try {
            const details = await getAppointmentDetails(appointmentId);
            setSelectedAppointment(details);
        } catch (err: any) {
            const message = err.message || 'Failed to load appointment details';
            showToast(message, 'error');
        } finally {
            setActionLoading(null);
        }
    }, [showToast]);

    /**
     * Close appointment details modal
     */
    const closeDetails = useCallback(() => {
        setSelectedAppointment(null);
    }, []);

    /**
     * Start an appointment
     * Changes status from scheduled to in-progress
     */
    const startAppointment = useCallback(async (appointmentId: string) => {
        setActionLoading(appointmentId);
        try {
            await startAppointmentAPI(appointmentId);
            showToast('Appointment started successfully', 'success');
            // Reload appointments to get updated data
            await loadAppointments();
        } catch (err: any) {
            const message = err.message || 'Failed to start appointment';
            showToast(message, 'error');
        } finally {
            setActionLoading(null);
        }
    }, [showToast, loadAppointments]);

    /**
     * Complete an appointment
     * Changes status from in-progress to completed
     */
    const completeAppointment = useCallback(async (appointmentId: string) => {
        setActionLoading(appointmentId);
        try {
            await completeAppointmentAPI(appointmentId);
            showToast('Appointment completed successfully', 'success');
            // Reload appointments to get updated data
            await loadAppointments();
        } catch (err: any) {
            const message = err.message || 'Failed to complete appointment';
            showToast(message, 'error');
        } finally {
            setActionLoading(null);
        }
    }, [showToast, loadAppointments]);

    /**
     * Calculate stats from appointments
     */
    const stats = {
        total: appointments.length,
        completed: appointments.filter(a => a.status === 'completed').length,
        inProgress: appointments.filter(a => a.status === 'in-progress').length,
        scheduled: appointments.filter(a => a.status === 'scheduled').length,
    };

    return {
        appointments,
        selectedAppointment,
        loading,
        actionLoading,
        error,
        stats,
        viewDetails,
        closeDetails,
        startAppointment,
        completeAppointment,
        refreshAppointments: loadAppointments,
    };
};
