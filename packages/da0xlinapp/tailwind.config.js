module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/sections/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#17171A",
        secondary: "#EEF1F6",
        tertiary: "#0e1133",

        lightBlue: "#E1F6FE",
        lightPink: "#FDEEDC",
        lightGreen: "#E1FDE2",
      },
      lineHeight: {
        12: "1.2",
        13: "1.3",
        16: "1.6",
      },
    },
    // screens: {
    //   lg: { max: "1800px" },
    //   md: { max: "990px" },
    //   sm: { max: "600px" },
    //   xs: { max: "400px" },
    //   minmd: "1200px",
    //   minlg: "2100px",
    // },
     screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    // minHeight: {
    //   '0': '0',
    //   '1/4': '25%',
    //   '1/2': '50%',
    //   '3/4': '75%',
    //   'full': '100%',
    //  },
    fontFamily: {
      ReggaeOne: []
    },
  },
  plugins: [],
}