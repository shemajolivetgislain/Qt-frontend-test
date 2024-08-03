/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteTheme: {
          primaryColor: "#03284C",
          secondColor: "#ffffff",
          accentColor: "#E7F0FE",
          lightAccent: "#F6FAF9",
          darkOrange: "#887300",
          darkRed: "#880008",
          textColor: "#000000",
        },
      },
    },
  },
  plugins: [],
};
