import { makeStyles } from "tss-react/mui"

import { Chip } from "@mui/material"

const useStyles = makeStyles<any>()((theme, { primary }) => ({
  root: {
    height: "auto",
    padding: "0.5rem",
    backgroundColor: theme.palette.themeBackground.normal,
    borderRadius: "2rem 2rem 0 0",
  },
  label: {
    height: "3.4rem",
    width: "13rem",
    lineHeight: "3.4rem",
    textAlign: "center",
    fontSize: "1.7rem",
    fontWeight: 600,
    borderRadius: "1.7rem",
    backgroundColor: primary ? theme.palette.themeBackground.highlight : "#93FBED",
  },
}))

const NetworkLabel = props => {
  const { children, primary, ...restProps } = props
  const { classes } = useStyles({ primary })
  return <Chip classes={{ root: classes.root, label: classes.label }} label={children} {...restProps}></Chip>
}
export default NetworkLabel
