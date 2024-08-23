import { makeStyles } from "tss-react/mui"

import { ButtonProps, CircularProgress, Button as ScrollButton } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

interface ScrollButtonProps extends ButtonProps {
  width?: string | number
  color?: "primary" | "secondary" | "tertiary"
  gloomy?: boolean
  loading?: boolean
  disabled?: boolean
  whiteButton?: boolean
  download?: boolean

  // compatibility
  target?: string
  rel?: string
}

const backgroundColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.main
    case "secondary":
      return "#262626"
    case "tertiary":
      return "transparent"
    default:
      return theme.palette.text.primary
  }
}

const cColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.contrastText
    case "secondary":
      return "#ffffff"
    case "tertiary":
      return "#ffffff"
    default:
      return theme.palette.primary.contrastText
  }
}

const borderColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.main
    case "secondary":
      return "#262626"
    case "tertiary":
      return "#ffffff"
    default:
      return theme.palette.primary.contrastText
  }
}

const useStyles = makeStyles<any>()((theme, { width, color, disabled, loading, whiteButton }) => ({
  button: {
    padding: "0",
    height: "4.8rem",
    fontSize: "1.8rem",
    fontWeight: 600,
    background: backgroundColor(color, theme),
    color: cColor(color, theme),
    borderColor: borderColor(color, theme),
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      height: "4rem",
    },
    "&:hover": {
      backgroundColor: backgroundColor(color, theme),
      color: cColor(color, theme),
      borderColor: borderColor(color, theme),
    },
  },
  buttonDisabled: {
    borderColor: "#EBC28E",
    color: "#EBC28E",
  },
  buttonLoading: {
    opacity: 0.6,
    gap: "0.4em",
    color: cColor(color, theme),
    backgroundColor: backgroundColor(color, theme),
    border: `1px solid ${borderColor(color, theme)} !important`,
  },
  buttonGloomy: {
    opacity: 0.5,
    pointerEvents: "none",
  },
}))

const Button = (props: ScrollButtonProps) => {
  const { width, sx, color, loading, disabled, gloomy, children, whiteButton, ...restProps } = props
  const { classes, cx } = useStyles({ color, width, disabled, loading, whiteButton })

  const { isMobile } = useCheckViewport()

  return (
    <ScrollButton
      classes={{
        root: cx(classes.button, loading && classes.buttonLoading, gloomy && classes.buttonGloomy),
      }}
      sx={{ width: "16rem", ...sx }}
      disabled={loading}
      {...restProps}
      variant="outlined"
    >
      {children} {loading && <CircularProgress sx={{ color: "inherit" }} size={isMobile ? 16 : 16} thickness={4}></CircularProgress>}
    </ScrollButton>
  )
}

export default Button
