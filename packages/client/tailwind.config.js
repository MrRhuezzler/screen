/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pops: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        4: "4 4 0%",
      },
    },
  },
  plugins: [],
};
