import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        setErrors({});

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const success = await login(formData.email, formData.password);

        if (success) {
            // Get user to determine redirect
            const user = JSON.parse(localStorage.getItem('hms_current_user') || '{}');

            if (user.role === 'patient') {
                navigate('/patient/dashboard');
            } else if (user.role === 'doctor') {
                navigate('/doctor/dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin/dashboard');
            }
        } else {
            setErrors({ general: 'Invalid email or password' });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-4">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to access your healthcare dashboard</p>
                </div>

                {/* Sign In Card */}
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {errors.general}
                            </div>
                        )}

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
                            autoComplete="email"
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={<Lock className="w-5 h-5" />}
                            required
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-gray-700">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-2 text-center">Demo Accounts</p>
                        <div className="space-y-1 text-xs text-blue-800">
                            <div className="flex justify-between">
                                <span>Patient:</span>
                                <span className="font-mono">patient@demo.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Doctor:</span>
                                <span className="font-mono">doctor@demo.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Admin:</span>
                                <span className="font-mono">admin@demo.com</span>
                            </div>
                            <div className="flex justify-between mt-2 pt-2 border-t border-blue-300">
                                <span>Password:</span>
                                <span className="font-mono font-semibold">demo123</span>
                            </div>
                        </div>
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
