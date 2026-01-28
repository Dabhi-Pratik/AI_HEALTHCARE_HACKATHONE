import React from 'react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { PieChart } from '../../components/charts/PieChart';
import { BarChart } from '../../components/charts/BarChart';
import { Smartphone, MessageCircle, Phone, Monitor } from 'lucide-react';
import { channelStats } from '../../utils/mockAdminData';

export const ChannelMonitoring: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-Channel Access</h1>
                    <p className="text-gray-600">Monitor all patient interaction channels</p>
                </div>

                {/* Channel Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Card>
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Mobile App</p>
                                <p className="text-2xl font-bold">6,789</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <MessageCircle className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">WhatsApp</p>
                                <p className="text-2xl font-bold">4,523</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <Phone className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="text-sm text-gray-600">IVR Calls</p>
                                <p className="text-2xl font-bold">2,845</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <Monitor className="w-8 h-8 text-yellow-600" />
                            <div>
                                <p className="text-sm text-gray-600">Kiosk</p>
                                <p className="text-2xl font-bold">1,690</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PieChart
                        title="Channel Distribution"
                        data={channelStats.byChannel}
                        colors={['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']}
                        height={300}
                    />
                    <BarChart
                        title="Hourly Usage Pattern"
                        data={channelStats.hourlyUsage}
                        dataKeys={[
                            { key: 'app', color: '#3B82F6', name: 'App' },
                            { key: 'whatsapp', color: '#10B981', name: 'WhatsApp' },
                            { key: 'ivr', color: '#8B5CF6', name: 'IVR' },
                            { key: 'kiosk', color: '#F59E0B', name: 'Kiosk' },
                        ]}
                        xAxisKey="hour"
                        height={300}
                    />
                </div>

                {/* Channel Performance */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(channelStats.channelPerformance).map(([channel, metrics]) => (
                            <div key={channel} className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 capitalize mb-3">{channel}</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking Success:</span>
                                        <span className="font-semibold text-green-600">{metrics.bookingSuccessRate}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Satisfaction:</span>
                                        <span className="font-semibold text-blue-600">{metrics.satisfaction}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Avg Time:</span>
                                        <span className="font-semibold text-purple-600">{metrics.avgTime}s</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
