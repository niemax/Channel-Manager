import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        alternativeBlack: "#16181B",
        productBlue: "#0050FF",
        productBlueOpaque: "rgba(0, 80, 255, 0.2)",
        grayDark: "#CBD5E1",
        grayLight: "#334155",
      },
    },
  },
  darkMode: ["class"],
  plugins: [],
}
export default config
