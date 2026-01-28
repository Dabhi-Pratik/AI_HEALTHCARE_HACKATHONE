import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Eye, Download, Mail } from 'lucide-react';
import { mockPatients, mockAppointments } from '../../utils/mockData';

export const PatientManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const patients = mockPatients;

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getPatientStats = (patientId: string) => {
        const appointments = mockAppointments.filter(apt => apt.patientId === patientId);
        return {
            total: appointments.length,
            completed: appointments.filter(apt => apt.status === 'completed').length,
            upcoming: appointments.filter(apt => apt.status === 'scheduled').length,
        };
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h1>
                    <p className="text-gray-600">Manage and monitor all patients in the system</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{patients.length}</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">Active Today</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">127</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">New This Month</p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">89</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-gray-600">AI Checks Used</p>
                        <p className="text-3xl font-bold text-purple-600 mt-1">3,847</p>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Search by name, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">All Patients</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            More Filters
                        </Button>
                    </div>
                </Card>

                {/* Patients Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Patient
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Appointments
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        AI Checks
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPatients.map((patient) => {
                                    const stats = getPatientStats(patient.id);
                                    return (
                                        <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{patient.name}</p>
                                                        <p className="text-sm text-gray-500">ID: {patient.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-sm text-gray-900">{patient.phone}</p>
                                                <p className="text-sm text-gray-500">{patient.email}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <p className="text-sm text-gray-900">Total: {stats.total}</p>
                                                <p className="text-sm text-green-600">Completed: {stats.completed}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                    {Math.floor(Math.random() * 15)} checks
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                                                        <Eye className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Send Email">
                                                        <Mail className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Download Records">
                                                        <Download className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
