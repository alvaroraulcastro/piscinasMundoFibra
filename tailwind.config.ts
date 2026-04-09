import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0f7ff",
          100: "#b3ecff",
          200: "#80dfff",
          300: "#4dd2ff",
          400: "#26c7ff",
          500: "#00bcff",
          600: "#0099cc",
          700: "#007399",
          800: "#004d66",
          900: "#002633",
        },
        brand: {
          blue: "#0057a8",
          cyan: "#00c8e0",
          dark: "#003d6b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-pool": "linear-gradient(135deg, #003d6b 0%, #0057a8 40%, #00c8e0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
