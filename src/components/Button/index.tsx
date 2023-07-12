import { motion, useCycle } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, IconButton, SvgIcon } from "@mui/material"

import { ReactComponent as ArrowRightIcon } from "@/assets/svgs/refactor/arrow-right.svg"

const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: "relative",
    height: "5.4rem",
    width: "25rem",
  },
  button: {
    fontSize: "2rem",
    fontWeight: 600,
    height: "100%",
    width: "100%",
    paddingLeft: "5.4rem",
    border: "1px solid #FF684B",
    color: "#FF684B",
    borderRadius: "1rem",
  },
  active: {
    color: theme.palette.primary.contrastText,
  },
  mask: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    backgroundColor: "#FF684B",
    borderRadius: "1rem",
  },
  icon: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
}))

const mask = {
  normal: {
    width: "5.4rem",
  },
  expanding: {
    width: "100%",
  },
}

const Button = props => {
  const { color, children, ...restProps } = props
  const { classes, cx } = useStyles()

  const [isHover, setIsHover] = useCycle(false, true)

  return (
    <motion.div
      className={classes.wrapper}
      onHoverStart={setIsHover as any}
      onHoverEnd={setIsHover as any}
      animate={isHover ? "expanding" : "normal"}
    >
      <IconButton classes={{ root: classes.icon }} component="span" disabled>
        <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
      </IconButton>
      <motion.div className={classes.mask} variants={mask}></motion.div>
      <ButtonBase classes={{ root: classes.button }} className={cx(isHover && classes.active)} {...restProps}>
        {children}
      </ButtonBase>
    </motion.div>
  )
}

export default Button
