module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'], // Adding Nunito to Tailwind
        lato: ['Lato', 'sans-serif'], // Adding Lato font family

      },
    },
  },
  plugins: [],
}
