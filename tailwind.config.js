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
        'bg-tertiary': '#1e2936',
        'bg-input': 'rgba(255,255,255,0.06)',

        // Status colors
        'status-ok': '#22c55e',
        'status-warning': '#f59e0b',
        'status-danger': '#ef4444',

        // Interaction
        'color-info': '#3b82f6',

        // Text
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
      },
      screens: {
        'mobile': '320px',
        'tablet': '600px',
        'desktop-sm': '900px',
        'desktop': '1200px',
        'desktop-lg': '1600px',
      },
    },
  },
  plugins: [],
}
