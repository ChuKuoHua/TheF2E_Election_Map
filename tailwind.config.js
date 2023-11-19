/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    screens: {
      xs: '270px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        main: {
          100: '#DFDFDF',
          200: '#B8B8B8',
          300: '#8D8D8D',
          400: '#707070',
          500: '#5E5E5E',
          600: '#333333',
          700: '#344340',
          800: '#2C3735',
          900: '#474747'
        },
        dpp: '#58AC6F',
        kmt: '#4889C1',
        pfp: '#F2854A'
      },
      fontSize: {
        h1: '40px',
        h2: '30px',
        h3: '26px'
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(dpp|kmt|pfp)/
    }
  ]
}
