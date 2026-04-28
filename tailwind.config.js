/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#050816',
          900: '#080d21',
          800: '#111936',
        },
        electric: {
          blue: '#00A3FF',
          cyan: '#37D7FF',
        },
        panda: {
          gold: '#F8C14A',
          amber: '#FFB020',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Almarai', 'system-ui', 'sans-serif'],
        display: ['Almarai', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 163, 255, 0.14)',
        gold: '0 16px 40px rgba(248, 193, 74, 0.18)',
      },
      backgroundImage: {
        'midnight-radial': 'radial-gradient(circle at top right, rgba(0, 163, 255, 0.20), transparent 32%), radial-gradient(circle at bottom left, rgba(248, 193, 74, 0.16), transparent 30%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass-panel': {
          background: 'rgba(255, 255, 255, 0.10)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        },
        '.glass-panel-strong': {
          background: 'rgba(255, 255, 255, 0.14)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        },
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      });
    },
  ],
};
