import { FC } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, BoxProps, Typography } from "@mui/material"

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
    fontWeight: 600,
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  xlabel: {
    fontSize: "2.8rem",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
}))

const DetailRow: FC<DetailRowProps & BoxProps> = props => {
  const { title, tooltip, value, large = false, xlarge = false, sx } = props
  const { classes: styles, cx } = useStyles()
  const variant = xlarge || large ? "h6" : "subtitle2"

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", ...sx }}>
      <Typography variant={variant} color="textPrimary" className={cx(styles.detailLabel, styles.label)}>
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
