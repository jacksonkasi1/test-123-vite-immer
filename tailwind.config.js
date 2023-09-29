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
          50: '#ffebe0',
          100: '#ffc7b0',
          200: '#ff9f7f',
          300: '#fe734d',
          400: '#fd5b1c',
          500: '#e35103',
          600: '#fd5b1c',
          700: '#803d00',
          800: '#4e2900',
          900: '#1f0f00',
          DEFAULT: "#FE724C",
          foreground: "#ffffff",
        },
        white_: 'white',
        black_: 'black',
        dark_: '#111827',
        mid_dark_: '#E4E7EC',
        light_dark_: '#1F2937',
        light_: '#f3f4f6',
        dark_border: '#374151',
        text_dark: '#ACB0B7',
        text_light: '#6b7280',
        mid_light_dark: '#1F2937',
        primary_white:"#fff",
        danger: '#FE2129',  
      },
    },
  },
  plugins: [
 
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

       nextui(
      {
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#120806",
            primary: {
              50: '#ffebe0',
              100: '#ffc7b0',
              200: '#ff9f7f',
              300: '#fe734d',
              400: '#fd5b1c',
              500: '#e35103',
              600: '#fd5b1c',
              700: '#803d00',
              800: '#4e2900',
              900: '#1f0f00',
              DEFAULT: "#FE724C",
              foreground: "#ffffff",
            },
            focus: "#FE724C",
          },
        },
      },
    }),
  ],
};
