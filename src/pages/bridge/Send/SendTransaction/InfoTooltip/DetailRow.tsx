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
  price?: string | number
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
    display: "grid",
    width: "calc(100% - 16rem)",
    gridTemplateColumns: "2fr 1fr",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      gridTemplateColumns: "1fr",
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
  const { title, tooltip, value, large = false, xlarge = false, sx, price } = props
  const { classes: styles } = useStyles()
  const variant = xlarge || large ? "h6" : "subtitle2"

  return (
    <Box display="flex" sx={{ alignItems: ["flex-start", "center"], width: "100%", fontWeight: "400", margin: "0.6rem 0", ...sx }}>
      <Typography variant={variant} color="textPrimary" className={styles.detailLabel}>
        <Box>{title}&nbsp;</Box>
        {tooltip ? <InfoTooltip title={tooltip} /> : null}
      </Typography>
      <Typography align="left" variant={variant} color="textPrimary" className={xlarge ? styles.xlabel : styles.label}>
        <span>{value || "•"}</span>
        <span>{price ? ` $${price}` : ""}</span>
      </Typography>
    </Box>
  )
}

export default DetailRow
