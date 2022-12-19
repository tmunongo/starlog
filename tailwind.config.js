/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "comic": ['"Comic Neue"'],
        "montserrat": ["Montserrat"],
      },
      backgroundImage: {
        "hero-dark": "url('../../public/assets/banner-dark.svg')",
        "hero-light": "url('../../public/assets/banner-light.svg')",
      },
      colors: {
        seashell: "#FFF3F0",
        mintgreen: "#EDF4ED",
        myr: "#FFBA49",
        babypowder: "#F0F4EF",
        oranj: "#ff7502",
        greey: "#282929",
        greeny: "#87c423",
        silvery: "#243F56",
        subtext: "#E7E5DF"
      },
    },
  },
  plugins: [],
};
