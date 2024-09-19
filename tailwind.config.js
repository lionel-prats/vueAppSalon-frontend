/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors") // tema de colores de Vue Tailwind Datepicker (v425)

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js", // compilamos los estilos de Vue Tailwind Datepicker (v425)
  ],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      backgroundImage: { // con esto creo la clase "bg-app" (v410)
        "app": "url('/img/1.jpg')"
      },
      colors: { // configuracion de Vue Tailwind Datepicker (v425)
        "vtd-primary": colors.blue
      }
    },
  },
  plugins: [],
}

