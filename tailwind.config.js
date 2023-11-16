/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: []
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      custom: ['Josefin Sans', 'Open Sans', 'sans'], 
    },
    extend: {
      backgroundSize: {
        'size-50': '50% auto', 
        'size-100': '100% auto', 
        'size-200': '200% auto', 
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-50': '50% 0%', 
        'pos-100': '100% 0%', 
      },
      boxShadow: {
        'custom': 'inset 0 0 0 30px #ADD8E6',
      },
      fontFamily: {
        custom: ['Josefin Sans', 'sans'], 
        open: ['Open Sans', 'sans'],
      },
      colors: {
        'light-pink': '#f2f5eb',
        'light-purple': '#96a4c1',
        'light-purple2': '#9154D2',
        'medium-purple': '#624fa1',
        'dark-purple': '#322852',
        'super-purple': "#A475F0",
        'super-dark-purple': "#443163",
        'medium-light-purple': '#7956B0',
        'bold-medium-purple' : '#5E438A'
      }
      
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms')],
}
