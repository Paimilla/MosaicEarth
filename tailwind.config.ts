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
        space: {
          950: "#06080e",
          900: "#0b0f19",
          850: "#101625",
          800: "#161f33",
          700: "#222f4d",
          600: "#32446d",
          500: "#486096",
        },
        earth: {
          cyan: "#00d2ff",
          blue: "#3a7bd5",
          accent: "#0ea5e9",
        },
        moon: {
          silver: "#e2e8f0",
          glow: "#94a3b8",
          dark: "#334155",
        },
        mars: {
          rust: "#ff6b4a",
          amber: "#f97316",
          dune: "#b45309",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
