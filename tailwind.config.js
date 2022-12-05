/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('../../assets/luca-bravo-O453M2Liufs-unsplash.jpg')",
      },
      colors: {
        seashell: "#FFF3F0",
        mintgreen: "#EDF4ED",
        myr: "#FFBA49",
        babypowder: "#F0F4EF",
      },
    },
  },
  plugins: [],
};
