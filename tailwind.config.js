/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#080B12',
        panel: '#111827',
        surface: '#161F2E',
        cyanGlow: '#38bdf8',
      },
      boxShadow: {
        keyboard: '0 9px 0 #080B12, 0 16px 28px rgba(0, 0, 0, 0.28)',
        glass: '0 18px 60px rgba(0, 0, 0, 0.28)',
        soft: '0 16px 45px rgba(0, 0, 0, 0.24)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 18% 14%, rgba(56, 189, 248, 0.08), transparent 30%), linear-gradient(135deg, #080B12 0%, #0B1120 52%, #080B12 100%)',
      },
    },
  },
  plugins: [],
};
