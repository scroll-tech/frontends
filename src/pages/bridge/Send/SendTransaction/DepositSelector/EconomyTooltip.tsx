import { useMemo } from "react"

// import { makeStyles } from "tss-react/mui"
import { SvgIcon, Typography } from "@mui/material"

import { ReactComponent as InfoSvg } from "@/assets/svgs/common/info.svg"
import useBatchBridgeStore from "@/stores/batchBridgeStore"
import { toTokenDisplay } from "@/utils"

const EconomyTooltip = props => {
  const { selectedToken } = props
  const { batchDepositConfig } = useBatchBridgeStore()

  const minAmount = useMemo(() => {
    if (batchDepositConfig.minAmountPerTx) {
      return toTokenDisplay(batchDepositConfig.minAmountPerTx, selectedToken.decimals, selectedToken.symbol)
    }
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
