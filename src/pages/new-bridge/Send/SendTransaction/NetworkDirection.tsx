import { makeStyles } from "tss-react/mui"

import { Chip, Stack, SvgIcon, Typography } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

const useStyles = makeStyles()(theme => ({
  chip: {
    backgroundColor: theme.palette.themeBackground.light,
    padding: "0 1.5rem",
    height: "3.5rem",
  },
  chipLabel: {
    paddingLeft: "1rem",
    paddingRight: 0,
  },
  icon: {
    width: "2rem",
    height: "2rem",
    margin: "0 !important",
  },
}))

const TxDirection = () => {
  const { classes } = useStyles()
  const { fromNetwork, toNetwork } = useBridgeStore()
  return (
    <Stack direction="row" spacing="1.5rem" alignItems="center" sx={{ width: "min-content" }}>
      <Typography sx={{ fontWeight: 700 }}>From</Typography>
      <Chip
        classes={{ root: classes.chip, icon: classes.icon, label: classes.chipLabel }}
        icon={<SvgIcon component={fromNetwork.icon} inheritViewBox></SvgIcon>}
        label={fromNetwork.name}
      ></Chip>
      <Typography sx={{ fontWeight: 700 }}>To</Typography>
      <Chip
        classes={{ root: classes.chip, icon: classes.icon, label: classes.chipLabel }}
        icon={<SvgIcon component={toNetwork.icon} inheritViewBox></SvgIcon>}
        label={toNetwork.name}
      ></Chip>
    </Stack>
  )
}

export default TxDirection
