/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        circular: ["Poppins", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        bianchigreen: "#35D0BA",
        bianchigreen_dark: "#1e8475",
      },
    },
  },
  plugins: [],
};
