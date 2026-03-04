import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration for Tamil History Timeline
 *
 * Ink on Paper aesthetic - fonts and colors based on UI-PLAYGROUND-v7.html
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-display)", "Playfair Display", "serif"],
        tamil: ["var(--font-tamil)", "Noto Sans Tamil", "sans-serif"],
      },
      colors: {
        paper: {
          DEFAULT: "#f4efe6",
          dark: "#e8e0d0",
          shadow: "#d4cabb",
        },
        ink: {
          DEFAULT: "#1a1815",
          light: "#3a3530",
        },
        gold: {
          DEFAULT: "#8b7355",
          dark: "#6b5a45",
        },
        rust: "#5c4033",
        sepia: "#704214",
      },
      animation: {
        "ink-reveal": "inkReveal 2s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        inkReveal: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
            filter: "blur(4px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
