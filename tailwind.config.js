/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('../../assets/luca-bravo-O453M2Liufs-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
