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
        ['gray-primary']: '#292F3F',
        ['gray-primary-light']: '#373E4E',
        ['gray-primary-dark']: '#272A35',
        chatAppGray: {
          100: '#242D34',
          200: '#2f3b45',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
