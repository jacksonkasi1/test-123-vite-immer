/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ffbfae',
          200: '#feaf9a',
          300: '#fea087',
          400: '#fe9173',
          500: '#fe8160',
          600: '#fe724c',
          700: '#fe6338',
          800: '#fe5325',
          900: '#fe4411'
        },
        white_: 'white',
        black_:  'black',
        dark_: '#111827',
        mid_dark_: '#E4E7EC',
        light_: '#f3f4f6'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}

