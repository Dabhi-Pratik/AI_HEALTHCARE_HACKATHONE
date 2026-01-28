import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Bell, Lock, Calendar } from 'lucide-react';

export const DoctorSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        name: 'Dr. Robert Johnson',
        email: 'doctor@demo.com',
        phone: '+1 (555) 987-6543',
        smsNotifications: true,
        emailNotifications: true,
        autoAcceptAppointments: false,
        consultationDuration: 15,
    });

    return (
        <Layout>
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your profile and preferences</p>
                </div>

                {/* Profile Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <User className="w-6 h-6 text-primary-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        />
                        <Input
                            label="Phone"
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialization</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Pediatrics</option>
                                <option>Orthopedics</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-6 h-6 text-yellow-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900">SMS Notifications</p>
                                <p className="text-sm text-gray-600">Receive appointment alerts via SMS</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                                className="w-5 h-5 text-primary-600"
                            />
                        </label>
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900">Email Notifications</p>
                                <p className="text-sm text-gray-600">Receive daily summary emails</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                className="w-5 h-5 text-primary-600"
                            />
                        </label>
                    </div>
                </Card>

                {/* Appointment Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Appointment Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900">Auto-Accept Appointments</p>
                                <p className="text-sm text-gray-600">Automatically confirm new bookings</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.autoAcceptAppointments}
                                onChange={(e) => setSettings({ ...settings, autoAcceptAppointments: e.target.checked })}
                                className="w-5 h-5 text-primary-600"
                            />
                        </label>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Default Consultation Duration
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="10"
                                    max="30"
                                    step="5"
                                    value={settings.consultationDuration}
                                    onChange={(e) => setSettings({ ...settings, consultationDuration: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="font-semibold text-gray-900 min-w-[60px]">
                                    {settings.consultationDuration} min
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Security Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-6 h-6 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                    </div>
                    <div className="space-y-4">
                        <Button variant="outline" fullWidth>
                            Change Password
                        </Button>
                        <Button variant="outline" fullWidth>
                            Enable Two-Factor Authentication
                        </Button>
                    </div>
                </Card>

                {/* Working Hours */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Weekday Hours</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="09:00" />
                                <Input placeholder="17:00" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Weekend Hours</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input placeholder="10:00" />
                                <Input placeholder="14:00" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Save Button */}
                <div className="flex gap-3">
                    <Button fullWidth>Save Changes</Button>
                    <Button fullWidth variant="outline">Cancel</Button>
                </div>
            </div>
        </Layout>
    );
};
