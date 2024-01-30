import { FC } from "react"
import { makeStyles } from "tss-react/mui"

import { BoxProps, Typography } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"
import { formatAmount } from "@/utils"

export type DetailRowProps = {
  title: string
  value?: any
  tooltip?: any
  highlighted?: boolean
  large?: boolean
  xlarge?: boolean
  contrastText?: boolean
  price?: string | number
}

const useStyles = makeStyles()(theme => ({
  rowItem: {
    "& td": {
      width: "auto",
      padding: 0,
    },
    "& td:last-child": {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      verticalAlign: "top",
    },
  },
  detailLabel: {
    fontSize: "1.6rem",
    fontWeight: 600,
    lineHeight: "3rem",
    width: "auto",
    whiteSpace: "nowrap",
    paddingRight: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      lineHeight: "2.4rem",
    },
  },
  amount: {
    fontSize: "1.6rem",
    fontWeight: 400,
    lineHeight: "3rem",
    whiteSpace: "nowrap",
    paddingRight: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      lineHeight: "2.4rem",
    },
  },
  price: {
    fontSize: "1.6rem",
    fontWeight: 400,
    lineHeight: "3rem",
    color: "#5B5B5B",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      lineHeight: "2.4rem",
    },
  },
}))

const DetailRow: FC<DetailRowProps & BoxProps> = props => {
  const { title, value, large = false, price } = props
  const { classes: styles } = useStyles()
  const variant = large ? "h6" : "subtitle2"
  const { isMobile } = useCheckViewport()

  return (
    <tr className={styles.rowItem}>
      <td>
        <Typography variant={variant} color="textPrimary" className={styles.detailLabel}>
          {title}
        </Typography>
      </td>
      <td>
        <Typography variant={variant} color="textPrimary" className={styles.amount}>
          {value || "•"}
        </Typography>
        {isMobile ? (
          <Typography variant={variant} color="textPrimary" className={styles.price}>
            {price ? ` $${formatAmount(price)}` : ""}
          </Typography>
        ) : null}
      </td>
      {isMobile ? null : (
        <td>
          <Typography variant={variant} color="textPrimary" className={styles.price}>
            {price ? ` $${formatAmount(price)}` : ""}
          </Typography>
        </td>
      )}
    </tr>
  )
}

export default DetailRow
