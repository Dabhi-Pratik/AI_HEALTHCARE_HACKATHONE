import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Settings, Shield, Bell, Database, Zap } from 'lucide-react';

export const SystemSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        hospitalName: 'HealthCare+ Hospital',
        hospitalEmail: 'admin@healthcareplus.com',
        hospitalPhone: '+1 (555) 123-4567',
        aiEnabled: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
    });

    return (
        <Layout>
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
                    <p className="text-gray-600">Configure hospital and system preferences</p>
                </div>

                {/* Hospital Configuration */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-6 h-6 text-primary-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Hospital Configuration</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Hospital Name"
                            value={settings.hospitalName}
                            onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={settings.hospitalEmail}
                            onChange={(e) => setSettings({ ...settings, hospitalEmail: e.target.value })}
                        />
                        <Input
                            label="Phone"
                            value={settings.hospitalPhone}
                            onChange={(e) => setSettings({ ...settings, hospitalPhone: e.target.value })}
                        />
                        <Input label="Address" placeholder="123 Medical Center Blvd" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

                {/* AI Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">AI Model Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900">Enable AI Features</p>
                                <p className="text-sm text-gray-600">Turn on AI symptom checker and recommendations</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.aiEnabled}
                                onChange={(e) => setSettings({ ...settings, aiEnabled: e.target.checked })}
                                className="w-5 h-5 text-primary-600"
                            />
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Model Version</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    <option>v2.1 (Latest)</option>
                                    <option>v2.0</option>
                                    <option>v1.9</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confidence Threshold</label>
                                <input
                                    type="range"
                                    min="60"
                                    max="95"
                                    defaultValue="85"
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-600 mt-1">85% threshold</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Security Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                                className="w-5 h-5 text-primary-600"
                            />
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Session Timeout (minutes)</label>
                                <input
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Min Length</label>
                                <input
                                    type="number"
                                    defaultValue="8"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-6 h-6 text-yellow-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Notification Providers</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">SMS Provider</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>Twilio</option>
                                <option>AWS SNS</option>
                                <option>Custom</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Provider</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>SendGrid</option>
                                <option>AWS SES</option>
                                <option>Custom SMTP</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Data Management */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="w-6 h-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Last Backup</p>
                                <p className="text-sm text-gray-600">Today at 2:00 AM</p>
                            </div>
                            <Button variant="outline" size="sm">Backup Now</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Export All Data</p>
                                <p className="text-sm text-gray-600">Download complete database export</p>
                            </div>
                            <Button variant="outline" size="sm">Export</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">View Audit Logs</p>
                                <p className="text-sm text-gray-600">Check all system activity</p>
                            </div>
                            <Button variant="outline" size="sm">View Logs</Button>
                        </div>
                    </div>
                </Card>

                {/* Save Button */}
                <div className="flex gap-3">
                    <Button fullWidth>Save All Settings</Button>
                    <Button fullWidth variant="outline">Reset to Defaults</Button>
                </div>
            </div>
        </Layout>
    );
};
