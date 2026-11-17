/** @type {import('tailwindcss').Config} */
const n = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        canvas: n('canvas'),
        panel: n('panel'),
        surface: n('surface'),
        neutral: {
          50: n('n50'),
          100: n('n100'),
          200: n('n200'),
          300: n('n300'),
          400: n('n400'),
          500: n('n500'),
          600: n('n600'),
          700: n('n700'),
          800: n('n800'),
          900: n('n900'),
          950: n('n950'),
        },
        white: n('n50'),
      },
      boxShadow: {
        keyboard: '0 6px 0 var(--key-edge), 0 14px 24px rgba(0, 0, 0, 0.08)',
        glass: '0 18px 50px rgba(0, 0, 0, 0.08)',
        soft: '0 12px 36px rgba(0, 0, 0, 0.07)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 18% 14%, rgba(var(--n900) / 0.04), transparent 32%), linear-gradient(160deg, rgb(var(--canvas)) 0%, rgb(var(--surface)) 55%, rgb(var(--canvas)) 100%)',
      },
    },
  },
  plugins: [],
};