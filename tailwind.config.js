/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr',
        aside: '1fr auto',
      },
      colors: {
        'twitter-blue': '#1DA1F2',
        'twitter-pink': '#F91980',
        'notion-red': '#EB5757',
      },
    },
  },
  plugins: [],
}
