/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
        oranj: "#ff7502",
        greey: "#23292E",
        greeny: "#87c423",
        silvery: "#dce9eb"
      },
    },
  },
  plugins: [],
};
