import { FC } from "react"
import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  root: {
    width: "32.0rem",
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
}))

type Props = {
  bonderFee?: string
  bonderFeeUsd?: string
  destinationTxFee?: string
  destinationTxFeeUsd?: string
  content?: string
}

const FeeDetails: FC<Props> = props => {
  const { classes: styles } = useStyles()
  return (
    <div className={styles.root}>
      <Typography variant="body1" className={styles.text}>
        {props.content}
      </Typography>
    </div>
  )
}

export default FeeDetails
