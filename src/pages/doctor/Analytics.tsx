import React from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';
import { Activity, Users, Clock, TrendingDown } from 'lucide-react';
import { doctorAnalytics, doctorStats } from '../../utils/mockDoctorData';

export const DoctorAnalytics: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Performance</h1>
                    <p className="text-gray-600">Track your performance metrics and patient insights</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <div className="flex items-center gap-3">
                            <Activity className="w-8 h-8 text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">Weekly Patients</p>
                                <p className="text-2xl font-bold text-gray-900">154</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">Total Patients</p>
                                <p className="text-2xl font-bold text-green-600">{doctorStats.totalPatients}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <Clock className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Avg Consult</p>
                                <p className="text-2xl font-bold text-blue-600">{doctorStats.avgConsultationTime} min</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <TrendingDown className="w-8 h-8 text-yellow-600" />
                            <div>
                                <p className="text-sm text-gray-600">No-Show Rate</p>
                                <p className="text-2xl font-bold text-yellow-600">{doctorStats.noShowPrediction}%</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BarChart
                        title="Patients Per Day (This Week)"
                        data={doctorAnalytics.patientsPerDay}
                        dataKeys={[{ key: 'patients', color: '#87CEEB', name: 'Patients' }]}
                        xAxisKey="day"
                        height={280}
                    />
                    <LineChart
                        title="Avg Consultation Time (Weekly Trend)"
                        data={doctorAnalytics.consultationTime}
                        dataKeys={[{ key: 'time', color: '#10B981', name: 'Minutes' }]}
                        xAxisKey="week"
                        height={280}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LineChart
                        title="No-Show Rate Trend"
                        data={doctorAnalytics.noShowRate}
                        dataKeys={[{ key: 'rate', color: '#EF4444', name: 'No-Show %' }]}
                        xAxisKey="month"
                        height={280}
                    />
                    <BarChart
                        title="Peak Hours Distribution"
                        data={doctorAnalytics.peakHours}
                        dataKeys={[{ key: 'patients', color: '#8B5CF6', name: 'Patients' }]}
                        xAxisKey="hour"
                        height={280}
                    />
                </div>

                {/* Performance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="text-center py-4">
                            <p className="text-sm font-medium text-green-800 mb-2">Patient Satisfaction</p>
                            <p className="text-4xl font-bold text-green-900">{doctorStats.avgRating}/5</p>
                            <p className="text-sm text-green-700 mt-2">⭐ Excellent Rating</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="text-center py-4">
                            <p className="text-sm font-medium text-blue-800 mb-2">Completed This Month</p>
                            <p className="text-4xl font-bold text-blue-900">327</p>
                            <p className="text-sm text-blue-700 mt-2">+12% vs last month</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="text-center py-4">
                            <p className="text-sm font-medium text-purple-800 mb-2">Follow-up Rate</p>
                            <p className="text-4xl font-bold text-purple-900">94%</p>
                            <p className="text-sm text-purple-700 mt-2">Above average</p>
                        </div>
                    </Card>
                </div>

                {/* Insights */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
                    <div className="space-y-3">
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <p className="text-sm font-medium text-blue-900">💡 Peak Performance</p>
                            <p className="text-sm text-blue-700 mt-1">Your consultation efficiency is highest between 3-5 PM. Consider scheduling complex cases during this time.</p>
                        </div>
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                            <p className="text-sm font-medium text-yellow-900">⚠️ No-Show Pattern</p>
                            <p className="text-sm text-yellow-700 mt-1">Monday morning appointments have a 15% higher no-show rate. AI suggests sending extra reminders.</p>
                        </div>
                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                            <p className="text-sm font-medium text-green-900">✅ Achievement Unlocked</p>
                            <p className="text-sm text-green-700 mt-1">You've maintained a 4.8+ rating for 6 consecutive months! Patients appreciate your thoroughness.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
