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
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
          DEFAULT: '#1565C0',
        },
        secondary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
          DEFAULT: '#2E7D32',
        },
        accent: {
          DEFAULT: '#42A5F5',
        },
        surface: '#FFFFFF',
        background: '#F5F7FA',
        textPrimary: '#1A1A2E',
        textSecondary: '#546E7A',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(21, 101, 192, 0.08)',
        'card-hover': '0 8px 30px rgba(21, 101, 192, 0.15)',
        button: '0 4px 15px rgba(21, 101, 192, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradientBG 8s ease infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientBG: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D47A1 0%, #1565C0 30%, #1976D2 60%, #0288D1 100%)',
        'card-gradient': 'linear-gradient(135deg, #1565C0 0%, #2E7D32 100%)',
        'green-gradient': 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
      },
    },
  },
  plugins: [],
}
