/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "18px": "18px",
      },
      maxWidth: {
        "7xl": "130rem",
      },
      padding: {
        1: "0.4rem",
        2: "0.8rem",
        3: "1.2rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
      },
      margin: {
        1: "0.4rem",
        2: "0.8rem",
        3: "1.2rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
      },
      boxShadow: {
        base: "6px 9px 0px 0px#fee7e0",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      borderColor: {
        DEFAULT: "#C9CBCE",
      },
      screens: {
        md: "768px",
        lg: "1024px",
      },
      colors: {
        red: {
          DEFAULT: "#EB7106",
          dark: "#EB7106",
        },
        "red-light": {
          DEFAULT: "#F18740",
          dark: "#F18740",
        },
        "body-title": {
          DEFAULT: "#595959",
          dark: "#595959",
        },
        "body-title-80": {
          DEFAULT: "#595959dc",
          dark: "#595959dc",
        },
        "body-bg": {
          DEFAULT: "#f3f4f6",
          dark: "#f3f4f6",
        },
        charcoal: {
          DEFAULT: "#333333",
          dark: "#333333",
        },
        "charcoal-50": {
          DEFAULT: "#33333380",
          dark: "#33333380",
        },
        "charcoal-30": {
          DEFAULT: "#3333334d",
          dark: "#3333334d",
        },
        "charcoal-10": {
          DEFAULT: "#3333331a",
          dark: "#3333331a",
        },
        outline: {
          DEFAULT: "#C9CBCE",
          dark: "#C9CBCE",
        },
        "outline-selected": {
          DEFAULT: "#00A6F2",
          dark: "#00A6F2",
        },
        "table-header": {
          DEFAULT: "#C9CBCE 20%",
          dark: "#C9CBCE 20%",
        },
        caution: {
          DEFAULT: "#C14800",
          dark: "#C14800",
        },
        "caution-bg": {
          DEFAULT: "#FFF8CB",
          dark: "#FFF8CB",
        },
        error: {
          DEFAULT: "#FF4F64",
          dark: "#DC3347",
        },
        "error-bg": {
          DEFAULT: "#FFD7E2",
          dark: "#FFD7E2",
        },
      },
      fontSize: {
        sm: ["12px", "18px"],
        md: ["14px", "22px"],
        base: ["16px", "26px"],
        "base-middle": ["16px", "16px"],
        lg: ["20px", "30px"],
        xl: ["34px", "45px"],
      },
    },
    fontFamily: {
      sans: ['"TransSansPremium"', ...defaultTheme.fontFamily.sans],
      display: ['"TransSansPremium"', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
  },
  plugins: [],
}
