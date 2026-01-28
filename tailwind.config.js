/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E0F4FF',
          100: '#B0E0E6',
          200: '#87CEEB',
          300: '#5FB8DC',
          400: '#3FA3CD',
          500: '#2B8EBE',
          600: '#1E7AAF',
          700: '#15659F',
          800: '#0E5190',
          900: '#083D81',
        },
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          light: '#E0F4FF',
          DEFAULT: '#87CEEB',
          dark: '#5FB8DC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': '16px',
        'body-lg': '18px',
        'heading': '24px',
        'heading-lg': '32px',
      },
      spacing: {
        'touch': '44px', // Minimum touch target size
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
