import React from 'react';
import { Layout } from '../../components/Layout';
import { StatsCard } from '../../components/charts/StatsCard';
import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { BarChart } from '../../components/charts/BarChart';
import { Card } from '../../components/ui/Card';
import {
    Users,
    UserCheck,
    Building2,
    Calendar,
    Clock,
    XCircle,
    AlertCircle,
    TrendingUp,
    Activity,
} from 'lucide-react';
import { adminAnalytics, systemAlerts, recentActivity } from '../../utils/mockAdminData';

export const AdminDashboard: React.FC = () => {
    const { overview, trends, dailyAppointments, departmentDistribution, weeklyPerformance } = adminAnalytics;

    const departmentColors = ['#87CEEB', '#60A5FA', '#3B82F6', '#2563EB', '#1E40AF', '#1E3A8A'];

    const unreadAlerts = systemAlerts.filter(alert => !alert.isRead);

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome to your hospital management control center</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Patients"
                        value={overview.totalPatients.toLocaleString()}
                        icon={<Users className="w-8 h-8" />}
                        trend={{ value: trends.patientsGrowth, isPositive: true }}
                        bgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                    <StatsCard
                        title="Total Doctors"
                        value={overview.totalDoctors}
                        icon={<UserCheck className="w-8 h-8" />}
                        trend={{ value: trends.doctorsGrowth, isPositive: true }}
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                    />
                    <StatsCard
                        title="Clinics/Departments"
                        value={overview.totalClinics}
                        icon={<Building2 className="w-8 h-8" />}
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                    />
                    <StatsCard
                        title="Today's Appointments"
                        value={overview.todayAppointments}
                        icon={<Calendar className="w-8 h-8" />}
                        trend={{ value: trends.appointmentsGrowth, isPositive: true }}
                        bgColor="bg-yellow-100"
                        iconColor="text-yellow-600"
                    />
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Active Queues"
                        value={overview.activeQueues}
                        icon={<Activity className="w-7 h- 7" />}
                        bgColor="bg-indigo-100"
                        iconColor="text-indigo-600"
                    />
                    <StatsCard
                        title="Missed Appointments"
                        value={overview.missedAppointments}
                        icon={<XCircle className="w-7 h-7" />}
                        bgColor="bg-red-100"
                        iconColor="text-red-600"
                    />
                    <StatsCard
                        title="Avg Wait Time"
                        value={`${overview.avgWaitTime} min`}
                        icon={<Clock className="w-7 h-7" />}
                        bgColor="bg-orange-100"
                        iconColor="text-orange-600"
                    />
                    <StatsCard
                        title="Patient Satisfaction"
                        value={`${overview.patientSatisfaction}/5`}
                        icon={<TrendingUp className="w-7 h-7" />}
                        trend={{ value: trends.satisfactionGrowth, isPositive: true }}
                        bgColor="bg-teal-100"
                        iconColor="text-teal-600"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Appointments Trend */}
                    <LineChart
                        title="Weekly Appointment Trends"
                        data={dailyAppointments}
                        dataKeys={[
                            { key: 'appointments', color: '#87CEEB', name: 'Total' },
                            { key: 'completed', color: '#10B981', name: 'Completed' },
                            { key: 'cancelled', color: '#EF4444', name: 'Cancelled' },
                        ]}
                        xAxisKey="date"
                        height={280}
                    />

                    {/* Department Distribution */}
                    <PieChart
                        title="Department Distribution"
                        data={departmentDistribution}
                        colors={departmentColors}
                        height={280}
                    />
                </div>

                {/* Weekly Performance */}
                <BarChart
                    title="Monthly Performance Overview"
                    data={weeklyPerformance}
                    dataKeys={[
                        { key: 'appointments', color: '#87CEEB', name: 'Appointments' },
                        { key: 'satisfaction', color: '#10B981', name: 'Satisfaction (x100)' },
                    ]}
                    xAxisKey="week"
                    height={280}
                />

                {/* Alerts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* AI Alerts Panel */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                                System Alerts
                            </h3>
                            {unreadAlerts.length > 0 && (
                                <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                                    {unreadAlerts.length} New
                                </span>
                            )}
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {systemAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`p-4 rounded-lg border-l-4 ${alert.type === 'error' ? 'border-red-500 bg-red-50' :
                                            alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                                                alert.type === 'success' ? 'border-green-500 bg-green-50' :
                                                    'border-blue-500 bg-blue-50'
                                        } ${!alert.isRead ? 'ring-2 ring-gray-200' : ''}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm">{alert.title}</h4>
                                            <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {!alert.isRead && (
                                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-600">{activity.user}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* System Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="text-center">
                            <p className="text-sm font-medium text-green-800 mb-2">System Uptime</p>
                            <p className="text-3xl font-bold text-green-900">{overview.systemUptime}%</p>
                            <p className="text-xs text-green-700 mt-1">All systems operational</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="text-center">
                            <p className="text-sm font-medium text-blue-800 mb-2">AI Model Status</p>
                            <p className="text-3xl font-bold text-blue-900">v2.1</p>
                            <p className="text-xs text-blue-700 mt-1">Latest version active</p>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="text-center">
                            <p className="text-sm font-medium text-purple-800 mb-2">Data Sync</p>
                            <p className="text-3xl font-bold text-purple-900">Live</p>
                            <p className="text-xs text-purple-700 mt-1">Last sync: 2 min ago</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};
