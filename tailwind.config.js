const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2rem',
        '2xl': '4rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      colors: {
        dark: {
          background: '#0f172a', // slate-900
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        midnight: '#0f172a',
      },
      boxShadow: {
        glow: '0 25px 45px -20px rgba(99,102,241,0.5)',
        card: '0 20px 45px -24px rgba(15,23,42,0.35)',
      },
      borderRadius: { '3xl': '1.75rem', '4xl': '2.25rem' },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-links': theme('colors.brand[600]'),
            '--tw-prose-bold': theme('colors.slate[900]'),
            // Invert colors for dark mode
            '--tw-prose-invert-body': theme('colors.slate[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.brand[400]'),
            '--tw-prose-invert-bold': theme('colors.white'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
