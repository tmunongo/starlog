/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"'],
        montserrat: ["Montserrat"],
      },
      backgroundImage: {
        "hero-dark": "url('../../assets/banner-dark.svg')",
        "hero-light": "url('../../assets/banner-light.svg')",
      },
      colors: {
        seashell: "#FFF3F0",
        mintgreen: "#EDF4ED",
        myr: "#FFBA49",
        babypowder: "#F0F4EF",
        greey: "#282929",
        silvery: "#243F56",
        // colors done right
        bg_light_primary: "#F4F4F6",
        bg_dark_primary: "#1B2937",
        bg_light_secondary: "#E9E9ED",
        bg_dark_secondary: "#223344",
        text_light_primary: "#252627",
        text_dark_primary: "#E8E2D9",
        text_light_secondary: "#3B3D3F",
        text_dark_secondary: "#BBCCDD",
        highlights_dark: "#ff7502",
        highlights_light: "#034732",
        // buttons dark
        oranj: "#ff7502",
        // buttons light
        greeny: "#87c423",
        // subtext
        subtext: "#E7E5DF",
      },
    },
  },
  plugins: [],
};
