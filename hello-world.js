/** @type {import('tailwindcss').Config} */

const safeListFile = './safelist.txt'

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
  plugins: [
    require('tailwind-safelist-generator')({
      path: safeListFile,
      patterns: [
        'text-{colors}',
        'bg-{colors}',
        'dark:bg-{colors}',
        'dark:hover:bg-{colors}',
        'dark:active:bg-{colors}',
        'hover:text-{colors}',
        'hover:bg-{colors}',
        'active:bg-{colors}',
        'ring-{colors}',
        'hover:ring-{colors}',
        'focus:ring-{colors}',
        'focus-within:ring-{colors}',
        'border-{colors}',
        'focus:border-{colors}',
        'focus-within:border-{colors}',
        'dark:text-{colors}',
        'dark:hover:text-{colors}',
        'h-{height}',
        'w-{width}',
      ],
    }),
    require('@tailwindcss/typography')
  ],
  darkMode: 'class'
}

