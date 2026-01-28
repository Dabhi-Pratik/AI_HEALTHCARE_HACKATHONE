import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Send, Plus, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { notificationTemplates, notificationStats } from '../../utils/mockAdminData';

export const NotificationManagement: React.FC = () => {
    const [showBroadcastModal, setShowBroadcastModal] = useState(false);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Management</h1>
                        <p className="text-gray-600">Manage automated reminders and broadcasts</p>
                    </div>
                    <Button onClick={() => setShowBroadcastModal(true)}>
                        <Send className="w-5 h-5 mr-2" />
                        Send Broadcast
                    </Button>
                </div>

                {/* Notification Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Sent</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{notificationStats.sent.toLocaleString()}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Delivered</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">{notificationStats.delivered.toLocaleString()}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Failed</p>
                        <p className="text-3xl font-bold text-red-600 mt-1">{notificationStats.failed}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Open Rate</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">{notificationStats.openRate}%</p>
                    </Card>
                </div>

                {/* By Type Stats */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery by Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {notificationStats.byType.map((type) => (
                            <div key={type.name} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    {type.name === 'SMS' && <Smartphone className="w-5 h-5 text-blue-600" />}
                                    {type.name === 'Email' && <Mail className="w-5 h-5 text-green-600" />}
                                    {type.name === 'WhatsApp' && <MessageSquare className="w-5 h-5 text-emerald-600" />}
                                    <h4 className="font-medium text-gray-900">{type.name}</h4>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sent:</span>
                                        <span className="font-semibold">{type.sent}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Delivered:</span>
                                        <span className="font-semibold text-green-600">{type.delivered}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Failed:</span>
                                        <span className="font-semibold text-red-600">{type.failed}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Templates */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
                        <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Template
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {notificationTemplates.map((template) => (
                            <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${template.type === 'sms' ? 'bg-blue-100 text-blue-700' :
                                                template.type === 'email' ? 'bg-green-100 text-green-700' :
                                                    'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {template.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={template.active}
                                            onChange={() => { }}
                                            className="w-4 h-4 text-primary-600 rounded"
                                        />
                                        <span className="text-sm text-gray-600">Active</span>
                                    </label>
                                </div>
                                <p className="text-sm text-gray-600">{template.content}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Broadcast Modal */}
                <Modal isOpen={showBroadcastModal} onClose={() => setShowBroadcastModal(false)} title="Send Broadcast Message">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Channel</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>SMS</option>
                                <option>Email</option>
                                <option>WhatsApp</option>
                                <option>All Channels</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Group</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>All Patients</option>
                                <option>All Doctors</option>
                                <option>Today's Appointments</option>
                                <option>Custom Group</option>
                            </select>
                        </div>
                        <Input label="Subject" placeholder="Important Update" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                            <textarea
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                rows={4}
                                placeholder="Type your message..."
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button fullWidth onClick={() => setShowBroadcastModal(false)}>
                                <Send className="w-4 h-4 mr-2" />
                                Send Now
                            </Button>
                            <Button fullWidth variant="outline" onClick={() => setShowBroadcastModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </Layout>
    );
};
