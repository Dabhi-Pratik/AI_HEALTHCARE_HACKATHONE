import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock, User, Phone, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types';

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [step, setStep] = useState<1 | 2>(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const roles: { value: UserRole; label: string; description: string }[] = [
        {
            value: 'patient',
            label: 'Patient',
            description: 'Book appointments, manage health records, and chat with AI assistant',
        },
        {
            value: 'doctor',
            label: 'Doctor',
            description: 'Manage appointments, view patient records, and write prescriptions',
        },
        {
            value: 'admin',
            label: 'Admin',
            description: 'Manage hospital operations, doctors, and view analytics',
        },
    ];

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setStep(2);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        const userData = {
            ...formData,
            role: selectedRole,
        };

        const success = await signup(userData);

        if (success) {
            // Show success message
            alert('Account created successfully! Please sign in with your credentials.');
            navigate('/signin');
        } else {
            setErrors({ general: 'Failed to create account. Please try again.' });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
                    <p className="text-gray-600 mt-2">Join thousands trusting us with their healthcare</p>
                </div>

                <Card>
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                1
                            </div>
                            <div className={`w-24 h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                2
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                                Select Your Role
                            </h2>

                            {roles.map((role) => (
                                <button
                                    key={role.value}
                                    onClick={() => handleRoleSelect(role.value)}
                                    className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-left group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                                            <UserCheck className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {role.label}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{role.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: User Details */}
                    {step === 2 && (
                        <div>
                            <button
                                onClick={() => setStep(1)}
                                className="text-primary-600 hover:text-primary-700 font-medium mb-4 text-sm"
                            >
                                ← Change role
                            </button>

                            <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6">
                                <p className="text-sm text-primary-900">
                                    Creating account as: <strong className="capitalize">{selectedRole}</strong>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {errors.general}
                                    </div>
                                )}

                                <Input
                                    type="text"
                                    name="name"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    icon={<User className="w-5 h-5" />}
                                    required
                                />

                                <Input
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    icon={<Mail className="w-5 h-5" />}
                                    required
                                />

                                <Input
                                    type="tel"
                                    name="phone"
                                    label="Phone Number"
                                    placeholder="+1 (234) 567-8900"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    icon={<Phone className="w-5 h-5" />}
                                    required
                                />

                                <Input
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="At least 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    icon={<Lock className="w-5 h-5" />}
                                    required
                                />

                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Re-enter your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                    icon={<Lock className="w-5 h-5" />}
                                    required
                                />

                                <div className="flex items-start gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-700">
                                        I agree to the{' '}
                                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                                            Terms of Service
                                        </a>
                                        {' '}and{' '}
                                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    loading={loading}
                                    className="mt-6"
                                >
                                    Create Account
                                </Button>
                            </form>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/signin"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
