/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#F7F5F0',
        obsidian: '#141517',
        terracotta: {
          DEFAULT: '#D95D39',
          50: '#FDF2EC',
          100: '#FBE3D6',
          200: '#F7C4AB',
          500: '#D95D39',
          600: '#C24D2B',
          700: '#9E3B1E',
        },
        sage: {
          DEFAULT: '#2E6F5E',
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#2E6F5E',
          600: '#24594A',
          700: '#1C4438',
        },
        slate: {
          600: '#5A5E66',
          700: '#43474F',
          800: '#2D3036',
          900: '#141517',
        },
        parchment: {
          50: '#FAF8F5',
          100: '#F7F5F0',
          200: '#E5E0D8',
          300: '#D5CEC3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'architectural': '0 1px 3px rgba(20, 21, 23, 0.04), 0 10px 25px -5px rgba(20, 21, 23, 0.05)',
        'architectural-hover': '0 20px 30px -10px rgba(20, 21, 23, 0.08), 0 1px 3px rgba(20, 21, 23, 0.04)',
        'glass': '0 8px 32px 0 rgba(20, 21, 23, 0.06)',
      }
    },
  },
  plugins: [],
}
