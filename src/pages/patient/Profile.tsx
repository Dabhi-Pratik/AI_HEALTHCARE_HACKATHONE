import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Droplet, Shield } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import type { Patient } from '../../types';

export const PatientProfile: React.FC = () => {
    const { user } = useAuth();
    const patient = user as Patient;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: patient.name,
        email: patient.email,
        phone: patient.phone || '',
        address: patient.address || '',
    });

    const handleSave = () => {
        // In a real app, this would call an API
        alert('Profile updated successfully!');
        setIsEditing(false);
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your personal and medical information</p>
                </div>

                {/* Profile Header */}
                <Card>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {patient.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                            <p className="text-gray-600">{patient.email}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Patient ID: {patient.id}
                            </p>
                        </div>
                        <Button
                            variant={isEditing ? 'secondary' : 'primary'}
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </div>
                </Card>

                {/* Personal Information */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            icon={<User className="w-5 h-5" />}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Email"
                            type="email"
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Phone"
                            icon={<Phone className="w-5 h-5" />}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                            <div className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg bg-gray-50">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-700">{patient.dateOfBirth || 'Not set'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Input
                            label="Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                </Card>

                {/* Medical Information */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <Droplet className="w-4 h-4" />
                                <span className="font-medium">Blood Group</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                                {patient.bloodGroup || 'Not specified'}
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <Shield className="w-4 h-4" />
                                <span className="font-medium">Allergies</span>
                            </div>
                            <p className="text-gray-900">
                                {patient.allergies && patient.allergies.length > 0
                                    ? patient.allergies.join(', ')
                                    : 'None reported'}
                            </p>
                        </div>
                    </div>

                    {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Chronic Conditions</h4>
                            <div className="flex flex-wrap gap-2">
                                {patient.chronicConditions.map((condition, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                                    >
                                        {condition}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>

                {/* Emergency Contact */}
                {patient.emergencyContact && (
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-medium text-gray-900">{patient.emergencyContact.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Relationship</p>
                                <p className="font-medium text-gray-900">{patient.emergencyContact.relationship}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-medium text-gray-900">{patient.emergencyContact.phone}</p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};
