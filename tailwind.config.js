export default {
  content: ['./index.html', './src/**/*.{svelte,js}'],
  theme: {
    extend: {
      keyframes: {
        'modal-entrada': {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fundo-entrada': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'modal-entrada': 'modal-entrada 0.25s ease-out',
        'fundo-entrada': 'fundo-entrada 0.25s ease-out',
      },
    },
  },
  plugins: [],
}