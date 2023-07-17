import { motion, useCycle } from "framer-motion"
import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, IconButton, SvgIcon } from "@mui/material"

import { ReactComponent as ArrowRightIcon } from "@/assets/svgs/refactor/arrow-right.svg"

const useStyles = makeStyles<any>()((theme, { width, color }) => ({
  wrapper: {
    position: "relative",
    height: "5.4rem",
    width,
    [theme.breakpoints.down("sm")]: {
      height: "4.8rem",
    },
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
  const { width = "25rem", sx, color, children, ...restProps } = props
  const { classes, cx } = useStyles({ color, width })

  const [isHover, setIsHover] = useCycle(false, true)

  return (
    // TODO: allow sx, allow size=small/medium
    <motion.div
      className={classes.wrapper}
      onHoverStart={setIsHover as any}
      onHoverEnd={setIsHover as any}
      animate={isHover ? "expanding" : "normal"}
    >
      <IconButton classes={{ root: classes.icon }} component="span" disabled>
        <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
      </IconButton>
      <motion.div className={classes.mask} variants={isMobileOnly ? maskMobile : maskDesktop}></motion.div>
      <ButtonBase classes={{ root: classes.button }} className={cx(isHover && classes.active)} {...restProps}>
        {children}
      </ButtonBase>
    </motion.div>
  )
}

export default Button
