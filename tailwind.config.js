/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
