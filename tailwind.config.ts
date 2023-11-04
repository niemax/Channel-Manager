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
        fontDark: "#FFFFFF",
        fontLight: "#000000",
        alternativeFontLight: "#16181B",
        productBlue: "#0050FF",
        productBlueOpaque: "rgba(0, 80, 255, 0.2)",
        grayDark: "#CBD5E1",
        grayLight: "#334155",
      },
    },
    variants: {
      backgroundColor: [`light`],
      textColor: [`light`],
    },
  },
  plugins: [],
}
export default config
