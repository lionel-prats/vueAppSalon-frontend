/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {},
  // },
  theme: {
    extend: {
      backgroundImage: { // con esto creo la clase "bg-app" (v410)
        "app": "url('/img/1.jpg')"
      }
    },
  },
  plugins: [],
}

