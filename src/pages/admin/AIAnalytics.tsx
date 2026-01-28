import React from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';
import { PieChart } from '../../components/charts/PieChart';
import { Brain, Target, Clock, TrendingUp } from 'lucide-react';
import { aiAnalytics } from '../../utils/mockAdminData';

export const AIAnalytics: React.FC = () => {
    const { symptomChecker, doctorRecommendations, performanceMetrics } = aiAnalytics;

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">AI & Analytics</h1>
                    <p className="text-gray-600">Monitor AI performance and insights</p>
                </div>

                {/* AI Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Brain className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total AI Checks</p>
                                <p className="text-2xl font-bold text-gray-900">{symptomChecker.totalChecks.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Accuracy Rate</p>
                                <p className="text-2xl font-bold text-green-600">{symptomChecker.accuracyRate}%</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Success Rate</p>
                                <p className="text-2xl font-bold text-blue-600">{doctorRecommendations.successRate}%</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Wait Time</p>
                                <p className="text-2xl font-bold text-yellow-600">18 min</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BarChart
                        title="Common Symptoms"
                        data={symptomChecker.commonSymptoms}
                        dataKeys={[{ key: 'count', color: '#87CEEB', name: 'Occurrences' }]}
                        xAxisKey="symptom"
                        height={300}
                    />
                    <PieChart
                        title="Severity Distribution"
                        data={symptomChecker.severityDistribution}
                        colors={['#10B981', '#F59E0B', '#EF4444', '#7C3AED']}
                        height={300}
                    />
                </div>

                {/* Doctor Recommendation Performance */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor Recommendation Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Specialization</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Recommendations</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Success Rate</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Performance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {doctorRecommendations.topSpecializations.map((spec, idx) => (
                                    <tr key={idx}>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{spec.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{spec.count}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-green-600">{spec.successRate}%</td>
                                        <td className="px-4 py-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{ width: `${spec.successRate}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Performance Trends */}
                <LineChart
                    title="Patient Satisfaction Trend"
                    data={performanceMetrics.patientSatisfactionTrend}
                    dataKeys={[{ key: 'score', color: '#10B981', name: 'Satisfaction Score' }]}
                    xAxisKey="month"
                    height={280}
                />
            </div>
        </Layout>
    );
};
