import { makeStyles } from "tss-react/mui"

import { Chip, Stack, SvgIcon, Typography } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

const useStyles = makeStyles()(theme => ({
  chip: {
    background: "transparent",
    padding: "0 1rem",
    height: "3.5rem",
    [theme.breakpoints.down("sm")]: {
      overflow: "hidden",
      padding: "0 1rem",
    },
  },
  chipLabel: {
    paddingLeft: "1rem",
    paddingRight: 0,
    fontWeight: 600,
    fontSize: "1.8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      paddingLeft: "0.6rem",
    },
  },
  icon: {
    width: "3.2rem",
    height: "3.2rem",
    margin: "0 !important",
  },
}))

const TxDirection = () => {
  const { classes } = useStyles()
  const { fromNetwork, toNetwork } = useBridgeStore()
  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ width: ["100%"] }}>
      <Typography sx={{ fontWeight: 500, fontSize: ["1.4rem", "1.8rem"] }}>From</Typography>
      <Chip
        classes={{ root: classes.chip, icon: classes.icon, label: classes.chipLabel }}
        icon={<SvgIcon component={fromNetwork.icon} inheritViewBox></SvgIcon>}
        label={fromNetwork.name}
      ></Chip>
      <Typography sx={{ fontWeight: 500, fontSize: ["1.4rem", "1.8rem"] }}>To</Typography>
      <Chip
        classes={{ root: classes.chip, icon: classes.icon, label: classes.chipLabel }}
        icon={<SvgIcon component={toNetwork.icon} inheritViewBox></SvgIcon>}
        label={toNetwork.name}
      ></Chip>
    </Stack>
  )
}

export default TxDirection
