module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
      },
      black: "#27272a",
      white: "#ffffff",
      red: "#ef4444",
      blue: "#0284c7",
      grayDark: "#273444",
      gray: "#6b7280",
      slate: {
        100: "#f1f5f9",
        50: "#fafafa",
      },
      grayLight: "#9ca3af",
      zinc: "#f4f4f5",
    },

    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1136px" },
      // => @media (max-width: 1023px) { ... }

      miniLaptop: { max: "1058px" },
      tablet: { max: "944px" },
      mobile: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "small-mobile": { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    // ...defaultTheme.screens,
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
