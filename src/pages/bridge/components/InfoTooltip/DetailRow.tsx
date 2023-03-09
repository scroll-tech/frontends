import classnames from "classnames"
import { FC } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import InfoTooltip from "./InfoTooltip"

export type DetailRowProps = {
  title: string
  value?: any
  tooltip?: any
  highlighted?: boolean
  large?: boolean
  xlarge?: boolean
  bold?: boolean
  contrastText?: boolean
}

const useStyles = makeStyles()(theme => ({
  detailLabel: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: 800,
  },
  xlabel: {
    fontSize: "2.8rem",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
    fontWeight: 800,
  },
}))

const DetailRow: FC<DetailRowProps> = props => {
  const { title, tooltip, value, large = false, xlarge = false } = props
  const { classes: styles } = useStyles()
  const variant = xlarge || large ? "h6" : "subtitle2"

  return (
    <Box display="flex" justifyContent="space-between" alignItems={"center"}>
      <Typography variant={variant} color="textPrimary" className={classnames(styles.detailLabel, styles.label)}>
        <Box>{title}&nbsp;</Box>
        {tooltip ? <InfoTooltip title={tooltip} /> : null}
      </Typography>
      <Typography align="right" variant={variant} color="textPrimary" className={xlarge ? styles.xlabel : styles.label}>
        {value || "•"}
      </Typography>
    </Box>
  )
}

export default DetailRow
