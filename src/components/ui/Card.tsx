import React from 'react';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    noPadding?: boolean;
    gradient?: 'primary' | 'success' | 'warning' | 'info' | 'none';
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    noPadding = false,
    gradient = 'none',
    glass = false,
    ...props
}) => {
    const gradientClasses = {
        primary: 'gradient-primary text-white',
        success: 'gradient-success text-white',
        warning: 'gradient-warning text-white',
        info: 'gradient-info text-white',
        none: 'bg-white'
    };

    return (
        <div
            className={`
        rounded-xl 
        ${gradientClasses[gradient]}
        ${!noPadding ? 'p-6' : ''}
        ${glass ? 'glass' : 'shadow-smooth'}
        ${hover ? 'hover-lift cursor-pointer' : ''}
        border border-gray-100
        animate-fade-in
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};
