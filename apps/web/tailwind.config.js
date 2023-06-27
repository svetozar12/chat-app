const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '../../libs/web/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        chatAppGray: {
          100: '#242D34',
          200: '#2f3b45',
        },
      },
    },
  },
  plugins: [],
};
