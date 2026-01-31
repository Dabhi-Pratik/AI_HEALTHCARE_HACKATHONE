/**
 * Currency Formatter Utility
 * Formats amounts in Indian Rupee (INR) using Indian number system
 */

/**
 * Format a number as Indian Rupee currency
 * Uses Indian numbering system (lakhs, crores)
 * 
 * @param amount - The amount to format
 * @param showDecimals - Whether to show decimal places (default: false for whole rupees)
 * @returns Formatted currency string with ₹ symbol
 * 
 * @example
 * formatCurrency(1500) // "₹1,500"
 * formatCurrency(150000) // "₹1,50,000"
 * formatCurrency(1500000) // "₹15,00,000"
 * formatCurrency(1500.50, true) // "₹1,500.50"
 */
export const formatCurrency = (amount: number, showDecimals: boolean = false): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(amount);
};

/**
 * Format amount as compact rupee notation (for charts/summaries)
 * 
 * @param amount - The amount to format
 * @returns Compact format like "₹1.5K", "₹1.2L", "₹1.5Cr"
 * 
 * @example
 * formatCurrencyCompact(1500) // "₹1.5K"
 * formatCurrencyCompact(150000) // "₹1.5L"
 * formatCurrencyCompact(15000000) // "₹1.5Cr"
 */
export const formatCurrencyCompact = (amount: number): string => {
    if (amount >= 10000000) {
        // Crores (1,00,00,000)
        return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
        // Lakhs (1,00,000)
        return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
        // Thousands
        return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount}`;
};

/**
 * Get the rupee symbol
 * @returns Indian Rupee symbol ₹
 */
export const RUPEE_SYMBOL = '₹';

/**
 * Get the currency code
 * @returns Currency code for Indian Rupee
 */
export const CURRENCY_CODE = 'INR';
