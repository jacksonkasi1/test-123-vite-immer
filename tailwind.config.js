const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;
const safeListFile = 'safelist.txt';
const { nextui } = require('@nextui-org/react');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './safelist.txt',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      inter: ['Inter'],
    },
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            maxWidth: '65ch',
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.400'),
          },
        },
      }),
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
          900: '#fe4411',
        },
        white_: 'white',
        black_: 'black',
        dark_: '#111827',
        mid_dark_: '#E4E7EC',
        light_dark_: '#1F2937',
        light_: '#f3f4f6',
        dark_border: '#374151',
        text_dark: '#ACB0B7',
      },
    },
  },
  plugins: [
    nextui(), 
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
    // If your application does not require multiple theme selection,
    // you can replace {color} to your theme color value
    // this can drastically reduces the size of the output css file
    // e.g 'text-{colors}' --> 'text-emerald'
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
        'fill-{colors}',
      ],
    }),
    require('@tailwindcss/typography'),
  ],
};
