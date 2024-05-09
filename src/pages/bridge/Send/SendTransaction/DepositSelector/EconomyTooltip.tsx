import { useMemo } from "react"

// import { makeStyles } from "tss-react/mui"
import { SvgIcon, Typography } from "@mui/material"

import { ReactComponent as InfoSvg } from "@/assets/svgs/common/info.svg"
import useBatchBridgeStore from "@/stores/batchBridgeStore"
// import useBridgeStore from "@/stores/bridgeStore"
import { toTokenDisplay } from "@/utils"

// const useStyles = makeStyles()(theme => ({
//   chip: {
//     background: "transparent",
//     padding: "0 1rem",
//     height: "3.5rem",
//     [theme.breakpoints.down("sm")]: {
//       overflow: "hidden",
//       padding: "0 1rem",
//     },
//   },
//   chipLabel: {
//     paddingLeft: "1rem",
//     paddingRight: 0,
//     fontWeight: 600,
//     fontSize: "1.8rem",
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "1.4rem",
//       paddingLeft: "0.6rem",
//     },
//   },
//   icon: {
//     width: "3.2rem",
//     height: "3.2rem",
//     margin: "0 !important",
//   },
// }))

const EconomyTooltip = props => {
  const { selectedToken } = props
  const { batchDepositConfig } = useBatchBridgeStore()

  const minAmount = useMemo(() => {
    if (batchDepositConfig.minAmountPerTx) {
      return toTokenDisplay(batchDepositConfig.minAmountPerTx, selectedToken.decimals, selectedToken.symbol)
    }
    console.log("batchDepositConfig.minAmountPerTx", batchDepositConfig.minAmountPerTx, selectedToken.decimals, selectedToken.symbol)
  }, [batchDepositConfig])

  return (
    <Typography
      sx={{
        lineHeight: ["3.2rem", "4rem"],
        fontSize: ["1.4rem", "1.6rem"],
        textAlign: "left",
        width: "100%",
        background: "#FFF8F3",
        borderRadius: "0.8rem",
        paddingLeft: "1.6rem",
        marginBottom: "1.6rem",
      }}
    >
      <SvgIcon sx={{ fontSize: "1.6rem", mr: "0.8rem", cursor: "default" }} component={InfoSvg} inheritViewBox></SvgIcon>You can only use "Economy"
      for deposit more than {minAmount}
    </Typography>
  )
}

export default EconomyTooltip
