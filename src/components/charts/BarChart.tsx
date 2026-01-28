import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

interface BarChartProps {
    title: string;
    data: any[];
    dataKeys: {
        key: string;
        color: string;
        name: string;
    }[];
    xAxisKey: string;
    height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
    title,
    data,
    dataKeys,
    xAxisKey,
    height = 300,
}) => {
    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey={xAxisKey}
                        stroke="#6B7280"
                        style={{ fontSize: '14px' }}
                    />
                    <YAxis
                        stroke="#6B7280"
                        style={{ fontSize: '14px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend />
                    {dataKeys.map((item) => (
                        <Bar
                            key={item.key}
                            dataKey={item.key}
                            fill={item.color}
                            name={item.name}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </Card>
    );
};
