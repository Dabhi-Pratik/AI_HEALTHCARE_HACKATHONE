import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { getCurrentUser, saveCurrentUser, initializeStorage } from '../utils/localStorage';
import { getUserByCredentials, mockAppointments, mockMedicalRecords, mockNotifications } from '../utils/mockData';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    signup: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize storage with mock data
        initializeStorage(mockAppointments, mockMedicalRecords, mockNotifications);

        // Check for existing user session
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const user = getUserByCredentials(email, password);
            if (user) {
                setUser(user);
                saveCurrentUser(user);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        saveCurrentUser(null);
        // Note: We don't clear all data, just the current user
        // This preserves appointments and records for demo purposes
    };

    const signup = async (userData: any): Promise<boolean> => {
        try {
            // In a real app, this would call an API to create the user
            // For now, we'll just simulate success
            console.log('Signup data:', userData);
            return true;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route Component
interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: ('patient' | 'doctor' | 'admin')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        window.location.href = '/signin';
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
                    <p className="text-gray-600">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
