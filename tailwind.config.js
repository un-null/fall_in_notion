/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      // screens: {
      //   xs: '430px',
      //   ...defaultTheme.screens,
      // },
    },
  },
  plugins: [],
}
