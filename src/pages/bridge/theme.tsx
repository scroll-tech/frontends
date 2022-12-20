import { useMemo } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import createBreakpoints from "@mui/system/createTheme/createBreakpoints"

import { typographyOptions, paletteOptions } from "./addition"

// TODO: need to merge with outer theme
const breakpoints = createBreakpoints({})

const defaultTransition = "all 0.15s ease-out"

const lightTheme = {
  palette: paletteOptions,
  typography: typographyOptions,
  breakpoints,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1300px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "0.6rem",
          lineHeight: 1,
          color: paletteOptions.primary.contrastText,
          backgroundColor: paletteOptions.primary.main,
          transition: defaultTransition,
          "&:hover": {
            boxShadow: "#FEE7E0 0.4rem 0.4rem",
            // mobile
            "&.Mui-disabled": {
              backgroundColor: "rgba(51, 51, 51, 0.1)",
              boxShadow: "unset",
            },
          },
        },
        textPrimary: {
          color: paletteOptions.primary.contrastText,
          backgroundColor: `${paletteOptions.primary.main} !important`,
          "&:hover": {
            backgroundColor: `${paletteOptions.primary.light} !important`,
            // mobile
            "@media (hover: none)": {
              backgroundColor: paletteOptions.primary.light,
            },
          },
          "&:disabled": {
            backgroundColor: "rgba(51, 51, 51, 0.1) !important",
            color: "rgba(51, 51, 51, 0.3)",
          },
        },
        outlined: {
          border: `1px solid ${paletteOptions.text.primary}`,
          backgroundColor: paletteOptions.background.default,
          color: paletteOptions.text.primary,
          "&:hover": {
            color: paletteOptions.primary.main,
            border: `1px solid ${paletteOptions.primary.light}`,
            backgroundColor: paletteOptions.background.default,
            "@media (hover: none)": {
              backgroundColor: paletteOptions.background.default,
            },
          },
          "&:disabled": {
            backgroundColor: "rgba(51, 51, 51, 0.1) !important",
            color: "rgba(51, 51, 51, 0.3)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#333",
          backgroundColor: paletteOptions.background.default,
          padding: "12px",
          "&:hover": {
            backgroundColor: paletteOptions.background.default,
            // mobile
            "@media (hover: none)": {
              backgroundColor: paletteOptions.background.default,
            },
          },
          "&:disabled": {
            color: "rgba(51, 51, 51, 0.3)",
            backgroundColor: "rgba(224, 224, 224)",
            cursor: "not-allowed",
            pointerEvents: "all",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "2.8rem",
          borderRadius: "1rem",
          // boxShadow: boxShadows.card,
          transition: defaultTransition,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
        padding: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: defaultTransition,
          "&.Mui-selected": {
            backgroundColor: "rgba(201, 203, 206, 0.2)",
            color: paletteOptions.text.primary,
            "&:hover": {
              backgroundColor: "rgba(201, 203, 206, 0.2)",
            },
          },
        },

        button: {
          "&:hover": {
            backgroundColor: "rgba(201, 203, 206, 0.2)",
          },
          transition: defaultTransition,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "1.8rem",
          transition: defaultTransition,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: defaultTransition,
          fontFamily: "Pulp Display",
          letterSpacing: "0.25px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          transition: defaultTransition,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          transition: defaultTransition,
          borderRadius: "2rem",
          boxShadow: "0px 4px 4px rgba(51, 51, 51, 0.15)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          transition: defaultTransition,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          transition: defaultTransition,
          "&.MuiTab-root": {
            color: paletteOptions.text.secondary,
            minWidth: 0,
            borderRadius: "3rem",
          },
          "&.Mui-selected": {
            color: paletteOptions.primary.main,
          },
          "&:hover:not(.Mui-selected)": {
            color: paletteOptions.text.primary,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.6rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: "default",
          transition: defaultTransition,
          color: "#333",
        },
        colorPrimary: {
          color: "#333",
        },
        gutterBottom: {
          marginBottom: "0.7rem",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "1rem",
          fontSize: "1.6rem",
          lineHeight: "2.6rem",
          padding: "2rem",
          width: "100%",
          boxSizing: "border-box",
          alignItems: "center",
          color: ownerState.severity && paletteOptions[ownerState.severity].main,
          backgroundColor: ownerState.severity && paletteOptions[ownerState.severity].light,
          [breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center",
            padding: " 1.6rem 3rem",
          },
        }),
        icon: ({ ownerState }) => ({
          display: "flex",
          alignItems: "center",
          fontSize: "3rem",
          marginRight: "1.6rem",
          padding: 0,
          color: `${ownerState.severity && paletteOptions[ownerState.severity].main} !important`,
          [breakpoints.down("sm")]: {
            justifyContent: "center",
            marginRight: 0,
          },
        }),
        message: {
          padding: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#C9CBCE",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          fontSize: "2.2rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#00A6F2",
          fontSize: "1.6rem",
          fontWeight: 600,
          cursor: "pointer",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-last-of-type(1) .MuiTableCell-root": {
            borderBottom: "unset",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          [breakpoints.down("sm")]: {
            padding: "1.6rem 2.4rem",
          },
        },
        head: {
          color: "#595959",
          fontSize: "1.4rem",
          fontWeight: 500,
          letterSpacing: "-0.03rem",
          borderBottom: "unset",
        },
        body: {
          color: "#333",
          fontSize: "1.6rem",
          fontWeight: 400,
          letterSpacing: "-0.03rem",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #C9CBCE",
          "&:before": {
            backgroundColor: "unset",
          },
          "&.MuiPaper-root": {
            boxShadow: "unset",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        content: {
          margin: "3.4rem 0",
          "&.Mui-expanded": {
            margin: "3.4rem 0",
          },
          [breakpoints.down("sm")]: {
            margin: "2.8rem 0",
            "&.Mui-expanded": {
              margin: "2.8rem 0",
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "block",
          padding: "0 0 3.2rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          [breakpoints.down("sm")]: {
            margin: "0 1.6rem",
          },
        },
      },
    },
  },
}

const darkTheme = {}
const prefersDarkMode = true
const Theme = ({ children }) => {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // console.log(prefersDarkMode, "prefersDarkMode");

  const theme = useMemo(() => createTheme(prefersDarkMode ? lightTheme : darkTheme), [])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
