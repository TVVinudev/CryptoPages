/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Poppins", "serif"],
        delius: ['Delius Swash Caps', 'cursive'],  // Add your font here
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}