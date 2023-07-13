import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { IconButton, InputBase, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowRightIcon } from "@/assets/svgs/refactor/arrow-right.svg"

const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: "relative",
    height: "5.4rem",
    width: "44.8rem",
  },
  inputRoot: {
    fontSize: "2rem",
    fontWeight: 600,
    height: "100%",
    width: "100%",
    color: "#101010",
    backgroundColor: theme.palette.background.default,
    borderRadius: "1rem",
    border: "1px solid #101010",
    borderLeft: "none",
  },
  input: {
    textAlign: "center",
  },

  mask: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    backgroundColor: "#101010",
    color: "#DCDCDC",
    borderRadius: "1rem",
    zIndex: 1,
    top: 0,
    display: "flex",
  },
  icon: {
    width: "5.4rem",
    height: "100%",
    color: "#FFF8F3",
  },

  successTip: {
    width: " calc(100% - 5.4rem)",
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

const EmailInput = props => {
  const { end, onClick, onEnter, ...restProps } = props
  const { classes, cx } = useStyles()

  const handleEnter = e => {
    if (e.keyCode === 13) {
      onEnter()
    }
  }

  return (
    <motion.div className={classes.wrapper} animate={end ? "expanding" : "normal"}>
      <motion.div className={classes.mask} variants={mask}>
        <IconButton classes={{ root: classes.icon }} onClick={onClick}>
          <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
        </IconButton>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: "5.4rem",
            flex: 1,
            textAlign: "center",
            color: "#DCDCDC",
            width: "0",
            overflow: "hidden",
          }}
          className={cx(end && classes.successTip)}
        >
          Thank you for subscribing!
        </Typography>
      </motion.div>
      <InputBase
        classes={{ root: classes.inputRoot, input: classes.input }}
        placeholder="your email address here"
        {...restProps}
        onKeyDown={handleEnter}
      ></InputBase>
    </motion.div>
  )
}

export default EmailInput
