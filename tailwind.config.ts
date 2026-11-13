import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#17191B",
          light: "#232629",
          dark: "#0E1011",
        },
        ivory: {
          DEFAULT: "#F3F0E9",
          light: "#F9F7F3",
          dark: "#E6E1D6",
        },
        concrete: {
          DEFAULT: "#A9A9A3",
          light: "#C5C5C0",
          dark: "#7A7A74",
        },
        bronze: {
          DEFAULT: "#A58B62",
          light: "#BFA67E",
          dark: "#88704B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        editorial: "0.18em",
        architectural: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
