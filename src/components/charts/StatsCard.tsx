import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor = 'bg-primary-100',
  iconColor = 'text-primary-600',
}) => {
  return (
    <Card hover className="transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value > 0 ? (
                <TrendingUp className={`w-4 h-4 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`} />
              ) : trend.value < 0 ? (
                <TrendingDown className={`w-4 h-4 ${trend.isPositive ? 'text-red-600' : 'text-green-600'}`} />
              ) : (
                <Minus className="w-4 h-4 text-gray-600" />
              )}
              <span className={`text-sm font-medium ${
                trend.value > 0 
                  ? (trend.isPositive ? 'text-green-600' : 'text-red-600')
                  : trend.value < 0
                  ? (trend.isPositive ? 'text-red-600' : 'text-green-600')
                  : 'text-gray-600'
              }`}>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} ${iconColor} p-4 rounded-lg`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
