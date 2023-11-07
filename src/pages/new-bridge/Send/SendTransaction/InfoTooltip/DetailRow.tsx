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
    fontSize: "1.6rem",
    fontWeight: 600,
    lineHeight: 1.5,
    width: "16rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  label: {
    fontSize: "1.6rem",
    fontWeight: 400,
    lineHeight: 1.5,
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
  const { classes: styles } = useStyles()
  const variant = xlarge || large ? "h6" : "subtitle2"

  return (
    <Box display="flex" alignItems="center" sx={{ width: "100%", fontWeight: "400", margin: "0.6rem 0", ...sx }}>
      <Typography variant={variant} color="textPrimary" className={styles.detailLabel}>
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
