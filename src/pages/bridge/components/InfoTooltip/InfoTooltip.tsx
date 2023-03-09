import React, { FC, ReactFragment } from "react"
import { makeStyles } from "tss-react/mui"

import { Help as HelpIcon } from "@mui/icons-material"
import Tooltip, { TooltipProps } from "@mui/material/Tooltip"

type Props = {
  title: ReactFragment
  children?: any
} & Partial<TooltipProps>

const useStyles = makeStyles()(theme => ({
  tooltip: {
    maxWidth: "100rem",
  },
}))

const InfoTooltip: FC<Props> = props => {
  const { classes: styles } = useStyles()
  const children = props.children

  return (
    <Tooltip
      title={props.title}
      style={
        children
          ? {}
          : {
              opacity: 0.5,
              verticalAlign: "middle",
              cursor: "help",
              fontSize: "1.4rem",
              marginLeft: "0.2rem",
            }
      }
      classes={{
        tooltip: styles.tooltip,
      }}
      placement={props.placement || "top"}
      arrow={true}
    >
      {children || <HelpIcon color="secondary" />}
    </Tooltip>
  )
}

export default InfoTooltip
