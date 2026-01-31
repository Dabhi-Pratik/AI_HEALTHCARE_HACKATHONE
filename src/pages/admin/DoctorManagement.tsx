import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit, Trash2, Star, Clock, Users } from 'lucide-react';
import { mockDoctors } from '../../utils/mockData';

export const DoctorManagement: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    const doctors = mockDoctors;

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor & Staff Management</h1>
                        <p className="text-gray-600">Manage doctors, schedules, and performance</p>
                    </div>
                    <Button onClick={() => setShowAddModal(true)}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add Doctor
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Doctors</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{doctors.length}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Active Today</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">42</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-1">4.6</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Total Appointments</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">2,847</p>
                    </Card>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                        <Card key={doctor.id} hover>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                                        {doctor.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                        <Edit className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-red-100 rounded">
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{doctor.rating.toFixed(1)} Rating</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{doctor.experience} years experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{Math.floor(Math.random() * 200 + 50)} patients</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Department:</span>
                                    <span className="text-sm text-gray-600">{doctor.department}</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-medium text-gray-700">Fee:</span>
                                    <span className="text-sm font-semibold text-green-600">₹{doctor.consultationFee}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Add Doctor Modal */}
                <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Doctor">
                    <div className="space-y-4">
                        <Input label="Full Name" placeholder="Dr. John Smith" />
                        <Input label="Email" type="email" placeholder="doctor@hospital.com" />
                        <Input label="Specialization" placeholder="Cardiology" />
                        <Input label="Experience (years)" type="number" placeholder="10" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Pediatrics</option>
                                <option>Orthopedics</option>
                                <option>General Medicine</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button fullWidth onClick={() => setShowAddModal(false)}>Add Doctor</Button>
                            <Button fullWidth variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </Layout>
    );
};
