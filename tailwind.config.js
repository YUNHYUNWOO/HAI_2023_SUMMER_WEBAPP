/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'HAI_blue': {
        light : '#2F5FBF',
        middle : "#263D99",
        heavy : '#121D49'
      },
      'white': '#ffffff',
      'black' : '#000000',
      'text_gray' : '#646464',
      'text_alertRed' : '#FC0000',
      'bg_gray' : '#D9D9D9'
    }
  },
  daisyui: {
      themes: [
        {
          mytheme: {
          
 "primary": "#121D49",
          
 "secondary": "#2F55DF",
          
 "accent": "#91add8",
          
 "neutral": "#312932",
          
 "base-100": "#ffffff",
          
 "info": "#646464",
          
 "success": "#207e59",
          
 "warning": "#af7312",
          
 "error": "#f2182d",
          },
        },
      ],
    },
  plugins: [require("@tailwindcss/line-clamp"), require('daisyui')],
}

