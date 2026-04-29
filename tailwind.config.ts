import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff9f7",
          100: "#fdf1ec",
          200: "#f8dfd6",
          300: "#efc5ba",
          400: "#d9a69d",
          500: "#bf847d",
          600: "#9d655f",
        },
        olive: {
          100: "#edf2ea",
          200: "#d9e3d2",
          300: "#b3c4a7",
          500: "#6d7f68",
          700: "#4a5a47",
        },
        stoneink: "#43372f",
        parchment: "#fcf6ef",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(73, 52, 42, 0.14)",
      },
      fontFamily: {
        display: ["Baskerville", "Times New Roman", "serif"],
        body: ["Avenir Next", "Segoe UI", "sans-serif"],
        script: ["Snell Roundhand", "Brush Script MT", "cursive"],
      },
      backgroundImage: {
        "lake-mist":
          "radial-gradient(circle at top, rgba(249, 219, 227, 0.55), transparent 30%), radial-gradient(circle at 20% 20%, rgba(214, 226, 209, 0.55), transparent 25%), linear-gradient(180deg, rgba(255,250,245,0.98), rgba(249,240,232,0.95))",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        rise: "rise 900ms ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
