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
        grayDark: "#CBD5E1",
        grayLight: "#334155",
      },
    },
    spacing: {
      "1": "8px",
      "2": "12px",
      "3": "16px",
      "4": "20px",
      "5": "32px",
      "6": "48px",
    },
    variants: {
      backgroundColor: [`light`],
      textColor: [`light`],
    },
  },
  plugins: [],
}
export default config
