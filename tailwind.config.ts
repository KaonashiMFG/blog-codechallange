import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#f5efe0",
        secondary: "#c84127"
      },

      fontFamily:{
        "sawarabiMincho":["Sawarabi_Mincho", "Young_Serif"],
        "raleway": ["Raleway", "Young_Serif"],
        "kanit": ["Kanit", "Young_Serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;


