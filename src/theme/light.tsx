import { createTheme } from "@mui/material/styles"

import { boxShadowOptions, paletteOptions, typographyOptions } from "./options"

const defaultTransition = "all 0.15s ease-out"

const lightTheme = createTheme({
  // check in bridge
  shape: {
    borderRadius: 6,
  },
  palette: paletteOptions,
  typography: typographyOptions,
  // diferrent from raw shadows
  boxShadows: boxShadowOptions,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "2rem",
          paddingRight: "2rem",
        },
        maxWidthLg: {
          maxWidth: "1300px",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.4rem",
        },
      },
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 10000,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
          height: "3.8rem",
          borderRadius: "1.9rem",
          padding: "0 1.6rem",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "1",
          padding: "16px 28px",
          textTransform: "inherit",
          width: "max-content",
          // whiteSpace: "nowrap",
          "&:hover": {
            boxShadow: boxShadowOptions.buttonHover,
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: boxShadowOptions.none,
            lineHeight: "18px",
            "&:hover": {
              backgroundColor: paletteOptions.primary.light,
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderColor: paletteOptions.text.primary,
            color: paletteOptions.text.primary,
            backgroundColor: paletteOptions.background.default,
            "&:hover": {
              color: paletteOptions.primary.main,
              backgroundColor: paletteOptions.background.default,
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: paletteOptions.primary.main,
            color: paletteOptions.primary.main,
            backgroundColor: paletteOptions.background.default,
            width: "21.5rem",
            "&:hover": {
              backgroundColor: paletteOptions.background.default,
              borderColor: paletteOptions.primary.main,
            },
          },
        },
        {
          props: { disabled: true },
          style: {
            border: "none !important",
            color: paletteOptions.action.disabled,
            backgroundColor: paletteOptions.action.disabledBackground,
          },
        },
      ],
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
    // select dropdown
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: boxShadowOptions.select,
        },
      },
    },

    // default body1
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: "default",
          transition: defaultTransition,
          color: paletteOptions.text.primary,
        },
        gutterBottom: {
          marginBottom: "0.7rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-last-of-type(1) .MuiTableCell-body": {
            borderBottom: "unset",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: paletteOptions.divider,
          [theme.breakpoints.down("sm")]: {
            padding: "1.6rem 2.4rem",
          },
        }),
        head: {
          color: paletteOptions.text.secondary,
          fontSize: "1.4rem",
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            margin: "0 1.6rem",
          },
        }),
      },
    },
    // end
    MuiAlert: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: "1rem",
          fontSize: "1.6rem",
          lineHeight: "2.6rem",
          padding: "2rem",
          width: "100%",
          boxSizing: "border-box",
          color: ownerState.severity && paletteOptions[ownerState.severity].main,
          backgroundColor: ownerState.severity && paletteOptions[ownerState.severity].light,
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center",
            padding: " 1.6rem 3rem",
          },
        }),
        icon: ({ theme, ownerState }) => ({
          display: "flex",
          alignItems: "center",
          fontSize: "2.4rem",
          marginRight: "1.8rem",
          padding: 0,
          color: `${ownerState.severity && paletteOptions[ownerState.severity].main} !important`,
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            marginRight: 0,
          },
        }),
        message: {
          padding: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.border.main}`,
          "&:before": {
            backgroundColor: "unset",
          },
          "&.MuiPaper-root": {
            boxShadow: "unset",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        content: ({ theme }) => ({
          margin: "3.4rem 0",
          "&.Mui-expanded": {
            margin: "3.4rem 0",
          },
          [theme.breakpoints.down("sm")]: {
            margin: "2.8rem 0",
            "&.Mui-expanded": {
              margin: "2.8rem 0",
            },
          },
        }),
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
        root: ({ theme }) => ({
          color: theme.palette.link.main,
          fontSize: "1.6rem",
          fontWeight: 600,
          cursor: "pointer",
        }),
      },
    },
  },
})

export default lightTheme
