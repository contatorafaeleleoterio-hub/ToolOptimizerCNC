/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        'bg-primary': '#0f1419',
        'bg-secondary': '#1a2332',
        'bg-card': '#1e2936',
        'bg-input': 'rgba(255,255,255,0.05)',

        // Status colors (Feature C Validation)
        'status-ok': '#2ecc71',
        'status-warning': '#f39c12',
        'status-danger': '#e74c3c',

        // Interaction
        'primary-blue': '#3498db',

        // Text
        'text-primary': '#ecf0f1',
        'text-secondary': '#bdc3c7',
        'text-muted': '#95a5a6',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Courier New', 'Consolas', 'monospace'],
      },
      fontSize: {
        'result-main': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'result-secondary': ['1.125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body': ['0.9375rem', { lineHeight: '1.5', fontWeight: '400' }],
        'hint': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      borderRadius: {
        'card': '12px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
      },
      minWidth: {
        'dashboard': '1360px',
      },
      gridTemplateColumns: {
        'dashboard': '360px 1fr 300px',
        'dashboard-collapsed': '360px 1fr 20px',
      },
    },
  },
  plugins: [],
}
