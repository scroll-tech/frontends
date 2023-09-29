import { motion, useCycle } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, CircularProgress, IconButton, SvgIcon } from "@mui/material"

import { ReactComponent as ArrowRightIcon } from "@/assets/svgs/refactor/arrow-right.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles<any>()((theme, { width, color, disabled, loading, whiteButton }) => ({
  wrapper: {
    position: "relative",
    height: "5.4rem",
    overflow: "hidden",
    borderRadius: "1rem",
    backgroundColor: whiteButton ? "#ffffff" : "transparent",
    width: width ?? "25rem",
    [theme.breakpoints.down("sm")]: {
      width: width ?? "18.5rem",
      height: "4.8rem",
    },
  },
  wrapperDisabled: {
    backgroundColor: "#FFF0DD80",
  },
  button: {
    fontSize: "2rem",
    fontWeight: 600,
    height: "100%",
    width: "100%",
    paddingLeft: "5.4rem",
    border: `1px solid ${color === "primary" ? theme.palette.primary.main : theme.palette.text.primary}`,
    color: color === "primary" ? theme.palette.primary.main : theme.palette.text.primary,
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      paddingLeft: "4.8rem",
    },
  },
  buttonDisabled: {
    borderColor: "#EBC28E",
    color: "#EBC28E",
  },
  buttonLoading: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    border: "unset",
    gap: "0.4em",
    color: "#0F8E7E",
  },
  active: {
    color: theme.palette.primary.contrastText,
  },
  mask: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    backgroundColor: color === "primary" ? theme.palette.primary.main : theme.palette.text.primary,
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
  maskLoading: {
    width: "100% !important",
    backgroundColor: "#DFFCF8",
  },
  maskDisabled: {
    backgroundColor: "#EBC28E",
    width: "5.4rem !important",
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem !important",
    },
  },
  icon: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
}))

const maskDesktop = {
  normal: {
    width: "5.4rem",
  },
  expanding: {
    width: "100%",
  },
}

const maskMobile = {
  normal: {
    width: "4.8rem",
  },
  expanding: {
    width: "100%",
  },
}
// color: "primary" | undefined
const Button = props => {
  const { width, sx, color, loading, disabled, children, whiteButton, ...restProps } = props
  const { classes, cx } = useStyles({ color, width, disabled, loading, whiteButton })

  const { isMobile } = useCheckViewport()

  const [isHover, setIsHover] = useCycle(false, true)

  const handleHover = () => {
    setIsHover()
  }

  return (
    // TODO: allow sx, allow size=small/medium
    // avoid setting both 'disabled' and 'loading' to true.
    <motion.div
      className={cx(classes.wrapper, disabled && classes.wrapperDisabled)}
      onHoverStart={handleHover}
      onHoverEnd={handleHover}
      animate={isHover ? "expanding" : "normal"}
    >
      {!loading && (
        <IconButton classes={{ root: classes.icon }} component="span" disabled>
          <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
        </IconButton>
      )}
      <motion.div
        className={cx(classes.mask, loading && classes.maskLoading, disabled && classes.maskDisabled)}
        variants={isMobile ? maskMobile : maskDesktop}
      ></motion.div>
      <ButtonBase
        classes={{ root: cx(classes.button, loading && classes.buttonLoading, disabled && classes.buttonDisabled) }}
        disabled={disabled || loading}
        className={cx(isHover && classes.active)}
        {...restProps}
      >
        {children} {loading && <CircularProgress sx={{ color: "#0F8E7E" }} size={isMobile ? 18 : 24} thickness={4}></CircularProgress>}
      </ButtonBase>
    </motion.div>
  )
}

export default Button
