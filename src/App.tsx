import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PatientDashboard } from './pages/patient/Dashboard';
import { SymptomChecker } from './pages/patient/SymptomChecker';
import { BookAppointment } from './pages/patient/BookAppointment';
import { MyAppointments } from './pages/patient/MyAppointments';
import { MedicalRecords } from './pages/patient/MedicalRecords';
import { PatientProfile } from './pages/patient/Profile';
// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PatientManagement } from './pages/admin/PatientManagement';
import { DoctorManagement } from './pages/admin/DoctorManagement';
import { AppointmentManagement } from './pages/admin/AppointmentManagement';
import { AIAnalytics } from './pages/admin/AIAnalytics';
import { ChannelMonitoring } from './pages/admin/ChannelMonitoring';
import { NotificationManagement } from './pages/admin/NotificationManagement';
import { SystemSettings } from './pages/admin/SystemSettings';
// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorPatients } from './pages/doctor/Patients';
import { DoctorAppointments } from './pages/doctor/Appointments';
import { DoctorAnalytics } from './pages/doctor/Analytics';
import { DoctorSettings } from './pages/doctor/Settings';

// Redirect based on user role
const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  switch (user.role) {
    case 'patient':
      return <Navigate to="/patient/dashboard" replace />;
    case 'doctor':
      return <Navigate to="/doctor/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Dashboard Redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/symptom-checker"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <SymptomChecker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/book-appointment"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/records"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <MedicalRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/profile"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientProfile />
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/patients"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorPatients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/analytics"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/settings"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorSettings />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/patients"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DoctorManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AppointmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ai-analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AIAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/channels"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ChannelMonitoring />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <NotificationManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SystemSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                    <p className="text-xl text-gray-600">Page not found</p>
                    <a href="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
                      Go back home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
